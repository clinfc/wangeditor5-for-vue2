<style lang="scss">
  .u-prism {
    max-width: 100%;
  }
</style>

<template>
  <u-scroll class="u-prism" scroll-x scroll-y>
    <pre :class="`language-${lang}`"><code v-html="html"></code></pre>
  </u-scroll>
</template>

<script>
  import 'prismjs/themes/prism.css'

  import Prism from 'prismjs'
  // 必须在 Prism 之后引入
  import 'prismjs/components/prism-json.js'

  import UScroll from './u-scroll.vue'

  export default {
    components: { UScroll },
    name: 'UPrism',
    props: {
      content: {
        type: String,
        default: '',
      },
      lang: {
        type: String,
        default: 'html',
      },
    },
    computed: {
      html() {
        return Prism.highlight(this.content, Prism.languages[this.lang], this.lang)
      },
    },
  }
</script>
