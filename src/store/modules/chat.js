import { customerInfo } from '@/api/chat'
const now = new Date()
const chat = {
  state: {
    chatsenddata: '',
    user: {
      name: 'ratel',
      img: 'static/images/vue.jpg'
    },
    // emoji表情
    emojis: [
      { file: '100.gif', code: '/::)', title: '微笑', reg: /\/::\)/g },
      { file: '101.gif', code: '/::~', title: '伤心', reg: /\/::~/g },
      { file: '102.gif', code: '/::B', title: '美女', reg: /\/::B/g },
      { file: '103.gif', code: '/::|', title: '发呆', reg: /\/::\|/g },
      { file: '104.gif', code: '/:8-)', title: '墨镜', reg: /\/:8-\)/g },
      { file: '105.gif', code: '/::<', title: '哭', reg: /\/::</g },
      { file: '106.gif', code: '/::$', title: '羞', reg: /\/::\$/g },
      { file: '107.gif', code: '/::X', title: '哑', reg: /\/::X/g },
      { file: '108.gif', code: '/::Z', title: '睡', reg: /\/::Z/g },
      { file: '109.gif', code: '/::\'(', title: '哭', reg: /\/::'\(/g },
      { file: '110.gif', code: '/::-|', title: '囧', reg: /\/::-\|/g },
      { file: '111.gif', code: '/::@', title: '怒', reg: /\/::@/g },
      { file: '112.gif', code: '/::P', title: '调皮', reg: /\/::P/g },
      { file: '113.gif', code: '/::D', title: '笑', reg: /\/::D/g },
      { file: '114.gif', code: '/::O', title: '惊讶', reg: /\/::O/g },
      { file: '115.gif', code: '/::(', title: '难过', reg: /\/::\(/g },
      { file: '116.gif', code: '/::+', title: '酷', reg: /\/::\+/g },
      { file: '117.gif', code: '/:--b', title: '汗', reg: /\/:--b/g },
      { file: '118.gif', code: '/::Q', title: '抓狂', reg: /\/::Q/g },
      { file: '119.gif', code: '/::T', title: '吐', reg: /\/::T/g },
      { file: '120.gif', code: '/:,@P', title: '笑', reg: /\/:,@P/g },
      { file: '121.gif', code: '/:,@-D', title: '快乐', reg: /\/:,@-D/g },
      { file: '122.gif', code: '/::d', title: '奇', reg: /\/::d/g },
      { file: '123.gif', code: '/:,@o', title: '傲', reg: /\/:,@o/g },
      { file: '124.gif', code: '/::g', title: '饿', reg: /\/::g/g },
      { file: '125.gif', code: '/:|-)', title: '累', reg: /\/:\|-\)/g },
      { file: '126.gif', code: '/::!', title: '吓', reg: /\/::!/g },
      { file: '127.gif', code: '/::L', title: '汗', reg: /\/::L/g },
      { file: '128.gif', code: '/::>', title: '高兴', reg: /\/::>/g },
      { file: '129.gif', code: '/::,@', title: '闲', reg: /\/::,@/g },
      { file: '130.gif', code: '/:,@f', title: '努力', reg: /\/:,@f/g },
      { file: '131.gif', code: '/::-S', title: '骂', reg: /\/::-S/g },
      { file: '133.gif', code: '/:,@x', title: '秘密', reg: /\/:,@x/g },
      { file: '134.gif', code: '/:,@@', title: '乱', reg: /\/:,@@/g },
      { file: '135.gif', code: '/::8', title: '疯', reg: /\/::8/g },
      { file: '136.gif', code: '/:,@!', title: '哀', reg: /\/:,@!/g },
      { file: '137.gif', code: '/:!!!', title: '鬼', reg: /\/:!!!/g },
      { file: '138.gif', code: '/:xx', title: '打击', reg: /\/:xx/g },
      { file: '139.gif', code: '/:bye', title: 'bye', reg: /\/:bye/g },
      { file: '142.gif', code: '/:handclap', title: '鼓掌', reg: /\/:handclap/g },
      { file: '145.gif', code: '/:<@', title: '什么', reg: /\/:<@/g },
      { file: '147.gif', code: '/::-O', title: '累', reg: /\/::-O/g },
      { file: '153.gif', code: '/:@x', title: '吓', reg: /\/:@x/g },
      { file: '155.gif', code: '/:pd', title: '刀', reg: /\/:pd/g },
      { file: '156.gif', code: '/:<W>', title: '水果', reg: /\/:<W>/g },
      { file: '157.gif', code: '/:beer', title: '酒', reg: /\/:beer/g },
      { file: '158.gif', code: '/:basketb', title: '篮球', reg: /\/:basketb/g },
      { file: '159.gif', code: '/:oo', title: '乒乓', reg: /\/:oo/g },
      { file: '195.gif', code: '/:circle', title: '跳舞', reg: /\/:circle/g },
      { file: '160.gif', code: '/:coffee', title: '咖啡', reg: /\/:coffee/g }
    ],
    selectId: 1,
    // 对话好友列表
    chatlist: [
      {
        id: 1,
        user: {
          name: '妈咪',
          img: 'static/images/mother.jpg'
        },
        messages: [
          {
            content: '么么哒，妈咪爱你', // 聊天内容
            date: now // 时间
          },
          {
            content: '按回车可以发送信息，还可以给我发送表情哟',
            date: now
          }
        ],
        index: 1 // 当前在聊天列表中的位置,从1开始

      },
      {
        id: 2,
        user: {
          name: 'father',
          img: 'static/images/father.jpg'
        },
        messages: [
          {
            content: 'Are you kidding me?',
            date: now
          }
        ],
        index: 2
      },
      {
        id: 3,
        user: {
          name: '机器人',
          img: 'static/images/vue.jpg'
        },
        messages: [
          {
            content: '我会跟你聊聊天的哟',
            date: now
          }
        ],
        index: 3
      }
    ]
  },
  mutations: {
    changechatlist: (state, value) => {
      const needdata = value.data.split('-')
      const result = state.chatlist.find(session => session.id === needdata[1])
      if (result) {
        result.messages.push({
          content: needdata[3],
          date: new Date()
        })
      } else {
        const messagesdata = {
          content: needdata[3],
          date: now
        }
        const standeddata = {
          id: '',
          user: {
            name: 'father',
            img: 'static/images/vue.jpg'
          },
          messages: [],
          index: ''
        }
        standeddata.id = needdata[1]
        standeddata.index = state.chatlist.length + 1
        state.selectId = state.chatlist.length
        standeddata.messages.push(messagesdata)
        customerInfo(needdata[1])
          .then((res) => {
            if (res.data.ret === 200) {
              standeddata.user.name = res.data.data.content.customerName
              standeddata.user.img = 'static/images/vue.jpg'
              console.log('standeddata', standeddata)
              state.chatlist.push(standeddata)
            }
          })
      }
    },
    // 从localStorage 中获取数据
    initData(state) {
      const data = localStorage.getItem('vue-chat')
      if (data) {
        state.chatlist = JSON.parse(data)
      }
    },
    // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
    selectSession(state, value) {
      state.selectId = value
    },
    // 发送信息
    sendMessage(state, msg) {
      console.log('msg', msg)
      const result = state.chatlist.find(session => session.id === state.selectId)
      result.messages.push({
        content: msg.content,
        date: new Date(),
        self: true
      })
    },
    set_chatsenddata(state, chatsenddata) {
      state.chatsenddata = chatsenddata
    }
  },
  actions: {
    chatsenddata({ commit }, chatsenddata) {
      commit('set_chatsenddata', chatsenddata)
    },
    getmessagedata({ commit }, value) {
      commit('changechatlist', value)
    },
    selectSession({ commit }, value) {
      commit('selectSession', value)
    },
    sendMessage({ commit }, msg) {
      commit('sendMessage', msg)
    },
    initData({ commit }) {
      commit('initData')
    }
  }
}

export default chat
