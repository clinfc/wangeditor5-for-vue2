<template>
  <div>
    <el-form ref="ruleForm" label-position="top" :model="data" :rules="rules">
      <el-form-item label="extendCache">
        <el-switch v-model="editable.extendCache" active-text="true" inactive-text="false" />
      </el-form-item>
      <el-form-item label="defaultContent">
        <el-select v-model="data.article" placeholder="请选择">
          <el-option v-for="item in article" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
        <span v-show="editable.extendCache">
          extendCache 为 true 时，切换 defaultContent 前需要先
          <el-button type="text" @click="clearContent">清理缓存</el-button>
        </span>
      </el-form-item>
      <el-form-item label="文章内容" prop="json">
        <we-editor
          class="editor"
          toolbar-class="editor-toolbar"
          editable-class="editor-editable"
          :toolbar-option="toolbar"
          :editable-option="editable"
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
  import { getArticle, getArticleJson } from '../use/article.js'
  import { useWangEditor } from 'wangeditor5-for-vue2'
  import UPrism from '../components/u-prism.vue'
  export default {
    components: { UPrism },
    data() {
      const { toolbar, editable, clearContent, reloadEditor } = useWangEditor({
        config: {
          placeholder: 'WeEditableOption.defaultContent',
        },
        extendCache: false,
      })

      return {
        toolbar,
        editable,
        clearContent,
        reloadEditor,
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
          this.editable.defaultContent = getArticleJson(nv)
          this.reloadEditor()
        }
      },
    },
  }
</script>
