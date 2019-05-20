# CanvOS
HTML / CSS / JS Desktop Environment

## CanvOS vs. CanvOS 2

this project is both called CanvOS and CanvOS 2. this is because I made a CanvOS a while ago, but used a really slow canvas graphics implementation (i drew a bunch of pixels manually). I never released CanvOS, and thus this project is simultaniously CanvOS and CanvOS 2

## Installation

you can install CanvOS by running
```
git clone git@github.com:creatively-stupid/canvos.git
```

then, from the `canvos/` directory, start Canvos by running `node server.js` with some parameters:

- `-port <Number>` - set the port, default 80 (use `sudo`) if port is under 1024
- `-ip` - displays all external IPs, best used with `-ext`
- `-ext` - allows external access, when not set, only localhost can access
- `-noopen` - doesn't open web browser window

## To-do list & Notes

- add apps

  - media player

  - settings

  - terminal

  - notepad

- fix server open