<template>
  <div class="app-header">
    NO LOVE, NO PEACE, CASH ONLY!
    <span class="remark">---Jarry Chung</span>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',

  mounted () {
    const emojis = ['💛', '🖤', '💔', '❣', '💕', '💓', '💘', '☯']
    let index = 0
    setInterval(() => {
      document.title = `filter bar --- ${emojis[index]}`
      index = (index + 1) % emojis.length
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
  color: white;
  background-color: #1B333B;
  .remark {
    font-size: 12px;
  }
}
</style>
