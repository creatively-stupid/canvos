async function run() {

}

var symtable = {};

function executeMath(string) {
  var tokens = tokenize(string);
  var stack = [];
  var evaluate = n=>{if(typeof n=="number")return n;else return symtable[n]||(_=>{throw new Error("undefined value "+n)})()};
  var fact = n=>{if(num<=0)return 1;else return num*fact(num-1)};
  for (var i = 0, len = tokens.length; i < len; i++) {
    var token = tokens[i];
    var tokentype = token[1];
    token = token[0];
    if (tokentype === 2) continue; // skip whitespace
    if (tokentype === 0) {
      stack.push(parseName(token));
    } else {
      if (token === "+") {
        stack.push(evaluate(stack.pop()) + evaluate(stack.pop()));
      } else if (token === "-") {
        var a = evaluate(stack.pop());
        stack.push(evaluate(stack.pop()) - a);
      } else if (token === "*") {
        stack.push(evaluate(stack.pop()) * evaluate(stack.pop()));
      } else if (token === "/") {
        var a = evaluate(stack.pop());
        stack.push(evaluate(stack.pop()) / a);
      } else if (token === "^") {
        var a = evaluate(stack.pop());
        stack.push(evaluate(stack.pop()) ** a);
      } else if (token === "_") {
        stack.push(Math.pow(evaluate(stack.pop()), 1/evaluate(stack.pop())));
      } else if (token === "!") {
        stack.push(fact(stack.pop));
      } else if (token === "=") {
        var a = evaluate(stack.pop());
        var b = stack.pop();
        stack.push(symtable[b] = a);
      }
    }
    //console.log(stack);
  }
  if (stack.length !== 1 && stack.length !== 0) throw new Error("unbalanced equation!");
  return evaluate(stack[0]);
}

function parseName(name) {
  var regex = /(0[0-7]+)|(0[xX][0-9a-fA-F]+)|(([1-9][0-9]*|0)(\.[0-9]+)?)|([a-zA-Z_][a-zA-Z0-9_]*)/y;
  var match = name.match(regex);
  if (!match) throw new Error("invalid parse for " + name);
  var oct = match[1];
  var hex = match[2];
  var float = match[3];
  var name = match[6];
  if (oct) {
    return parseInt(oct,8);
  } else if (hex) {
    return parseInt(hex,16);
  } else if (float) {
    return parseFloat(float);
  } else if (name) {
    return name;
  } else {
    throw new Error("invalid parse for " + name);
  }
}

function tokenize(string) {
  var class0 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.";
  var class1 = [
    ["+", ""],
    ["-", ""],
    ["*", ""],
    ["/", ""],
    ["^", ""],
    ["_", ""],
    ["!", ""],
    ["=", ""]
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
