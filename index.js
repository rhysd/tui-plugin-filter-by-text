const fs = require('fs');
const path = require('path');

function loadConfigSync(file) {
    try {
        const json = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (json.regex) {
            json.regex = json.regex.map(r => new RegExp(r));
        }
        return json;
    } catch (e) {
        console.error('Tui: filter-by-text: Failed to load filter config:', e);
        return {};
    }
}

function matches(text, cfg) {
    if (text === '') {
        return false;
    }

    if (cfg.word) {
        for (const word of cfg.word) {
            if (text.indexOf(word) >= 0) {
                return true;
            }
        }
    }

    if (cfg.regex) {
        for (const r of cfg.regex) {
            if (r.test(text)) {
                return true;
            }
        }
    }

    return false;
}

module.exports = {
    onStart(ctx) {
        const file = path.join(ctx.electron.remote.app.getPath('userData'), 'tweet_filter.json');
        this.config = loadConfigSync(file);
        console.log('Tui: filter-by-text: Filter config was loaded:', this.config);
    },

    onTweetStatus(tw, ctx) {
        const textElement = tw.querySelector(ctx.selectors.tweetTextBody);
        if (textElement === null) {
            return;
        }
        const text = textElement.innerText;
        const matched = matches(text, this.config);
        if (matched) {
            tw.style.display = 'none';
            console.log('Tui: filter-by-text: Rejected tweet:', tw);
        }
    }
};
