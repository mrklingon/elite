function getIndex (xq: number, yq: number) {
    return xq + yq * Diam
}
input.onButtonPressed(Button.A, function () {
    X += 1
    if (X > 24) {
        X = 0
    }
    plotPane(X, Y)
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
                basic.pause(100)
            }
        }
    }
}
input.onButtonPressed(Button.B, function () {
    Y += 1
    if (Y > 24) {
        Y = 0
    }
    plotPane(X, Y)
})
function initUniverse () {
    Diam = 30
    Universe = []
    sys = []
    for (let index = 0; index < Diam * Diam; index++) {
        if (800 < randint(0, 1000)) {
            Universe.push(randint(3, 7))
            sys.push(mkName())
        } else {
            Universe.push(0)
            sys.push("")
        }
    }
}
function plotPane (xl: number, yl: number) {
    for (let index = 0; index <= 4; index++) {
        for (let Index2 = 0; Index2 <= 4; Index2++) {
        	
        }
    }
}
let sys: string[] = []
let Universe: number[] = []
let syls: string[] = []
let name = ""
let Diam = 0
let Y = 0
let X = 0
initUniverse()
for (let Index3 = 0; Index3 <= 24; Index3++) {
    plotPane(Index3, 0)
    basic.pause(100)
}
basic.pause(500)
plotPane(0, 0)
X = 0
Y = 0
