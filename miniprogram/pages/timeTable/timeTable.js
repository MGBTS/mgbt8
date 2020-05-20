// miniprogram/pages/timeTable/timeTable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
      //上课长度全部默认为两节课

    ],
    blankArr: [
      //1表示有课占着了,一行就是一天
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    courseNum: 0
  },
  /**
   * 跳转到增加课程界面
   */
  onTapAddCourse() {
    wx.navigateTo({
      url: '/pages/addCourse/addCourse',
    })

  },
  onTapEditCourse() {
    wx.navigateTo({
      url: '/pages/editCourse/editCourse',
    })

  },

  getDataFromDB() {
    // 这里app.music_num是前面计算出来的记录总数
    // 一般是在本界面之前 求出 
    // 当然在本界面求也是可以的 相对麻烦
    // 这里就需要自己去求总数 我就不贴代码了 去开发文档看就行
    //  因为 微信小程序的js 是并发 不按顺序执行代码
    var that = this;
    //由于需要同步获取数据，可能较慢，最好加入加载动画​
    wx.showLoading({
      title: '加载中',
    })
    //初始化云端环境​
    const db = wx.cloud.database({
      env: 'cloud-en-1-g1a9s'//填写自己的云端环境ID
    })
    //定义每次获取的条数​
    const MAX_LIMIT = 20;
    //先取出集合的总数
    var total = 0;
    console.log(total)
    wx.cloud.callFunction({
      name: 'getCourses'
    }).then((res) => {
      total = res;
    });
    console.log(total)
    total = 20;

    //计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    var arraypro = []

    //初次循环获取云端数据库的分次数的promise数组
    var youke = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    for (let i = 0; i < batchTimes; i++) {
      db.collection('timeTable_v0').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get({
        success: function (res) {

          console.log(res.data)
          //二次循环根据​获取的promise数组的数据长度获取全部数据push到arraypro数组中
          for (let j = 0; j < res.data.length; j++) {
            var courseInfo = res.data[j]
            var xqj = courseInfo.xqj
            var sksj = courseInfo.sksj
            var skcd = courseInfo.skcd

            for (let k = 0; k < skcd; k++) {
              youke[xqj - 1][sksj - 1 + k] = 1
            }
            arraypro.push(courseInfo)

          }
          //把数据传递至页面视图
          that.setData({
            wlist: arraypro,
            blankArr: youke
          })

        }
      })
    }
    
    wx.hideLoading()

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataFromDB()

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * TODO
   * 与数据库同步一下
   */
  onPullDownRefresh: function () {
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})