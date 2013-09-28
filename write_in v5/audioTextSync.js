/* Write In version 5
 - Single press(left/right/K/L) to read through each letter
 - Press hold (left/right/I/O) to hear audio of alphabets, pause at keyup
 - Multiple speed rate (400, 500, 600, 700, 800) audio files.
 - System key repeat should be off.
 - Loops around when key pressed at end.
 
 Created by: Shama Hoque
 Last Modified by: Shama Hoque
 */


var x=1.25; //to calculate relative positions of alphabets in each audio file

/*initial values for time position of each alphabet in audio with rate 500*/
var timePositionArray=new Array();
    timePositionArray[1]=x*0;
    timePositionArray[2]=x*0.30;
    timePositionArray[3]=x*0.55;
    timePositionArray[4]=x*0.61;
    timePositionArray[5]=x*0.67;
    timePositionArray[6]=x*0.79;
    timePositionArray[7]=x*1.08;
    timePositionArray[8]=x*1.37;
    timePositionArray[9]=x*1.58;
    timePositionArray[10]=x*1.62;
    timePositionArray[11]=x*1.74;
    timePositionArray[12]=x*1.84;
    timePositionArray[13]=x*2.12;
    timePositionArray[14]=x*2.30;
    timePositionArray[15]=x*2.55;
    timePositionArray[16]=x*2.63;
    timePositionArray[17]=x*2.73;
    timePositionArray[18]=x*2.81;
    timePositionArray[19]=x*2.89;
    timePositionArray[20]=x*3.05;
    timePositionArray[21]=x*3.47;
    timePositionArray[22]=x*3.64;
    timePositionArray[23]=x*3.69;
    timePositionArray[24]=x*3.87;
    timePositionArray[25]=x*4.00;
    timePositionArray[26]=x*4.18;
    timePositionArray[27]=x*4.57;
    timePositionArray[28]=x*5.09;


//Change audio based on rate buttons pressed
function changeRate(option){
    
    if(option=='0'){
        audioA="audio2.1";
        audioR="audio2.2";
        x=2.3;
        document.getElementById("currentRate").innerHTML="200";
    }
    
    if(option=='1'){
        audioA="audio4.1";
        audioR="audio4.2";
        x=1.25;
        document.getElementById("currentRate").innerHTML="400";
    }
    if(option=='2'){
        audioA="audio5.1";
        audioR="audio5.2";
        x=1;
        document.getElementById("currentRate").innerHTML="500";
    }
    if(option=='3'){
        audioA="audio6.1";
        audioR="audio6.2";
        x=0.83;
        document.getElementById("currentRate").innerHTML="600";
    }
    if(option=='4'){
        audioA="audio7.1";
        audioR="audio7.2";
        x=0.72;
        document.getElementById("currentRate").innerHTML="700";
    }
    if(option=='5'){
        audioA="audio8.1";
        audioR="audio8.2";
        x=0.625;
        document.getElementById("currentRate").innerHTML="800";
    }
    /*Audio time position of each alphabet relative to Rate of each audio (x)*/
    timePositionArray[1]=x*0;
    timePositionArray[2]=x*0.30;
    timePositionArray[3]=x*0.55;
    timePositionArray[4]=x*0.61;
    timePositionArray[5]=x*0.67;
    timePositionArray[6]=x*0.79;
    timePositionArray[7]=x*1.08;
    timePositionArray[8]=x*1.37;
    timePositionArray[9]=x*1.58;
    timePositionArray[10]=x*1.62;
    timePositionArray[11]=x*1.74;
    timePositionArray[12]=x*1.84;
    timePositionArray[13]=x*2.12;
    timePositionArray[14]=x*2.30;
    timePositionArray[15]=x*2.55;
    timePositionArray[16]=x*2.63;
    timePositionArray[17]=x*2.73;
    timePositionArray[18]=x*2.81;
    timePositionArray[19]=x*2.89;
    timePositionArray[20]=x*3.05;
    timePositionArray[21]=x*3.47;
    timePositionArray[22]=x*3.64;
    timePositionArray[23]=x*3.69;
    timePositionArray[24]=x*3.87;
    timePositionArray[25]=x*4.00;
    timePositionArray[26]=x*4.18;
    timePositionArray[27]=x*4.57;
    timePositionArray[28]=x*5.09;
}



/*Audio to text-to-speech syncing (done manually by matching time positions)*/

function printAlphabet(time){
    if(time>=x*0&&time<=x*0.29||time<=x*0){
        no=1;
        console.log("A"+no);
    }
    if(time>x*0.29&&time<=x*0.40){
        no=2;
        console.log("B"+no);
    }
    if(time>x*0.40&&time<=x*0.46){
        no=3;
        console.log("C"+no);
    }
    if(time>x*0.46&&time<=x*0.57){
        no=4;
        console.log("D"+no);
    }
    if(time>x*0.57&&time<=x*0.70){
        no=5;
        console.log("E"+no);
    }
    if(time>x*0.70&&time<=x*1.00){
        no=6;
        console.log("F"+no);
    }
    if(time>x*1.00&&time<=x*1.36){
        no=7;
        console.log("G"+no);
    }
    if(time>x*1.36&&time<=x*1.49){
        no=8;
        console.log("H"+no);
    }
    if(time>x*1.49&&time<=x*1.54){
        no=9;
        console.log("I"+no);
    }
    if(time>x*1.54&&time<=x*1.63){
        no=10;
        console.log("J"+no);
    }
    if(time>x*1.63&&time<=x*1.73){
        no=11;
        console.log("K"+no);
    }
    if(time>x*1.73&&time<=x*2.00){
        no=12;
        console.log("L"+no);
    }
    if(time>x*2.00&&time<=x*2.25){
        no=13;
        console.log("M"+no);
    }
    if(time>x*2.25&&time<=x*2.44){
        no=14;
        console.log("N"+no);
    }
    if(time>x*2.44&&time<=x*2.54){
        no=15;
        console.log("O"+no);
    }
    if(time>x*2.54&&time<=x*2.62){
        no=16;
        console.log("P"+no);
    }
    if(time>x*2.62&&time<=x*2.71){
        no=17;
        console.log("Q"+no);
    }
    if(time>x*2.71&&time<=x*2.81){
        no=18;
        console.log("R"+no);
    }
    if(time>x*2.81&&time<=x*3.04){
        no=19;
        console.log("S"+no);
    }
    if(time>x*3.04&&time<=x*3.46){
        no=20;
        console.log("T"+no);
    }
    if(time>x*3.46&&time<=x*3.52){
        no=21;
        console.log("U"+no);
    }
    if(time>x*3.52&&time<=x*3.63){
        no=22;
        console.log("V"+no);
    }
    if(time>x*3.63&&time<=x*3.74){
        no=23;
        console.log("W"+no);
    }
    if(time>x*3.74&&time<=x*3.88){
        no=24;
        console.log("X"+no);
    }
    if(time>x*3.88&&time<=x*4.17){
        no=25;
        console.log("Y"+no);
    }
    if(time>x*4.17&&time<=x*4.56){
        no=26;
        console.log("Z"+no);
    }
    if(time>x*4.56&&time<=x*5.00){
        no=27;
        console.log("SPACE"+no);
    }
    if(time>=x*5.00&&time<=x*5.80){
        no=28;
        console.log("-"+no);
    }
    if(time>x*5.80){
        no=30;
        console.log("end"+no);
    }
    
    
}





