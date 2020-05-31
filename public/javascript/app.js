$(document).ready(function() {
    


    $("#createPiece").on("click", function() {
        
        console.log("What")

        var bodyCompType = $("#bodyComp").val()

        var bodyCompLvl = $("#bodyLevel").val()

        var pieceBodyComp = {bodyCompType, bodyCompLvl}

        var astrologyType = $("#astrology").val()

        var astrologyLvl = $("#astrologyLevel").val()

        var pieceAstrology = {astrologyType, astrologyLvl}

        var pieceId = $("#pieceNumber").val()

        var shieldType = $("#shieldType").val()

        var shieldLvl = $("#shieldLevel").val()

        var pieceShield = {shieldType, shieldLvl}

        var movementDirection = $("#movementDirection").val()

        var movementDistance = $("#movementDistance").val()
        
        var pieceMovment = {movementDirection, movementDistance}

        var pieceAttackType = $("#attackType").val()

        var pieceAttackLvl = $("#attackLevel").val()

        var pieceAttackRange = []

        $(".attackRange").each(function() {
            if($(this).prop("checked") == true) {
                var value = $(this).attr("id")
                pieceAttackRange.push(value)
            }
        })

        var newPiece = new piece(pieceId, pieceBodyComp, pieceAstrology, pieceShield, pieceMovment)
    })    

});


function tile(number, terrain, elevation, res) {
    this.number = number,
    this.terrain = terrain,
    this.elevation = elevation,
    this.res = res
}


function piece(id, bodyComp, astrology, shield, movement, attack, gatherRes, craft) {
    this.id = id,
    this.bodyComp = bodyComp,
    this.astrology = astrology,
    this.shield = shield,
    this.movement = movement,
    this.attack = attack || "can not attack",
    this.gatherRes = gatherRes || "can not gather res",
    this.craft = craft || "can not craft"
}