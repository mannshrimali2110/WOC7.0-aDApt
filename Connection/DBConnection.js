const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL;
const MongoConnect = () => mongoose.connect(
    mongoURL,
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }
    )
    .then(() => console.log('MongoDB Connection Established'))
    .catch((err) => console.log(err)
    );


module.exports = MongoConnect;