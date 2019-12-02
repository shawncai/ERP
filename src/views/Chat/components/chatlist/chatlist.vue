<!-- 聊天列表 -->
<template>
  <div class="msglist">
    <ul>
      <li v-for="(item, index) in searchedChatlist" :key="index" :class="{ active: item.id === selectId }" class="sessionlist" @click="selectSession(item.id)">
        <div class="list-left">
          <img :alt="item.user.name" :src="item.user.img" class="avatar" width="42" height="42">
        </div>
        <div class="list-right">
          <p class="name">{{ item.user.name }}</p>
          <span class="time">{{ item.messages[item.messages.length-1].date | time }}</span>
          <p class="lastmsg">{{ item.messages[item.messages.length-1].content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
var _that
export default {
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ':0' + date.getMinutes()
      } else {
        return date.getHours() + ':' + date.getMinutes()
      }
    }
  },
  computed: {
    ...mapState([
      'selectId',
      'searchText'
    ]),
    // ...mapGetters([
    //   'searchedChatlist'
    // ])
    searchedChatlist() {
      console.log(this.$store.getters.searchedChatlist)
      return this.$store.getters.searchedChatlist
    }
  },
  watch: {
    searchedChatlist(newdata) {
      console.log(newdata)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    ...mapActions([
      'selectSession'
    ]),
    scrollToBottom: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#msglist')
        container.scrollTop = container.scrollHeight
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.msglist
  height: 540px
  overflow-y: auto
  .sessionlist
    display: flex
    padding: 12px
    transition: background-color .1s
    font-size: 0
    &:hover
        background-color: rgb(220,220,220)
    &.active
        background-color: #c4c4c4
    .avatar
        border-radius: 2px
        margin-right: 12px
    .list-right
        position: relative
        flex: 1
        margin-top: 4px
	.name
	display: inline-block
	vertical-align: top
	font-size: 14px
	.time
	float: right
	color: #999
	font-size: 10px
	vertical-align: top
        .lastmsg
            position: absolute
            font-size: 12px
            width: 130px
            height: 15px
            line-height: 15px
            color: #999
            bottom: 4px
            overflow: hidden
            white-space:nowrap
            text-overflow:ellipsis
</style>
