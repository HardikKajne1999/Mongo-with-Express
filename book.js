const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String
    },
    price:{
        type: Number
    }
});

const Book = mongoose.model('Book',bookSchema);

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
    console.log('Connection successful');

    const book1 = await Book.insertOne({
        title:'Title 33',
        author: 'Author 33',
        price: '33'
    });

    await mongoose.connection.close();
}

main()
.catch(error => {
    console.log(error)
});