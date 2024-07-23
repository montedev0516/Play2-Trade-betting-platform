import { isRef, watch, unref, onMounted, onBeforeUnmount, Ref } from 'vue';

export function useCloseESCListener(
    target: Element | Ref<Element> | null,
    event: 'keydown' | 'keyup',
    handler: (event: KeyboardEvent) => void
): void {
    const listener = (event: Event) => {
        if ((event as KeyboardEvent).key === 'Escape') {
            handler(event as KeyboardEvent);
        }
    };

    if (isRef(target)) {
        watch(target, (newValue, oldValue) => {
            oldValue?.removeEventListener(event, listener);
            newValue?.addEventListener(event, listener as EventListener);
        });
    } else if (target !== null) {
        onMounted(() => {
            target.addEventListener(event, listener as EventListener);
        });
    }

    onBeforeUnmount(() => {
        unref(target)?.removeEventListener(event, listener as EventListener);
    });
}