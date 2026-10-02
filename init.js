const mongoose = require('mongoose');
const Chat = require('./models/chat.js');


let allChats = [
    { 
        from: 'neha' ,
        to: 'preeti' ,
        msg: 'send me notes for exam',
        created_at: new Date()
    },
    { 
        from: 'rohit' ,
        to: 'mohit' ,
        msg: 'teach me js callbacks',
        created_at: new Date()
    },
    { 
        from: 'amit' ,
        to: 'sumit' ,
        msg: 'all the best',
        created_at: new Date()
    },
    { 
        from: 'anita' ,
        to: 'ramesh' ,
        msg: 'bring me some fruits',
        created_at: new Date()
    },
    { 
        from: 'tony' ,
        to: 'peter' ,
        msg: 'love u 3000',
        created_at: new Date()
    }
]
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log('Connection successful');

    const result = await Chat.insertMany( allChats );
    console.log(result);

    await mongoose.connection.close();
}
main()
    .catch(error => {
        console.log(error);
    });
