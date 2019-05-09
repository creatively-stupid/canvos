var r = (curmouse, lastmouse, time, deltatime, size, app, win) => {
  app.ctx.font = "400 20px mono";
  app.ctx.fillStyle = "#fff";
  app.ctx.textBaseline = "bottom";
  app.ctx.textAlign = "left";
  var equ = app.equ, cur = app.cur;
  if (app.top) {
    (
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit0"))?()=>{
        equ = equ.insertAt(cur, "0");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit1"))?()=>{
        equ = equ.insertAt(cur, "1");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit2"))?()=>{
        equ = equ.insertAt(cur, "2");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit3"))?()=>{
        equ = equ.insertAt(cur, "3");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit4"))?()=>{
        equ = equ.insertAt(cur, "4");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit5"))?()=>{
        equ = equ.insertAt(cur, "5");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit6"))?()=>{
        equ = equ.insertAt(cur, "6");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit7"))?()=>{
        equ = equ.insertAt(cur, "7");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit8"))?()=>{
        equ = equ.insertAt(cur, "8");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit9"))?()=>{
        equ = equ.insertAt(cur, "9");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Minus"))?()=>{
        equ = equ.insertAt(cur, "-");
        cur++;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit8"))?()=>{
        equ = equ.insertAt(cur, "*");
        cur++;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit6"))?()=>{
        equ = equ.insertAt(cur, "^");
        cur++;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit1"))?()=>{
        equ = equ.insertAt(cur, "!");
        cur++;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit5"))?()=>{
        equ = equ.insertAt(cur, "%");
        cur++;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Digit7"))?()=>{
        equ = equ.insertAt(cur, "&");
        cur++;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Comma"))?()=>{
        equ = equ.insertAt(cur, "<<");
        cur += 2;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Period"))?()=>{
        equ = equ.insertAt(cur, ">>");
        cur += 2;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Backslash"))?()=>{
        equ = equ.insertAt(cur, "|");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Equal"))?()=>{
        var ind = equ.indexOf("=");
        if (ind !== -1) {
          equ = equ.slice(0, ind);
          cur = equ.length;
        }
        var res = app.BigEval.exec(equ).toString();
        equ = equ.insertAt(cur, "=" + res);
        cur += res.length + 1;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Slash"))?()=>{
        equ = equ.insertAt(cur, "/");
        cur++;
      }:
      (Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Equal"))?()=>{
        equ = equ.insertAt(cur, "+");
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Backspace"))?()=>{
        equ = equ.removeAt(cur-1);
        cur--;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("ArrowLeft"))?()=>{
        cur--;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("ArrowRight"))?()=>{
        cur++;
      }:
      (!Keyboard.getKey("ShiftLeft") && Keyboard.getDown("Enter"))?()=>{
        equ = equ.insertAt(cur, "\n");
        cur++;
      }:
    ()=>{})();
  }
  if (cur < 0) cur = 0;
  if (cur > equ.length) cur = equ.length;
  var output = wrapText(app.ctx, equ, app.w, 20);
  for (var i = 0; i < output.text.length; i++) {
    app.ctx.fillText(output.text[i].text, 1, output.text[i].height+1);
  }
  if (app.top && time % 1 < 0.5) {
    var pos = getCursorPos(app.ctx, equ, "\uffff", cur, app.w, 20);
    var charw = app.ctx.measureText("_").width;
    app.ctx.fillRect(charw*pos.char+1, 20*pos.line+21, 2, 20);
  }
  app.equ = equ;
  app.cur = cur;
}
var s = (curmouse, lastmouse, time, deltatime, size, app, win) => {
  app.BigEval = new files["fs/apps/gui/builtin/notepad/lib-bigeval.js"]();
  app.equ = "";
  app.cur = 0;
}
return {r: r, s: s};