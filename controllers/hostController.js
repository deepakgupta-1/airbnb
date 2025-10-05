const Home = require('../models/Home');


exports.getAddHome= (req, res, next)=>{
    res.render('host/add-home', {pageTitle: 'Add Home'});
}

exports.postAddHome = (req, res, next)=>{
    const {houseName, price, location, rating, photoUrl} = req.body;
    const newHome = new Home(houseName, price, location, rating, photoUrl);
    newHome.save(()=>{
        res.render('host/home-added', {pageTitle: 'Home Added'});
    });
}


