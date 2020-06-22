<template>
  <div>
    <button @click="onClick('11')">Jarry</button>
    <button @click="onClick('21')">Chung</button>
  </div>
</template>

<script>
export default {
  name: 'RadioGroup',

  props: {
    field: { type: String, required: true },
    value: { type: String, required: true }
  },

  methods: {
    onClick (val) {
      this.$emit('update:value', val)
      this.$emit('change', this.field, val)
    }
  }
}
</script>
