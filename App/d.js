var c = document.getElementById("c");
var ctx = c.getContext("2d");
if (window.displayport === undefined) window.close();
c.width = window.displayport.width;
c.height = window.displayport.height;
function frame() {
    ctx.drawImage(window.displayport.canvas, window.displayport.offx, window.displayport.offy);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);