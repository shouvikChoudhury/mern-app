const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://shouvikpgec50:Shouvik%4024@my-app.zmjxxcy.mongodb.net/income-expenses?retryWrites=true&w=majority');
        console.log('DB Connected!');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

dbConnect();