<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header">
      <div class="friendname">{{ selectedChat.user.name }}</div>
    </header>
    <div ref="list" class="message-wrapper">
      <ul v-if="selectedChat" class="navList">
        <li v-for="(item, index) in selectedChat.messages" :key="index" class="message-item">
          <div class="time">
            <span>{{ item.date | time }}</span>
          </div>
          <div :class="{ self: item.self }" class="main">
            <img
              :src="item.self ? user.img : selectedChat.user.img"
              class="avatar"
              width="36"
              height="36"
            >
            <div class="content">
              <div v-show="item.content.substr(0,4) !== 'http'" class="text" v-html="replaceFace(item.content)" />
              <div v-show="item.content.substr(0,4) === 'http'" class="text">
                <img :src="item.content">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['selectedChat']),
    chatlist() {
      return this.$store.getters.chatlist
    },
    user() {
      return this.$store.getters.user
    },
    messages() {
      return this.$store.getters.messages
    },
    emojis() {
      return this.$store.getters.emojis
    }
  },
  watch: {
    // 发送信息后,让信息滚动到最下面
    messages(newabc) {
      console.log(newabc)
      setTimeout(
        () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
        0
      )
    }
  },
  created() {
    //  在页面加载时让信息滚动到最下面
    setTimeout(
      () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
      0
    )
  },
  methods: {
    //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceFace(con) {
      if (con.includes('/:')) {
        var emojis = this.emojis
        for (var i = 0; i < emojis.length; i++) {
          con = con.replace(
            emojis[i].reg,
            '<img src="static/emoji/' +
              emojis[i].file +
              '"  alt="" style="vertical-align: middle; width: 24px; height: 24px" />'
          )
        }
        return con
      }
      return con
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
.message {
  width: 100%;
  height: calc(100vh - 80px);
}

.header {
  height: 60px;
  padding: 28px 0 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;
}

.friendname {
  font-size: 18px;
}

.message-wrapper {
  min-height: calc(100vh - 275px);
  max-height: calc(100vh - 275px);
  padding: 10px 15px;
  box-sizing: border-box;
  overflow-y: auto;

}

.message {
  margin-bottom: 15px;
}

.navList {
  list-style: none;
}

.main {
  /* display: flex */
}

.time {
  width: 100%;
  font-size: 12px;
  margin: 7px auto;
  text-align: center;
}

span {
  display: inline-block;
  padding: 4px 6px;
  color: #fff;
  border-radius: 3px;
  background-color: #dcdcdc;
}

.avatar {
  float: left;
  margin-left: 15px;
  border-radius: 3px;
}

.content {
  display: inline-block;
  margin-left: 10px;
  position: relative;
  padding: 6px 10px;
  max-width: 330px;
  min-height: 36px;
  line-height: 24px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  background-color: #fafafa;
  border-radius: 4px;
}

.content:before {
  content: " ";
  position: absolute;
  top: 12px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa;
}

.self {
  text-align: right;
}

.self .avatar {
  float: right;
  margin: 0 15px;
}

.self .content {
  background-color: #b2e281;
}

.self .content:before {
  right: -12px;
  vertical-align: middle;
  border-right-color: transparent;
  border-left-color: #b2e281;
}
</style>
