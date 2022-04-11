const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const csvSchema=Schema({
  date:String,
  open:Number,
  high:Number,
  low:String,
  close:String,
  adjClose:Number,
  volume:String

})
const csvCol=mongoose.model("csvtojson",csvSchema)
module.exports=csvCol;