# 双向绑定

`WeEditable`/`WeEditor` 组件同时支持 `v-bind:json.sync` 和 `v-bind:html.sync` 两种形式的双向绑定，分别对应 `json string` 和 `html string` 两种格式的数据。

**注意事项：**

- 注意 `WeEditableOption.extendCache` 可能存在的影响！！！
- `v-bind:json.sync` 和 `v-bind:html.sync` 同时使用时，如果你想通过修改 `v-bind:html.sync` 绑定的变量进行数据变更是不可实现的，因为 `v-bind:html.sync` 的优先级比 `v-bind:json.sync` 低。