# CanvOS
HTML / CSS / JS Desktop Environment

## CanvOS vs. CanvOS 2

this project is both called CanvOS and CanvOS 2. this is because I made a CanvOS a while ago, but used a really slow canvas graphics implementation (i drew a bunch of 1x1 rectangles). I never released CanvOS, and thus this project is simultaniously CanvOS and CanvOS 2

## Installation

you can install CanvOS by running
```
git clone https://github.com/creatively-stupid/canvos.git
cd canvos/
npm install
```

submit an issue [here](https://github.com/creatively-stupid/canvos/issues/new) if you have any problems

then, from the `canvos/` directory, start Canvos by running `node server.js` with some parameters:

- `-port <Number>` - set the port, default 80 (use `sudo` if port is under 1024)
- `-ip` - displays all external IPs, best used with `-ext`
- `-ext` - allows external access, when not set, only localhost can access
- `-noopen` - doesn't open web browser window

recommended commands:

- `node server.js -port 55555` for personal use
- `node server.js -port 55555 -ip -ext -noopen` for group use

## To-do list & Notes

- add apps

  - media player

  - settings

  - terminal

  - calculator

- fix server open

  - possibly add "template" commands
