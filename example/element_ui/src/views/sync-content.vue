<template>
  <div>
    <el-form ref="ruleForm" label-position="top" :model="formData" :rules="formRule">
      <el-form-item label="文章" prop="json">
        <we-editor
          class="editor"
          toolbar-class="editor-toolbar"
          editable-class="editor-editable"
          :toolbar-option="toolbar"
          :editable-option="editable"
          :json.sync="formData.json"
          :html.sync="formData.html"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交表单</el-button>
      </el-form-item>
    </el-form>
    <br />
    <u-prism style="--u-scroll-height: 300px" lang="json" :content="formData.json" />
  </div>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  import UPrism from '../components/u-prism.vue'

  export default {
    components: { UPrism },
    data() {
      const { editable, toolbar, syncContent } = useWangEditor({
        delay: 5000,
        config: {
          placeholder: '无操作 5s 后才会同步表单数据，表单提交前使用 syncContent API 强制同步数据，确保数据不被丢失',
        },
      })
      return {
        editable,
        toolbar,
        syncContent,
        formData: {
          json: '',
          html: '',
        },
        formRule: {
          json: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        },
      }
    },
    methods: {
      submit() {
        this.syncContent()

        this.$refs.ruleForm.validate((valid) => {
          if (!valid) return
          console.log({ ...this.formData })
        })
      },
    },
  }
</script>
