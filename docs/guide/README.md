# 快速开始

## 安装

```sh
yarn add @wangeditor/editor wangeditor5-for-vue2
// or
npm install @wangeditor/editor wangeditor5-for-vue2
```

## 组件注册

### 全局注册

```js
import Vue from 'vue'
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

```js
import { WeEditor } from 'wangeditor5-for-vue2'
import '@wangeditor/editor/dist/css/style.css'

export default {
  components: { WeEditor },
}
```

## 示例

### WeToolbar + WeEditable

```vue
<template>
  <div>
    <we-toolbar :option="toolbar" />
    <we-editable :option="editable" :json.sync="data.json" :html.sync="data.html" />
  </div>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      const { toolbar, editable, getToolbar, getEditable, clearContent, reloadEditor } = useWangEditor({
        config: {
          placeholder: 'WeToolbar + WeEditable 示例',
          onCreated: (inst) => {
            console.log(inst)
            // 使用了箭头函数，因此 this 指向当前组件实例
            console.log(this.editable.config.placeholder)
          },
        },
      })

      return {
        toolbar,
        editable,
        getToolbar,
        getEditable,
        clearContent,
        reloadEditor,
        data: {
          json: '',
          html: '',
        },
      }
    },
  }
</script>
```

### WeEditor

```vue
<template>
  <we-editor :toolbar-option="toolbar" :editable-option="editable" :json.sync="data.json" :html.sync="data.html" />
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        data: {
          json: '',
          html: '',
        },
        ...useWangEditor({
          config: {
            placeholder: 'WeEditor 示例',
            onCreated: (inst) => {
              console.log(inst)
              // 使用了箭头函数，因此 this 指向当前组件实例
              console.log(this.editable.config.placeholder)
            },
          },
        }),
      }
    },
  }
</script>
```
