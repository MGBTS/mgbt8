// miniprogram/pages/editCourse/editCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curClassId:'',

    subject: "",
    xqj: Number,
    sksj: Number,
    skcd: Number,
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
  changeClassInfo: function(){
    var that = this
    const db = wx.cloud.database({
      env: 'cloud-en-1-g1a9s'//填写自己的云端环境ID
    })
    db.collection(that.data.timeTable_id).doc(that.data.curClassId).update({
      data:{
        xqj: this.data.xqj,
        sksj: this.data.sksj,
        skcd: this.data.skcd,
        teacher: this.data.teacher,
        place: this.data.place,
        subject: this.data.subject,
      },
      success: function (res) {
        wx.showToast({
          title: '修改成功',
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
    var that = this
    that.setData({
        curClassId:String(options.id)
    })
    wx.cloud.callFunction({
      name: 'getOpenid', complete: res => {
        console.log('云函数获取到的UNIONID: ', res.result.openid)
        var oid = res.result.openid;
        var tt_id = "timeTable_id_" + oid;
        that.setData({
          openid: oid,
          timeTable_id: tt_id
        })
        that.getTargetClassInfo()
      }
    })
  },

  //提交表单，更新数据库
  getTargetClassInfo : function(){
    var that = this
    const db = wx.cloud.database({
      env: 'cloud-en-1-g1a9s'//填写自己的云端环境ID
    })
    db.collection(that.data.timeTable_id).doc(that.data.curClassId).get({
      success: function(res){
        //console.log("跳转后从数据库中获取的数据：")
        //console.log(res.data)
        that.setData({
          place:res.data.place,
          skcd:res.data.skcd,
          sksj:res.data.sksj,
          subject:res.data.subject,
          teacher:res.data.teacher,
          xqj:res.data.xqj,
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