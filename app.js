const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {hostRouter} = require('./Router/hostRouter');
const {storeRouter} = require('./Router/storeRouter');
const app = express();
const rootDir = require('./util/path-util');
const errorController  = require('./controllers/errorController');
app.set('view engine', 'ejs');
console.log(rootDir);
console.log('in app',__dirname);
app.use(express.static(path.join(rootDir, 'public')));


app.use(bodyParser.urlencoded({extended:true}));


app.use(storeRouter);
app.use("/host", hostRouter);

app.use(errorController.get404);



PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server runnung at PORT http://localhost:${PORT}`);
});