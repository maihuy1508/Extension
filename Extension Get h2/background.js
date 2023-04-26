
const ulElement = document.getElementById("ul-el")

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    // LOG THE CONTENTS HERE
    console.log(request.content);

    // GET ALL H2 TAGS IN THE CONTENT
    var h2Tags = request.content.match(/<h2.*?>(.*?)<\/h2>/gi);

    // ENCODE THE H2 TAGS
    var encodedH2Tags = encodeURIComponent(h2Tags.join('\n'));

    // CREATE A NEW WINDOW TO DISPLAY THE ENCODED H2 TAGS
    var html = '<html><head><style>h2 {font-weight: bold;font-size: 30px;align-items: center;}body {font-family: "Segoe UI", Helvetica, Arial, sans-serif;}</style></head><body>';
    
    // ADD NUMBERING TO EACH H2 TAG
    for (var i = 0; i < h2Tags.length; i++) {
      html += '<h2 class="h2-number" id="h2' + i + '">' + h2Tags[i] + '</h2>';
    }

    html += '</body></html>'; 
    
    
    
    // CREATE A NEW WINDOW TO DISPLAY THE ENCODED H2 TAGS
    let listItems = "<div style='font-weight:bold;font-size:30px;color:red;  text-align: center;'>There are " + h2Tags.length + " < 'h2' > tags in all</div>";

    chrome.windows.create({url: 'data:text/html,'+encodeURIComponent('<html><head><style>h2{font-weight: bold;font-size:30px; align-items: center;};.h2-number:before {content: counter(section);counter-increment: section;};.h2-number:before {content: counter(section);counter-increment: section;}body{font-family: "Segoe UI", Helvetica, Arial, sans-serif;}</style></head><body></body></html>') + listItems + encodedH2Tags});
  });

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {
    code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
  });
});
