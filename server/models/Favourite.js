const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteItemSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
});

const FavoriteItem = mongoose.model('FavoriteItem', favoriteItemSchema);

module.exports = FavoriteItem;
