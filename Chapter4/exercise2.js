import fs from 'fs';

async function listNestedFiles(path, cb) {
    fs.stat(path, (err, stats) => {
        if (err) {
            throw err;
        }
        if (!stats.isDirectory()) {
            return cb(path);
        }
    });

    try {
        const dir = await fs.promises.opendir(path);
        for await (const dirent of dir) {
            if (dirent.isDirectory()) {
                listNestedFiles(dirent.name, cb);
            } else {
                cb(dirent.name);
            }
        }
    } catch(e) {
        console.error(e);
    }
}

function cb(file) {
    result.push(file);
}

const result = [];
listNestedFiles('./', cb)
    .then(() => {
        console.log(result);
    });
