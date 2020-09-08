
chrome.runtime.onMessage.addListener(
  function(request, response, sendResponse) {
    if (request.contentMessage == "getNames") {

      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "ZgpROyYG214k11IH0eUmr4KFlNHvpl6m5mk8fsfc");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"data": request.data});
      //console.log(raw);

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };
      fetch("https://qqk7wusc51.execute-api.ca-central-1.amazonaws.com/test/comprehendsitetext", requestOptions)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            //console.log(data.body);
            sendResponse({data: data.body});
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
      return true;  // Will respond asynchronously.
    }
});

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'pageUpdate'
      })
    }
  }
);