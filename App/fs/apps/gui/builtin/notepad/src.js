var r = (curmouse, lastmouse, time, deltatime, size, app, win) => {
  app.ctx.font = "400 20px mono";
    app.ctx.fillStyle = "#fff";
    app.ctx.textBaseline = "bottom";
    app.ctx.textAlign = "left";
    var data = app.data, cur = app.cur;
    var theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad = {
        "KeyA": ["A", "a"],
    };
    var shift = Keyboard.getKey("ShiftLeft") || Keyboard.getKey("ShiftRight");
    if (app.top) {
        if (Keyboard.caps() ? !shift : shift) {
            data = "yes";
        } else {
            data = "no";
        }
    }
    if (cur < 0) cur = 0;
    if (cur > data.length) cur = data.length;
    var output = wrapText(app.ctx, data, app.w, 20);
    for (var i = 0; i < output.text.length; i++) {
        app.ctx.fillText(output.text[i].text, 1, output.text[i].height+1);
    }
    if (app.top && time % 1 < 0.5) {
        var pos = getCursorPos(app.ctx, data, "\uffff", cur, app.w, 20);
        var charw = app.ctx.measureText("_").width;
        app.ctx.fillRect(charw*pos.char+1, 20*pos.line+21, 2, 20);
    }
    app.data = data;
    app.cur = cur;
}
var s = (curmouse, lastmouse, time, deltatime, size, app, win) => {
    app.BigEval = new files["fs/apps/gui/builtin/notepad/lib-bigeval.js"]();
    app.data = "";
    app.cur = 0;
    app.caps = false;
}
return {r: r, s: s};