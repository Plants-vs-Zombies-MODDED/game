chrome.action.onClicked.addListener(() => {
	chrome.tabs.create({ url: "game/index.html" });
});
