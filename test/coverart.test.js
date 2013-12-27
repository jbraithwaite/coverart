var CA = require('../lib/coverart');

// Replace the CA.request with our own function
// Consider adding two additional test suites
// 1) Make a few actual network requests
// 2) Uses Simon (or something similar) to fake requests
CA.prototype.request = function(config, callback){
  // It returns no errors and calls back with the path
  callback(null, config.url);
};


var assert = require("assert");

describe('Cover Art', function(){

  // Describe the constructor
  describe('Constructor', function(){

    describe('Defaults', function(){
      it('host', function(){
        var ca = new CA();
        assert.equal(ca.host, 'coverartarchive.org');
      });

      it('path', function(){
        var ca = new CA();
        assert.equal(ca.basePath, '/');
      });
    });

    it('Can set User Agent', function(){
      var ca = new CA({userAgent:'my-app/0.0.1 ( http://myapp.com )'});
      assert.equal(ca.userAgent, 'my-app/0.0.1 ( http://myapp.com )');
    });

  });

  // Release
  describe('Release by MBID', function(){

    it('... and that\'s it', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f');
      });
    });

    it('... and piece front', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'front'}, function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f/front');
      });
    });

    it('... and piece back', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'back'}, function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f/back');
      });
    });

    it('... and piece ID', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 5233922017},function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f/5233922017');
      });
    });

    it('... and piece front and size 250', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'front', size: 250},function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f/front-250');
      });
    });

    it('... and piece back and size 500', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'back', size: 500},function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f/back-500');
      });
    });

    it('... and piece front and size small', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'front', size: 'small'},function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f/front-250');
      });
    });

    it('... and piece front and size large', function(){
      var ca = new CA();

      ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'front', size: 'large'},function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release/660c1995-c6a0-4c90-b158-2f2d9caff78f/front-500');
      });
    });
  });

  // Release Group
  describe('Release Group by MBID', function(){

    it('...', function(){
      var ca = new CA();

      ca.releaseGroup('02f79295-21e1-34cc-82f2-63219eec4f0a', function(err, path){
        assert.equal(err, null);
        assert.equal(path, 'http://coverartarchive.org/release-group/02f79295-21e1-34cc-82f2-63219eec4f0a');
      });
    });
  });

});
