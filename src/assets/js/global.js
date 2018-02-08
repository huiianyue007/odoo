import C from 'assets/js/conf'
export default {
  activated () {
    document.title = this.pageTitle ? this.pageTitle : C.pageTitle
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
