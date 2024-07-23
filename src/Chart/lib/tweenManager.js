export function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}
const _tweenInstances = []
export default {
    createTween: function (obj) {
        const tweenInstance = {
            obj: obj,
            time: 1000,
            _from: {},
            _to: {},
            _started: false,
            _startedTime: 0,
            onStart: () => { },
            onEnd: () => { },
            onUpdate: () => { },

            from: function (obj) {
                this._from = obj
                return this
            },
            to: function (obj) {
                this._to = obj
                return this
            },
            on: function (event, callback) {
                if (event === "start") {
                    this.onStart = callback
                }
                if (event === "end") {
                    this.onEnd = callback
                }
                if (event === "update") {
                    this.onUpdate = callback
                }
            },
            start: function () {
                this._started = true
                this._startedTime = Date.now()
                this.onStart()
            },
            stop: function () {
                this._started = false
                return this.obj
            }
        }
        _tweenInstances.push(tweenInstance)
        return tweenInstance
    },
    update: function () {
        const now = Date.now()
        // const removes = []
        _tweenInstances.forEach((item) => {
            if (item._started === false) return
            const phase = Math.min(1, (now - item._startedTime) / item.time)
            const keys = Object.keys(item._from)
            keys.forEach(key => {
                item.obj[key] = lerp(item._from[key], item._to[key], phase)
            })
            if (phase === 1) {
                item.onEnd()
                item._started = false
                // removes.push(item)
            }
            item.onUpdate(phase)
        })
        // removes.forEach(remove => {
        //     _tweenInstances.splice(_tweenInstances.indexOf(remove), 1);
        // })
    },
}