import axios from "axios";
import { Centrifuge, HistoryResult, PublicationContext } from "centrifuge";
import { appiUrl, wsUrl } from "@/config";

const getCentrifugeToken = async () => {
    const response = await axios.get(`${appiUrl}/users/token/centrifugo`)
    return response.data.ws_token;
}
const centrifuge = new Centrifuge(`${wsUrl}/connection/websocket`, {
    getToken: getCentrifugeToken,
    maxServerPingDelay: 5000
});

const subChartDataCallbacks: ((message: PublicationContext) => void)[] = []
const subGameCallbacks: ((message: PublicationContext) => void)[] = []
const historyChartDataCallbacks: ((message: HistoryResult) => void)[] = []
const historyGameCallbacks: ((message: HistoryResult) => void)[] = []
let isCentrifugeConnected = false
const connect = (max_points: number) => {
    if (isCentrifugeConnected) return
    const subChartData = centrifuge.newSubscription('BTCUSD');
    subChartData.on('publication', function (message) {
        subChartDataCallbacks.forEach(cb => cb(message))
    });
    subChartData.subscribe();


    const subGame = centrifuge.newSubscription('Game');
    subGame.on('publication', function (message) {
        subGameCallbacks.forEach(cb => cb(message))
    });
    subGame.subscribe();

    centrifuge.history("BTCUSD", { limit: max_points, reverse: true }).then(function (resp) {
        historyChartDataCallbacks.forEach(cb => cb(resp))
    }, function (err) {
        console.log('history error', err);
    });
    centrifuge.history("Game", { limit: 1, reverse: true }).then(function (resp) {
        historyGameCallbacks.forEach(cb => cb(resp))
    }, function (err) {
        console.log('history error', err);
    });

    centrifuge.connect();
    isCentrifugeConnected = true
}
const on = (type: "subChartData" | "subGame" | "historyChartData" | "historyGame", cb: (message: PublicationContext | HistoryResult) => void) => {
    if (type === "subChartData") subChartDataCallbacks.push(cb)
    if (type === "subGame") subGameCallbacks.push(cb)
    if (type === "historyChartData") historyChartDataCallbacks.push(cb)
    if (type === "historyGame") historyGameCallbacks.push(cb)
}
export default () => ({
    connect,
    on
})