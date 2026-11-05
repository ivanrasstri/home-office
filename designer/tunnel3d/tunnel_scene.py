"""Тоннель TEZKOR в Blender/Cycles под исходные кадры 293–295.

blender -b --factory-startup -P tunnel_scene.py -- cfg.json out.png

Оси: X — вправо, Y — вглубь тоннеля, Z — вверх. Вход в тоннель на Y=0.
Ориентиры по оригиналу: тонкие пластины букв (боковина ≈2% высоты), пробел между
повторами ≈0,5 высоты, матовый почти нейтральный белый, голубые панели светятся,
стены сланцевые с подсветкой от голубого, самая светлая зона — у торца.
"""
import json
import math
import re
import sys

import bpy
from mathutils import Matrix, Vector

argv = sys.argv[sys.argv.index("--") + 1:]
cfg = json.load(open(argv[0]))
OUT = argv[1]
G = json.load(open(cfg.get("glyphs", "glyphs.json")))
CAP = G["baseline"] - G["capTop"]


def srgb(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return (*[x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c], 1.0)


# ---------------------------------------------------------------- рендер
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = "CYCLES"
sc.cycles.device = "CPU"
sc.cycles.samples = cfg.get("samples", 128)
sc.cycles.use_adaptive_sampling = True
sc.cycles.max_bounces = cfg.get("bounces", 6)
sc.cycles.caustics_reflective = False
sc.cycles.caustics_refractive = False
sc.cycles.use_denoising = True
try:
    sc.cycles.denoiser = "OPENIMAGEDENOISE"
except TypeError:
    sc.cycles.use_denoising = False
    sc.cycles.samples = max(sc.cycles.samples, cfg.get("samplesNoDenoise", 384))
sc.render.resolution_x = cfg.get("width", 1920)
sc.render.resolution_y = cfg.get("height", 1080)
sc.render.resolution_percentage = 100
sc.render.image_settings.file_format = "PNG"
sc.view_settings.view_transform = cfg.get("view", "Standard")
sc.view_settings.look = "None"
sc.view_settings.exposure = cfg.get("exposure", 0.0)
sc.render.film_transparent = False

world = bpy.data.worlds.new("W")
sc.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = srgb(cfg.get("world", "#0B0E14"))
world.node_tree.nodes["Background"].inputs[1].default_value = cfg.get("worldI", 0.15)


def material(name, color, rough=0.85, spec=0.12, emit=None, emit_strength=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = srgb(color)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Specular IOR Level"].default_value = spec
    if emit:
        b.inputs["Emission Color"].default_value = srgb(emit)
        b.inputs["Emission Strength"].default_value = emit_strength
    return m


def emission(name, color, strength):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    e = nt.nodes.new("ShaderNodeEmission")
    e.inputs[0].default_value = srgb(color)
    e.inputs[1].default_value = strength
    o = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(e.outputs[0], o.inputs[0])
    return m


M_WHITE = material("white", cfg.get("white", "#F3F5F8"), rough=0.8, spec=0.1)
M_CYAN = material("cyan", cfg.get("cyanBase", "#00C2FF"), rough=0.75, spec=0.1, emit="#00C2FF", emit_strength=cfg.get("cyanEmit", 0.55))
M_WALL = material("wall", cfg["wall"], rough=0.95, spec=0.05)
M_END = emission("end", cfg.get("glow", "#832DF5"), cfg.get("glowI", 1.0))


# ---------------------------------------------------------------- буквы
def parse_path(d):
    toks = re.findall(r"[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?", d)
    loops, cur, i = [], None, 0
    while i < len(toks):
        t = toks[i]
        if t == "M":
            cur = [[(float(toks[i + 1]), float(toks[i + 2])), None, None]]
            i += 3
        elif t == "L":
            cur.append([(float(toks[i + 1]), float(toks[i + 2])), None, None])
            i += 3
        elif t == "C":
            c1 = (float(toks[i + 1]), float(toks[i + 2]))
            c2 = (float(toks[i + 3]), float(toks[i + 4]))
            p = (float(toks[i + 5]), float(toks[i + 6]))
            cur[-1][2] = c1
            cur.append([p, c2, None])
            i += 7
        elif t == "Z":
            if len(cur) > 1 and abs(cur[0][0][0] - cur[-1][0][0]) < 1e-3 and abs(cur[0][0][1] - cur[-1][0][1]) < 1e-3:
                cur[0][1] = cur[-1][1]
                cur.pop()
            loops.append(cur)
            cur = None
            i += 1
        else:
            i += 1
    return loops


def word_object(name, glyph_idx, scale, depth, bevel):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "2D"
    cu.fill_mode = "BOTH"
    cu.resolution_u = 20
    cu.extrude = max(depth / 2 - bevel, 0.0005)
    cu.bevel_depth = bevel
    cu.bevel_resolution = 5
    for gi in glyph_idx:
        for loop in parse_path(G["paths"][gi]):
            sp = cu.splines.new("BEZIER")
            sp.bezier_points.add(len(loop) - 1)
            sp.use_cyclic_u = True
            X = lambda q: Vector((q[0] * scale, (G["baseline"] - q[1]) * scale, 0))
            for bp, (p, hin, hout) in zip(sp.bezier_points, loop):
                bp.handle_left_type = bp.handle_right_type = "FREE"
                bp.co = X(p)
                bp.handle_left = X(hin) if hin else X(p)
                bp.handle_right = X(hout) if hout else X(p)
            for k, bp in enumerate(sp.bezier_points):
                if loop[k][1] is None:
                    bp.handle_left_type = "VECTOR"
                if loop[k][2] is None:
                    bp.handle_right_type = "VECTOR"
    ob = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(ob)
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.convert(target="MESH")
    ob = bpy.context.view_layer.objects.active
    ob.select_set(False)
    # гладкие боковины без ступенек, острые грани лица остаются острыми
    for p in ob.data.polygons:
        p.use_smooth = True
    try:
        ob.data.use_auto_smooth = True
        ob.data.auto_smooth_angle = math.radians(40)
    except AttributeError:
        pass
    return ob


def glyph_span(idx):
    xs = []
    for i in idx:
        xs += [float(v) for v in re.findall(r"-?\d*\.?\d+", G["paths"][i])][0::2]
    return min(xs), max(xs)


W, H, L = cfg.get("W", 16.0), cfg.get("H", 9.0), cfg.get("L", 170.0)
END_Y = cfg.get("endY", 156.0)

# оболочка: четыре плоскости без торцов
Y0, Y1 = -14.0, L + 12.0
for name, verts in (
    ("wall_l", [(-W / 2, Y0, -H / 2), (-W / 2, Y1, -H / 2), (-W / 2, Y1, H / 2), (-W / 2, Y0, H / 2)]),
    ("wall_r", [(W / 2, Y0, -H / 2), (W / 2, Y0, H / 2), (W / 2, Y1, H / 2), (W / 2, Y1, -H / 2)]),
    ("floor", [(-W / 2, Y0, -H / 2), (W / 2, Y0, -H / 2), (W / 2, Y1, -H / 2), (-W / 2, Y1, -H / 2)]),
    ("ceil", [(-W / 2, Y0, H / 2), (-W / 2, Y1, H / 2), (W / 2, Y1, H / 2), (W / 2, Y0, H / 2)]),
):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], [(0, 1, 2, 3)])
    me.materials.append(M_WALL)
    bpy.context.collection.objects.link(bpy.data.objects.new(name, me))

# торец — плоский насыщенный фиолетовый прямоугольник
bpy.ops.mesh.primitive_plane_add(size=1)
end = bpy.context.active_object
end.scale = (W, H, 1)
end.rotation_euler = (math.radians(90), 0, 0)
end.location = (0, END_Y, 0)
end.data.materials.append(M_END)

# стены: тонкие пластины, пробел ≈0,5 высоты между повторами
wall_cap = H * cfg.get("wallFill", 0.86)
ws = wall_cap / CAP
wall_depth = cfg.get("wallDepth", 0.16)
wall_word = word_object("wall_word", range(6), ws, wall_depth, cfg.get("wallBevel", 0.04))
wall_word.data.materials.append(M_WHITE)
word_len = G["width"] * ws
gap = cfg.get("wallGapK", 0.5) * wall_cap
R_LEFT = Matrix(((0, 0, 1), (1, 0, 0), (0, 1, 0))).to_4x4()    # x→+Y, y→+Z, z→+X
R_RIGHT = Matrix(((0, 0, -1), (-1, 0, 0), (0, 1, 0))).to_4x4()  # x→−Y, y→+Z, z→−X
y, k = cfg.get("wallStart", -0.4), 0
while y < L:
    for side, R in ((-1, R_LEFT), (1, R_RIGHT)):
        inst = bpy.data.objects.new(f"wall_{k}_{side}", wall_word.data)
        bpy.context.collection.objects.link(inst)
        x = side * (W / 2 - wall_depth / 2)
        y0 = (y + cfg.get("leftShift", 0.0)) if side < 0 else (y + word_len + cfg.get("rightShift", 0.0))
        inst.matrix_world = Matrix.Translation((x, y0, -wall_cap / 2 + cfg.get("wallZ", 0.0))) @ R
    y += word_len + gap
    k += 1
bpy.data.objects.remove(wall_word)

# пол и потолок: ряды «TEZ»
row_idx = cfg.get("rowGlyphs", [0, 1, 2])
gx0, gx1 = glyph_span(row_idx)
row_w = (W - 2 * wall_depth) * cfg.get("rowFill", 0.94)
fs = row_w / (gx1 - gx0)
row_cap = CAP * fs
row_depth = cfg.get("rowDepth", 0.07)
row_word = word_object("row_word", row_idx, fs, row_depth, cfg.get("rowBevel", 0.02))
row_word.data.materials.append(M_CYAN)
for v in row_word.data.vertices:
    v.co.x -= gx0 * fs
step = row_cap * cfg.get("rowStepK", 1.30)
R_CEIL = Matrix(((1, 0, 0), (0, -1, 0), (0, 0, -1))).to_4x4()
yr, k = cfg.get("rowStart", -0.2), 0
while yr < L:
    for floor in (True, False):
        inst = bpy.data.objects.new(f"row_{k}_{floor}", row_word.data)
        bpy.context.collection.objects.link(inst)
        if floor:
            inst.matrix_world = Matrix.Translation((-row_w / 2, yr, -H / 2 + row_depth / 2))
        else:
            inst.matrix_world = Matrix.Translation((-row_w / 2, yr + row_cap, H / 2 - row_depth / 2)) @ R_CEIL
    yr += step
    k += 1
bpy.data.objects.remove(row_word)


# ---------------------------------------------------------------- свет
def area(name, size, loc, rot, energy, color="#FFFFFF"):
    d = bpy.data.lights.new(name, "AREA")
    d.shape = "RECTANGLE"
    d.size, d.size_y = size
    d.energy = energy
    d.color = srgb(color)[:3]
    o = bpy.data.objects.new(name, d)
    bpy.context.collection.objects.link(o)
    o.location = loc
    o.rotation_euler = rot
    o.visible_camera = False
    o.visible_glossy = False  # без бликов-полос на матовых буквах
    return o


AX, AC = cfg.get("axisI", 10000), cfg.get("axisColor", "#F4F6FF")
LY = L / 2
area("rib_left", (2.0, L), (-0.3, LY, 0), (0, math.radians(90), 0), AX, AC)
area("rib_right", (2.0, L), (0.3, LY, 0), (0, math.radians(-90), 0), AX, AC)
area("rib_up", (2.0, L), (0, LY, 0.3), (math.radians(180), 0, 0), AX * cfg.get("ceilK", 0.2), AC)
area("rib_down", (2.0, L), (0, LY, -0.3), (0, 0, 0), AX * cfg.get("floorK", 0.2), AC)
area("fill", (W, H), (0, -16.0, 0), (math.radians(90), 0, 0), cfg.get("fillI", 700), "#FFFFFF")
# «воздух» у торца: светлая зона вокруг портала с лавандовой каймой
area("portal_glow", (W * 0.9, H * 0.9), (0, END_Y - 6.0, 0), (math.radians(-90), 0, 0), cfg.get("portalI", 9000), cfg.get("portalColor", "#EEE8FF"))

# ---------------------------------------------------------------- камера
cam_d = bpy.data.cameras.new("cam")
cam_d.sensor_fit = "VERTICAL"
cam_d.lens_unit = "FOV"
cam_d.angle = math.radians(cfg.get("fov", 50.4))
cam_d.shift_x = cfg.get("shiftX", 0.0)
cam_d.shift_y = cfg.get("shiftY", 0.0)
cam_d.clip_end = 1000
cam = bpy.data.objects.new("cam", cam_d)
bpy.context.collection.objects.link(cam)
sc.camera = cam
pos = Vector(cfg.get("cam", [0, -10.7, 0]))
tgt = Vector(cfg.get("target", [pos.x, pos.y + 100, pos.z]))
cam.location = pos
cam.rotation_euler = (tgt - pos).to_track_quat("-Z", "Y").to_euler()
if cfg.get("roll"):
    cam.rotation_euler.rotate_axis("Z", cfg["roll"])
if cfg.get("motion"):
    sc.render.use_motion_blur = True
    sc.render.motion_blur_shutter = cfg.get("shutter", 1.0)
    sc.frame_set(1)
    cam.keyframe_insert("location", frame=1)
    cam.location.y += cfg["motion"]
    cam.keyframe_insert("location", frame=2)
    for fc in cam.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"
    sc.frame_set(1)

# ---------------------------------------------------------------- композитинг: лёгкое гало
if cfg.get("glare", 0.15):
    sc.use_nodes = True
    nt = sc.node_tree
    nt.nodes.clear()
    rl = nt.nodes.new("CompositorNodeRLayers")
    gl = nt.nodes.new("CompositorNodeGlare")
    gl.glare_type = "FOG_GLOW"
    gl.quality = "HIGH"
    gl.size = cfg.get("glareSize", 7)
    gl.threshold = cfg.get("glareThreshold", 0.8)
    gl.mix = -1.0 + cfg.get("glare", 0.15) * 2
    out = nt.nodes.new("CompositorNodeComposite")
    nt.links.new(rl.outputs["Image"], gl.inputs["Image"])
    nt.links.new(gl.outputs["Image"], out.inputs["Image"])

sc.render.filepath = OUT
if not cfg.get("noRender"):
    bpy.ops.render.render(write_still=True)
