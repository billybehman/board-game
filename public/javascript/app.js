

var pieces = []

console.log("the app.js file")

$(document).ready(function () {



    $("#createPiece").on("click", function (event) {
        event.preventDefault()
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

        var forwardMovement = "none"

        var diagonalMovement = "none"

        if ($("#forwardMovement").prop("checked") == true) {
            var value = $("#forwardMovementDistance").val()
            forwardMovement = value
        }

        if ($("#diagonalMovement").prop("checked") == true) {
            var value = $("#diagonalMovementDistance").val()
            diagonalMovement = value
        }

        var pieceMovement = {
            forward: forwardMovement,
            diagonal: diagonalMovement
        }


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
                type: pieceAttackType,
                level: pieceAttackLvl,
                range: pieceAttackRange
            }
        } else {
            var pieceAttack = "can not attack"
        }

        var intCollect = 0

        var knoCollect = 0

        if ($("#intellegence").prop("checked") == true) {
            intCollect = $("#intLvl").val()
        }

        if ($("#knowledge").prop("checked") == true) {
            knoCollect = $("#knoLvl").val()
        }

        var pieceResCollect = {
            intelligence: intCollect,
            knowledge: knoCollect
        }

        var newPiece = new piece(pieceId, pieceBodyComp, pieceAstrology, pieceShield, pieceMovement, pieceAttack, pieceResCollect)

        pieces.push(newPiece)

        console.log(pieces)

        var range = newPiece.attack.range.join()

        var pieceForSQL = {
            bodyCompType: newPiece.bodyComp.type,
            bodyCompLvl: newPiece.bodyComp.level,
            astrologyType: newPiece.astrology.type,
            astrologyLvl: newPiece.astrology.level,
            shieldType: newPiece.shield.type,
            shieldLvl: newPiece.shield.level,
            movementForward: newPiece.movement.forward,
            movementDiagonal: newPiece.movement.diagonal,
            attackType: newPiece.attack.type,
            attackLvl: newPiece.attack.level,
            attackDistance: range,
            intelligenceCollect: newPiece.gatherRes.intelligence,
            knowledgeCollect: newPiece.gatherRes.knowledge
        }

        $.ajax({
            type: "POST",
            url: "/api/add-pieces",
            data: pieceForSQL
        }).then(function (res) {
            console.log(res)
        })


        window.location.replace("/board")
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

    
    for (var i = 0; i < orderedYears.length; i++) {
        var yearsDiv = $("<div>")
        var thisYear = orderedYears[i]
        yearsDiv.text(thisYear)
        if (thisYear === currentYear) {
            yearsDiv.css({ "background-color": "black", "color": "white" })
        }
        $("#year").append(yearsDiv)

    }

    $("#spawnPortalConfirm").hide()

    $("#spawnPortal").on("click", function () {
        $(".box").css({ "box-shadow": "0px 5px 10px 5px inset" })
        $(".box").on("click", function () {
            $(".box").css({ "box-shadow": "0px 5px 10px 5px inset" })
            $(".portalImage").hide()
            $(this).css({ "box-shadow": "0px 0px 0px 0px" })
            var imgDiv = $("<img>")
            imgDiv.attr("src", "../images/portal-for-game.png")
            imgDiv.addClass("portalImage")
            $(this).append(imgDiv)
            $("#spawnPortalConfirm").show()
            spawnLocation = $(this).attr("id")
        })
    })

    $("#spawnPortalConfirm").on("click", function () {
        $(".box").off("click")
        $(".box").css({ "box-shadow": "0px 0px 0px 0px" })
        $("#spawnPortalConfirm").hide()
        console.log(spawnLocation)
    })

    $("#createBoard").on("click", function() {
        tilesDatabase()
    })

    //end of doc on ready function
});

var spawnLocation = ""

var allYears = ["Year of the Bird", "Year of the Elephant", "Year of the Cat", "Year of the Dragon", "Year of the Frog"]

var orderedYears = []

function year() {
    var numOfYears = allYears.length
    var ranYear = Math.floor(Math.random() * numOfYears)
    var year = allYears[ranYear]
    orderedYears.push(year)
    var newYearsArr = allYears.filter(theYear => theYear != year)
    allYears = newYearsArr
}

var p = 0

while (p < 5) {
    year()
    p++
}

console.log(orderedYears)

var currentYear = orderedYears[0]

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

function tilesDatabase() {
    for (var i = 0; i < tiles.length; i++) {
        var tileForDatabase = {
            x: tiles[i].number.x,
            y: tiles[i].number.y,
            resType: tiles[i].res.type || "",
            resAmount: tiles[i].res.quantity || "",
            terrain: tiles[i].terrain
        }

        $.ajax({
            type: "POST",
            url: "/api/add-tiles",
            data: tileForDatabase
        }).then(function (data) {
            console.log("Dataaaa", data)

            var xVal = data.x
            var yVal = data.y
            var terrain = data.terrain
            var res = data.resType || ""
            var resQuantity = data.resAmount || ""
            var div = $("<div>")
            var resDiv = $("<div>")

            resDiv.text(res + " " + resQuantity)

            switch (res) {
                case "Vision":
                    resDiv.css({ "background-color": "#ffbf00", "color": "Black" })
                    break;

                case "Gold":
                    resDiv.css({ "background-color": "#ffbf00", "color": "Black" })
                    break;

                case "Hydrogen":
                    resDiv.css({ "background-color": "#ffbf00", "color": "Black" })
                    break;

                case "Starlight":
                    resDiv.css({ "background-color": "#ffbf00", "color": "Black" })
                    break;


                case "Stamina":
                    resDiv.css({ "background-color": "#00ffcc", "color": "Black" })
                    break;

                case "Accuracy":
                    resDiv.css({ "background-color": "#00ffcc", "color": "Black" })
                    break;

                case "Coordination":
                    resDiv.css({ "background-color": "#00ffcc", "color": "Black" })
                    break;

                case "Height":
                    resDiv.css({ "background-color": "#00ffcc", "color": "Black" })
                    break;

                case "Reach":
                    resDiv.css({ "background-color": "#00ffcc", "color": "Black" })
                    break;

                case "Force":
                    resDiv.css({ "background-color": "#00ffcc", "color": "Black" })
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
                    resDiv.css({ "background-color": "White", "color": "Black" })
                    break;
                case "Electric":
                    resDiv.css({ "background-color": "White", "color": "Black" })
                    break;

                case "Salt":
                    resDiv.css({ "background-color": "White", "color": "Black" })
                    break;

                case "Keratin":
                    resDiv.css({ "background-color": "White", "color": "Black" })
                    break;

                case "Intelligence":
                    resDiv.css({ "background-color": "#a3a3c2", "color": "Black" })
                    break;

                case "Knowledge":
                    resDiv.css({ "background-color": "#a3a3c2", "color": "Black" })
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

        })
    }
}




//need to ask the player what spawn portal they want to place their piece at or what tile next to the spawn portal they want to spawn at
//need to keep track of and display the player's resources
//the function should read everything at the end of the turn
//When the turn ends, the function should either go through all the pieces or all the tiles
//the function will take in all the information and compare it to all the information about the tile that it's on and what year it is and then there will be a bunch of if statements saying what happens with the piece
//there also needs to be an attack button that, when pressed, indicates that the next click will be to attack a piece, then the information that the piece is attacking another piece is stored somewhere and when the turn ends then the function reads that and does the stuff
//should have a div that tells the player everything that's going on, like, this piece is on chrome and is a spirit body so it's attack is lower

//back end:
//create a sequelize model for tiles, pieces, players, years?, res probably, and whatever else I run into

//can you have multiple of one column in sequelize?