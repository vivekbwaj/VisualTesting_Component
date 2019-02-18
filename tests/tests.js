const config = require("../config.js");
let setup = require("../utils/setup.js");
const chalk = require("chalk");

let paths = setup.setPath();
let args = config.ARGS;

const test_label = ["RaceCard"];
const selectorsArray = [
    ["a.NextToJump__tile--1ztZ2"]
];
let onReadyScriptsArray = {
    "RaceCard": config.CUSTOM_SCRIPTS_PATHS + "onReady_clickSelector.js",
};

const hideSelectorsArray = {
    "RaceCard": [".BetVision__wrapper--2aPxt",".LaunchButton__launchButton--37jNU"]
};
const remSelectorsArray = {
    // "RaceCard": [".Layout__left--1ygeK",".Layout__right--2c6nk",".TopBar__topBar--3_D80",".NavBar__navBar--3EpJD",".Footer__footer--znEgZ"]
};

const clickSelectorsArray = {
    // "RaceCard": [".ControlBar__closeButton--2ncgf"]
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
                    "onBeforeScript": config.CUSTOM_SCRIPTS_PATHS + "liveBettingOnBefore.js",
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
