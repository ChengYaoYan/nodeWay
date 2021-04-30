import { EventEmitter } from 'events';

function counter(count) {
    console.log(`tick count is ${count}`);
}

function ticker(number, callback) {
    const emitter = new EventEmitter();
    const start = Date.now();

    process.nextTick(() => {
        emitter.emit('start');
    })

    if (start % 5 == 0) {
        return emitter.emit('error');
    }

    const id = setInterval(() => {
        if (start % 5 == 0) {
            return emitter.emit('error');
        }

        emitter.emit('tick');

        if (Date.now() - start > number) {
            clearInterval(id);

            callback(number / 50);
        }
    }, 50);
   
    return emitter;
}

ticker(1000, counter)
    .on('start', () => console.log('start...'))
    .on('tick', () => console.log('passed 50 milliseconds'))
    .on('error', () => console.error('current timestamp is divisible by 5'));
