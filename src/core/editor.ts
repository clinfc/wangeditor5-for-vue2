import { WeEditable } from './editable'
import Vue from 'vue'
import { WeToolbar } from './toolbar'
import { DELAY, WeEditableOption, WeEditorProps, WeToolbarOption } from './types'

export const WeEditor = Vue.extend<{}, {}, {}, WeEditorProps>({
  name: 'WeEditor',
  props: {
    toolbarOption: {
      type: Object,
      default() {
        return { mode: 'default', config: {} } as Required<WeToolbarOption>
      },
    },
    toolbarClass: [String, Object, Array],
    toolbarStyle: [String, Object],
    toolbarReloadbefore: {
      type: Function,
      default: () => () => {},
    },
    editableOption: {
      type: Object,
      default() {
        return {
          mode: 'default',
          defaultContent: null,
          delay: DELAY.UPDATE,
          extendCache: true,
          config: {},
        } as Required<WeEditableOption>
      },
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
})

// @ts-ignore
WeEditor.install = function (vue: typeof Vue) {
  vue.component('WeEditor', WeEditor)
}
