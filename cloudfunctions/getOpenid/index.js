// 云函数入口文件
const cloud = require('wx-server-sdk')

exports.main = async (event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID,
    ENV,
  } = cloud.getWXContext()

  return UNIONID
}