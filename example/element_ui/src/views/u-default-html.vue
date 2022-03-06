<template>
  <div>
    <el-form ref="ruleForm" label-position="top" :model="data" :rules="rules">
      <el-form-item label="extendCache">
        <el-switch v-model="we.editable.extendCache" active-text="true" inactive-text="false" />
      </el-form-item>
      <el-form-item label="defaultHtml">
        <el-select v-model="data.article" placeholder="请选择">
          <el-option v-for="item in article" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
        <span v-show="we.editable.extendCache">
          extendCache 为 true 时，切换 defaultHtml 前需要先
          <el-button type="text" @click="we.clearContent">清理缓存</el-button>
        </span>
      </el-form-item>
      <el-form-item label="文章内容" prop="json">
        <we-editor
          class="editor"
          toolbar-class="editor-toolbar"
          editable-class="editor-editable"
          :toolbar-option="we.toolbar"
          :editable-option="we.editable"
          :json.sync="data.json"
          :html.sync="data.html"
        />
      </el-form-item>
    </el-form>
    <el-card>
      <el-tabs v-model="tab">
        <el-tab-pane label=":json.sync" name="json">
          <u-prism lang="json" :content="data.json" />
        </el-tab-pane>
        <el-tab-pane label=":html.sync" name="html">
          <u-prism lang="html" :content="data.html" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { getArticle, getArticleHtml } from '../use/article.js'
  import { useWangEditor } from 'wangeditor5-for-vue2'
  import UPrism from '../components/u-prism.vue'
  export default {
    components: { UPrism },
    data() {
      return {
        we: {
          toolbar: null,
          editable: null,
          getToolbar: null,
          getEditable: null,
          clearContent: null,
          reloadEditor: null,
        },
        article: getArticle(),
        data: {
          article: '',
          json: '',
          html: '',
        },
        rules: {},
        tab: 'json', // json、html
      }
    },
    watch: {
      'data.article': function (nv) {
        if (typeof nv === 'number') {
          this.we.editable.defaultHtml = getArticleHtml(nv)
          this.we.reloadEditor()
        }
      },
    },
    created() {
      this.we = useWangEditor({
        config: {
          placeholder: 'WeEditableOption.defaultHtml',
        },
        extendCache: false,
      })
    },
  }
</script>
