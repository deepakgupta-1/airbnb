const Home = require('../models/Home');


exports.getIndex = ((req, res, next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render('store/index', {registeredHomes: registeredHomes, pageTitle: 'humara airbnb'});
    });
})

exports.getHomes = ((req, res, next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render('store/homes', {registeredHomes: registeredHomes, pageTitle: 'humara airbnb'});
    });
})

exports.getHomeDetails = ((req, res, next)=>{
    const homeId = req.params.id;
    Home.findById(homeId, (home)=>{
        if(!home){
            return res.redirect('/homes');
        }
        console.log("came to page details", home);
        res.render('store/home-details', {home: home, pageTitle: 'home detail'});
    });
})