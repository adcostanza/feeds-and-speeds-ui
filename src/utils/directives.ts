import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue";

export const decimalNumber = {
  update: (element: Element, binding: DirectiveBinding, vnode: VNode, oldVNode: VNode) => {
    // console.log(binding)
    // console.log(element)
    // console.log(vnode)
    // console.log(oldVNode)
    if (vnode.data.model.value !== vnode.data.model.value) {
      vnode.data.model.value = "potato"
    }
  },
};
