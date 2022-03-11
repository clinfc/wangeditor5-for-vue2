# Vetur

通过简单配置，即可让 `Vetur` 支持本组件库相关组件的[语法提示和自动完成](https://vuejs.github.io/vetur/guide/component-data.html#supported-frameworks)功能。

## 快速使用

在 `package.json` 文件中进行如下配置，然后重启 `vscode` 即可。

```json
{
  "vetur": {
    "tags": "wangeditor5-for-vue2/vetur/tags.json",
    "attributes": "wangeditor5-for-vue2/vetur/attributes.json"
  }
}
```

## 更多

如果你还有其它自定义的 [`Vetur`](https://vuejs.github.io/vetur/guide/component-data.html#workspace-component-data) 配置文件，你可以直接将 `node_modules/wangeditor5-for-vue2/vetur` 下的文件与你自己的文件内容进行手动合并即可。
