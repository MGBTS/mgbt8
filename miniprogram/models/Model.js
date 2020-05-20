import util from '../utils/util'

//Model 模型基类
class Model{
  constructor(){
    this.uuid=util.uuid();
  }
  //加载详情
  load(params){
    return Promise.reject('未重写load方法')
  }
  //删除
  remove(){
    return Promise.reject('未重写remove方法')
  }

  //保存
  save(){
    return Promise.reject('未重写save方法')
  }
  //验证模型数据
  validate(){
    return Promise.reject('未重写validate方法')
  }
  //从api数据转换为模型
  fromApi(data){
    return this
  }
  
  //转换为api接口数据
  toApi(){
    return Object.assign({},this)
  }

  //从api数据数组转换为模型数组（静态方法）
  static fromApiArray(dataArr=[]){
    return []
  }

  //从模型数组转换为api数据数组（静态方法)
  static toApiArray(modelArr=[]){
    return []
  }

  static validate(model){
    return Promise.reject('未重写validate静态方法')
  }

}
export default Model