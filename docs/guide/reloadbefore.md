# reloadbefore

在编辑器重载之前，会调用 `reloadbefore`/`toolbar-reloadbefore`/`editable-reloadbefore` 回调。当 `WeEditableOption.extendCahce` 为 `false` 时，我们可以配置此事件进行数据提交/缓存以防止数据丢失。

## WeToolbar/WeEditable

```html
<template>
  <div>
    <we-toolbar :reloadbefore="toolbarReloadbefore" :option="toolbar" />
    <we-editable :reloadbefore="editableReloadbefore" :option="editable" />
  </div>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        ...useWangEditor({
          config: {
            placeholder: 'WeToolbar + WeEditable 示例',
          },
        }),
      }
    },
    methods: {
      toolbarReloadbefore(inst) {
        console.log(inst)
        alert(`toolbar 即将重载：${new Date().toLocaleString()}`)
      },
      editableReloadbefore(inst) {
        console.log(inst)
        alert(`editable 即将重载：${new Date().toLocaleString()}`)
      },
    },
  }
</script>
```

## WeEditor

```html
<template>
  <we-editor
    :toolbar-reloadbefore="toolbarReloadbefore"
    :editable-reloadbefore="editableReloadbefore"
    :toolbar-option="toolbar"
    :editable-option="editable"
  />
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        ...useWangEditor({
          config: {
            placeholder: 'WeEditor 示例',
          },
        }),
      }
    },
    methods: {
      toolbarReloadbefore(inst) {
        console.log(inst)
        alert(`toolbar 即将重载：${new Date().toLocaleString()}`)
      },
      editableReloadbefore(inst) {
        console.log(inst)
        alert(`editable 即将重载：${new Date().toLocaleString()}`)
      },
    },
  }
</script>
```

## 注意事项

- `WeToolbar` 和 `WeEditable` 的 `reloadbefore` 回调可以通过 `reloadbefore prop` 进行配置
- `WeEditor` 需要通过 `toolbar-reloadbefore prop` 和 `editable-reloadbefore prop` 进行配置。
- [会触发重载的配置项](../guide/use-wang-editor.md#会触发重载的配置项)
