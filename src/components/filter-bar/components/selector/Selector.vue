<template>
  <div>
    <select id="select" @change="onChange">
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Selector',

  props: {
    field: { type: String, required: true },
    value: { type: String, required: true },
    options: { type: Array, default: () => [] }
  },

  methods: {
    onChange () {
      const selector = document.getElementById('select')
      const index = selector.selectedIndex
      const opt = this.options[index] || {}
      const val = opt.value || ''
      this.$emit('update:value', val)
      this.$emit('change', this.field, val)
    }
  }
}
</script>
