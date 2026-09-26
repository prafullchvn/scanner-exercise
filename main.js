const sketch = require('./sketch');

const loop = () => {
    while (sketch.isRunning()) {
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