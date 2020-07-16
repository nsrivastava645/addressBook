const AddressBook = require('../models/addressbook');
const { query } = require('express');
const e = require('express');

module.exports.home = async (req, res)=>{
    let persons = await AddressBook.find({}).collation({'locale':'en'}).sort('name');
    return res.render('index',{persons: persons});
}

module.exports.createEntry = (req,res)=>{

    // console.log(req.body); for checking purposes
    AddressBook.findOne({phone: req.body.phone},(err, person)=>{
        if(err) return res.send('<h1>error in finding from db</h1>');
        if(!person){
            AddressBook.create({name: req.body.name, phone: req.body.phone}, (err, person)=>{
                if(err) return res.send('<h1> error in creating entry to the db</h1>');
                return res.redirect('/')/* .json({message:'entry added to the db'}) */;
            })
        }else{
            return res.send('<h1>phone number already exists</h1>');
        }
    })
}
module.exports.editPage = (req, res)=>{
    console.log(req.query);
    res.render('edit', {details: req.query});
}
module.exports.update = async (req, res)=>{
    //find that entry in the db
    let entry = await AddressBook.findById(req.params.id);
    entry.name = req.body.name;
    entry.phone = req.body.phone;
    entry.save();
    return res.redirect('/');
}

module.exports.delete = async (req, res)=>{
    let entry = await AddressBook.findById(req.params.id);
    entry.remove();
    return res.redirect('back');
}

module.exports.search = async (req, res)=>{
    // >db.student.find( { f_name: { $regex: 'P.*'} } ).pretty();
    try {
        await AddressBook.find({name: {$regex: `${req.body.nameLike}.*`, $options: `i`}, phone:{$regex: `${req.body.phoneLike}.*`}}, (err, persons)=>{
            if(persons.length ==0) return res.send('<h1 style="text-align: center">no contacts found with that credentials<h1>');
            return res.render('index', {persons: persons});
        });
    } catch (err) {
        return res.send(`<h1>some error has occured : ${err}</h1>`);
    }

    // return res.render('index',{persons: persons});
    
}