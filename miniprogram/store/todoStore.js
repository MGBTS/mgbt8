import util from '../utils/util'
import store from '../store/Store'
import Todo from '../models/Todo'

class todoStore extends store{
  constructor(){
    super()
    this.todos=[]
    this.key='__todos__'
    this.__init()
  }

  //初始化
  __init(){
    let isInited=wx.getStorageSync('__todos_inited__')
    if(isInited) return
    this.todos=this.todos.concat([new Todo({
      title:'欢迎使用todoList',
      completed:false,
      level:1,
      createdAt:new Date()
    }),
    new Todo({
      title:'这是已经完成的任务',
      completed:true,
      level:4,
      date:new Date('2020/05/19'),
      createdAt:new Date(),
      completedAt:new Date('2020/05/19')
    })
  ])
  this.save()
  wx.setStorageSync('__todos_inited__', true)
  }
  //获取todos
  getTodos(){
    return this.todos
  }
  //获取todo
  getTodo(uuid){
    return this.todos.find((item)=>item.uuid===uuid)
  }

  //获取索引
  getIndex(todo){
    return this.todos.indexOf(todo)
  }

  //获取未完成的todos
  getUncompletedTodos(){
    return this.todos.filter(item=>!item.completed)
  }

  //获取已完成的todos
  getCompletedTodos(){
    return this.todos.filter(item=>item.completed)
  }

  //获取今天完成的todos
  getTodayCompletedTodos(){
    let todos=this.getCompletedTodos()
    let date=util.formatTime(new Date())
    return todos.filter(item=>item.completed===date)
  }

  //设置todos
  setTodos(todos){
    this.todos=todos
  }

  //清空todos
  clearTodos(){
    this.todos=[]
  }

  //添加
  addTodo(todo){
    this.todos.push(todo)
  }

  //删除对应uuid的todo
  removeTodo(uuid){
    let todo=this.getTodo(uuid)
    let index=this.getIndex(todo)
    if(index<0) return false
    return this.removeTodoByIndex(index)
  }

  //根据索引删除
  removeTodoByIndex(index){
    this.todos.splice(index,1)
    return true
  }

  //获取日期统计数据
  getStatisticsByDate(){
    let result=[]
    let todos=this.getCompletedTodos()
    let temp={}
    todos.forEach((item)=>{
      temp[item.completedAt]=temp[intem.completedAt]?temp[item.completedAt]+1:1
    })
    for(let key in temp){
      result.push({
        completedAt:key,
        count:temp[key]
      })
    }
    result=result.sort((a,b)=>(a.completedAt>b.completedAt))//依完成日期排序
    return result
  }

  //读取
  read(){
    let todos=wx.getStorageSync(this.key)||[]
    this.todos=todos
  }

  save(){
    wx.getStorageSync(this.key,this.todos)
  }

}
export default new todoStore()