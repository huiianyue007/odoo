<template>
  <tk-container>
    <tkui-header center slot = 'header'>
      <tkui-button class="small icon" slot="left-menu" @click.native = 'back'>
        <tk-icon>return</tk-icon>
      </tkui-button>
      {{ params.name }}
    </tkui-header>
    <tkui-table class = "header-fixed average" ref = 'table' v-if="ready">
      <tkui-table-header>
        <tkui-table-row class="middle border">
          <tkui-table-cell v-for = '(item, key) in elements' :key = 'key'>{{ item.label }}</tkui-table-cell>
        </tkui-table-row>
      </tkui-table-header>
      <tkui-table-body>
        <tkui-table-row v-for = '(item, key) in info' :key = 'key' class = 'border' @click.native = 'routeTo(detail[key])'>
          <tkui-table-cell v-for = '(it, k) in elements' :key = 'k' :class = '[k%2 ===0 ? "left": "right"]'>
            {{item[it.field]}}
          </tkui-table-cell>
        </tkui-table-row>
      </tkui-table-body>
    </tkui-table>
    <tk-loading v-else></tk-loading>
  </tk-container>
</template>
<script>
  export default{
    data () {
      return {
        params: this.$route.query,
        elements: null,
        info: null,
        detail: null,
        ready: false
      }
    },
    created () {
      this.$tkAjax.get(this.params.ref_view).then(({ data }) => {
        this.elements = data.data.elements
        return Promise.resolve(data.data.data)
      }).then(res => {
        return this.$tkAjax.get(res.uri, {}, {
          params: {
            fields: res.fields.join(','),
            domain: res.domain,
            order: res.order
          }
        })
      }).then(res => {
        this.info = res.data.data
        this.detail = res.data.data2
        this.ready = true
      })
    },
    methods: {
      routeTo (opt) {
        this.$router.push({
          path: '/customer',
          query: opt
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
  .gutter{
    padding-bottom:0;
  }
  table{
    height: 100%;
  }
</style>
