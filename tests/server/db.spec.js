var mongoose = require('mongoose');
require('../../server/db');
var Events = mongoose.model('Events');

var should = require('should');
var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var app = require('../../server/app');
var request = require('supertest');

describe('Events model',function() {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  })
   afterEach(function(done){
      Events.remove({})
      .then(function(){
         done()
      },done)

   })
   describe('Validation', function () {
      var event;
      beforeEach(function(){
         event = new Events;
      })
      it('errors if there is no name',function(done){
         event.validate(function(err){
            expect(err.errors.event_name).to.be.an('object');
            done();
         })
      })
      it('errors if there is no country',function(done){
         event.validate(function(err){
            expect(err.errors.country).to.be.an('object');
            done();
         })

      })
    })
  })



describe('Adding entries',function() {
  var event;
  beforeEach(function(done) {
      Events.create({
          event_date: new Date(),
          event_name: 'Interest Rate Announced',
          country: 'US'
      }).then(function(res) {
        event=res;
        done()
      })
  })

  afterEach(function (done){
     	Events.remove({},done)
  })

  describe('Add an event', function () {
    it('gets by event_name', function () {
      Events.findOne({country: "US"}).should.eventually.have.length(1)

    });
})

})
