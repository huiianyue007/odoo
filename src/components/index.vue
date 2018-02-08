<template>
  <tk-container disableScroll class = 'container-wrap' :statusBar = 'statusBar'>
    <tkui-header center background = 'transparent' color = '#fff' slot = 'header'>
      <div class="title">首页</div>
    </tkui-header>
    <tkui-list class = 'big gutter'>
      <tkui-list-item v-for = '(item, key) in info' :key = 'key' class = 'border' @click.native = 'routerTo(item)'>
        <template slot="left">
          <tkui-button class="icon button big">
            <tk-icon type="custom" class = 'white'>{{icon[key].icon}}</tk-icon>
          </tkui-button>
        </template>
        <div>
          <div class="subhead">
            {{ item.name }}
          </div>
          <div class="caption">
            {{icon[key].desc}}
          </div>
        </div>
      </tkui-list-item>
    </tkui-list>
  </tk-container>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        statusBar: {
          color: 'transparent'
        },
        info: null,
        icon: [{
          icon: 'information',
          desc: '查看当前登陆用户信息'
        }, {
          icon: 'management',
          desc: '客户信息管理做完管理供应商信息数据的列表。'
        }]
      }
    },
    created () {
      this.$tkAjax.get('/odoo/view/demo/index').then(({ data }) => {
        this.info = data.data.elements
      })
    },
    methods: {
      routerTo (opt) {
        if (opt.ref_view.indexOf('user') !== -1) {
          this.$router.push({
            path: '/user',
            query: opt
          })
        } else {
          this.$router.push({
            path: '/custom',
            query: opt
          })
        }
      }
    }
  }
</script>
<style scoped lang = 'scss'>
  @import '~assets/scss/main';
  .container-wrap{
    background: url("../../static/img/background_img.png") $white no-repeat;
    background-size:contain;
  }
</style>
