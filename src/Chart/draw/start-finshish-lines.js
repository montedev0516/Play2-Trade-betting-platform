import { Sprite } from "pixi.js";
import {
    SmoothGraphics as Graphics,
    DashLineShader,
} from "@pixi/graphics-smooth";

let lineStart, lineFinish;
let spriteStart, spriteFinish;
let startPrice;

const shader = new DashLineShader({ dash: 4, gap: 4 });

export function initStartFinishLines(app) {
    lineStart = new Graphics();
    lineStart.alpha = 0.5;
    app.stage.addChild(lineStart);

    lineFinish = new Graphics();
    lineFinish.alpha = 0.5;
    app.stage.addChild(lineFinish);

    startPrice = new Graphics();
    startPrice.alpha = 0.8;
    app.stage.addChild(startPrice);

    spriteStart = Sprite.from("/images/chart/icon-start.png");
    spriteStart.alpha = 1;
    spriteStart.scale.set(1);
    spriteStart.y = 14;
    app.stage.addChild(spriteStart);

    spriteFinish = Sprite.from("/images/chart/icon-finish.png");
    spriteFinish.alpha = 1;
    spriteFinish.scale.set(1);
    spriteFinish.y = 14;

    app.stage.addChild(spriteFinish);
}

export function updateStartFinishLines(app, startFinish) {
    let { start, finish } = startFinish;

    lineStart.clear();
    lineStart.lineStyle({ width: 2, color: 0xffffff, shader });
    lineStart.moveTo(start.x, 35);
    lineStart.lineTo(start.x, app.screen.height - 5);

    spriteStart.x = start.x - 4;

    lineFinish.clear();
    lineFinish.lineStyle({ width: 2, color: 0xffffff, shader });
    lineFinish.moveTo(finish.x, 35);
    lineFinish.lineTo(finish.x, app.screen.height - 5);

    startPrice.clear();
    startPrice.beginFill(0xf1c48f);
    startPrice.drawCircle(
        start.x,
        start.y || -100,
        3
    );
    startPrice.endFill();


    spriteFinish.x = finish.x - 4;
}
