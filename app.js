const express = require('express');
const mongoose = require('mongoose');
const myconfig = require('./config/myconfig');
const bodyParser = require('body-parser');
const passport = require('passport');
const PORT = process.env.PORT || 5000;
const NewUser = require('./models/NewUser');
const Recept = require('./models/Recept');
const ReceptBook = require('./models/Recept');

const app = express();
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));

async function start() {
    try {
        await mongoose.connect(process.env.CUSTOMCNNSTR_MyConnectionString || myconfig.mongoUri, {
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

app.get('/', (req,res) => res.send('App setting: ' +  process.env.APPSETTING_MyAppSettings + 'Connection String: ' + process.env.CUSTOMCNNSTR_MyConnectionString));
console.log (process.env.MyEnvronmentVariable);

const auth = require('./routes/auth');
const newUser = require('./routes/newUser');
const recept = require('./routes/recept');
const receptBook = require('./routes/receptBook');

app.use('/Auth', auth);
app.use('/newUser', newUser);
app.use('/recept', recept);
app.use('/ReceptBook', receptBook);

start();
