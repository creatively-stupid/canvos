var server;

exec = require("child_process").exec;

var execSh = function(command, cb) {
  var child = exec(command, function(err, stdout, stderr){
    if (err != null){
      return cb(new Error(err), null);
    } else if (typeof stderr != "string") {
      return cb(new Error(stderr), null);
    } else {
      return cb(null, stdout);
    }
  });
}

function Check() {
  if (require("os").platform() === "linux") {
    process.stdout.write("\nupdater starting...")
    execSh("git pull", (e, m) => {
      if (e) process.stdout.write("\nupdater ERR: " + e);
      else {
        if (m.toString() == "Already up-to-date.\n") {
          process.stdout.write("\nup to date");
          process.stdout.write("\nupdater done.");
          startServer();
        } else {
          process.stdout.write("\nupdating... Please restart the program");
          startServer();
        }
      }
    });
  }
}

Check();

function startServer() {
  if (server && server.quit) server.quit();
  server = require("./server.js");
}
