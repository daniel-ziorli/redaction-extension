
chrome.storage.local.get('disabled', function (result) {
    //console.log(result);
    if(result.disabled === "1") {
        getAndReplaceNames(0);
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      //console.log(request.url);

      if (request.message === 'pageUpdate') {
        chrome.storage.local.get('disabled', function (result) {
            //console.log(result);
            if(result.disabled === "1") {
                getAndReplaceNames(500);
            }
        });
      }
  });

function findAndReplace(word){
    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var searchMask = word;
                var regEx = new RegExp(searchMask, "ig");
                var replaceMask = 'NAME';

                var replacedText = text.replace(regEx, replaceMask);

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}



function getAndReplaceNames(delayed){

    var delay = ( function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    delay(function(){
        chrome.runtime.sendMessage(
            {contentMessage: "getNames", data: document.body.innerText.replace(/\n/g, " ")},
            function(response) {
                //console.log(response.data);
                response.data.forEach(element => {
                    //console.log(element)
                    findAndReplace(element);
                });
            }
        );
    }, delayed );
    
}