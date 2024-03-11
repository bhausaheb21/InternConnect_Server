const { Router } = require('express')
const { getallInternships, postInternship, updateInternship, removeInternShip } = require('../Controller/internship')
const { isAuth } = require('../Middlewares/isAuth')

const router = Router()

router.get('/', getallInternships)
router.post('/', isAuth, postInternship)
router.patch('/:id', isAuth, updateInternship)
router.delete('/:id', isAuth, removeInternShip)


module.exports = router;