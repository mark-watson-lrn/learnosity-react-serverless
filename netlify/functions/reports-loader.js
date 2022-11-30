const Learnosity = require('learnosity-sdk-nodejs/index'); // Include Learnosity SDK constructor
// const production_domain = require('./utils/domains');

exports.handler = async function(event) {

    // - - - - - - Learnosity's server-side configuration - - - - - - //
    let domain = process.env.DOMAIN;

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
            consumer_key: process.env.CONSUMER_KEY,
            domain: domain,
        },
        process.env.CONSUMER_SECRET,

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
