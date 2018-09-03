const express = require('express');
const app = express();
const cors = require('cors')

const admin = require('firebase-admin');
var serviceAccount = require('./web-game-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//Settings
app.set('port',process.env.PORT || 3000);


//Middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));


//Routes
app.use('/api/game',require('./routes/rules.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log("App now running on port", app.get('port'));
  });
