let fs = require("fs");

module.exports = async (page, scenario,domain) => {
    const myCookies = [{
        "domain": domain,
        "name": "_be_uiEnabled",
        "value": "true"
    }];
    await page.setCookie(...myCookies);
    console.log("cookies have been set..");
};
