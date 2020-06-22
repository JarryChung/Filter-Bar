<template>
  <div class="empty" @click="onChange">
    empty
  </div>
</template>

<script>
export default {
  name: 'Empty',

  props: {
    // 以下两个 prop 必须定义
    field: { type: String, required: true }, // 用来暂存字段名
    value: { type: String, required: true } // 绑定值
  },

  data () {
    return {
      val: 'Jarry Chung'
    }
  },

  methods: {
    onChange () {
      const val = this.val
      // 当数据改变时必须触发以下两个事件
      // * 若有其他事件，将透传给业务
      this.$emit('update:value', val) // 用于数据更新
      this.$emit('change', this.field, val) // 用户告诉业务数据改变以及哪个数据改变了
    }
  }
}
</script>
