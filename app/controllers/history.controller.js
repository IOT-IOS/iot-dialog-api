const { Router } = require('express');
const firebaseService = require('../services/firebase.service');

const router = Router();

router.get('/talks', async (req, res) => {
    let talks = await firebaseService.getTalks();
    if(talks) {
        let talksFilter = talks.filter(data => {
            if(!req.query.device || req.query.device === "All") return data;
            return data.device.toLowerCase() === req.query.device.toLowerCase();
        });
        return res.status(200).json(talksFilter.sort((a, b) => {
            return b.creation_date.localeCompare(a.creation_date);
        }));
    }
    return res.status(200).json([]);
});

router.post('/talk', async (req, res) => {
        let talks = await firebaseService.getTalks();
        let idTalk = 0;
        talks.forEach(data => {
            if(data.id > idTalk) idTalk = data.id;
        });
        await firebaseService.postTalk({
            id: idTalk + 1,
            name: req.body.name || '',
            creation_date: req.body.creation_date || '',
            device: req.body.device || ''
        }).then(_ => {
            res.status(200).json({message: "new Talk insert", inserted: true});
        }).catch(err => {
            res.status(500).json(err);
        });
})

module.exports = {
    HistoryController: router
}