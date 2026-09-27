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
let scannerColor = r.WHITE;

const particleX = WIDTH / 3;
const particleY = 0;
const particleWidth = WIDTH / 6;
const particleHeight = HEIGHT;

let delta = 1;
const doRangeOverlap = (start1, end1, start2, end2) => {
    return Math.max(start1, start2) <= Math.min(end1, end2);
}

const getScannerColor = (start1, end1, start2, end2) => {
    if (doRangeOverlap(start1, end1, start2, end2)) {
        return r.RED;
    }
    return r.WHITE;
}

const update = () => {
    if ((scannerX + scannerWidth) === WIDTH || scannerX < 0)
        delta = -delta;
    scannerX += delta
}

const particle1X = particleX + particleWidth + 150;
const particle1Y = 0;
const particle1Width = 10;

const draw = () => {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.SKYBLUE);
    r.DrawRectangle(particle1X, particle1Y, particle1Width, HEIGHT, r.SKYBLUE);

    let scannerColor = getScannerColor(scannerX, scannerX + scannerWidth, particleX, particleX + particleWidth);

    if (scannerColor !== r.RED) {
        scannerColor = getScannerColor(scannerX, scannerX + scannerWidth, particle1X, particle1X + particle1Width);
    }
    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, scannerColor);


    r.EndDrawing();
}

const isRunning = () => {
    return !r.WindowShouldClose();
}

const tearDown = () => {
    r.CloseWindow();
}

module.exports = { setup, update, draw, isRunning, tearDown };