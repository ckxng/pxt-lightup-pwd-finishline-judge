function statusRaceComplete () {
    console.log("race complete")
    light.stopAllAnimations()
    light.setAll(0xffffff)
    music.playMelody("C5 G A E F G A C5 ", 320)
}
function servoDropGate () {
    if (raceRunning == 0) {
        console.log("dropping gate")
        raceRunning = 1
        timeRaceStart = control.millis()
        pins.A1.servoWrite(180)
    }
}
function pixelShowWinner (lane: number) {
    console.log("the winner is lane " + convertToText(lane))
    console.log("race duration is " + convertToText(timeRaceDuration) + "ms")
    if (lane == 0) {
        light.setPixelColor(1, 0x00ff00)
        light.setPixelColor(2, 0x0000ff)
        light.setPixelColor(3, 0x00ff00)
    } else {
        light.setPixelColor(6, 0x00ff00)
        light.setPixelColor(7, 0x0000ff)
        light.setPixelColor(8, 0x00ff00)
    }
}
function servoRaiseGate () {
    console.log("raising gate")
    pins.A1.servoWrite(0)
}
function waitForStart () {
    pauseUntil(() => input.buttonA.isPressed())
    statusLaunched()
    servoDropGate()
}
// The music will be quiet, and will cause a slight
// delay in bootup.  But it is fun.  :-)
function statusInitializing () {
    console.log("initializing")
    light.setAll(0xff0000)
    music.playMelody("C D E F G A B C5 ", 320)
}
// To add a lane, you will need to add an element to
// lightSensorCurrent, reading from the correct analog
// pin.
//
// You will also need to tweak the conditional logic
// in pixelShowWinner to show a unique pixel pattern
// for additional lanes.
function lightSensorRead () {
    lightSensorCurrent = [pins.A2.analogRead(), pins.A3.analogRead()]
}
function pollFinishLine () {
    lightSensorRead()
    for (let index = 0; index <= lightSensorCurrent.length - 1; index++) {
        if (lightSensorCurrent[index] < lightThresholdMin[index]) {
            declareWinner(index)
            break;
        }
    }
}
function lightCalibrate () {
    lightSensorRead()
    for (let index2 = 0; index2 <= lightSensorCurrent.length - 1; index2++) {
        lightThresholdMin.insertAt(index2, 1023)
    }
    console.log("calibrate")
    millisStartCalibrate = control.millis()
    while (control.millis() < millisStartCalibrate + 2000) {
        lightSensorRead()
        for (let index3 = 0; index3 <= lightSensorCurrent.length - 1; index3++) {
            if (lightSensorCurrent[index3] < lightThresholdMin[index3]) {
                lightThresholdMin[index3] = lightSensorCurrent[index3]
            }
        }
    }
    for (let index4 = 0; index4 <= lightSensorCurrent.length - 1; index4++) {
        lightThresholdMin[index4] = lightThresholdMin[index4] * 0.5
        console.log("lane " + index4 + " is calibrated to " + lightThresholdMin[index4])
    }
}
function statusLaunched () {
    console.log("cars launched")
    light.stopAllAnimations()
    light.setAll(0x00ff00)
}
function statusReady () {
    console.log("ready to race")
    light.stopAllAnimations()
    music.playMelody("C D E C5 C5 G C5 C5 ", 320)
    light.setAll(0xffff00)
}
// Lanes are 0 and 1.
//
// Lane 0 is the left lane when looking at the board.
//
// Lane 1 is the right lane when looking at the board.
function declareWinner (lane: number) {
    timeRaceDuration = control.millis() - timeRaceStart
    raceRunning = 0
    statusRaceComplete()
    pixelShowWinner(lane)
}
let lightSensorCurrent: number[] = []
let lightThresholdMin: number[] = []
let millisStartCalibrate = 0
let timeRaceDuration = 0
let timeRaceStart = 0
let raceRunning = 0
raceRunning = 0
timeRaceStart = 0
timeRaceDuration = 0
millisStartCalibrate = 0
lightThresholdMin = []
lightSensorCurrent = []
light.clear()
statusInitializing()
lightCalibrate()
statusReady()
waitForStart()
while (raceRunning) {
    pollFinishLine()
}
servoRaiseGate()
// main loop does nothing.  we intentionally want to
// do a full reset between races to ensure every race
// gets a clean slate and fresh calibration
forever(function () {
    control.waitMicros(1000000)
})
