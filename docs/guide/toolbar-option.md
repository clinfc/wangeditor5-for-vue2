# WeToolbarOption

```js
/**
 * 菜单栏的配置项
 */
interface WeToolbarOption {
  mode?: 'default' | 'simple'
  config?: Partial<IToolbarConfig>
}
```

## mode

菜单栏的模式，更多详情请查看 [mode 模式](https://www.wangeditor.com/v5/getting-started.html#mode-%E6%A8%A1%E5%BC%8F)。

## config

这是菜单栏的具体配置，详细的配置项以 wangEditor v5 官方文档为准（认准文档中的 toolbarConfig 关键字）。[前往查看](https://www.wangeditor.com/v5/toolbar-config.html)。
