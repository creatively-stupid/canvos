/*
 * this is the actual shell program, it runs on terminal start.
 * you can also call csh from csh (oof);
 * it can also execute arbitrary .js files
 */

async function Run() {

}

// Latte used (because its fuckin amazing)
function tokenize(string) {
  var class0 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$";
  var class1 = [["~", ""], ["`", ""], ["!", ""], ["%", ""], ["^", ""], ["&", "&"], ["*", "*=/"], ["(", ""], [")", ""], ["-", "-+="], ["+", "+-="], ["=", "=>"], ["{", ""], ["}", ""], ["[", ""], ["]", ""], ["|", "|"], ["\\", ""], [":", ""], [";", ""], ["\"", ""], ["'", ""], ["<", "<="], [">", ">="], [",", ""], [".", ""], ["/", "/=*"], ["?", ""]];
  var class2 = " \t\n";
  var classify = (char) => {
    if (class0.indexOf(char) >= 0) {return 0;}
    if (class1.find(ch => ch[0] === char)) {return 1;}
    if (class2.indexOf(char) >= 0) {return 2;}
    return -1;
  }
  var currentClass = -1;
  var tokenList = [];
  var classList = [];
  for (var i = 0, len = string.length; i < len; i++) {
    var newChar = string[i];
    var newClass = classify(newChar);
    if (newClass != currentClass) {
      switch (newClass) {
        case 0:
          tokenList.push(newChar);
          classList.push(0);
          break;
        case 1:
          tokenList.push(newChar);
          classList.push(1);
          break;
        case 2:
          tokenList.push(newChar);
          classList.push(2);
          break;
        default:
          throw new Error(`Invalid New Char ${newChar}`);
      }
      currentClass = newClass;
    } else {
      switch (currentClass) {
        case 0:
          tokenList[tokenList.length - 1] += newChar;
          break;
        case 1:
          if (class1.find(ch => ch[0] === string[i - 1])[1].indexOf(newChar) >= 0) {
            tokenList[tokenList.length - 1] += newChar;
          } else {
            if (tokenList[tokenList.length - 1] !== "") tokenList.push(newChar);
            classList.push(1);
          }
          break;
        case 2:
          tokenList[tokenList.length - 1] += newChar;
          break;
        default:
          throw new Error(`Invalid Existing Char ${newChar}`);
      }
    }
  }
  return (l=>{for(var i=0,r=[];i<l[0].length;i++)r.push([l[0][i],l[1][i]]);return r})([tokenList,classList]);
}
function nestify(tokens) {
  var nest = "";
  var nestIds = [];
  var nestObj = [];
  var seek = (obj, arr) => {
    //console.log(obj, arr);
    if (arr.length === 0) return obj;
    return seek(obj[arr[0]].inside, arr.slice(1));
  };
  var currentObj = () => seek(nestObj, nestIds);
  var commenting = 0;
  for (var i = 0, len = tokens.length; i < len; i++) {
    var token = tokens[i][0];
    var tokenType = tokens[i][1];
    if (commenting === 1) {

    } else if (commenting === 2) {

    }
    if (token === "\\") {
      i++;
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "escaped",
          value: tokens[i][0],
        });
      } else {
        currentObj()[0].value += tokens[i][0];
      }
      continue;
    }
    if (tokenType === 1) {
      if (token === "\"") {
        if (nest[nest.length - 1] === "\"") {
          nest = nest.slice(0, -1);
          nestIds.pop();
          //console.log("\"");
        } else {
          nest += "\"";
          currentObj().push({
            type: "quote",
            value: "\"\"",
            inside: [{
              type: "quote data",
              value: ""
            }]
          });
          nestIds.push(currentObj().length - 1);
          //console.log("\"");
        }
      } else if (token === "'") {
        if (nest[nest.length - 1] === "'") {
          nest = nest.slice(0, -1);
          nestIds.pop();
          //console.log("'");
        } else {
          nest += "'";
          currentObj().push({
            type: "quote",
            value: "''",
            inside: [{
              type: "quote data",
              value: ""
            }]
          });
          nestIds.push(currentObj().length - 1);
          //console.log("'");
        }
      } else if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        if (token === "(") {
          nest += "(";
          currentObj().push({
            type: "bracket",
            value: "()",
            inside: []
          });
          nestIds.push(currentObj().length - 1);
          //console.log("(");
        } else if (token === ")") {
          if (nest[nest.length - 1] === "(") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log(")");
          } else throw new Error("Unbalanced ()!");
        } else if (token === "[") {
          nest += "[";
          currentObj().push({
            type: "bracket",
            value: "[]",
            inside: []
          });
          nestIds.push(currentObj().length - 1);
          //console.log("[");
        } else if (token === "]") {
          if (nest[nest.length - 1] === "[") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log("]");
          } else throw new Error("Unbalanced []!");
        } else if (token === "{") {
          nest += "{";
          currentObj().push({
            type: "bracket",
            value: "{}",
            inside: []
          });
          nestIds.push(currentObj().length - 1);
          //console.log("{");
        } else if (token === "}") {
          if (nest[nest.length - 1] === "{") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log("}");
          } else throw new Error("Unbalanced {}!");
        } else if (token === "<<") {
          if (tokens[i-1][0] === "Function") {
            nest += "<";
            currentObj().push({
              type: "bracket",
              value: "<>",
              inside: []
            });
            nestIds.push(currentObj().length - 1);
            //console.log("<");
          }
        } else if (token === ">>") {
          if (nest[nest.length - 1] === "<") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log(">");
          }
        } else {
          if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
            currentObj().push({
              type: "operation",
              value: token
            });
          } else {
            currentObj()[0].value += token;
          }
        }
      } else {
        if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
          currentObj().push({
            type:  "operation",
            value: token
          });
        } else {
          currentObj()[0].value += token;
        }
      }
    } else if (tokenType === 2) {
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "padding",
          value: token
        });
      } else {
        currentObj()[0].value += token;
      }
    } else {
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "name/value",
          value: token
        });
      } else {
        currentObj()[0].value += token;
      }
    }
  }
  if (nest !== "") throw new Error("Unbalanced Brackets!");
  return nestObj;
}
