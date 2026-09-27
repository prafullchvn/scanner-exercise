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
let scanner1Velocity = 1;
const scanner1Start = 0;
const scanner1End = WIDTH / 2;

let scanner2X = WIDTH / 2;
const scanner2Y = 0;
const scanner2Width = WIDTH / 10;
let scanner2Velocity = 2;
const scanner2Start = WIDTH / 2;
const scanner2End = WIDTH;

const scanner3X = 0;
let scanner3Y = 0;
const scanner3Height = 50;
const scanner3Width = WIDTH;
let scanner3Velocity = 1;

const particle1X = WIDTH / 3;
const particle1Y = 0;
const particle1Width = WIDTH / 6;

const particle2X = particle1X + particle1Width + 150;
const particle2Y = 0;
const particle2Width = 10;

const particle3X = 0;
const particle3Y = HEIGHT / 3;
const particle3Height = 30;

const doRangeOverlap = (start1, end1, start2, end2) => {
    return Math.max(start1, start2) <= Math.min(end1, end2);
}

const getColor = (start1, end1, start2, end2) => {
    if (doRangeOverlap(start1, end1, start2, end2)) {
        return r.RED;
    }
    return r.WHITE;
}

const getDirection = (x, width, start, end, velocity) => {
    if ((x + width) >= end || x < start)
        return -velocity;
    return velocity;
}

const update = () => {
    scanner1Velocity = getDirection(scanner1X, scanner1Width, scanner1Start, scanner1End, scanner1Velocity);
    scanner1X += scanner1Velocity;

    scanner2Velocity = getDirection(scanner2X, scanner2Width, scanner2Start, scanner2End, scanner2Velocity);
    scanner2X += scanner2Velocity;

    scanner3Velocity = getDirection(scanner3Y, scanner3Height, 0, HEIGHT, scanner3Velocity);
    scanner3Y += scanner3Velocity;
}

function drawVerticalScanner(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function getVerticalScannerColor(x, width) {
    let scannerColor = getColor(x, x + width, particle1X, particle1X + particle1Width);
    if (scannerColor !== r.RED) {
        scannerColor = getColor(x, x + width, particle2X, particle2X + particle2Width);
    }
    return scannerColor;
}

const drawHorizontalScanner = (x, y, width, height, color) => {
    r.DrawRectangle(x, y, width, height, color);
}

const getHorizontalScannerColor = (y, height) => {
    return getColor(y, y + height, particle3Y, particle3Y + particle3Height);
}

const draw = () => {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particle2X, particle2Y, particle2Width, HEIGHT, r.SKYBLUE);
    r.DrawRectangle(particle1X, particle1Y, particle1Width, HEIGHT, r.SKYBLUE);
    r.DrawRectangle(particle3X, particle3Y, WIDTH, particle3Height, r.SKYBLUE);

    let scanner1Color = getVerticalScannerColor(scanner1X, scanner1Width);
    drawVerticalScanner(scanner1X, scanner1Y, scanner1Width, HEIGHT, scanner1Color);

    let scanner2Color = getVerticalScannerColor(scanner2X, scanner2Width);
    drawVerticalScanner(scanner2X, scanner2Y, scanner2Width, HEIGHT, scanner2Color);

    let scanner3Color = getHorizontalScannerColor(scanner3Y, scanner3Height);
    drawHorizontalScanner(scanner3X, scanner3Y, scanner3Width, scanner3Height, scanner3Color);

    r.EndDrawing();
}

const isRunning = () => {
    return !r.WindowShouldClose();
}

const tearDown = () => {
    r.CloseWindow();
}

module.exports = { setup, update, draw, isRunning, tearDown };
