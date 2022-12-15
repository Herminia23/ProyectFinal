const express = require('express')
const rentapeliculaRouter = require('./routes/rentapelicula')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            rentapelicula:"/api/v1/rentapelicula"
        }
        this.middleware();
        this.routes();
    }

    routes(){
        this.app.use(this.paths.rentapelicula, rentapeliculaRouter);
    }

    middleware(){
        this.app.use(cors());//Habilita Origen Cruzado
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
}

module.exports = Server