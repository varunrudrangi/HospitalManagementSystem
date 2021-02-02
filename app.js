const express = require('express');
const bodyParser=require('body-parser');
const mongoose= require("mongoose");
const fs=require("fast-two-sms");
mongoose.connect("mongodb://localhost:27017/fuckDB",{useNewUrlParser: true, useUnifiedTopology: true});
const itemSchema= new mongoose.Schema({
  name:String,
  gender:String,
  number:Number,
  email:String,
  department:String,
  type:String,
  checkUpType:String

});
const doctorschema=new mongoose.Schema({
  userid:String,
  password:String,
  department:String,
  name:String,
  contact:String,
  email:String
})
const doctorlogin=mongoose.model("doctor_details",doctorschema);
const generic=mongoose.model("generic",itemSchema);
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get('/', function (req, res) {
  res.render("index");
})
app.get('/appoinment', function (req, res) {
  res.render("appoinment");
})
app.post('/appoinment',function(req,res){
  console.log(req.body);
  var collectionName=req.body.department+req.body.consultantType;
  console.log(collectionName);
  const itemp=new generic({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department,
      type:collectionName
  });
  itemp.save();
  const ph=req.body.contactnumber;
  const meg="Hi "+req.body.name+", you have been registerd";
  console.log(req.body.name,ph,"ikkada");
  fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:meg,numbers:[ph]});
  res.render('index');
})
app.get('/login', function (req, res) {
  res.render("login");
})
app.post('/doclogin', function (req, res) {
  doctorlogin.findOne({userid:req.body.userid,password:req.body.password}, function(err, foundlist){
    if (foundlist!=null){
      var collectionName=foundlist.department;
      generic.find({type:collectionName},function(err, itemsp){
        res.render("list", {listTitle: "Today", newListItems: itemsp, depart:collectionName,name:foundlist.name,phone:foundlist.contact,department:foundlist.department,specs:collectionName})
      })
    }
    else{
      res.render("login");
    }
  });
})
app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const collectionName= req.body.listName;
  var rdept;
  var rspec;
  generic.find({type:collectionName},function(err,itemp){
    if(itemp.length!=0){
      rdept=itemp[0].department+itemp[0].type;
      rspecs=itemp[0].department;
      console.log(rspec,rdept);
      var name=itemp[0].name;
      var ph=itemp[0].number;
      const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
      console.log(name,ph,"ikkada");
      fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
    }
  })
  generic.findByIdAndRemove(checkedItemId, function(err){
    if (!err) {
      console.log("Successfully deleted checked item.");  
    }
  });
  generic.find({type:collectionName}, function(err, items){
    console.log(items);
    if(items.length!=0){
      console.log("i came here");
      var name=items[0].name;
      var ph=items[0].number;
      const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
      console.log(name,ph);
      fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
    }
    doctorlogin.findOne({department:collectionName},function(err,ditem){
      console.log(ditem," what ",collectionName);
      res.render("list", {listTitle: "Today", newListItems: items, department:rdept,name:ditem.name,phone:ditem.contact,specs:rspec});
    })
  });
});
app.listen(3000,function(){
    console.log("server port on 3000");
  })