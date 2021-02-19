$("#playerFindSubmit").on("click", function() {
    let name = $("#playerNameInput").val().trim()
    let GameId = location.search.split("=")[1]

    let dataObj = {
        name,
        GameId
    }

    console.log(dataObj)

    $.ajax({
        type: "GET",
        url: "/api/find-player",
        data: dataObj
    }).then(function(data) {
        console.log(data)
        location.replace("/board")
    })
})

$("#playerCreateSubmit").on("click", function() {
    console.log("submit name")

    let playerObj = {
        name: $("#playerCreateInput").val().trim(),
        GameId: location.search.split("=")[1],
        focusRemaining: 8
    }

    console.log(playerObj)

    $.ajax({
        type: "POST",
        url: "/api/add-player",
        data: playerObj
    }).then(function(data) {
        console.log(data)
        if (data.full) {
            alert("THE GAME IS FULL")
        } else {
            location.replace("/board")
        }
    })
})


