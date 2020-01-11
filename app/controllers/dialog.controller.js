const { Router } = require('express');
const { dialogflow, SimpleResponse } = require('actions-on-google');
const { dialogService } = require('../services/dialog.service')
const { DialogFlowService } = require('../services/dialogflow.service')
const dialogflowConfig = require('../utils/dialogflow.config');

const router = Router();
let dialogFlowService = new DialogFlowService(dialogflowConfig.project_id);

const appDialogFlow = dialogflow({debug: false});

appDialogFlow.fallback((conv) => {
    console.log(conv)
    let talk = dialogService.processMusicChoice(conv)
    switch(conv.intent) {
        case 'choix-musique':
            conv.json()
            console.log('action')
            console.log(talk)
            conv.close(talk.response)
            break;
    }
    conv.ask(new SimpleResponse({
        speech: 'Attente dela réponse'
    }))
})

router.post('/talk', appDialogFlow);
router.get('/test', async (req, res) => {
    let send = await dialogFlowService.sendTextMessageToDialogFlow('joue', dialogflowConfig.session_id)
    console.log(send[0].queryResult.outputContexts)
    return res.send('ss')
})

module.exports = {
    DialogController: router
}