Tweet Filter Plugin for Tui
===========================

This is a plugin for [Tui](https://github.com/rhysd/Tui). So please install it before installing this.

## Installation

1. Move to your application directory.
    - `~/Library/Application\ Support/Tui` for macOS
    - `~/.config/Tui` for Linux
    - `%APPDATA%\Tui` for Windows.
2. `npm install tui-plugin-filter-by-text`
3. Add `"node_modules/tui-plugin-filter-by-text"` to `"plugins"` section in `config.json`.

Instead of `npm install`, you can also copy `index.js` in this repository to your favorite directory as your favorite file name.
In the case, please add a path to the file to `"plugins"` section in `config.json`.

## Usage

This plugin loads filter configuration from configuration file. Please put `tweet_filter.json`.
Content is like as:

```json
{
    "word" : [
        "fuck",
        "annlying thing"
    ],

    "regex" : [
        "^RT "
    ]
}
```

### word

In `"word"` section, you can specify banned words as an array of string.
All tweets which contain one of the banned words will be filtered from your timeline in Tui.

### regex

In `"regex"` section, you can specify banned pattern as an array of string.
Each string will be treated as regular expression in JavaScript.
All tweets which match one of the banned patterns will be filtered from your timeline in Tui.

