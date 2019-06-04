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
