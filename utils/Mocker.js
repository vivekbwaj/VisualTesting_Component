const _ = require("lodash");
const { getCorsHeaders } = require("./cors");

class Mocker {
    constructor(page) {
        this.page = page;
        this.mocks = [];
    }
    mocker() {
        this.page.setRequestInterception(true);
        this.page.on("request", (req) => {
            const mock = _.find(this.mocks, ({ finalUrl }) => req.url().includes(finalUrl));
            if (mock) {
                req.respond(mock);
            } else {
                req.continue();
            }
        });
    }
    mock(cors, url, body, status = 200, method = "GET", headers = {}) {
        if (body != null) {
            this.mocks = [
                ...this.mocks,
                {
                    finalUrl: url,
                    body: _.isString(body) ? body : JSON.stringify(body),
                    status,
                    // method,
                    contentType: "application/json; charset=utf-8",
                    headers: getCorsHeaders()
                }
            ];
        }
    }
}
module.exports = Mocker;
