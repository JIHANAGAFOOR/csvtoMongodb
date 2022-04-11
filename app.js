const express=require("express")
const mongoose=require("mongoose")
const path=require("path")
const csv = require('csvtojson');
const csvModel=require("./model/csv")
const multer=require("multer");
const app=express();
app.set('view engine','ejs');
app.set("views",'./view');
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
mongoose.connect("mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/csv?retryWrites=true&w=majority",()=>{
    console.log("Database Connected")
})
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
var uploads = multer({storage:storage});
// app.get("/",(req,res)=>{
//     res.json("hai")
// })
app.get('/',(req,res)=>{
   res.render("index")
});
app.post('/',uploads.single('csv'),(req,res)=>{
    //convert csvfile to jsonArray   
   csv()
   .fromFile(req.file.path)
   .then((jsonObj)=>{
       for(var x=0;x<jsonObj.length;x++){
           const items={
               date:jsonObj[x].Date,
               open:jsonObj[x].Open,
               high:jsonObj[x].High,
               low:jsonObj[x].Low,
               close:jsonObj[x].Close,
               adjClose:jsonObj[x].AdjClose,
               volume:jsonObj[x].Volume
           }
           const csvData=csvModel(items)
           csvData.save().then((data)=>{
           })
        }
      });
      res.redirect('/view')
   });
   app.get("/view",(req,res)=>{
csvModel.find().then((data)=>{
    console.log(data);
    res.send({key:data})
    })
   })
app.listen(1234,()=>{
    console.log("server is listening...http://localhost:1234");
})