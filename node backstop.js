const backstop = require("./tests/tests.js");
const config = require("./config.js");
let args = config.ARGS;
let scenarios = backstop.scenarios();

// BackstopJS configuration
module.exports =
    {
        "id": "project_" + args.BS_ENV + "_config",
        "viewports": [
            {
                "name": "desktop",
                "width": 1280,
                "height": 960
            },
            {
                "name": "phone",
                "width": 375,
                "height": 812
            },
            {
                "name": "tablet",
                "width": 768,
                "height": 600
            },
            {
                "name": "wide",
                "width": 1400,
                "height": 960
            }
        ],
        "scenarios": scenarios,
        "paths": config.SAVE_DIRECTORIES,
        "report": ["browser", "CI"],
        "engine": "puppeteer",
        "engineOptions": {
            "ignoreHTTPSErrors": true,
            "slowMo": 500,
            "args": [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-gpu",
                "--force-device-scale-factor=1",
                "--disable-infobars=true",
                "--hide-scrollbars=true"
            ]
        },
        "engineFlags": [],
        "asyncCaptureLimit": 1,
        "asyncCompareLimit": 20,
        "resembleOutputOptions": {
            "ignoreAntialiasing": true,
            "largeImageThreshold": 0
        },
        "debug": true,
        "debugWindow": false
    };
