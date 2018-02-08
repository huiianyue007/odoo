<template>
  <tk-container>
    <tkui-header center>
      <tkui-button class="small icon" slot="left-menu" @click.native = 'back'>
        <tk-icon>return</tk-icon>
      </tkui-button>
      详细信息
    </tkui-header>
    <tkui-list class="big gutter">
      <tkui-list-item class="border" v-for = '(item, key) in elements' :key = 'key' v-if = 'info'>
        <template slot="left">{{ item.label }}</template>
        {{item.field_type}} {{item.type}}
        <template slot="right" v-if="item.field_type === 'char' && item.type === 'text'">{{info[item.field]}}</template>
        <template slot="right" v-if="item.field_type === 'many2one' && item.type=== 'text'">{{info[item.field].name}}</template>
        <template slot="right" v-if="item.field_type === 'binary' && item.type === 'binary'">
          <img :src="'data:image/png;base64,' + info[item.field]" alt="" v-if = 'info[item.field]'>
          <div v-else>{{info[item.field]}}</div>
        </template>
      </tkui-list-item>
    </tkui-list>
  </tk-container>
</template>
<script>
  export default{
    data () {
      return {
        params: this.$route.query,
        elements: null,
        info: null
      }
    },
    activated () {
      this.$tkAjax.get('/odoo/view/demo/customer/form').then(({ data }) => {
        this.elements = data.data.elements
      }).then(() => {
        return this.$tkAjax.get(this.params.uri)
      }).then(({ data }) => {
        this.info = data.data
        let ar = this.elements.filter(item => {
          if ((item.field_type === 'binary' && item.type === 'binary')) return item
        })
        return Promise.resolve(ar)
      }).then(res => {
        res.map(item => {
          this.$tkAjax.get(this.info[item.field].uri).then(({ data }) => {
            this.info[item.field] = data.data
          })
        })
      })
    }
  }
</script>
<style lang = 'scss' scoped>
  @import '~assets/scss/main';
  .gutter{
    padding:0 $gutter;
  }
</style>
