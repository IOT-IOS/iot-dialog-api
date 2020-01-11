class DialogService {

    static processMusicChoice(conv) {
        let queryResult = conv.body.queryResult
        return {
            action: queryResult.queryText,
            response: queryResult.fulfillmentText,
        }
    }
}

module.exports = {
    dialogService: DialogService
}