/*
 * this is the actual shell program, it runs on terminal start.
 * you can also call csh from csh (oof);
 * it can also execute arbitrary .js files
 */

async function Run() {

}

function tokenparseline(line) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~_-=+{}[]|\\:;\"'<>,.?/!$^&*()#";
  var padding = "\t ";
  var getclass = (c) => {
    if (chars.indexOf(c) != -1) return 0;
    if (padding.indexOf(c) != -1) return 1;
  }
  var instring = "";
  var tokens = [];
  var cclass = -1;
  for (var i = 0, l = line.length; i < l; i++) {
    var nchar = line[i];
    var nclass = getclass(char);
    if (nclass !== cclass) {
      switch (nclass) {
        case 0:
          tokens.push("");
          break;
        case 1:
          tokens.push("");
          break;
        default:

      }
      cclass = nclass;
    } else {
      switch (nclass) {
        case 0:
          tokens[tokens.length - 1] += nchar;
          break;
        case 1:
          tokens[tokens.length - 1] += nchar;
          break;
        default:

      }
    }
  }
}
