import Vue, { PluginObject } from 'vue'
import debounce from 'lodash.debounce'
import { createEditor, IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { EDITABLE_TOOLBAR, injectEditor, setTimer } from './core'
import { WeEditableComponentComputed, WeEditableComponentProps } from './types'
import { ExtendedVue } from 'vue/types/vue'

export const WeEditable = Vue.extend<unknown, unknown, WeEditableComponentComputed, WeEditableComponentProps>({
  name: 'WeEditable',
  props: {
    option: {
      type: Object,
      required: true,
    },
    reloadbefore: {
      type: Function,
      default: () => () => {},
    },
    json: String,
    html: String,
  },
  computed: {
    modelHtml() {
      return typeof this.html === 'string'
    },
    modelJson() {
      return typeof this.json === 'string'
    },
  },
  created() {
    /**
     * 编辑器内容缓存
     */
    const cache = {
      json: '',
      html: '',
    }

    let instance: IDomEditor | null = null

    /**
     * 更新数据，将编辑器内容（json）同步到父组件。实现 v-editor-model。
     */
    const updateJson = (e: IDomEditor) => {
      // 异步执行时，编辑器可能已销毁重建
      if (!e || e != instance) return
      const jstr = e.isEmpty() ? '' : JSON.stringify(e.children)
      if (cache.json !== jstr) {
        cache.json = jstr
        this.$emit('update:json', jstr)
      }
    }

    /**
     * 更新数据，将编辑器内容（html）同步到父组件。实现 v-editor-model:html。
     */
    const updateHtml = (e: IDomEditor) => {
      // 异步执行时，编辑器可能已销毁重建
      if (!e || e != instance) return
      const html = e.isEmpty() ? '' : e.getHtml()
      if (cache.html !== html) {
        cache.html = html
        this.$emit('update:html', html)
      }
    }

    /** 手动更新数据 */
    const executeUpdate = (instance: IDomEditor) => {
      // 初始化/clear函数/组件销毁 的使用频率没有数据更新的使用频率高，因此将 modeJson 从 updateJson 中剔除，置于 updateJson 执行前执行。
      this.modelJson && updateJson(instance)
      this.modelHtml && updateHtml(instance)
    }

    // 封装 change 事件，实现数据 v-model 和 v-model:html
    const changes: ((e: IDomEditor) => void)[] = []

    const onOptionConfigOnChange = () => {
      changes.length = 0

      const { delay, config } = this.option
      this.modelJson && changes.push(delay > 0 ? debounce(updateJson, delay) : updateJson)
      this.modelHtml && changes.push(delay > 0 ? debounce(updateHtml, delay) : updateHtml)
      if (config && config.onChange) {
        changes.push(config.onChange)
      }
    }

    this.$watch('option.delay', onOptionConfigOnChange)
    this.$watch('option.config.onChange', onOptionConfigOnChange)

    const globalCallback: Partial<IEditorConfig> = {
      customAlert: (info, type) => {
        this.option.config.customAlert?.(info, type)
      },
      onCreated: (editor) => {
        this.option.config.onCreated?.(editor)
      },
      onDestroyed: (editor) => {
        this.option.config.onDestroyed?.(editor)
      },
      onMaxLength: (editor) => {
        this.option.config.onMaxLength?.(editor)
      },
      onFocus: (editor) => {
        this.option.config.onFocus?.(editor)
      },
      onBlur: (editor) => {
        this.option.config.onBlur?.(editor)
      },
      onChange: (editor) => {
        changes.forEach((change) => change(editor))
      },
    }

    /**
     * 初始化编辑器
     */
    const initialize = () => {
      const elem = this.$refs.elem as HTMLDivElement
      if (!elem) return

      if (instance) {
        // 强制更新数据，避免数据丢失
        executeUpdate(instance)

        // 执行 reloadbefore 事件
        this.reloadbefore(instance)
        instance.destroy()
        instance = null
      } else {
        onOptionConfigOnChange()
      }

      // 解除 vue 副作用，否则将意外不断
      const { mode, config, defaultContent, defaultHtml, extendCache } = this.option

      const temp = {
        selector: elem,
        mode: mode ?? 'default',
        config: {
          ...config,
          ...globalCallback,
        },
      }

      let content = ''
      let htmltemp = ''

      if (extendCache) {
        if (cache.json.length > 2) {
          content = cache.json
        } else if (cache.html) {
          htmltemp = cache.html
        } else {
          if (defaultContent) {
          }
          if (content.length < 3 && typeof defaultHtml === 'string') {
            htmltemp = defaultHtml
          }
        }
      } else {
        if (defaultContent) {
          content = Array.isArray(defaultContent) ? JSON.stringify(defaultContent) : defaultContent
        }
        if (content.length < 3) {
          if (typeof defaultHtml === 'string' && defaultHtml.length) {
            htmltemp = defaultHtml
          } else {
            if (cache.json.length > 2) {
              content = cache.json
            } else if (cache.html) {
              htmltemp = cache.html
            }
          }
        }
      }

      try {
        const jsono = JSON.parse(content)
        if (jsono.length) {
          instance = createEditor({ ...temp, content: jsono })
        }
      } catch (e) {
      } finally {
        if (!instance) instance = createEditor({ ...temp, html: htmltemp })
      }

      if (!instance.isEmpty()) {
        executeUpdate(instance)
      }

      return instance
    }

    /**
     * 清除组件中的富文本内容和缓存
     */
    const clearContent = () => {
      if (!instance || instance.isEmpty()) return
      instance.clear()

      // 强制进行数据同步，避免延迟机制导致数据丢失
      executeUpdate(instance)
    }

    const reload = injectEditor(this.option, initialize, clearContent, () => executeUpdate(instance!))

    this.$on('hook:mounted', reload)

    this.$on('hook:beforeDestroy', () => {
      if (instance) {
        // 强制进行数据更新，避免延迟机制导致数据丢失
        executeUpdate(instance)
        instance.blur()
        setTimeout(() => {
          instance?.destroy()
          instance = null
        }, 1000)
      }
    })

    // 监听 v-bind:json 变化
    this.$watch(
      'json',
      () => {
        if (!this.modelJson || this.json === cache.json) return

        if (!instance) {
          cache.json = this.json!
          return
        }

        instance.clear()
        try {
          const json = JSON.parse(this.json)
          instance.insertFragment(json)
        } catch (error) {}
      },
      { immediate: true }
    )

    // 监听 v-bind:html
    this.$watch(
      'html',
      () => {
        // 以 v-bind:json 为主
        if (this.modelJson || !this.modelHtml || this.html === cache.html) return

        if (!instance) {
          cache.html = this.html
          return
        }

        instance.clear()
        instance.dangerouslyInsertHtml(this.html)
      },
      { immediate: true }
    )

    // 配置项触发重载
    const onOptionChangeEmitReload = () => {
      // 编辑器变更会自动更新 toolbar
      const toolbar = EDITABLE_TOOLBAR.get(this.option)
      toolbar && setTimer(toolbar)
      setTimer(this.option, reload)
    }

    this.$watch('option.mode', onOptionChangeEmitReload)
    this.$watch('option.config.decorate', onOptionChangeEmitReload)
    this.$watch('option.config.maxLength', onOptionChangeEmitReload)
    this.$watch('option.config.customPaste', onOptionChangeEmitReload)
    this.$watch('option.config.hoverbarKeys', onOptionChangeEmitReload, { deep: true })
    this.$watch('option.config.MENU_CONF', onOptionChangeEmitReload, { deep: true })
    this.$watch('option.config.EXTEND_CONF', onOptionChangeEmitReload, { deep: true })
    this.$watch('option.config.hoverbarKeys', onOptionChangeEmitReload, { deep: true })
    this.$watch('option.config.hoverbarKeys', onOptionChangeEmitReload, { deep: true })

    this.$watch('option.config.readOnly', (nv) => {
      if (instance) {
        nv ? instance.disable() : instance.enable()
      }
    })

    this.$watch('option.config.placeholder', (nv) => {
      const target = (this.$refs.elem as HTMLDivElement | undefined)?.querySelector('.w-e-text-placeholder')
      if (target instanceof HTMLElement) target.innerHTML = nv ?? ''
    })

    this.$watch('option.config.scroll', (nv) => {
      const target = (this.$refs.elem as HTMLDivElement | undefined)?.querySelector('.w-e-scroll')
      if (target instanceof HTMLElement) target.style.overflowY = nv ? 'auto' : ''
    })
  },
  render(h) {
    return h('div', { ref: 'elem' })
  },
}) as ExtendedVue<Vue, unknown, unknown, WeEditableComponentComputed, WeEditableComponentProps> & PluginObject<never>

WeEditable.install = function (vue: typeof Vue) {
  vue.component('WeEditable', WeEditable)
}
