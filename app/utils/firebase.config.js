const FirebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    databaseURL: process.env.FIREBASE_DATABSE_URL || '',
    storageBucket: '',
    messagingSenderId: process.env.FIREBASE_MESSASING_SENDER_ID || '',
}

module.exports = FirebaseConfig