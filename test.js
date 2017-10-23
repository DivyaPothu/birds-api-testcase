var chai = require('chai');
var chaiHttp = require('chai-http');
//var server = require('../server/app');
var server = require('./server').default;
var should=require('should');

var should = chai.should();
chai.use(chaiHttp);

describe('Empty the databse', () => {
  beforeEach((done) => { //Before each test we empty the database
    ddoekvsmvbt4bm.remove({}, (err) => { 
         done();         
      });     
  });
});





it('display hello', function(done) {
    chai.request('http://localhost:8086')
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
    });
    
//Get
describe('Get Api',function(){
it('display details of bird', function(done) {
  
   chai.request('http://localhost:8086/Get')
   .get('/')
   .end(function(err, res){
     res.should.have.status(200);
     done();
   });
   });   
  });
//Post API with data
describe('Post api',function(){
it('should add a bird into databse POST', function(done) {
        chai.request('http://localhost:8086/Postbird')
          .post('/')
          .send({'id': '2', 'name': 'Peacock','family':'peacockfamily','continents':'us','added':'10-3-2017','visible':'true'})
          .end(function(err, res){
            res.should.have.status(200);
           /* res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.be.a('object');
            res.body.SUCCESS.should.have.property('id');
            res.body.SUCCESS.should.have.property('name');
            res.body.SUCCESS.should.have.property('family');
            res.body.SUCCESS.should.have.property('continents');
            res.body.SUCCESS.should.have.property('added');
            res.body.SUCCESS.should.have.property('visible');
            res.body.SUCCESS.should.have.property('2');
            res.body.SUCCESS.name.should.equal('peacock');
            res.body.SUCCESS.lastName.should.equal('peacockfamily');
            res.body.SUCCESS.lastName.should.equal('us');
            res.body.SUCCESS.lastName.should.equal('10-3-2017');
            res.body.SUCCESS.lastName.should.equal('done');*/
            done();
          });
        });
      });
//POST API without data
describe('Post api without data',function(){
  it('should not add a bird into databse', function(done) {
          chai.request('http://localhost:8086/Postbird')
            .post('/')
            .send({'id': '2', 'name': '','family':'peacockfamily','continents':'us','added':'10-3-2017','visible':'true'})
            .end(function(err, res){
              res.should.have.status(400);
              done();
            });
          });
        });

//PUT API with input
describe('Put api',function(){
  it('should update a bird details in databse', function(done) {
          chai.request('http://localhost:8086/Putbird')
            .put('/')
            .send({'id': '1','name':'sparrow'})
            .end(function(err, res){
              res.should.have.status(200);
              done();
            });
          });
        });
//Put API without input
describe('Put api without input',function(){
  it('should not update a bird details in databse', function(done) {
          chai.request('http://localhost:8086/Putbird')
            .put('/')
            .send({'id': '','name':'sparrow'})
            .end(function(err, res){
              res.should.have.status(404);
              done();
            });
          });
        });

//Delete API
describe('Delete api with id',function(){
  it('should delete a bird from database', function(done) {
             chai.request('http://localhost:8086/Deletebird')
               .delete('/')
               .send({'id': '2'})
               .end(function(err, res){
                 res.should.have.status(200);
                 done();
               });
             });
           });
//Delete api without input
describe('Delete api with out id',function(){
  it('should not delete a bird from database', function(done) {
          chai.request('http://localhost:8086/Deletebird')
            .delete('/')
            .send({'id': ''})
            .end(function(err, res){
              res.should.have.status(404);
              done();
            });
          });
        });            





