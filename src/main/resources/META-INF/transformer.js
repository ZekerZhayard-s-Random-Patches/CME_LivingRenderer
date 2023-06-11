
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "LivingRenderer_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/client/renderer/entity/LivingRenderer",
                "methodName": "<init>",
                "methodDesc": "(Lnet/minecraft/client/renderer/entity/EntityRendererManager;Lnet/minecraft/client/renderer/entity/model/EntityModel;F)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("net/minecraft/client/renderer/entity/LivingRenderer") && node.name.equals(ASMAPI.mapField("field_177097_h")) && node.desc.equals("Ljava/util/List;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/cme_livingrenderer/CopyOnWriteArrayListWithMutableIterator", "create", "()Ljava/util/List;", false));
                    }
                }
                return mn;
            }
        }
    }
}
