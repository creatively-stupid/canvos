var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    os = require('os'),
    open = require("open"),
    io = require("socket.io")(1337);

var fileExtensions = JSON.parse(fs.readFileSync("./extensions.json", { encoding: "utf-8" }));

var CustomError=(name="CustomError",message="")=>{Error.call(message);this.name=name;this.message=message;};CustomError.prototype=Error.prototype;

argvProperties = [
    [
    ],
    [
        ["num", "-port", 80, false],
        ["bool", "-ip", false, false],
        ["bool", "-ext", false, false],
        ["bool", "-noopen", false, false],
    ]
];
argvs = parseArgvs(process.argv, argvProperties);

if (!argvs["-noopen"]) {
    open("http://localhost:" + argvs["-port"].toString() + "/index.html");
    process.stdout.write("\nopened!");
}

if (argvs["-ip"]) {
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
                process.stdout.write("\non " + ifname + ':' + alias + ": http://" + iface.address + ":" + argvs["-port"] + "/index.html");
            } else {
                // this interface has only one ipv4 adress
                process.stdout.write("\non " + ifname + ': http://' + iface.address + ":" + argvs["-port"] + "/index.html");
            }
            ++alias;
        });
    });
}
console.log();

process.on('SIGINT', function() {
    server.close();
    console.log("\nExiting...");
    process.exit(0);
});

var lastIp = "";

var server = http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	/*if (q.pathname === "/exit") {
		res.end("closed");
		server.close();
		process.exit(0);
	}*/
    var filename = "./App" + q.pathname;
    var newIp = req.connection.remoteAddress.toString();
    if (newIp !== lastIp) {
        lastIp = newIp;
        process.stdout.write("\n" + "From " + newIp + ":");
    }
    process.stdout.write("\n" + filename + " " + req.method);
    if (!argvs["-ext"] && ["::1", "::ffff:127.0.0.1"].indexOf(req.socket.remoteAddress) === -1) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end("403 Forbidden: non-local access. Yeah you could probably bypass this, but don't");
        return;
    }
    if (req.method === "POST") {
        var body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            var data = JSON.parse(Buffer.concat(body).toString()),
                request = data.request;
            data = data.data;

        });
    } else if (req.method === "GET") {
        fs.stat(filename, function (err, stats) {
            if (res.err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("404 Not Found: res error");
                //throw res.err;
                return;
            }
            if (stats === undefined) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end("404 Not Found: stats error");
            }
            var dirt = filename[filename.length-1] == '/'; // stats.isDirectory is weird
            if (filename.startsWith("./App/fs/")) {
                if (dirt) {
                    if (q.query.recurse === '') {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(recurseFolder(filename)));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        var out = {"folder": {}};
                        fs.readdirSync(filename).forEach(file => {
                            out.folder[file] = true;
                        });
                        res.write(JSON.stringify(out));
                        res.end();
                    }
                } else {
                    process.stdout.write(" " + stats.size.toString() + "B");
                    fs.readFile(filename, function (err, data) {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end("404 Not Found: fs error");
                            //throw err;
                            return;
                        }
                        var i = filename.split(".");
                        var ext = fileExtensions[i[i.length - 1]]
                        res.writeHead(200, { 'Content-Type': ext ? ext : "application/octet-stream" });
                        res.write(data);
                        res.end();
                    });
                }
            } else {
                process.stdout.write(" " + stats.size.toString() + "B");
                fs.readFile(filename, function (err, data) {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end("404 Not Found: fs error");
                        //throw err;
                        return;
                    }
                    var i = filename.split(".");
                    var ext = fileExtensions[i[i.length - 1]]
                    res.writeHead(200, { 'Content-Type': ext ? ext : "application/octet-stream" });
                    res.write(data);
                    return res.end();
                });
            }
        });
    }
}).listen(argvs["-port"]);
process.stdout.write("running on port " + argvs["-port"]);
function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

var stdin = process.openStdin();

var handleData = function(d) {
    var str = d.toString().trim();

};

stdin.addListener("data", handleData);

function parseArgvs(argv, properties = []) {
    var pr = properties;
    var outVals = {};
    argv = fixArgvs(argv);
    for (var i = 0; i < pr[1].length; i++) {
        outVals[pr[1][i][1]] = pr[1][i][2];
    }
    for (var i = 0; i < pr[0].length; i++) {
        var t = rollbackType(argv[i], pr[0][i][2] ? pr[0][i][0] : "none");
        if (t[0] === pr[0][i][0]) {
            outVals[pr[0][i][1]] = t[1];
        } else {
            //throw new CustomError("ArgvError", "type mismatch");
            return {"_argvError": "static ArgvTypeMismatch at " + i.toString() + " (" + JSON.stringify(argv[i]) + "). For help, contact <@!368452225988558859> because he is responsible for it."};
        }
    }
    for (var i = 0; i < pr[1].length; i++) {
        var t = argv.indexOf(pr[1][i][1]);
        var debugT = t;
        if (t !== -1) {
            if (pr[1][i][0] === "bool") {
                outVals[pr[1][i][1]] = true;
            } else {
                t = rollbackType(argv[t + 1], pr[1][i][3] ? pr[1][i][0] : "none");
                if (t[0] === pr[1][i][0]) {
                    outVals[pr[1][i][1]] = t[1];
                } else {
                    //throw new CustomError("ArgvError", "type mismatch");
                    return {"_argvError": "dynamic ArgvTypeMismatch at " + i.toString() + "/" + (i+1).toString() + " (" + argv[debugT] + " " + argv[debugT + 1] + "). " + cfgData.extras.helpmsg};
                }
            }
        }
    }
    return outVals;
}
function getType(value) {
    var t;
    t = parseFloat(value);
    if (value === "NaN" || !Number.isNaN(t)) {
        return ["num", t];
    }
    t = "JSON parse failed!";
    try {
        t = JSON.parse(value);
    } catch (err) {
        t = "JSON parse failed!";
    }
    if (t !== "JSON parse failed!") {
        if (t && typeof t === 'object' && t.constructor === Array) return ["arr", t];
        if (t && typeof t === 'object' && t.constructor === Object) return ["obj", t];
    }
    if (value === "true" || value === "false") {
        return ["bool", value === "true" ? true : false];
    }
    if (value === "undefined" || value === "null") return ["null", null];
    return ["str", value];
}
function rollbackType(value, rollback = "none") {
    if (value === undefined || value === null) return ["null", null];
    if (rollback === "none") {
        return getType(value);
    }
    var type = getType(value);
    if (type[1] === null || type[1] === undefined) {
        return ["null", null];
    }
    if (rollback === "str") {
        if (type[0] === "obj" || type[0] === "arr") {
            return ["str", JSON.stringify(type[1])];
        }
        return ["str", type[1].toString()];
    } else if (rollback === "null") {
        return ["null", null];
    } else if (rollback === "bool") {
        return ["bool", type[1] ? true : false];
    } else if (rollback === "obj") {
        if (type[0] === "obj") {
            return type;
        }
        if (type[0] === "arr") {
            var outobj = {};
            for (var i = 0; i < type[1].length; i++) {
                outobj[i.toString()] = type[1][i];
            }
            return ["obj", outobj];
        }
        return ["obj", {}];
    } else if (rollback === "arr") {
        if (type[0] === "arr") {
            return type;
        }
        if (type[0] === "obj") {
            var outarr = [];
            for (var i of type[1]) {
                outarr.push(i);
                outarr.push(type[1][i]);
            }
            return ["arr", outarr];
        }
        return ["arr", []];
    } else if (rollback === "num") {
        return ["num", NaN];
    }
}
function fixArgvs(argv) {
    for (var i = 0; i < argv.length; i++) {
        if (argv[i][argv[i].length - 1] === "\\") {
            argv[i] = argv[i].slice(0, -1) + " " + argv[i+1];
            argv.splice(i + 1, 1);
            i--;
        }
    }
    return argv;
}


function folderHtmlView(arr) {
    var o = "<!DOCTYPE html><html><head><meta charset='utf-8'></head><body><ul><li><a href=\"../?nojson\">..</a></li>"
    for (var i = 0; i < arr.length; i++) {
        o += "<li><a href=\"./" + encodeURIComponent(arr[i]) + "?nojson\">" + arr[i] + "</a></li>";
    }
    o += "</ul></body></html>";
    return o;
}

function recurseFolder(folder) {
    var out = {"folder": {}};
    var remaining = 0;
    fs.readdirSync(folder).forEach(file => {
        remaining++;
        out.folder[file] = true;
        process.stdout.write("\n -" + folder + file);
        var stats = fs.statSync(folder + file);
        if (stats.isDirectory()) {
            out.folder[file] = recurseFolder(folder + file + "/");
        } else {
            out.folder[file] = {"file": fs.readFileSync(folder + file).toString()};
        }
    });
    return out;
}
