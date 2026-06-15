(async () => {
    let [, place] = window.location.href.match(/games\/(\d+)\//)

    if (!place) return
    // check if place is a number
    if (isNaN(place)) return

    if ($(`#freeserver-${place}-container`).length > 0) return

    // Find or wait for "rbx-friends-running-games" element
    let friendsRunningGames = $(`#rbx-friends-running-games`);
    if (friendsRunningGames.length === 0) {
        await new Promise(resolve => {
            const observer = new MutationObserver(mutations => {
                friendsRunningGames = $(`#rbx-friends-running-games`);
                if (friendsRunningGames.length > 0) {
                    resolve();
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    friendsRunningGames.before(`
        <div class="stack" style="border-radius: 8px;overflow: hidden;" id="freeserver-${place}-container">
            <iframe id="FreeServerContainer" src="https://rbxservers.xyz/embedded/game/${place}">
            </iframe>
        </div>
    `);
})();