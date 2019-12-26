# pxt-lightup-pwd-finishline-judge ![Build status badge](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/workflows/MakeCode/badge.svg)

## Description

This is a cheap and simple finish line judge for a two-lane pinewood derby track.

Photovoltaic sensors are installed into holes drilled into the center of each lane, and a light or LED is placed directly overhead of each sensor.  Once a car's shadow passes over one of the sensors (causing the sensed light to dim by 50%), that car will be declared the winner.

The following enhancements have been made to the [previous version](https://github.com/ckxng/pxt-simple-pwd-finish-line-judge) of this project:

1. A pixel array now points to the left (lane 0) or right (lane 1) to indicate the winner.
2. A built-in speaker plays fun tones at various points in the race.
3. Button A now triggers a servo, which can be wired to the starting gate to remotely start the race.  The servo resets at the end of the race.

This project was done using MakeCode to demonstrate to Cub Scouts that electronics can be useful and FUN!

## Code Readability Enhancements

Two changes were made to make the code easier to read for new programmers.

1. Lanes have been renumbered to "0" and "1" (instead of "1" and "2") for consistency.
2. Most code was consolidated into the start up function, since the program has a definite beginning and end.

## Circuit Playground Express

This project uses the [Circuit Playground Express](https://www.adafruit.com/product/3333) because of the built-in pixel ring and its popularity as a beginner development board.

[AdaFruit](https://www.adafruit.com) has a good [overview](https://learn.adafruit.com/adafruit-circuit-playground-express/overview) published on their website, including instructions for driver install and sample programs.

### Board Pinout

![circuit playground express pinout](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/raw/master/docs/circuit_playground_Adafruit_Circuit_Playground_Express_Pinout.png)

## Use this extension

This repository can be added as an **extension** in MakeCode.

* open https://maker.makecode.com/
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for the URL of this repository and import

## Edit this extension

To edit this repository in MakeCode.

* open https://maker.makecode.com/
* click on **Import** then click on **Import URL**
* paste the repository URL and click import

## Blocks preview

This section shows the blocks code from the last commit in master.

![A rendered view of the blocks](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/raw/master/.makecode/blocks.png)

## Wiring Preview and Pixel Status

This section shows generated wiring previews and pixel statuses at various stages of the race.

### Calibrating

The board is calibrating the photovoltaic sensors to determine are reasonable "low" level.  Car presense will be indicated when the light level drops to 50% of this detected level.

![A rendered view of the wiring - calibrating](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/raw/master/docs/maker-pxt-lightup-pwd-finishline-judge-calibrating.png)

### Ready

This status indicates that the user may press button A at any time to begin the race.

![A rendered view of the wiring - ready](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/raw/master/docs/maker-pxt-lightup-pwd-finishline-judge-ready.png)

### Launched

This status indicates that the servo has dropped the gate and the cars are now in motion.  The board is now looping, waiting for a shadow to pass over the photovoltaic sensors.

![A rendered view of the wiring - launched](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/raw/master/docs/maker-pxt-lightup-pwd-finishline-judge-launched.png)

### Lane 0 Win

When lane 0 is the winner, pixels point to the left.

![A rendered view of the wiring - lane 0 win](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/raw/master/docs/maker-pxt-lightup-pwd-finishline-judge-lane0win.png)

### Lane 1 Win

When lane 1 is the winner, pixels point to the right.

![A rendered view of the wiring - lane 1 win](https://github.com/ckxng/pxt-lightup-pwd-finishline-judge/raw/master/docs/maker-pxt-lightup-pwd-finishline-judge-lane1win.png)

## Adding a Lane

A lane can be added by editing two functions in the block editor.  Review the following function:

    function lightSensorRead
      set lightSensorCurrent to 
        (array of 
          (analog read pin A2)
          (analog read pin A3))

Change it to:

    function lightSensorRead
      set lightSensorCurrent to 
        (array of 
          (analog read pin A2)
          (analog read pin A3)
          (analog read pin A4))

The function pixelShowWinner will also need to be modified to display a unique pixel pattern to indicate the winning lane.

## Supported targets

* for PXT/maker
* for PXT/codal
(The metadata above is needed for package search.)

