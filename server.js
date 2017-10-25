
/*jshint esversion: 6 */
var pg = require('pg');
var Sequelize=require ('sequelize');
var app  = require('express')();// Express App include
var http = require('http').Server(app); // http server
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
pg.defaults.ssl = process.env.DATABASE_URL != undefined;
var port = process.env.PORT || 8086;
var bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
var express = require('express');
var router = express.Router();

var sequelize = new Sequelize('ddoekvsmvbt4bm', 'fnykiielutjcbx', '25236de90eda0295f5f26480a2a5686ce817d6bc8f7b3e88ac0c9809367a42cd', {
    host: 'ec2-54-235-90-107.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions:{
    ssl:true
},
    DATABASE_URL:'postgres://fnykiielutjcbx:25236de90eda0295f5f26480a2a5686ce817d6bc8f7b3e88ac0c9809367a42cd@ec2-54-235-90-107.compute-1.amazonaws.com:5432/ddoekvsmvbt4bm'
});
sequelize
  .authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  var Birds= sequelize.define('bird_tables', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
    },
    name: {
    type:Sequelize.STRING
    },
    family: {
    type:Sequelize.STRING,
    },
    continents:{
    type:Sequelize.STRING,
    },
    added:{
    type: Sequelize.STRING
    },
    visible:{
    type:Sequelize.STRING,
    defaultValue:false
    },
    createdAt:{
    type:Sequelize.DATE,
   },
    updatedAt:{
    type:Sequelize.DATE,
   }
    
     });

  //Applying Birds table to database
  sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!table created successfully');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });
  
//inserting the data into database
sequelize.sync({ force: true }).then(function () {
   Birds.create({
  id:'1',
  name:'Dove',
  family:'DoveFamily',
  continents:'india',
  added:'2017-10-04',
  visible:'true'
  }).then(function(){
  console.log('Data successfully inserted');
  });
});

 
  var express = require('express'),
bodyParser = require('body-parser');

//Performing get API

app.get('/',function(req,res){
  res.send("hello");
});
  app.get('/Get',function(req,res){
    var data = {
        "Data":""
    };
     sequelize.query("SELECT * FROM bird_tables where visible=:visible", { replacements: { visible: 'true' },type: sequelize.QueryTypes.SELECT})
  .then(function(Birds,err,rows,fields) {
    // We don't need spread here, since only the results will be returned for select queries
    //if(rows.length!=0){
    if(Birds){
    
            data.Data = Birds;
            // data["Data"] = rows;
            res.json(data);
           // res.json(data);
        }
  });
});

//performing post api

app.post('/Postbird',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var family= req.body.family;
    var continents = req.body.continents;
     var added= req.body.added;
      var visible= req.body.visible;
     
      console.log(req.body);
    
    console.log(id);
    var data = {
        "Data":""
    };
   if(!!id&& !!name && !!family && !!continents && !!added && !!visible) {
sequelize.query("INSERT INTO bird_tables (id,name,family,continents,added,visible) VALUES('" + id+ "','" + name+ "','" + family + "','" + continents+ "','" + added+ "','" + visible+ "')",[id,name,family,continents,added,visible],{type: sequelize.QueryTypes.INSERT}).then(function(Birds,err) {
    
 if(!!err){
                data.Data = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data.Data = "Bird Added Successfully";
            }
            res.json(data);
        });
    }else{
        data.Data = "Please provide all required data of bird";
        //res.json(404).data);
res.status(400).json(data);
    }
});

//Performing put api

app.put('/Putbird', function(req,res){
  
     var id = req.body.id;
     var name= req.body.name;
      var data = {
  
        "Data":""
      };
  
      if(!!id&& !!name ) {
  sequelize.query("UPDATE bird_tables set name= '"+name+"' where id= '"+id+"' ",[id,name],{type: sequelize.QueryTypes.UPDATE}).then(function(Birds,err) {
      
   if(!!err){
                  data.Data = "Error Adding data";
              }else{
                  data.Data = "Bird Updated Successfully";
              }
              res.json(data);
          });
      }else{
          data.Data = "Please provide all required data of bird";
          res.status(404).json(data);
      
  }
  });
//Performing delete api

app.delete('/Deletebird', function(req,res){
  
     var id = req.body.id;
     
      var data = {
  
        "Data":""
      };
  
      if(!!id) {
  sequelize.query("DELETE from  bird_tables where id= '"+id+"' ",[id],{type: sequelize.QueryTypes.DELETE}).then(function(Birds,err) {
      
   if(!!err){
                  data.Data = "Error Adding data";
              }else{
                  data.Data = "Bird Deleted Successfully";
              }
              res.json(data);
          });
      }else{
          data.Data = "Please provide all required data of bird";
          res.status(404).json(data);
    
      
  }
  });



  // app.use('/api', router);
   app.listen(port);
console.log('Magic happens on port ' + port);