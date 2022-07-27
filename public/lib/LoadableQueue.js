export default class LoadableQueue {
    constructor(isLoaded) {
        this.isLoaded = isLoaded;
        this.queue = [];
    }

    async next() {
        await this.isLoaded;
        return this.queue.shift();
    }
}
