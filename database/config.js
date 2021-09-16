const mongoose = require('mongoose');
const chalk = require('chalk');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log(`${chalk.blueBright("BD inicializada correctamente ")}`);
    } catch (error) {
        console.log(`${chalk.bgBlackBright(error)}`);
        throw new Error(`${chalk.redBright("Error inicializando base de datos en MongoDb")}`)
    }

}

module.exports = {
    dbConnection
}
