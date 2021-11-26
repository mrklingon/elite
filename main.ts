let Diam = 0
let name = ""
let syls: string[] = []
let Universe: number[] = []
let sys: string[] = []
function plotXY (xl: number, yl: number) {
	
}
function getIndex (xq: number, yq: number) {
    return xq + yq * Diam
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
function initUniverse () {
    Diam = 30
    Universe = []
    sys = []
    for (let index = 0; index < Diam * Diam; index++) {
        if (950 < randint(0, 1000)) {
            Universe.push(randint(3, 7))
            sys.push(mkName())
        } else {
            Universe.push(0)
            sys.push("")
        }
    }
}
basic.forever(function () {
	
})
