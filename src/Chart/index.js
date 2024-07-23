
import { Application } from "pixi.js";
import * as d3 from "d3";
import { initBg, updateBg } from "./draw/bg.js";
import { initGradient, updateGradient } from "./draw/gradient.js";
import { initPlot, updatePlot } from "./draw/plot.js";
import { initAxis, updateAxis } from "./draw/axis.js";
import {
    initIndicator,
    initIndicatorAxes,
    updateIndicator,
} from "./draw/indicator.js";
import {
    initStartFinishLines,
    updateStartFinishLines,
} from "./draw/start-finshish-lines.js";
import tweenManager, { lerp } from "./lib/tweenManager.js";
import useGameParams from "@/composables/useGameParams.ts";

const { timerStart, timerEnd } = useGameParams()
let tradeGameChart;
let app;
const run = (chartWrapper) => {
    maxPoints = MAX_POINTS
    tradeGameChart = chartWrapper
    app = new Application({
        antialias: true,
        resolution: window.devicePixelRatio,
        backgroundColor: 0x525973,
        resizeTo: tradeGameChart,
    });
    tradeGameChart.appendChild(app.view);
    // Иниициализация pixi компонентов графика, отрисовка в порядке создания
    initBg(app);
    initGradient(app);
    initAxis(app);
    initIndicatorAxes(app);
    initPlot(app);
    initIndicator(app);
    initStartFinishLines(app);
    app.ticker.add(render);
}
////////////////////
let MAX_POINTS = 100
let MIN_POINTS = 50
let tickInterval = 500
let data = []; // тики
let maxPoints; // количество отрисовываемых тиков

let gameState = {}; // состояние игры

let currentPrice; // цена последнего тика

// для вычисления текущего времени без использования локальных часов клиента
let nowTimestampDate;
let nowTimestampMs;

// animated
let lastExtent = [0, 0];
let animExtent = [0, 0];
let actualExtent = [0, 0];

let animateMaxTicksStarted = false;

// мэппинг тиков в экранное пространство
function transform(delta, data, maxPoints, currentPrice, startPrice) {
    let MARGIN_RIGHT = app.screen.width / 3;

    if (!nowTimestampDate) {
        nowTimestampDate = data.at(-2).t;
        nowTimestampMs = performance.now();
    }

    // текущее виртуальное время, без использования клиентских часов
    const nowTimestamp = nowTimestampDate + (performance.now() - nowTimestampMs);

    const view = data.slice(data.length - maxPoints, data.length - 1);

    if (data[data.length - 2].t > nowTimestamp) {
        nowTimestampDate = data.at(-2).t;
        nowTimestampMs = performance.now();
    }

    if (data.at(-1).isNew) {
        data.at(-1).isNew = false;

        animateLastTick(data.at(-2).price, data.at(-1).price);
    }

    const pxSec = (app.screen.width - MARGIN_RIGHT) / ((maxPoints - 2) * tickInterval);

    const scaledX = (timestamp) => {
        return app.screen.width - MARGIN_RIGHT - (nowTimestamp - timestamp) * pxSec;
    };

    if (data.at(-1).t < nowTimestamp) data.at(-1).t = nowTimestamp;

    const last_view = Object.assign({}, view[view.length - 1])
    last_view.price = lastTickAnimated.price
    const yExtent = d3.extent([...view, last_view], function (d) {
        return d.price;
    });
    /* const yRange = yExtent[1] - yExtent[0];
              yExtent[0] -= yRange / 4;
              yExtent[1] += yRange / 4; */
    const ratioH = 0.6 // actual graph Y range divided by H
    const range = [app.screen.height * (1 + ratioH) / 2, app.screen.height * (1 - ratioH) / 2]
    let scaledY = d3
        .scaleLinear()
        .domain(yExtent)
        .range(range);
    // .nice();

    if (animateMaxTicksStarted) {
        tweenExtent.to(d3.extent([...data.slice(data.length - tween._to.n), last_view], function (d) {
            return d.price;
        }))
        scaledY = d3
            .scaleLinear()
            .domain(extentAnimated)
            .range(range);
        // .nice();
    } else if (
        // animateMaxTicksStarted ||
        priceCorridorAnimationStarted) {
        tweenExtent.to(d3.extent([...view, last_view], function (d) {
            return d.price;
        }))
        scaledY = d3
            .scaleLinear()
            .domain(extentAnimated)
            .range(range);
        // .nice();
    } else {
        if (yExtent[0] > lastExtent[0] || yExtent[1] < lastExtent[1]) {
            scaledY = d3
                .scaleLinear()
                .domain(lastExtent)
                .range(range);

            priceCorridorAnimationStarted = true;

            animateExtent(lastExtent, yExtent);
        }
    }
    lastExtent = yExtent;

    let points = view.map((el) => {
        let x = scaledX(el.t);

        return {
            x: scaledX(el.t),
            y: scaledY(el.price),
        };
    });

    points.push({
        x: scaledX(nowTimestamp),
        y: scaledY(lastTickAnimated.price),
    });

    let ticksPrices = scaledY.ticks(4);
    // if (ticksPrices.length < 2) ticksPrices = scaledY.ticks(3);
    const _ticks = ticksPrices.map((el) => {
        return { y: scaledY(el), price: el };
    });
    let ticks = []
    const diff = _ticks.length > 1 ? { y: _ticks[1].y - _ticks[0].y, price: _ticks[1].price - _ticks[0].price } : { y: 0, price: 0 }
    if (_ticks.length > 0)
        ticks = [
            { y: _ticks[0].y - diff.y * 3, price: _ticks[0].price - diff.price * 3 },
            { y: _ticks[0].y - diff.y * 2, price: _ticks[0].price - diff.price * 2 },
            { y: _ticks[0].y - diff.y, price: _ticks[0].price - diff.price },
            ...ticks.concat(_ticks),
            { y: _ticks[_ticks.length - 1].y + diff.y, price: _ticks[_ticks.length - 1].price + diff.price },
            { y: _ticks[_ticks.length - 1].y + diff.y * 2, price: _ticks[_ticks.length - 1].price + diff.price * 2 },
            { y: _ticks[_ticks.length - 1].y + diff.y * 3, price: _ticks[_ticks.length - 1].price + diff.price * 3 },
        ]
    const prices = {
        current: {
            price: currentPrice,
            y: points[points.length - 1].y,
        },
        start: {
            price: gameState.start_price,
            y: scaledY(gameState.start_price),
        },
    };

    const startFinish = {
        start: {
            x: scaledX(gameState.round_start_time || gameState.trade_end_time),
            y: gameState.start_price ? scaledY(gameState.start_price) : undefined,
        },
        finish: {
            x: scaledX(gameState.round_end_time),
            y: gameState.end_price ? scaledY(gameState.end_price) : undefined,
        },
    };

    return {
        points,
        ticks,
        prices,
        startFinish,
    };
}

function render(delta) {
    tweenManager.update();
    updateBg(app);
    if (data.length < maxPoints) return;

    currentPrice = data[data.length - 1].price;

    const { points, ticks, prices, startFinish } = transform(
        delta,
        data,
        maxPoints,
        currentPrice
    );

    const priceY =
        startFinish.start.y
            ? startFinish.start.y
            :
            points[points.length - 1].y;


    updatePlot(app, points);
    updateAxis(app, ticks);

    let isTrendUp;
    if (gameState.round_start_time < data[data.length - 1].t && data[data.length - 1].t < gameState.round_end_time) {
        isTrendUp = lastTickAnimated.price >= gameState.start_price;
    }

    updateGradient(app, priceY, isTrendUp);
    updateIndicator(app, prices, isTrendUp);

    updateStartFinishLines(app, startFinish);

}


let maxTicksAnimated = { n: 0 };
const tween = tweenManager.createTween(maxTicksAnimated);

function animateMaxTicks(from, to) {

    // console.log("animateMaxTicks", from, to)
    // tween.reset();
    tween.from({ n: from }).to({ n: to });
    tween.time = 2000;

    tween.on("start", () => {
        animateMaxTicksStarted = true;
    });
    tween.on("end", () => {
        // lastExtent = d3.extent(data.slice(data.length - to), function (d) {
        //     return d.price;
        // })
        animateMaxTicksStarted = false;
    });

    tween.on("update", (progress, elapsedTime) => {
        maxPoints = maxTicksAnimated.n;
    });
    tween.start();
}

///////////////////////////////////////

let priceCorridorAnimationStarted = false;
let extentAnimated = [0, 0];
const tweenExtent = tweenManager.createTween(extentAnimated);

function animateExtent(oldPriceCorridor, newPriceCorridor) {

    // console.log("animateExtent", oldPriceCorridor, newPriceCorridor, newPriceCorridor[0] > oldPriceCorridor[0] ? "Down eat" : "Up eat")
    tweenExtent.from(oldPriceCorridor).to(newPriceCorridor);
    tweenExtent.time = 500;


    tweenExtent.on("start", () => {
        priceCorridorAnimationStarted = true;
    });

    tweenExtent.on("end", () => {
        priceCorridorAnimationStarted = false;
    });

    tweenExtent.on("update", (progress, elapsedTime) => {
        // animExtent[0] = lerp(oldPriceCorridor[0], actualExtent[0], progress);
        // animExtent[1] = lerp(oldPriceCorridor[1], actualExtent[1], progress);
    });
    tweenExtent.start();
}


let lastTickAnimated = { price: 0 };
const tweenLastTick = tweenManager.createTween(lastTickAnimated);

function animateLastTick(from, to) {
    tweenLastTick.from({ price: from }).to({ price: to });
    tweenLastTick.time = 500;

    tweenLastTick.on("update", (progress, elapsedTime) => {
        // console.log('progress: ' + progress, lastTickAnimated)
    });
    tweenLastTick.start();
}

// обработка нового состояния игры
function gameStateChanged() {
    if (!nowTimestampDate) {
        nowTimestampDate = data.at(-2).t;
        nowTimestampMs = performance.now();
    }
    const nowTimestamp = nowTimestampDate + (performance.now() - nowTimestampMs);
    const diff = Date.now() - nowTimestamp
    if (gameState.start_price && !gameState.end_price) {
        timerStart.value = nowTimestamp + diff
        timerEnd.value = gameState.round_end_time + diff
        animateExtent(lastExtent, d3.extent(data.slice(data.length - MIN_POINTS), function (d) {
            return d.price;
        }));
        animateMaxTicks(MAX_POINTS, MIN_POINTS);
    }
    if (!gameState.start_price && !gameState.end_price) {
        timerStart.value = nowTimestamp + diff
        timerEnd.value = gameState.trade_end_time + diff
    }
    if (gameState.start_price && gameState.end_price) {
        animateExtent(
            d3.extent(data.slice(data.length - MIN_POINTS), function (d) {
                return d.price;
            }),
            d3.extent(data.slice(data.length - MAX_POINTS), function (d) {
                return d.price;
            }));
        animateMaxTicks(MIN_POINTS, MAX_POINTS);
    }
}


//! For integration
const addTick = (tick) => {
    let tickData = {
        t: parseFloat(tick.timestamp),
        price: parseFloat(tick.price),
        isNew: true,
    };
    data.push(tickData);
    if (data.length > MAX_POINTS) {
        data.splice(0, data.length - MAX_POINTS)
    }
}

const updateState = (stateData) => {
    if (gameState.end_price && stateData.end_price) return
    gameState = stateData;
    gameStateChanged();
}

const setChartHistory = (historyData) => {
    historyData.reverse().forEach((el) =>
        data.push({
            t: parseFloat(el.data.timestamp),
            price: parseFloat(el.data.price),
            prev_x: null,
            isNew: true,
        })
    );
}
const setGameHistory = (historyData) => {
    const data = historyData[0].data
    gameState = {
        ...data,
        start_price: data.start_price === "None" ? null : data.start_price,
        end_price: data.end_price === "None" ? null : data.end_price
    }
    gameStateChanged()
}

const configure = (config) => {
    MAX_POINTS = config.maxPoints || 100
    MIN_POINTS = config.minPoints || 50
    tickInterval = config.tickInterval || 500
}
export default {
    configure,
    run,
    addTick,
    updateState,
    setChartHistory,
    setGameHistory,
}