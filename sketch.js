const r = require('raylib');

const WIDTH = 600;
const HEIGHT = 600;
const FPS = 60;

const setup = () => {
    r.InitWindow(WIDTH, HEIGHT, "Raylib Program");
    r.SetTargetFPS(FPS);
}

let scannerX = 0;
let scannerY = 0;
const scannerWidth = Math.round(WIDTH / 10);
const scannerHeight = HEIGHT;
let delta = 1;

const update = () => {
    if ((scannerX + scannerWidth) === WIDTH || scannerX < 0)
        delta = -delta;
    scannerX += delta
}

const draw = () => {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, r.WHITE);

    r.EndDrawing();
}

const isRunning = () => {
    return !r.WindowShouldClose();
}

const tearDown = () => {
    r.CloseWindow();
}

module.exports = { setup, update, draw, isRunning, tearDown };