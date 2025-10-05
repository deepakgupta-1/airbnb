const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path-util');
const favoriteFilePath = path.join(rootDir, 'data', 'favorite.json');

module.exports = class Favorite{

    static fetchAll(callback){
        fs.readFile(favoriteFilePath, (err, data) => {
            if(err){
                callback([]);
            }else{
                callback(JSON.parse(data));
            }
    }
)}

    static addToFavorites(homeId, callback){
        Favorite.fetchAll((favoriteIds)=>{
            favoriteIds.push(homeId);
            fs.writeFile(favoriteFilePath, JSON.stringify(favoriteIds), callback)
            })
        }
}


