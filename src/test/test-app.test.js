var expect = require('chai').expect;
var request = require('request');

it('Api test', function(done){
    request('http://localhost:3000', function(err, res, body){
        expect(body).to.equal('hello');
        done();
    })
})