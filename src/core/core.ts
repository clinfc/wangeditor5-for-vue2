import clone from 'lodash.clonedeep'
import Vue from 'vue'
import {
  DELAY,
  WeEditableHandle,
  WeEditableOption,
  WeEditableReload,
  WeEditorFormFields,
  WeToolbarHandle,
  WeToolbarOption,
  WeToolbarReload,
} from './types'

const EDITABLE_HANDLE: WeakMap<WeEditableOption, WeEditableHandle> = new WeakMap()

const TOOLBAR_HANDLE: WeakMap<WeToolbarOption, WeToolbarHandle> = new WeakMap()

/** 编辑器 与 Toolbar 间的映射关系 */
export const EDITABLE_TOOLBAR: WeakMap<WeEditableOption, WeToolbarOption> = new WeakMap()

/** Toolbar 与 编辑器 间的映射关系 */
export const TOOLBAR_EDITABLE: WeakMap<WeToolbarOption, WeEditableOption> = new WeakMap()

export const TIMER: WeakMap<WeToolbarOption | WeEditableOption, [number, null | number]> = new WeakMap()

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
export function injectEditor(option: WeEditableOption, reload: WeEditableReload, clearContent: () => void) {
  function reset() {
    const instance = reload()
    if (!instance) return

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

  EDITABLE_HANDLE.set(option, { clearContent, reload: reset })

  return reset
}

/**
 * vue hook，在 WeToolbar 组件中使用
 */
export function injectToolbar(option: WeToolbarOption, reload: WeToolbarReload) {
  function reset() {
    const editableOptions = TOOLBAR_EDITABLE.get(option)
    if (!editableOptions) return

    const editable = EDITABLE_HANDLE.get(editableOptions)
    if (!editable || !editable.instance) return

    const instance = reload(editable.instance)
    if (!instance) return

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
   * 获取编辑器实例
   */
  function getEditable() {
    return EDITABLE_HANDLE.get(editable)?.instance
  }

  /**
   * 获取菜单栏实例
   */
  function getToolbar() {
    return TOOLBAR_HANDLE.get(toolbar)?.instance
  }

  /**
   * 清除富文本内容缓存
   */
  function clearContent() {
    EDITABLE_HANDLE.get(editable)?.clearContent?.()
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

  return { editable, toolbar, getEditable, getToolbar, clearContent, reloadEditor }
}
