const express = require('express');
const mongoose = require('mongoose');
const myconfig = require('./config/myconfig');
const bodyParser = require('body-parser');
const passport = require('passport');
const PORT = process.env.PORT || 3000;
require('./models/ReceptBook');
require('./models/Recept');
require('./models/User');

const app = express();
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));

async function start() {
    try {
        await mongoose.connect(myconfig.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => console.log('MongoDB Connected'))
            .catch(err => console.log(err));

        app.listen(5000, () => console.log('App has been started on port ' + myconfig.PORT))

    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

app.use(bodyParser.json());

const user = require('./routes/user');
const recept = require('./routes/recept');
const receptBook = require('./routes/receptBook');
const auth = require('./routes/auth');

app.use('/User', user);
app.use('/Auth', auth);
app.use('/Recept', recept);
app.use('/ReceptBook', receptBook);


start();
