const clickSelectors = require("../engineUtils/custom_ClickSelectors.js");

module.exports = async (page, scenario) => {
    console.log("SCENARIO > " + scenario.label);
    await require("./clickAndHoverHelper")(page, scenario);
    const screenshotDir = process.cwd() + "/backstop_data/engine_Scripts_Screenshots/";

    console.log("Onready script started to login through login flyout....");
    await page.screenshot({path: screenshotDir + "pageToLoginOn.png", fullPage: true});
    const ele = await page.$("form.cb-form");
    if (ele === null) {
        const loginButton = await page.$("button[class='login-flyout-button__title']");
        await loginButton.click();
        await page.waitForSelector("form.cb-form");
    }
    const uNameField = await page.$("input[name='username']");
    await uNameField.type("migrationmerged3@gmail.com");
    const pwdField = await page.$("input[name='password']");
    await pwdField.type("Password1");
    const loginBtn = await page.$("button[type='submit']");
    await loginBtn.click();
    await page.waitFor(5000);
    await page
        .waitForSelector(".ln-menu__item--logout")
        .then(() => {
            page.screenshot({path: screenshotDir + "loggedIn.png", fullPage: true});
        });
    const loggedInBy = await page.$("div.header-rhs");
    await loggedInBy.screenshot({
        path: screenshotDir + "loggedInBy.png"
    });
    await clickSelectors(scenario, page);
};
