const express = require('express');
const router = express.Router();
const Clients = require('../models/ClientModel')

router.get('/', (req, res) => {
    Clients.find().then(
        clients => res.json(clients)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

router.delete('/:id', (req, res) => {
    Clients.findByIdAndRemove(req.params.id).then(
        () => res.send(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router