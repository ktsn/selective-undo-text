# selective-undo-text

A Selective Undo library for text editing.

## Demo

http://codepen.io/ktsn/pen/qZxdaY

## Usage

```js
import { Buffer } from 'selective-undo-text';

const buf = Buffer('Initial Text');

buf.addText(7, ' Input');
console.log(buf.text) // Initial Input Text

buf.removeText(0, 8);
console.log(buf.text); // Input Text

buf.undo(0);
console.log(buf.text); //  Text
```

## License

MIT
