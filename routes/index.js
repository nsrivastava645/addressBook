const express = require('express');

const router = express.Router();

const AddressBook = require('../models/addressbook');

const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);

router.post('/create', homeController.createEntry);
router.get('/edit-page', homeController.editPage);
router.post('/update/:id', homeController.update);
router.get('/delete/:id', homeController.delete);
router.post('/', homeController.search);


module.exports = router;


