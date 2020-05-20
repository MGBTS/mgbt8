// miniprogram/pages/todo/todo.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos:[],
    uncompletedCount:0,
    completedCount:0,
    dalay:true

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.sycnData()
    //新建任务后，列表更新

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.sycnData()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {

  },
  sycnData(){
    this.data.todos=todoStore.getTodos()
    this.update()//更新置顶标题
    let uncompletedCount=todoStore.getUncompletedTodos().length
    let todayCompletedCount=todoStore.getTodayCompletedTodos().length
    let title=['TodoList(进行中:',uncompletedCount,',今日已完成：',todayCompletedCount,')'].join('')

    wx.setTopBarText({
      text: title}) //设定顶部bar显示
    
      //动画结束后取消动画队列延迟
      setTimeout(()=>{
        this.update({delay:false})
      },2000)
  },

  //todo长按事件
  handleTodoLongTap(e){
    let index=e.currentTarget.dataset.index
    wx.showModal({
      title:'删除提示',
      content:'确定要删除这项任务吗？',
      success:(e)=>{
        if(e.confirm){
          this.data.todos.splice(index,1)
          this.update()
        }
      }
    })

  },
  handleTodoItemChange(e){
    let index=e.currentTarget.dataset.index
    let todo=e.detail.data.todo
    let item=this.data.todos[index]
    Object.assign(item,todo)
    this.update()
  },

  //更新数据
  update(data){
    data=data||this.data
    data.completedCount=todoStore.getCompletedTodos().length
    data.uncompletedCount=todoStore.getUncompletedTodos().length
    this.setData(data)
  },

  //增加todo事项
  handleAddTodo(e){
    wx.navigateTo({
      url: '../todo/create'
    })
  }


})