// KidSaveVideo 
// Authored by David W. Jeske
// Licensed as free open-source in the Public Domain

// inspired by safeyoutube.net and Wessam El Mahdy

chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {
  if (tabId.tabId === -1) { // chrome empty tab
    return true;
  }

  // we use the title to detect if this navigation is happening in an iframe on our generated page.
  // it's actually hard to detect if a change is an iframe page nav or a top level tab nav without using
  // onBeforeRequest() ... which requires more permissions.
  if (tab.title === 'Just Kids Youtube') {
    return;
  }

  const is_top_level_nav = (tab.openerTabId===tab.id);

  let url = tab.url;
  if (tab.pendingUrl) {
    console.log(`kidsafeyoutube PENDING. Is top level ${is_top_level_nav}` , changeInfo, tab);
    url = tab.pendingUrl;
  } else {
    console.log(`kidsafeyoutube actual. Is top level ${is_top_level_nav}`, changeInfo, tab);
  }

  // the extension manifest should only allow youtube requests, so we can assume a bunch of stuff
  const urlparse = new URL(url);
  if (urlparse.protocol !== 'https:') {
    debugger;
  }
  const yt_id = urlparse.searchParams.get('v');
  if (yt_id) {
    console.log(`match! ${url} yt_id: '${yt_id}'`);

    // generate a random URL...
    const internalRedirectPage = chrome.runtime.getURL(`ksv_player.html?yt_id=${yt_id}&nonce=${Math.random()}`);
    console.log(internalRedirectPage);

    // remove this page from history
    chrome.history.deleteUrl({url});
    // replace the watch page with internal landing page
    chrome.tabs.update(tab.id, {url: internalRedirectPage});


    // // get a safeyoutube link
    // // https://stackoverflow.com/questions/27091602/chrome-extension-communicate-with-rest-web-service
    // var x = new XMLHttpRequest();
    // x.open("GET", "https://safeYouTube.net/api/generate?yt_id=" + yt_id);
    // x.onload = function () {
    //      console.log(x.responseText);
    //
    // };
    // x.send();

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