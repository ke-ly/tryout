

const webpack = require('webpack')
const DevServer = require('webpack-dev-server')

const detect = require('detect-port') 

const { createConfig, clearConsole, } = require('./utils')

const port = 7080

detect(port).then((_port) => {    
    if(_port){
        const devOptions = {
            historyApiFallback: true,
            hot:true,
            port:_port,
            proxy: {
                '/socket.io':{
                    target:'ws://192.168.1.250:5959/',
                    ws: true
                }
            }
            // open:true,
            // stats:'errors-only'
        }    
        const compiler = webpack(createConfig())
        const server = new DevServer(compiler,devOptions)    
        server.listen(devOptions.port, '0.0.0.0', () => {
            // clearConsole()
            console.log(`Starting server on http://localhost:${devOptions.port}`);
        })    
    }   
})



