import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const usuarios = [];
let tweets = [];

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/sign-up", (req, res) => {
    if(!usuarios.find(element => element.username === req.body.username)){
        usuarios.unshift(req.body);
    }
    res.send("OK");
});

app.post("/tweets", (req, res) => {
    tweets.unshift(req.body);
    res.send("OK");
})

app.get("/tweets", (req, res) => {
    let tweetsComAvatar = [];
    tweets.forEach((tweet) => {
        usuarios.forEach((usuario) => {
            if(usuario.username === tweet.username){
                tweetsComAvatar = [...tweetsComAvatar, {...tweet, avatar: usuario.avatar}]
            }
        })
    })
    const ultimasDez = tweetsComAvatar.filter((tweet, index) => {
        return index < 10;
    })
    res.send(ultimasDez);
})
 
app.listen(5000);