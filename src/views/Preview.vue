<template>
  <div class="layout-container">
    <main class="preview_main">
      <div class="btn_back" @click="goBack">HOME</div>
      <swiper ref="mySwiper" :options="swiperOption" class="swiper-container" v-if="previewImages.length > 0">
        <swiper-slide
          v-for="(image, index) in previewImages"
          :key="index"
          class="swiper-slide"
        >
          <!-- 核心：这个盒子严格按照 16:9 比例自适应缩放，且在视口中居中 -->
          <div class="ratio-box">
            <img :src="image" class="slide-img" alt="preview" />

            <!-- f3 类型的交互热区和视频，直接以 ratio-box 为参考系 -->
            <template v-if="type === 'f3'">
              <div v-if="index === 0">
                <div v-for="(t, i) in 3" :key="i" :class="['point', 'point' + i]" @click="handlePointClick(i)"></div>
              </div>
              <div v-else-if="index === 5">
                <div class="video1">
                  <video src="@/assets/f3-26-l.mp4" controls></video>
                </div>
                <div class="video2">
                  <video src="@/assets/f3-26-r.mp4" controls></video>
                </div>
              </div>
              <div v-else-if="index === 8">
                <div class="video3">
                  <video src="@/assets/f3-29.mp4" controls></video>
                </div>
              </div>
            </template>
          </div>
        </swiper-slide>
        <!-- 导航按钮 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <div v-else class="no-images">
        <p>暂无数据</p>
      </div>
    </main>
  </div>
</template>

<script>
const POINT_SLIDE_MAP = [1, 4, 9]

export default {
  name: "Preview",
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      swiperOption: {
        resistanceRatio: 0,
        effect: 'fade',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChangeTransitionStart: () => {
            this.pauseAllVideos();
          }
        }
      },
      previewImages: []
    };
  },
  mounted() {
    this.loadImages()
  },
  watch: {
    type: {
      handler() {
        this.loadImages()
      },
      immediate: false
    }
  },
  methods: {
    // 暂停页面中所有的视频
    pauseAllVideos() {
      // 获取当前组件下所有的 video 元素
      const videos = this.$el.querySelectorAll('video');
      videos.forEach(video => {
        if (!video.paused) {
          video.pause();     // 暂停播放
          // video.currentTime = 0; // 如果需要切换离开时重置播放进度到开头，可以取消这行注释
        }
      });
    },
    
    handlePointClick (i) {
      const targetIndex = POINT_SLIDE_MAP[i]
      if (targetIndex === undefined) return
      const swiperComponent = this.$refs.mySwiper
      const swiper = swiperComponent && (swiperComponent.swiper || swiperComponent.$swiper)
      if (!swiper || swiper.destroyed) return
      
      // 点击热区跳转前也可以顺便暂停一下
      this.pauseAllVideos();
      swiper.slideTo(targetIndex, 500);
    },
    goBack() {
      this.pauseAllVideos();
      this.$router.go(-1);
    },
    loadImages() {
      if (!this.type) {
        this.previewImages = []
        return
      }
      try {
        const context = require.context('@/assets/', true, /\.(jpg|jpeg|png|gif|webp)$/i)
        const keys = context.keys()
        const typeImages = keys
          .filter(key => key.replace('./', '').startsWith(`${this.type}/`))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

        this.previewImages = typeImages.map(key => {
          const module = context(key)
          return module.default || module
        })
      } catch (error) {
        console.error('加载图片失败:', error)
        this.previewImages = []
      }
    }
  },
  beforeDestroy() {
    // 页面销毁前清理，防止内存泄漏或残留音频
    this.pauseAllVideos();
  }
};
</script>

<style lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .preview_main {
    width: 100%;
    height: 100%;
    color: #000;

    .btn_back {
      position: absolute;
      top: 40px;
      right: 40px;
      z-index: 5;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 18px 30px;
      background: linear-gradient(to right, #107bba 0%, #79c7e2 100%);
      border-radius: 5px;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
      z-index: 99;
    }
    
    .swiper-container {
      width: 100%;
      height: 100%;
      
      .swiper-slide {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        /* 
          核心容器：利用 aspect-ratio 强制锁定 3840 / 2160 (即 16:9) 比例。
          同时通过 max-width / max-height 保证它在任何屏幕下都完整展示（等同于 contain 效果）。
        */
        .ratio-box {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: calc(100vh * (3840 / 2160));
          max-height: calc(100vw * (2160 / 3840));
          margin: auto; // 自动居中，四周产生自然的黑边/留白

          .slide-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }

          /* 
            以下子元素直接按照 3840 * 2160 的设计图坐标进行百分比换算！
            公式：top / 2160 * 100% , left / 3840 * 100%
          */
          .point {
            position: absolute;
            /* 假设你原先在 3840*2160 下的像素是 top: 1340px, left: 360px */
            top: calc(1340 / 2160 * 100%);
            left: calc(360 / 3840 * 100%);
            width: calc(950 / 3840 * 100%);
            height: calc(280 / 2160 * 100%);
            cursor: pointer;

            &1 { left: calc(1400 / 3840 * 100%); }
            &2 { left: calc(2470 / 3840 * 100%); }
          }

          .video1 {
            position: absolute;
            top: calc((2160 - (156 + 270)) / 2160 * 100%);
            left: calc(990 / 3840 * 100%);
            width: calc(518 / 3840 * 100%);
            height: calc(270 / 2160 * 100%);
          }
          
          .video2 {
            position: absolute;
            top: calc((2160 - (96 + 304)) / 2160 * 100%);
            right: calc(200 / 3840 * 100%);
            width: calc(550 / 3840 * 100%);
            height: calc(304 / 2160 * 100%);
          }
          
          .video3 {
            position: absolute;
            top: calc(1510 / 2160 * 100%);
            left: calc(460 / 3840 * 100%);
            width: calc(1434 / 3840 * 100%);
            height: calc(530 / 2160 * 100%);
          }

          .video1, .video2, .video3 {
            position: absolute;
            overflow: hidden;
            
            video {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              zoom: 0.75;
            }
          }
        }
      }
    }
  }
}

.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background: linear-gradient(to right, #107bba 0%, #79c7e2 100%);
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &.swiper-button-disabled { 
    opacity: 0.3; 
    cursor: not-allowed;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-50%) translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-50%) translateY(0);
  }

  &:after { 
    content: none !important; 
  }
}

/* 左右定位微调 */
.swiper-button-prev { 
  left: 15px; 
  
  &::before {
    content: "BACK";
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
}

.swiper-button-next { 
  right: 15px; 
  
  &::before {
    content: "NEXT";
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
}
</style>