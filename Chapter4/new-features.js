// iterator

/*
var mySymbol1 = Symbol('hello');
var mySymbol2 = Symbol.for('hello');
var mySymbol3 = Symbol.for('hello');

const foo = {
    'name': 'franklin'
};

foo[mySymbol3] = 'javascript';

console.log(foo[mySymbol3]);
*/

/*
function foo(pattern) {
    this.pattern = pattern;
}

foo.prototype[Symbol.search] = function(string) {
    return string.indexOf(this.pattern) === -1 ? 'NOT FOUND' : 'FOUND';
};

const roo = new foo('roo');
console.log('hel roo lo'.search(roo));
*/

/*
class Users {
    constructor(users) {
        this.users = users;
    }

    [Symbol.iterator]() {
        let i = 0;
        let users = this.users;

        return {
            next() {
                if (i < users.length) {
                    return {
                        done: false,
                        value: users[i++]
                    };
                }
                return {
                    done: true
                }
            }
        };
    }
}

const users = new Users([
    'franklin', 
    'taylor'
]);

const usersIterator = users[Symbol.iterator]();
console.log(usersIterator.next());
console.log(usersIterator.next());
console.log(usersIterator.next());
*/

// generator
/*
class Users {
    constructor(users) {
        this.users = users;
    }

    *getIterator() {
        for (let i in this.users) {
            yield this.users[i];
        }
    }
}

const users = new Users([
    'franklin', 
    'taylor'
]);

const usersIterator = users.getIterator();
console.log(usersIterator.next());
console.log(usersIterator.next());
console.log(usersIterator.next());

for (const u of usersIterator) {
    console.log(u);
}

console.log([...usersIterator]);

*/

/*
function *Users(users) {
    for (let i in users) {
        yield users[i++];
    }
}

const allUsers = Users([{ name: 'raja' }, { name: 'john' }, { name: 'matt' }]);

for (const u of allUsers) {
    console.log(u.name);
}

console.log([...allUsers]);
*/

function *generator(a, b) {
    const k = yield a + b;
    yield a + b + k;
}

const sum = generator(1, 2);
console.log(sum.next());
console.log(sum.next(3));
console.log(sum.next());

// async await

async function hello() {
    let greeting = '';
    return greeting = await Promise.resolve('Hello');
}

hello().then((value) => console.log(value));

fetch('coffee.jpg')
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.blob();
})
.then(myBlob => {
  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
})
.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});

async function fetchPic() {
        const response = await fetch('coffee.jpg');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const myBlob = await response.blob();
        let objectURL = URL.createObjectURL(myBlob);
        let image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
}

myFetch().catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
})