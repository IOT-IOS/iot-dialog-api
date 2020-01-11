const uuid = require('uuid');

const DialogFlowConfig =  {
        private_key: process.env.DIALOGFLOW_PROD_PRIVATE_KEY ? 
        process.env.DIALOGFLOW_PROD_PRIVATE_KEY.replace(/\\n/g, '\n') : process.env.DIALOGFLOW_DEV_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.DIALOGFLOW_PROD_CLIENT_EMAIL ? 
        process.env.DIALOGFLOW_PROD_CLIENT_EMAIL : process.env.DIALOGFLOW_DEV_CLIENT_EMAIL,
        project_id: process.env.DIALOGFLOW_PROD_PROJECT_ID ? 
        process.env.DIALOGFLOW_PROD_PROJECT_ID : process.env.DIALOGFLOW_DEV_PROJECT_ID,
        session_id: uuid.v4()
}

module.exports = DialogFlowConfig