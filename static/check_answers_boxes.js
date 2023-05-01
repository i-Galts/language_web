// var exnames = [], excounts = [], exheadings = [];exnames[0] = 'bs5_containers';excounts[0] = '2';exheadings[0] = 'Containers';exnames[1] = 'bs5_typography';excounts[1] = '3';exheadings[1] = 'Typography';exActiveNo = 1;exnames[2] = 'bs5_colors';excounts[2] = '2';exheadings[2] = 'Colors';exnames[3] = 'bs5_images';excounts[3] = '4';exheadings[3] = 'Images';exnames[4] = 'bs5_tables';excounts[4] = '5';exheadings[4] = 'Tables';exnames[5] = 'bs5_alerts';excounts[5] = '3';exheadings[5] = 'Alerts';exnames[6] = 'bs5_buttons';excounts[6] = '7';exheadings[6] = 'Buttons';exnames[7] = 'bs5_badges';excounts[7] = '3';exheadings[7] = 'Badges';exnames[8] = 'bs5_progressbars';excounts[8] = '4';exheadings[8] = 'Progress Bar';exnames[9] = 'bs5_spinners';excounts[9] = '2';exheadings[9] = 'Spinners';exnames[10] = 'bs5_pagination';excounts[10] = '3';exheadings[10] = 'Pagination';exnames[11] = 'bs5_list_groups';excounts[11] = '2';exheadings[11] = 'List Groups';exnames[12] = 'bs5_cards';excounts[12] = '2';exheadings[12] = 'Cards';exnames[13] = 'bs5_dropdowns';excounts[13] = '1';exheadings[13] = 'Dropdowns';exnames[14] = 'bs5_collapse';excounts[14] = '1';exheadings[14] = 'Collapse';exnames[15] = 'bs5_navs';excounts[15] = '3';exheadings[15] = 'Navs';exnames[16] = 'bs5_navbars';excounts[16] = '3';exheadings[16] = 'Navbars';
 var formanswers = [];
 var editable = false
formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');formanswers.push('');var originalassignmentcode;
function initAssignment() {
  var x, y, txt, i, newtxt, c, cc, n, numberofchar, j, inputs, templates, l, inputcount = -1;
  document.getElementById("assignmenttext").style.display = "block";
  x = document.getElementById("assignmentcode");
  x.style.display = "none";
  txt = x.innerHTML;
  originalassignmentcode = txt;
  if (x.getAttribute("contenteditable") == "true") {
    editable = true;
    document.getElementById("assignmentcontainer").innerHTML = txt;
    document.getElementById("assignmentcontainer").setAttribute("contenteditable", "true");
  } else {
    newtxt = "";
    for (i = 0; i < txt.length; i++) {
      c = txt[i]
      numberofchar = 0;
      if (c == "@") {
        inputcount++
        if (txt[i + 1] == "(" ) {
          startpos = i + 2;
          endpos = txt.indexOf(")", startpos);
          n = txt.substring(startpos, endpos)
          if (!isNaN(n)) {numberofchar = n;}
        }
        if (numberofchar > 0) {
          i = endpos;
          c = "<pre class='meassureInputWidth'>"
          for (j = 0; j < numberofchar; j++) {
            c += " ";
          }
          c += "</pre>"
          c += "<input spellcheck='false' class='editablesection' onkeypress='checkKey(event)' oninput='writinginput(this, " + inputcount + ")' maxlength='" + numberofchar + "'>"
        }
      }
      newtxt += c;
    }
    document.getElementById("assignmentcontainer").innerHTML = newtxt;
    inputs = document.getElementsByClassName("editablesection");
    templates = document.getElementsByClassName("meassureInputWidth");
    for (i = 0; i < inputs.length; i++) {
      inputs[i].style.width = ((templates[i].offsetWidth) + 1) + "px";
      templates[i].style.display = 'none';
      templates[i].innerHTML = "w3exercise_input_no_" + i;
      cc = formanswers[i];
      cc = cc.replace(/&apos;/g, "'");
      cc = cc.replace(/&quot;/g, '"');
      inputs[i].value = cc;
    }
  }
  //window.setTimeout(function () {inputs[0].focus()}, 800);
}

function checkKey(event) {
  if (event.keyCode == 13) {
    checkassignmentcode();
    uic_r_p();  }
}

function checkassignmentcode() {
  var check, correct, correct2, inputs, i, moreCorrect = true, cc, result = "", score_arr = [];
  check = document.getElementById("assignmentcontainer").textContent;
  inputs = document.getElementsByClassName("editablesection");
  for (i = 0; i < inputs.length; i++) {
    check = check.replace("w3exercise_input_no_" + i, inputs[i].value);
  }
  i = 1;
  while (moreCorrect) {
    cc = (i == 1) ? "" : i;
    if (document.getElementById("correctcode" + cc)) {
      correct = document.getElementById("correctcode" + cc).textContent;
      if (editable == true) {
        if (check == correct) {
          result = "correct";
          break;
        } else if ("exercise_bs5_typography1" == "exercise_ifelse9" && w3_trim(check) == w3_trim(correct)) {
          result = "correct";
          break;
        }
      } else {
        if (w3_trim(check) == w3_trim(correct)) {
          result = "correct";
          break;
        }
      }
    }
    i++;
    moreCorrect = (document.getElementById("correctcode" + cc));
  }
  if (result == "correct") {
    document.getElementById("assignmentCorrect").style.display = "block";
  } else {
    document.getElementById("assignmentNotCorrect").style.display = "block";
    document.getElementById("answerbutton").innerHTML = "Try Again";
    document.getElementById("answerbutton").addEventListener("click", closeNotCorrect);
    document.getElementById("answerbutton").focus();
  }
}


function writinginput(obj, n) {
  var x;
  document.getElementById("assignmentCorrect").style.display = "none";
  document.getElementById("assignmentNotCorrect").style.display = "none";
 if (obj.value.length == obj.maxLength) {
   x = document.getElementsByClassName("editablesection");
   if ((n + 1) > (x.length - 1)) {
     document.getElementById("answerbutton").focus();
   } else {
     x[n + 1].focus();
   }
 }
}

function closeNotCorrect() {
  document.getElementById("answerbutton").removeEventListener("click", closeNotCorrect);
  document.getElementById("answerbutton").innerHTML = "Submit Answer &#10095;";
  document.getElementById("assignmentNotCorrect").style.display = "none";    
  giveFocus();
}

initAssignment();

function giveFocus() {
  if (editable && (typeof document.createRange == "function")){
    var el = document.getElementById("assignmentcontainer");
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[0], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    document.getElementsByClassName("editablesection")[0].focus();
  }
}
if (window.addEventListener) {              
  window.addEventListener("load", giveFocus);
} else if (window.attachEvent) {                 
  window.attachEvent("onload", giveFocus);
}