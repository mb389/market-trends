var mongoose = require('mongoose');
require('../../server/db');
var Events = mongoose.model('Events');
var should = require('should');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/portfoliostrat';
// var clearDB = require('mocha-mongoose')(dbURI);

var app = require('../../server/app');
var request = require('supertest');

  describe('GET /data/get', function() {

    beforeEach('Establish DB connection', function (done) {
  		if (mongoose.connection.db) return done();
      mongoose.connect(dbURI);
      done();
  	});

    it('should respond with a JSON array', function(done) {
      request(app)
        .get('/data/get')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.be.instanceof(Array);
          res.body.should.not.have.length(0);
          done();
        });

    });


 })
