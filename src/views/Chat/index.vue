<template>
  <div class="content">
    <div class="chatbox">
      <message />
      <v-text />
    </div>
  </div>
</template>

<script>
// import search from './components/search/search'
// import chatlist from './components/chatlist/chatlist'
import message from './components/message/message'
import vText from './components/text/text'
var _that
export default {
  name: 'Index',
  components: {
    // search,
    // chatlist,
    message,
    vText
  }
}
</script>

<style rel="stylesheet/css"  scoped>
.content {
  display: flex;
  width: 100%
}

.msglist {
  width: 250px;
  background: rgb(230, 230, 230);
}

.chatbox {
  flex: 1;
}
</style>
