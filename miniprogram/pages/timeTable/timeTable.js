// miniprogram/pages/timeTable/timeTable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
     //上课长度全部默认为两节课
      { "xqj": 1, "sksj": 1, "skcd":2, "subject": "高等数学" ,"place":"教学楼0218"},
      { "xqj": 1, "sksj": 7, "skcd": 2, "subject":"大学英语","place":" 教学楼0318"},
      { "xqj": 5, "sksj": 3, "skcd": 2, "subject": "软件工程","place" :"教学楼0403"},
    ],
    blankArr:[
      //1表示有课占着了,一行就是一天
      [1,1,0,0,0,0,1,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,0,0,0,0,0,0]
    ]
  },
  /**
   * 跳转到增加课程界面
   */
  onTapAddCourse(){
    wx.navigateTo({
      url: '/pages/addCourse/addCourse',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   */
  onPullDownRefresh: function () {

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