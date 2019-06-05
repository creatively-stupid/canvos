var r = (curmouse, lastmouse, time, deltatime, size, app, win) => {
	app.ctx.font = "400 " + app.size + "px mono";
	app.ctx.fillStyle = "#ffffff";
	app.ctx.textBaseline = "bottom";
	app.ctx.textAlign = "left";

}
var s = (curmouse, lastmouse, time, deltatime, size, app, win) => {
	app.lta = fs.seek("apps/terminal/");
}
return {r: r, s: s};
