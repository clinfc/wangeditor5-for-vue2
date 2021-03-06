# props

## WeToolbar

| prop          | 描述                   | 类型                         |
| :------------ | :--------------------- | :--------------------------- |
| `option`      | 菜单栏配置项           | `Required<WeToolbarOption>`  |
| `eloadbefore` | 菜单栏重载前的回调函数 | `(toolbar: Toolbar) => void` |

## WeEditable

| prop           | 描述                                               | 类型                           |
| :------------- | :------------------------------------------------- | :----------------------------- |
| `option`       | 菜单栏配置项                                       | `Required<WeToolbarOption>`    |
| `eloadbefore`  | 菜单栏重载前的回调函数                             | `(toolbar: Toolbar) => void`   |
| `option`       | 编辑区配置项                                       | `Required<WeEditableOption>`   |
| `reloadbefore` | 编辑区重载前的回到函数                             | `(editor: IDomEditor) => void` |
| `json`         | 编辑器内容，支持 `.sync` 修饰符                    | `JSON String`                  |
| `html`         | 编辑器内容，支持 `.sync` 修饰符，优先级低于 `json` | `HTML String`                  |

## WeEditor

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
