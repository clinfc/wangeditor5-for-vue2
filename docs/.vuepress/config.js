module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: 'wangeditor5-for-vue2',
  description: '支持动态配置的 wangEditor5 for vue2 组件',
  base: '/wangeditor5-for-vue2/',

  themeConfig: {
    // logo: 'https://www.wangeditor.com/v5/image/logo.png',
    locales: {
      '/': {
        lang: 'zh-CN',
        selectLanguageName: '简体中文',
        nav: [
          { text: '快速开始', link: '/guide/' },
          {
            text: 'keywords',
            items: [
              { text: 'WeToolbar/WeEditable', link: '/guide/#wetoolbar-weeditable' },
              { text: 'WeEditor', link: '/guide/#weeditor' },
              { text: 'useWangEditor', link: '/guide/use-wang-editor.md' },
              { text: 'clearContent', link: '/guide/use-wang-editor.md#clearcontent' },
              { text: 'getToolbar', link: '/guide/use-wang-editor.md#gettoolbar' },
              { text: 'getEditable', link: '/guide/use-wang-editor.md#geteditable' },
              { text: 'reloadEditor', link: '/guide/use-wang-editor.md#reloadeditor' },
              { text: 'WeEditableOption', link: '/guide/use-wang-editor.md#weeditableoption' },
              { text: 'WeToolbarOption', link: '/guide/use-wang-editor.md#wetoolbaroption' },
              { text: '会触发重载的配置项', link: '/guide/use-wang-editor.md#会触发重载的配置项' },
            ],
          },
          {
            text: '使用示例',
            items: [
              {
                text: 'element-ui',
                link: 'https://github.com/clinfc/wangeditor5-for-vue2/tree/main/example/element_ui',
              },
              {
                text: 'typescript',
                link: 'https://github.com/clinfc/wangeditor5-for-vue2/tree/main/example/ts',
              },
            ],
          },
          {
            text: '友情链接',
            items: [
              { text: 'wangEditor5', link: 'https://www.wangeditor.com/v5' },
              { text: 'wangeditor5-for-vue3', link: 'https://clinfc.github.io/wangeditor5-for-vue3/' },
              { text: 'Vue2', link: 'https://cn.vuejs.org/v2' },
            ],
          },
          { text: 'Github', link: 'https://github.com/clinfc/wangeditor5-for-vue2' },
        ],
        sidebar: {
          '/guide/': ['', 'props', 'use-wang-editor', 'reloadbefore', 'v-model', 'relevance', 'vetur'],
        },
      },
    },
  },
}
