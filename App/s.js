// Leave this file now, before it's too late


































































































var consolelog = "";
var extconsolelog = [];
var displayconsole = false;
var consolemax = 20;
var booted = false;
var linking = true;
var preservedData = {};
if (linking) {
  if (!window.link) window.close();
  if (window.link[1]) {
    preservedData = window.link[1];
  }
  window.link[0].link = [window, preservedData];
}

var canvas = document.getElementById("c");
var ctxscr = canvas.getContext("2d");
var canvas2 = document.createElement("canvas");
var ctx = canvas2.getContext("2d");

window.onresize = () => {
  var s = sSize();
  canvas.clientWidth = canvas.width = s[0];
  canvas.clientHeight = canvas.height = s[1];
};

// yes i use prototypes
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
String.prototype.removeAt = function(char) {
  return this.slice(0, char) + this.slice(char + 1);
};
String.prototype.insertAt=function(index, string) {
  return this.substring(0, index) + string + this.substring(index);
}
Object.prototype.getKeyByValue=function(value) {
  return Object.keys(this).find(key => this[key] === value);
}

function sSize() {
  var w = [
    window.innerWidth,
    window.innerHeight
  ];
  return w;
}

console.olog=console.log;console.log=(...a)=>{console.olog(...a);consolelog+=a.join(" ")+"\n"}
function log(command, data) {
  extconsolelog.push([command, data]);
}
/* /""""  __   . __  .   . /"""\ /"""-       /"""\
* |     /  \  |/  |  \ /  |   | '---.         _-'
* \____ \__/\ |   |   V   \___/ -___/       /"___
*
* /\"\"\"\"  __   . __  .   . /\"\"\"\\ /\"\"\"-       /\"\"\"\\
* |     /  \\  |/  |  \\ /  |   | '---.         _-'
* \\____ \\__/\\ |   |   V   \\___/ -___/       /\"___
*/




console.log("welcome to the not-very-secret dev console!");
console.log("we are currently booting up...");
log("msg", "welcome to the not-very-secret dev console!");
log("msg", "we are currently booting up...");

var loadqueue = [];
var loadMax = 0;
var Keyboard = {update: () => {}};
var StackBlur = {};

var wallpaperloc = "fs/user/pictures/wallpaper0.jpg";

loadImage("unk.svg");
//                                        Hey look they are all aligned and it looks re -- Oh it stopped thats sad
loadImageData("startbar.png",             "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAgCAYAAADT5RIaAAAAmUlEQVR42g3EOwtBAQAF4OP9fv0li8FiMVgsFovBYjFYLAYShSIlSpESKUVK3cFyFyWLlOUuShYpy3G+4QNIwvb9EfbXR1lvwnF/Es6LRbjMhzJuhHt/JTzrM+Gdm4RvfFIDg/B3j6p1UI0dEahtVXVDBCsrVV6q0oIIFWeqMFX5CRHOjVR2SEQyfZXuqVSHiCbbKtEkYvE6/ztrS1y281jxAAAAAElFTkSuQmCC");
loadImage("button-close.svg",             "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAA7SURBVChTY2hoaPiPCwMBA1gBAwMDigSMD6Tt4SYgCSIrRChAl4TyiTQBi05UBbgwWAHYKyAGVsxgDwCrv3X99AYkdgAAAABJRU5ErkJggg=="        );
loadImage("button-close-pressed.svg",     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAA4SURBVChTY/jPwPAfJwaTYIQqAeMDaXu4CUiCyAoRCqACcDaUT6QJWHSiKsCFIQpATBADK2awBwDvS2HVWMVr2AAAAABJRU5ErkJggg=="            );
loadImage("button-fullwin.svg",           "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAADhJREFUKFNjaGho+I8LAwEDWAEDAwMYY2HbwxWAaBjGUIALE28CSABJEFMBLgxWAPYKiIEVM9gDAAQhcX19ULvpAAAAAElFTkSuQmCC"                                );
loadImage("button-fullwin-pressed.svg",   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAADFJREFUKFNj+M/A8B8nBpNgBMFY2PYgEi4AwxgKcGHiTQAJIAkis4mxAsQEMbBiBnsAKQRe2PMX1HEAAAAASUVORK5CYII="                                        );
loadImage("button-unfullwin.svg",         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAD1JREFUKFNjaGho+I8LAwEDXAEDAwMKDWXbgxWABJEVILEhCnBhuAI0XchshAnICpDEiLAC7BUQAytmsAcABCFxff6yfj4AAAAASUVORK5CYII="                        );
loadImage("button-unfullwin-pressed.svg", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAADlJREFUKFNj+M/A8B8nBpNQDgMaDWXbgxWABJEVILEhCnBhuAI0XchshAnICpDEiLECxAQxsGIGewApBF7Y5jH5hgAAAABJRU5ErkJggg=="                            );
loadImage("button-minimize.svg",          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAACtJREFUKFNjaGho+I8LAwEDXgUMDAz2xCkAMjAwigJcmEoKwF4BMbBiBnsANft7/VkYZY4AAAAASUVORK5CYII="                                                );
loadImage("button-minimize-pressed.svg",  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAC9JREFUKFNj+M/A8B8nBpPogkiYgYHBnjgFQAYGBhIgmkgTcGEiFYCYIAZWzGAPAE0YZdHy4EAVAAAAAElFTkSuQmCC"                                            );
loadImage("button-move.svg",              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAADZJREFUKFNjaGho+I8LAwEDXAEDAwMcI4nZgxUgCyLzqagAJgjDSGIIBdgwWAHYKyAGVsxgDwAEIXF9HNjjqwAAAABJRU5ErkJggg=="                                );
loadImage("button-move-pressed.svg",      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAADJJREFUKFNj+M/A8B8nBpNQDgMSRhKzBytAFkTmU1EBTBCGkcQQCrBhiAIQE8TAihnsASkEXti78Kt3AAAAAElFTkSuQmCC"                                        );
loadImage("button-resize.svg",            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAADVJREFUKFNjaGho+I8LAwEDWAEDAwNYAAttj9cEuAKYDiQJVAW4MIYJWGgiTAB7BcTAihnsAY5Od31I0YxzAAAAAElFTkSuQmCC"                                    );
loadImage("button-resize-pressed.svg",    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAC5JREFUKFNj+M/A8B8nBpNgBBHAQtuDFeDCcAUwHTBMvglYaGJMADFBDKyYwR4AhsJi1KlAOzcAAAAASUVORK5CYII="                                            );
loadImage(wallpaperloc);

loadScript("html2canvas.min.js");
loadScript("keyboard.min.js");
loadScript("blur.js");

loadAllShit();

loadAllFiles(() => {
  Keyboard = files["keyboard.min.js"];
  StackBlur = files["blur.js"];
  var loadapps = (path) => {
    var loadedapps = fs.seek("apps/gui/" + path);
    var appnames = loadedapps.getFiles();
    appnames.forEach((loadedapp) => {
      if (loadedapps.seek(loadedapp).contains("app.json")) {
        loadApp("fs/apps/gui/" + path + loadedapp + "/");
      } else {
        loadapps(path + loadedapp + "/");
      }
    });
  };
  loadapps("");
  loadAllFiles(() => {});
});

var startMenuScroll = 1;
var startMenuScrollTo = 1;
var loadBarPos = 0;
var loadBarPosTo = 0;
var loadTimeOut = 0.5;

var lastTime = 0;

var apps = [];
var appOrder = [];

var mouseposs = new Array(3);
var passCanvas = document.createElement("canvas");
var passCanvasctx = passCanvas.getContext("2d");
for (var i = 0; i < mouseposs.length; i++) {
  mouseposs[i] = [0, 0];
}

function drawCursorTrail(curmouse, lastmouse) {
  var minx = 100000;
  var miny = 100000;
  var maxx = 0;
  var maxy = 0;
  for (var i = mouseposs.length - 1; i > 0; i--) {
    mouseposs[i][0] = mouseposs[i-1][0];
    mouseposs[i][1] = mouseposs[i-1][1];
    if (mouseposs[i][0] === Infinity) continue;
    if (mouseposs[i][0] < minx) minx = mouseposs[i][0];
    if (mouseposs[i][0] > maxx) maxx = mouseposs[i][0];
    if (mouseposs[i][1] < miny) miny = mouseposs[i][1];
    if (mouseposs[i][1] > maxy) maxy = mouseposs[i][1];
  }
  mouseposs[0][0] = curmouse[0];
  mouseposs[0][1] = curmouse[1];
    if (mouseposs[0][0] !== Infinity) {
    if (mouseposs[0][0] < minx) minx = mouseposs[0][0];
    if (mouseposs[0][0] > maxx) maxx = mouseposs[0][0];
    if (mouseposs[0][1] < miny) miny = mouseposs[0][1];
    if (mouseposs[0][1] > maxy) maxy = mouseposs[0][1];
}
  maxx = Math.round(maxx + 2*cursorSize);
  maxy = Math.round(maxy + 2*cursorSize);
  minx = Math.round(minx - 2*cursorSize);
  miny = Math.round(miny - 2*cursorSize);
  var difx = maxx - minx;
  var dify = maxy - miny;
  if (difx <= 0 || difx == Infinity) difx = 1;
  if (dify <= 0 || dify == Infinity) dify = 1;
  passCanvas.width = difx;
  passCanvas.height = dify;
  passCanvasctx.clearRect( 0, 0, passCanvas.width, passCanvas.height);
  var preCurSize = cursorSize;
  passCanvasctx.strokeStyle = "#000";
  passCanvasctx.fillStyle = "#000";
  for (var i = mouseposs.length - 1; i > 0; i--) {
    //cursorSize = preCurSize * (1-(i / mouseposs.length));
    passCanvasctx.globalAlpha = (1-(i / mouseposs.length)) ** 2;
    if (mouseposs[i][0] === Infinity) continue;
    if (mouseposs[i - 1][0] === Infinity) continue;
    var p1x = mouseposs[i][0] - minx;
    var p1y = mouseposs[i][1] - miny;
    var p2x = mouseposs[i-1][0] - minx;
    var p2y = mouseposs[i-1][1] - miny;
    //console.log(p1x, p1y, p2x, p2y);
    var inc = Math.max(3/dist(p1x, p1y, p2x, p2y), 0.02);
    //console.log(inc);
    for (var j = 0; j < 1; j+=inc) {
      //passCanvasctx.fillStyle = "#000";
      //passCanvasctx.fillRect(lerpUnclamped(p1x, p2x, j) - 5, lerpUnclamped(p1y, p2y, j) - 5, 10, 10);
      drawCursor(passCanvasctx, [lerpUnclamped(p1x, p2x, j), lerpUnclamped(p1y, p2y, j), curmouse[2], curmouse[3], curmouse[4], curmouse[5], curmouse[6]], [0, 0, lastmouse[2], lastmouse[3], lastmouse[4], lastmouse[5], lastmouse[6]], true);
    }
  }
  drawCursor(passCanvasctx, curmouse, lastmouse, true);
  cursorSize = preCurSize;
  //ctx.strokeRect(minx, miny, difx, dify);
  StackBlur.canvasRGBA(passCanvas, 0, 0, difx, dify, 5);
  ctx.globalAlpha = 0.5;
  ctx.drawImage(passCanvas, minx + 3, miny + 3, difx, dify);
  ctx.globalAlpha = 1;
}

var running = true;

function frame(time) {
  if (linking) {
    if (window.link === undefined) { // app reloaded and lost connection
      window.close();
    }
    if (window.link[0].link === undefined) { // parent reloaded and lost connection
      window.link[0].relink = true;
      window.link[0].link = [window, preservedData];
    }
  }
  var deltatime = (time - lastTime)/1000;
  lastTime = time;
  time = time/1000;
  var size = sSize();
  var curmouse = mouse();
  var lastmouse = omouse();
  currentCursor = "cursor";
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size[0], size[1]);
  if (loadqueue.length === 0 && loadBarPos > 0.99 && loadTimeOut > 0) {
      loadTimeOut -= deltatime;
  }
  if (loadqueue.length === 0 && loadBarPos > 0.99 && loadTimeOut <= 0) {
    if (!booted) {
      booted = true;
      console.log("Welcome To");
      console.log();
      console.log("/\"\"\"\"  __   . __  .   . /\"\"\"\\ /\"\"\"-       /\"\"\"\\");
      console.log("|     /  \\  |/  |  \\ /  |   | '---.         _-'");
      console.log("\\____ \\__/\\ |   |   V   \\___/ -___/       /\"___");
      console.log();
      console.log("Copyright (C) 2019 RedMikePumpkin / CreativelyStupid");
      log("msg", "Welcome To");
      log("msg", "");
      log("msg", "/\"\"\"\"  __   . __  .   . /\"\"\"\\ /\"\"\"-       /\"\"\"\\");
      log("msg", "|     /  \\  |/  |  \\ /  |   | '---.         _-'");
      log("msg", "\\____ \\__/\\ |   |   V   \\___/ -___/       /\"___");
      log("msg", "");
      log("msg", "Copyright (C) 2019 RedMikePumpkin / CreativelyStupid");
      launchModal("CanvOS", "Welcome to CanvOS 2!", "", [["Ok", "close"]], 200, 50, curmouse, lastmouse, deltatime, size);
    }
    var bgsize = imageRes(wallpaperloc);
    if (size[0] * bgsize[1] > size[1] * bgsize[0]) {
      drawImage(wallpaperloc, 0, (size[1] - ((bgsize[1] * size[0]) / bgsize[0])) / 2, size[0], (bgsize[1] * size[0]) / bgsize[0]);
    } else {
      drawImage(wallpaperloc, (size[0] - (bgsize[0] * size[1]) / bgsize[1]) / 2, 0, (bgsize[0] * size[1]) / bgsize[1], size[1]);
    }

    processApps(curmouse, lastmouse, time, deltatime, size);

    startMenuScroll = lerp(startMenuScroll, startMenuScrollTo, deltatime/0.25, 0, 1);
    ctx.fillStyle = "#00f";
    ctx.fillRect(0, 0, (size[0]/2) * (1-startMenuScroll), size[1]-32);
    ctx.fillStyle = "#000";
    ctx.fillRect(size[0] * 2 * startMenuScroll, 0, size[0], 64);
    ctx.font = "400 30px seg";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var date = new Date();
    ctx.fillText(("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2), size[0] * (1-startMenuScroll)-size[0]/2, 32);
    ctx.font = "900 30px serf";
    ctx.fillText("Start Menu", size[0] * (1-startMenuScroll)-3*size[0]/4, 32);

    var exapps = fs.seek("apps/gui/builtin/").getFiles();
    for (var i = 0; i < exapps.length; i++) {
      drawButton(files["fs/apps/gui/builtin/" + exapps[i] + "/"].n, size[0] * (1-startMenuScroll-1)/2+5, 133 + i * 32, size[0]/2-10, 32, () => {
        launchApp("fs/apps/gui/builtin/" + exapps[i] + "/", curmouse, lastmouse, time, deltatime, size);
      }, curmouse, lastmouse);
    }
    ctx.globalAlpha = 1;
    drawImage("startbar.png", 0, size[1] - 32, size[0], 32);
    ctx.fillStyle = (curmouse[2] && inBox(curmouse[0], curmouse[1], 2, size[1] - 30, 70, 28)) ? "#9f9fff" : "#7f7fff";
    drawButton("Start", 2, size[1]-30, ctx.measureText("Start").width+5, 28, () => {
      startMenuScrollTo = 1 - startMenuScrollTo;
    }, curmouse, lastmouse);
    if (Keyboard.getDown("ControlRight")) {
      startMenuScrollTo = 1 - startMenuScrollTo;
    }
    ctx.textAlign = "right";
    ctx.fillText(Math.round(1/deltatime) + " FPS", size[0] - 3, size[1] - 29);
    drawTray(curmouse, lastmouse, time, deltatime, size);
    ctx.globalAlpha = 1;
    if (cursorTrail) drawCursorTrail(curmouse, lastmouse);
    drawCursor(ctx, curmouse, lastmouse, false);
  } else {
    var grd = ctx.createLinearGradient(0, 0, 0, size[1]);
    grd.addColorStop(0, "#ff9900");
    grd.addColorStop(0.25, "#a59074");
    grd.addColorStop(1, "#4a86ea");
    ctx.fillStyle = grd;
    ctx.textBaseline = "middle";
    ctx.font = "900 30px serf";
    ctx.textAlign = "center";
    var textwidth = Math.max(
      ctx.measureText("The system is coming up").width,
      ctx.measureText(loadqueue.length.toString() + " file" + ((loadqueue.length!==1)?"s":"") + " remaining").width
    ) + 15;
    ctx.fillRect(0, 0, size[0], size[1]);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.fillRect((size[0] - textwidth)/2, size[1]/2 - 65, textwidth, 130);
    ctx.strokeRect((size[0] - textwidth)/2, size[1]/2 - 65, textwidth, 130);
    ctx.fillStyle = "#000";
    ctx.fillText("The system is coming up", size[0]/2, size[1]/2 - 45);
    ctx.fillText(loadqueue.length.toString() + " file" + ((loadqueue.length!==1)?"s":"") + " remaining", size[0]/2, size[1]/2 - 15);
    ctx.textBaseline = "middle";
    ctx.font = "400 10px mono";
    ctx.textAlign = "left";
    ctx.fillText(loadqueue[0] !== undefined ? loadqueue[0][1] : "Done!", size[0]/2 - textwidth/2+7.5, size[1]/2 + 15);
    loadBarPosTo = (loadMax-loadqueue.length)/loadMax;
    loadBarPos = lerp(loadBarPos, loadBarPosTo, deltatime/0.3, 0, 1);
    ctx.fillRect(size[0]/2 - textwidth/2+7.5, size[1]/2 + 30, (textwidth-15)*loadBarPos, 30);
    ctx.strokeRect(size[0]/2 - textwidth/2+7.5, size[1]/2 + 30, textwidth-15, 30);
    drawGrid(size, textwidth);
  }
  if (displayconsole) {
    ctx.font = "400 10px mono";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000";
    var goal = consolelog.split(" ").length-1 < consolemax ? consolelog.split(" ").length-1 : consolemax;
    for (var i = 0; i < goal; i++) {
      ctx.fillText(consolelog.split(" ")[consolelog.split(" ").length-i-1], 1, (goal-i)*10-9);
    }
  }
  updateMouse();
  Keyboard.update();
  if (running) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function drawButton(l, x, y, w, h, p, cm, lm) {
  ctx.fillStyle = (cm[2] && inBox(cm[0], cm[1], x, y, w, h)) ? "#9f9fff" : "#7f7fff";
  if (!cm[2] && lm[2] && inBox(cm[0], cm[1], x, y, w, h)) {
    p();
  }
  ctx.strokeStyle = "#000";
  ctx.lineJoin = "miter";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x+w-10,y);
  ctx.lineTo(x+w,y+10);
  ctx.lineTo(x+w,y+h);
  ctx.lineTo(x,y+h);
  ctx.lineTo(x,y);
  ctx.fill();
  ctx.stroke();
  ctx.font = "900 30px serf";
  ctx.fillStyle = "#000";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(l, x+2, y+3);
}

function drawGlobalButton(app, l, x, y, w, h, p, cm, lm) {
  var uctx = app.ctx;
  uctx.fillStyle = (cm[2] && inBox(cm[0], cm[1], x+app.x+1, y+app.y+11, w, h)) ? "#9f9fff" : "#7f7fff";
  if (!cm[2] && lm[2] && inBox(cm[0], cm[1], x+app.x+1, y+app.y+11, w, h)) {
    p();
  }
  uctx.strokeStyle = "#000";
  uctx.lineJoin = "miter";
  uctx.beginPath();
  uctx.moveTo(x, y);
  uctx.lineTo(x+w-10,y);
  uctx.lineTo(x+w,y+10);
  uctx.lineTo(x+w,y+h);
  uctx.lineTo(x,y+h);
  uctx.lineTo(x,y);
  uctx.fill();
  uctx.stroke();
  uctx.fillStyle = "#000";
  uctx.textBaseline = "top";
  uctx.textAlign = "left";
  uctx.fillText(l, x+2, y+2);
}

function drawGrid(size, textwidth) {
  if (!images["bootpattern"]) {
    var icanv = document.createElement("canvas"),
      icanv2 = document.createElement("canvas");
    icanv.width = icanv.height = icanv2.width = icanv2.height = 12;
    var ictx = icanv.getContext("2d"),
      ictx2 = icanv2.getContext("2d");
    ictx.beginPath();
    ictx2.beginPath();
    ictx.lineWidth = ictx2.lineWidth = 1;
    ictx.strokeStyle = "#0000001f";
    ictx2.strokeStyle = "#0000ff3f";
    ictx.moveTo(0, 0);
    ictx2.moveTo(0, 0);
    ictx.lineTo(icanv.width, icanv.width);
    ictx2.lineTo(icanv.width, icanv.width);
    ictx.moveTo(icanv.width, 0);
    ictx2.moveTo(icanv.width, 0);
    ictx.lineTo(0, icanv.width);
    ictx2.lineTo(0, icanv.width);
    ictx.stroke();
    ictx2.stroke();
    images["bootpattern"] = icanv;
    images["bootpattern2"] = icanv2;
  }
  var pat = ctx.createPattern(images["bootpattern"], null);
  ctx.fillStyle = pat;
  ctx.fillRect(0, 0, size[0], size[1]/2-65);
  ctx.fillRect(0, size[1]/2+65, size[0], size[1]/2-65);
  ctx.fillRect(0, size[1]/2-65, (size[0]-textwidth)/2, 130);
  ctx.fillRect((size[0]+textwidth)/2, size[1]/2-65, (size[0]-textwidth)/2, 130);
  pat = ctx.createPattern(images["bootpattern2"], null);
  ctx.fillStyle = pat;
  ctx.fillRect((size[0] - textwidth)/2, size[1]/2 - 65, textwidth, 130);
}

var images = {};
var files = {};
var fs;

function loadImage(src) {
  if (src === null) return;
  loadqueue.push([0, src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-image", src);
  loadMax++;
}

function loadImageData(src, data) {
  /*
  loadqueue.push([0, src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-image", src);
  loadMax++;
  //*/
  //*
  loadqueue.push([0, src, data]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-image", src);
  //*/
}

function loadFile(src) {
  if (src === null) return;
  loadqueue.push([1, src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-file", src);
  loadMax++;
}

function loadScript(src) {
  if (src === null) return;
  loadqueue.push([2, src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-script", src);
  loadMax++;
}

function loadApp(src) {
  if (src === null) return;
  loadqueue.push([3, src + "app.json", src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-app", src);
  loadMax++;
}
function loadAllShit() {
  loadqueue.push([4, "fs/?recurse"]);
  console.log("loading the entire system so this will take a while");
  log("queue-fs", "");
  loadMax++;
}

async function loadAllFiles(callback) {
  if (loadqueue.length === 0) {
    console.log("finished loading!");
    log("load-end");
    callback();
    return;
  }
  console.log("loading file " + JSON.stringify(loadqueue[0][1]));
  var src = loadqueue[0][1];
  log("load-start", src);
  if (loadqueue[0][0] === 0) {
    var i = new Image();
    i.onload = () => {
      console.log("recieved!");
      console.log("image");
      log("load-image");
      images[src] = i;
      loadqueue.shift();
      loadAllFiles(callback);
    };
    i.src = loadqueue[0][2] || src;
    console.log("sent...");
    log("load-sent");
  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() { // i would use ()=>{} but it breaks
      if (this.readyState == 4 && this.status == 200) {
        console.log("recieved!");
        var txt = this.responseText;
        var t = loadqueue[0][0];
        (
          (t === 1)?()=>{
            console.log("text");
            log("load-text");
            files[src] = txt;
          }:
          (t === 2)?()=>{
            console.log("script");
            log("load-script");
            files[src] = new Function(txt)();
          }:
          (t === 3)?()=>{
            console.log("app");
            log("load-app");
            files[loadqueue[0][2]] = JSON.parse(txt);
            if (files[loadqueue[0][2]].i !== null) loadImage(loadqueue[0][2] + files[loadqueue[0][2]].i);
            if (files[loadqueue[0][2]].s !== null) loadScript(loadqueue[0][2] + files[loadqueue[0][2]].s);
            var deps = files[loadqueue[0][2]].d;
            for (var i = 0; i < deps.length; i+=2) {
              loadqueue.push([deps[i], loadqueue[0][2] + deps[i+1]]);
              console.log(JSON.stringify(loadqueue[0][2] + deps[i+1]) + " added to queue");
              log("queue-app", loadqueue[0][2] + deps[i+1]);
            }
          }:
          (t === 4)?()=>{
            console.log("expand load completion");
            log("load-fs");
            console.log(JSON.parse(txt));
            fs = Folder.Folderify(JSON.parse(txt));
          }:
        ()=>{})();
        loadqueue.shift();
        loadAllFiles(callback);
      }
    };
    xhttp.open("GET", src, true);
    xhttp.send();
    console.log("sent...");
    log("load-sent");
  }
}

function launchApp(app, curmouse, lastmouse, time, deltatime, size) {
  apps.push(clone(files[app]));
  var id = apps.length - 1;
  appOrder.push(id);
  console.log(apps);
  apps[id].canvas = document.createElement("canvas");
  apps[id].canvas.width = apps[id].w;
  apps[id].canvas.height = apps[id].h;
  apps[id].ctx = apps[id].canvas.getContext("2d");
  apps[id].wrs = 0;
  apps[id]._path = app;
  files[app + apps[id].s].s(curmouse, lastmouse, time, deltatime, size, apps[id], {x: apps[id].x + 1, y: apps[id].y + 11, w: apps[id].w, h: apps[id].h});
}
function processApps(cm, lm, pt, dt, sz) {
  for (var i = 0; i < appOrder.length; i++) {
    var app = apps[appOrder[i]];
    if (!app) {
      appOrder.splice(i, 1);
      continue;
    }
    if (app.m) continue; // app is minimized
    if (appObstructionState(i) & 4) continue; // app is obstructed
    ctx.fillStyle = "#7f7f9f";
    ctx.fillRect(app.x, app.y, app.w + 3, app.h + 13);
    ctx.strokeStyle = ctx.fillStyle = "#9f9fcf";
    ctx.strokeRect(app.x+1, app.y+1, app.w + 1, app.h + 11);
    ctx.fillRect(app.x+1, app.y+1, app.w+1, 10);
    if (inBox(cm[0], cm[1], app.x + app.w - 7, app.y + 1, 8, 8)) {
      if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
        currentCursor = "cursor-hover";
      }
    }
    if (inBox(cm[0], cm[1], app.x + app.w - 16, app.y + 1, 8, 8)) {
      if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
        currentCursor = "cursor-hover";
      }
    }
    if (inBox(cm[0], cm[1], app.x + app.w - 25, app.y + 1, 8, 8)) {
      if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
        currentCursor = "cursor-hover";
      }
    }
    if (inBox(cm[0], cm[1], app.x + app.w - 34, app.y + 1, 8, 8)) {
      if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
        currentCursor = "cursor-hover";
      }
    }
    if (inBox(cm[0], cm[1], app.x + app.w - 43, app.y + 1, 8, 8)) {
      if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
        currentCursor = "cursor-hover";
      }
    }
    if (app.rs) {
      if (inBox(cm[0], cm[1], app.x + app.w, app.y, 2, app.h+13)) {
        if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
          currentCursor = "cursor-hover";
        }
      }
      if (inBox(cm[0], cm[1], app.x, app.y, 2, app.h+13)) {
        if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
          currentCursor = "cursor-hover";
        }
      }
      if (inBox(cm[0], cm[1], app.x, app.y + app.h + 11, app.w + 3, 2)) {
        if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
          currentCursor = "cursor-hover";
        }
      }
      if (inBox(cm[0], cm[1], app.x, app.y, app.w + 3, 2)) {
        if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
          currentCursor = "cursor-hover";
        }
      }
    }
    if (cm[2]) {
      if (appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
        if (inBox(cm[0], cm[1], app.x + app.w - 7, app.y + 1, 8, 8)) drawImage("button-close-pressed.svg", app.x + app.w - 7, app.y + 1, 8, 8);
        else drawImage("button-close.svg", app.x + app.w - 7, app.y + 1, 8, 8);
        if (inBox(cm[0], cm[1], app.x + app.w - 16, app.y + 1, 8, 8)) drawImage("button-" + (app.f ? "un" : "") + "fullwin-pressed.svg", app.x + app.w - 16, app.y + 1, 8, 8);
        else drawImage("button-" + (app.f ? "un" : "") + "fullwin.svg", app.x + app.w - 16, app.y + 1, 8, 8);
        if (inBox(cm[0], cm[1], app.x + app.w - 25, app.y + 1, 8, 8)) drawImage("button-minimize-pressed.svg", app.x + app.w - 25, app.y + 1, 8, 8);
        else drawImage("button-minimize.svg", app.x + app.w - 25, app.y + 1, 8, 8);
        if (inBox(cm[0], cm[1], app.x + app.w - 43, app.y + 1, 8, 8)) {
          if (!lm[2] && !app.f) {
            app.rs = !app.rs;
          }
        }
        if (inBox(cm[0], cm[1], app.x + app.w - 34, app.y + 1, 8, 8)) {
          drawImage("button-move-pressed.svg", app.x + app.w - 34, app.y + 1, 8, 8);
          if (!app.mx && !app.ree && !app.rew && !app.res && !app.ren && !app.f) {
            app.mx=cm[0]-app.x;app.my=cm[1]-app.y;
          }
        }
        else drawImage("button-move.svg", app.x + app.w - 34, app.y + 1, 8, 8);
        if (app.rs) {
          if (inBox(cm[0], cm[1], app.x + app.w, app.y, 2, app.h+13)) {
            if (!app.mx && !app.ree && !app.rew && !app.res && !app.ren && !app.f) {
              app.ree=cm[0]-app.x;
            }
          }
          if (inBox(cm[0], cm[1], app.x, app.y, 2, app.h+13)) {
            if (!app.mx && !app.ree && !app.rew && !app.res && !app.ren && !app.f) {
              app.rew=cm[0]-app.x;
            }
          }
          if (inBox(cm[0], cm[1], app.x, app.y + app.h + 11, app.w + 3, 2)) {
            if (!app.mx && !app.ree && !app.rew && !app.res && !app.ren && !app.f) {
              app.res=cm[1]-app.y;
            }
          }
          if (inBox(cm[0], cm[1], app.x, app.y, app.w + 3, 2)) {
            if (!app.mx && !app.ree && !app.rew && !app.res && !app.ren && !app.f) {
              app.ren=cm[1]-app.y;
            }
          }
        }
      } else {
        drawImage("button-close.svg", app.x + app.w - 7, app.y + 1, 8, 8);
        drawImage("button-" + (app.f ? "un" : "") + "fullwin.svg", app.x + app.w - 16, app.y + 1, 8, 8);
        drawImage("button-minimize.svg", app.x + app.w - 25, app.y + 1, 8, 8);
        drawImage("button-move.svg", app.x + app.w - 34, app.y + 1, 8, 8);
      }
      if (!app.f) {
        if (app.mx) {
          app.nx = cm[0]-app.mx;
          app.ny = cm[1]-app.my;
          app.nw = app.w;
          app.nh = app.h;
          if (app.nx < 0) app.nx = 0;
          if (app.ny < 0) app.ny = 0;
          if (app.nx + app.nw + 3 > sz[0]) app.nx = sz[0] - app.nw - 3;
          if (app.ny + app.nh + 45 > sz[1]) app.ny = sz[1] - app.nh - 45;
          currentCursor = "drag";
        }
        if (app.ree) {
          app.nx = app.x;
          app.ny = app.y;
          app.nw = cm[0]-app.ree+app.w-app.x;
          app.nh = app.h;
          if (app.nx < 0) app.nx = 0;
          if (app.ny < 0) app.ny = 0;
          if (app.nx + app.nw + 3 > sz[0]) app.nx = sz[0] - app.nw - 3;
          if (app.ny + app.nh + 45 > sz[1]) app.ny = sz[1] - app.nh - 45;
          currentCursor = "drag-ew";
        }
        if (app.rew) {
          app.nx = cm[0]-app.rew;
          app.ny = app.y;
          app.nw = app.x+app.w-app.nx;
          app.nh = app.h;
          if (app.nx < 0) app.nx = 0;
          if (app.ny < 0) app.ny = 0;
          if (app.nx + app.nw + 3 > sz[0]) app.nx = sz[0] - app.nw - 3;
          if (app.ny + app.nh + 45 > sz[1]) app.ny = sz[1] - app.nh - 45;
          currentCursor = "drag-ew";
        }
        if (app.res) {
          app.nx = app.x;
          app.ny = app.y;
          app.nw = app.w;
          app.nh = cm[1]-app.res+app.h-app.y;
          if (app.nx < 0) app.nx = 0;
          if (app.ny < 0) app.ny = 0;
          if (app.nx + app.nw + 3 > sz[0]) app.nx = sz[0] - app.nw - 3;
          if (app.ny + app.nh + 45 > sz[1]) app.ny = sz[1] - app.nh - 45;
          currentCursor = "drag-ns";
        }
        if (app.ren) {
          app.nx = app.x;
          app.ny = cm[1]-app.ren;
          app.nw = app.w;
          app.nh = app.y+app.h-app.ny;
          if (app.nx < 0) app.nx = 0;
          if (app.ny < 0) app.ny = 0;
          if (app.nx + app.nw + 3 > sz[0]) app.nx = sz[0] - app.nw - 3;
          if (app.ny + app.nh + 45 > sz[1]) app.ny = sz[1] - app.nh - 45;
          currentCursor = "drag-ns";
        }
      }
      if (!lm[2] && i !== appOrder.length - 1 && appCollidingWith(cm[0], cm[1]) === appOrder[i]) {
        appOrder.push(appOrder[i]);
        appOrder.splice(i, 1);
        i--;
        continue;
      }
    } else {
      drawImage("button-close.svg", app.x + app.w - 7, app.y + 1, 8, 8);
      drawImage("button-" + (app.f ? "un" : "") + "fullwin.svg", app.x + app.w - 16, app.y + 1, 8, 8);
      drawImage("button-minimize.svg", app.x + app.w - 25, app.y + 1, 8, 8);
      drawImage("button-move.svg", app.x + app.w - 34, app.y + 1, 8, 8);
      if (lm[2] && appCollidingWith(cm[0], cm[1]) === appOrder[i] && !app.rs && app.wrs === 0) {
        if (inBox(cm[0], cm[1], app.x + app.w - 7, app.y + 1, 8, 8)) {
          delete apps[appOrder[i]];
          appOrder.splice(i, 1);
          i--;
          continue;
        }
        if (inBox(cm[0], cm[1], app.x + app.w - 16, app.y + 1, 8, 8)) {
          app.f = !app.f;
          if (app.f) {
            app.fpx = app.x;
            app.fpy = app.y;
            app.fpw = app.w;
            app.fph = app.h;
          } else {
            app.x = app.fpx;
            app.y = app.fpy;
            app.w = app.fpw;
            app.h = app.fph;
          }
        }
        if (inBox(cm[0], cm[1], app.x + app.w - 25, app.y + 1, 8, 8)) {
            app.m = true;
            appOrder.unshift(appOrder[i]);
            i++;
            appOrder.splice(i, 1);
        }
      }
      if (app.mx || app.ree || app.rew || app.ren || app.res) {
        app.x = app.nx;
        app.y = app.ny;
        if (app.nw < 0) {
            app.x += app.nw + 4;
        }
        if (app.nh < 0) {
            app.y += app.nh + 11;
        }
        app.w = Math.abs(app.nw);
        ctx.font = "400 10px mono";
        ctx.fillStyle = "#000";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        var minw = ctx.measureText(app.n).width + 50;
        if (app.w < minw) app.w = minw;
        app.h = Math.abs(app.nh);
        if (app.h < 50) app.h = 50;
        if (app.x < 0) app.x = 0;
        if (app.y < 0) app.y = 0;
        if (app.x + app.w + 3 > sz[0]) app.x = sz[0] - app.w - 3;
        if (app.y + app.h + 45 > sz[1]) app.y = sz[1] - app.h - 45;
        app.canvas.width = app.w;
        app.canvas.height = app.h;
        app.mx = app.my = app.nx = app.ny = app.ree = app.rew = app.ren = app.res = app.nw = app.nh = app.rs = undefined;
        app.wrs = 2;
      }
    }
    if (app.f) {
      app.x = 0;
      app.y = 0;
      app.w = sz[0] - 3;
      app.h = sz[1] - 46;
    }
    if (appObstructionState(i) & 1) {
      app.canvas.width = app.w;
      app.canvas.height = app.h;
    }
    if (app.wrs > 0) app.wrs--;
    if (app.rs) drawImage("button-resize-pressed.svg", app.x + app.w - 43, app.y + 1, 8, 8);
    else drawImage("button-resize.svg", app.x + app.w - 43, app.y + 1, 8, 8);
    ctx.font = "400 10px mono";
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText(app.n, app.x+1, app.y+1);
    ctx.fillRect(app.x+1, app.y+11, app.w, app.h);
    if (appObstructionState(i) & 1) {
      app.ctx.fillStyle = "#000";
      app.ctx.fillRect(0, 0, app.w, app.h);
    }
    images["temp-appgfx"] = app.canvas;
    app.top = i === appOrder.length - 1;
    app.hover = appCollidingWith(cm[0], cm[1]) === appOrder[i];
    if (appObstructionState(i) & 1) files[app._path + app.s].r(cm, lm, pt, dt, sz, app, {x: app.x + 1, y: app.y + 11, w: app.w, h: app.h});
    drawImage("temp-appgfx", app.x+1, app.y+11, app.w, app.h)
    if (app.mx || app.ree || app.rew || app.ren || app.res) {
      ctx.lineWidth = 1;
      ctx.setLineDash([2,3]);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(app.nx, app.ny, app.nw + 4, app.nh + 14);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(app.nx + 1, app.ny + 1, app.nw + 2, app.nh + 12);
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
    }
  }
}

function drawTray(cm, lm, pt, dt, sz) {
  var startw = ctx.measureText("Start").width+8;
  for (var i = 0; i < appOrder.length; i++) {
    var app = apps[appOrder[i]];
    if (!app) continue;
    if (app.m) {
      ctx.fillStyle = "#0000003f";
      ctx.fillRect(startw+i*33, sz[1]-32, 32, 32);
    }
    if (cm[2]) {
      if (inBox(cm[0], cm[1], startw+i*33, sz[1]-32, 32, 32)) {
        ctx.fillStyle = "#0000003f";
        ctx.fillRect(startw+i*33, sz[1]-32, 32, 32);
      }
    } else {
      if (lm[2]) {
        if (inBox(cm[0], cm[1], startw+i*33, sz[1]-32, 32, 32)) {
          if (app.m)
            app.m = false;
          else {
            if (i === appOrder.length - 1) {
              app.m = true;
              appOrder.unshift(appOrder[i]);
              i++;
              appOrder.splice(i, 1);
            }
          }
          appOrder.push(appOrder[i]);
          appOrder.splice(i, 1);
          return;
        }
      }
    }
    drawImage(app._path + app.i, startw+i*33, sz[1]-32, 32, 32);
  }
}

function appCollidingWith(x, y) {
  for (var i = appOrder.length-1; i >= 0; i--) {
    if (!apps[appOrder[i]]) continue;
    if (inBox(x, y, apps[appOrder[i]].x, apps[appOrder[i]].y, apps[appOrder[i]].w+3, apps[appOrder[i]].h+13)) {
      return appOrder[i];
    }
  }
  return null;
}

function appObstructionState(appId) { // 1-bit: on top, 2-bit: partially obstructed, 3-bit fully obstructed
  var top = appId === appOrder.length - 1;
  var part = false;
  var full = false;
  for (var i = appId + 1; i < appOrder.length; i++) {
    if (rectInRect(apps[appOrder[appId]].x, apps[appOrder[appId]].y, apps[appOrder[appId]].w + 3, apps[appOrder[appId]].h + 13, apps[appOrder[i]].x, apps[appOrder[i]].y, apps[appOrder[i]].w + 3, apps[appOrder[i]].h + 13)) part = true;
    if (rectCoveringRect(apps[appOrder[appId]].x, apps[appOrder[appId]].y, apps[appOrder[appId]].w + 3, apps[appOrder[appId]].h + 13, apps[appOrder[i]].x, apps[appOrder[i]].y, apps[appOrder[i]].w + 3, apps[appOrder[i]].h + 13)) full = true;
  }
  return (top?1:0)+(part?2:0)+(full?4:0);
}

function clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

function lerp(v0, v1, t, mi, ma) {
  return (v0*(1-t)+v1*t).clamp(mi || 0, ma || 1);
}

function lerpUnclamped(v0, v1, t) {
  return v0*(1-t)+v1*t;
}

function dist(ax, ay, bx, by) {
  var a = bx - ax, b = by - ay;
  return Math.sqrt((a*a)+(b*b));
}

function inBox(px, py, x, y, w, h) {
  return px >= x && px <= x + w && py >= y && py <= y + h;
}

function LineToLine(a1, a2, b1, b2) {
  var result;

  var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
  var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
  var u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

  if ( u_b != 0 ) {
    var ua = ua_t / u_b;
    var ub = ub_t / u_b;

    if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
      result = {
        x: a1.x + ua * (a2.x - a1.x),
        y: a1.y + ua * (a2.y - a1.y)
      }
    } else {
      result = false;
    }
  } else {
    if ( ua_t == 0 || ub_t == 0 ) {
      result = false
    } else {
      result = false;
    }
  }

  return result;
};

function rectInRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  // top to left
  if (LineToLine({x: x1, y: y1}, {x: x1+w1, y: y1}, {x: x2, y: y2}, {x: x2, y: y2+h2})) return true;
  // top to right
  if (LineToLine({x: x1, y: y1}, {x: x1+w1, y: y1}, {x: x2+w2, y: y2}, {x: x2+w2, y: y2+h2})) return true;
  // bottom to left
  if (LineToLine({x: x1, y: y1+h1}, {x: x1+w1, y: y1+h1}, {x: x2, y: y2}, {x: x2, y: y2+h2})) return true;
  // bottom to right
  if (LineToLine({x: x1, y: y1+h1}, {x: x1+w1, y: y1+h1}, {x: x2+w2, y: y2}, {x: x2+w2, y: y2+h2})) return true;
  // left to top
  if (LineToLine({x: x1, y: y1}, {x: x1, y: y1+h1}, {x: x2, y: y2}, {x: x2+w2, y: y2})) return true;
  // left to bottom
  if (LineToLine({x: x1, y: y1}, {x: x1, y: y1+h1}, {x: x2, y: y2+h2}, {x: x2+w2, y: y2+h2})) return true;
  // right to top
  if (LineToLine({x: x1+w1, y: y1}, {x: x1+w1, y: y1+h1}, {x: x2, y: y2}, {x: x2+w2, y: y2})) return true;
  // right to bottom
  if (LineToLine({x: x1+w1, y: y1}, {x: x1+w1, y: y1+h1}, {x: x2, y: y2+h2}, {x: x2+w2, y: y2+h2})) return true;
  return false;
}

function rectCoveringRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  // top-left
  if (!inBox(x1, y1, x2, y2, w2, h2)) return false;
  // bottom-right
  if (!inBox(x1+w1, y1+h1, x2, y2, w2, h2)) return false;
  return true;
}

function drawImage(i, x, y, w, h) {
  i = images[i];
  if (!i) i = images["unk.svg"];
  if (!i) return;
  ctx.drawImage(i, x, y, w, h);
}

function drawGlobalImage(i, x, y, w, h, c) {
  i = images[i];
  if (!i) i = images["unk.svg"];
  if (!i) return;
  c.drawImage(i, x, y, w, h);
}

function imageRes(i) {
  i = images[i];
  if (!i) i = images["unk"];
  if (!i) return [1, 1];
  return [i.width, i.height];
}

var _mousestate = [0, 0, 0, 0, 0, 0, 0];
var _mousestateo = [0, 0, 0, 0, 0, 0, 0];

function mouse() {
  return _mousestate;
}
function omouse() {
  return _mousestateo;
}

function updateMouse() {
  _mousestateo = [
    _mousestate[0],
    _mousestate[1],
    _mousestate[2],
    _mousestate[3],
    _mousestate[4],
    _mousestate[5],
    _mousestate[6]
  ];
}

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
document.addEventListener('mouseout', onMouseOut, false);
document.addEventListener('mousedown', onMouseUpdate, false);
document.addEventListener('mouseup', onMouseUpdate, false);

function onMouseUpdate(e) {
  e.preventDefault();
  _mousestate[0] = e.pageX;
  _mousestate[1] = e.pageY;
  _mousestate[2] = !!(e.buttons & 1);
  _mousestate[3] = !!(e.buttons & 2);
  _mousestate[4] = !!(e.buttons & 4);
  _mousestate[5] = !!(e.buttons & 8);
  _mousestate[6] = !!(e.buttons & 16);
}
function onMouseOut(e) {
  e.preventDefault();
  _mousestate[0] = Infinity;
  _mousestate[1] = Infinity;
  _mousestate[2] = !!(e.buttons & 1);
  _mousestate[3] = !!(e.buttons & 2);
  _mousestate[4] = !!(e.buttons & 4);
  _mousestate[5] = !!(e.buttons & 8);
  _mousestate[6] = !!(e.buttons & 16);
}

var currentCursor = "cursor";
var cursorSize = 12;
var cursorCanvas = true;
var htmlCursor = "";
var cursorTrail = false;

if (cursorCanvas) {
  setCursor("none");
}

function setCursor(n) {
  if (htmlCursor === n) return;
  $("*").css("cursor", n);
  htmlCursor = n;
}

function drawCursor(ctx, cm, lm, cc) {
  if (!cursorCanvas) {
    if (currentCursor.startsWith("cursor")) {
      if (currentCursor === "cursor-hover") {
        setCursor("pointer");
      } else {
        setCursor("default");
      }
    } else if (currentCursor.startsWith("drag")) {
      var ns = true;
      var ew = true;
      if (currentCursor === "drag-ns") {
        ew = false;
      }
      if (currentCursor === "drag-ew") {
        ns = false;
      }
      if (ns && ew) {
        setCursor("all-scroll");
      } else if (ns) {
        setCursor("ns-resize");
      } else {
        setCursor("ew-resize");
      }
    }
    return;
  } else setCursor("none");
  var cs = cursorSize;
  if (currentCursor.startsWith("cursor")) {
    ctx.beginPath();
    if (!cc) {
      ctx.strokeColor = "#000";
      ctx.fillStyle = cm[2] ? "#00f" : "#ff0";
      if (currentCursor === "cursor-hover") {
        ctx.fillStyle = "#f00";
      }
    }
    ctx.moveTo(cm[0], cm[1]);
    ctx.lineTo(cm[0] + cs, cm[1] + cs);
    ctx.lineTo(cm[0] + cs * (1 - 2 / (2 + Math.SQRT2)), cm[1] + cs);
    ctx.lineTo(cm[0], cm[1] + cs * (1 + 1 / (1 + Math.SQRT2)));
    ctx.lineTo(cm[0], cm[1]);
    ctx.fill();
    ctx.stroke();
  } else if (currentCursor.startsWith("drag")) {
    ctx.beginPath();
    if (!cc) {
      ctx.strokeColor = "#000";
      ctx.fillStyle = "#00f";
    }
    var ns = true;
    var ew = true;
    if (currentCursor === "drag-ns") {
      ew = false;
    }
    if (currentCursor === "drag-ew") {
      ns = false;
    }
    ctx.moveTo(cm[0] + 2*cs/15, cm[1] - 2*cs/15);
    if (ew) {
      ctx.lineTo(cm[0] + 0.4*cs, cm[1] - 2*cs/15);
      ctx.lineTo(cm[0] + 0.4*cs, cm[1] - 0.2*cs);
      ctx.lineTo(cm[0] + 2*cs/3, cm[1]);
      ctx.lineTo(cm[0] + 0.4*cs, cm[1] + 0.2*cs);
      ctx.lineTo(cm[0] + 0.4*cs, cm[1] + 2*cs/15);
      ctx.lineTo(cm[0] + 2*cs/15, cm[1] + 2*cs/15);
    }
    if (ns) {
      ctx.lineTo(cm[0] + 2*cs/15, cm[1] + 0.4*cs);
      ctx.lineTo(cm[0] + 0.2*cs, cm[1] + 0.4*cs);
      ctx.lineTo(cm[0], cm[1] + 2*cs/3);
      ctx.lineTo(cm[0] - 0.2*cs, cm[1] + 0.4*cs);
      ctx.lineTo(cm[0] - 2*cs/15, cm[1] + 0.4*cs);
      ctx.lineTo(cm[0] - 2*cs/15, cm[1] + 2*cs/15);
    }
    if (ew) {
      ctx.lineTo(cm[0] - 0.4*cs, cm[1] + 2*cs/15);
      ctx.lineTo(cm[0] - 0.4*cs, cm[1] + 0.2*cs);
      ctx.lineTo(cm[0] - 2*cs/3, cm[1]);
      ctx.lineTo(cm[0] - 0.4*cs, cm[1] - 0.2*cs);
      ctx.lineTo(cm[0] - 0.4*cs, cm[1] - 2*cs/15);
      ctx.lineTo(cm[0] - 2*cs/15, cm[1] - 2*cs/15);
    }
    if (ns) {
      ctx.lineTo(cm[0] - 2*cs/15, cm[1] - 0.4*cs);
      ctx.lineTo(cm[0] - 0.2*cs, cm[1] - 0.4*cs);
      ctx.lineTo(cm[0], cm[1] - 2*cs/3);
      ctx.lineTo(cm[0] + 0.2*cs, cm[1] - 0.4*cs);
      ctx.lineTo(cm[0] + 2*cs/15, cm[1] - 0.4*cs);
    }
    ctx.lineTo(cm[0] + 2*cs/15, cm[1] - 2*cs/15);
    ctx.fill();
    ctx.stroke();
  }
}

function wrapText(ctx, text, width, fontSize, soft) {
  var lines = [],
    line = '',
    lineTest = '',
    words = text.split(''),
    currentY = 0;

  for (var i = 0, len = words.length; i < len; i++) {
    lineTest = line + words[i];
    if (words[i] === "\n") {
      currentY = lines.length * fontSize + fontSize;
      lines.push({ text: line, height: currentY });
      line = "";
      continue;
    }

    // Check total width of line or last word
    if (ctx.measureText(lineTest).width > width) {
      // Calculate the new height
      currentY = lines.length * fontSize + fontSize;

      // Record and reset the current line
      lines.push({ text: line, height: currentY });
      line = words[i];
    } else {
      line = lineTest;
    }
  }

  // Catch last line in-case something is left over
  if (line.length > 0) {
    currentY = lines.length * fontSize + fontSize;
    lines.push({ text: line, height: currentY });
  }

  return {text: lines, height: currentY};
}

function getCursorPos(ctx, text, char, pos, width, fontSize) {
  var text = text.slice(0, pos) + char,
    lines = [],
    line = '',
    lineTest = '',
    words = text.split(''),
    currentY = 0;

  for (var i = 0, len = words.length; i < len; i++) {
    lineTest = line + words[i];
    if (words[i] === "\n") {
      currentY = lines.length * fontSize + fontSize;
      lines.push({ text: line, height: currentY });
      line = "";
      continue;
    }

    if (words[i] === char) {
      return {line: lines.length-1, char: line.length-1};
    }
    // Check total width of line or last word
    if (ctx.measureText(lineTest).width > width) {
      // Calculate the new height
      currentY = lines.length * fontSize + fontSize;

      // Record and reset the current line
      lines.push({ text: line, height: currentY });
      line = words[i];
    } else {
      line = lineTest;
    }
  }

  // Catch last line in-case something is left over

  throw new Error("major error induced \"my code sucks\"");
}

/*
var docElm = document.documentElement;
if (docElm.requestFullscreen) {
  docElm.requestFullscreen();
}
else if (docElm.msRequestFullscreen) {
  docElm = document.body; //overwrite the element (for IE)
  docElm.msRequestFullscreen();
}
else if (docElm.mozRequestFullScreen) {
  docElm.mozRequestFullScreen();
}
else if (docElm.webkitRequestFullScreen) {
  docElm.webkitRequestFullScreen();
}
document.addEventListener("fullscreenchange", function () {
  var f = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen;
  if (!f) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    else if (docElm.msRequestFullscreen) {
      docElm = document.body; //overwrite the element (for IE)
      docElm.msRequestFullscreen();
    }
    else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    }
    else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  }
}, false);
//*/

function launchModal(title, msg, img, btns, w, h, cm, lm, t, dt, sz) {
  var id = 0;
  while(files["_tmodal_"+id] !== undefined) id++;
  files["_tmodal"] = {
    "x": (sSize()[0] - w) / 2,
    "y": (sSize()[1] - h) / 2,
    "w": w,
    "h": h,
    "f": false,
    "m": false,
    "i": img,
    "n": title,
    "rs": false,
    "s": "_"+id,
    "d": [],
    "_msg": msg,
    "_btns": btns
  };
  files["_tmodal_"+id] = {
    r: (curmouse, lastmouse, time, deltatime, size, app, win) => {
      if (app.rs) app.rs = false;
      if (app.m) app.m = false;
      app.ctx.fillStyle = "#000";
      app.ctx.fillRect(0, 0, app.w, app.h);
      drawGlobalImage(img, h / 4, h / 4, h / 2, h / 2, app.ctx);
      app.ctx.font = "400 10px mono";
      app.ctx.fillStyle = "#fff";
      app.ctx.textBaseline = "bottom";
      app.ctx.textAlign = "left";
      var output = wrapText(app.ctx, app._msg, app.w - app.h - 1, 10);
      for (var i = 0; i < output.text.length; i++) {
        app.ctx.fillText(output.text[i].text, h + 1, output.text[i].height+1);
      }
      for (var i = 0; i < app._btns.length; i++) {
        var ii = app._btns[i][1];
        if (apps[appOrder[appOrder.length - 1]] !== app) {
          appOrder.push(apps.indexOf(app));
          appOrder.splice(appOrder.indexOf(apps.indexOf(app)), 1);
          console.log("del-ao-a");
          console.log("top");
        }
        drawGlobalButton(app, app._btns[i][0], h + 1 + i * (w - h - 2) / app._btns.length, h - 14, (w - h - 2) / app._btns.length, 12, () => {
          (
            (ii === "close")?()=>{
              var ind = apps.indexOf(app);
              apps.splice(ind, 1);
              console.log("close");
            }:
          ()=>{})();
        }, curmouse, lastmouse);
      }
    },
    s: (curmouse, lastmouse, time, deltatime, size, app, win) => {

    }
  }
  launchApp("_tmodal", cm, lm, t, dt, sz);
}

class Folder {
  constructor (contents) {
    this.data = contents;
  }
  getFiles () {
    return Object.keys(this.data);
  }
  getFile (name) {
    return this.data[name];
  }
  setFile (name, value) {
    this.data[name] = value;
  }
  static Folderify (object) {
      var objkeys = Object.keys(object);
      if (objkeys.length !== 1 || objkeys[0] !== "folder") {
          throw new Error("invalid object to Folderify!");
      }
      var newfold = {};
      var oldfold = object.folder;
      var foldkeys = Object.keys(oldfold);
      for (var i = 0; i < foldkeys.length; i++) {
          var item = oldfold[foldkeys[i]];
          if (item.file) {
              newfold[foldkeys[i]] = File.Fileify(item);
          } else if (item.folder) {
              newfold[foldkeys[i]] = Folder.Folderify(item);
          } else {
              throw new Error("invalid object to Folderify!");
          }
      }
      return new Folder(newfold);
  }
  seek(path) { // TODO: implement .. and / paths
    var levels = path.split("/");
    if (levels[levels.length - 1] === "") {
      var f = this;
      for (var i = 0; i < levels.length - 1; i++) {
        if (levels[i] === ".") continue;
        f = f.getFile(levels[i]);
      }
      return f;
    } else {
      var f = this;
        for (var i = 0; i < levels.length; i++) {
        f = f.getFile(levels[i]);
      }
      return f;
    }
  }
  isFile() {
    return false;
  }
  isFolder() {
    return true;
  }
  contains(path) {
    return this.seek(path) !== undefined;
  }
}

class File {
  constructor (data) {
    this.data = data;
  }
  read () {
    return this.data;
  }
  write (value) {
    this.data = value;
  }
  static Fileify (object) {
    var objkeys = Object.keys(object);
    if (objkeys.length !== 1 || objkeys[0] !== "file") {
      throw new Error("invalid object to Fileify!");
    }
    return new File(object.file);
  }
  isFile() {
    return true;
  }
  isFolder() {
    return false;
  }
}

$(window).trigger("resize");

window.onerror = (m, s, l, c) => {
  // BSOD
  error(m, s, l, c);
}

async function delay(ms) {
  return new Promise(yey => {
    setTimeout(yey, ms);
  })
}

async function error(m, s, l, c) {
  setCursor("default");
  window.onresize = null;
  window.onkeydown = null;
  window.onkeyup = null;
  window.onmousedown = null;
  window.onmouseenter = null;
  window.onmouseup = null;
  window.onmouseout = null;
  window.onmousemove = null;
  running = false;
  var size = sSize();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, size[0], size[1]);
  await delay(300);
  var grd = ctx.createLinearGradient(0, 0, 0, size[1]);
  grd.addColorStop(0, "#0ff");
  grd.addColorStop(0.25, "#007fff");
  grd.addColorStop(1, "#00f");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size[0], size[1]);
  await delay(50);
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#fff";
  ctx.font = "400 200px mono";
  ctx.fillText(":(", 30, size[1] - 440);
  await delay(50);
  ctx.font = "400 30px mono";
  ctx.fillText("CanvOS has encountered an", 30, size[1] - 240);
  await delay(50);
  ctx.fillText("error and has stopped working", 30, size[1] - 210);
  await delay(50);
  ctx.fillText("please email the following error message to", 30, size[1] - 170);
  await delay(50);
  ctx.fillText("chickennuggetz420@gmail.com or michael@malinov.com", 30, size[1] - 140);
  await delay(50);
  var err = m + " @ " + decodeURIComponent(new URL(s).pathname).slice(1) + ":" + l + ":" + c;
  ctx.font = "900 30px mono";
  ctx.fillText(err, 30, size[1] - 110);
  ctx.font = "400 30px mono";
  await delay(50);
  ctx.fillText("We will restart your system", 30, size[1] - 70);
  await delay(50);
  ctx.fillText("after a few quick scans /s", 30, size[1] - 40);
  await delay(50);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.strokeRect(500, size[1] - 70, 400, 30);
  await delay(50);
  var i = 0, c = 5;
  while (1) {
    ctx.fillStyle = grd;
    ctx.fillRect(500, size[1] - 70, 400, 30);
    ctx.strokeRect(500, size[1] - 70, 400, 30);
    ctx.fillStyle = "#fff";
    ctx.fillRect(502, size[1] - 68, i+1, 26);
    var d = 0;
    if (i <= 400)
      d += Math.random() * 15;
    if (i <= 500)
      d += Math.random() * 15;
    if (i <= 600)
      d += Math.random() * 15;
    if (i <= 700)
      d += Math.random() * 15;
    if (i <= size[0] - 495) {
      d += Math.random() * 15;
      i++;
      ctx.fillStyle = "#000";
      var s = toFixed(Math.round(i/4)).toString();
      ctx.fillText(s + "%", 503, size[1] - 70);
    } else {
      if (c < (size[0] - 500) / ctx.measureText("0").width + 2) c += 0.1;
      ctx.fillStyle = "#000";
      var s = randomLen(c);
      ctx.fillText(s + "%", 503, size[1] - 70);
    }
    await delay(d);
  }
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10,e);
      x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

function randomLen(c) {
  if (c < 2) return '';
  return Math.floor(Math.random()*10).toString() + randomLen(c - 1);
}
