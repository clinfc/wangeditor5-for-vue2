<template>
  <div>
    <el-form ref="ruleForm" label-position="top">
      <el-form-item label="WeEditableOption.mode">
        <el-select v-model="editable.mode" placeholder="请选择">
          <el-option v-for="item in mode" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="WeToolbarOption.mode">
        <el-select v-model="toolbar.mode" placeholder="请选择">
          <el-option v-for="item in mode" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="json">
        <we-editor
          class="editor"
          toolbar-class="editor-toolbar"
          editable-class="editor-editable"
          :toolbar-option="toolbar"
          :editable-option="editable"
          :toolbar-reloadbefore="toolbarReloadbefore"
          :editable-reloadbefore="editableReloadbefore"
          :json.sync="data.json"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { useWangEditor } from 'wangeditor5-for-vue2'
  export default {
    data() {
      return {
        data: {
          json: '[{"type":"paragraph","children":[{"text":"只要进行了 "},{"text":"v-bind:json.sync/v-bind:html.sync","code":true},{"text":" 绑定，且 "},{"text":"extendCache","code":true},{"text":" 为 "},{"text":"true","code":true},{"text":"，那么数据就不会丢失！！！"}]}]',
        },
        mode: [
          { label: 'default', value: 'default' },
          { label: 'simple', value: 'simple' },
        ],
        ...useWangEditor({
          config: {
            placeholder: 'reloadbefore',
          },
        }),
      }
    },
    methods: {
      toolbarReloadbefore(inst) {
        console.log(inst)
        alert(`toolbar 即将重载：${new Date().toLocaleString()}`)
      },
      editableReloadbefore(inst) {
        console.log(inst)
        alert(`editable 即将重载：${new Date().toLocaleString()}`)
      },
    },
  }
</script>
