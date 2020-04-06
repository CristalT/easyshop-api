require('dotenv').config();
const express = require('express');
const bycrypt = require('bcrypt');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const throttle = require('express-throttle-bandwidth');
const apiRoutes = require('./routes/api.routes');
const User = require('./models/user.model');

const app = express();

// start db connection
const db = require('./db');

/** config passport local strategy */
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            console.log('ejecutando *callback verify* de estategia local');
            User.findOne({ email: username })
                .then(data => {
                    if (data === null) {
                        console.log('User does not exist!');
                        return done(null, false);
                    } else if (!bycrypt.compareSync(password, data.password)) {
                        console.log('Password wrong!');
                        return done(null, false);
                    } else {
                        console.log('Login Ok!');
                        return done(null, data);
                    }
                })
                .catch(err => {
                    console.log(err);
                    done(err, null);
                }); //
        }
    )
);

/** config de estrategia jwt de passport ******/
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('ejecutando *callback verify* de estategia jwt');
        User.findOne({ _id: jwt_payload.sub })
            .then(data => {
                if (data === null) {
                    //no existe el usuario
                    //podríamos registrar el usuario
                    return done(null, false);
                } else return done(null, data);
                /*encontramos el usuario así que procedemos a devolverlo para
        inyectarlo en req.user de la petición en curso*/
            })
            .catch(err => done(err, null)); //si hay un error lo devolvemos
    })
);

const path = __dirname + '/public/';
const port = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(throttle(1024 * 128));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));

// routes
app.use('/api', apiRoutes);

app.listen(port, function() {
    console.log(`Example app listening on port ${port}`);
});
