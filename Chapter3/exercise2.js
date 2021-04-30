import { EventEmitter } from 'events';

function counter(count) {
    console.log(`tick count is ${count}`);
}

function ticker(number, callback) {
    const emitter = new EventEmitter();
    const start = Date.now();

    const id = setInterval(() => {
        emitter.emit('tick');

        if (Date.now() - start > number) {
            clearInterval(id);

            callback(number / 50);
        }
    }, 50);
   
    return emitter;
}

// ticker(500, counter)
//     .on('tick', () => console.log("passed 50 milliseconds"));

// class way
class Ticker extends EventEmitter {
    constructor(number) {
        super();
        this.number = number;
    }

    start() {
        const start = Date.now();

        const id = setInterval(() => {
            this.emit('tick');

            if (Date.now() - start > this.number) {
                clearInterval(id);
                console.log(`tick count is ${this.number / 50}`);
            }
        }, 50);

        return this;
    }
}

const tickerClass = new Ticker(50000);
tickerClass.start()
    .on('tick', () => console.log('passed 50 milliseconds'));
