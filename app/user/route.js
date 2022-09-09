const express = require('express');
const { handlerGetAllUser, handlerGetUserById, handlerPostUser, handlerPutUserById, handlerDeleteUserById, handlerGetUserByName,  } = require('./handler');
const router = express.Router();

// 1. Get all users
// GET/user
router.get('/', handlerGetAllUser);

// 2. Get user by id
// GET/user/:id
router.get('/:id', handlerGetUserById);

// 3. Create user
// POST/user
router.post('/', handlerPostUser);

// 4. Update user
// PUT/user/:id
router.put('/:id', handlerPutUserById);

// 5. Delete user
// DELETE/user/:id
router.delete('/:id', handlerDeleteUserById);

// 6. Get user filter name
// GET/user/search?name={name}
router.get('/search', handlerGetUserByName);


module.exports = router;