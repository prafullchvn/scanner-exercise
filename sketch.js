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
const scanner1Height = HEIGHT;
let scanner1Delta = 1;

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

const update = () => {
    if ((scanner1X + scanner1Width) === WIDTH || scanner1X < 0)
        scanner1Delta = -scanner1Delta;
    scanner1X += scanner1Delta
}


function drawScanner() {
    let scannerColor = getScannerColor(scanner1X, scanner1X + scanner1Width, particle1X, particle1X + particle1Width);
    if (scannerColor !== r.RED) {
        scannerColor = getScannerColor(scanner1X, scanner1X + scanner1Width, particle2X, particle2X + particle2Width);
    }
    r.DrawRectangle(scanner1X, scanner1Y, scanner1Width, scanner1Height, scannerColor);
}

const draw = () => {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particle1X, particle1Y, particle1Width, particle1Height, r.SKYBLUE);
    r.DrawRectangle(particle2X, particle2Y, particle2Width, particle2Height, r.SKYBLUE);

    drawScanner();

    r.EndDrawing();
}

const isRunning = () => {
    return !r.WindowShouldClose();
}

const tearDown = () => {
    r.CloseWindow();
}

module.exports = { setup, update, draw, isRunning, tearDown };