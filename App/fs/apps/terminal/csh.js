/*
 * this is the actual shell program, it runs on terminal start.
 * you can also call csh from csh (oof);
 * it can also execute arbitrary .js files
 */

async function Run() {

}

function csh_executeShell(cmd) {
  console.log(csh_nestify(csh_tokenize(cmd)));
}

// Latte used (because its fuckin amazing)
function csh_tokenize(string) {
  var class0 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%*_-+=:;<,.?";
  var class1 = [
    ["[", ""],
    ["]", ""],
    ["(", ""],
    [")", ""],
    [">", ""],
    ["\"", ""],
    ["'", ""],
    ["'", ""],
    ["&", "|"],
    ["|", ""],
    ["^", ">"],
    ["/", ""],
  ];
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
    if (newChar === "\\") {
      newClass = 0;
      i++;
      newChar = "\\" + string[i];
    }
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
function csh_nestify(tokens) {
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
        } else {
          if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
            currentObj().push({
              type: "operation",
              value: token
            });
          } else {
            currentObj()[0].value += csh_parseEscapes(token);
          }
        }
      } else {
        if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
          currentObj().push({
            type:  "operation",
            value: token
          });
        } else {
          currentObj()[0].value += csh_parseEscapes(token);
        }
      }
    } else if (tokenType === 2) {
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "padding",
          value: token
        });
      } else {
        currentObj()[0].value += csh_parseEscapes(token);
      }
    } else {
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "name/value",
          value: token
        });
      } else {
        currentObj()[0].value += csh_parseEscapes(token);
      }
    }
  }
  if (nest !== "") throw new Error("Unbalanced Brackets!");
  return nestObj;
}

function csh_parseEscapes(token) {
  console.log("string!");
  // check for escapes
  for (var i = 0, len = token.length; i < len; i++) {
    if (token[i] === "\\") { // found backslash
      var escchar = token[i + 1];
      if (escchar === "x" || escchar === "X") { // hex escape
        console.log("esc!");
        var id = parseInt(token[i + 2] + token[i + 3], 16);
        var char = String.fromCharCode(id);
        var spliceSlice = (str, index, count, add) => {
          if (index < 0) {
            index = str.length + index;
            if (index < 0) {
              index = 0;
            }
          }
          return str.slice(0, index) + (add || "") + str.slice(index + count);
        }
        token = spliceSlice(token, i, 4, char);
      }
      if (escchar === "u" || escchar === "u") { // uni escape
        var id = parseInt(token[i + 2] + token[i + 3] + token[i + 4] + token[i + 5], 16);
      }
    }
  }
  return token;
}
