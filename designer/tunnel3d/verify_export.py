import bpy, sys
from collections import Counter
d = sys.argv[sys.argv.index("--") + 1]
bpy.ops.wm.open_mainfile(filepath=f"{d}/tezkor_tunnel.blend")
sc = bpy.context.scene
print("BLEND collections", {c.name: len(c.objects) for c in sc.collection.children})
print("BLEND cameras", [o.name for o in sc.objects if o.type == "CAMERA"], "frames", sc.frame_start, sc.frame_end, sc.render.fps)
print("BLEND materials", sorted(m.name for m in bpy.data.materials))
for name in ("tezkor_tunnel_scene.fbx", "tezkor_letters_kit.fbx", "tezkor_tunnel_scene.glb", "tezkor_letters_kit.glb"):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    if name.endswith(".fbx"):
        bpy.ops.import_scene.fbx(filepath=f"{d}/{name}")
    else:
        bpy.ops.import_scene.gltf(filepath=f"{d}/{name}")
    obs = bpy.context.scene.objects
    anim = [o.name for o in obs if o.animation_data and o.animation_data.action]
    print(name, Counter(o.type for o in obs), "animated:", anim[:3])
    if "kit" in name:
        print("   kit:", sorted((o.name, tuple(round(v, 2) for v in o.dimensions)) for o in obs if o.type == "MESH"))
