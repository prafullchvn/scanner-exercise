const r = require('raylib');

const WIDTH = 600;
const HEIGHT = 600;
const FPS = 60;

const setup = () => {
    r.InitWindow(WIDTH, HEIGHT, "Raylib Program");
    r.SetTargetFPS(FPS);
}

let scanner1X = 0;
const scanner1Y = 0;
const scanner1Width = Math.round(WIDTH / 10);
let scanner1Speed = 1;
const scanner1Start = 0;
const scanner1End = WIDTH / 2;

let scanner2X = WIDTH / 2;
const scanner2Y = 0;
const scanner2Width = WIDTH / 10;
let scanner2Speed = 2;
const scanner2Start = WIDTH / 2;
const scanner2End = WIDTH;

const particle1X = WIDTH / 3;
const particle1Y = 0;
const particle1Width = WIDTH / 6;
const particle1Height = HEIGHT;

const particle2X = particle1X + particle1Width + 150;
const particle2Y = 0;
const particle2Width = 10;
const particle2Height = HEIGHT;

const doRangeOverlap = (start1, end1, start2, end2) => {
    return Math.max(start1, start2) <= Math.min(end1, end2);
}

const getScannerColor = (start1, end1, start2, end2) => {
    if (doRangeOverlap(start1, end1, start2, end2)) {
        return r.RED;
    }
    return r.WHITE;
}

const getDelta = (x, width, start, end, delta) => {
    if ((x + width) === end || x < start)
        return -delta
    return delta
}

const update = () => {
    scanner1Speed = getDelta(scanner1X, scanner1Width, scanner1Start, scanner1End, scanner1Speed);
    scanner1X += scanner1Speed;

    scanner2Speed = getDelta(scanner2X, scanner2Width, scanner2Start, scanner2End, scanner2Speed);
    scanner2X += scanner2Speed;
}

function drawScanner(x, y, width) {
    let scannerColor = getScannerColor(x, x + width, particle1X, particle1X + particle1Width);
    if (scannerColor !== r.RED) {
        scannerColor = getScannerColor(x, x + width, particle2X, particle2X + particle2Width);
    }
    r.DrawRectangle(x, y, width, HEIGHT, scannerColor);
}

const draw = () => {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particle1X, particle1Y, particle1Width, particle1Height, r.SKYBLUE);
    r.DrawRectangle(particle2X, particle2Y, particle2Width, particle2Height, r.SKYBLUE);

    drawScanner(scanner1X, scanner1Y, scanner1Width);
    drawScanner(scanner2X, scanner2Y, scanner2Width);

    r.EndDrawing();
}

const isRunning = () => {
    return !r.WindowShouldClose();
}

const tearDown = () => {
    r.CloseWindow();
}

module.exports = { setup, update, draw, isRunning, tearDown };