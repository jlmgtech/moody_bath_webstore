export default class AsyncQueue {
    constructor() {
        this.queue = [];
        this.resolve = () => {};
    }

    push(fn) {
        const is_stopped = this.queue.length === 0;
        this.queue.push(fn);
        if (is_stopped) {
            this.resolve();
        }
    }

    async next() {
        if (this.queue.length === 0) {
            await new Promise(resolve => this.resolve = resolve);
        }
        return this.queue.shift()();
    }
}
