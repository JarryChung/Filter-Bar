<template>
  <div class="filter-bar">
    <div
      class="item"
      v-for="cfg in config"
      :key="cfg.field"
    >
      <span v-if="cfg.label">{{ cfg.label }}:</span>
      <component
        style="display: inline-block;"
        :is="getComponent(cfg.component)"
        :value.sync="value[cfg.field]"
        :field="cfg.field"
        v-bind="cfg.props"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
import FILTER_MAP, { Empty } from './components/index.js'
export default {
  name: 'FilterBar',

  props: {
    value: { type: Object, required: true },
    config: { type: Array, default: () => [] }
  },

  methods: {
    getComponent (key) {
      return FILTER_MAP[key] || Empty
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 60px;
  border-bottom: 1px seagreen solid;
  padding: 32px;
  .item {
    display: inline-block;
    margin-right: 16px;
    .label {
      display: inline-block;
      vertical-align: bottom;
      margin: 0 8px 8px 0;
    }
  }
}
</style>
