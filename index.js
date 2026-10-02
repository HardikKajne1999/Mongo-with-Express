const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js')
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.listen(8080,()=>{
    console.log('server running')
});

app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
})

app.post('/chats', async (req,res)=>{
    let {from,msg,to} = req.body;
    let created_at = new Date();
    await Chat.insertOne({from,msg,to,created_at})
    res.redirect('/chats');
})



app.get('/chats', async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render('index.ejs',{chats});
})

app.get('/chats/:id/edit',async (req,res)=>{
    let {id} = req.params;
    const chat = await Chat.findById(id);
    res.render('edit.ejs',{chat});
})

app.patch('/chats/:id',async (req,res)=>{
    let {id} = req.params;
    let {msg} = req.body;
    let created_at = new Date();
    await Chat.findByIdAndUpdate(id,{msg,created_at},{runValidators:true,new:true})
    res.redirect('/chats');
})

app.delete('/chats/:id',async (req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
})

app.get('/',(req,res)=>{
    res.send('Root');
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log('Connection successful');

    // const result = await Chat.insertOne(
    //     { 
    //         from: 'Neha' ,
    //         to: 'Bruce' ,
    //         msg: 'Hello Bruce',
    //         created_at: new Date()
    //     }
    // );
    // console.log(result);

    // await mongoose.connection.close();
}
main()
    .catch(error => {
        console.log(error);
    });
