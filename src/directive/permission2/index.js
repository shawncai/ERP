import permission2 from './permission2'

const install = function(Vue) {
  Vue.directive('permission2', permission2)
}

if (window.Vue) {
  window['permission2'] = permission2
  Vue.use(install); // eslint-disable-line
}

permission2.install = install
export default permission2
