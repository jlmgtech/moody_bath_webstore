export default class AsyncQueue {
    constructor() {
        this.queue = [];
        this.resolve = () => {};
    }

    push(fn) {
        const is_stopped = this.queue.length === 0;
        this.queue.push(fn);
        if (is_stopped) {
            this.resolve(); // I'm expecting an error here
        }
    }

    async next() {
        if (this.queue.length === 0) {
            console.log("queue length is zero");
            await new Promise(resolve => this.resolve = resolve);
        }
        console.log("returning next value");
        return this.queue.shift()();
    }
}
