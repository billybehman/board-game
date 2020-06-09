var pieces = []

$(document).ready(function () {



    $("#createPiece").on("click", function () {

        var bodyCompType = $("#bodyComp").val()

        var bodyCompLvl = $("#bodyLevel").val()

        var pieceBodyComp = {
            type: bodyCompType,
            level: bodyCompLvl
        }

        var astrologyType = $("#astrology").val()

        var astrologyLvl = $("#astrologyLevel").val()

        var pieceAstrology = {
            type: astrologyType,
            level: astrologyLvl
        }

        var pieceId = $("#pieceNumber").val()

        var shieldType = $("#shieldType").val()

        var shieldLvl = $("#shieldLevel").val()

        var pieceShield = {
            type: shieldType,
            level: shieldLvl
        }

        var pieceMovement = []

        $(".movementDirection").each(function () {
            if ($(this).prop("checked") == true) {
                var directionValue = $(this).data("direction")
                $(".movementDistanceSelect").each(function () {
                    if ($(this).data("direction") === directionValue) {
                        var distanceValue = $(this).val()
                        var movementObj = {
                            direction: directionValue,
                            distance: distanceValue
                        }
                        pieceMovement.push(movementObj)
                    }
                })

            }
        })


        if ($("#hasAttack").prop("checked") == true) {
            var pieceAttackType = $("#attackType").val()

            var pieceAttackLvl = $("#attackLevel").val()

            var pieceAttackRange = []

            $(".attackRange").each(function () {
                if ($(this).prop("checked") == true) {
                    var value = $(this).attr("id")
                    pieceAttackRange.push(value)
                }
            })

            var pieceAttack = {
                Type: pieceAttackType,
                Lvl: pieceAttackLvl,
                Range: pieceAttackRange
            }
        } else {
            var pieceAttack = "can not attack"
        }

        pieceResCollect = []

        $(".resCheck").each(function () {
            if ($(this).prop("checked") == true) {
                var resType = $(this).attr("id")
                $(".resSelectVal").each(function () {
                    if ($(this).data("type") === resType) {
                        var level = $(this).val()
                        var resObj = {
                            type: resType,
                            level: level
                        }
                        pieceResCollect.push(resObj)
                    }
                })
            }
        })

        var newPiece = new piece(pieceId, pieceBodyComp, pieceAstrology, pieceShield, pieceMovement, pieceAttack, pieceResCollect)

        pieces.push(newPiece)

        console.log(pieces)
        //end of event listener for button
    })

    $("#attack").hide()

    $(".resSelect").hide()

    $(".movementDistance").hide()

    $("#hasAttack").on("click", function () {
        if ($("#hasAttack").prop("checked") == true) {
            $("#attack").show()
        } else {
            $("#attack").hide()
        }
    })

    $(".movementDirection").on("click", function () {
        var state = $(this).data("direction")
        if ($(this).prop("checked") == true) {
            $(".movementDistance").each(function () {
                if ($(this).data("direction") === state) {
                    $(this).show()
                }
            })
        } else {
            $(".movementDistance").each(function () {
                if ($(this).data("direction") === state) {
                    $(this).hide()
                }
            })
        }
    })

    $(".resCheck").on("click", function () {
        var resType = $(this).attr("id")
        if ($(this).prop("checked") == true) {
            $(".resSelect").each(function () {
                if ($(this).data("type") === resType) {
                    $(this).show()
                }
            })

        } else {
            $(".resSelect").each(function () {
                if ($(this).data("type") === resType) {
                    $(this).hide()
                }
            })
        }
    })

    for (var i = 0; i < tiles.length; i++) {
        var xVal = tiles[i].number.x
        var yVal = tiles[i].number.y
        var terrain = tiles[i].terrain
        var res = tiles[i].res.type || ""
        var resQuantity = tiles[i].res.quantity || ""
        var div = $("<div>")
        var resDiv = $("<div>")

        resDiv.text(res + " " + resQuantity)

        switch (res) {
            case "Vision":
                resDiv.css({"background-color": "#ffbf00", "color": "Black"})
                break;

            case "Gold":
                resDiv.css({"background-color": "#ffbf00", "color": "Black"})
                break;

            case "Hydrogen":
                resDiv.css({"background-color": "#ffbf00", "color": "Black"})
                break;

            case "Starlight":
                resDiv.css({"background-color": "#ffbf00", "color": "Black"})
                break;


            case "Stamina":
                resDiv.css({"background-color": "#00ffcc", "color": "Black"})
                break;

            case "Accuracy":
                resDiv.css({"background-color": "#00ffcc", "color": "Black"})
                break;

            case "Coordination":
                resDiv.css({"background-color": "#00ffcc", "color": "Black"})
                break;

            case "Height":
                resDiv.css({"background-color": "#00ffcc", "color": "Black"})
                break;

            case "Reach":
                resDiv.css({"background-color": "#00ffcc", "color": "Black"})
                break;

            case "Force":
                resDiv.css({"background-color": "#00ffcc", "color": "Black"})
                break;

            case "Power":
                resDiv.css("background-color", "#0066cc")
                break;

            case "Illumination":
                resDiv.css("background-color", "#0066cc")
                break;

            case "Fang":
                resDiv.css("background-color", "#0066cc")
                break;

            case "Copper":
                resDiv.css("background-color", "#0066cc")
                break;


            case "Vibration":
                resDiv.css("background-color", "#ff0066")
                break;

            case "Divinity":
                resDiv.css("background-color", "#ff0066")
                break;

            case "Seed":
                resDiv.css("background-color", "#ff0066")
                break;

            case "Lung":
                resDiv.css("background-color", "#ff0066")
                break;

            case "Bone":
                resDiv.css("background-color", "#ff0066")
                break;

            case "Blood":
                resDiv.css("background-color", "#ff0066")
                break;

            case "Plastic":
                resDiv.css("background-color", "#ff0066")
                break;

            case "Metal":
                resDiv.css("background-color", "#ff0066")
                break;


            case "Craft":
                resDiv.css("background-color", "Coral")
                break;

            case "Encryption":
                resDiv.css("background-color", "Coral")
                break;

            case "Muscle":
                resDiv.css({"background-color": "White", "color": "Black"})
                break;
            case "Electric":
                resDiv.css({"background-color": "White", "color": "Black"})
                break;

            case "Salt":
                resDiv.css({"background-color": "White", "color": "Black"})
                break;

            case "Keratin":
                resDiv.css({"background-color": "White", "color": "Black"})
                break;

            case "Intelligence":
                resDiv.css({"background-color": "#a3a3c2", "color": "Black"})
                break;

            case "Knowledge":
                resDiv.css({"background-color": "#a3a3c2", "color": "Black"})
                break;

            default:
                break;
        }


        switch (terrain) {
            case "Sand":
                div.css("background-color", "SandyBrown");
                break;
            case "Grass":
                div.css("background-color", "LimeGreen");
                break;
            case "Water":
                div.css("background-color", "DeepSkyBlue");
                break;
            case "Ice":
                div.css("background-color", "AliceBlue");
                break;
            case "Chrome":
                div.css({ "background-color": "#e4eee9", "background-image": "linear-gradient(315deg, #e4eee9 0%, #93a5ce 74%)" });
                break;
            case "Crystal":
                div.css({ "background-color": "#96c8fb", "background-image": "linear-gradient(315deg, #96c8fb 0%, #ddbdfc 74%)" });
                break;
            case "Rock":
                div.css("background-color", "DimGrey");
                break;
            case "Ethereal Space":
                div.css({ "background-color": "Black", "color": "White" });
                break;
            case "Enchanted Glass":
                div.css({ "background-color": "Indigo", "color": "white" });
                break;
            default:
                break;
        }

        div.addClass("box")

        div.text(xVal + ", " + yVal + " " + terrain)

        div.attr("id", xVal + "," + yVal)

        $("#board").append(div)

        div.append(resDiv)
    }


    //end of doc on ready function
});

var tiles = []

var terrainObjArray = []


var a = 5

while (a > -5) {

    var i = -5

    while (i < 5) {

        var tileNumber = {
            x: i,
            y: a,
            z: 0
        }

        var newTile = new tileNum(tileNumber)

        tiles.push(newTile)

        i++
    }

    a--
}

var chosenTerrains = []

var allTerrains = ["Sand", "Rock", "Water", "Ice", "Ethereal Space", "Enchanted Glass", "Grass", "Chrome", "Crystal"]

var n = 0
var extra = 0

var firstX = 0

var firstY = 0

var firstTerrain = ""

var number = 0

var numOfTiles = tiles.length

var q = 0

function createTer() {
    //if statement to check if there are any tiles left without a terrain
    var firstTileTry = tiles[Math.floor(Math.random() * numOfTiles)]
    if (firstTileTry.terrain === "none" && q < 100) {
        firstX = firstTileTry.number.x
        firstY = firstTileTry.number.y
        n = 0
        extra = 0
        var numOfTerrains = allTerrains.length
        var firstTerrainNum = Math.floor(Math.random() * numOfTerrains)
        firstTerrain = allTerrains[firstTerrainNum]
        console.log(firstTerrain)
        var newTerrainsArr = allTerrains.filter(terrain => terrain != firstTerrain);
        allTerrains = newTerrainsArr
        console.log(allTerrains)

        number = Math.floor(Math.random() * 6) + 12

        keepLooking()

    } else if (q > 99) {
        console.log("finished generating tiles")
    } else {
        createTer()
    }
    //end of if statement to check if there are any tiles left without terrain
}


function keepLooking() {
    for (var i = 0; i < tiles.length; i++) {
        var realTileX = tiles[i].number.x
        var realTileY = tiles[i].number.y
        var realTerrain = tiles[i].terrain
        var differenceX = Math.abs(realTileX - firstX)
        var differenceY = Math.abs(realTileY - firstY)
        var ranDifX = Math.floor(Math.random() * 2) + 2 + extra;
        var ranDifY = Math.floor(Math.random() * 2) + 2 + extra;
        if (realTerrain === "none" && differenceX < ranDifX && differenceY < ranDifY) {
            tiles[i].terrain = firstTerrain
            n++
            q++
        }
        if (q > 99) {
            n = n + 20
        }
    }
    if (n > number) {
        createTer()
    } else {
        extra++
        keepLooking()
    }
}

createTer()

var allRes = ["Vision", "Stamina", "Power", "Vibration", "Craft", "Accuracy", "Muscle", "Intelligence", "Knowledge", "Coordination", "Height", "Reach", "Illumination", "Divinity", "Seed", "Electric", "Force", "Encryption", "Lung", "Bone", "Blood", "Salt", "Keratin", "Fang", "Gold", "Hydrogen", "Plastic", "Metal", "Copper", "Starlight"]



for (var i = 0; i < allRes.length; i++) {
    function noRes() {
        var firstTileTry = tiles[Math.floor(Math.random() * numOfTiles)]
        var quantity = (Math.floor(Math.random() * 15) + 5)
        if (firstTileTry.res === "none") {
            firstTileTry.res = { type: allRes[i], quantity: quantity }
        } else {
            noRes()
        }
    }
    noRes()
}


function tileNum(number) {
    this.number = number,
        this.terrain = "none"
    this.res = "none"
}

function terrainObj(tileX, tileY, terrain) {
    this.tileX = tileX,
        this.tileY = tileY,
        this.terrain = terrain
}


function piece(id, bodyComp, astrology, shield, movement, attack, gatherRes, craft) {
    this.id = id || "none",
        this.bodyComp = bodyComp || "none",
        this.astrology = astrology || "none",
        this.shield = shield || "none",
        this.movement = movement || "none",
        this.attack = attack || "can not attack",
        this.gatherRes = gatherRes || "can not gather res",
        this.craft = craft || "can not craft"
}

