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
    sksjend: 0,
    place: "",
    teacher: "",
    openid: '',
    timeTable_id: '',
    multiArray: [['周一', '周二', '周三', '周四', '周五'], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
    multiIndex: [0, 0, 0],
  },
  //点到多选框时候
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    //index里面具体值应该就是取第几个？
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 1:
        switch (data.multiIndex[1]) {
          case 0:
            data.multiArray[2] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            break;
          case 1:
            data.multiArray[2] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            break;
          case 2:
            data.multiArray[2] = [3, 4, 5, 6, 7, 8, 9, 10, 11];
            break;
          case 3:
            data.multiArray[2] = [4, 5, 6, 7, 8, 9, 10, 11];
            break;
          case 4:
            data.multiArray[2] = [5, 6, 7, 8, 9, 10, 11];
            break;
          case 5:
            data.multiArray[2] = [6, 7, 8, 9, 10, 11];
            break;
          case 6:
            data.multiArray[2] = [7, 8, 9, 10, 11];
            break;
          case 7:
            data.multiArray[2] = [8, 9, 10, 11];
            break;
          case 8:
            data.multiArray[2] = [9, 10, 11];
            break;
          case 9:
            data.multiArray[2] = [10, 11];
            break;
          case 10:
            data.multiArray[2] = [11];
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
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
        xqj: this.data.multiIndex[0] + 1,
        sksj: this.data.multiIndex[1] + 1,
        skcd: this.data.multiIndex[2] - this.data.multiIndex[1] + 1,
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
