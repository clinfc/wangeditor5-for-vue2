# wangeditor5-for-vue2

在 [Vue2](https://cn.vuejs.org/v2) 中使用 [wangEditor5](https://www.wangeditor.com/v5/)。

> `wangEditor` 是一款开源 `Web` 富文本编辑器，开箱即用，配置简单

## 在线示例

[https://clinfc.github.io/wangeditor5-for-vue2-example](https://clinfc.github.io/wangeditor5-for-vue2-example)

## 快速开始

```sh
yarn add @wangeditor/editor wangeditor5-for-vue2
// or
npm install @wangeditor/editor wangeditor5-for-vue2
```

## 使用文档

- [wangeditor5](https://www.wangeditor.com)
- [wangeditor5-for-vue2](https://clinfc.github.io/wangeditor5-for-vue2)
- [wangeditor5-for-vue3](https://clinfc.github.io/wangeditor5-for-vue3)

## 功能亮点

- **动态配置**

  符合 `Vue` 使用习惯，数据驱动，通过修改配置即可更新编辑器（编辑器创建后修改配置项仍生效）

- **双向绑定**

  支持 `v-bind:json` 和 `v-bind:html` 两种形式的双向绑定，分别对应 `json string` 和 `html string` 两种形式的数据

- **初始内容**

  编辑器创建时的默认内容配置项支持 `json array`、`json string` 和 `html string` 三种格式的数据

- **优雅切换**

  `defaultContent`/`defaultHtml` + `reloadEditor()` 可优雅的实现在不同文章间的来回切换

- **Vetur**
  提供 `Vetur` 语法提示和自动完成所需的配置文件

- **toggle mode**

  内置编辑器模式切换菜单，通过简单的配置后，客户便可以在使用时切换喜欢的模式了。

### 示例代码

- [element-ui](./example/element_ui)
- [typescript](./example/ts/)

### 兼容性

- `vue@^2`
- `@wangeditor/editor@^5.0.0`

### 交流

- 提交 [issues](https://github.com/clinfc/wangeditor5-for-vue2/issues)
- QQ 群：`343186156`
