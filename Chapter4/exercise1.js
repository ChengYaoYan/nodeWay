import fs from 'fs';

const src = ['spider.js', 'spider-cli.js'];
const dest = 'dest.txt';
let content = '';

function concatFiles(src, dest, cb) {
    function iterate(index) {
        if (index === src.length) {
            return cb();
        }
        fs.readFile(src[index], 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            content += data;
            iterate(++index);
        })
    }

    iterate(0);
}

function cb() {
    fs.writeFile(dest, content, 'utf8', (err) => {
        if (err) {
            throw err;
        }
        console.log('The file has been saved!');
    });
}

concatFiles(src, dest, cb);