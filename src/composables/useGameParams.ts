import { ref } from "vue";

const timerStart = ref(Date.now())
const timerEnd = ref(Date.now() + 30_000)

export default () => ({
    timerStart,
    timerEnd
})