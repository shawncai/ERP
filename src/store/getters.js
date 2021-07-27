const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  roleId: state => state.user.roleId,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  userId: state => state.user.userId,
  useCountry: state => state.user.useCountry,
  regionId: state => state.user.regionId,
  regionIds: state => state.user.regionIds,
  repositoryId: state => state.user.repositoryId,
  yin: state => state.app.yin,
  countryId: state => state.user.countryId,
  deptId: state => state.user.deptId,
  regionName: state => state.user.regionName,
  repositoryName: state => state.user.repositoryName,
  empcontract: state => state.publics.empcontract,
  empcontract2: state => state.publics.empcontract2,
  empcontract3: state => state.publics.empcontract3,
  empcontract4: state => state.publics.empcontract4,
  chatlist: state => state.chat.chatlist,
  selectId: state => state.chat.selectId,
  topmenu: state => state.app.topmenu,
  emojis: state => state.chat.emojis,
  // 通过当前选择是哪个对话匹配相应的对话
  selectedChat(state) {
    const session = state.chat.chatlist.find(session => session.id === state.chat.selectId)
    return session
  },
  messages(state) {
    const session = state.chat.chatlist.find(session => session.id === state.chat.selectId)
    return session.messages
  },
  user: state => state.chat.user,
  chatsenddata: state => state.chat.chatsenddata,
  voucherdata: state => state.publics.voucherdata,
  newsaleoutdata: state => state.publics.newsaleoutdata,
  newreceiptdata: state => state.publics.newreceiptdata,
  newinstallpaydata: state => state.publics.newinstallpaydata,
  setchoosedata: state => state.publics.setchoosedata,
  myflagApproval: state => state.publics.myflagApproval,
  printdata: state => state.publics.printdata,
  uploadApi: state => state.publics.uploadApi,
  saleoutcopy: state => state.publics.saleoutcopy,
  stockOrder: state => state.publics.stockOrder
}
export default getters
