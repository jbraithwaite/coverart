# Cover Art for Node

[![Build Status](https://secure.travis-ci.org/jbraithwaite/coverart.png?bracah=master)](http://travis-ci.org/jbraithwaite/coverart) [![Total views](https://sourcegraph.com/api/repos/github.com/jbraithwaite/coverart/counters/views.png)](https://sourcegraph.com/github.com/jbraithwaite/coverart)

Cover Art allows you to fetch album artwork from [the Cover Art Archive](http://coverartarchive.org/) using [their API](http://musicbrainz.org/doc/Cover_Art_Archive/API)

### Example Usage

It's always a good idea to give your client a unique User Agent.

```javascript
var CA = require('coverart');

// Initialize Cover Art
var ca = new CA({userAgent:'my-awesome-app/0.0.1 ( http://my-awesome-app.com )'});
```

### Resources

There are two main resources: `release` and `release group`

### Release

Fetches a JSON listing of available cover art for a MusicBrainz release.

```javascript
ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', function(err, response){
    console.log(response);
});
```

#### Fetching a specific piece of album art

With the option `piece` set to `front`, fetch the image that is most suitable to be called the "front" of a release. `piece` also accepts `back` and an `image id`

```javascript
ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'front'}, function(err, response){
    console.log(response);
    //  {
    //      "contentType": "image/jpeg",
    //      "extension": ".jpeg",
    //     "image": ... binary image ...
    //  }
});
```

#### Specifiying a size

Album art thumbnails comes in two sizes: `small` (up to 250 px) and `large` (up to 500 px). In the options you can either specifiy the size by the string or by pixels

```javascript
ca.release('660c1995-c6a0-4c90-b158-2f2d9caff78f', {piece: 'back', size: 'small'}, function(err, response){
    console.log(response);
});
```

### Release Group

Fetches a JSON listing of available cover art for a MusicBrainz `release group`, as well as the url for the specific release from which the art was sourced.

```javascript
ca.releaseGroup('02f79295-21e1-34cc-82f2-63219eec4f0a' ,function(err, response){
    console.log(response);
    //  {
    //      "images": [
    //          {
    //              "types": [
    //                  "Front"
    //              ],
    //              "front": true,
    //              "back": false,
    //              "edit": 22995833,
    //              "image": "http://coverartarchive.org/release/472168df-be3a-44ee-b31d-393155f3366d/4686417696.jpg",
    //              "comment": "",
    //              "approved": true,
    //              "thumbnails": {
    //                  "large": "http://coverartarchive.org/release/472168df-be3a-44ee-b31d-393155f3366d/4686417696-500.jpg",
    //                  "small": "http://coverartarchive.org/release/472168df-be3a-44ee-b31d-393155f3366d/4686417696-250.jpg"
    //              },
    //              "id": "4686417696"
    //          }
    //      ],
    //      "release": "http://musicbrainz.org/release/472168df-be3a-44ee-b31d-393155f3366d"
    //  }
});
```
