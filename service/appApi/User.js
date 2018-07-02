const Router =require('koa-router')
const mongoose =require('mongoose')
let router =new Router()
router.post('/register',async(ctx)=>{
    console.log(ctx.request.body)
    const User =mongoose.model('User')
   
   const newUser =new User(ctx.request.body)
   await newUser.save().then(()=>{
        ctx.body ={
            code:200,
            message:'注册成功'
        }
   }).catch((err)=>{
    ctx.body ={
        code:500,
        message:err
    }
   })
})
router.get('/hasName',async(ctx)=>{
    ctx.body=ctx.request.query
    let request =ctx.request.query
    let userName =request.userName;
    const User = mongoose.model('User')
     await User.findOne({userName:userName}).exec().then(async(result)=>{
         console.log(result);
            if(result){
                console.log(1);
                ctx.body={
                    code:100,
                    message:'用户名已经存在'
                }
            }else{
                console.log(2);
                ctx.body={
                    code:200,
                    message:'可以注册'
                }
            }
     }).catch((error)=>{
        ctx.body ={
            code:500,
            message:err
        }
     })
})

module.exports =router;