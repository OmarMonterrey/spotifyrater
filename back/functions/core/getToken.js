const axios = require('axios');
const { getFirestore } = require('firebase-admin/firestore');

const firebase = require('./../config/firebase');
const app = firebase.app;

const store = getFirestore( app );
const doc = store.doc('back/access_token');

const now = Math.floor(Date.now() / 1000);

async function getToken(){
    let snapshot = await doc.get();
    let data = await snapshot.data();
    console.log( data.expires, now, data.expires > now ); 
    if( data.expires > now ) return data.token
    var auth_token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET_ID}`).toString('base64');
    var url = 'https://accounts.spotify.com/api/token';
    var options = {
        timeout: 5000,
        headers: {
            'Authorization': `Basic ${auth_token}`
        }
    };
    try{
        res = await axios.post(url, 'grant_type=client_credentials', options);
    } catch(e){
        return false;
    }
    data = res.data;
    if( !data.expires_in ) return false;
    let expires_at = (now + data.expires_in) - (5*60);
    await doc.set({
        token: data.access_token,
        type: data.token_type,
        expires: expires_at
    });
    return data.access_token;
}
exports.function = getToken;