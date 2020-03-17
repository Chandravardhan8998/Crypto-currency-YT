//NOTE Backend
const request =require("request")
const express =require ("express")
const app=express()
const path=require("path")

const port = 3000

const hbs=require("hbs")

const viewPath=path.join(__dirname,"../templates/views")
const publicPath=path.join(__dirname,"../public")

app.use(express.static(publicPath))
app.set("view engine","hbs")
app.set("views",viewPath)

app.get("",(req,res)=>{
    //NOTE hbs will render here
    res.render("index")
})

app.get("/price",(req,res)=>{

const coin=req.query.coin
const currency=req.query.currency

const url= "https://www.worldcoinindex.com/apiservice/ticker?key=sVSBUxSxRSWkc0LdaEXtWlmFKLhXwh&label="+coin+"btc&fiat="+currency;

request( {
    url:url,json:true
},(error,data)=>{
    if(error){
        return res.send({
            error:"Something went wrong!"
        })
    }
    const body=data.body.Markets[0]
    res.send(body)
})
})

app.listen(port,()=>{
    console.log("server start "+port)
})