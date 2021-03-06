var expect = require('chai').expect;
var nock = require('nock');
var api = require("../lib/remote-api");

describe("Remote API", function() {

  after(function() {
    nock.restore();
  });

  it("should mock", function(done) {
    var defaultsData = { path: "/", response: 200 };

    var scope = nock('http://localhost:7001').post('/syncMock', defaultsData).reply(200);

    api.mock(defaultsData, function() {
      scope.done();
      done();
    });
  });

  it("should call defaults", function(done) {
    var defaultsData = [ { path: "/1"}, { path: "/2"}];

    var scope = nock('http://localhost:7001').post('/syncDefaults', defaultsData).reply(200);

    api.defaults(defaultsData, function() {
      scope.done();
      done();
    });
  });

  it("should call lastRequest", function(done) {
    var lastRequestData = {data: "info"};

    var scope = nock('http://localhost:7001', { method: "POST", path: "/" }).get('/lastRequest').reply(204, lastRequestData);

    api.lastRequest("POST", "/", function(err, res) {
      expect(res.body).to.deep.eq(lastRequestData);
      scope.done();
      done();
    });
  });



});