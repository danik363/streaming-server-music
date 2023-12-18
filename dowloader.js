const { exec } = require('child_process');

function dowloader(){
    exec('ls -a', (error, stadout, stderr) => {
        if(!stadout.includes('music')){
            console.log('¡Carpeta music no existe!');
            exec('mkdir music', (error2, stdout2, stderr2) => {
                if(error2){
                    console.log(error2);
                }
                console.log('¡Carpeta music creada!');
    
                console.log('¡Creando musica!');
    
                dowloadbyId();
            });
        }else{
            console.log('¡Creando musica!');
            dowloadbyId();
        }
    });
}
function dowloadbyId({id, options}){
    exec('cd music && spotifydl https://open.spotify.com/track/4rzfv0JLZfVhOhbSQ8o5jZ', (error, stadout, stderr) => {
            if(error){
                console.log(error);
            }else{
                console.log('¡Musica creada!');
            }
        });
    
}
