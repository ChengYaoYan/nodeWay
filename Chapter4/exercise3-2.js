function spiderLinks(currentUrl, body, nesting, cb) {
    if (nesting === 0) {
        return process.nextTick(cb);
    }

    const links = getPageLinks(currentUrl, body);
    if (links.length === 0) {
        return process.nextTick(cb);
    }

    let completed = 0;
    let hasErrors = false;

    function done(err) {
        if (err) {
            hasErrors = true;
            return cb(err);
        }
        if (++completed === links.length && !hasErrors) {
            return cb();
        }
    }

    links.forEach(link => spider(link, nesting - 1, done));
}

// the pattern
const tasks = [];

let completed = 0;
tasks.forEach(task => {
    task(() => {
        if (++completed === tasks.length) {
            finish();
        }
    })
})

function finish() {
}
