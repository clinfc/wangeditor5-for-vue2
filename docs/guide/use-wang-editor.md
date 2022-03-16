# useWangEditor

经过 `useWangEditor` 处理后，返回的 `editable` 和 `toolbar` 分别对应**编辑器**和**菜单栏**的配置项，不过此时的配置项对象具备了响应式特性，我们可以直接修改 `editable`/`toolbar` 对应属性来**更新**或**重载**编辑器。

如果传入的 `editableOption` 和 `toolbarOption` 是响应式数据，内部将自动解除与之前的关联，也就意味着经过 `useWangEditor` 处理后得到的 `editable` 和 `toolbar` 配置对象，即使内容发生变化也不会触发之前的依赖更新！！！

## useWangEditor 的类型

```js
/**
 * vue hook，用于实现编辑器配置项的动态绑定
 * @param {Object} editableOption 编辑器主体部分的配置
 * @param {Object} toolbarOption 菜单栏配置
 * @param {Number} reloadDelay 防抖时长，用于重载的延迟控制，默认值：500，单位：毫秒
 */
declare function useWangEditor(
  editableOption: WeEditableOption | null = null,
  toolbarOption: WeToolbarOption | null = null,
  reloadDelay: number
): {
  editable: Required<WeEditableOption>
  toolbar: Required<WeToolbarOption>
  getEditable: {
    (): IDomEditor | undefined;
    (timeout: number): Promise<IDomEditor>;
  }
  getToolbar: {
    (): Toolbar | undefined;
    (timeout: number): Promise<Toolbar>;
  }
  clearContent: () => void
  syncContent: () => void
  reloadEditor: () => void
}
```

## WeEditableOption

```js
/**
 * 编辑器配置项
 */
interface WeEditableOption {
  /** 编辑器模式 */
  mode?: 'default' | 'simple'
  /** 编辑器初始化的默认内容 */
  defaultContent?: Descendant[] | string | null
  /** 编辑器配置，具体配置以官方为准 */
  config?: Partial<IEditorConfig>
  /** v-bind:json.sync/v-bind:html.sync 数据同步的防抖时长，默认值：3000，单位：毫秒 */
  delay?: number
  /**
   * 编辑器创建时默认内容的优先级排序，默认值：true。
   * true： v-bind:json.sync > v-bind:html.sync > defaultContent > defaultHtml。
   * false: defaultContent > defaultHtml >  v-bind:json.sync > v-bind:html.sync。
   */
  extendCache?: boolean
}
```

### WeEditableOption.extendCache

当 `v-bind:json.sync`/`v-bind:html.sync` 与 `WeEditableOption.defaultContent`/`WeEditableOption.defaultHtml` 同时使用的时候，我们可以使用 `WeEditableOption.extendCache` 配置项来控制重载后编辑器的默认内容。

当 `WeEditableOption.extendCahce` 为 `true` 时，编辑器**创建**/**重载**时显示内容的优先级为：`v-bind:json.sync` > `v-bind:html.sync` > `WeEditableOption.defaultContent` > `WeEditableOption.defaultHtml`。

当 `WeEditableOption.extendCache` 为 `false` 时，编辑器**创建**/**重载**时显示内容的优先级为：`WeEditableOption.defaultContent` > `WeEditableOption.defaultHtml` > `v-bind:json.sync` > `v-bind:html.sync`。

> `false` 模式下可能会造成数据的丢失，因此在编辑器重载前一定要做好数据的保存工作，我们可以配合 `reloadbefore` 事件来进行数据的保存。

### 编辑器默认内容

`WeEditableOption.defaultContent`/`WeEditableOption.defaultHtml` 的变更默认情况下是不会触发编辑器的重载的。在编辑器已创建的情况下，如果需要将 `WeEditableOption.defaultContent`/`WeEditableOption.defaultHtml` 内容直接显示出来，我们需要通过 `reloadEditor` API 来强制重载编辑器。并且我们需要注意 `WeEditableOption.extendCache` 对编辑器创建时默认内容的影响。

> `defaultContent` 和 `defaultHtml` 不建议同时使用。如果需要切换使用，可以一个赋值为 null 另一个赋值真正的值。如：你需要从 `defaultContent` 切换到 `defaultHtml`，可以先赋值 `WeEditableOption.defaultContent = null`，然后再赋值 `WeEditableOption.defaultHtml = '<h1>标题一</h1><p>段落</p>'` 即可。

```js
import { useWangEditor } from 'wangeditor5-for-vue2'
export default {
  data() {
    return {
      ...useWangEditor(),
    }
  },
  mounted() {
    setTimeout(() => {
      // 当你进行了 v-bind:json.sync/v-bind:html.sync 绑定时，
      // 如果你想在编辑器重载后将 defaultContent 显示为编辑器的默认内容，
      // 那么你需要设置 extendCache 为 false，这会导致编辑器内容的丢失，
      // 可以合理搭配 reloadbefore 事件进行处理
      this.editable.extendCache = false

      // 然后再修改配置
      this.editable.defaultContent = [{ type: 'header1', children: [{ text: '标题一' }] }]

      // 同时还支持字符串形式的 JSON
      this.editable.defaultContent = '[{"type":"header1","children":[{"text":"标题一"}]}]'

      // or：配置 HTML 字符串
      this.editable.defaultHtml = '<h1>标题一</h1><p>段落</p>'

      // 最后，你还需要强制重载编辑器
      this.reloadEditor()
    }, 5000)
  },
}
```

## WeToolbarOption

```js
/**
 * 菜单栏的配置项
 */
interface WeToolbarOption {
  mode?: 'default' | 'simple'
  config?: Partial<IToolbarConfig>
}
```

## 动态修改配置

修改 `editable` 或 `toolbar` 的属性即可。

```js
import { useWangEditor } from 'wangeditor5-for-vue2'
export default {
  data() {
    return {
      ...useWangEditor(),
    }
  },
  mounted() {
    this.editable.config.placeholder = '新的 placeholder'

    // 切换为只读模式
    this.editable.config.readOnly = true

    this.toolbar.mode = 'simple'
  },
}
```

## API

### clearContent

不仅会清除编辑器内容，还会同步 `v-bind:json.sync`/`v-bind:html.sync` 数据

```js
const { clearContent } = useWangEditor()

clearContent()
```

受 `@wangeditor/editor` 内部限制，`WeEditableOption.config.readOnly` 为 `true` 时，执行 `clearContent()` 是无法清除内容的。
如果你仍希望进行编辑器内容清除，可以考虑使用 `reloadEditor()` 搭配 `WeEditableOption.defaultContent` 进行实现。

```js
import { useWangEditor } from 'wangeditor5-for-vue2'
export default {
  data() {
    return {
      ...useWangEditor(),
    }
  },
  methods: {
    customClearContent() {
      // 如果使用了 v-bind 进行双向绑定，一定要注意此配置项一定要设置为 false
      this.editable.extendCache = false

      this.editable.defaultContent = null
      this.reloadEditor()
    },
  },
}
```

> **为什么不通过修改 v-bind:json.sync/v-bind:html.sync 来清空数据**：
>
> 不是每一个用户都对富文本数据格式了如指掌。

### syncContent

> `v0.0.6+` 新增

由于组件内部对 `v-model` 的数据更新做了节流处理（节流时长由 `WeEditableOption.delay` 控制）。当 `delay` 的数值稍大，我们在输入内容后快速点击提交表单，那么此时 `v-model` 的数据将不是最新的，这将得不偿失。因此我们可以在表单提交前执行 `syncContent` 来解除 `WeEditableOption.delay` 的副作用，强制更新 `v-model` 数据，即可防止数据丢失。

以 `element-ui` 为例，在调用 `ElForm.validate` 方法前执行 `syncContent` 方法，即可避免数据丢失。

```vue
<template>
  <el-form ref="ruleForm" :model="formData" :rules="formRule">
    <el-form-item label="文章" prop="json">
      <we-editor
        :toolbar-option="toolbar"
        :editable-option="editable"
        :json.sync="formData.json"
        :html.sync="formData.html"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交表单</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  import UPrism from '../components/u-prism.vue'

  export default {
    components: { UPrism },
    data() {
      const { editable, toolbar, syncContent } = useWangEditor({
        delay: 5000, // 无操作 5s 后才会同步表单数据
        config: {
          placeholder: '表单提交前使用 syncContent API 强制同步数据，确保数据不被丢失',
        },
      })

      return {
        editable,
        toolbar,
        syncContent,
        formData: {
          json: '',
          html: '',
        },
        formRule: {
          json: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        },
      }
    },
    methods: {
      // 提交表单
      submit() {
        // 强制同步 v-model 数据
        this.syncContent()

        // 表单验证
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) return
          console.log({ ...this.formData })
        })
      },
    },
  }
</script>
```

### getToolbar

获取菜单栏实例

#### 同步模式

当我们不传入参数或传入的不是一个数字时，此时为同步模式。

```ts
const { getToolbar } = useWangEditor()

const toolbarInstance: Toolbar | undefined = getToolbar()
if (toolbarInstance) {
  // do somthing
} else {
  // do somthing
}
```

#### 异步模式

当我们传入一个数字时，传入的是异步超时时间。单位：毫秒。

> `v0.0.4+` 新增

```ts
const { getToolbar } = useWangEditor()

getToolbar(3000)
  .then((inst: Toolbar) => {
    // do somthing
  })
  .catch((e: Error) => {
    // do somthing
  })
```

### getEditable

获取编辑器实例

#### 同步模式

当我们不传入参数或传入的不是一个数字时，此时为同步模式。

```ts
const { getEditable } = useWangEditor()

const editableInstance: IDomEditor | undefined = getEditable()
if (editableInstance) {
  console.log(editableInstance.children)
} else {
  console.error('编辑器未实例化')
}
```

#### 异步模式

当我们传入一个数字时，传入的是异步超时时间。单位：毫秒。

> `v0.0.4+` 新增

```ts
const { getEditable } = useWangEditor()

getEditable(3000)
  .then((inst: IDomEditor) => {
    // do somthing
  })
  .catch((e: Error) => {
    // do somthing
  })
```

### reloadEditor

重载编辑器（销毁并重新创建）。

> 重载分为编辑器重载和菜单栏重载，编辑器重载会自动触发菜单栏重载，而菜单栏重载却不会触发编辑器重载。

#### 会触发重载的配置项

- 菜单栏
  - `WeToolbarOption` 的所有属性
- 编辑器
  - `WeEditableOption.mode`
  - `WeEditableOption.config.customPaste`
  - `WeEditableOption.config.decorate`
  - `WeEditableOption.config.hoverbarKeys`
  - `WeEditableOption.config.maxLength`
  - `WeEditableOption.config.EXTEND_CONF`
  - `WeEditableOption.config.MENU_CONF`

> `WeEditableOption` 的其它配置项虽不会触发重载，但是支持动态配置

```js
const { reloadEditor } = useWangEditor()

// 强制重载编辑器
reloadEditor()
```
