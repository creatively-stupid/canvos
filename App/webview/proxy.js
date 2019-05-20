var http = require('http'),
    https = require('https'),
    url = require('url'),
    fs = require('fs'),
    os = require('os');
    var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            process.stdout.write("\n" + ifname + ':' + alias + ": " + iface.address);
        } else {
            // this interface has only one ipv4 adress
            process.stdout.write("\n" + ifname + ': ' + iface.address);
        }
        ++alias;
    });
});
console.log();

process.on('SIGINT', function() {
    server.close();
    console.log("\nExiting...");
    process.exit(0);
});

var host = 'https://www.google.com/';

var server = http.createServer(function (req, res) {
    var urll = host + decodeURIComponent(req.url.slice(1));
    console.log("request: " + urll);
    https.get(urll, (resp) => {
        var data = '';

        resp.on('data', (chunk) => {
            //console.log("data");
            res.write(chunk);
            data += chunk;
        });
      
        resp.on('end', () => {
            res.writeHead(resp.statusCode, resp.headers);
            console.log("end: " + resp.statusCode);
            res.end();
        });
        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}).listen(3000);