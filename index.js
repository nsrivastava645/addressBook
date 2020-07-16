const express = require('express');

const port = process.env.PORT || 5000;
 
const app = express();

const AddressBookDb = require('./config/mongoose');


//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//as the req headers ae not compatible 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//routes
app.use('/', require('./routes'));
// app.get('/', (req, res)=>{
//     console.log('hi');
//     res.json({message: "server is running"}) ;
// });

app.listen(port, (err)=>{
    if(err) console.log('error in running the server');
    console.log(`Server running at port: ${port}`);
})