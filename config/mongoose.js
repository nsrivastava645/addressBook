const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://anyoneOnTheDb:dbPassword@cluster0.5x72f.mongodb.net/addressBook?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true});

const addressBookdb = mongoose.connection;

addressBookdb.on('error', console.error.bind(console,'Error in db connection'));

addressBookdb.once('open', ()=>{
    console.log('connected to Mongodb');
});

module.exports = addressBookdb;