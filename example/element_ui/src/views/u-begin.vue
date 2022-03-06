<template>
  <div class="begin">
    <div class="editor">
      <we-toolbar class="editor-toolbar" :option="we1.toolbar" />
      <we-editable class="editor-editable" :option="we1.editable" />
    </div>
    <we-editor
      class="editor"
      style="margin-top: 20px"
      toolbar-class="editor-toolbar"
      editable-class="editor-editable"
      :toolbar-option="we2.toolbar"
      :editable-option="we2.editable"
    />
  </div>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        we1: {
          toolbar: null,
          editable: null,
          getToolbar: null,
          getEditable: null,
          clearContent: null,
          reloadEditor: null,
        },
        we2: {
          toolbar: null,
          editable: null,
          getToolbar: null,
          getEditable: null,
          clearContent: null,
          reloadEditor: null,
        },
      }
    },
    created() {
      this.we1 = useWangEditor({
        config: {
          placeholder: 'WeToolbar + WeEditable 示例',
        },
      })

      this.we2 = useWangEditor({
        config: {
          placeholder: 'WeEditor 示例',
        },
      })
    },
  }
</script>
