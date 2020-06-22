# 通用筛选器的实现与使用

## 特性

1. **配置式开发**，只需要按照要求(*查看 Empty 组件中的注释*)开发筛选项组件，然后在页面中配置即可；
2. **字段感知**，通过 `change` 事件能够获取到哪个筛选项发生了变化；
3. **功能隔离**，只处理筛选项的顺序以及数据绑定，其他逻辑交给页面，如筛选项之间的互相影响；
4. **自定义筛选项事件**，支持自定义筛选项的事件，该事件会透传到页面；

## 结构

```c
.
├── components ----------------- 筛选项
│   ├── Empty.vue
│   ├── index.js --------------- 自动处理(非同级 Vue 文件需要手动导入)筛选项的导入导出
│   ├── RadioGroup.vue
│   └── selector
│       └── Selector.vue
└── FilterBar.vue -------------- 核心处理文件
```

## 如何使用

### 筛选项开发

1. 必须设定 `props`：

   ```javascript
   props: {
     // 以下两个 prop 必须定义
     field: { type: String, required: true }, // 用来暂存字段名，此行可复制使用
     value: { type: String, required: true } // 绑定值，type 可以自定义，required 必定为 true
   },
   ```

2. 在数据需要改变时必须触发以下两个事件：

   ```javascript
   const val = 'your data source'
   // 当数据改变时必须触发以下两个事件
   // * 若有其他事件，将透传给业务
   this.$emit('update:value', val) // 用于数据更新
   this.$emit('change', this.field, val) // 用户告诉业务数据改变以及哪个数据改变了
   ```

### 注册筛选项

一般来说，*Vue* 文件会被自动引入

若筛选项的 *Vue* 文件与 *index.js* 不同级，则需要在 *index.js* 手动导入

### 页面中使用

```vue
<template>
  <div>
    <filter-bar v-model="filterParams" :config="filterConfig" @change="onChange" />
  </div>
</template>

<script>
import FilterBar from './components/filter-bar/FilterBar.vue'

export default {
  name: 'App',

  components: {
    // 注册组件
    FilterBar
  },

  data () {
    return {
      // 绑定的对象，该对象必须初始化所有需要绑定的字段
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
    // 通过 change 事件获取改变的字段以及改变后的值
    onChange (field, val) {
      console.log(`The value of prop [${field}] is [${val}]`)
    }
  }
}
</script>
```

## 场景举例

### 仅需把筛选器的值发送给后台

直接 *deep watch* 筛选器绑定的对象并进行请求数据即可

### 需要将筛选器的值以及页面中的值(如 page / size)发送给后台

`computed` 出一个包含页面数据的对象， *deep watch* 该对象并进行请求数据即可

### 筛选项之间相互影响(如改变 A 后清空 B 的值 / 更新 B 的选项数据)

监听 `change` 事件获取到哪个筛选器更新了值，在页面中进行相应的逻辑 
