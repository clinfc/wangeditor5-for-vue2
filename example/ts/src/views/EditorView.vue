<template>
  <WeEditor
    class="container"
    toolbar-class="toolbar"
    editable-class="editable"
    :toolbar-option="toolbar"
    :editable-option="editable"
  />
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default Vue.extend({
    data() {
      return {
        ...useWangEditor({
          config: {
            placeholder: '在 ts 中使用',
          },
        }),
      }
    },
  })
</script>
