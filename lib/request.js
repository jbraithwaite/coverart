var request = require('request');


/**
 * Request
 *
 *
 * config {url: 'http://example.com', userAgent : 'my-awesome-app/0.0.1 (myawesomeapp.com)'}
 * @param  {Object} config
 * @param  {Function} callback
 */
module.exports = function(config, callback){

  var options = {
    url: config.url,
    path: config.path,
    headers: {
      'user-agent': config.userAgent
    },
    encoding: 'binary'
  };

  // If you are looking to debug, this would be a great place to put:
  // console.log(config.url);

  request.get(options, function(err, res, body){

    if (err) return callback({error: err});

    // Not authorized
    if (res.statusCode == 400) return callback({error: 'Bad Request', statusCode:res.statusCode});

    // A generic server error
    else if (res.statusCode == 500) return callback({error: 'Server side issue', statusCode:res.statusCode});

    // A generic server error
    else if (res.statusCode == 501) return callback({error: 'Method not supported', statusCode:res.statusCode});

    // We are being rate limited
    else if (res.statusCode == 503) return callback({error: 'Rate limited', statusCode:res.statusCode});

    // It wasn't found
    else if (res.statusCode == 404) return callback({error: 'Not Found', statusCode:res.statusCode});

    // Some other reason
    else if (res.statusCode != 200 && res.statusCode != 400) return callback({error: 'Well that didn\'t work...', statusCode:res.statusCode});


    var contentType = res.headers['content-type'];

    // res.setEncoding('binary');
    if (contentType.indexOf('image') !== -1) {

      res.setEncoding('binary');

      var extension = '.'+contentType.replace('image/','');

      return callback(null, {contentType: contentType, extension: extension, image: res.body});

      // return  callback(null, {contentType: contentType, image: data});
    } else if (contentType.indexOf('json') !== -1 || contentType.indexOf('octet-stream') !== -1) {

      try {
        data = JSON.parse(body);
      } catch (e) {
        return callback({error:'Could not parse response as JSON'});
      }
      return callback(null, data);
    } else {
      return callback({error: 'What is this: '+ contentType});
    }

  });
};
