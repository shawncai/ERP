<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="emoji">
      <div class="showemoji" @click="IsshowEmoji"><svg-icon icon-class="smail" style="width: 40px" /></div>
      <div v-show="showEmoji" class="emojiBox">
        <li v-for="(item, index) in emojis" :key="index">
          <img :src="'static/emoji/'+item.file" :data="item.code" @click="content +=item.code" >
        </li>
      </div>
    </div>
    <textarea ref="text" v-model="content" @keyup="onKeyup" @click="showEmoji=false" />
    <div class="send" @click="send">
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div v-show="warn" class="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      content: '',
      reply: '未找到',
      frequency: 0,
      warn: false,
      showEmoji: false
    }
  },
  computed: {
    // ...mapState(['selectId', 'emojis']),
    ...mapGetters(['selectedChat']),
    emojis() {
      return this.$store.getters.emojis
    }
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectId() {
      setTimeout(() => {
        this.$refs.text.focus()
      }, 0)
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === '') {
        if (this.frequency === 0) {
          this.warn = true
          this.frequency++
          setTimeout(() => {
            this.warn = false
          }, 1000)
        }
      }
    }
  },
  // 在进入的时候 聚焦输入框
  mounted() {
    this.$refs.text.focus()
  },
  methods: {
    IsshowEmoji() {
      console.log('showEmoji', this.showEmoji)
      this.showEmoji = !this.showEmoji
    },
    // 按回车发送信息
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.send()
      }
    },
    // 点击发送按钮发送信息
    send() {
      if (this.content === '↵') {
        return false
      }
      this.showEmoji = false
      console.log('this.content', this.content)
      if (this.content.length <= 0) {
        this.warn = true
        this.content = ''
        setTimeout(() => {
          this.warn = false
        }, 1000)
      } else {
        var msg = {
          content: this.content
        }
        this.$store.dispatch('sendMessage', msg)
        this.$store.dispatch('chatsenddata', this.content)
        this.content = ''
      }
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
.text {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 150px;
  background: #fff;
}

.showemoji {
  width: 50px
}

li {
  list-style: none;
}

.emoji {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding: 0 30px;
  box-sizing: border-box;
  color: #7c7c7c;
}

.icon-look {
  cursor: pointer;
}

.icon-look:hover {
  color: #1aad19;
}

.emojiBox {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: -210px;
  width: 300px;
  height: 200px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  box-shadow: 0 1px 2px 1px #d1d1d1;
}

.emojiBox.showbox-enter-active,
.emojiBox.showbox-leave-active {
  transition: all 0.5s;
}

.emojiBox.showbox-enter,
.emojiBox.showbox-leave-active {
  opacity: 0;
}

textarea {
  box-sizing: border-box;
  padding: 0 30px;
  height: 110px;
  width: 100%;
  border: none;
  outline: none;
  font-family: "Micrsofot Yahei";
  resize: none;
}

.send {
  position: fixed;
  bottom: 10px;
  right: 30px;
  width: 75px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #f5f5f5;
  font-size: 14px;
  color: #7c7c7c;
}

.send:hover {
  background: rgb(18, 150, 17);
  color: #fff;
}

.warn {
  position: absolute;
  bottom: 50px;
  right: 10px;
  width: 110px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  box-shadow: 0 1px 5px 1px #bdbdbd;
}

.warn.appear-enter-active,
.warn.appear-leave-active {
  transition: all 1s;
}

.warn.appear-enter,
.warn.appear-leave-active {
  opacity: 0;
}

.warn:before {
  content: " ";
  position: absolute;
  top: 100%;
  right: 20px;
  border: 7px solid transparent;
  border-top-color: #fff;
  filter: drop-shadow(1px 3px 2px #bdbdbd);
}

/* @media (max-height: 800px) {
  .text {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 150px;
    background: #000;
  }
} */
</style>
