var r = (curmouse, lastmouse, time, deltatime, size, app, win) => {
  app.ctx.font = "400 " + app.size + "px mono";
    app.ctx.fillStyle = "#ffffff";
    app.ctx.textBaseline = "bottom";
    app.ctx.textAlign = "left";
    var strinsert = (str, pos, nstr) => {
        return str.substring(0, pos) + nstr + str.substring(pos);
    };
    var strremove = (str, pos) => {
        return str.substring(0, pos) + str.substring(pos + 1);
    };
    var toHex = (d) => {
        return  ("00000"+(Number(d).toString(16))).slice(-6).toUpperCase()
    }
    var data = app.data, cur = app.cur;
    var theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad = {
        "KeyA": ["A", "a"],
        "KeyB": ["B", "b"],
        "KeyC": ["C", "c"],
        "KeyD": ["D", "d"],
        "KeyE": ["E", "e"],
        "KeyF": ["F", "f"],
        "KeyG": ["G", "g"],
        "KeyH": ["H", "h"],
        "KeyI": ["I", "i"],
        "KeyJ": ["J", "j"],
        "KeyK": ["K", "k"],
        "KeyL": ["L", "l"],
        "KeyM": ["M", "m"],
        "KeyN": ["N", "n"],
        "KeyO": ["O", "o"],
        "KeyP": ["P", "p"],
        "KeyQ": ["Q", "q"],
        "KeyR": ["R", "r"],
        "KeyS": ["S", "s"],
        "KeyT": ["T", "t"],
        "KeyU": ["U", "u"],
        "KeyV": ["V", "v"],
        "KeyW": ["W", "w"],
        "KeyX": ["X", "x"],
        "KeyY": ["Y", "y"],
        "KeyZ": ["Z", "z"],
        "Digit0": [")", "0"],
        "Digit1": ["!", "1"],
        "Digit2": ["@", "2"],
        "Digit3": ["#", "3"],
        "Digit4": ["$", "4"],
        "Digit5": ["%", "5"],
        "Digit6": ["^", "6"],
        "Digit7": ["&", "7"],
        "Digit8": ["*", "8"],
        "Digit9": ["(", "9"],
        "Backquote": ["~", "`"],
        "Minus": ["_", "-"],
        "Equal": ["+", "="],
        "BracketLeft": ["{", "["],
        "BracketRight": ["}", "]"],
        "Backslash": ["|", "\\"],
        "Semicolon": [":", ";"],
        "Quote": ["\"", "'"],
        "Comma": ["<", ","],
        "Period": [">", "."],
        "Slash": ["?", "/"],
        "Space": [" ", " "],
        "Enter": ["\n", "\n"]
    };
    var shift = Keyboard.getKey("ShiftLeft") || Keyboard.getKey("ShiftRight");
    if (app.top) {
        if (Keyboard.getKey("ControlLeft")) {
            if (Keyboard.getDown("Minus")) {
                app.size = Math.round(app.size / 1.25);
            }
            if (Keyboard.getDown("Equal")) {
                app.size = Math.round(app.size * 1.25);
            }
            if (Keyboard.getDown("Digit0")) {
                app.size = Math.round(app.size * 1.25);
            }
        } else {
            if (Keyboard.caps() ? !shift : shift) {
                for (var i = 0; i < Object.keys(theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad).length; i++) {
                    if (Keyboard.getDown(Object.keys(theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad)[i])) {
                        data = strinsert(data, cur, theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad[Object.keys(theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad)[i]][0]);
                        cur++;
                    }
                }
            } else {
                for (var i = 0; i < Object.keys(theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad).length; i++) {
                    if (Keyboard.getDown(Object.keys(theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad)[i])) {
                        data = strinsert(data, cur, theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad[Object.keys(theObjectThatContainsMappingsFromKeyboardKeysOnTheKeyboardToCharactersThatGoOnTheNotepad)[i]][1]);
                        cur++;
                    }
                }
                if (Keyboard.getDown("Backspace")) {
                    cur--;
                    data = strremove(data, cur);
                }
                if (Keyboard.getDown("Delete")) {
                    data = strremove(data, cur);
                }
                if (Keyboard.getDown("ArrowLeft")) {
                    cur--;
                }
                if (Keyboard.getDown("ArrowRight")) {
                    cur++;
                }
            }
        }
    }
    if (cur < 0) cur = 0;
    if (cur > data.length) cur = data.length;
    var output = wrapText(app.ctx, data, app.w, app.size);
    for (var i = 0; i < output.text.length; i++) {
        app.ctx.fillText(output.text[i].text, 1, output.text[i].height+1);
    }
    if (app.top) {
        if (time % 1 < 0.5) {
            app.ctx.fillStyle = "#cfcfcf";
        } else {
            app.ctx.fillStyle = "#ffffff";
        }
        var pos = getCursorPos(app.ctx, data, "\uffff", cur, app.w, app.size);
        var charw = app.ctx.measureText("_").width;
        app.ctx.fillRect(charw*pos.char+1, app.size*pos.line+app.size+1, app.size / 10, app.size);
    }
    app.data = data;
    app.cur = cur;
    app.ctx.fillStyle = "#000";
    app.ctx.font = "400 20px mono";
    app.ctx.fillRect(0, app.h - 20, app.ctx.measureText(app.size.toString()).width, 20);
    app.ctx.fillStyle = "#fff";
    app.ctx.fillText(app.size.toString(), 0, app.h);
}
var s = (curmouse, lastmouse, time, deltatime, size, app, win) => {
    app.BigEval = new files["fs/apps/gui/builtin/notepad/lib-bigeval.js"]();
    app.data = "";
    app.cur = 0;
    app.caps = false;
    app.size = 20;
}
return {r: r, s: s};