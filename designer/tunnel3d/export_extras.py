"""Пакет 3D для моушна поверх собранной сцены тоннеля.

blender -b --factory-startup -P tunnel_scene.py -P export_extras.py -- cfg.json unused.png
(cfg: "noRender": true, "exportDir": "<папка>")

Делает: коллекции по смыслу, камеры планов 293/294/295 и камеру пролёта (1–75 кадр, 25 к/с),
материал стен варианта A, набор букв (T E Z K O R, слово TEZKOR, ряд TEZ) и экспорт:
.blend, FBX/GLB всей сцены, FBX/OBJ/GLB набора букв, SVG контуров.
"""
import json
import math
import re
import sys
from pathlib import Path

import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:]
cfg = json.load(open(argv[0]))
OUT = Path(cfg["exportDir"])
OUT.mkdir(parents=True, exist_ok=True)
G = json.load(open(cfg.get("glyphs", "glyphs.json")))
CAP = G["baseline"] - G["capTop"]
sc = bpy.context.scene
W, H = cfg.get("W", 16.0), cfg.get("H", 9.0)


def srgb(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return (*[x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c], 1.0)


# ---------------------------------------------------------------- коллекции
def coll(name):
    c = bpy.data.collections.get(name) or bpy.data.collections.new(name)
    if c.name not in sc.collection.children:
        sc.collection.children.link(c)
    return c


def move(ob, c):
    for old in list(ob.users_collection):
        old.objects.unlink(ob)
    c.objects.link(ob)


groups = {"Tunnel_shell": ("wall_l", "wall_r", "floor", "ceil"), "End_portal": ("Plane",),
          "Walls_TEZKOR": ("wall_",), "Rows_TEZ": ("row_",), "Lights": ("rib_", "fill", "portal_glow")}
for ob in list(sc.objects):
    for cname, prefixes in groups.items():
        if ob.name in prefixes or any(ob.name.startswith(p) for p in prefixes if p.endswith("_")) or ob.name.startswith(prefixes):
            move(ob, coll(cname))
            break
names = {"Plane": "End_portal_plate"}
for ob in sc.objects:
    if ob.name in names:
        ob.name = names[ob.name]

# материалы: понятные имена, материал стен варианта A про запас
for m, n in (("white", "TEZKOR_white"), ("cyan", "TEZ_cyan_00C2FF"), ("wall", "Wall_B_purple"), ("end", "Portal_purple_832DF5")):
    if m in bpy.data.materials:
        bpy.data.materials[m].name = n
wa = bpy.data.materials["Wall_B_purple"].copy()
wa.name = "Wall_A_dark"
wa.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = srgb("#121922")
wa.use_fake_user = True

# ---------------------------------------------------------------- камеры
cams = coll("Cameras")
old = sc.camera
if old:
    bpy.data.objects.remove(old)


def camera(name, pos, target=None, fov=50.4, roll=0.0):
    d = bpy.data.cameras.new(name)
    d.sensor_fit = "VERTICAL"
    d.lens_unit = "FOV"
    d.angle = math.radians(fov)
    d.clip_end = 1000
    o = bpy.data.objects.new(name, d)
    cams.objects.link(o)
    p = Vector(pos)
    t = Vector(target or (pos[0], pos[1] + 100, pos[2]))
    o.location = p
    o.rotation_euler = (t - p).to_track_quat("-Z", "Y").to_euler()
    if roll:
        o.rotation_euler.rotate_axis("Z", roll)
    return o


c294 = camera("CAM_294_entrance", (0, -10.7, 0), fov=50.4)
camera("CAM_293_rim_low", (0.2, -6.5, -H / 2 + 1.3), (0.2, 93.5, -H / 2 + 1.3 + 44.5), fov=58, roll=-0.12)
camera("CAM_295_inside", (0, 53.7, -0.15), fov=50)
fly = camera("CAM_FLY_294_to_295", (0, -10.7, 0), fov=50.4)
sc.render.fps = 25
sc.frame_start, sc.frame_end = 1, 75
for f in range(1, 76):  # медленный старт и разгон: y = y0 + Δ·u^1.7
    u = (f - 1) / 74
    fly.location.y = -10.7 + (53.7 + 10.7) * u ** 1.7
    fly.keyframe_insert("location", index=1, frame=f)
sc.camera = c294

# ---------------------------------------------------------------- набор букв
kit = coll("Letters_kit")


def parse_path(d):
    toks = re.findall(r"[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?", d)
    loops, cur, i = [], None, 0
    while i < len(toks):
        t = toks[i]
        if t == "M":
            cur = [[(float(toks[i + 1]), float(toks[i + 2])), None, None]]; i += 3
        elif t == "L":
            cur.append([(float(toks[i + 1]), float(toks[i + 2])), None, None]); i += 3
        elif t == "C":
            c1, c2 = (float(toks[i + 1]), float(toks[i + 2])), (float(toks[i + 3]), float(toks[i + 4]))
            p = (float(toks[i + 5]), float(toks[i + 6]))
            cur[-1][2] = c1
            cur.append([p, c2, None]); i += 7
        elif t == "Z":
            if len(cur) > 1 and abs(cur[0][0][0] - cur[-1][0][0]) < 1e-3 and abs(cur[0][0][1] - cur[-1][0][1]) < 1e-3:
                cur[0][1] = cur[-1][1]
                cur.pop()
            loops.append(cur); cur = None; i += 1
        else:
            i += 1
    return loops


def glyph_mesh(name, idx, scale, depth, bevel, x_origin):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions, cu.fill_mode, cu.resolution_u = "2D", "BOTH", 20
    cu.extrude = max(depth / 2 - bevel, 0.0005)
    cu.bevel_depth, cu.bevel_resolution = bevel, 5
    for gi in idx:
        for loop in parse_path(G["paths"][gi]):
            sp = cu.splines.new("BEZIER")
            sp.bezier_points.add(len(loop) - 1)
            sp.use_cyclic_u = True
            X = lambda q: Vector(((q[0] - x_origin) * scale, (G["baseline"] - q[1]) * scale, 0))
            for bp, (p, hin, hout) in zip(sp.bezier_points, loop):
                bp.handle_left_type = bp.handle_right_type = "FREE"
                bp.co, bp.handle_left, bp.handle_right = X(p), X(hin) if hin else X(p), X(hout) if hout else X(p)
            for k, bp in enumerate(sp.bezier_points):
                if loop[k][1] is None:
                    bp.handle_left_type = "VECTOR"
                if loop[k][2] is None:
                    bp.handle_right_type = "VECTOR"
    ob = bpy.data.objects.new(name, cu)
    kit.objects.link(ob)
    bpy.context.view_layer.objects.active = ob
    for o in bpy.context.selected_objects:
        o.select_set(False)
    ob.select_set(True)
    bpy.ops.object.convert(target="MESH")
    ob = bpy.context.view_layer.objects.active
    ob.select_set(False)
    for p in ob.data.polygons:
        p.use_smooth = True
    return ob


def x_min(i):
    return min(float(v) for v in re.findall(r"-?\d*\.?\d+", G["paths"][i])[0::2])


wall_cap = H * cfg.get("wallFill", 0.86)
ws = wall_cap / CAP
depth, bevel = cfg.get("wallDepth", 0.16), cfg.get("wallBevel", 0.04)
white = bpy.data.materials["TEZKOR_white"]
cyan = bpy.data.materials["TEZ_cyan_00C2FF"]
kit_objs = []
for i, ch in enumerate("TEZKOR"):  # буква: начало координат — левый край на базовой линии
    o = glyph_mesh(f"Letter_{ch}", [i], ws, depth, bevel, x_min(i))
    o.data.materials.append(white)
    o.location = (i * 9.0, -60.0, 0)
    kit_objs.append(o)
o = glyph_mesh("Word_TEZKOR_wall", range(6), ws, depth, bevel, 0)
o.data.materials.append(white)
o.location = (0, -75.0, 0)
kit_objs.append(o)
row_w = (W - 2 * depth) * cfg.get("rowFill", 0.94)
xs = [float(v) for i in (0, 1, 2) for v in re.findall(r"-?\d*\.?\d+", G["paths"][i])[0::2]]
fs = row_w / (max(xs) - min(xs))
o = glyph_mesh("Row_TEZ_floor_ceiling", [0, 1, 2], fs, cfg.get("rowDepth", 0.07), cfg.get("rowBevel", 0.02), min(xs))
o.data.materials.append(cyan)
o.location = (0, -90.0, 0)
kit_objs.append(o)
for o in kit_objs:
    o.hide_render = True  # в рендер сцены набор не попадает

# ---------------------------------------------------------------- сохранение и экспорт
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / "tezkor_tunnel.blend"), compress=True)


def select(objs):
    for o in sc.objects:
        o.select_set(False)
    for o in objs:
        o.hide_render = False
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]


scene_objs = [o for o in sc.objects if o.name not in {k.name for k in kit_objs}]
select(scene_objs)
bpy.ops.export_scene.fbx(filepath=str(OUT / "tezkor_tunnel_scene.fbx"), use_selection=True,
                         object_types={"MESH", "CAMERA", "LIGHT"}, apply_unit_scale=True, bake_anim=True,
                         bake_anim_use_all_actions=True, bake_anim_use_nla_strips=False,
                         bake_anim_force_startend_keying=True, bake_anim_step=1.0, bake_anim_simplify_factor=0.0,
                         path_mode="AUTO")
bpy.ops.export_scene.gltf(filepath=str(OUT / "tezkor_tunnel_scene.glb"), export_format="GLB", use_selection=True,
                          export_cameras=True, export_lights=True, export_apply=True, export_animations=True)
select(kit_objs)
bpy.ops.export_scene.fbx(filepath=str(OUT / "tezkor_letters_kit.fbx"), use_selection=True, object_types={"MESH"},
                         apply_unit_scale=True, bake_anim=False)
bpy.ops.export_scene.gltf(filepath=str(OUT / "tezkor_letters_kit.glb"), export_format="GLB", use_selection=True,
                          export_apply=True)
bpy.ops.wm.obj_export(filepath=str(OUT / "tezkor_letters_kit.obj"), export_selected_objects=True,
                      export_materials=True, export_triangulated_mesh=False)

# SVG контуров TT Uzum ExtraBold (кегль 1000, базовая линия 710)
paths = "\n".join(f'  <path id="{ch}" d="{d}"/>' for ch, d in zip("TEZKOR", G["paths"]))
(OUT / "tezkor_TT-Uzum-ExtraBold_outlines.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {math.ceil(G["width"])} 720" fill="#000">\n{paths}\n</svg>\n')
print("EXPORT_DONE", sorted(p.name for p in OUT.iterdir()))
