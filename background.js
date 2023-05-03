// check if browser is defined if it is not defined then define it as chrome because of firefox support
var isFirefox = true;
if (typeof browser === "undefined") {
    var browser = chrome;
    isFirefox = false;
}

if (isFirefox) {
    const gamePattern = /https:\/\/.+roblox.com\/games\/\d+/;
    async function handleUpdated(tabId, changeInfo, tabInfo) {
        var pageUrl = tabInfo.url;
        if (changeInfo.status !== 'complete' || !gamePattern.test(pageUrl)){ return; }
        browser.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["css/style.css"],
        })
        browser.scripting.executeScript({
            target: { tabId: tabId },
            files: ["js/jquery.js", "load.js"],
        });
    }

    browser.tabs.onUpdated.addListener(handleUpdated, {
        properties: [
            "url",
            "status"
        ]
    });
} else {
    browser.tabs.onUpdated.addListener(async (tabId, changeInfo, { url }) => {
        if (changeInfo.status !== 'complete' || !/https:\/\/.+roblox.com\/games/g.test(url)) return;
        
        await browser.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["css/style.css"],
        })
    
        browser.scripting.executeScript({
            target: { tabId: tabId },
            files: ["js/jquery.js", "load.js"],
        });
    })
}