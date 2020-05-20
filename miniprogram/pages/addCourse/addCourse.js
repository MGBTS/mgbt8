// pages/addCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    subject: "",
    xqj: 0,
    sksj: 0,
    skcd: 0,
    place: "",
    teacher: "",
    openid: '',
    timeTable_id: ''
  },

  xqjInput: function (e) {
    this.setData({
      xqj: e.detail.value
    })
  },
  sksjInput: function (e) {
    this.setData({
      sksj: e.detail.value
    })
  },
  skcdInput: function (e) {
    this.setData({
      skcd: e.detail.value
    })
  },
  subjectInput: function (e) {
    this.setData({
      subject: e.detail.value
    })
  },
  teacherInput: function (e) {
    this.setData({
      teacher: e.detail.value
    })
  },
  placeInput: function (e) {
    this.setData({
      place: e.detail.value
    })
  },

  //用于保存修改的数据
  save: function () {
    var that = this;
    const db = wx.cloud.database({
      env: 'cloud-en-1-g1a9s'//填写自己的云端环境ID
    })
    db.collection(that.data.timeTable_id).add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        xqj: this.data.xqj,
        sksj: this.data.sksj,
        skcd: this.data.skcd,
        teacher: this.data.teacher,
        place: this.data.place,
        subject: this.data.subject
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000,
          mask: true
        });
        wx.reLaunch({
          url: '/pages/timeTable/timeTable',
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getOpenid', complete: res => {
        console.log('云函数获取到的UNIONID: ', res.result.openid)
        var oid = res.result.openid;
        var tt_id = "timeTable_id_" + oid;
        that.setData({
          openid: oid,
          timeTable_id: tt_id
        })
      }
    })
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
