function promiseAllFake(iterable) {
    if (iterable === undefined) {
        throw new Error('TypeError: undefined is not iterable');
    }
    if (iterable.length === 0) {
        return Promise.resolve([]);
    }

    let completed = 0;

    return new Promise((resolve, reject) => {
        const result = [];

        iterable.forEach((elem, index) => {
            if (elem.then && typeof elem.then === 'function') {
                elem
                    .then((value) => {
                        result[index] = value;
                        if (++completed === iterable.length) {
                            resolve(result);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                result[index] = elem;
                if (++completed === iterable.length) {
                    resolve(result);
                }
            }
        });
    });
}


const promise1 = 1,
    promise2 = Promise.resolve(2),
    promise3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 1000);
    }),
    promise4 = Promise.reject('promise4 error');

const p = promiseAllFake([promise1, promise2, promise3, promise4]);
console.log(p);
console.log('hello');
p
    .then(value => {
        console.log(value);
    })
    .catch(err => {
        console.error(err);
    })
