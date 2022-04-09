getToken = require('./getToken').function;
const axios = require('axios');
async function search( query, types=['track', 'album'] ){
    var token = await getToken();
    var url = `https://api.spotify.com/v1/search?type=${types.join(',')}&q=${encodeURIComponent(query)}&limit=10`;
    var options = {
        timeout: 5000,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    try{
        res = await axios.get(url, options);
    } catch(e){
        console.log(e.response.data);
        return [];
    }
    var data = res.data;
    let response = [];

    for(album of data.albums.items){
        let artist = album.artists.map(a => a.name).join(", ")
        let name = album.name;
        let image = album.images[0].url;
        response.push({
            type: 'album',
            name,
            image,
            artist
        });
    }

    for(track of data.tracks.items){
        let artist = track.artists.map(a => a.name).join(", ")
        let name = track.name;
        let album = track.album?.name;
        let image = track.album.images[0].url;
        response.push({
            type: 'track',
            name,
            album,
            image,
            artist
        });
    }
    return response;
}
exports.function = search;