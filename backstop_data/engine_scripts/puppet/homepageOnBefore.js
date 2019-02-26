const chalk = require("chalk");
let ticket_num;

if(process.argv.length>4)
{
    ticket_num=process.argv[4];
}

module.exports = async (page, scenario, viewport) => {
    console.log(chalk.red.bgRed.bold("SCENARIO > " + scenario.label+" > "+ viewport.name));

    const multi = await require("../../mockresponses/multi.json");
    const mu4 = await require("../../mockresponses/multiUpcoming4.json");
    const mu8 = await require("../../mockresponses/multiUpcoming8.json");
    const nba = await require("../../mockresponses/nbaVision37.json");
    const ntj = await require("../../mockresponses/nextToJump123.json");
    const rcToday = await require("../../mockresponses/racingToday.json");
    const Mocker = await require("../../../utils/Mocker");

    mck = new Mocker(page);
    let domain ="beteasy.com.au";

    if(ticket_num)
    {
        domain =`${ticket_num}.www.uat.betdev.com.au`;
    }
    await require("./loadCookies")(page, scenario,domain);

    mck.mocker();
    mck.mock(false, "/apiproxy/mobile/event/sports/multi/", multi);
    mck.mock(false, "/apiproxy/WebEventAPI/racing/multibet/upcoming/1,2,3/8", mu8);
    mck.mock(false, "/apiproxy/nbavision/epg/37", nba);
    mck.mock(false, "/api/home/next-jumps/1,2,3", ntj);
    mck.mock(false, "/api/racing/racing/", rcToday);
    console.log("response mocked for all Apis on homepage");

    await page.setDefaultNavigationTimeout(30000);
};
