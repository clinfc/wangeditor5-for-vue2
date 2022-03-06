# 快速开始

`@wangeditor/editor` 的版本建议在 `0.14.0` 及以上，因为 `0.14.0` 以下的版本不支持 `defaultHtml` 选项配置。

## 安装

```sh
yarn add @wangeditor/editor wangeditor5-for-vue2
// or
npm install @wangeditor/editor wangeditor5-for-vue2
```

## 组件注册

### 全局注册

```js
import { createApp } from 'vue'
import { WeToolbar, WeEditable, WeEditor } from 'wangeditor5-for-vue2'
import '@wangeditor/editor/dist/css/style.css'

Vue.use(WeToolbar)
Vue.use(WeEditable)
Vue.use(WeEditor)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

### 局部注册

```js
import { WeEditable, WeToolbar } from 'wangeditor5-for-vue2'
import '@wangeditor/editor/dist/css/style.css'

export default {
  components: { WeEditable, WeToolbar },
}
```

或

```ts
import { WeEditor } from 'wangeditor5-for-vue2'
import '@wangeditor/editor/dist/css/style.css'

export default {
  components: { WeEditor },
}
```

## 完全示例

### WeToolbar + WeEditable

```html
<template>
  <div>
    <we-toolbar :option="we.toolbar" :reloadbefore="toolbarReloadbefore" />
    <we-editable
      :option="we.editable"
      :reloadbefore="editableReloadbefore"
      :json.sync="data.json"
      :html.sync="data.html"
    />
  </div>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        we: {
          toolbar: null,
          editable: null,
          getToolbar: null,
          getEditable: null,
          clearContent: null,
          reloadEditor: null,
        },
        data: {
          json: '',
          html: '',
        },
      }
    },
    created() {
      this.we = useWangEditor({
        config: {
          placeholder: 'WeToolbar + WeEditable 示例',
        },
      })
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

### WeEditor

```html
<template>
  <we-editor
    :toolbar-option="we.toolbar"
    :editable-option="we.editable"
    :json.sync="data.json"
    :html.sync="data.html"
  />
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        we: {
          toolbar: null,
          editable: null,
          getToolbar: null,
          getEditable: null,
          clearContent: null,
          reloadEditor: null,
        },
        data: {
          json: '',
          html: '',
        },
      }
    },
    created() {
      this.we = useWangEditor({
        config: {
          placeholder: 'WeEditor 示例',
        },
      })
    },
  }
</script>
```

#### props

| prop                   | 描述                                               | 类型                           |
| :--------------------- | :------------------------------------------------- | :----------------------------- |
| `toolbarOption`        | 菜单栏配置项                                       | `Required<WeToolbarOption>`    |
| `toolbarClass`         | 菜单栏的 `class attribute`                         | `String`                       |
| `toolbarStyle`         | 菜单栏的 `style attribute`                         | `String`                       |
| `toolbarReloadbefore`  | 菜单栏重载前的回调函数                             | `(toolbar: Toolbar) => void`   |
| `editableOption`       | 编辑区配置项                                       | `Required<WeEditableOption>`   |
| `editableClass`        | 编辑区的 `class attribute`                         | `String`                       |
| `editableStyle`        | 编辑区的 `style attribute`                         | `String`                       |
| `editableReloadbefore` | 编辑区重载前的回到函数                             | `(editor: IDomEditor) => void` |
| `json`                 | 编辑器内容，支持 `.sync` 修饰符                    | `JSON String`                  |
| `html`                 | 编辑器内容，支持 `.sync` 修饰符，优先级低于 `json` | `HTML String`                  |
