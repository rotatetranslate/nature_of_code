var video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  setInterval(function() {
    return saveFrames('pic', 'png', 1, 1, function(data) {
      return sendImage(data)
    });
  }, 3001);
}


function draw() {
  image(video, (windowWidth - video.width)/2, (windowHeight - video.height)/2);
}

function sendImage(data) {
  var req = new Request('https://api.projectoxford.ai/emotion/v1.0/recognize', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '*'
    }),
    body: makeBlob(data[0].imageData)
  });

  return fetch(req).then(res => {
    return res.json();
  }).then(j => {
    console.log(j);
  });
}

// ty stackoverflow
// http://stackoverflow.com/questions/34047648/how-to-post-an-image-in-base64-encoding-via-ajax/34064793#34064793
function makeBlob(dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
