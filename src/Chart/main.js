import axios from "axios";
import tradeGameChart from ".";
import { Centrifuge } from "centrifuge";
import { appiUrl, wsUrl } from "@/config";
import { getCookie } from "@/utils/cookie";
import useCentrifugeConnection from "@/composables/useCentrifugeConnection";

const centrifugeConnection = useCentrifugeConnection()
export function Chart(chartSelector) {

    /***********************************************************************************/
    //! From here, we will initialize and set game chart state.
    /***********************************************************************************/

    //! Initialize Chart
    const MAX_POINTS = 100
    const MIN_POINTS = 50
    const TICK_INTERVAL = 500 //500ms
    tradeGameChart.configure({
        maxPoints: MAX_POINTS, // Number of points when zoomed out
        minPoints: MIN_POINTS, // Number of points when zoomed in
        tickInterval: TICK_INTERVAL, // Time interval between incoming points data
    })

    //! Add tick to chart
    centrifugeConnection.on("subChartData", function (message) {
        //console.log('ChartData', message.data);
        tradeGameChart.addTick(message.data) // Add a tick to chart
    })

    // //! Update Game State
    centrifugeConnection.on("subGame", function (message) {
        tradeGameChart.updateState({
            ...message.data,
            start_price: message.data.start_price === "None" ? null : message.data.start_price,
            end_price: message.data.end_price === "None" ? null : message.data.end_price
        }) // Update Game State
    })
    //! Set History when initializing
    centrifugeConnection.on("historyChartData", function (resp) {
        // console.log('history', resp);
        tradeGameChart.setChartHistory(resp.publications) // Add historical points to chart when initializing chart at first
    })
    
    centrifugeConnection.on("historyGame",function (resp) {
        tradeGameChart.setGameHistory(resp.publications) // Tell chart current game state when chart is initialized
    })

    centrifugeConnection.connect(MAX_POINTS) // Call connect() at the end

    const chartWrapper = document.querySelector(chartSelector) //! When use JSX Element, you can get this using useRef hook.
    tradeGameChart.run(chartWrapper)

}