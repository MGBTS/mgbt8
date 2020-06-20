//app.js
import storeManager from './store/storeManager.js'
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
// 读取数据
storeManager.read()

// 获取用户信息
wx.getUserInfo({
  success: (res) => {
    // 可以将 res 发送给后台解码出 unionId
    this.globalData.userInfo = res.userInfo
  }
})
},

globalData: {
userInfo: null
},

/**
* 小程序隐藏事件
*/
onHide() {
storeManager.save()
},

/**
* 小程序错误事件
*/
onError() {
storeManager.save()
}
})

