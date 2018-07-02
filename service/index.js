const koa =require('koa')
const app =new koa();
const Router =require('koa-router')
const mongoose =require('mongoose')
const bodyParser = require('koa-bodyParser')
const cors =require('koa2-cors')

const { connect ,initSchemas} = require('./database/init.js')
app.use(bodyParser())
app.use(cors())
let router = new Router()

let user =require('./appApi/User.js')

router.use('/user',user.routes())

;( async()=>{
    await connect();
     initSchemas()
})()
// ;(async()=>{
//     await connect();
//     initSchemas()
//     const User =mongoose.model('User')
//     let oneUser =new User({userName:'laowang1',password:123456})
//     oneUser.save().then(()=>{
//         console.log("插入成功");
//     })
// })()
app.use(router.routes())
app.use(router.allowedMethods())
app.listen("3000",()=>{
    console.log('[service] starting at port 3000');
})