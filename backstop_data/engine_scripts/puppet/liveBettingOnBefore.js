module.exports = async (page, scenario) => {
    const config = require("../../../config.js");

    const BASE_URL = "https://beteasy.com.au";
    const cors__API_BASE_URL = "https://api.beteasy.com.au";
    const domain ="beteasy.com.au";
    // await require("./loadCookies")(page, scenario,domain);
    const live = await require("../../mockresponses/live.json");
    const up = await require("../../mockresponses/upcoming.json");
    const nextJump = await require("../../mockresponses/nextJump.json");
    const Mocker = await require("../../../utils/Mocker");
    mck = new Mocker(page, BASE_URL, cors__API_BASE_URL);
    mck.mocker();
    mck.mock(false, "/api/home/next-jumps/1,2,3", nextJump);
    // mck.mock(true, "/WebEventAPI/sports/upcoming/", up);
    // mck.mock(true, "/WebEventAPI/sports/live/", live);
    console.log("race card response mocked");
    await page.setDefaultNavigationTimeout(60000);
};
