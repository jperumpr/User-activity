chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("open logging started")
        var http = new XMLHttpRequest();
        var endpoint = "http://localhost:3000/users/logActivity";
        var json_msg = JSON.stringify({type: request["type"], content: request["content"], id: request["id"]});
        http.open("POST", endpoint);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(json_msg);
        console.log("open logging finished")

});

chrome.browserAction.onClicked.addListener(function(activeTab) {
    console.log("click action logged");
});