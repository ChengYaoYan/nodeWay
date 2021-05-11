import fs from 'fs';

function recursiveFind(path, keyword, cb) {
    fs.stat(path, (err, stats) => {
        if (err) {
            return cb(err);
        }
        if (!stats.isDirectory()) {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    return cb(err);
                }
                if (data.indexOf(keyword) >= 0) {
                    result.push(path);
                }
                return cb();
            })
        } else {
            ls(path, keyword, cb);
        }
    })
}

function ls(path, keyword, cb) {
    fs.readdir(path, (err, files) => {
        if (err) {
            return cb(err);
        }

        files = files.map(file => {
            return path + '/' + file;
        })
        if (files.length === 0) {
            return process.nextTick(cb);
        }

        let completed = 0;
        let hasErrors = false;

        function done(err) {
            if (err) {
                hasErrors = true;
                return cb(err);
            }
            if (++completed === files.length && !hasErrors) {
                return cb();
            }
        }
        
        files.forEach(file => recursiveFind(file, keyword, done));
    })
}
    
const result = [];
recursiveFind('.', 'cb', err => {
    if (err) {
        console.error(err);
    }
    console.log(result);
});
