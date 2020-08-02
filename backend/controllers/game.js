const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const io = require('../socket');

exports.createGame = async (req, res, next) => {
    try {
        const lastGame = await Game.findOne().sort({ _id: -1 })
        if (lastGame && lastGame.state !== 'finished') {
            return next(new HttpError('last game is not finished yet',500))
        }
        const game = await Game.create({
            koef: 2.28 //should be defined by some algoritm later 
        })
        const socket = io.getIO()
        const id = io.getID()
        console.log(id)
        socket.emit('recieveId',{
            'gameId' : game._id
        });
        
        setInterval(function () {
            if (game.timerStart <= 0) return;
            game.timerStart = game.timerStart-10;
            socket.emit('timer', { 'numbers': game.timerStart });
            game.save();
        }, 10)
        setTimeout(() => {
            console.log('first timeout')
            game.state = 'active'
            game.save()
            socket.emit('newPhase',{
                state:'active'
            })
            
           
            setTimeout(() => {
                console.log('second timeout')
                game.state = 'finished'
                game.save()
                socket.emit('newPhase',{
                    state:'finished'
                })
            }, 30000);
        }, 30000);
        return res.status(201).json({'gameId' : game._id})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}



