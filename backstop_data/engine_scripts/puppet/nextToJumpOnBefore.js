module.exports = async (page, scenario) => {
    const nextJump = await require("../../mockresponses/nextJump.json");
    const Mocker = await require("../../../utils/Mocker");

    const BASE_URL = "https://beteasy.com.au";
    const cors__API_BASE_URL = "https://api.beteasy.com.au";

    //set cookies
    const domain ="beteasy.com.au";
    await require("./loadCookies")(page, scenario,domain);

    //mock next to jump response
    mck = new Mocker(page, BASE_URL, cors__API_BASE_URL);
    mck.mocker();
    mck.mock(false, "/api/home/next-jumps/1,2,3", nextJump);
    console.log("next to jump response mocked");

    await page.setDefaultNavigationTimeout(75000);
};
