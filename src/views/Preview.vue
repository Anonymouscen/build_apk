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
          <div
            v-if="type === 'f3' && index === 0"
            class="slide-bg"
            :style="{
              backgroundImage: `url('${image}')`,
            }"
          >
            <div v-for="(t, i) in 3" :key="i" :class="['point', 'point' + i]" @click="handlePointClick(i)"></div>
          </div>
          <div
            v-else-if="type === 'f3' && index === 5"
            class="slide-bg"
            :style="{
              backgroundImage: `url('${image}')`,
            }"
          >
            <div class="video1">
              <video src="@/assets/f3-26-l.mp4" controls></video>
            </div>
            <div class="video2">
              <video src="@/assets/f3-26-r.mp4" controls></video>
            </div>
          </div>
          <div
            v-else-if="type === 'f3' && index === 8"
            class="slide-bg"
            :style="{
              backgroundImage: `url('${image}')`,
            }"
          >
            <div class="video3">
              <video src="@/assets/f3-29.mp4" controls></video>
            </div>
          </div>
          <div
            v-else
            class="slide-bg"
            :style="{
              backgroundImage: `url('${image}')`,
            }"
          >
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
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      previewImages: []
    };
  },
  mounted() {
    console.log('type: ', this.type)
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
    handlePointClick (i) {
      // 获取对应的目标页索引
      const targetIndex = POINT_SLIDE_MAP[i]

      // 防止无效索引
      if (targetIndex === undefined) {
        return
      }

      // 获取 Swiper 实例
      const swiperComponent = this.$refs.mySwiper
      const swiper = swiperComponent && (
        swiperComponent.swiper || swiperComponent.$swiper
      )

      if (!swiper || swiper.destroyed) {
        return
      }

      // 切换到目标页，0 表示第一张图片
      swiper.slideTo(targetIndex, 500)
    },
    goBack() {
      this.$router.go(-1);
    },
    loadImages() {
      if (!this.type) {
        this.previewImages = []
        return
      }
      
      try {
        // 使用require.context动态获取指定文件夹下的所有图片
        const context = require.context('@/assets/', true, /\.(jpg|jpeg|png|gif|webp)$/i)
        const keys = context.keys()

        console.log('keys: ', keys)
        
        // 筛选出指定type文件夹下的图片
        const typeImages = keys
          .filter(key => {
            const path = key.replace('./', '')
            return path.startsWith(`${this.type}/`)
          })
          .sort((a, b) => {
            return a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: 'base'
            })
          })

        console.log('typeImages: ', typeImages)
        
        // 将相对路径转换为可用的图片URL
        this.previewImages = typeImages.map(key => {
          const module = context(key)
          // 处理ES6模块的默认导出
          return module.default || module
        })
        
        console.log(`加载了 ${this.previewImages.length} 张 ${this.type} 类型的图片`)
        console.log('图片列表:', this.previewImages)
      } catch (error) {
        console.error('加载图片失败:', error)
        this.previewImages = []
      }
    }
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
      transition: all 0.3s ease;
      // backdrop-filter: blur(10px);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
      
      &:active {
        transform: translateY(0);
      }
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
        
        .slide-bg {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 400px; /* 确保有最小高度 */
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-color: #fff; /* 添加背景色便于调试 */
        }

        .point {
          position: absolute;
          top: 670px;
          left: 180px;
          width: 475px;
          height: 140px;

          &1 {
            left: 700px;
          }
          &2 {
            left: 1235px;
          }
        }
        .video1 {
          position: absolute;
          bottom: 78px;
          left: 495px;
          width: 259px;
          height: 135px;
        }
        .video2 {
          position: absolute;
          bottom: 48px;
          right: 100px;
          width: 275px;
          height: 152px;
        }
        .video3 {
          position: absolute;
          top: 755px;
          left: 230px;
          width: 717px;
          height: 265px;
        }

        video {
          width: 100%;
          height: 100%;
        }
      }
    }
    
    .no-images {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #666;
    }
  }
}

// Swiper导航和分页样式
.swiper-button-next,
.swiper-button-prev {
  color: #007aff;

  &.swiper-button-disabled {
    opacity: 0;
  }
  &:after {
    font-size: 36px;
  }
}

.swiper-button-next {
  right: 5px;
}
.swiper-button-prev {
  left: 5px;
}
</style>