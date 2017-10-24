const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR-TOKEN-BOT';
const bot = new TelegramBot(token, {polling: true});

var notes = [];

bot.onText(/\/reminder (.+) в (.+)/, (msg, match) => {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push( { 'uid':userId, 'time':time, 'text':text } );

	bot.sendMessage(userId, 'Хорошо! Я обязательно вам напомню!');
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp);
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if ( notes[i]['time'] == curDate ) {
            bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы сейчас должны: '+ notes[i]['text']);
            notes.splice(i,1);
        }
    }
},1000); 
