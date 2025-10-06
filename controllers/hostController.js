const e = require('express');
const Home = require('../models/Home');

exports.getAddHome= (req, res, next)=>{
    res.render('host/edit-home', {editing: false, pageTitle: 'Add Home'});
}

exports.postAddHome = (req, res, next)=>{
    const {houseName, price, location, rating, photoUrl} = req.body;
    const newHome = new Home(houseName, price, location, rating, photoUrl);
    newHome.save((err)=>{
        if(err){
            res.redirect('/');
        }else{
            res.render('host/home-added', {pageTitle: 'Home Added'});
        }
        
    });
}

exports.getHostHomes = (req, res, next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render('host/host-homes', {homes: registeredHomes, pageTitle: 'Host Homes'})
    }) 
}

exports.getEditHome= (req, res, next)=>{
    const homeId = req.params.homeId;
    console.log(homeId);
    const editing = req.query.editing === 'true';
    console.log(editing);
    if(!editing){
        console.log('editing false');
        return res.redirect('/host/host-homes');
    }

    Home.findById(homeId, (home)=>{
        console.log(home);
        if(!home){
            return res.redirect('/host/host-homes');
        } 
        res.render('host/edit-home', {
            home: home,
            editing: editing,
            pageTitle: 'Edit Your Home'});
    });
}

exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating, photoUrl} = req.body;
    const newHome = new Home(houseName, price, location, rating, photoUrl);
    newHome.id = id;
    newHome.save((err)=>{
        if(err){
            console.log('error while updating home',err);
        }else{
            res.redirect('/host/host-homes');
        }
        
    });
}

exports.postDeleteHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    console.log("came to delete",homeId);
    Home.deleteById(homeId, (err)=>{
        if(err){
            console.log('error while deleting home',err);
        }else{
            res.redirect('/host/host-homes');
        }
    }
)

   
    
}


