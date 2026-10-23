<template>
  <div id="app">
    <router-view/>
    <!-- 移动端横屏提示遮罩（当用户竖屏时触发） -->
    <div class="landscape-tip-overlay">
      <div class="tip-content">
        <div class="rotate-icon">📱</div>
        <p>为了获得最佳体验，请将手机横向使用</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
ul,
li {
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #FFFFFF;
}

/* 设置滚动条的样式 */
div::-webkit-scrollbar {
  width: 3px;
  background-color: transparent;
}
/* 滚动槽 */
div::-webkit-scrollbar-track {
  border-radius: 2px;
}
/* 滚动条滑块 */
div::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: #17356a;
}

/* 默认情况下（横屏时）隐藏提示 */
.landscape-tip-overlay {
  display: none;
}

/* 当检测到设备处于【竖屏 (portrait)】状态时显示遮罩 */
@media screen and (orientation: portrait) {
  .landscape-tip-overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(15, 23, 42, 1); /* 深色沉浸式背景 */
    color: #ffffff;
    z-index: 999999;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .tip-content {
    animation: fadeIn 0.3s ease-in-out;
  }

  .rotate-icon {
    font-size: 56px;
    margin-bottom: 26px;
    /* 图标旋转提示动画 */
    animation: rotateAnimation 1.5s ease-in-out infinite alternate;
  }

  .tip-content p {
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 1px;
    margin: 0;
  }
}

/* 手机旋转动画 */
@keyframes rotateAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
