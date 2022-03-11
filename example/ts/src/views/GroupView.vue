<template>
  <div class="container">
    <WeToolbar class="toolbar" :option="toolbar" />
    <WeEditable class="editable" :option="editable" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useWangEditor } from 'wangeditor5-for-vue2'

  export default Vue.extend({
    data() {
      return {
        ...useWangEditor({
          config: {
            placeholder: '在 TS 中使用',
          },
        }),
      }
    },
  })
</script>
