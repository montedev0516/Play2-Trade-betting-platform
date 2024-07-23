import { Graphics, Filter } from "pixi.js";
import { linearGradient } from "../lib/linearGradient.js";

let gradientRed, gradientGreen, overlayBlack;

export function initGradient(app) {
    // зеленый градиент
    gradientGreen = new Graphics();
    gradientGreen.beginFill(0x000000);
    gradientGreen.drawRect(0, 0, app.screen.width, app.screen.height / 2);
    gradientGreen.endFill();
    gradientGreen.alpha = 0.8

    const linearShaderGreen = linearGradient({
        colors: [
            [0.4, 0.59, 0.37, 1],
            [0.0, 0.49, 0.30, 0.7],
        ],
        rotation: 90,
    });
    const filterGreen = new Filter(
        undefined,
        linearShaderGreen.fragmentShader,
        linearShaderGreen.uniforms
    );
    gradientGreen.filters = [filterGreen];
    app.stage.addChild(gradientGreen);

    // красный градиент
    gradientRed = new Graphics();
    gradientRed.beginFill(0x000000);
    gradientRed.drawRect(
        0,
        app.screen.height / 2,
        app.screen.width,
        app.screen.height
    );
    gradientRed.endFill();
    gradientRed.alpha = 0.8

    const linearShaderRed = linearGradient({
        colors: [
            [0.9, 0.06, 0, 0.7],
            [0.9, 0.04706, 0.04706, 1],
        ],
        rotation: 90,
    });
    const filterRed = new Filter(
        undefined,
        linearShaderRed.fragmentShader,
        linearShaderRed.uniforms
    );
    gradientRed.filters = [filterRed];
    app.stage.addChild(gradientRed);

    overlayBlack = new Graphics();
    overlayBlack.beginFill(0x000000);
    overlayBlack.drawRect(0, 0, app.screen.width, app.screen.height);
    overlayBlack.endFill();
    overlayBlack.alpha = 0

    const linearShaderBlack = linearGradient({
        colors: [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 1],
        ],
        stops: [
            0, 0.3, 0.7, 1
        ],
        rotation: 90,
    });
    const filterBlack = new Filter(
        undefined,
        linearShaderBlack.fragmentShader,
        linearShaderBlack.uniforms
    );
    overlayBlack.filters = [filterBlack];
    app.stage.addChild(overlayBlack);
}

export function updateGradient(app, priceY, trend_up) {
    if (priceY <= 0) priceY = app.screen.height / 2
    gradientGreen.clear();
    gradientGreen.beginFill(0x000000);
    gradientGreen.drawRect(0, 0, app.screen.width, priceY);
    gradientGreen.endFill();

    gradientRed.clear();
    gradientRed.beginFill(0x000000);
    gradientRed.drawRect(0, priceY, app.screen.width, app.screen.height);
    gradientRed.endFill();
    if (trend_up !== undefined) {
        if (trend_up) {
            gradientGreen.alpha = 1
            gradientRed.alpha = 0.8
        } else {
            gradientGreen.alpha = 0.8
            gradientRed.alpha = 1
        }
    } else {
        gradientGreen.alpha = 0.9
        gradientRed.alpha = 0.8
    }
    if (window.innerWidth > 480) {
        overlayBlack.alpha = 0
    } else {
        overlayBlack.clear()
        overlayBlack.beginFill(0x000000);
        overlayBlack.drawRect(0, 0, app.screen.width, app.screen.height);
        overlayBlack.endFill();
        overlayBlack.alpha = 1
    }
}
