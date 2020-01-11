const dialogflow = require('dialogflow');
const dialogflowConfig = require('../utils/dialogflow.config');
const LANGUAGE_CODE = 'fr-FR';

class DialogFlowService {
    constructor(projectId) {
        this.projectId = projectId;
        let config = {
            credentials: {
                private_key: dialogflowConfig.private_key,
                client_email: dialogflowConfig.client_email
            }
        }
		this.sessionClient = new dialogflow.SessionsClient(config)
    }
    async sendTextMessageToDialogFlow(textMessage, sessionId) {
        // Define session path
		const sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId);
		// The text query request.
		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					text: textMessage,
					languageCode: LANGUAGE_CODE
				}
			}
		}
		try {
			let responses = await this.sessionClient.detectIntent(request)			
			console.log('DialogFlow.sendTextMessageToDialogFlow: Detected intent');
			return responses
		}
		catch(err) {
			console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
			throw err
		}
    }
}

module.exports = {
	DialogFlowService: DialogFlowService
}