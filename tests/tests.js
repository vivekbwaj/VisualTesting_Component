const config = require("../config.js");
let setup = require("../utils/setup.js");
const chalk = require("chalk");

let paths = setup.setPath();
let args = config.ARGS;

const test_label = ["Homepage"];
const selectorsArray = [
    ["document"]
];
let onReadyScriptsArray = {
    "Homepage": config.CUSTOM_SCRIPTS_PATHS + "onReady_clickSelector.js",
};

const hideSelectorsArray = {
    "Homepage": [".BetVision__wrapper--2aPxt",".LaunchButton__launchButton--37jNU",".Carousel__carousel--2UppO",".Advertisement__advContainer--2f2zx"]
};
const remSelectorsArray = {
    "Homepage": [".Advertisement__advContainer--2f2zx"]
};

const clickSelectorsArray = {
    "Homepage": [".MenuItem__chevronButton--3vJb0_desktop",".MenuItem__chevronButton--3vJb0_wide"]
};

let scenarios = [];

console.log(chalk.green("Pages being tested:"));

module.exports = {

    scenarios: function () {
        for (let k = 0; k < paths.length; k++) {
            let label = test_label[k];
            let hide = [];
            let remove = [];
            let clickSel = "";
            let engine_script = "";

            for (let h in hideSelectorsArray) {
                if (h === label) {
                    hide = hideSelectorsArray[h];
                }
            }

            for (let sel in clickSelectorsArray) {
                if (sel === label) {
                    clickSel = clickSelectorsArray[sel];
                }
            }

            for (let eS in onReadyScriptsArray) {
                if (eS === label) {
                    engine_script = onReadyScriptsArray[eS];
                }
            }

            for (let rs in remSelectorsArray) {
                if (rs === label) {
                    remove = remSelectorsArray[rs];
                }
            }

            console.log(chalk.yellow(args.BS_TESTHOST + paths[k] + config.OPTIMIZELY));

            scenarios.push(
                {
                    "label": label,
                    "cookiePath": "backstop_data/engine_scripts/cookies.json",
                    "url": args.BS_TESTHOST + paths[k] + config.OPTIMIZELY,
                    "referenceUrl": args.BS_REFHOST + paths[k] + config.OPTIMIZELY,
                    "onBeforeScript": config.CUSTOM_SCRIPTS_PATHS + "homepage.js",
                    "onReadyScript": engine_script,
                    "delay": 0,
                    "postInteractionWait": 5000,
                    "clickThis": clickSel,
                    "hideSelectors": hide,
                    "removeSelectors": remove,
                    "selectors": selectorsArray[k],
                    "selectorExpansion": false,
                    "misMatchThreshold": 0,
                    "requireSameDimensions": false
                }
            );
        }
        return scenarios;
    }

};
