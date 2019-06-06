const express = require('express');
const router = express.Router();

/*import the controllers*/

const user_controller = require('../../controllers/tictacControl/tictacControl');

router.get('/tictac/createGame',user_controller.createGame);
router.post('/tictac/save', user_controller.saveState); //this route is to save data
router.get('/tictac', user_controller.getState); //this route is to get data
router.delete('/tictac/delete', user_controller.delete); //this route is to delete data

module.exports = router;