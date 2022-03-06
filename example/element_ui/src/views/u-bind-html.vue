<template>
  <div>
    <el-form ref="ruleForm" label-position="top" :model="data" :rules="rules">
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
          :toolbar-option="we.toolbar"
          :editable-option="we.editable"
          :html.sync="data.html"
        />
      </el-form-item>
    </el-form>
    <el-card>
      <el-tabs v-model="tab">
        <el-tab-pane label=":html.sync" name="html">
          <u-prism lang="html" :content="data.html" />
        </el-tab-pane>
        <el-tab-pane label="特别说明" name="explain">
          <p class="explain">
            如果你通过 <code>v-bind:html.sync</code> 绑定的数据作为主体，那么你不能同时使用
            <code>v-bind:json.sync</code>。 如果 <code>v-bind:html.sync</code> 和
            <code>v-bind:json.sync</code> 同时存在， 那么
            <code>v-bind:html.sync</code> 的数据变化并不会赋值到编辑器中，此时只有 <code>v-bind:json.sync</code>
            的数据变化会赋值到编辑器中。因为它们的优先级不同。
          </p>
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
          html: '',
        },
        rules: {},
        tab: 'html',
      }
    },
    watch: {
      'data.article': function (nv) {
        if (typeof nv === 'number') {
          this.data.html = getArticleHtml(nv)
        }
      },
    },
    created() {
      this.we = useWangEditor({
        config: {
          placeholder: 'v-bind:html.sync',
        },
        delay: 1000,
      })
    },
  }
</script>

<style lang="scss">
  .explain {
    code {
      word-break: break-word;
      border-radius: 2px;
      overflow-x: auto;
      background-color: #fff5f5;
      color: #ff502c;
      font-size: 0.87em;
      padding: 0.065em 0.4em;
      word-break: break-all;
      font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    }
  }
</style>
