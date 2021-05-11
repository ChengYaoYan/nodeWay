const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject('error happend');


function foo(iterable) {
    let completed = 0;

    return new Promise((resolve, reject) => {
        iterable.forEach(elem => {
            elem.then(done)
                .catch((err) => {
                    reject(err);
                });
        });

        function done() {
            if (++completed === iterable.length) {
                resolve([1, 2, 3]);
            }
        }
    })
}

const p = foo([promise1, promise2, promise3]);
console.log(p);
p
    .then(value => {
        console.log(value);
    })
    .catch(err => {
        console.error(err);
    })

