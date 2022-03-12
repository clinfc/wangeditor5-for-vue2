import { createToolbar, IDomEditor, Toolbar } from '@wangeditor/editor'
import Vue, { PluginObject, PropType } from 'vue'
import { ExtendedVue } from 'vue/types/vue'
import { injectToolbar, setTimer, TIMER, TOOLBAR_EDITABLE } from './core'
import { WeToolbarComponentProps, WeToolbarOption } from './types'

export const WeToolbar = Vue.extend({
  name: 'WeToolbar',
  props: {
    option: {
      type: Object as PropType<Required<WeToolbarOption>>,
      default() {
        return { mode: 'default', config: {} } as Required<WeToolbarOption>
      },
    },
    reloadbefore: {
      type: Function as PropType<(inst: Toolbar) => void>,
      default: () => () => {},
    },
  },
  created() {
    let instance: null | Toolbar = null

    const initialize = (editor: IDomEditor) => {
      const elem = this.$refs.elem as HTMLDivElement | undefined

      if (!elem) return

      if (instance) {
        this.reloadbefore(instance)
        instance.destroy()
        delete elem.dataset.wEToolbar
      }

      instance = createToolbar({ ...this.option, editor, selector: elem })

      return instance
    }

    const reload = injectToolbar(this.option, initialize)

    this.$watch(
      'option',
      () => {
        const editable = TOOLBAR_EDITABLE.get(this.option)

        // 编辑器变更会自动更新 toolbar
        if (!editable || TIMER.get(editable)?.[1] !== null) return

        setTimer(this.option, reload)
      },
      { deep: true }
    )

    this.$on('hook:mounted', reload)

    this.$on('hook:beforeDestroy', function () {
      if (!instance) return
      instance.destroy()
      instance = null
    })
  },
  render(h) {
    return h('div', { ref: 'elem' })
  },
}) as ExtendedVue<Vue, unknown, unknown, unknown, WeToolbarComponentProps> & PluginObject<never>

WeToolbar.install = function (vue: typeof Vue) {
  vue.component('WeToolbar', WeToolbar)
}
