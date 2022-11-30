const Learnosity = require('learnosity-sdk-nodejs/index'); // Include Learnosity SDK constructor
// const production_domain = require('./utils/domains');

exports.handler = async function(event) {

    // - - - - - - Learnosity's server-side configuration - - - - - - //

    // let domain = 'localhost';
    let domain = 'main--learnosity-serverless.netlify.app';

    let assessUserRefererString = event.headers.referer;
    let userString = assessUserRefererString.substring(assessUserRefererString.indexOf('=') + 1);

    // // switch for Domain if prod is hosted on a different domain.
    // if (process.env.NODE_ENV === 'production') {
    //     domain = production_domain.name;
    // }

    const learnositySdk = new Learnosity();

    const request = learnositySdk.init(

        'reports',  // selects Reports API
        {
            consumer_key: "yis0TYCu7U9V4o7M",
            domain: domain,
        },
        "74c5fd430cf1242a527f6223aebd42d30464be22",

        {
            reports: [
                {
                    id: 'learnosity_report',
                    type: 'lastscore-by-activity-by-user',
                    scoring_type: 'partial',
                    ui: 'numeric',
                    display_time_spent: true,
                    users: [{ id: userString, name: 'Learnosity_1' }],
                    activities: [
                        {
                            id: 'react_sdk_primer_activity',
                            name: 'react_sdk_primer_activity',
                        },
                    ],
                },
            ],
            label_bundle: {
                activity: 'Activity',
            },
            configuration: {
                questionsApiVersion: 'v2022.1.LTS',
                itemsApiVersion: 'v2022.1.LTS',
            },
        });

    return {
        statusCode: 200,
        body: JSON.stringify({request})
    }
}
