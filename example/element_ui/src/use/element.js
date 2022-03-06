import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import {
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Switch,
  Select,
  Option,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Card,
  Container,
  Aside,
  Main,
  Tabs,
  TabPane,
  Drawer,
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Drawer)

Vue.prototype.$ELEMENT = { size: 'mini' }
