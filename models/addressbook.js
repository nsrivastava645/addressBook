const mongoose = require('mongoose');

const addressBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true
    }

},{timestamps:true});

const AddressBook = mongoose.model('AddressBook', addressBookSchema);

module.exports = AddressBook;