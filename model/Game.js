const  mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    currentWordIndex : {
        type: Number,
        default: 0
    },
    socketId : String,
    isLeader : {
        type: Boolean,
        default: false
    },
    WPM : {
        type: Number,
        default: -1
    },
    nickname :  String,
});


const GameSchema = new mongoose.Schema({
    words : [String],
    isOpen : {
        type: Boolean,
        default: true
    },
    isOver : {
        type : Boolean,
        default : false
    },
    players : [PlayerSchema],
    startTime : {
       type : String
    }
});


module.exports = mongoose.model('Game', GameSchema);