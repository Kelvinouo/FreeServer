(async () => {
    let [, place] = window.location.href.match(/games\/(\d+)\//)

    if (!place) return
    // check if place is a number
    if (isNaN(place)) return

    // Check if frame already exists
    if ($("#FreeServerContainer").length > 0) return
    // Insert iframe
    var PrivateServerContainer = $("#rbx-private-game-server-item-container");
    if ( PrivateServerContainer.length < 1 ) {
        // User does not use the BTRoblox extension
        var DefaultContainer = $("#rbx-private-running-games")
        if (DefaultContainer.length < 1) {
            // Wait for either the BTRoblox extension to load or the default container to load
            await new Promise(resolve => {
                var observer = new MutationObserver(mutations => {
                    if ($("#rbx-private-running-games").length > 0 || $("#rbx-private-game-server-item-container").length > 0) {
                        resolve()
                        observer.disconnect()
                    }
                })
                observer.observe(document.body, { childList: true, subtree: true })
            })
        }
        DefaultContainer = $("#rbx-private-running-games")
        if (DefaultContainer.length > 0){
            DefaultContainer.prepend(`
                <ul id="rbx-private-game-server-item-container" class="card-list rbx-private-game-server-item-container">
                </ul>
            `)
        }
    }
    PrivateServerContainer = $("#rbx-private-game-server-item-container"); // Update variable
    if ($("#FreeServerContainer").length > 0) return
    await PrivateServerContainer.prepend(`<li class="rbx-private-game-server-item col-md-3 col-sm-4 col-xs-6" style="border-radius: 8px;overflow: hidden;">
    <iframe id="FreeServerContainer" src="https://rbxservers.xyz/embedded/game/${place}">
    </iframe>
</li>
    `)
})();