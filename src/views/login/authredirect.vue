<script>
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AuthRedirect',
  created() {
    const hash = window.location.search.slice(1)
    window.opener.location.href = window.location.origin + '/login#' + hash
    window.close()
  }
}
</script>
