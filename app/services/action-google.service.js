class ActionGoogleService {

    static processMusicChoice(conv) {
        let queryResult = conv.body.queryResult
        return {
            action: queryResult.queryText,
            response: queryResult.fulfillmentText,
        }
    }
}

module.exports = {
    actionGoogleService: ActionGoogleService
}