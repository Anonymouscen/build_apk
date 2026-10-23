<template>
  <div class="wrapper">
    <!-- 核心：这个盒子严格按照 3840:2160 (16:9) 比例自适应缩放并居中 -->
    <div class="ratio-box">
      <!-- 原先的背景图通过 img 标签加载，完美保持比例 -->
      <img src="../assets/panel_bg.jpg" class="bg-img" alt="panel background" />

      <!-- 控制按钮直接以 ratio-box 为参考系，坐标基于 3840 * 2160 设计图计算 -->
      <div class="controls">
        <div :class="['control_item', item]" v-for="item in list" :key="item" @click="handleClickControl(item)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  data() {
    return {
      list: ['f1', 'f2', 'f3', 'f4', 'f5']
    };
  },
  methods: {
    handleClickControl (type) {
      this.$router.push(`/preview/${type}`)
    },
    handleCloseSystem () {
      console.log('btn_closesystem')
      let userAgent = navigator.userAgent;
      if (
        userAgent.indexOf("Firefox") != -1 ||
        userAgent.indexOf("Chrome") != -1
      ) {
        location.href = "about:blank";
      } else {
        window.opener = null;
        window.open("", "_self");
      }
      window.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .ratio-box {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: calc(100vh * (3840 / 2160));
    max-height: calc(100vw * (2160 / 3840));
    margin: auto;

    /* 背景图片充满整个 ratio-box，保持原比例不拉伸 */
    .bg-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

.controls {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;

      .control_item {
        position: absolute;
        pointer-events: auto;
        cursor: pointer;

        width: calc(730 / 1920 * 100%);
        height: calc(180 / 1080 * 100%);

        &.f1 { 
          top: calc(208 / 1080 * 100%); 
          left: calc(180 / 1920 * 100%); 
        }
        &.f2 { 
          top: calc(208 / 1080 * 100%); 
          left: calc(990 / 1920 * 100%); 
        }
        &.f3 { 
          top: calc(495 / 1080 * 100%); 
          left: calc(180 / 1920 * 100%); 
        }
        &.f4 { 
          top: calc(495 / 1080 * 100%); 
          left: calc(990 / 1920 * 100%); 
        }
        &.f5 { 
          top: calc(770 / 1080 * 100%); 
          left: calc(180 / 1920 * 100%); 
        }
      }
    }
  }
}
</style>