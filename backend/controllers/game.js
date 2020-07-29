const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const { validationResult } = require('express-validator')

exports.updateState = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            input : req.body.newState,
            error: "invalid state, available options: 'finished', 'active', 'makingBets' "
        })
    }
    try {
        const game = await Game.findOne().sort({ 'created_at': -1 })
        if (!game) {
            return res.status(500).json({
                error: 'no game found'
            })
        }
        game.state = req.body.newState
        game.save()
        res.sendStatus(204)
    } catch (error) {
        return next( new HttpError(error));
    }
}

exports.createGame = async (req,res,next) => {
    try {
        const lastGame = await Game.findOne().sort({'created_at':-1})
        if (lastGame && lastGame.state !== 'finished') {
            return res.status(500).json({
                message : 'last game is not finished yet'
            })
        }
        const game = await Game.create({
            koef: 2.28 //should be defined by some algoritm later 
        })
        return res.status(201).json({
            gameID:game._id
        })
    } catch (error) {
        throw new HttpError(error)
    }
}