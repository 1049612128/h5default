const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
const glob =require('glob')
const { resolve } = require('path');
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
    console.log(__dirname);
    console.log(glob.sync(resolve(__dirname,'./schema/','**/*.js')));
}
exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0;
return new Promise((resolve,reject) =>{
    //增加数据库监听事件
    mongoose.connection.on('disconnected',()=>{
        console.log('***********数据库断开')
        if(maxConnectTimes<3){
            mongoose.connect(db)
            maxConnectTimes++
        }else{
            console.log(maxConnectTimes);
            reject()
            throw new Error('*****************数据库出现错误，请人为处理***************')
        }
        
    })

    mongoose.connection.on('error',(error)=>{
        console.log('***********数据库错误')
        if(maxConnectTimes<3){
            mongoose.connect(db)
            maxConnectTimes++
        }else{
            console.log(maxConnectTimes);
            reject(error)
            throw new Error('*****************数据库出现错误，请人为处理***************')
        }
    })
    //链接打开的时
    mongoose.connection.once('open',()=>{
        console.log(maxConnectTimes);
        console.log('MongoDB connected successfully')    
        resolve()
    })
    })

}