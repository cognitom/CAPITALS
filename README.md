# CAPITALS

> CAPITALS illustrates how to attach *source map* to the code during compilation.

The language consists of uppercase letters, and it's compiled into JavaScript.

```
CONST NAME = "WORLD"
CONST MESSAGE = `HELLO ${NAME}!`
CONSOLE.LOG(MESSAGE)
```

We can compile this CAPITALS code into JavaScript below:

```javascript
const name = "world"
const message = `hello ${name}!`
console.log(message)
```

## Compilation

I'd like to focus to show how we can play with *source map*, so the compilation from CAPITALS is deadly simple: just convert everything into lower case.

```javascript
srcCode.toLowerCase()
```

## What is Source Map?

*Source map* is a json file and it can point the position from a original code to the compiled code. That's it!

- The spec is [here](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit).
- I recommend you to read [the post from html5rock](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/).

A generated source map could look like this:

```json
{
  "version": 3,
  "sources": ["../fixture/HELLO.js"],
  "names": [],
  "mappings": "AAAA;AACA;AACA;AACA",
  "file": "hello.js",
  "sourcesContent": ["CONST NAME = \"WORLD\"\nCONST MESSAGE = `HELLO ${NAME}!`\nCONSOLE.LOG(MESSAGE)\n"]
}
```

`AAAA;AACA;AACA;AACA` is where the magic happens. See detail about it [here](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-base64vlq)

## Try

Let's compile [test/fixture/HELLO.js](test/fixture/HELLO.js) via [CLI](cli.js).

At the first clone this repo into your desktop:

```bash
$ cd ~/Desktop/
$ git clone https://github.com/cognitom/CAPITALS.git
$ cd CAPITALS
```

Then, compile the sample code into JavaScript:

```bash
$ ./cli test/fixture/HELLO.js ../hello.js
```

You will get two files:

- hello.js: lowercased script
- hello.js.map: source map

`hello.js.map` could be like this:

```js
{
  "version": 3, // version of source map spec (basically 3)
  "sources": ["../CAPITALS/test/fixture/HELLO.js"], // path to the original sources
  "names": [], // optional name references
  "mappings": "AAAA;AACA;AACA;AACA", // semicolon separated mapping data
  "file": "hello.js", // path to generated file
  "sourcesContent": ["CONST NAME = \"WORLD\"\nCONST MESSAGE = `HELLO ${NAME}!`\nCONSOLE.LOG(MESSAGE)\n"] // the original sources
}
```

## License

MIT © Tsutomu Kawamura
