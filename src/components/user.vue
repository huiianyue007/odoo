<template>
  <tk-container>
    <tkui-header center>
      <tkui-button class="button small icon" slot="left-menu" @click.native = 'back'>
        <tk-icon>return</tk-icon>
      </tkui-button>
      {{ params.name }}
    </tkui-header>
    <div class="gutter">
      <tkui-list class="small">
        <tkui-list-item class="border" v-for = '(item, key) in elements' :key = 'key'>
          <template slot="left">{{item.label}}</template>
          <template slot="right" v-if = 'info'>{{info[item.field]}}</template>
        </tkui-list-item>
      </tkui-list>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        params: this.$route.query,
        elements: null,
        info: null
      }
    },
    created () {
      this.$tkAjax.get(this.params.ref_view).then(({ data }) => {
        this.elements = data.data.elements
        return Promise.resolve(data.data.data)
      }).then(res => {
        return this.$tkAjax.get(res.uri, {}, {
          params: {
            fields: res.fields.join(',')
          }
        })
      }).then(({ data }) => {
        this.info = data.data
      })
    }
  }
</script>
<style lang = 'scss' scoped></style>
