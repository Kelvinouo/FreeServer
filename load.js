let freeserver

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

(async () => {
    let [, place] = window.location.href.match(/games\/(\d+)\//)
    let servers = await fetch(`https://api.rbxservers.xyz/games/v1/info/${place}`).then(res => res.json())
    
    if (!servers || servers.error) return
    if (servers && servers.servercount < 1) return

    servers.officialservers = servers.officialservers || []

    let tab = $("#rbx-private-game-server-item-container")

    if (tab.length < 1) {
        $("#rbx-private-running-games").prepend(`
            <ul id="rbx-private-game-server-item-container" class="card-list rbx-private-game-server-item-container">
            </ul>
        `)
    }

    tab = $("#rbx-private-game-server-item-container")

    await tab.prepend(`<li class="rbx-private-game-server-item col-md-3 col-sm-4 col-xs-6">
        <div id="FreeServerYes">
        </div>
        <span class="shadow2 FontSize2 poweredByText">powered by <a href="https://rbxservers.xyz/games/${place}" class="rbxserversA">rbxservers.xyz</a></span>
    </li>`)

    let ServerTab = $("#FreeServerYes")

    servers.officialservers.forEach(data => {
        ServerTab.append(`
            <a class="font-bold shadow-offical" id="${data.id}">
                <div class="free-server-container highlight highlight-offical">
                    <span class="TextFix FontSize1 font-bold" id="${data.id}-name">
                    </span>
                    <span class="TextFix font-bold" id="${data.id}-lastupdate">
                    </span>
                </div>
            </a>
        `)
        $(`#${data.id}-name`).text(data.name + " ✅")
        $(`#${data.id}-lastupdate`).text(data.lastupdate)
    });

    if (servers.officialservers.length > 0) {
        ServerTab.append(`<div class="lineBreak"></div>`)
    }

    for (let i = 0; i < (servers.servers.length > 50 && 50 || servers.servers.length); i++) {
        const data = servers.servers[i];
        ServerTab.append(`
            <a class="font-bold shadow" id="${data.id}">
                <div class="free-server-container highlight">
                    <span class="TextFix FontSize1 font-bold" id="${data.id}-name">
                    </span>
                    <span class="TextFix font-bold" id="${data.id}-lastupdate">
                    </span>
                </div>
            </a>
        `)
        $(`#${data.id}-name`).text(data.name)
        $(`#${data.id}-lastupdate`).text(data.lastupdate)
    }

    $("#FreeServerYes").on("click", "a", async function(e) {
        e.preventDefault()
        let id = $(this).attr("id")
        let res = await fetch(`https://api.rbxservers.xyz/servers/v1/info/${id}`).then(res => res.json())
        window.open(`https://www.roblox.com/games/${place}?privateServerLinkCode=${res["server-linkcode"]}`)
    })

})();