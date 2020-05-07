// KidSaveVideo 
// Authored by David W. Jeske
// Licensed as free open-source in the Public Domain

// inspired by safeyoutube.net and Wessam El Mahdy


chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {
   var URL = tab.url;
   if (tab.pendingUrl) {
       console.log("kidsafeyoutube pending: " + tab.url);
       URL = tab.pendingUrl;
   } else {
      console.log("kidsafeyoutube actual: " + tab.url);
   }
   

   var re = new RegExp("^http?s://[^/]*youtube.com/watch.*[?&]v=([^&]*)$")
   var match = re.exec(URL);
   if (match) {
      var yt_id = match[1];
      console.log("match! " + URL + " yt_id is " + yt_id);

      // generate a random URL...
      var internalRedirectPage = chrome.runtime.getURL("ksv_player.html?yt_id=" + yt_id + "&nonce=" + Math.random());
      console.log(internalRedirectPage);

      // replace the watch page with internal landing page
      chrome.tabs.update(tab.id, {url: internalRedirectPage});
      chrome.history.deleteUrl({url: URL});

      // get a safeyoutube link
      // https://stackoverflow.com/questions/27091602/chrome-extension-communicate-with-rest-web-service
      var x = new XMLHttpRequest();
      x.open("GET", "https://safeYouTube.net/api/generate?yt_id=" + yt_id);
      x.onload = function () {
           console.log(x.responseText);

      };
      x.send();

   }
});






chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
      // do nothing...
    });
});

chrome.extension.onRequest.addListener(function(request,sender,sendResponse) {
  // do nothing...
});


/*

chrome.contextMenus.create(
     {"title" : "BBCode Paste",
      "id" : "BBCodePaste_context_menu",
      "onclick" : bbcodePasteHandler,
      "contexts" : ["editable"]      
    });

    */

// A generic onclick callback function.

/* 

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  
	chrome.tabs.sendMessage(tab.id, {method: "getSelection", data: "test123" }, function(response) {
	  if (response) {       
		  console.log("BBCodePaste response: " + response);
	  } else {
	  	  console.log("empty response");
	  }
	});

}

chrome.contextMenus.create(
     {"title" : "BBCode Test",
      "contexts" : ["editable"],
      "onclick" : genericOnClick });

*/
      
    

// NOTES solving problem with context menu not appearing in incognito
//
//  http://stackoverflow.com/questions/21075987/chrome-extension-context-menu-does-not-persist