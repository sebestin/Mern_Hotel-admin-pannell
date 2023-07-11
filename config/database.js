const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://saruflipkart:saru123@saruflipkart.fafmvvx.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`DB CONNECTED...`);
    }).catch(()=>{
console.log("db is not connected please check once")
    }

    )
};

module.exports = connectDatabase;
