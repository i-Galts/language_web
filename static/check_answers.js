 function checkCode(jsonObj) {
        var func, cc, i, l, errs = [], bptxt = "", feilmargin = 0, score_arr = [];
        document.getElementById("codeCheckWarningText").innerHTML = "";
        document.getElementById("codeCheckWarning").style.display = "none";
        document.getElementById("codeCheckCorrect").style.display = "none";
        if (typeof jsonObj == 'object') {
            checkTag(jsonObj.tags, document.getElementById("iframeResult").contentWindow.document, "tagname");
            checkTag(jsonObj.tagswithclass, document.getElementById("iframeResult").contentWindow.document, "classname");
            checkTag(jsonObj.tagsbyqueryselector, document.getElementById("iframeResult").contentWindow.document, "queryselector");        
            checkStyle(jsonObj.styles, document.getElementById("iframeResult").contentWindow.document);        
            func = jsonObj.functions;
            l = (func ? func.length : 0);
            for (i = 0; i < l; i++) {
                if (func[i].name) {
                    cc = window[func[i].name](document.getElementById("textareaCode").value);
                    if (!cc) {
                        errs.push(func[i].errname);
                    }
                }
            }
        }
        for (i = 0; i < errs.length; i++) {
            document.getElementById("codeCheckWarning").style.display = "block";    
            document.getElementById("codeCheckWarningText").innerHTML += errs[i] + "<br>";
        }
        if (errs.length == 0) {
            if (jsonObj.alsorequired) {
                checkCode(jsonObj.alsorequired);
            } else {
                answers[exActiveNo].splice((exNo-1), 1, 1);
                setAnswerObj("w3exerciseanswers_" + storageBlip + exnames[exActiveNo], answers[exActiveNo].toString(), false);
                score_arr = checkCompletedExercises();
                document.getElementById("codeCheckCorrect").style.display = "block";
            }
        }
        function checkTag(elmnt, parent, collectiontype) {
            var tag, tagname, method, container, a, b, func, tag, attr, tagsinresult, cc, i, ii, iii, l, ll, lll, regexp, errortxt, errorintxt;
            tag = elmnt;
            container = parent;   
            l = (tag ? tag.length : 0);        
            for (i = 0; i < l; i++) {
                if (tag[i].name) {
                    tagname = tag[i].name;
                    if (tagname.substr(0,1) == "*") {
                        method = "ALL";
                        tagname = tagname.substr(1);
                    }
                    tagsinresult = getElements(tagname, container, collectiontype);
                    ll = (tagsinresult ? tagsinresult.length : 0);
                    if (ll == 0) {
                        errs.push(tag[i].errname);
                        continue;
                    }
                    if (tag[i].count) {
                        if (ll < tag[i].count) {
                            errs.push(tag[i].errname);
                            continue;
                        }
                    }
                    errortxt = (tag[i].errvalue ? tag[i].errvalue : "");
                    errorintxt = (tag[i].errinvalue ? tag[i].errinvalue : "");
                    for (ii = 0; ii < ll; ii++) {
                        if (method == "ALL") {
                            errortxt = (tag[i].errvalue ? tag[i].errvalue : "");
                            errorintxt = (tag[i].errinvalue ? tag[i].errinvalue : "");                        
                        }
                        if (tag[i].value) {
                            if (compare("TAG", tagsinresult[ii], tagname, tag[i].value, tagsinresult[ii].innerHTML)) {
                                errortxt = "";
                            }
                        }
                        if (tag[i].invalue) {
                            if (compare("TAG", tagsinresult[ii], tagname, tag[i].invalue, tagsinresult[ii].innerHTML, "IN")) {
                                errorintxt = "";
                            }
                        }
                        checkTag(tag[i].tags, tagsinresult[ii]);
                        if (method == "ALL") {
                            if (errortxt != "") {
                                errs.push(errortxt);
                                errortxt = "";
                            }
                            if (errorintxt != "") {
                                errs.push(errorintxt);
                                errorintxt = "";
                            }
                        } else {
                            if (errortxt == "" && errorintxt == "") {break;}
                        }
                    }
                    if (errortxt != "") {errs.push(errortxt); }
                    if (errorintxt != "") {errs.push(errorintxt); }                
                    attr = tag[i].attr;
                    lll = (attr ? attr.length : 0);
                    for (iii = 0; iii < lll; iii++) {
                        errortxt = attr[iii].errname;
                        for (ii = 0; ii < ll; ii++) {
                            if (method == "ALL") {
                                errortxt = attr[iii].errname;
                            }
                            if (tagsinresult[ii].hasAttribute(attr[iii].name)) {
                                errortxt = "";
                            }
                            if (method == "ALL") {
                                if (errortxt != "") {
                                    errs.push(errortxt);
                                    errortxt = "";
                                }
                            } else {
                                if (errortxt == "") {break;}
                            }
                        }
                        if (errortxt != "") {errs.push(errortxt);}
                        if (attr[iii].value) {
                            errortxt = attr[iii].errvalue;
                            for (ii = 0; ii < ll; ii++) {
                                if (method == "ALL") {
                                    errortxt = attr[iii].errvalue;
                                }
                                if (tagsinresult[ii].hasAttribute(attr[iii].name)) {
                                    if (compare("TAG", tagsinresult[ii], attr[iii].name, attr[iii].value, tagsinresult[ii].getAttribute(attr[iii].name))) {
                                        errortxt = "";
                                    }
                                }
                                if (method == "ALL") {
                                    if (errortxt != "") {
                                        errs.push(errortxt);
                                        errortxt = "";
                                    }
                                } else {
                                    if (errortxt == "") {break;}
                                }
                            }
                           if (errortxt != "") {errs.push(errortxt); }
                        }
                        if (attr[iii].invalue) {
                            errortxt = attr[iii].errinvalue;
                            for (ii = 0; ii < ll; ii++) {
                                if (method == "ALL") {
                                    errortxt = attr[iii].errinvalue;
                                }
                                if (tagsinresult[ii].hasAttribute(attr[iii].name)) {
                                    if (compare("TAG", tagsinresult[ii], attr[iii].name, attr[iii].invalue, tagsinresult[ii].getAttribute(attr[iii].name), "IN")) {
                                        errortxt = "";
                                    }
                                }
                                if (method == "ALL") {
                                    if (errortxt != "") {
                                        errs.push(errortxt);
                                        errortxt = "";
                                    }
                                } else {
                                    if (errortxt == "") {break;}
                                }
                            }
                            if (errortxt != "") {errs.push(errortxt); }
                        }
                    }
                    css = tag[i].css;
                    lll = (css ? css.length : 0);
                    for (iii = 0; iii < lll; iii++) {
                        for (ii = 0; ii < ll; ii++) {
                            errortxt = "No " + css[iii].style + " property present for the " + tagsinresult[ii].tagName + " element";
                         // if (css[iii].style == "margin" && css[iii].value == "auto") {
                         //     if (w3_getStyleValue(tagsinresult[ii], "margin-left").replace("px", "") > 0 && (w3_getStyleValue(tagsinresult[ii], "margin-left") == w3_getStyleValue(tagsinresult[ii], "margin-right"))) {
                         //         errortxt = "";
                         //     }
                         // }
                            style = w3_getStyleValue(tagsinresult[ii], css[iii].style);
                            if (style) {
                                errortxt = ""
                            }
                            if (method == "ALL") {
                                if (errortxt != "") {
                                    errs.push(errortxt);
                                    errortxt = "";
                                }
                            } else {
                                if (errortxt == "") {break;}
                            }
                        }
                        if (errortxt != "") {errs.push(errortxt); }                    
                        if (css[iii].value) {
                            errortxt = (css[iii].errvalue ? css[iii].errvalue : "");
                            for (ii = 0; ii < ll; ii++) {
                                if (method == "ALL") {
                                    errortxt = (css[iii].errvalue ? css[iii].errvalue : "");
                                }
                                style = w3_getStyleValue(tagsinresult[ii], css[iii].style);
                                if (compare("STYLE", tagsinresult[ii], css[iii].style, css[iii].value, style)) {
                                    errortxt = "";  
                      
                                }
                                if (method == "ALL") {
                                    if (errortxt != "") {
                                        errs.push(errortxt);
                                        errortxt = "";
                                    }
                                } else {
                                    if (errortxt == "") {break;}
                                }
                            }
                            if (errortxt != "") {errs.push(errortxt); }                    
                        } 
    
                        if (css[iii].invalue) {
                            errortxt = (css[iii].errinvalue ? css[iii].errinvalue : "");
                            for (ii = 0; ii < ll; ii++) {
                                if (method == "ALL") {
                                    errortxt = (css[iii].errinvalue ? css[iii].errinvalue : "");
                                }
                                style = w3_getStyleValue(tagsinresult[ii], css[iii].style);
                                if (compare("STYLE", tagsinresult[ii], css[iii].style, css[iii].invalue, style, "IN")) {
                                    errortxt = "";                    
                                }
                                if (method == "ALL") {
                                    if (errortxt != "") {
                                        errs.push(errortxt);
                                        errortxt = "";
                                    }
                                } else {
                                    if (errortxt == "") {break;}
                                }
                            }
                            if (errortxt != "") {errs.push(errortxt); }                    
                        } 
                    }
                }
                if (tag[i].order) {
                    if (checkOrder(tag[i].order, container) == -1) {
                        errs.push(tag[i].errorder);
                    }
                }
            }
        }
        function checkStyle(elmnt, parent) {
            var tag, a, b, container, stylesheets, ruls, rules = [], i, ii, iii, iiii, l, ll, lll, llll, j, jj, errortxt, errstyletxt, errvaluetxt, cc, ccArr = [], ccArr2 = [], nn;
            tag = elmnt;
            container = parent;   
            l = (tag ? tag.length : 0);
            for (i = 0; i < l; i++) {
                stylesheets = container.styleSheets;
                ll = stylesheets.length;
                if (tag[i].selector) {
                    errortxt = (tag[i].errselector ? tag[i].errselector : "");
                    errstyletxt = "";
                    errvaluetxt = "";
                    errinvaluetxt = "";                
                    for (ii = 0; ii < ll; ii++) {
                        ruls = stylesheets[ii].cssRules;
                        for (iii = 0; iii < ruls.length; iii++) {
                            rules.push(ruls[iii])
                        }
                        for (iii = 0; iii < rules.length; iii++) {
                            if ((rules[iii].type == 1 && rules[iii].selectorText.indexOf(tag[i].selector.toLowerCase()) > -1)
                             || (rules[iii].type == 5 && tag[i].selector.toLowerCase() == "@font-face")
                             || (rules[iii].type == 7 && tag[i].selector.toLowerCase() == "@keyframes")
                             || (rules[iii].type == 8 && tag[i].selector.toLowerCase() == rules[iii].keyText)) {
                                errortxt = "";
                                if (rules[iii].type == 7) {
                                    for (iiii = 0; iiii < rules[iii].cssRules.length; iiii++) {
                                        rules.push(rules[iii].cssRules[iiii]);
                                    }
                                    continue;
                                }
                                styles = rules[iii].style;
                                llll = styles.length;
                                errstyletxt = (tag[i].errstyle ? tag[i].errstyle : "");                
                                for (iiii = 0; iiii < llll; iiii++) {
                                    ss = styles[iiii];
                                    //console.log(tag[i].style + " ### " + ss);
                                    if (ss == "text-decoration-color" || ss == "text-decoration-line" || ss == "moz-text-decoration-color" || ss == "moz-text-decoration-line" || ss == "moz-text-blink") {
                                        continue;
                                    }
                                    if (ss == "text-decoration-style" || ss == "moz-text-decoration-style") {ss = "text-decoration"; }
                                    if (compare("", "", "", tag[i].style, ss)) {
                                        errstyletxt = "";
                                        errvaluetxt = (tag[i].errvalue ? tag[i].errvalue : "");
                                        errinvaluetxt = (tag[i].errinvalue ? tag[i].errinvalue : "");                                    
                                        /*
                                        cc = styles.cssText
                                        console.log(tag[i].style + " " + cc)                                    
                                        cc = cc.substr(cc.indexOf(ss),cc.indexOf(";", cc.indexOf(ss)));
                                        cc = cc.replace(ss + ": ","");
                                        cc = cc.replace(ss + ":","");
                                        if (cc.indexOf(";") == (cc.length - 1)) {cc = cc.substr(0,(cc.length - 1)); }
                                        */
                                        ccArr = styles.cssText.split(";");
                                        for (j = 0; j < ccArr.length; j++) {
                                            a = w3_trim(ccArr[j].substr(0, ccArr[j].indexOf(":")))
                                            b = w3_trim(ccArr[j].substr(ccArr[j].indexOf(":") + 1))
                                            //console.log(a + " ### " + b);
                                            if (tag[i].style == a) {                                        
                                                cc = b;
                                                break;
                                            }
                                            if (tag[i].style.substr(0, 11) == "background-" && a == "background") {
                                                ccArr = b.split(" ");
                                                cc = ccArr[0];
                                                break;
                                            }
                                            //ccArr2 = ccArr[j].split(":");
                                            //for (jj = 0; jj < ccArr2.length; jj++) {
                                            //    if (tag[i].style == w3_trim(ccArr2[0])
                                            //     || (tag[i].style.substr(0, 11) == "background-" && w3_trim(ccArr2[0]) == "background")) {
                                            //        cc = w3_trim(ccArr2[1]);
                                            //    }
                                            //}
                                        }
                                        if (tag[i].value) {
                                            if (compare("", "", styles[iiii], tag[i].value, cc)) {
                                                errvaluetxt = "";
                                                break
                                            }
                                        }
                                        if (tag[i].invalue) {
                                            if (compare("", "", styles[iiii], tag[i].invalue, cc, "IN")) {
                                                errinvaluetxt = "";
                                                break
                                            }
                                        }
                                    }
                                }
                                if (errstyletxt != "") {errortxt = errstyletxt; }
                                if (errvaluetxt != "") {errortxt = errvaluetxt; }
                                if (errinvaluetxt != "") {errortxt = errinvaluetxt; }                            
                            }
                        }
                        if (errortxt == "") {break;}
                    }
                }
                if (errortxt != "") {errs.push(errortxt); }
            }
        }
        function getElements(elements, obj, collectiontype) {
            var tagNames, resultArray = [], i, tags, j;
            if (!obj) var obj = document;
            tagNames = elements.split('|');
            for (i = 0; i < tagNames.length; i++) {
                if (collectiontype == "classname") {
                    tags = obj.getElementsByClassName(tagNames[i]);
                } else if (collectiontype == "queryselector") {
                    tags = obj.querySelectorAll(tagNames[i]);
                } else {
                    tags = obj.getElementsByTagName(tagNames[i]);
                }
                for (j = 0; j < tags.length; j++) {
                    resultArray.push(tags[j]);
                }
            }
            return resultArray;
        }
        function checkOrder(elements, obj) {
            var stat = "OK", tagNames, tags, j, i, x;
            if (!obj) var obj = document;
            tagNames = elements.split(',');
            for (i = 0; i < tagNames.length - 1; i++) {
                try {
                    x = obj.getElementsByTagName(tagNames[i])[0].compareDocumentPosition(obj.getElementsByTagName(tagNames[i+1])[0]);
                } catch (er) {
                    stat = -1;
                    break;
                }
                if (x != 4) {
                    stat = -1;
                    break;
                }
            }
            return stat;
        }
     
    }

    function w3_trim(x) {
        return x.replace(/^\s+|\s+$/gm,'') 
    }