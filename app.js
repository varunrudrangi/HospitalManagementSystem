const express = require('express');
const bodyParser=require('body-parser');
const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/fuckDB",{useNewUrlParser:true},{ useUnifiedTopology: true });

const itemSchema= new mongoose.Schema({
  name:String,
  gender:String,
  number:Number,
  email:String,
  department:String,
  checkUpType:String

});

const doctorschema=new mongoose.Schema({
  userid:String,
  password:String,
  department:String
})
const doctorlogin=mongoose.model("doctor_details",doctorschema);
const neurologygeneral=mongoose.model("neurology-general",itemSchema);
const neurologyemergency=mongoose.model("neurology-emergency",itemSchema);
const cardiologygeneral=mongoose.model("cardiology-general",itemSchema);
const cardiologyemergency=mongoose.model("cardiology-emergency",itemSchema);
const orthopedicgeneral=mongoose.model("orthopedic-general",itemSchema);
const orthopedicemergency=mongoose.model("orthopedic-emergency",itemSchema);
const dermatalogygeneral=mongoose.model("dermatalogy-general",itemSchema);
const dermatalogyemergency=mongoose.model("dermatalogy-emergency",itemSchema);
const oncologygeneral=mongoose.model("oncology-general",itemSchema);
const oncologyemergency=mongoose.model("oncology-emergency",itemSchema);



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
  if (collectionName==="neurologygeneral"){
    const item1=new neurologygeneral({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if (collectionName==="neurologyemergency"){
    const item1=new neurologyemergency({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if(collectionName==="cardiologygeneral"){
    const item1=new cardiologygeneral({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if(collectionName==="cardiologyemergency"){
    const item1=new cardiologyemergency({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if(collectionName==="orthopedicgeneral"){
    const item1=new orthopedicgeneral({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if(collectionName==="orthopedicemergency"){
    const item1=new orthopedicemergency({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if(collectionName==="dermatalogygeneral"){
    const item1=new dermatalogygeneral({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if(collectionName==="dermatalogyemergency"){
    const item1=new dermatalogyemergency({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else if (collectionName==="oncologygeneral"){
    const item1=new oncologygeneral({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }
  else {
    const item1=new oncologyemergency({
      name:req.body.name,
      gender:req.body.gender,
      number:req.body.contactnumber,
      email:req.body.email,
      department:req.body.consultantType,
      checkUpType:req.body.department
    });
    item1.save()
  }

  res.render('index');
})

app.get('/login', function (req, res) {
  
  res.render("login");

})

app.post('/doclogin', function (req, res) {
  
  // const details=new doctorlogin({
  //   userid:req.body.userid,
  //   password:req.body.password,
  //   department:"neurologyemergency"

  // })
  doctorlogin.findOne({userid:req.body.userid,password:req.body.password}, function(err, foundlist){
    if (!err){
      var collectionName=foundlist.department;
      

      if (collectionName==="neurologygeneral"){
        neurologygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items, depart:"neurologygeneral"});
        console.log(items);
        })

      }

      else if (collectionName==="neurologyemergency"){
        neurologyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"neurologyemergency"});
        
        });
      }
      else if(collectionName==="cardiologygeneral"){
        cardiologygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"cardiologygeneral"});
        
        });
      }
      else if(collectionName==="cardiologyemergency"){
        cardiologyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"cardiologyemergency"});
        
        });
      }
      else if(collectionName==="orthopedicgeneral"){
        orthopedicgeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"orthopedicgeneral"});
        
        });
      }
      else if(collectionName==="orthopedicemergency"){
        orthopedicemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"orthopedicemergency"});
        
        });
      }
      else if(collectionName==="dermatalogygeneral"){
        dermatalogygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"dermatalogygenera"});
        
        });
      }
      else if(collectionName==="dermatalogyemergency"){
        dermatalogyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"dermatalogyemergency"});
        
        });
      }
      else if (collectionName==="oncologygeneral"){
        oncologygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"oncologygeneral"});
        
        });
      }
      else {
        oncologyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today", newListItems: items,depart:"oncologyemergency"});
        
        });
      }





    }
  });
  //details.save()


})



app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const collectionName= req.body.listName;




  if (collectionName==="neurologygeneral"){
    neurologygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
      
      }
    });
    neurologygeneral.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items, depart:"neurologygeneral"});
    console.log(items);
    })
    

  }

  else if (collectionName==="neurologyemergency"){
    neurologyemergencyfindByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
       
      }
    });
    neurologyemergency.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"neurologyemergency"});
    
    });
  }
  else if(collectionName==="cardiologygeneral"){
    cardiologygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    cardiologygeneral.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"cardiologygeneral"});
    
    });
  }
  else if(collectionName==="cardiologyemergency"){
    cardiologyemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
  
      }
    });
    cardiologyemergency.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"cardiologyemergency"});
    
    });
  }
  else if(collectionName==="orthopedicgeneral"){
    orthopedicgeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    orthopedicgeneral.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"orthopedicgeneral"});
    
    });
  }
  
  else if(collectionName==="orthopedicemergency"){
    orthopedicemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    orthopedicemergency.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"orthopedicemergency"});
    
    });
  }
  else if(collectionName==="dermatalogygeneral"){
    dermatalogygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
       
      }
    });
    dermatalogygeneral.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"dermatalogygenera"});
    
    });
  }
  else if(collectionName==="dermatalogyemergency"){
    dermatalogyemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    dermatalogyemergency.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"dermatalogyemergency"});
    
    });
  }
  else if (collectionName==="oncologygeneral"){
    oncologygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
 
      }
    });
    oncologygeneral.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"oncologygeneral"});
    
    });
  }
  else {
    oncologyemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
       
      }
    });
    oncologyemergency.find({}, function(err, items){
      res.render("list", {listTitle: "Today", newListItems: items,depart:"oncologyemergency"});
    
    });
  }
  

});

app.listen(3000,function(){
    console.log("server port on 3000");
  })