const express = require('express');
const router = express.Router();
const { createAgency, updateClient, getMaxBill, Signup, SignIn, isSignedIn } = require('../controllers/crudOps');

router.post('/Register', Signup);
router.post('/create-agency-and-client', isSignedIn ,createAgency);
router.patch('/update-client', isSignedIn ,updateClient);
router.get('/get-max-bill', isSignedIn, getMaxBill);
router.get('/Login', SignIn);

module.exports = router;