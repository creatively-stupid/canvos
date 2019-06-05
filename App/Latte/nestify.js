function nestify(tokens) {
  var nest = "";
  var nestIds = [];
  var nestObj = [];
  var seek = (obj, arr) => {
    //console.log(obj, arr);
    if (arr.length === 0) return obj;
    return seek(obj[arr[0]].inside, arr.slice(1));
  };
  var currentObj = () => seek(nestObj, nestIds);
  var commenting = 0;
  for (var i = 0, len = tokens.length; i < len; i++) {
    var token = tokens[i][0];
    var tokenType = tokens[i][1];
    if (commenting === 1) {

    } else if (commenting === 2) {

    }
    if (token === "\\") {
      i++;
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "escaped",
          value: tokens[i][0],
        });
      } else {
        currentObj()[0].value += tokens[i][0];
      }
      continue;
    }
    if (tokenType === 1) {
      if (token === "\"") {
        if (nest[nest.length - 1] === "\"") {
          nest = nest.slice(0, -1);
          nestIds.pop();
          //console.log("\"");
        } else {
          nest += "\"";
          currentObj().push({
            type: "quote",
            value: "\"\"",
            inside: [{
              type: "quote data",
              value: ""
            }]
          });
          nestIds.push(currentObj().length - 1);
          //console.log("\"");
        }
      } else if (token === "'") {
        if (nest[nest.length - 1] === "'") {
          nest = nest.slice(0, -1);
          nestIds.pop();
          //console.log("'");
        } else {
          nest += "'";
          currentObj().push({
            type: "quote",
            value: "''",
            inside: [{
              type: "quote data",
              value: ""
            }]
          });
          nestIds.push(currentObj().length - 1);
          //console.log("'");
        }
      } else if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        if (token === "(") {
          nest += "(";
          currentObj().push({
            type: "bracket",
            value: "()",
            inside: []
          });
          nestIds.push(currentObj().length - 1);
          //console.log("(");
        } else if (token === ")") {
          if (nest[nest.length - 1] === "(") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log(")");
          } else throw new Error("Unbalanced ()!");
        } else if (token === "[") {
          nest += "[";
          currentObj().push({
            type: "bracket",
            value: "[]",
            inside: []
          });
          nestIds.push(currentObj().length - 1);
          //console.log("[");
        } else if (token === "]") {
          if (nest[nest.length - 1] === "[") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log("]");
          } else throw new Error("Unbalanced []!");
        } else if (token === "{") {
          nest += "{";
          currentObj().push({
            type: "bracket",
            value: "{}",
            inside: []
          });
          nestIds.push(currentObj().length - 1);
          //console.log("{");
        } else if (token === "}") {
          if (nest[nest.length - 1] === "{") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log("}");
          } else throw new Error("Unbalanced {}!");
        } else if (token === "<<") {
          if (tokens[i-1][0] === "Function") {
            nest += "<";
            currentObj().push({
              type: "bracket",
              value: "<>",
              inside: []
            });
            nestIds.push(currentObj().length - 1);
            //console.log("<");
          }
        } else if (token === ">>") {
          if (nest[nest.length - 1] === "<") {
            nest = nest.slice(0, -1);
            nestIds.pop();
            //console.log(">");
          }
        } else {
          if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
            currentObj().push({
              type: "operation",
              value: token
            });
          } else {
            currentObj()[0].value += token;
          }
        }
      } else {
        if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
          currentObj().push({
            type:  "operation",
            value: token
          });
        } else {
          currentObj()[0].value += token;
        }
      }
    } else if (tokenType === 2) {
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "padding",
          value: token
        });
      } else {
        currentObj()[0].value += token;
      }
    } else {
      if (["\"", "'"].indexOf(nest[nest.length - 1]) === -1) {
        currentObj().push({
          type: "name/value",
          value: token
        });
      } else {
        currentObj()[0].value += token;
      }
    }
  }
  if (nest !== "") throw new Error("Unbalanced Brackets!");
  return nestObj;
}
