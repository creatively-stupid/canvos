QRCode.toCanvas("http://192.168.1.130/index.html?id=123456789ABCDEF", {errorCorrectionLevel: 'H'}, (err, qrcode) => {
  if (err) throw err;

  var canvas = document.getElementById("qrcode");
  canvas.width = qrcode.width;
  canvas.height = qrcode.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(qrcode, 0, 0, canvas.width, canvas.height);
});
