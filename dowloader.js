const { exec } = require('child_process');
const utils = require('util');
const process = require('process');
const path = require('path');
const {isExist} = require('./utils.js');


const execAsync = utils.promisify(exec);

function dowloader (id){
    return new Promise((resolve, reject) => {
        execAsync('ls -a')
            .then(({stdout, stderr}) => {
                if(!stdout.includes('music')){
                    console.log(stdout);
                    console.log('¡Carpeta music no existe!');
                    console.log('¡Creando carpeta!');
                    return execAsync('mkdir music');
                    
                }else{
                    console.log('¡La carpeta ya existe!');
                    return Promise.resolve({stdout: 'Carpeta ya existente', stderr:''});
                }
            })
            .then(({stdout, stderr}) => {
                if(!stdout){
                    console.log(stdout);
                    console.log('¡Carpeta creada!');                   
                }
                return execAsync(`cd music && mkdir ${id}`);
            })
            .then(({stdout, stderr}) => {
                console.log('¡Creando musica!');
                console.log(id)
                return downloadbyId(id);
            })
            .then(({stdout, stderr})=> {
                console.log(stderr);
                console.log('¡Musica creada!'); 
                resolve(path.join(process.cwd(), 'music',id));
            
            })
            .catch((error) => {
                isExist(id).then((dirPath) => {
                    if(dirPath){
                        resolve(path.join(process.cwd(), 'music',id));
                    }else{
                        reject('Ha a ocurrido un error al momento de ejecutar los comandos' + error);
                    }
                }).catch((err) => {
                    console.log(err)
                })
                
            })    
    })
}

    
function downloadbyId(id){
    return execAsync(`cd ./music/${id} && spotifydl --oo https://open.spotify.com/track/${id}`);
}


module.exports = {dowloader};
