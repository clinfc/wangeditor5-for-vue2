import { WeEditable } from './editable'
import Vue, { PluginObject } from 'vue'
import { WeToolbar } from './toolbar'
import { DELAY, WeEditableOption, WeEditorComponentProps, WeToolbarOption } from './types'
import { ExtendedVue } from 'vue/types/vue'

export const WeEditor = Vue.extend<unknown, unknown, unknown, WeEditorComponentProps>({
  name: 'WeEditor',
  props: {
    toolbarOption: {
      type: Object,
      required: true,
    },
    toolbarClass: [String, Object, Array],
    toolbarStyle: [String, Object],
    toolbarReloadbefore: {
      type: Function,
      default: () => () => {},
    },
    editableOption: {
      type: Object,
      required: true,
    },
    editableClass: [String, Object],
    editableStyle: [String, Object],
    editableReloadbefore: {
      type: Function,
      default: () => () => {},
    },
    json: String,
    html: String,
  },
  render(h) {
    return h('div', [
      h(WeToolbar, {
        class: this.toolbarClass,
        style: this.toolbarStyle,
        props: {
          option: this.toolbarOption,
          reloadbefore: this.toolbarReloadbefore,
        },
      }),
      h(WeEditable, {
        class: this.editableClass,
        style: this.editableStyle,
        props: {
          option: this.editableOption,
          json: this.json,
          html: this.html,
          reloadbefore: this.editableReloadbefore,
        },
        on: {
          'update:json': (value: string) => this.$emit('update:json', value),
          'update:html': (value: string) => this.$emit('update:html', value),
        },
      }),
    ])
  },
}) as ExtendedVue<Vue, unknown, unknown, unknown, WeEditorComponentProps> & PluginObject<never>

WeEditor.install = function (vue: typeof Vue) {
  vue.component('WeEditor', WeEditor)
}
