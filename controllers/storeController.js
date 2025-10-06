const Favorite = require('../models/Favorites');
const Home = require('../models/Home');


exports.getIndex = ((req, res, next)=>{
    Home.fetchAll((registeredHomes)=>{
        console.log(registeredHomes);
        res.render('store/index', {registeredHomes: registeredHomes, pageTitle: 'humara airbnb'});
    });
})

exports.getHomes = ((req, res, next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render('store/homes', {registeredHomes: registeredHomes, pageTitle: 'humara airbnb'});
    });
})

exports.getFavorites = ((req, res, next)=>{
    Favorite.fetchAll((favoriteIds)=>{
    Home.fetchAll((registeredHomes)=>{
        favHomes = registeredHomes.filter((home)=> favoriteIds.includes(home.id));
        res.render('store/favorites', {homes: favHomes, pageTitle: 'Favorites'});
    });
})
});

exports.postFavorites = ((req, res, next)=>{
    const homeId = req.body.id;
    Favorite.addToFavorites(homeId, (err)=>{
        if(err){
            console.log('something went wrong', err);
        }
        res.redirect('/favorites');
    })

})

exports.getHomeDetails = ((req, res, next)=>{
    const homeId = req.params.id;
    Home.findById(homeId, (home)=>{
        if(!home){
            return res.redirect('/homes');
        }
       res.render('store/home-details', {home: home, pageTitle: 'home detail'});
    });
})

exports.postRemoveFavorites = ((req, res, next)=>{
    const homeId = req.params.homeId;
    console.log("came to delete fav",homeId);
    Favorite.removeById(homeId, (err)=>{
        if(err){
            console.log('error while deleting home',err);
        }else{
            res.redirect('/favorites');
        }
    }
)


})