<template>
  <el-form ref="ruleForm" label-position="top">
    <el-form-item label="WeEditableOption.config.readOnly">
      <el-radio-group v-model="editable.config.readOnly">
        <el-radio :label="false">false</el-radio>
        <el-radio :label="true">true</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="WeToolbarOption.mode">
      <el-radio-group v-model="toolbar.mode">
        <el-radio v-for="t in options" :key="t" :label="t">{{ t }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="WeEditableOption.mode">
      <el-radio-group v-model="editable.mode">
        <el-radio v-for="t in options" :key="t" :label="t">{{ t }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="WeEditableOption.config.placeholder">
      <el-input placeholder="请输入内容" v-model="editable.config.placeholder" clearable />
    </el-form-item>
    <el-form-item label="WeEditor">
      <we-editor
        class="editor"
        toolbar-class="editor-toolbar"
        editable-class="editor-editable"
        :toolbar-option="toolbar"
        :editable-option="editable"
        :json="data"
      />
    </el-form-item>
  </el-form>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        data: '',
        options: ['default', 'simple'],
        ...useWangEditor({
          config: {
            placeholder: '来吧，<b style="color: red;">皮卡丘</b>，<big style="color: blue;">你可以的</big>！！！',
          },
        }),
      }
    },
  }
</script>
