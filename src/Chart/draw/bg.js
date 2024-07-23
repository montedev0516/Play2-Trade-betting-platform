import { Sprite } from "pixi.js";

let icon;

export function initBg(app) {
    icon = Sprite.from("/images/chart/bg.png");

    icon.anchor.set(0.5);
    icon.scale.set(1.4);
    app.stage.addChild(icon);
}

export function updateBg(app) {
    icon.x = app.screen.width / 2;
    icon.y = app.screen.height / 2;
}
