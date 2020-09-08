if (document.getElementById("check")){
    document.getElementById("check").addEventListener("click", disableEnable);
}

chrome.storage.local.get('disabled', function (result) {
    if(result.disabled) {
        if (result.disabled === "1"){
            document.getElementById("check").className = 'on';
            document.getElementById("check").innerText = 'REDACTING';
        }
        else{
            document.getElementById("check").className = 'off';
            document.getElementById("check").innerText = 'REDACT';
        }
    }
    else{
        chrome.storage.local.set({disabled: "0"});
    }
});

function disableEnable(){
    chrome.storage.local.get('disabled', function (result) {
        if(result.disabled) {
            if (result.disabled === "1"){
                chrome.storage.local.set({disabled: "0"});

                document.getElementById("check").className = 'off';
                document.getElementById("check").innerText = 'REDACT';

            }
            else{
                chrome.storage.local.set({disabled: "1"});

                document.getElementById("check").className = 'on';
                document.getElementById("check").innerText = 'REDACTING';

            }
        }
        else{
            chrome.storage.local.set({disabled: "0"});
            document.getElementById("check").className = 'off';
        }
    });
}
