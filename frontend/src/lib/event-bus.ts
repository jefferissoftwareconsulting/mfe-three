declare global {
  interface Window {
    globalEventBus?: any;
  }
}

interface EventType {
  topic: string;
  payload?: unknown;
}

const eventBus = () => ({
  addListener: (listener: Function) => {
    window.globalEventBus
      ? window.globalEventBus.addListener(listener)
      : window.addEventListener("eventBus", ((e: CustomEvent) =>
        listener(e.detail)) as EventListener);
  },
  emit: (event: EventType) => {
    window.globalEventBus
      ? window.globalEventBus.emit(event)
      : window.dispatchEvent(new CustomEvent("eventBus", { detail: event }));
  },
});

export default eventBus;
