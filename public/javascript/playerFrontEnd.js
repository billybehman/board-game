$("#playerFindSubmit").on("click", function() {
    let name = $("#playerNameInput").val().trim()

    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "/api/players/" + name,
    }).then(function(data) {
        console.log(data)

    })
})

$("#playerCreateSubmit").on("click", function() {
    console.log("submit name")

    let name = {
        name: $("#playerCreateInput").val().trim()
    }

    console.log(name)

    $.ajax({
        type: "POST",
        url: "/api/add-player",
        data: name
    }).then(function(data) {
        console.log(data)

    })
})
