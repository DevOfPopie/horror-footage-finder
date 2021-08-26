require('dotenv').config();

const express = require('express');


const app = express();

const expressSwagger = require('express-swagger-generator')(app);

const options = {
    swaggerDefinition: {
        info: {
            description: 'Propose une liste de films à voir',
            title: 'Horror footage finder',
            version: '1.0.0',
        },
        host: 'horror-footage-api.herokuapp.com',
        basePath: '/api/v1',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./app/routers/*.js']
};

expressSwagger(options);

const port = process.env.PORT || 3001;

const router = require('./app/routers');


app.use(express.json());

app.use((req, res, next) => {
    const allowedOrigins = ['https://horror-footage-finder.netlify.app', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.header('Access-Control-Allow-Origin', ['http://localhost:3000']); // A changer avec la future adresse du front...
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    // response to preflight request
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use(express.urlencoded({
    extended: true
}));

app.use(router);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});