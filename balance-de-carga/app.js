const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const initServer = require('./server')
const yargs = require('yargs/yargs')(process.argv.slice(2))

const app = initServer()

// ---------------------------------------------------------------------------------
//ARGUMENTOS

const args = yargs.default({
    p: 8080,
    m: 'FORK'
}).argv
const PORT = args.p
const MODE = args.m

// ---------------------------------------------------------------------------------
//FUNCION PARA EJECUTAR SERVIDOR

function runServer(){
    try{
        app.listen(PORT)
        console.log(`Worker ${process.pid} started`)
    } catch (err){
        console.log(err)
    }
}


// ---------------------------------------------------------------------------------
//SELECCION DE MODO (FORK O CLUSTER)

if(MODE === 'CLUSTER'){
    if(cluster.isPrimary){
        console.log(`Master ${process.pid}`)
        for(let i=0; i < numCPUs; i++){
            cluster.fork()
        }
        cluster.on('exit', (worker, coder, sinal)=>{
            console.log(`Worker ${worker.process.pid} died`)
        })
    }else{
        runServer()
    }
}else{
    runServer()
}