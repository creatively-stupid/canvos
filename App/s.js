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
    extconsolelog = preservedData.log;
  }
  window.link[0].link = [window, preservedData];
}

var socket = io(location.protocol + "//" + location.hostname + ":1337/");

var canvas = document.getElementById("c");
var ctxscr = canvas.getContext("2d");
var canvas2 = document.createElement("canvas");
var ctx = canvas2.getContext("2d");
var lfr3dcanv = document.createElement("canvas");
var lfr3dctx = lfr3dcanv.getContext("2d");

window.onresize = () => {
  var s = sSize();
  canvas2.width = canvas.width = s[0];
  canvas2.height = canvas.height = s[1];
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

/**
@typedef {Number[]} ResArray
@typedef {Number[]} MouseData
@typedef {Object} AppObject
@typedef {Object} ResObject
*/

/**
@desc returns window resolution
@returns {ResArray}
*/
function sSize() {
  var w = [
    window.innerWidth,
    window.innerHeight
  ];
  return w;
}

console.olog=console.log;console.log=(...a)=>{console.olog(...a);consolelog+=a.join(" ")+"\n"}
/**
@desc logs data
@param {String} command - type of log
@param {String} data - data of log
*/
function log(command, data) {
  if (extconsolelog) extconsolelog.push([command, data]);
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
var startMenuRot = 0;
var startMenuRotTo = 0;
var startMenuPage = 0;
var startMenuAllignment = 0;
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

/**
@desc draws cursor motion-blur
@param {MouseData} currentMouse - current frame mouse data
@param {MouseData} lastMouse - last frame mouse data
*/
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

/**
@desc requestAnimationFrame() code
@param {Number} time - time
*/
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
      launchModal("CanvOS", "Welcome to CanvOS2!", "", [["Ok", "close"]], 200, 50, curmouse, lastmouse, deltatime, size);
    }
    var bgsize = imageRes(wallpaperloc);
    if (size[0] * bgsize[1] > size[1] * bgsize[0]) {
      drawImage(wallpaperloc, 0, (size[1] - ((bgsize[1] * size[0]) / bgsize[0])) / 2, size[0], (bgsize[1] * size[0]) / bgsize[0]);
    } else {
      drawImage(wallpaperloc, (size[0] - (bgsize[0] * size[1]) / bgsize[1]) / 2, 0, (bgsize[0] * size[1]) / bgsize[1], size[1]);
    }

    processApps(curmouse, lastmouse, time, deltatime, size);

    if (startMenuScrollTo === 0) {
      if (Keyboard.getDown("ArrowLeft")) {
        startMenuPage--;
        if (startMenuPage < 0) startMenuPage = 0;
        startMenuAllignment = 0;
      }
      if (Keyboard.getDown("ArrowRight")) {
        startMenuPage++;
        startMenuAllignment = 2 - startMenuAllignment;
      }
    }

    startMenuRotTo = startMenuPage * Math.PI / 2;
    startMenuScroll = lerp(startMenuScroll, startMenuScrollTo, deltatime/0.25, 0, 1);
    startMenuRot = lerpUnclamped(startMenuRot, startMenuRotTo, deltatime/0.25);
    ctx.fillStyle = "#00f";
    //ctx.fillRect(0, 0, (size[0]/2) * (1-startMenuScroll), size[1]-32);
    var cube_rotation = startMenuScroll * Math.PI / 2 - 0.0001;
    var update3d = startMenuScroll < 0.99;

    if (update3d) var cubetris = cubeMesh.render(ctx, (tri) => {
      return tri
      .multiply(
        new Matrix4x4(
          new Vector4(Math.cos(startMenuRot), 0, Math.sin(startMenuRot), 0.5),
          new Vector4(0, 1, 0, 0),
          new Vector4(-Math.sin(startMenuRot), 0, Math.cos(startMenuRot), -0.5),
          new Vector4(0, 0, 0, 1)
        )
      )
      .multiply(
        new Matrix4x4(
          new Vector4(Math.cos(cube_rotation)*1.5, 0, Math.sin(cube_rotation), 0),
          new Vector4(0, 3*size[1]/size[0], 0, 0),
          new Vector4(-Math.sin(cube_rotation), 0, Math.cos(cube_rotation), 2.5),
          new Vector4(0, 0, 0, 1)
        )
      );
    }, 0, size[1]/2, size[0]/2, size[0]/2, [
      images["unk.svg"]
    ]);
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
    var mw = 1;
    if (update3d) mw = Math.max(...(tris => {
      var a = [];
      tris.forEach(tri => {
        a.push(tri.p1.x);
        a.push(tri.p2.x);
        a.push(tri.p3.x);
      });
      return a;
    })(cubetris));
    if (mw < 1) mw = 1;
    passCanvas.width = mw;
    passCanvas.height = size[1];
    passCanvasctx.textBaseline = "top";
    for (var i = 0; i < exapps.length; i++) {
      passCanvasctx.textAlign = "center";
      passCanvasctx.font = "900 90px serf";
      passCanvasctx.fillText(files["fs/apps/gui/builtin/" + exapps[i] + "/"].n, size[0] * (-startMenuScroll-(startMenuRot)*2/Math.PI+i+0.5)/2+5, 69);
      passCanvasctx.font = "900 30px serf";
    }
    drawButton("Launch App", size[0] * (-startMenuScroll)/2+5, size[1]-69, size[0]/2-10, 32, () => {
      launchApp("fs/apps/gui/builtin/" + exapps[startMenuPage] + "/", curmouse, lastmouse, time, deltatime, size);
    }, curmouse, lastmouse);
    ctx.drawImage(passCanvas, 0, 0);
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
    ctx.fillText((Math.round(10/deltatime)/10).toString() + " FPS", size[0] - 3, size[1] - 29);
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
  //ctxscr.clearRect(0, 0, size[0], size[1]);
  ctxscr.drawImage(canvas2, 0, 0);
  if (running) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/**
@desc draws a button to the buffer
@param {String} label - label
@param {Number} x - x co-ord
@param {Number} y - y co-ord
@param {Number} width - width
@param {Number} height - width
@param {Function} pressed - callback
@param {MouseData} currentMouse
@param {MouseData} lastMouse
*/
function drawButton(l, x, y, w, h, p, cm, lm) {
  ctx.fillStyle = (cm[2] && inBox(cm[0], cm[1], x, y, w, h)) ? "#9f9fff" : "#7f7fff";
  if (!cm[2] && lm[2] && inBox(cm[0], cm[1], x, y, w, h)) {
    p();
  }
  ctx.strokeStyle = "#000";
  ctx.lineJoin = "miter";
  ctx.beginPath();
  ctx.moveTo(x - 0.5, y - 0.5);
  ctx.lineTo(x + w - 9.5, y - 0.5);
  ctx.lineTo(x + w + 0.5, y + 9.5);
  ctx.lineTo(x + w + 0.5, y + h + 0.5);
  ctx.lineTo(x - 0.5, y + h + 0.5);
  ctx.lineTo(x - 0.5, y - 0.5);
  ctx.fill();
  ctx.stroke();
  ctx.font = "900 30px serf";
  ctx.fillStyle = "#000";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(l, x+2, y+3);
}

/**
@desc draws a button to any canvas
@param {Object} ctx - context
@param {String} label - label
@param {Number} x - x co-ord
@param {Number} y - y co-ord
@param {Number} width - width
@param {Number} height - width
@param {Function} pressed - callback
@param {MouseData} currentMouse
@param {MouseData} lastMouse
*/
function drawCtxButton(ctx, l, x, y, w, h, p, cm, lm) {
  ctx.fillStyle = (cm[2] && inBox(cm[0], cm[1], x, y, w, h)) ? "#9f9fff" : "#7f7fff";
  if (!cm[2] && lm[2] && inBox(cm[0], cm[1], x, y, w, h)) {
    p();
  }
  ctx.strokeStyle = "#000";
  ctx.lineJoin = "miter";
  ctx.beginPath();
  ctx.moveTo(x - 0.5, y - 0.5);
  ctx.lineTo(x + w - 9.5, y - 0.5);
  ctx.lineTo(x + w + 0.5, y + 9.5);
  ctx.lineTo(x + w + 0.5, y + h + 0.5);
  ctx.lineTo(x - 0.5, y + h + 0.5);
  ctx.lineTo(x - 0.5, y - 0.5);
  ctx.fill();
  ctx.stroke();
  ctx.font = "900 30px serf";
  ctx.fillStyle = "#000";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(l, x+2, y+3);
}
/**
@desc draws a button to any app
@param {AppObject} app
@param {String} label - label
@param {Number} x - x co-ord
@param {Number} y - y co-ord
@param {Number} width - width
@param {Number} height - width
@param {Function} pressed - callback
@param {MouseData} currentMouse
@param {MouseData} lastMouse
*/
function drawGlobalButton(app, l, x, y, w, h, p, cm, lm) {
  var uctx = app.ctx;
  uctx.fillStyle = (cm[2] && inBox(cm[0], cm[1], x+app.x+1, y+app.y+11, w, h)) ? "#9f9fff" : "#7f7fff";
  if (!cm[2] && lm[2] && inBox(cm[0], cm[1], x+app.x+1, y+app.y+11, w, h)) {
    p();
  }
  uctx.strokeStyle = "#000";
  uctx.lineJoin = "miter";
  uctx.beginPath();
  ctx.moveTo(x - 0.5, y - 0.5);
  ctx.lineTo(x + w - 9.5, y - 0.5);
  ctx.lineTo(x + w + 0.5, y + 9.5);
  ctx.lineTo(x + w + 0.5, y + h + 0.5);
  ctx.lineTo(x - 0.5, y + h + 0.5);
  ctx.lineTo(x - 0.5, y - 0.5);
  uctx.fill();
  uctx.stroke();
  uctx.fillStyle = "#000";
  uctx.textBaseline = "top";
  uctx.textAlign = "left";
  uctx.fillText(l, x+2, y+3);
}
// TODO: Make sure this works
/**
@desc draws the boot-up grid
@param {ResArray} size - size of the screen i think
@param {Number} textWidth - width of text
*/
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

/**
@desc adds an image to load buffer
@param {String} src - source url
*/
function loadImage(src) {
  if (src === null) return;
  loadqueue.push([0, src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-image", src);
  loadMax++;
}

/**
@desc adds a dataurl image to load buffer
@param {String} src - source url (name / for compatibility)
@param {String} data - base64 data
*/
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

/**
@desc adds a generic file to load buffer
@param {String} src - source url
*/
function loadFile(src) {
  if (src === null) return;
  loadqueue.push([1, src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-file", src);
  loadMax++;
}

/**
@desc adds a .js file to load buffer
@param {String} src - source url
*/
function loadScript(src) {
  if (src === null) return;
  loadqueue.push([2, src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-script", src);
  loadMax++;
}

/**
@desc adds an app manifest to load buffer
@param {String} src - source url
*/
function loadApp(src) {
  if (src === null) return;
  loadqueue.push([3, src + "app.json", src]);
  console.log(JSON.stringify(src) + " added to queue");
  log("queue-app", src);
  loadMax++;
}
/**
@desc loads the entire filesystem
*/
function loadAllShit() {
  loadqueue.push([4, "fs/?recurse"]);
  console.log("loading the entire system so this will take a while");
  log("queue-fs", "");
  loadMax++;
}

/**
@desc parses an item from the buffer, and recurses
@param {Function} callback - callback
*/
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

/**
@desc launch an app
@param {String} appPath - path of app
@param {MouseData} currentMouse
@param {MouseData} lastMouse
@param {Number} time - time from frame()
@param {Number} deltatime - deltatime from frame()
@param {ResArray} size - size of screen
*/
function launchApp(app, curmouse, lastmouse, time, deltatime, size) {
  apps.push(clone(files[app]));
  var id = apps.length - 1;
  appOrder.push(id);
  if (!apps[id]) throw new Error("app " + app + " doesnt exist!");
  apps[id].canvas = document.createElement("canvas");
  apps[id].canvas.width = apps[id].w;
  apps[id].canvas.height = apps[id].h;
  apps[id].ctx = apps[id].canvas.getContext("2d");
  apps[id].wrs = 0;
  apps[id]._path = app;
  files[app + apps[id].s].s(curmouse, lastmouse, time, deltatime, size, apps[id], {x: apps[id].x + 1, y: apps[id].y + 11, w: apps[id].w, h: apps[id].h});
}
/**
@desc render and execute apps
@param {MouseData} currentMouse
@param {MouseData} lastMouse
@param {Number} time
@param {Number} deltatime
@param {ResArray} size - screen res
*/
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

/**
@desc render the bottom bar
@param {MouseData} currentMouse
@param {MouseData} lastMouse
@param {Number} time
@param {Number} deltatime
@param {ResArray} size - screen res
*/
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

/**
@desc determines app collision with point
@param {Number} x
@param {Number} y
*/
function appCollidingWith(x, y) {
  for (var i = appOrder.length-1; i >= 0; i--) {
    if (!apps[appOrder[i]]) continue;
    if (inBox(x, y, apps[appOrder[i]].x, apps[appOrder[i]].y, apps[appOrder[i]].w+3, apps[appOrder[i]].h+13)) {
      return appOrder[i];
    }
  }
  return null;
}

/**
@desc returns app obstruction status, bit 0 is on top, bit 1 is partial, bit 3 is full
@param {Number} appId - id of app
*/
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

/**
@desc Clone a basic object
@param {Object} object - object to clone
*/
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

/**
@desc it's a lerp, what'd ya expect
@param {Number} a
@param {Number} b
@param {Number} t
@param {Number} min
@param {Number} max
@returns {Number}
*/
function lerp(v0, v1, t, mi, ma) {
  return (v0*(1-t)+v1*t).clamp(mi || 0, ma || 1);
}

/**
@desc it's a lerp, what'd ya expect, it to be clamped? Nah
@param {Number} a
@param {Number} b
@param {Number} t
@returns {Number}
*/
function lerpUnclamped(v0, v1, t) {
  return v0*(1-t)+v1*t;
}

/**
@desc distance
@param {Number} ax
@param {Number} ay
@param {Number} bx
@param {Number} by
@returns {Number}
*/
function dist(ax, ay, bx, by) {
  var a = bx - ax, b = by - ay;
  return Math.sqrt((a*a)+(b*b));
}

/**
@desc point-box collision
@param {Number} pointX
@param {Number} pointY
@param {Number} boxX
@param {Number} boxY
@param {Number} boxWidth
@param {Number} boxHeight
@returns {Boolean}
*/
function inBox(px, py, x, y, w, h) {
  return px >= x && px <= x + w && py >= y && py <= y + h;
}

/**
@desc line-line collision
@param {ResObject} a1
@param {ResObject} a2
@param {ResObject} b1
@param {ResObject} b2
@returns {Boolean}
*/
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

/**
@desc rect-rect collision (no inside-handling)
@param {Number} x1
@param {Number} y1
@param {Number} w1
@param {Number} h1
@param {Number} x2
@param {Number} y2
@param {Number} w2
@param {Number} h2
@returns {Boolean}
*/
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

/**
@desc rect-rect collision (no outside-handling)
@param {Number} x1
@param {Number} y1
@param {Number} width1
@param {Number} height1
@param {Number} x2
@param {Number} y2
@param {Number} width2
@param {Number} height2
@returns {Boolean}
*/
function rectCoveringRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  // top-left
  if (!inBox(x1, y1, x2, y2, w2, h2)) return false;
  // bottom-right
  if (!inBox(x1+w1, y1+h1, x2, y2, w2, h2)) return false;
  return true;
}

/**
@desc render an image to buffer if loaded, does nothing if unloaded
@param {String} image - image path
@param {Number} x
@param {Number} y
@param {Number} width
@param {Number} height
*/
function drawImage(i, x, y, w, h) {
  i = images[i];
  if (!i) i = images["unk.svg"];
  if (!i) return;
  ctx.drawImage(i, x, y, w, h);
}

/**
@desc render an image to any contex if loaded, does nothing if unloaded
@param {String} image - image path
@param {Number} x
@param {Number} y
@param {Number} width
@param {Number} height
@param {Object} ctx - context
*/
function drawGlobalImage(i, x, y, w, h, c) {
  i = images[i];
  if (!i) i = images["unk.svg"];
  c.drawImage(i, x, y, w, h);
}

/**
@desc gets resolution of image, returns [192, 192] if unloaded
@param {String} image - image path
@returns {ResArray}
*/
function imageRes(i) {
  i = images[i];
  if (!i) i = images["unk"];
  return [i.width, i.height];
}

var _mousestate = [0, 0, 0, 0, 0, 0, 0];
var _mousestateo = [0, 0, 0, 0, 0, 0, 0];

/**
@desc get mouse state
@returns {MouseData}
*/
function mouse() {
  return _mousestate;
}
/**
@desc get old mouse state
@returns {MouseData}
*/
function omouse() {
  return _mousestateo;
}

/**
@desc shift mouse state
*/
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

/**
@desc (INTERNAL) used for events
*/
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
/**
@desc (INTERNAL) used for events
*/
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
var cursorHinting = true;

if (cursorCanvas) {
  setCursor("none");
}
/**
@desc (INTERNAL) set html cursor type
*/
function setCursor(n) {
  if (htmlCursor === n) return;
  //$("*").css("cursor", n);
  document.getElementById("c").style.cursor = n;
  htmlCursor = n;
}

/**
@desc draw cursor to context
@param {Object} context
@param {MouseData} currentMouse
@param {MouseData} lastMouse
@param {Boolean} cancelColor - cancels colorization
*/
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
    if (cursorHinting) {
      ctx.moveTo(Math.ceil(cm[0])-0.5, Math.ceil(cm[1])-0.5);
      ctx.lineTo(Math.ceil(cm[0])-0.5 + cs, Math.ceil(cm[1] + cs)-0.5);
      ctx.lineTo(Math.ceil(cm[0])-0.5 + cs * (1 - 2 / (2 + Math.SQRT2)), Math.ceil(cm[1] + cs)-0.5);
      ctx.lineTo(Math.ceil(cm[0])-0.5, Math.ceil(cm[1] + cs * (1 + 1 / (1 + Math.SQRT2)))-0.5);
      ctx.lineTo(Math.ceil(cm[0])-0.5, Math.ceil(cm[1])-0.5);
    } else {
      ctx.moveTo(cm[0], cm[1]);
      ctx.lineTo(cm[0] + cs, cm[1] + cs);
      ctx.lineTo(cm[0] + cs * (1 - 2 / (2 + Math.SQRT2)), cm[1] + cs);
      ctx.lineTo(cm[0], cm[1] + cs * (1 + 1 / (1 + Math.SQRT2)));
      ctx.lineTo(cm[0], cm[1]);
    }
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
    if (cursorHinting) {
      ctx.moveTo(Math.ceil(cm[0] + 2*cs/15)-0.5, Math.ceil(cm[1] - 2*cs/15)-0.5);
      if (ew) {
        ctx.lineTo(Math.ceil(cm[0] + 0.4*cs)-0.5, Math.ceil(cm[1] - 2*cs/15)-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 0.4*cs)-0.5, Math.ceil(cm[1] - 0.2*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 2*cs/3)-0.5, Math.ceil(cm[1])-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 0.4*cs)-0.5, Math.ceil(cm[1] + 0.2*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 0.4*cs)-0.5, Math.ceil(cm[1] + 2*cs/15)-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 2*cs/15)-0.5, Math.ceil(cm[1] + 2*cs/15)-0.5);
      }
      if (ns) {
        ctx.lineTo(Math.ceil(cm[0] + 2*cs/15)-0.5, Math.ceil(cm[1] + 0.4*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 0.2*cs)-0.5, Math.ceil(cm[1] + 0.4*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0])-0.5, Math.ceil(cm[1] + 2*cs/3)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 0.2*cs)-0.5, Math.ceil(cm[1] + 0.4*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 2*cs/15)-0.5, Math.ceil(cm[1] + 0.4*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 2*cs/15)-0.5, Math.ceil(cm[1] + 2*cs/15)-0.5);
      }
      if (ew) {
        ctx.lineTo(Math.ceil(cm[0] - 0.4*cs)-0.5, Math.ceil(cm[1] + 2*cs/15)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 0.4*cs)-0.5, Math.ceil(cm[1] + 0.2*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 2*cs/3)-0.5, Math.ceil(cm[1])-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 0.4*cs)-0.5, Math.ceil(cm[1] - 0.2*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 0.4*cs)-0.5, Math.ceil(cm[1] - 2*cs/15)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 2*cs/15)-0.5, Math.ceil(cm[1] - 2*cs/15)-0.5);
      }
      if (ns) {
        ctx.lineTo(Math.ceil(cm[0] - 2*cs/15)-0.5, Math.ceil(cm[1] - 0.4*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] - 0.2*cs)-0.5, Math.ceil(cm[1] - 0.4*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0])-0.5, Math.ceil(cm[1] - 2*cs/3)-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 0.2*cs)-0.5, Math.ceil(cm[1] - 0.4*cs)-0.5);
        ctx.lineTo(Math.ceil(cm[0] + 2*cs/15)-0.5, Math.ceil(cm[1] - 0.4*cs)-0.5);
      }
      ctx.lineTo(Math.ceil(cm[0] + 2*cs/15)-0.5, Math.ceil(cm[1] - 2*cs/15)-0.5);
    } else {
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
    }
    ctx.fill();
    ctx.stroke();
  }
}

/**
@desc creates wrapped text
@param {Object} context
@param {String} text - text to wrap
@param {Number} width - width of area
@param {Number} fontsize - size of font
@param {*} soft - i don't even know
*/
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

/**
@desc creates wrapped cursor
@param {Object} context
@param {String} text - text to wrap
@param {String} char - character to positionalate
@param {Number} pos - position of cursor
@param {Number} width - width of area
@param {Number} fontsize - size of font
*/
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

/**
@desc open a modal dialog
@param {String} title
@param {String} message
@param {String} image
@param {*} btns
@param {Number} width
@param {Number} height
@param {MouseData} currentMouse
@param {MouseData} lastMouse
@param {Number} time
@param {Number} delattime
@param {Number} size
*/
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
  constructor (contents, path) {
    this.data = contents;
    this.path = path !== undefined ? path : ""
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

/**
@desc delay
@param {Number} ms - miliseconds
*/
async function delay(ms) {
  return new Promise(yey => {
    setTimeout(yey, ms);
  })
}

/**
@desc (INTERNAL) BSOD screen
*/
async function error(m, s, l, c) {
  var ctx = ctxscr;
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

/**
@desc (INTERNAL) BSOD screen
*/
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

/**
@desc (INTERNAL) BSOD screen
*/
function randomLen(c) {
  if (c < 2) return '';
  return Math.floor(Math.random()*10).toString() + randomLen(c - 1);
}

class Vector4 {
  constructor(x1, x2, x3, x4) {
    this.x1 = x1 !== undefined ? x1 : 1;
    this.x2 = x2 !== undefined ? x2 : 1;
    this.x3 = x3 !== undefined ? x3 : 1;
    this.x4 = x4 !== undefined ? x4 : 1;
  }
  multiply(m) {
    return new Vector4(
      m.x11 * this.x1 + m.x12 * this.x2 + m.x13 * this.x3 + m.x14 * this.x4,
      m.x21 * this.x1 + m.x22 * this.x2 + m.x23 * this.x3 + m.x24 * this.x4,
      m.x31 * this.x1 + m.x32 * this.x2 + m.x33 * this.x3 + m.x34 * this.x4,
      m.x41 * this.x1 + m.x42 * this.x2 + m.x43 * this.x3 + m.x44 * this.x4
    );
  }
  toVector3() {
    return new Vector3(
      this.x1,
      this.x2,
      this.x3
    );
  }
}

class Matrix4x4 {
  constructor(x1, x2, x3, x4) {
    this.x11 = x1.x1 !== undefined ? x1.x1 : 1;
    this.x12 = x1.x2 !== undefined ? x1.x2 : 0;
    this.x13 = x1.x3 !== undefined ? x1.x3 : 0;
    this.x14 = x1.x4 !== undefined ? x1.x4 : 0;
    this.x21 = x2.x1 !== undefined ? x2.x1 : 0;
    this.x22 = x2.x2 !== undefined ? x2.x2 : 1;
    this.x23 = x2.x3 !== undefined ? x2.x3 : 0;
    this.x24 = x2.x4 !== undefined ? x2.x4 : 0;
    this.x31 = x3.x1 !== undefined ? x3.x1 : 0;
    this.x32 = x3.x2 !== undefined ? x3.x2 : 0;
    this.x33 = x3.x3 !== undefined ? x3.x3 : 1;
    this.x34 = x3.x4 !== undefined ? x3.x4 : 0;
    this.x41 = x4.x1 !== undefined ? x4.x1 : 0;
    this.x42 = x4.x2 !== undefined ? x4.x2 : 0;
    this.x43 = x4.x3 !== undefined ? x4.x3 : 0;
    this.x44 = x4.x4 !== undefined ? x4.x4 : 1;
  }
}

class Vector2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  toScreen(w, h) {
    return new Vector2(
      this.x*w,
      this.y*h
    );
  }
  rotate(a) {
    return new Vector2(
      Math.cos(a)*(this.x)-Math.sin(a)*(this.y),
      Math.cos(a)*(this.y)+Math.sin(a)*(this.x)
    );
  }
  translate(o) {
    return new Vector2(
      this.x + o.x,
      this.y + o.y
    );
  }
  scale(o) {
    return new Vector2(
      this.x * o.x,
      this.y * o.y
    );
  }
}

class Vector3 {
  constructor(x, y, z) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
    this.z = z !== undefined ? z : 0;
  }
  cast(c, o) {
    var s = o ? 1 : c.d / this.z;
    return new Vector2(this.x * s, this.y * s);
  }
  toVector4() {
    return new Vector4(
      this.x,
      this.y,
      this.z,
      1
    )
  }
}

class Tri2D {
  constructor(p1, p2, p3) {
    this.p1 = p1 !== undefined ? p1 : new Vector2();
    this.p2 = p2 !== undefined ? p2 : new Vector2();
    this.p3 = p3 !== undefined ? p3 : new Vector2();
  }
  toScreen(w, h) {
    return new Tri2D(
      this.p1.toScreen(w, h),
      this.p2.toScreen(w, h),
      this.p3.toScreen(w, h)
    );
  }
  rotate(a) {
    return new Tri2D(
      this.p1.rotate(a),
      this.p2.rotate(a),
      this.p3.rotate(a)
    );
  }
  translate(o) {
    return new Tri2D(
      this.p1.translate(o),
      this.p2.translate(o),
      this.p3.translate(o)
    )
  }
  scale(o) {
    return new Tri2D(
      this.p1.scale(o),
      this.p2.scale(o),
      this.p3.scale(o)
    )
  }
  // yes one liner
  orientation() {var a=this;return Math.sign((a.p2.y-a.p1.y)*(a.p3.x-a.p2.x)-(a.p2.x-a.p1.x)*(a.p3.y-a.p2.y))%3}
}

class Tri3D {
  constructor(p1, p2, p3) {
    this.p1 = p1 !== undefined ? p1 : new Vector3();
    this.p2 = p2 !== undefined ? p2 : new Vector3();
    this.p3 = p3 !== undefined ? p3 : new Vector3();
  }
  cast(c, o) {
    return new Tri2D(
      this.p1.cast(c, o),
      this.p2.cast(c, o),
      this.p3.cast(c, o)
    );
  }
  multiply(m) {
    return new Tri3D(
      this.p1.toVector4().multiply(m).toVector3(),
      this.p2.toVector4().multiply(m).toVector3(),
      this.p3.toVector4().multiply(m).toVector3()
    )
  }
  inCamera() {
    return this.p1.z > 0 || this.p2.z > 0 || this.p3.z > 0;
  }
}

class Camera3D {
  constructor(d) {
    this.d = d !== undefined ? d : 1;
  }
}

class MeshTri {
  constructor(p1, p2, p3, oc, fc, uv1, uv2, uv3, txid) {
    this.p1 = p1 !== undefined ? p1 : new Vector3();
    this.p2 = p2 !== undefined ? p2 : new Vector3();
    this.p3 = p3 !== undefined ? p3 : new Vector3();
    this.oc = oc !== undefined ? oc : new Vector4(255, 255, 255, 255);
    this.fc = fc !== undefined ? fc : new Vector4(255, 0,   0,   255);
    this.uv1 = uv1 !== undefined ? uv1 : new Vector2();
    this.uv2 = uv2 !== undefined ? uv2 : new Vector2();
    this.uv3 = uv3 !== undefined ? uv3 : new Vector2();
    this.txid = txid !== undefined ? txid : 0;
  }
  tri() {
    return new Tri3D(
      this.p1,
      this.p2,
      this.p3
    )
  }
}

class Mesh {
  constructor(tris) {
    this.tris = tris !== undefined ? tris : [];
  }
  render(ctx, convert, x, y, w, h, textures) {
    var screentris = [];
    for (var i = 0, len = this.tris.length; i < len; i++) {
      ctx.strokeStyle = "rgba(" + this.tris[i].oc.x1 + ", " + this.tris[i].oc.x2 + ", " + this.tris[i].oc.x3 + ", " + this.tris[i].oc.x4 + ")";
      ctx.fillStyle = "rgba(" + this.tris[i].fc.x1 + ", " + this.tris[i].fc.x2 + ", " + this.tris[i].fc.x3 + ", " + this.tris[i].fc.x4 + ")";
      var tri = convert(this.tris[i].tri());
      if (!tri.inCamera()) continue; // tri is outside camera
      tri = tri.cast(cam);
      if (tri.orientation() !== 1) continue; // tri on back side
      tri = tri.toScreen(w, -h).translate(new Vector2(x, y))
      drawTriangle(ctx, tri);
      screentris.push(tri);
    }
    return screentris;
  }
}

var triscale = 8;
var tritype = 2;
// 0-js
// 1-classic
// 2-torus

function drawTriangle(c, tri, triuv) {
  if (tritype === 0) {
    c.beginPath();
    c.moveTo(tri.p1.x, tri.p1.y);
    c.lineTo(tri.p2.x, tri.p2.y);
    c.lineTo(tri.p3.x, tri.p3.y);
    c.lineTo(tri.p1.x, tri.p1.y);
    c.fill();
    c.stroke();
  } else if (tritype === 1) {
    classic_drawTri(
      Math.round(tri.p1.x/triscale), Math.round(tri.p1.y/triscale),
      Math.round(tri.p2.x/triscale), Math.round(tri.p2.y/triscale),
      Math.round(tri.p3.x/triscale), Math.round(tri.p3.y/triscale),
      c
    );
  } else if (tritype === 2) {

  }
}

function classichelper_hline(x, y, l, ctx) {
  for (var i = 0; i < l; i++) {
    ctx.fillRect(Math.round(x + i)*triscale, Math.round(y)*triscale, triscale, triscale);
  }
}

function textureMap(ctx, texture, pts) {
  var x0 = pts[0].x, x1 = pts[1].x, x2 = pts[2].x;
  var y0 = pts[0].y, y1 = pts[1].y, y2 = pts[2].y;
  var u0 = pts[0].u, u1 = pts[1].u, u2 = pts[2].u;
  var v0 = pts[0].v, v1 = pts[1].v, v2 = pts[2].v;

  // Set clipping area so that only pixels inside the triangle will
  // be affected by the image drawing operation
  ctx.save(); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2); ctx.closePath(); ctx.clip();

  // Compute matrix transform
  var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
  var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
  var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
  var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2
                - v0*u1*x2 - u0*x1*v2;
  var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
  var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
  var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2
                - v0*u1*y2 - u0*y1*v2;

  // Draw the transformed image
  ctx.transform(delta_a/delta, delta_d/delta,
                delta_b/delta, delta_e/delta,
                delta_c/delta, delta_f/delta);
  ctx.drawImage(texture, 0, 0);
  ctx.restore();
}

function classic_drawTri(x0, y0, x1, y1, x2, y2, ctx) {
  /* thx me */
  // thx adafruit
  var a, b, y, last;
  if (y0 > y1) {
      var i = y0;
      y0 = y1;
      y1 = i;
      var i = x0;
      x0 = x1;
      x1 = i;
  }
  if (y1 > y2) {
      var i = y2;
      y2 = y1;
      y1 = i;
      var i = x2;
      x2 = x1;
      x1 = i;
  }
  if (y0 > y1) {
      var i = y0;
      y0 = y1;
      y1 = i;
      var i = x0;
      x0 = x1;
      x1 = i;
  }
  if (y0 == y2) {
      a = b = x0;
      if (x1 < a) a = x1;
      else if (x1 > b) b = x1;
      if (x2 < a) a = x2;
      else if (x2 > b) b = x2;
      classichelper_hline(a, y0, b - a, ctx);
  } else {
      var dx01 = x1 - x0;
      var dy01 = y1 - y0;
      var dx02 = x2 - x0;
      var dy02 = y2 - y0;
      var dx12 = x2 - x1;
      var dy12 = y2 - y1;
      var sa = 0;
      var sb = 0;
      if (y1 == y2) last = y1;
      else last = y1 - 1;
      for (y = y0; y < last; y++) {
          a = x0 + sa / dy01;
          b = x0 + sb / dy02;
          sa += dx01;
          sb += dx02;
          if (a > b) {
              var i = a;
              a = b;
              b = i;
          }
          classichelper_hline(a, y, b - a, ctx);
      }
      sa = dx12 * (y - y1);
      sb = dx02 * (y - y0);
      for (; y <= y2; y++) {
          a = x1 + sa / dy12;
          b = x0 + sb / dy02;
          sa += dx12;
          sb += dx02;
          if (a > b) {
              var i = a;
              a = b;
              b = i;
          }
          classichelper_hline(a, y, b - a, ctx);
      }
  }
}

var cam = new Camera3D(1);
var cubeMesh = new Mesh([
  // front
  new MeshTri(
    new Vector3(-0.5,  0.5, -0.5),
    new Vector3( 0.5,  0.5, -0.5),
    new Vector3( 0.5, -0.5, -0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(1, 1),
    0
  ),
  new MeshTri(
    new Vector3(-0.5, -0.5, -0.5),
    new Vector3(-0.5,  0.5, -0.5),
    new Vector3( 0.5, -0.5, -0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(0, 1),
    new Vector2(0, 0),
    new Vector2(1, 1),
    0
  ),
  // back
  new MeshTri(
    new Vector3( 0.5,  0.5,  0.5),
    new Vector3(-0.5,  0.5,  0.5),
    new Vector3( 0.5, -0.5,  0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(1, 0),
    new Vector2(0, 0),
    new Vector2(1, 1),
    0
  ),
  new MeshTri(
    new Vector3(-0.5,  0.5,  0.5),
    new Vector3(-0.5, -0.5,  0.5),
    new Vector3( 0.5, -0.5,  0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(0, 0),
    new Vector2(0, 1),
    new Vector2(1, 1),
    0
  ),
  // top
  new MeshTri(
    new Vector3(-0.5,  0.5,  0.5),
    new Vector3( 0.5,  0.5,  0.5),
    new Vector3( 0.5,  0.5, -0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(0, 1),
    new Vector2(1, 1),
    new Vector2(1, 0),
    0
  ),
  new MeshTri(
    new Vector3(-0.5,  0.5, -0.5),
    new Vector3(-0.5,  0.5,  0.5),
    new Vector3( 0.5,  0.5, -0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(0, 0),
    new Vector2(0, 1),
    new Vector2(1, 0),
    0
  ),
  // bottom
  new MeshTri(
    new Vector3( 0.5, -0.5,  0.5),
    new Vector3(-0.5, -0.5,  0.5),
    new Vector3( 0.5, -0.5, -0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(0, 1),
    0
  ),
  new MeshTri(
    new Vector3(-0.5, -0.5,  0.5),
    new Vector3(-0.5, -0.5, -0.5),
    new Vector3( 0.5, -0.5, -0.5),
    new Vector4(0,   0, 255, 255),
    new Vector4(0,   0, 255, 255),
    new Vector2(1, 0),
    new Vector2(1, 1),
    new Vector2(0, 1),
    0
  ),
  // left
  new MeshTri(
    new Vector3(-0.5,  0.5,  0.5),
    new Vector3(-0.5,  0.5, -0.5),
    new Vector3(-0.5, -0.5,  0.5),
    new Vector4(0,  64, 192, 255),
    new Vector4(0,  64, 192, 255),
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(0, 1),
    0
  ),
  new MeshTri(
    new Vector3(-0.5, -0.5, -0.5),
    new Vector3(-0.5, -0.5,  0.5),
    new Vector3(-0.5,  0.5, -0.5),
    new Vector4(0,  64, 192, 255),
    new Vector4(0,  64, 192, 255),
    new Vector2(1, 1),
    new Vector2(0, 1),
    new Vector2(1, 0),
    0
  ),
  // right
  new MeshTri(
    new Vector3( 0.5,  0.5, -0.5),
    new Vector3( 0.5,  0.5,  0.5),
    new Vector3( 0.5, -0.5,  0.5),
    new Vector4(0,  64, 192, 255),
    new Vector4(0,  64, 192, 255),
    new Vector2(0, 1),
    new Vector2(1, 0),
    new Vector2(1, 0),
    0
  ),
  new MeshTri(
    new Vector3( 0.5, -0.5,  0.5),
    new Vector3( 0.5, -0.5, -0.5),
    new Vector3( 0.5,  0.5, -0.5),
    new Vector4(0,  64, 192, 255),
    new Vector4(0,  64, 192, 255),
    new Vector2(1, 0),
    new Vector2(1, 1),
    new Vector2(0, 1),
    0
  ),
]);
