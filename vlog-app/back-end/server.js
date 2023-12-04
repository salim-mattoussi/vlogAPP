const express = require ('express');
const app = express();
require('./config/connect');
const cors = require('cors')
app.use(express.json());
app.use(cors())

const articleRoute = require('./routes/article.js') 
const authorRoute = require('./routes/author')


app.use('/getImage',express.static('./uploads'));

app.use('/article',articleRoute);
app.use('/author',authorRoute);




app.listen(3000,()=>
{
    console.log("server work");
})