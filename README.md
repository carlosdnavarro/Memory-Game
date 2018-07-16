# Carlos’s Memory Game
# Memory Game Project

This is a simple memory game to test your memory. Eight pairs of cards are randomly laid out by the program. You then try to pair the correct cards by clicking on them in order to flip/reveal them. The game tracks your moves and the time, and rates you based on your performance.

## Table of Contents

* [Installation Instructions](#installationinstructions)
* [Dependencies](#dependencies)
* [How to Play](#howtoplay)
* [Recent Changes and Bug Fixes](#changesandfixes)
* [Contributing](#contributing)

## Installation Instructions

Unzip all the files to the same directory. Make sure that the following folders and their corresponding files are in the same directory as the “index.html” file:

css\app.css
js\app.js
img\geometry2.png

Or if you're on a mobile phone or tablet, you can click [here](https://htmlpreview.github.io/?https://github.com/carlosdnavarro/Memory-Game/blob/master/index.html) for a live preview.

## Dependencies

This game is dependent upon Bootstrap and Google Fonts.

```
<link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
<link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Coda">
<link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
```

## How to Play

Click on cards/tiles to reveal them. Find the eight (8) pairs in the fewest moves to win the game.

## Recent Changes and Bug Fixes

June 21, 2018 

– fixed issue with restart not clearing the flippedCards array.
– fixed an issue where you could add three cards to the flippedCards array.

June 27, 2018

– added a timer and integrated that to the restart button.

July 16, 2018

- Added instructions for a live preview for use with mobile devices.
- Added media queries.
- Switched congratulations message to use JS alert function.


## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
