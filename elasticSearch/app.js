const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const indexRoute=require('./api/routes/index')
const doucmentRoute=require('./api/routes/document')
app.use(bodyParser.json());
app.use('/index',indexRoute);
app.use('/document',doucmentRoute);



app.use((req,res,next)=>{
    const error=new Error("not found url");
    error.status=400;
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);;
    res.json({
        error:{
            msg:error.message
        }
    })
})
module.exports=app;