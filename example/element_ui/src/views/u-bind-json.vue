<template>
  <div>
    <el-form ref="ruleForm" label-position="top" :model="data">
      <el-form-item label="文章">
        <el-select v-model="data.article" placeholder="请选择">
          <el-option v-for="item in article" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
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
      const { toolbar, editable } = useWangEditor({
        config: {
          placeholder: 'v-bind:json.sync',
        },
        delay: 1000,
      })

      return {
        toolbar,
        editable,
        article: getArticle(),
        data: {
          article: '',
          json: '',
          html: '',
        },
        tab: 'html', // json、html
      }
    },
    watch: {
      'data.article': function (nv) {
        if (typeof nv === 'number') {
          this.data.json = JSON.stringify(getArticleJson(nv))
        }
      },
    },
  }
</script>
