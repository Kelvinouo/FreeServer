chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, { url }) => {
    if (changeInfo.status !== 'complete' || !/https:\/\/.+roblox.com\/games/g.test(url)) return;
    
    await chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ["css/style.css"],
    })

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["js/jquery.js", "load.js"],
    });
})