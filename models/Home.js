const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path-util');
const homeFilePath = path.join(rootDir, 'data', 'registeredHomes.json');

module.exports = class Home{
    constructor(houseName, price, location, rating, photoUrl){
        this.id = Math.random().toString();
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }
    save(callback){
        Home.fetchAll((registeredHomes)=>{
        registeredHomes.push(this);
        fs.writeFile(homeFilePath, JSON.stringify(registeredHomes), (err) => {
            if(err){
                alert('something went wrong, add again');
                res.redirect('/host/add-home');
            }else{
                callback();
            }
        })
        })
        
    }
    static fetchAll(callback){
        fs.readFile(homeFilePath, (err, data) => {
            if(err){
                callback([]);
            }else{
                callback(JSON.parse(data));
            }
    }
)}
    static findById(homeId, callback){
        Home.fetchAll((homes)=>{
            // console.log(homes);
            const home = homes.find(home=> home.id === homeId);
            callback(home);
        })
}
}


