let env = process.env.BS_ENV;

module.exports = {
    ARGS: process.env, // grabs the process arguments
    DEAFAULT_PATHS: ["/"], // default path just checks the homepage as a quick smoke test
    CUSTOM_SCRIPTS_PATHS: process.cwd() + "/backstop_data/engine_scripts/puppet/",
    // env argument will capture the environment URL
    // if you use one of the options below to pass in, e.g. --env=uat
    ENVIRONMENTS: {
        "orb": "http://orb.betdev.com.au",
        "uat": "http://uat.betdev.com.au",
        "prod": "http://beteasy.com.au"
    },
    DEFAULT_ENVIRONMENT: "prod",
    OPTIMIZELY: "",
    SAVE_DIRECTORIES: {
        "bitmaps_reference": "./backstop_data/" + env + "_reference",
        "bitmaps_test": "./backstop_data/" + env + "_test",
        "html_report": "./backstop_data/" + env + "_html_report",
        "ci_report": "./backstop_data/" + env + "_ci_report"
    }
};

