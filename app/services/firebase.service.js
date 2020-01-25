const firebase = require('firebase');
const firebaseConfig = require('../utils/firebase.config');

class FirebaseService {
    static async init() {
        let app = await firebase.initializeApp(firebaseConfig)
        this.firebase = app.database();
        console.log('connected to firebase');
    }

    static async getTalks() {
        return new Promise((resolve, reject) => {
            let rootRef = this.firebase.ref('talk');
            rootRef.on('value', data => resolve(data.val()), 
            err => {
                reject(err);
                console.error(err);
            });
        })
    }

    static async postTalk(data) {
        let keyRefTalk = await this.getKeySnapTalk();
        return new Promise(async (resolve, reject) => {
            let largest = Math.max.apply(Math, keyRefTalk);
            let rootRef = this.firebase.ref('talk/' + (largest + 1));
            rootRef.set(data).then(resolve, reject);
        })
    }

    static async hideTalk(id) {
        return new Promise(async (resolve, reject) => {
            let rootRef = this.firebase.ref(`talk/${id - 1}`);
            rootRef.update({hide: true}).then(resolve, reject);
        })
    }

    static async getKeySnapTalk() {
        return new Promise((resolve, reject) => {
            let rootRef = this.firebase.ref('talk');
            if(!rootRef) {
                reject(rootRef);
                console.error('Reference not found');
            }
            rootRef.on('value', snapshot => {
                resolve(Object.keys(snapshot.val()));
            })
        })
    }

}

module.exports = FirebaseService