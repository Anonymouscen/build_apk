<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
ul,
li {
  list-style: none;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #FFFFFF;
}

.myPopperClass {
  background-color: #0F3058 !important;
  border: 1px solid rgba(186, 208, 241, 0.1) !important;
  box-sizing: border-box;
  .el-select-dropdown__item {
    color: rgba($color: #FFFFFF, $alpha: 0.8) !important;
  }
  .popper__arrow {
    border-bottom-color: rgba(186, 208, 241, 0.1) !important;
  }
  .popper__arrow::after {
    border-bottom-color: #0F3058 !important;
  }
  .el-scrollbar__wrap {
    padding: 0 !important;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: rgba($color: #FFFFFF, $alpha: 0.2) !important;
  }
}

.documentationClass {
  background: none;
  border-radius: 4px;
  background-color: #072444 !important;
  overflow: hidden;
  .el-dialog__header {
    padding: 15px 20px 10px 10px;
  }
  .el-dialog__body {
    height: 640px;
    padding: 10px 30px 20px;
    color: #ffffff !important;
    .projectDrawings-body {
      width: 100%;
      height: 100%;
      .inputClass {
        .el-input {
          .el-input-group__prepend,
          .el-input__inner {
            padding-left: 30px !important;
          }
          .el-input-group__append,
          .searchButton {
            background-color: transparent !important;
            border-color: rgba(4, 234, 255, 0.5);
            color: #FFFFFF;
          }
        }
        
      }
    }
  }
}
.projectOverviewClass,
.projectPartyBuildingClass {
  background: none;
  border-radius: 4px;
  background-color: #072444 !important;
  overflow: hidden;
  .el-dialog__header {
    padding: 15px 20px 10px 10px;
  }
  .el-dialog__body {
    height: 640px;
    padding: 6px 30px 20px;
    color: #ffffff !important;
    .projectDrawings-body {
      width: 100%;
      height: 100%;
      .inputClass {
        .el-input {
          .el-input-group__prepend,
          .el-input__inner {
            padding-left: 30px !important;
          }
          .el-input-group__append,
          .searchButton {
            background-color: transparent !important;
            border-color: rgba(4, 234, 255, 0.5);
            color: #FFFFFF;
          }
        }
      }
    }
  }
}

.locationDistributionDialogClass {
  width: 1474px !important;
  height: 728px !important;
  margin-top: 0 !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  margin-top: -364px !important;
  margin-left: -737px !important;
  background: none;
  border-radius: 4px;
  background-color: #001629 !important;
  overflow: hidden !important;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    width: 100%;
    height: 100%;
    padding: 0;
  }
}



.engineeringCalendarToday {
  .wh_content_all {
    background-color: transparent !important;
  }
  .wh_top_changge li .wh_jiantou1,
  .wh_top_changge li .wh_jiantou2 {
    width: 8px !important;
    height: 8px !important;
  }
  .wh_content .wh_content_item .wh_top_tag {
    font-size: 0.9rem !important;
    color: rgba($color: #B5BEC6, $alpha: 0.8);
  }
  .wh_content_item .wh_other_dayhide {
    color: rgba($color: #FFFFFF, $alpha: 0.2) !important;
  }
  .wh_item_date:hover {
    background: rgba($color: #000000, $alpha: 0.2) !important;
    cursor: pointer;
    border-radius: 100px;
  }
  .wh_content_item .wh_chose_day {
    background: transparent !important;
    border-radius: 100px;
  }
  .wh_content_item {
    .wh_isToday {
      background: transparent !important;
      color: #fff !important;
    }
    //雷电
    .thunderbolt {
      color: #60CEF4 !important;
      position: relative;
    }
    .thunderbolt::after {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #60CEF4 !important;
      position: absolute;
      left: 50%;
      bottom: 11%;
      margin-left: -2px;
    }
    //多因素
    .multivariate {
      color: #EAFAFF !important;
      position: relative;
    }
    .multivariate::after {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #EAFAFF !important;
      position: absolute;
      left: 50%;
      bottom: 11%;
      margin-left: -2px;
    }
    //高温
    .highTemperature {
      color: #FFA552 !important;
      position: relative;
    }
    .highTemperature::after {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #FFA552 !important;
      position: absolute;
      left: 50%;
      bottom: 11%;
      margin-left: -2px;
    }
    //其他
    .other {
      color: #48C86B !important;
      position: relative;
    }
    .other::after {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #48C86B !important;
      position: absolute;
      left: 50%;
      bottom: 11%;
      margin-left: -2px;
    }
  }
}


.selectBox {
  width: 100px;
  height: 29px;
  line-height: 29px;
  .el-input {
    width: 100%;
    height: 100%;
    line-height: 29px;
    background-color: transparent;
  }
  .el-input--small .el-input__inner {
    background-color: transparent;
    height: 100% !important;
    line-height: 28px !important;
    border: none;
    color: rgba($color: #FFFFFF, $alpha: 0.8);
  }
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


.selectDate {
  .el-icon-date, .el-range__close-icon {
    position: relative;
    top: -5px;
  }
  .el-range-input {
    background-color: transparent !important;
    color: #C0C4CC !important;
  }
}
</style>
