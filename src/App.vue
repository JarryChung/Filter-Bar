<template>
  <div id="jarry-chung">
    <app-header />
    <filter-bar v-model="filterParams" :config="filterConfig" @change="onChange" />
    <img class="logo" alt="logo" src="./assets/logo.png">
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import FilterBar from './components/filter-bar/FilterBar.vue'

export default {
  name: 'App',

  components: {
    AppHeader,
    FilterBar
  },

  data () {
    return {
      // 该对象必须初始化所有需要绑定的字段
      filterParams: {
        love: '',
        peace: ''
      }
    }
  },

  computed: {
    filterConfig () {
      // 这里是筛选器的配置，props 中的内容将透传给筛选项的 props
      // 其中 field / component 为必须字段
      // field 用来标记绑定 filterParams 对象中的哪个值
      // component 用来指定使用哪个筛选项，当筛选项不存在时会默认使用 Empty
      return [{
        field: 'love',
        label: 'Love',
        component: 'RadioGroup',
        props: {}
      }, {
        field: 'peace',
        label: 'Peace',
        component: 'Selector',
        props: {
          options: [{ value: '11', label: 'Jarry' }, { value: '21', label: 'Chung' }]
        }
      }]
    }
  },

  methods: {
    onChange (field, val) {
      console.log(`The value of prop [${field}] is [${val}]`)
    }
  }
}
</script>

<style lang="scss">
#jarry-chung {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  .logo {
    width: 100px;
  }
}
</style>
