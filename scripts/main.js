function main(){

let team1 = [];
let team2 = [];


//random hp for each karablek
// количество танков должно быть равно или исправить for в checkOnAlive(), везде
for(let i = 0; i<3; i++){
    team1[i] = Math.random() * (8 - 5) + 5;
    team1[i] = Math.round(team1[i]);
    team2[i] = Math.random() * (8 - 5) + 5;
    team2[i] = Math.round(team1[i]);
}


let hps = document.querySelectorAll('.hp');

setTimeout(() => {
    let hps = document.querySelectorAll('.hp');

    for(let i = 0; i <6; i++){
        if( i < 3){
            hps[i].innerText = team1[i];
        }else{
            hps[i].innerText = team2[i-3];
        }
    }
}, 0);
   


//show hp for each korabel
console.log('team1: ');
for(let i = 0; i<team1.length; i++){
    console.log("KARABIL" + (i+1) + ": " + team1[i]);
}
console.log('team2: ');
for(let i = 0; i<team2.length; i++){
    console.log("KARABIL" + (i+1) + ": " + team2[i]);
}
let roundsCounter = 0;
function battle(){
   

        //firing by team1
        for(let i = 0; i < team1.length; i++){
            if(team1[i] > 0){
                let fired = false;
                        //choosing alive team2.karablix for shooting 
                        let threetimes = 0; //value for 3 times limit choosing enemy for each team - to avoid bugs
                while(fired == false){
                    let randomIndex = Math.round(Math.random() * (team2.length - 0));
                    if(team2[randomIndex] > 0){ 
                        team2[randomIndex] = team2[randomIndex] - 1;
                        console.log('team1 shooting ' + (i+1) + ' times on team2.karablek' + (randomIndex+1) + ", current hp:" + team2[randomIndex]);
                        fired = true;
                    }
                    threetimes++;
                    if(threetimes ==3){
                        fired = true;
                    }
                }     
                hps[i].innerText = team1[i];
            }
            else{
                hps[i].innerText = 'died';
           
            }
        }

        //firing by team2
        for(let i = 0; i < team1.length; i++){
            if(team2[i] > 0){
                let fired = false;
                        //choosing alive team1.karablix for shooting 
                        let threetimes = 0; //value for 3 times limit choosing enemy for each team - to avoid bugs
                while(fired == false){
                    let randomIndex = Math.round(Math.random() * (team1.length - 0));
                    if(team1[randomIndex] > 0){ 
                        team1[randomIndex] = team1[randomIndex] - 1;
                        console.log('team2 shooting ' + (i+1) + ' times on team1.karablek' + (randomIndex+1) + ", current hp:" + team1[randomIndex]);
                        fired = true;
                    }
                    threetimes++;
                    if(threetimes ==3){
                        fired = true;
                    }
                }     
                hps[i+3].innerText = team2[i]; // +3 потому что у тим2 - последние 3 в маcсиве hps
            }
            else{
                hps[i+3].innerText = 'died';
                
                // let alive2checker = false;
                // for(let alive2 = 0; alive2 < team1.length; alive2++){
                //     if(team2[alive2] > 0){
                //         alive2checker = true;
                //     }
                // }
                // if(alive2checker = false){
                //     break;
                // }
            }
        }


        roundsCounter++;
        document.querySelector('.round').innerText = roundsCounter;




    let dieCounter1 = 0;
    let dieCounter2 = 0;
    for(let i = 0; i < team1.length; i++){
        if(team1[i] < 1){
            dieCounter1++; //died
        }
        if(team2[i] < 1){
            dieCounter2++; //died
        }
    }

    if(dieCounter1 == 3){
        document.querySelector('.round').innerText = 'TEAM2 WON';
        return 1;
    }else if(dieCounter2 == 3){
        document.querySelector('.round').innerText = 'TEAM1 WON';
        return 2;
    } else if(dieCounter1 == 3 || dieCounter2 == 3){
        return 0;
    }else{
        return 3; //war going on
    }
}


let battleProcess = true;
function getBattle(){

// while(battleProcess == true){
   
    
    let look = battle();
    if(look == 1){
        console.log('team2 won!');
        battleProcess = false;
    }else if(look == 2){
        console.log('team1 won!');
        battleProcess = false;
    } else if(look == 3){
        setTimeout(() => {
            console.log('no one team died, will be next round: ');
            getBattle();
        }, 1500);
    }


}
 setTimeout(() => {
    getBattle();
 }, 10);


}


document.querySelector('.starter').addEventListener('click', function(){
    main();
    
});