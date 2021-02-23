import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getToken2, setToken2 } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    userId: '',
    useCountry: getToken2(),
    regionId: '',
    regionIds: '',
    repositoryId: '',
    countryId: '',
    deptId: '',
    regionName: '',
    repositoryName: '',
    roleId: ''
  },

  mutations: {
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_USECOUNTRY: (state, useCountry) => {
      state.useCountry = useCountry
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_REGIONID: (state, regionId) => {
      state.regionId = regionId
    },
    SET_REGIONIDS: (state, regionIds) => {
      state.regionIds = regionIds
    },
    SET_REPOSITORYID: (state, repositoryId) => {
      state.repositoryId = repositoryId
    },
    SET_COUNTTRYID: (state, countryId) => {
      state.countryId = countryId
    },
    SET_DEPTID: (state, deptId) => {
      state.deptId = deptId
    },
    SET_REGIONNAME: (state, regionName) => {
      state.regionName = regionName
    },
    SET_REPOSITORYNAME: (state, repositoryName) => {
      state.repositoryName = repositoryName
    }
  },

  actions: {
    getuseCountry({ commit }, useCountry) {
      console.log('getToken2()', getToken2())

      setToken2(useCountry)
      commit('SET_USECOUNTRY', useCountry)
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          console.log('response', response)
          if (response.data.ret === 200) {
            const data = response.data
            commit('SET_TOKEN', data.data.content.token)
            setToken(data.data.content.token)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          // console.log(response)
          const data = response.data.data.content
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          // console.log(data)
          commit('SET_ROLEID', data.roleId)
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_USERID', data.userId)
          commit('SET_REGIONID', data.regionId)
          commit('SET_REGIONIDS', data.regionIds)
          commit('SET_REPOSITORYID', data.repositoryId)
          commit('SET_COUNTTRYID', data.countryId)
          commit('SET_DEPTID', data.deptId)
          commit('SET_REGIONNAME', data.regionName)
          commit('SET_REPOSITORYNAME', data.repositoryName)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        // console.log(resolve)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data.roles) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
