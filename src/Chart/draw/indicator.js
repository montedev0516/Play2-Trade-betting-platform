import { Graphics, Container, Text, TextStyle } from "pixi.js";
import * as d3 from "d3";

const MARGIN = 10; // отступы слева-справа

// current
let rect1, rect2, text1, text2, axisLine1;
let rect12, rect22, text12, text22, axisLine12;

let containerCurrentPrice, containerStartPrice;
let small = true;

const f = d3.format(",.2f");

const titleStyle = new TextStyle({
    fontFamily: "Barlow Semi Condensed",
    fontSize: 20,
    fontWeight: 600,
    fill: 0x000000,
});
const priceStyle = new TextStyle({
    fontFamily: "Barlow Semi Condensed",
    fontSize: 30,
    fontWeight: 600,
    fill: 0xf4d56f,
});

const priceStartStyle = new TextStyle({
    fontFamily: "Barlow Semi Condensed",
    fontSize: 30,
    fontWeight: 600,
    fill: 0xf4d56f,
});

export function initIndicatorAxes(app) {
    //currentPrice

    axisLine1 = new Graphics();
    axisLine1.lineStyle(5, 0xf4d56f, 1);
    app.stage.addChild(axisLine1);

    //startPrice

    axisLine12 = new Graphics();
    axisLine12.lineStyle(5, 0xf4d56f, 1);
    app.stage.addChild(axisLine12);
}

export function initIndicator(app) {
    containerCurrentPrice = new Container();
    containerStartPrice = new Container();

    containerCurrentPrice.x = -500;
    containerStartPrice.x = -500;

    //currentPrice
    rect1 = new Graphics();
    rect1.clear();
    rect1.beginFill(0x000000);
    rect1.lineStyle(1, 0xf4d56f, 0.3);
    rect1.drawRoundedRect(0, 0, 160, 60, 5);
    rect1.endFill();

    rect2 = new Graphics();
    rect2.clear();
    rect2.beginFill(0xf4d56f);
    rect2.lineStyle(1, 0x0, 0.3);
    rect2.drawRoundedRect(1, 1, 158, 24, 5);
    rect2.endFill();

    text1 = new Text();
    text1.anchor.set(0.5);
    text1.x = 160 / 2;
    text1.y = 42;

    text2 = new Text();
    text2.anchor.set(0.5);
    text2.x = 160 / 2;
    text2.y = 15;
    text2.text = "LIVE BITCOIN";

    containerCurrentPrice.addChild(rect1);
    containerCurrentPrice.addChild(rect2);
    containerCurrentPrice.addChild(text1);
    containerCurrentPrice.addChild(text2);
    app.stage.addChild(containerCurrentPrice);

    ////////////////////////////////////////////

    // startPrice
    rect12 = new Graphics();
    rect12.clear();
    rect12.beginFill(0x000000);
    rect12.lineStyle(1, 0xf4d56f, 0.3);
    rect12.drawRoundedRect(0, 0, 160, 60, 5);
    rect12.endFill();

    rect22 = new Graphics();
    rect22.clear();
    rect22.beginFill(0xf4d56f);
    rect22.lineStyle(1, 0x0, 0.3);
    rect22.drawRoundedRect(1, 1, 158, 24, 5);
    rect22.endFill();

    text12 = new Text();
    text12.anchor.set(0.5);
    text12.x = 160 / 2;
    text12.y = 42;

    text22 = new Text();
    text22.anchor.set(0.5);
    text22.x = 160 / 2;
    text22.y = 15;
    text22.text = "START RATE";

    containerStartPrice.addChild(rect12);
    containerStartPrice.addChild(rect22);
    containerStartPrice.addChild(text12);
    containerStartPrice.addChild(text22);
    app.stage.addChild(containerStartPrice);
}

export function updateIndicator(app, prices, trend_up) {
    small = app.screen.width < 600;

    // current price
    axisLine1.clear();
    axisLine1.lineStyle(1, 0xf4d56f, 1);
    axisLine1.moveTo(0, prices.current.y);
    axisLine1.lineTo(app.screen.width - MARGIN, prices.current.y);

    if (trend_up !== undefined) {
        if (trend_up) {
            text1.style.fill = 0x1ef642;
        } else {
            text1.style.fill = 0xf61e1e;
        }
    } else {
        text1.style.fill = 0xf4d56f;
    }

    text1.style = priceStyle;
    text1.text = f(prices.current.price);

    // title
    text2.style = titleStyle;

    containerCurrentPrice.pivot.set(
        containerCurrentPrice.width / 2,
        containerCurrentPrice.height / 2
    );
    if (small) {
        containerCurrentPrice.x =
            app.screen.width - containerCurrentPrice.width / 2 - MARGIN * 2.2;
        containerCurrentPrice.y =
            prices.current.y - containerCurrentPrice.height / 4;
        containerCurrentPrice.scale.set(0.5, 0.5);
    } else {
        containerCurrentPrice.x =
            app.screen.width - containerCurrentPrice.width / 2 - 3;
        containerCurrentPrice.y = prices.current.y;
        containerCurrentPrice.scale.set(1, 1);
    }

    ////////////////////////////////////////////

    // startPrice

    axisLine12.clear();
    axisLine12.lineStyle(1, 0xf4d56f, 1);
    axisLine12.moveTo(0 + MARGIN, prices.start.y);
    axisLine12.lineTo(app.screen.width - MARGIN, prices.start.y);

    text12.style = priceStartStyle;
    text12.text = f(prices.start.price);

    // title
    text22.style = titleStyle;

    containerStartPrice.pivot.set(
        containerStartPrice.width / 2,
        containerStartPrice.height / 2
    );

    if (small) {
        containerStartPrice.x = MARGIN * 2.2 + 1;
        containerStartPrice.y = prices.start.y - containerStartPrice.height / 4;
        containerStartPrice.scale.set(0.5, 0.5);
    } else {
        containerStartPrice.x = containerStartPrice.width / 2 + 5;
        containerStartPrice.y = prices.start.y;
        containerStartPrice.scale.set(1, 1);
    }
}
