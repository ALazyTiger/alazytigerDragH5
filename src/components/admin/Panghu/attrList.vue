<template>
    <div class="side_con right " v-show="showAttr">
      <div class="item attrList animated" :class="showAttr?'fadeInRight':''">
          <div class="head">元素属性</div>
            <div class="item_id">元素ID为 : <span>{{checkedItems.id }}</span></div>
            <div class="main">
              <ul class="group_main">
                <li>
                  <span>宽度：</span>
                  <el-input v-model="checkedItems.width" class="ani-width" placeholder="请输入宽度"><template slot="append">px</template></el-input>
                </li>
                <li>
                  <span>高度：</span>
                  <el-input v-model="checkedItems.height" class="ani-height" placeholder="请输入高度"><template slot="append">px</template></el-input>
                </li>
                <li>
                  <span>left：</span>
                  <el-input v-model="checkedItems.left" class="ani-height" placeholder="请输入高度"><template slot="append">px</template></el-input>
                </li>
                <li>
                  <span>top：</span>
                  <el-input v-model="checkedItems.top" class="ani-height" placeholder="请输入高度"><template slot="append">px</template></el-input>
                </li>
                <li v-show="checkedType == 'txt'">
										<span>文字内容：</span>
                    <el-input type="textarea" placeholder="请输入内容" class="ani-height" v-model="checkedItems.txt" show-word-limit></el-input>
								</li>
                <li v-show="checkedType == 'txt'">
										<span>文字颜色：</span>
                    <el-input v-model="checkedItems.color" type="color" class="ani-height"></el-input>
								</li>
                <li v-show="checkedType == 'txt'">
										<span>文字字号：</span>
                    <el-input-number v-model="checkedItems.fontSize" :step="1" :min="12" :max="48"></el-input-number>
								</li>
                <li>
                  <span>动画名称：</span>
                  <el-select v-model="checkedItems.animate" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </li>
                <li>
                  <span>动画延时(毫秒)：</span>
                  <el-input-number v-model="checkedItems.delay" :step="100" :min="0" :max="1000000"></el-input-number>
                </li>
              </ul>
              <!-- <div class="ani_btn"><el-button type="primary" @click="saveAni()" >确定</el-button></div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      options: [
        {
          value: 'bounceIndevil',
          label: '向左下滚入'
        },
        {
          value: 'bounceInshooter',
          label: '向右下滚入'
        },
        {
          value: 'flash',
          label: '闪烁'
        },
        {
          value: 'shake',
          label: '摇动'
        },
        {
          value: 'bounce',
          label: '弹性'
        },
        {
          value: 'wiggle',
          label: '扭动'
        },
        {
          value: 'tada',
          label: '弹加摇动'
        },
        {
          value: 'swing',
          label: '摇摆(小)'
        },
        {
          value: 'wobble',
          label: '摇晃(大)'
        },
        {
          value: 'pulse',
          label: '脉冲放大'
        },
        {
          value: 'flip',
          label: '翻滚'
        },
        {
          value: 'rollIn',
          label: '滚入'
        },
        {
          value: 'lightSpeedIn',
          label: '惯性出现'
        },
        {
          value: 'flipInX',
          label: 'X轴翻滚出现'
        },
        {
          value: 'flipInY',
          label: 'Y轴翻滚出现'
        },
        {
          value: 'fadeIn',
          label: '淡入'
        },
        {
          value: 'fadeInUp',
          label: '向上淡入'
        },
        {
          value: 'fadeInDown',
          label: '向下淡入'
        },
        {
          value: 'fadeInLeft',
          label: '从左淡入'
        },
        {
          value: 'fadeInUpBig',
          label: '向上淡入(大幅度)'
        },
        {
          value: 'fadeInDownBig',
          label: '向下淡入(大幅度)'
        },
        {
          value: 'fadeInLeftBig',
          label: '从左淡入(大幅度)'
        },
        {
          value: 'fadeInRightBig',
          label: '从右淡入(大幅度)'
        },
        {
          value: 'bounceIn',
          label: '弹入'
        },
        {
          value: 'bounceInUp',
          label: '向上弹入'
        },
        {
          value: 'bounceInDown',
          label: '从下弹入'
        },
        {
          value: 'rotateIn',
          label: '旋转出现'
        },
        {
          value: 'rotateInUpLeft',
          label: '向上转出（左）'
        },
        {
          value: 'rotateInDownLeft',
          label: '向下转入（左）'
        },
        {
          value: 'rotateInUpRight',
          label: '向上转入（右）'
        },
        {
          value: 'rotateInDownRight',
          label: '向下转入（右）'
        }]
      };
    },
    created() { },
    props: ['checkedItems', "showAttr","checkedType", "currentPage"],
    components: {},
    computed: {
      
    },
    mounted() { },
    methods: {
        saveAni() {
          console.log(this.checkedItems)
          // this.$emit('saveAni',this.checkedItems); //通知父组件改变。
        },

    }
};
</script>

<style lang="scss" scoped>
/* 侧边列表 */
.side_con {
    position: fixed;
    width: 360px;
    top: 70px;
    right: 0;
    bottom: 10px;
    background: #fff;
    box-sizing: border-box;
    border-left: 1px solid #d8d8de;
    .head {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background: #08a1ef;
        font-size: 16px;
        width: 100%;
    }
    .item_id {
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        color: #76838f;
        span {
          color: #08a1ef;
        }
    }
    .main {
        width: 100%;
        padding: 0 10px;
        display: inline-block;
        .ani_btn {
          padding: 20px 0;
          text-align: center;
        }
        .group_main {
          background: #fff;
          overflow: hidden;
          position: relative;
          z-index: 1;
          li {
            height: 40px;
            margin: 10px 0;
            display: inline-block;
            span {
              font-size: 14px;
              color: #76838f;
              line-height: 40px;
              display: inline-block;
              vertical-align: middle;
              width: 115px;
              text-align: right;
            }
            .ani-width,
            .ani-height {
                width: 200px;
            }
          }
        }
    }
}
</style>