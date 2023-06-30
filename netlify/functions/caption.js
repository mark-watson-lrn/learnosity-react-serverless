
module.exports.handler = async (event, context) => {
    const { captions } = require('./utils/assets/video-sub-en.txt');

    return {
        statusCode: 200,
        body: captions
    };
};
