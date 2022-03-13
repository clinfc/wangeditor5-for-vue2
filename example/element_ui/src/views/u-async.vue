<template>
  <el-card>
    <el-button-group>
      <el-button type="primary" @click="dialogVisible = true"> el-dialog </el-button>
      <el-button type="primary" @click="drawerVisible = true"> el-drawer </el-button>
    </el-button-group>
    <el-dialog
      append-to-body
      title="In Dralog"
      :visible.sync="dialogVisible"
      @open="dialogOpen"
      @opened="dialogOpened"
      width="800px"
    >
      <we-editor
        class="editor"
        toolbar-class="editor-toolbar"
        editable-class="editor-editable"
        :toolbar-option="dialog.toolbar"
        :editable-option="dialog.editable"
      />
    </el-dialog>
    <el-drawer append-to-body title="In Drawer" direction="rtl" size="800px" :visible.sync="drawerVisible">
      <we-editor
        class="editor"
        toolbar-class="editor-toolbar"
        editable-class="editor-editable"
        :toolbar-option="dialog.toolbar"
        :editable-option="dialog.editable"
      />
    </el-drawer>
  </el-card>
</template>
<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        dialogVisible: false,
        drawerVisible: false,
        dialog: useWangEditor({
          config: {
            placeholder: 'Use In Dialog',
          },
        }),
        drawer: useWangEditor({
          config: {
            placeholder: 'Use In Drawer',
          },
        }),
      }
    },
    methods: {
      dialogOpen() {
        console.log('dialog @open sync：', this.dialog.getEditable())
        this.dialog.getEditable(3000).then((inst) => {
          console.log('dialog @open async：', inst)
        })
      },
      dialogOpened() {
        console.log('dialog @opened sync：', this.dialog.getEditable())
        this.dialog.getEditable(3000).then((inst) => {
          console.log('dialog @opened async：', inst)
        })
      },
    },
  }
</script>
