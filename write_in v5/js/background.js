

var lastUtterance = '';
var speaking = false;
var globalUtteranceIndex = 0;

if (localStorage['lastVersionUsed'] != '1') {
  localStorage['lastVersionUsed'] = '1';
  chrome.tabs.create({
    url: chrome.extension.getURL('options.html')
  });
}

function speak(utterance) {
  if (speaking && utterance == lastUtterance) {
    chrome.tts.stop();
    return;
  }

  speaking = true;
  lastUtterance = utterance;
  globalUtteranceIndex++;
  var utteranceIndex = globalUtteranceIndex;

  chrome.browserAction.setIcon({path: 'rav19-active.png'});

  var rate = localStorage['rate'] || 1.0;
  var pitch = localStorage['pitch'] || 1.0;
  var volume = localStorage['volume'] || 1.0;
  var voice = localStorage['voice'];
  chrome.tts.speak(
      utterance,
      {voiceName: voice,
       rate: parseFloat(rate),
       pitch: parseFloat(pitch),
       volume: parseFloat(volume),
       onEvent: function(evt) {
         if (evt.type == 'end' ||
             evt.type == 'interrupted' ||
             evt.type == 'cancelled' ||
             evt.type == 'error') {
           if (utteranceIndex == globalUtteranceIndex) {
             speaking = false;
             chrome.browserAction.setIcon({path: 'rav19.png'});
           }
         }
       }
      });
}

function initBackground() {


  var defaultKeyString = getDefaultKeyString();
  var keyString = localStorage['speakKey'];
  if (keyString == undefined) {
    keyString = defaultKeyString;
    localStorage['speakKey'] = keyString;
  }
 

  chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
        if (request['init']) {
          sendResponse({'key': localStorage['speakKey']});
        } else if (request['speak']) {
          speak(request['speak']);
        }
      });

  chrome.browserAction.onClicked.addListener(
      function(activeTab) {
        var newURL = "index.html";
        chrome.tabs.create({ url: newURL });
      });
}

initBackground();
