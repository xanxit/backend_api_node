const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const Sum=require('./models/sum');
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://cloudSEK:cloudSEK@cluster0.m0w27.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("mongo db connected");
  });

app.get("/",(req,res)=>{
    res.status(200).json("Hi from test API");
})
app.get("/calculate/:number1/:number2",async(req,res)=>{
    let number1=req.params.number1;
    let number2=req.params.number2;
    // let result=Number(number1)+Number(number2);
    const new_entry= new Sum({
        number1:number1,
        number2:number2,
    })
    try{
    new_entry.save();}
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error"
        })
    }
    res.status(200).json({
        uniquieId:new_entry._id,
    });
})

app.get("/get_answer/:idenitfier",async(req,res)=>{
    let idenitfier=req.params.idenitfier;
    try{
    let result=await Sum.findById(idenitfier);
    result.sum=Number(result.number1)+Number(result.number2);
    // console.log("Please Wait");
    if(result.sum)
    {
    setTimeout(()=>{
    res.status(200).json({
        message:"The answer has been calculated",
        sum:result.sum,
    })   
    },10000);}
    else{
    res.status(200).json({
        message:"Please wait",
    })}
    }
    catch(err){
        console.log(err);
        res.status(404).json({
            message:"Not Found"
        })
    }
})

app.listen(process.env.PORT||1027,()=>{
    console.log('Server is running at port 1027');
})