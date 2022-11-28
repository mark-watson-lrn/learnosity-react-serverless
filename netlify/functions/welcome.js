
exports.handler = async function() {
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Hello serverless lambda functions - click here to begin.'})
    }
}
