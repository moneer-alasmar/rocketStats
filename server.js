const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '/static')));
const mongoose = require('mongoose');
app.use(express.static(__dirname + '/public/dist'));
var rls = require('rls-api');

var client = new rls.Client({
    token: "GPCFMQ8643BDWRLDSBI3AR8XAQR6ZTYG"
});

app.listen(8000, ()=>{
    console.log('listening on port 8000');
})

app.get('/playlists/', (req, res)=>{
	client.getPlaylistsData(function(status, data){
    if(status === 200){
        console.log("-- Playlists data:");
        console.log(data);
        res.json(data);
    } else {
        console.log("-- getPlaylistsData failed: " + status);
    }
});
})

app.post('/playerSearch/', (req, res)=>{
	console.log("name", req.body.name);
	console.log("platform", req.body.platform)
	player = req.body.name;
	platform = req.body.platform;
    client.getPlayer(player, rls.platforms[platform], function(status, data){
    	console.log('this is the params server', req.params.name);
        if (status === 200){
            console.log("-- Player Data:");
            console.log("   Display name: " + data.displayName);
            console.log("   Goals: " + data.stats.goals);
            console.log(req.body)
            res.json(data);
        }else{
            console.log("failed to get player" + status)
        }
    })

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/index.html"))
})
})

