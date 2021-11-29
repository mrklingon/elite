function getIndex (xq: number, yq: number) {
    return xq + yq * Diam
}
input.onButtonPressed(Button.A, function () {
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
})
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
function plotPane2 (xl: number, yl: number) {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    for (let index = 0; index <= 4; index++) {
        for (let Index2 = 0; Index2 <= 4; Index2++) {
            if (0 < Universe[getIndex(xl + Index2, index + yl)]) {
                led.plotBrightness(Index2, index, Universe[getIndex(xl + Index2, index + yl)] * 20)
                basic.pause(500)
                basic.showString(sys[getIndex(xl + Index2, index + yl)])
                if (Type[getIndex(xl + Index2, index + yl)] == 1) {
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
input.onButtonPressed(Button.AB, function () {
    XV = 0
    YV = 0
})
input.onButtonPressed(Button.B, function () {
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
})
input.onGesture(Gesture.Shake, function () {
    XV = 0
    YV = 0
    Pause = 1
    plotPane2(1, 1)
    Pause = 0
})
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
function plotPane (xl: number, yl: number) {
    for (let index = 0; index <= 4; index++) {
        for (let Index2 = 0; Index2 <= 4; Index2++) {
            led.plotBrightness(Index2, index, Universe[getIndex(xl + Index2, index + yl)] * 20)
        }
    }
}
let Type: number[] = []
let sys: string[] = []
let Universe: number[] = []
let syls: string[] = []
let name = ""
let Diam = 0
let Pause = 0
let YV = 0
let XV = 0
let Direction2 = 0
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
let X = 0
let Y = 0
Direction2 = 0
XV = 0
YV = 0
Pause = 0
basic.forever(function () {
    if (Pause == 0) {
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
    }
})
