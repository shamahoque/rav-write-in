/* Write In version 5
 - Single press(left/right/K/L) to read through each letter
 - Press hold (left/right/I/O) to hear audio of alphabets, pause at keyup
 - Enter to select
 - Down for review
 - Up for demo/example instructions(wait 4 seconds after asking to Try a feature)
 - Multiple speed rate (400, 500, 600, 700, 800) audio files.
 - System key repeat should be off.
 - Loops around when key pressed at end.

 - To quit the Instructions, press Q.
 
 Created by: Shama Hoque
 Last Modified by: Shama Hoque
*/


var keyStr;
var audioPosition;
var audio1Position;
var audioA="audio4.1";
var audioR="audio4.2";
var no=0; //equivalent to element id of each alphabet 
var num=1; // has values 1, 2, 3 ; used to keep track of forward/reverse audio positions based on left/right press
var keydown=false;
var pressHold =false;
var firstPress = true;
var quit = false; //set to true if user wants to quit the Instructions
var upPress = 0;
//Capture and Respond to all relevant key events
function initKeyEvents() {
   
    chrome.extension.onRequest.addListener(onExtensionMessage);
    chrome.extension.sendRequest({'init': true}, onExtensionMessage);
    
  
    //deal with keydown (start audio or handle single press)
    document.addEventListener('keydown', function(evt) {  
                              
        var audio=document.getElementById(audioA);
        var audio1=document.getElementById(audioR);
        keydown=true;
        keyStr = keyEventToString(evt);
                              console.log(keyStr);
           if(keyStr=='Tab'){
            window.location.replace("candidate/options.html");
           }
//on first key press after refresh, give introduction instructions
        if(keyStr=='Up'){
        
            giveDemoDirections(true);
            firstPress= false;
            num = 1;
            if(keyStr =='Up')
              upPress++;
            if(upPress >= 2){
              giveDemoDirections(false);
              upPress = 0;
            }

        }else{
          if(keyStr == 'Q'){ // Stop giving Instructions when Q is pressed
            quit = true;
            giveDemoDirections(false);
          }

        //Start back at A when A is pressed
        if(keyStr == 'A'){
            no=0;
        }
                              
        //fast forward for O and I
        if(keyStr == 'O'){
            if(num==3)
                audio.currentTime=audio.duration-audio1Position;
            audio.play();
            num=2;
        }
  
        if(keyStr == 'I'){
            if(num==2)
                audio1.currentTime=audio1.duration-audioPosition;
            audio1.play();
            num=3;
        }
                              
        //single step on L and K
        if(keyStr == 'L' || keyStr == 'K'){
            num=1;
            speakOnkey(keyStr);
            audio.currentTime=timePositionArray[no];
            audio1.currentTime=audio1.duration-timePositionArray[no]-0.723;
        }
                              
        //handle single press and hold press 
        if(keyStr == 'Right' || keyStr == 'Left'){
            num=1;
            pressHold=false;
            //200ms wait before hold press is registered
            if(keyStr == 'Right'|| keyStr == 'L'){
                setTimeout(function(){
                        if(keydown){
                            if(num==3)
                                audio.currentTime=audio.duration-audio1Position;
                                         //console.log("keyed");
                            audio.play();
                            num=2;
                            pressHold=true;
                         }
                  }, 200);
                              
              }
                
              if(keyStr == 'Left'|| keyStr == 'K'){
                  setTimeout(function(){
                          if(keydown){
                               if(num==2)
                                  audio1.currentTime=audio1.duration-audioPosition;
                               audio1.play();
                               num=3;
                               pressHold=true;
                            }
                    }, 200);
                              
                }
                              
                //single press on left/right
                if(!pressHold){
                    speakOnkey(keyStr);
                    audio.currentTime=timePositionArray[no];
                    audio1.currentTime=audio1.duration-timePositionArray[no]-0.723;
                    pressHold=false;
                 }
        }
        if(keyStr=='Down'){
            num=1;
            reviewTyped(keyStr);
        }
        if(keyStr=='Enter'){
            num=1;
            enterPressed(keyStr);
        }
        if(keyStr=='Delete'){
            num=1;
            deletePressed(keyStr);
        }
        
        
    }
        evt.stopPropagation();
        evt.preventDefault();
        return false;}, false);
    
    //deal with keyup (pause audio and sync)
    document.addEventListener('keyup', function(evt) {
        var audio=document.getElementById(audioA);
        var audio1=document.getElementById(audioR);
        keydown=false;

        if(num==2){ // pause forward audio and sync 
            audio.pause();
            audioPosition=audio.currentTime;
            printAlphabet(audioPosition);
            if(no!=30)
            speakSelection(no);
            num=1;
        }
        if(num==3){ // pause reverse audio and sync
            audio1.pause();
            audio1Position=audio1.currentTime;
            printAlphabet(audio1.duration-audio1Position-0.723);
            if(no!=30)
            speakSelection(no);
            num=1;
        }
                              
                              
        evt.stopPropagation();
        evt.preventDefault();
        return false;}, false);
    
    
}

/*Reads selected Alphabet by fetching element by id*/
function speakSelection(id) {
    var Rate =1.0;
    var focused = document.getElementById(id);
    var sel = window.getSelection();
    sel.removeAllRanges();
    var range = document.createRange();
    range.selectNode(focused);
    sel.addRange(range);
    var selectedText= focused.innerHTML;
    
    //Rate for Earcons
    if(id==1||id==7||id==13||id==20||id==26||id==29){
        Rate=1.0;
    }
    else //Rate of alphabets
        Rate=2.0;
    
    //Chrome TTS api to speak selected text
    chrome.tts.speak(
                     selectedText,
                     {voiceName: localStorage['voice'],
                     rate: parseFloat(Rate),
                     pitch: parseFloat(1.0),
                     volume: parseFloat(1.0)});
    
}




/*Single-press text to speech*/

function speakOnkey(keyStr){
    
    if (keyStr == 'Right' || keyStr == 'L') {
        if(no==30)//When audio ends at chime
            no=0;
    if(no==28){
            playEndChime();
      no=0;
        }
        speakSelection(++no);
    }
    if (keyStr == 'Left' || keyStr == 'K') {
        if(no==30)//When audio ends at chime
            no=29;
        if(no==1 || no==0 ){
            playEndChime();
            no=29;
        }
        speakSelection(--no);
    }
    
}
/*On Down button, start review of letters typed so far*/
function reviewTyped(keyStr){
    var enteredLetter;
    var typedLetters=document.getElementById("spell").innerHTML;
    
    if(keyStr == 'Down'&& no!=30){
        //var addLetter = spelledWord+" "+document.getElementById(no).innerHTML;
        
        
        chrome.tts.speak(
                         "Typed",
                         {voiceName: localStorage['voice'],
                         rate: parseFloat(2.0),
                         pitch: parseFloat(1.0),
                         volume: parseFloat(1.0)});
                              
        for(var i = 0; i < typedLetters.length; i++){
            enteredLetter = typedLetters.charAt(i);

            chrome.tts.speak(
                             enteredLetter,
                             {voiceName: localStorage['voice'],
                             rate: parseFloat(1.5),
                             pitch: parseFloat(0.3),
                             volume: parseFloat(1.0),
                             'enqueue': true});
        
        }
        
    }
    
}


/*Selection on enter press, printing selection, and reviewing letters */
function enterPressed(keyStr){
    var enteredLetters;
   
    var spelledWord=document.getElementById("spell").innerHTML;
    
    if(keyStr == 'Enter'&& no!=30){
          var selectedLetter = document.getElementById(no).innerHTML
        if (document.getElementById(no).innerHTML == "Space"){
            selectedLetter = " ";
        }
        if (document.getElementById(no).innerHTML == "Hyphen"){
            selectedLetter = "-";
        }
        
            enteredLetters = spelledWord + selectedLetter;
        
        document.getElementById("spell").innerHTML=enteredLetters;

            
        
        chrome.tts.speak(
                         "Selected " + document.getElementById(no).innerHTML,
                         {voiceName: localStorage['voice'],
                         rate: parseFloat(1.0),
                         pitch: parseFloat(1.0),
                         volume: parseFloat(1.0)});
        
    }
    
}

/*Delete last selection on delete press, and removing letter */
function deletePressed(keyStr){
    var deletedLetter;
    var spelledWord=document.getElementById("spell").innerHTML;
    
    if(keyStr == 'Delete'&& no!=30&& spelledWord!=''){
        var editedWord = spelledWord.slice(0,spelledWord.length-1);
        deletedLetter = "Deleted "+spelledWord.slice(spelledWord.length-1);
        document.getElementById("spell").innerHTML=editedWord;
        
        chrome.tts.speak(
                         deletedLetter,
                         {voiceName: localStorage['voice'],
                         rate: parseFloat(1.0),
                         pitch: parseFloat(1.0),
                         volume: parseFloat(1.0)});
    }
    
}

function playEndChime(){
    document.getElementById("tone").play();
}

/*Introduction instructions*/
function giveDemoDirections(startPress){
  var instructionDemo = document.getElementById("instructionsDemo"); 
  if(startPress){
    if(quit){
      instructionDemo.load();
      quit=false;
    }
  
    instructionDemo.play();

  instructionDemo.addEventListener('timeupdate', function(){
    console.log(instructionDemo.currentTime);
    if(instructionDemo.currentTime > 13.9 && instructionDemo.currentTime < 14.2)
      instructionDemo.pause();
    if(instructionDemo.currentTime > 23.2 && instructionDemo.currentTime < 23.5)
      instructionDemo.pause();
    if(instructionDemo.currentTime > 27.7 && instructionDemo.currentTime < 28.0)
      instructionDemo.pause();
    if(instructionDemo.currentTime > 31.2 && instructionDemo.currentTime < 31.5)
      instructionDemo.pause();
    if(instructionDemo.currentTime > 34.1 && instructionDemo.currentTime < 34.4)
      instructionDemo.pause();
    console.log(instructionDemo.paused);

    if(instructionDemo.paused && !instructionDemo.ended && !quit && upPress == 1){
      setTimeout(function(){
        instructionDemo.play();
      }, 5000);
    }
  });
  
 }else{

  instructionDemo.pause();
 }
}

/*Register event listeners (key and click)*/
function onExtensionMessage(request) {
    buttonEvents();
}

/*Changing audio using buttons*/
function buttonEvents(){
    //Audio Rate Buttons
    document.getElementById('b0').onclick=function(){ changeRate(0)};
    document.getElementById('b1').onclick=function(){ changeRate(1)};
    document.getElementById('b2').onclick=function(){ changeRate(2)};
    document.getElementById('b3').onclick=function(){ changeRate(3)};
    document.getElementById('b4').onclick=function(){ changeRate(4)};
    document.getElementById('b5').onclick=function(){ changeRate(5)};
    //Direction Option Buttons
    //document.getElementById('b6').onclick=function(){ demoDirections=true; document.getElementById("directionType").innerHTML="Demo";};
    //document.getElementById('b7').onclick=function(){ demoDirections=false; document.getElementById("directionType").innerHTML="Example";};
}




initKeyEvents();
