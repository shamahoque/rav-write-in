/* Write In version 5
 - Single press(left/right/K/L) to read through each letter
 - Press hold (left/right/I/O) to hear audio of alphabets, pause at keyup
 - Multiple speed rate (400, 500, 600, 700, 800) audio files.
 - System key repeat should be off.
 - Loops around when key pressed at end.
 
 Created by: Shama Hoque
 Last Modified by: Shama Hoque
 */


//On page load have A highlighted 
function load() {
  var selectedElement = document.getElementById('1');
  var sel = window.getSelection();
  sel.removeAllRanges();
  var range = document.createRange();
  range.selectNode(selectedElement);
  sel.addRange(range);

  }

document.addEventListener('DOMContentLoaded', load);
