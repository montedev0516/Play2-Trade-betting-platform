export const clickOutside = {
    beforeMount: (element: HTMLElement, binding: { value: () => void }): void => {
        let ignoreClick = false

        element.addEventListener('mousedown', (event: MouseEvent) => {
            if (event.target === element && event.button === 0) {
                ignoreClick = true
            }
        })

        element.addEventListener('mouseup', (event: MouseEvent) => {
            if (event.target === element && ignoreClick && event.button === 0) {
                binding.value()
            } else {
                ignoreClick = false
            }
        })
    },
    unmounted: (element: HTMLElement): void => {
        element.removeEventListener('mousedown', () => {})
        element.removeEventListener('mouseup', () => {})
    }
}