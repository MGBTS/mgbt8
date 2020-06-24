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
    sksjend: Number,
    place: "",
    teacher: "",
    openid: '',
    timeTable_id: '',
    multiArray: [['周一', '周二', '周三', '周四', '周五'], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
    multiIndex: [0, 0, 0],
  },
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
        //xqj: this.data.xqj,
        //sksj: this.data.sksj,
        //skcd: this.data.skcd,
        xqj: this.data.multiIndex[0] + 1,
        sksj: this.data.multiIndex[1] + 1,
        skcd: this.data.multiIndex[2] + 1,
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

  deleteClassInfo: function(){
    var that = this
    const db = wx.cloud.database({
      env: 'cloud-en-1-g1a9s'//填写自己的云端环境ID
    })
    db.collection(that.data.timeTable_id).doc(that.data.curClassId).remove({
      success: function(res){
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

  getTargetClassInfo : function(){
    var that = this
    const db = wx.cloud.database({
      env: 'cloud-en-1-g1a9s'//填写自己的云端环境ID
    })
    db.collection(that.data.timeTable_id).doc(that.data.curClassId).get({
      success: function(res){
        that.setData({
          place:res.data.place,
          skcd:res.data.skcd,
          sksj:res.data.sksj,
          subject:res.data.subject,
          teacher:res.data.teacher,
          xqj:res.data.xqj,
        })
        that.setData({
          multiIndex: [that.data.xqj-1, that.data.sksj-1, Number(that.data.skcd) -1 ]
        })
        switch(that.data.multiIndex[1]){
          case 0:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]]
            });
            break;
          case 1:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]]
            });
            break;
          case 2:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [3, 4, 5, 6, 7, 8, 9, 10, 11]]
            });
            break;
          case 3:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [4, 5, 6, 7, 8, 9, 10, 11]]
            });
            break;
          case 4:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [5, 6, 7, 8, 9, 10, 11]]
            });
            break;
          case 5:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [6, 7, 8, 9, 10, 11]]
            });
            break;
          case 6:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [7, 8, 9, 10, 11]]
            });
            break;
          case 7:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [8, 9, 10, 11]]
            });
            break;
          case 8:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [9, 10, 11]]
            });
            break;
          case 9:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [10, 11]]
            });
            break;
          case 10:
            that.setData({
              multiArray: [that.data.multiArray[0], that.data.multiArray[1], [11]]
            });
            break;
        }
        console.log("所有数据")
        console.log(that.data)
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