const express = require('express');
const bodyParser=require('body-parser');
const mongoose= require("mongoose");
const fs=require("fast-two-sms");
const { isNull } = require('util');
mongoose.connect("mongodb://localhost:27017/fuckDB",{useNewUrlParser: true, useUnifiedTopology: true});

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
  department:String,
  name:String,
  contact:String,
  email:String
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
app.get('/department', function (req, res) {
  
  res.render("department");

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
  const meg="Hi "+req.body.name+", you have been registerd in Docmed for Appoinment at "+req.body.department+" for "+req.body.consultantType+" consultancy ";
  fs.sendMessage({authorization:'23dMrBcSpqCxm1Dv96RALkWEulKeUV4HoQTbft0PZsjNzFJ8yIJ8p5l1eLhB7KMiDvPjnqX4maNzSObd',message:meg,numbers:[req.body.contactnumber]});
  res.render('index');
})

app.get('/login', function (req, res) {
  
  res.render("login");

})
app.get('/about',function(req,res){
  res.render('about');
})
app.get('/contact',function(req,res){
  res.render('contact');
})


app.post('/doclogin', function (req, res) {
  // const details=new doctorlogin({
  //   userid:req.body.userid,
  //   password:req.body.password,
  //   department:"neurologyemergency"
  // })
  doctorlogin.findOne({userid:req.body.userid,password:req.body.password}, function(err, foundlist){
    
    if (foundlist!=null){
      var collectionName=foundlist.department;
      if (collectionName==="neurologygeneral"){
        neurologygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items, depart:"neurologygeneral",name:"Rajeshwar Rao",phone:"9963323938",department:"neurologygeneral",specs:'cardio'});
        console.log(items);
        })
      }

      else if (collectionName==="neurologyemergency"){
        neurologyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"neurologyemergency",name:"Varun",phone:"7675087499",department:"neurologyemergency",specs:'cardio'});
        
        });
      }
      else if(collectionName==="cardiologygeneral"){
        cardiologygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"cardiologygeneral",name:"Varun",phone:"7675087499",department:"cardiologygeneral",specs:'cardio'});
        
        });
      }
      else if(collectionName==="cardiologyemergency"){
        cardiologyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"cardiologyemergency",name:"Varun",phone:"7675087499",department:"cardiologyemergency",specs:'cardio'});
        
        });
      }
      else if(collectionName==="orthopedicgeneral"){
        orthopedicgeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"orthopedicgeneral",name:"Varun",phone:"7675087499",department:"orthopedicgeneral",specs:'orthopedic'});
        
        });
      }
      else if(collectionName==="orthopedicemergency"){
        orthopedicemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"orthopedicemergency",name:"Varun",phone:"7675087499",department:"orthopedicemergency",specs:'orthopedic'});
        
        });
      }
      else if(collectionName==="dermatalogygeneral"){
        dermatalogygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"dermatalogygeneral",name:"Varun",phone:"7675087499",department:"dermatalogygeneral",specs:'dermatology'});
        
        });
      }
      else if(collectionName==="dermatalogyemergency"){
        dermatalogyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"dermatalogyemergency",name:"Varun",phone:"7675087499",department:"dermatalogyemergency",specs:'dermatology'});
        
        });
      }
      else if (collectionName==="oncologygeneral"){
        oncologygeneral.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"oncologygeneral",name:"Varun",phone:"7675087499",department:"oncologygeneral",specs:'oncology'});
        
        });
      }
      else {
        oncologyemergency.find({}, function(err, items){
          res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"oncologyemergency",name:"Varun",phone:"7675087499",department:"oncologyemergency",specs:'oncology'});
        
        });
      }
    }
    else{
      res.render("login");
    }
  });
  //details.save()
})




app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const collectionName= req.body.listName;
  if (collectionName==="neurologygeneral"){
    neurologygeneral.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    neurologygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");  
      }
    });
    neurologygeneral.find({}, function(err, items){
      console.log(items);
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today", newListItems: items, depart:"neurologygeneral",name:"Rajeshwar Rao",phone:"9963323938",department:"neurologygeneral",specs:'cardio'});
        
  
    }) 
  }

  else if (collectionName==="neurologyemergency"){
    neurologyemergency.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    neurologyemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
       
      }
    });
    neurologyemergency.find({}, function(err, items){
      console.log(items);
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"neurologyemergency",name:"Varun",phone:"7675087499",department:"neurologyemergency",specs:'cardio'});
    
    });
  }
  else if(collectionName==="cardiologygeneral"){
    cardiologygeneral.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    cardiologygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    cardiologygeneral.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"cardiologygeneral",name:"Varun",phone:"767504499",department:"cardiologygeneral",specs:'cardio'});
        
    
    });
  }
  else if(collectionName==="cardiologyemergency"){
    cardiologyemergency.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    cardiologyemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
  
      }
    });
    cardiologyemergency.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"cardiologyemergency",name:"Varun",phone:"7675087499",department:"cardiologyemergency",specs:'cardio'});
    
    });
  }
  else if(collectionName==="orthopedicgeneral"){
    orthopedicgeneral.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    orthopedicgeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    orthopedicgeneral.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"orthopedicgeneral",name:"Varun",phone:"7675087499",department:"orthopedicgeneral",specs:'orthopedic'});
    
    });
  }
  
  else if(collectionName==="orthopedicemergency"){
    orthopedicemergency.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    orthopedicemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    orthopedicemergency.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"orthopedicemergency",name:"Varun",phone:"7675087499",department:"orthopedicemergency",specs:'orthopedic'});
    
    });
  }
  else if(collectionName==="dermatalogygeneral"){
    dermatalogygeneral.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    dermatalogygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
       
      }
    });
    dermatalogygeneral.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"dermatalogygeneral",name:"Varun",phone:"7675087499",department:"dermatalogygeneral",specs:'dermatology'});
    
    });
  }
  else if(collectionName==="dermatalogyemergency"){
    dermatalogyemergency.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    dermatalogyemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        
      }
    });
    dermatalogyemergency.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"dermatalogyemergency",name:"Varun",phone:"7675087499",department:"dermatalogyemergency",specs:'dermatology'});
    
    });
  }
  else if (collectionName==="oncologygeneral"){
    oncologygeneral.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    oncologygeneral.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
 
      }
    });
    oncologygeneral.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"oncologygeneral",name:"Varun",phone:"7675087499",department:"oncologygeneral",specs:'oncology'});
    
    });
  }
  else {
    oncologyemergency.find({}, function(err, items){
      if(items.length!=0){
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", Thanks for visiting SSS group of Hospitals.";
        console.log(name,ph,"ikkada");
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
    })
    oncologyemergency.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
       
      }
    });
    oncologyemergency.find({}, function(err, items){
      if(items.length!=0){
        console.log("i came here");
        var name=items[0].name;
        var ph=items[0].number;
        const mesg="Hey "+name+", It's your Appoinment Time. Doctor is waiting for you.";
        console.log(name,ph);
        fs.sendMessage({authorization:'YA6rXW7ztpxweM29FJDo4vRIs3kmiTgahEKHB8fNVlcSZCyLjbwOs3Sp1ZGg9dVYTDhjK0nMeXA4IiPm',message:mesg,numbers:[ph]});
      }
      res.render("list", {listTitle: "Today's Appoinments", newListItems: items,depart:"oncologyemergency",name:"Varun",phone:"7675087499",department:"oncologyemergency",specs:'oncology'});
    
    });
  }
  

});

app.listen(3000,function(){
    console.log("server port on 3000");
  })