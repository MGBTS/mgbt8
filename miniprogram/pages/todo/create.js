// miniprogram/pages/todo/create.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todo:new Todo(),
    levels:['紧急且重要','重要不紧急','紧急不重要','不紧急不重要']

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.todo=new Todo()
    this.update()

  },

  onShareAppMessage:function(options){

  },

  handleTodoItemChange(e){
    let todo=e.detail.data.todo
    Object.assign(this.data.todo,todo)
    this.update()
  },
  handleLevelChange(e){
    this.data.todo.level=parseInt(e.detail.value)+1
    this.update()
  },
  handleDescChange(e){
    this.data.todo.desc=e.detail.value
    this.update
  },
  handleCancelTap(e){
    wx.navigateBack()
  },
  handleSaveTap(e){
    todoStore.addTodo(this.data.todo)
    todoStore.save()
    wx.navigateBack()
  },
  update(data){
    data=data||this.data
    this.setData(data)
  }
})