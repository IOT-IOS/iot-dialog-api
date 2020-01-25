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
        let sortData = talksFilter.sort((a, b) =>  b.creation_date.localeCompare(a.creation_date));
        return res.status(200).json(sortData.filter(data => data.hide !== true));
    }
    return res.status(200).json([]);
});

router.patch('/talk', async(req, res) => {
    if(req.body.id) {
        await firebaseService.hideTalk(req.body.id)
        .then(_ => {
            res.status(200).json({message: `talk ${req.body.id} updated`, updated: true});
        })
        .catch(err => {
            res.status(500).json({message: err, updated: false});
        });
    } else {
        res.status(404).json('Id is missing');
    }
})

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