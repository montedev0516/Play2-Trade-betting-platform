import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import * as PIXI from 'pixi.js'
let plot;
let circle;

export function initPlot(app) {
    plot = new Graphics();
    plot.lineStyle(5, 0xf1c40f, 1);
    app.stage.addChild(plot);

    circle = new Graphics();
    app.stage.addChild(circle);
}

export function updatePlot(app, points, debugPoint, debugPoint2) {
    plot.clear();
    plot.lineStyle({
        width: 3,
        alpha: 1,
        color: 0xf6c45f,
        join: PIXI.LINE_JOIN.ROUND,
        cap: PIXI.LINE_CAP.ROUND,
    });
    plot.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        if (points[i - 1].x < points[i].x)
            plot.lineTo(points[i].x, points[i].y);
    }

    circle.clear();
    circle.beginFill(0xf1c40f);
    circle.drawCircle(
        points[points.length - 1].x,
        points[points.length - 1].y,
        5
    );
    circle.endFill();
}
