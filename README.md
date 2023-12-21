# Contempt

Small command line tool based on robotjs used to automate simple tasks (click something, type something, wait). Mainly for when you want to do something at a certain time, but you aren't near your PC.

<center>
<img alt="Rolling eyes emoji" src="https://images.emojiterra.com/twitter/v14.0/512px/1f644.png" width="256">
</center>

## Usage

```bash
$ contempt [...commands]
# or
$ npx contempt [...commands]
```

## Commands

### `click`

Clicks where the cursor is located.

```bash
$ contempt click
```

### `rightclick`

Right clicks where the cursor is located.

```bash
$ contempt rightclick
```

### `type`

Types the given text. Use "\_\_" as spaces.

`type:[text]`

```bash
$ contempt type:hello__world
```

### `key`

Presses the given key.

`key:[key],[modifier]`

> [modifier] accepts alt, command (win), control, and shift

```bash
$ contempt key:f5
$ contempt key:t,control
```

### `wait`

Waits for the given amount of seconds.

`wait:[seconds]`

```bash
$ contempt wait:5 click
```

### `move`

Moves the cursor to the given coordinates.

`move:[x],[y]`

```bash
$ contempt move:100,100
```

### `mousepos`

Prints the current mouse position, utility to help you build your commands.

```bash
$ contempt wait:3 mousepos
```

## Examples

### Clicks twice, 5 seconds apart.

```bash
$ contempt wait:5 click wait:5 click
```

### Types "Hello World" and presses enter.

```bash
$ contempt wait:2 type:Hello__World! key:enter
```

### Open Google and make a search

```bash
$ contempt wait:3 key:t,control wait:1 type:google.com key:enter wait:4 type:contempt wait:1 key:enter
```

## Using a Input File

You can also use a file to store your commands, just pass the path to the file as the first argument.

```bash
$ contempt -i ./commands.txt
```

### Example Input File

```txt
# This is a comment
WAIT 1
KEY command
TYPE npp
KEY enter
WAIT 1
KEY n control
TYPE I used to be an adventurer like you, but then I took an arrow in the knee.
```
