const { Router } = require('express');
const { dialogflow, SimpleResponse } = require('actions-on-google');
const { actionGoogleService } = require('../services/action-google.service')
const { DialogFlowService } = require('../services/dialogflow.service')
const mqttService = require('../services/mqtt.service')
const dialogflowConfig = require('../utils/dialogflow.config');

const router = Router();
const app = dialogflow({debug: false});

let dialogFlowService = new DialogFlowService(dialogflowConfig.project_id);

router.post('/dialog', app);
app.fallback((conv) => {
    let talk = actionGoogleService.processMusicChoice(conv)
    console.log(talk)
    switch(conv.intent) {
        case 'choix-musique':
            if(Object.keys(conv.request).length > 0) {
                mqttService.publishData('Titi78/feeds/dialog-feeds.interact', talk.action);
                setTimeout(() => {
                    mqttService.publishData('Titi78/feeds/dialog-feeds.interact', talk.response);
                }, 3000);
            } else {
                console.log('sdk');
            }
            break;
    }
    conv.ask(new SimpleResponse({
        speech: talk.response
    }));
})

router.get('/dialog', async (req, res) => {
    if(!req.query.action) return res.status(404).send('action missing');

    let send = await dialogFlowService.sendTextMessageToDialogFlow(req.query.action, dialogflowConfig.session_id)
    if(send[0].queryResult) {
        return res.status(200).json(
            {action: send[0].queryResult.queryText, response: send[0].queryResult.fulfillmentText}
        )
    }
    return res.status(404).json({});
})

module.exports = {
    DialogController: router
}