const uuid = require('uuid');

const DialogFlowConfig =  {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, '\n') || '',
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL || '',
        project_id: process.env.DIALOGFLOW_PROJECT_ID || '',
        session_id: uuid.v4()
}

module.exports = DialogFlowConfig