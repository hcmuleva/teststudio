var HttpSender = Java.type('org.parosproxy.paros.network.HttpSender');
var ScriptVars = Java.type('org.zaproxy.zap.extension.script.ScriptVars');

var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var StandardOpenOption = Java.type('java.nio.file.StandardOpenOption');

// Change this as required - this works well in Docker as long as a suitable local directory has been mapped to it
var f = Paths.get('/zap/wrk/req-resp-log.txt');
function appendToFile(str) {
        Files.write(f, str.toString().getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
}

function sendingRequest(msg, initiator, helper) {

  // add Authorization header to all request
    var token = "";
    var temp_token_file = Paths.get('/zap/wrk/temp_auth_token.txt');
    var file_content = Files.readAllLines(temp_token_file);
    token = file_content[0];
    msg.getRequestHeader().setHeader("Authorization", "Bearer " + token);
}

function responseReceived(msg, initiator, helper) {}