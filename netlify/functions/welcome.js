
exports.handler = async function() {
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Welcome, click here to begin the test.'})
    }
}
