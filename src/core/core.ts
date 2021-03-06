import { IDomEditor, Toolbar } from '@wangeditor/editor'
import clone from 'lodash.clonedeep'
import Vue from 'vue'
import {
  DELAY,
  WeEditableHandle,
  WeEditableOption,
  WeEditableReload,
  WeToolbarHandle,
  WeToolbarOption,
  WeToolbarReload,
} from './types'

const EDITABLE_HANDLE: WeakMap<WeEditableOption, WeEditableHandle> = new WeakMap()

const TOOLBAR_HANDLE: WeakMap<WeToolbarOption, WeToolbarHandle> = new WeakMap()

/**
 * 实例与配置项间的关系
 */
export const INSTANCE_OPTION: WeakMap<IDomEditor | Toolbar, WeEditableOption | WeToolbarOption> = new WeakMap()

/** 编辑器 与 Toolbar 间的映射关系 */
export const EDITABLE_TOOLBAR: WeakMap<WeEditableOption, WeToolbarOption> = new WeakMap()

/** Toolbar 与 编辑器 间的映射关系 */
export const TOOLBAR_EDITABLE: WeakMap<WeToolbarOption, WeEditableOption> = new WeakMap()

export const TIMER: WeakMap<WeToolbarOption | WeEditableOption, [number, null | NodeJS.Timeout]> = new WeakMap()

export function getOption(inst: IDomEditor) {
  const editable = INSTANCE_OPTION.get(inst) as WeEditableOption

  return {
    editable,
    toolbar: EDITABLE_TOOLBAR.get(editable)!,
  }
}

export function setTimer(option: WeToolbarOption | WeEditableOption, fn?: () => void) {
  let timer = TIMER.get(option)
  if (timer) {
    if (timer[1]) {
      clearTimeout(timer[1])
      timer[1] = null
    }
  } else {
    TIMER.set(option, (timer = [DELAY.RELOAD, null]))
  }
  if (fn) {
    timer[1] = setTimeout(() => {
      timer![1] = null
      fn()
    }, timer[0])
  }
}

/**
 * vue hook，在 WeEditable 组件中使用
 */
export function injectEditor(
  option: WeEditableOption,
  reload: WeEditableReload,
  clearContent: () => void,
  syncContent: () => void
) {
  // 必须是 useWangEditor 函数创建的编辑区配置项
  if (!EDITABLE_TOOLBAR.has(option)) {
    throw new Error('You must use the Editable Opiton created by "useWangEditor" function!')
  }

  function reset() {
    const instance = reload()
    if (!instance) return

    INSTANCE_OPTION.set(instance, option)

    const temp = EDITABLE_HANDLE.get(option)
    if (!temp) {
      EDITABLE_HANDLE.set(option, { instance, reload: reset })
    } else {
      temp.instance = instance
    }

    // 自动重载 toolbar
    const toolbar = EDITABLE_TOOLBAR.get(option)
    if (toolbar) {
      const treload = TOOLBAR_HANDLE.get(toolbar)?.reload
      if (treload) {
        setTimer(toolbar)
        treload()
      }
    }
  }

  EDITABLE_HANDLE.set(option, { clearContent, syncContent, reload: reset })

  return reset
}

/**
 * vue hook，在 WeToolbar 组件中使用
 */
export function injectToolbar(option: WeToolbarOption, reload: WeToolbarReload) {
  // 必须是 useWangEditor 函数创建的菜单栏配置项
  if (!TOOLBAR_EDITABLE.has(option)) {
    throw new Error('You must use the Toolbar Opiton created by "useWangEditor" function!')
  }

  function reset() {
    const editableOptions = TOOLBAR_EDITABLE.get(option)
    if (!editableOptions) return

    const editable = EDITABLE_HANDLE.get(editableOptions)
    if (!editable || !editable.instance) return

    const instance = reload(editable.instance)
    if (!instance) return

    INSTANCE_OPTION.set(instance, option)

    const temp = TOOLBAR_HANDLE.get(option)
    if (!temp) {
      TOOLBAR_HANDLE.set(option, { instance, reload: reset })
    } else {
      temp.instance = instance
    }
  }

  TOOLBAR_HANDLE.set(option, { reload: reset })

  return reset
}

/**
 * vue hook，用于实现编辑器配置项的动态绑定
 * @param {Object} editableOption 编辑器主体部分的配置
 * @param {Object} toolbarOption 菜单栏配置
 * @param {Number} reloadDelay 防抖时长，用于重载的延迟控制，单位：毫秒
 */
export function useWangEditor(
  editableOption: WeEditableOption | null = null,
  toolbarOption: WeToolbarOption | null = null,
  reloadDelay: number = DELAY.RELOAD
) {
  const t1 = editableOption ? clone(editableOption) : {}
  const editable = Vue.observable({
    mode: 'default',
    defaultContent: null,
    delay: DELAY.UPDATE,
    extendCache: true,
    ...t1,
    ...{
      config: {
        customPaste: undefined,
        hoverbarKeys: undefined,
        maxLength: undefined,
        scroll: true,
        placeholder: '',
        readOnly: false,
        ...t1.config,
      },
    },
  }) as Required<WeEditableOption>

  const t2 = toolbarOption ? clone(toolbarOption) : {}
  const toolbar = Vue.observable({
    mode: t2.mode ?? 'default',
    config: {
      ...t2.config,
    },
  }) as Required<WeToolbarOption>

  EDITABLE_TOOLBAR.set(editable, toolbar)
  TOOLBAR_EDITABLE.set(toolbar, editable)
  TIMER.set(editable, [reloadDelay, null])
  TIMER.set(toolbar, [reloadDelay, null])

  /**
   * 获取编辑区实例
   * @param {Number} timeout 异步获取编辑区实例的超时时长，当不传入 timeout 时，此时为同步模式。单位：毫秒。
   */
  function getEditable(): IDomEditor | undefined
  function getEditable(timeout: number): Promise<IDomEditor>
  function getEditable(timeout?: number): Promise<IDomEditor> | IDomEditor | undefined {
    if (typeof timeout !== 'number' || Number.isNaN(timeout)) {
      return EDITABLE_HANDLE.get(editable)?.instance
    }
    return new Promise((resolve, reject) => {
      const end = Date.now() + timeout

      function get() {
        const inst = getEditable()
        if (inst) {
          resolve(inst)
        } else if (Date.now() < end) {
          requestAnimationFrame(get)
        } else {
          reject(new Error(`unable to get the editable instance!`))
        }
      }

      requestAnimationFrame(get)
    })
  }

  /**
   * 获取菜单栏实例
   * @param {Number} timeout 异步获取菜单栏实例的超时时长，当不传入 timeout 时，此时为同步模式。单位：毫秒。
   */
  function getToolbar(): Toolbar | undefined
  function getToolbar(timeout: number): Promise<Toolbar>
  function getToolbar(timeout?: number): Promise<Toolbar> | Toolbar | undefined {
    if (typeof timeout !== 'number' || Number.isNaN(timeout)) {
      return TOOLBAR_HANDLE.get(toolbar)?.instance
    }
    return new Promise((resolve, reject) => {
      const end = Date.now() + timeout

      function get() {
        const inst = getToolbar()
        if (inst) {
          resolve(inst)
        } else if (Date.now() < end) {
          requestAnimationFrame(get)
        } else {
          reject(new Error(`unable to get the toolbar instance!`))
        }
      }

      requestAnimationFrame(get)
    })
  }

  /**
   * 清除富文本内容缓存
   */
  function clearContent() {
    EDITABLE_HANDLE.get(editable)?.clearContent?.()
  }

  /**
   * 强制将数据同步到 v-model 上
   */
  function syncContent() {
    EDITABLE_HANDLE.get(editable)?.syncContent?.()
  }

  /**
   * 重载编辑器（销毁重建)
   */
  function reloadEditor() {
    const reload = EDITABLE_HANDLE.get(editable)?.reload
    if (reload) {
      setTimer(toolbar)
      setTimer(editable)
      reload()
    }
  }

  return { editable, toolbar, getEditable, getToolbar, clearContent, syncContent, reloadEditor }
}
