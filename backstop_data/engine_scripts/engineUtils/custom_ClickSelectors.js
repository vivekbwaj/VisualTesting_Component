const log = console.log.bind(global);

const clickSelectors = async (scenario , page, viewport) => {
    let { clickThis } = scenario;
    let clickThisForViewport;

    switch (viewport.name) {
        case 'phone':
            clickThisForViewport = clickThis.filter((item) => item.includes('_phone')).map((it) => it.replace('_phone', ''));
            break;
        case 'tablet':
            clickThisForViewport = clickThis.filter((item) => item.includes('_tablet')).map((it) => it.replace('_tablet', ''));
            break;
        case 'desktop':
            clickThisForViewport = clickThis.filter((item) => item.includes('_desktop')).map((it) => it.replace('_desktop', ''));
            break;
        case 'wide':
            clickThisForViewport = clickThis.filter((item) => item.includes('_wide')).map((it) => it.replace('_wide', ''));
            break;
    }
    const selectors = Array.from(clickThisForViewport);

    if (!selectors) return;

    for (let selector of selectors) {
        if(selector.includes(''))
            log(`Click selector >> ${selector}`);
        await page.waitFor(selector);
        await page.click(selector);
        log(`Clicked >> ${selector}`);
    }
    await page.waitFor(3000);
};

module.exports = clickSelectors;
