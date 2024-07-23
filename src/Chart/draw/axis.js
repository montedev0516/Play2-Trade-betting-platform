import { Graphics, Text, TextStyle } from "pixi.js";
import * as d3 from "d3";

const MARGIN = 8; // отступы слева-справа
let small = true;

let lines = [];
let texts = [];

const style = new TextStyle({
    fontFamily: "Barlow Semi Condensed",
    fontSize: 20,
    fill: 0xffffff,
});

const f = d3.format(",.1f");

export function initAxis(app) {
    for (let index = 0; index < 10; index++) {
        let line = new Graphics();
        line.lineStyle(5, 0xffffff, 1);
        app.stage.addChild(line);
        lines.push(line);

        let text = new Text();
        text.style = style;
        app.stage.addChild(text);
        texts.push(text);
    }
}

export function updateAxis(app, ticks) {
    small = app.screen.width < 600;
    let scaleSize = small ? 0.7 : 1;
    let lineLengthAdjustment = small ? 15 : 0;

    for (let index = 0; index < 10; index++) {
        let line = lines[index];
        line.clear();

        let text = texts[index];
        text.text = "";

        if (index < ticks.length) {
            let tickY = ticks[index].y;
            let tickPrice = ticks[index].price;

            line.lineStyle(1, 0xc0e0e0, 0.8);

            line.moveTo(0, tickY);
            line.lineTo(app.screen.width - MARGIN - 80 + lineLengthAdjustment * 2, tickY);

            text.anchor.set(0.5);
            text.x = app.screen.width - MARGIN - 35 + lineLengthAdjustment;
            text.y = tickY;
            text.text = f(tickPrice);
            text.tint = 0xc0e0e0;
            text.scale.set(scaleSize, scaleSize);
        }
    }
}
