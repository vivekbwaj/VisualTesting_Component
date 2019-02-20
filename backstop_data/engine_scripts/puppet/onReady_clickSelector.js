const clickSelectors = require("../engineUtils/custom_ClickSelectors.js");

module.exports = async (page, scenario,viewport) => {
    console.log("SCENARIO > " + scenario.label+" > "+ viewport.name);
    await require("./clickAndHoverHelper")(page, scenario);
    await clickSelectors(scenario, page);
};
