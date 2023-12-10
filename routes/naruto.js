const {Router} = require ('express')
const{listNar,listNarByID, adduchi, updateNar, deleteNar}=require('../controllers/naruto');


const router =Router();

//http://localhost:3000/api/v1/naruto/
//http://localhost:3000/api/v1/naruto/1
//http://localhost:3000/api/v1/naruto/3
router.get('/', listNar);
router.get('/:id', listNarByID);
//router.post('/', signIn);
router.put('/', adduchi);
router.patch('/:id', updateNar);
router.delete('/:id', deleteNar);
module.exports =router;