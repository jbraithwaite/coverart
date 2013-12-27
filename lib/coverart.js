var request = require('./request');

var VERSION = '0.0.1';
var _http = 'http://';
var _host = 'coverartarchive.org';
var _path = '/';
var _userAgent = 'node-coverart/' + VERSION + ' ( https://github.com/jbraithwaite/coverart/ )';
var _sizeSmall = 250;
var _sizeLarge = 500;

/**
 * Initialize CoverArt
 *
 * The configuration:
 * - userAgent: User agent sent in the request
 *
 * @param {Object} options The application configuration
 */
function BaseCoverArt(options) {

  options = options || {};

  this.userAgent = options.userAgent || _userAgent;
  this.host = _host;
  this.basePath = _path;
  this.http = _http;
}

BaseCoverArt.prototype.request = request;

/**
 * NodeBrainsLookup
 *
 * http://coverart.org/doc/Development/XML_Web_Service/Version_2/#Lookups
 *
 * @param {String} type The type of search (e.g. 'artist', 'releasegroup', 'release', 'recording', etc)
 * @param {String} mbid The id for the type
 * @param {Object} data The lookup criteria
 * @param {Function} callback function(err, response)
 */
BaseCoverArt.prototype._lookup = function(type, mbid, data, callback){

  data = data || {};

  // You are allowed to not include data
  if (typeof data == 'function'){
    callback = data;
    data = {};
  }

  if (!mbid) return callback({error: 'Missing mbid'});

  var piece = '';
  var size = '';

  data = data || {};

  if (data.hasOwnProperty('piece')){
    piece = '/' + data.piece;
  }

  if (piece && data.hasOwnProperty('size')){

    if (data.size == 'small') data.size = _sizeSmall;
    else if (data.size == 'large') data.size = _sizeLarge;

    size = '-' + data.size;
  }

  // Set the path
  var path = this.basePath + type + '/' + mbid + piece + size;

  var url = this.http + this.host + path;

  this.request({
    url: url,
    userAgent: this.userAgent
  }, callback);
};


/**
 * Release Group Lookup
 *
 * @param  {String} mbid MusicBrainz ID
 * @param  {Object} data Filtering and subqueries information
 * @param  {Function} callback function(err, response)
 */
BaseCoverArt.prototype.releaseGroup = function(mbid, data, callback){
  this._lookup('release-group', mbid, data, callback);
};

/**
 * Release Lookup
 *
 * @param  {String} mbid MusicBrainz ID
 * @param  {Object} data Filtering and subqueries information
 * @param  {Function} callback function(err, response)
 */
BaseCoverArt.prototype.release = function(mbid, data, callback){
  this._lookup('release', mbid, data, callback);
};


module.exports = BaseCoverArt;
