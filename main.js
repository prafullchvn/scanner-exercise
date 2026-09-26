const sketch = require('./sketch');

const loop = () => {
    if (sketch.isRunning()) {
        sketch.update();
        sketch.draw();
    }
}

const main = () => {
    sketch.setup();
    loop();
    sketch.tearDown();
}

main();