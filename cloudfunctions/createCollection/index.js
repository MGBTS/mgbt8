
// 云函数入口函数
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud-en-1-g1a9s' })
var db = cloud.database()
exports.main = async (event, context) => {
    try {
        return await db.createCollection(event.name)
    } catch (error) {
        return db.collection(event.name)
    }
    
}