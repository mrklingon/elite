function shoShip (num: number) {
    led.plot(num, 4)
}
function clrShip (num: number) {
    led.unplot(num, 4)
}
function shoStats () {
    basic.showString("C")
    basic.showNumber(Credits)
    basic.showString("A")
    basic.showNumber(ACargo)
    basic.showString("T")
    basic.showNumber(TCargo)
    Pause = 0
}
function getIndex (xq: number, yq: number) {
    return xq + yq * Diam
}
input.onButtonPressed(Button.A, function () {
    if (MODE != Battle) {
        if (Direction2 == 0) {
            YV += -1
        }
        if (Direction2 == 1) {
            XV += 1
        }
        if (Direction2 == 2) {
            YV += 1
        }
        if (Direction2 == 3) {
            XV += -1
        }
    } else {
        clrShip(sx)
        sx += -1
        if (sx < 0) {
            sx = 0
        }
        shoShip(sx)
    }
    if (MODE == Docked) {
        doLaunch()
    }
})
function stationStop () {
    LOC = getIndex(2 + X, 2 + Y)
    if (Tech == Type[LOC]) {
        Credits += 10 * ACargo
        ACargo = 0
        if (TCargo < 100) {
            Credits += 2 * (100 - TCargo)
            TCargo = 100
        }
    } else {
        Credits += 10 * TCargo
        TCargo = 0
        if (ACargo < 100) {
            Credits += 2 * (100 - ACargo)
            ACargo = 100
        }
    }
    Credits += -20
    game.setScore(Credits)
    shoStats()
    station[2].showImage(0)
    if (Credits <= 0) {
        game.gameOver()
    }
}
function mkName () {
    name = ""
    syls = [
    "ab ",
    "im",
    "xo",
    "ol",
    "in",
    "re",
    "eh"
    ]
    for (let index = 0; index < 3; index++) {
        name = "" + name + syls[randint(0, 6)]
    }
    return name
}
function doDock () {
    Pause = 1
    MODE = Docked
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    images.createBigImage(`
        . . . # . . . . . .
        # . . . . . . # # .
        . . . . . . # # # #
        . . . . . . . # # .
        . . # . . . . . . .
        `).scrollImage(1, 200)
    for (let value of station) {
        value.showImage(0)
        basic.pause(200)
    }
}
function plotPane2 (xl: number, yl: number) {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    for (let index2 = 0; index2 <= 4; index2++) {
        for (let index2 = 0; index2 <= 4; index2++) {
            if (0 < Universe[getIndex(xl + index2, index2 + yl)]) {
                led.plotBrightness(index2, index2, Universe[getIndex(xl + index2, index2 + yl)] * 20)
                basic.pause(500)
                basic.showString(sys[getIndex(xl + index2, index2 + yl)])
                if (Type[getIndex(xl + index2, index2 + yl)] == Tech) {
                    basic.showString("T")
                } else {
                    basic.showString("A")
                }
                basic.pause(500)
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            }
        }
    }
    plotPane(xl, yl)
}
function clrEnemy (num: number, num2: number) {
    led.unplot(num, num2)
}
input.onButtonPressed(Button.AB, function () {
    XV = 0
    YV = 0
})
input.onButtonPressed(Button.B, function () {
    if (MODE != Battle) {
        Direction2 += 1
        if (Direction2 > 3) {
            Direction2 = 0
        }
        if (Direction2 == 0) {
            led.plot(2, 3)
        }
        if (Direction2 == 1) {
            led.plot(1, 2)
        }
        if (Direction2 == 2) {
            led.plot(2, 1)
        }
        if (Direction2 == 3) {
            led.plot(3, 2)
        }
        basic.pause(100)
    } else {
        clrShip(sx)
        sx += 1
        if (sx > 4) {
            sx = 4
        }
        shoShip(sx)
    }
})
input.onGesture(Gesture.Shake, function () {
    if (MODE == Travel) {
        XV = 0
        YV = 0
        Pause = 1
        shoStats()
    }
})
function chkLOC () {
    if (Universe[getIndex(X + 2, Y + 2)] != 0) {
        doDock()
        stationStop()
    }
}
function initUniverse () {
    Diam = 30
    Universe = []
    sys = []
    Type = []
    for (let index = 0; index < Diam * Diam; index++) {
        if (800 < randint(0, 1000)) {
            Universe.push(randint(3, 7))
            sys.push(mkName())
            Type.push(randint(1, 2))
        } else {
            Universe.push(0)
            sys.push("")
            Type.push(0)
        }
    }
}
function shoEnemy (num: number, num2: number) {
    led.plotBrightness(num, num2, 177)
}
function doLaunch () {
    X = randint(0, 29)
    Y = randint(0, 29)
    for (let index4 = 0; index4 <= 2; index4++) {
        station[2 - index4].showImage(0)
        basic.pause(200)
    }
    MODE = Battle
    Pause = 1
    doBattle()
}
function doBattle () {
    MODE = Battle
    ey = 0
    sx = 2
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    for (let index = 0; index <= 2; index++) {
        shoEnemy(2 * index, ey)
    }
    shoShip(sx)
}
function plotPane (xl: number, yl: number) {
    for (let index5 = 0; index5 <= 4; index5++) {
        for (let Index22 = 0; Index22 <= 4; Index22++) {
            led.plotBrightness(Index22, index5, Universe[getIndex(xl + Index22, index5 + yl)] * 20)
        }
    }
}
let sys: string[] = []
let Universe: number[] = []
let syls: string[] = []
let name = ""
let Type: number[] = []
let LOC = 0
let Diam = 0
let station: Image[] = []
let Pause = 0
let YV = 0
let XV = 0
let Direction2 = 0
let Y = 0
let X = 0
let MODE = 0
let Travel = 0
let Docked = 0
let TCargo = 0
let ACargo = 0
let Credits = 0
let Tech = 0
let Battle = 0
let ey = 0
let sx = 0
let Agro = 0
sx = 2
ey = 0
Battle = 2
Tech = 1
Credits = 100
ACargo = 50
TCargo = 50
Docked = 1
Travel = 0
MODE = Travel
basic.showString("Elite")
images.createBigImage(`
    . . . # . . . . . .
    . . # # # # . . # .
    . # . # . . . # . .
    . . # # # # . . . .
    . . . # . . . . . #
    `).scrollImage(1, 200)
initUniverse()
for (let Index3 = 0; Index3 <= 24; Index3++) {
    plotPane(Index3, 0)
    basic.pause(100)
}
basic.pause(500)
plotPane(0, 0)
X = 0
Y = 0
Direction2 = 0
XV = 0
YV = 0
Pause = 0
station = [images.createImage(`
    . . # . .
    . # # # .
    # # . # #
    . # # # .
    . . # . .
    `), images.createImage(`
    . # # # .
    # # # # #
    # . . . #
    # # # # #
    . # # # .
    `), images.createImage(`
    # # # # #
    # # # # #
    . . . . .
    . . . . .
    # # # # #
    `)]
basic.forever(function () {
    if (Pause == 0 && MODE == Travel) {
        X = X + XV
        Y = Y + YV
        if (X > Diam) {
            X = X - Diam
        }
        if (Y > Diam) {
            Y = Y - Diam
        }
        if (X < 0) {
            X = X + Diam
        }
        if (Y < 0) {
            Y = Y + Diam
        }
        plotPane(X, Y)
        led.plot(2, 2)
        basic.pause(500)
        if (XV == 0 && YV == 0) {
            chkLOC()
        }
    }
    if (MODE == Battle) {
        clrEnemy(0, ey)
        clrEnemy(2, ey)
        clrEnemy(4, ey)
        ey += 1
        for (let index = 0; index <= 2; index++) {
            if (ey == 5) {
                MODE = Travel
                Pause = 0
            } else {
                shoEnemy(index * 2, ey)
            }
        }
        basic.pause(500)
    }
})
