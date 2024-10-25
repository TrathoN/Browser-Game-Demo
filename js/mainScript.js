var HeroHealth = 110;
var HeroHealthInitial = HeroHealth;
var EnemyHealth = 150;
var maxHeroHealth = HeroHealth;
var maxEnemyHealth = EnemyHealth;
var HealTurn = 3;
var Block = 0;
var EnemyTurn = false;

const HeroMovement = document.querySelector('#Hero');
const EnemyMovement = document.querySelector('#Enemy');
const Final = document.querySelector('#MessageBox');
const Attack = document.querySelector('#attack');
const Heal = document.querySelector('#heal');
const Shield = document.querySelector('#block');

HeroMovement.classList.add('idle');
EnemyMovement.classList.add('idle');

if(HeroHealth == 100){
    Heal.setAttribute("disabled", true);
}

 Attack.addEventListener('click', ()=>{

    EnemyTurn = !EnemyTurn;
    HeroMovement.classList.remove('idle');
    

    Attack.setAttribute("disabled", true);
    Heal.setAttribute("disabled", true);
    Shield.setAttribute("disabled", true);

    heroAttackLog();
    console.log("Enemy Health: " + EnemyHealth);
    console.log("Heal Turn: "+ HealTurn);
    
    setTimeout(()=>{EnemyMovement.classList.remove('idle')}, 6000);
    setTimeout(()=>{enemyAttackLog()}, 6000); 
    if(!EnemyTurn){
        setTimeout(()=>{EnemyMovement.classList.add('cast')},6000);
        setTimeout(()=>{EnemyMovement.classList.remove('cast')},6666);
        setTimeout(()=>{EnemyMovement.classList.add('idle')},6666);
    }
    setTimeout(()=>{console.log("Hero Health: " + HeroHealth)}, 6000);
    
    setTimeout(()=>{Attack.removeAttribute("disabled")}, 10000);
    setTimeout(()=>{if(HealTurn==3){Heal.removeAttribute("disabled")}}, 10000);
    setTimeout(()=>{Shield.removeAttribute("disabled")}, 10000);
    setTimeout(()=>{HeroMovement.classList.add('idle')}, 10000);
    setTimeout(()=>{EnemyMovement.classList.add('idle')}, 10000);
 });

 Heal.addEventListener('click', ()=>{

    EnemyTurn = !EnemyTurn;
    HeroMovement.classList.remove('idle');

    Attack.setAttribute("disabled", true);
    Heal.setAttribute("disabled", true);
    Shield.setAttribute("disabled", true);

    heroHealLog();
    console.log("Hero Healed Health: " + HeroHealth);

    enemyAttackLog();
    if(!EnemyTurn){
        setTimeout(()=>{EnemyMovement.classList.remove('idle')},2000);
        setTimeout(()=>{EnemyMovement.classList.add('cast')},2000);
        setTimeout(()=>{EnemyMovement.classList.remove('cast')},2666);
        setTimeout(()=>{EnemyMovement.classList.add('idle')},2666);
    }
    
    console.log("Hero Damaged Health: " + HeroHealth);

    setTimeout(()=>{Attack.removeAttribute("disabled")}, 4000);
    setTimeout(()=>{Shield.removeAttribute("disabled")}, 4000);
    setTimeout(()=>{HeroMovement.classList.add('idle')}, 4000);
    
 });

 Shield.addEventListener('click', ()=>{

    EnemyTurn = !EnemyTurn;
    HeroMovement.classList.remove('idle');

    Attack.setAttribute("disabled", true);
    Heal.setAttribute("disabled", true);
    Shield.setAttribute("disabled", true);

    heroShieldLog();
    console.log("Hero Shield buffed Health: " + HeroHealth);
    
    enemyAttackLog();
    if(!EnemyTurn){
        setTimeout(()=>{EnemyMovement.classList.remove('idle')},2000);
        setTimeout(()=>{EnemyMovement.classList.add('cast')},2000);
        setTimeout(()=>{EnemyMovement.classList.remove('cast')},2666);
        setTimeout(()=>{EnemyMovement.classList.add('idle')},2666);
    }
    console.log("Hero Blocked Health: " + HeroHealth);
    console.log("Heal Turn: "+ HealTurn);

    setTimeout(()=>{Attack.removeAttribute("disabled")}, 4000);
    setTimeout(()=>{if(HealTurn==3){Heal.removeAttribute("disabled")}}, 4000);
    setTimeout(()=>{Shield.removeAttribute("disabled")}, 4000);
    setTimeout(()=>{HeroMovement.classList.add('idle')}, 4000);
 });

 
 function heroAttackLog(){
    if((HeroHealth > 0) && (EnemyHealth > 0))
    {
        HeroMovement.classList.add('running-1');
        setTimeout(()=>{HeroMovement.classList.remove('running-1')}, 2000);
        setTimeout(()=>{HeroMovement.classList.add('attacking-3')}, 2000);
        
        setTimeout(()=>{EnemyMovement.classList.add('hit')}, 2500);
        var damage = Math.floor(Math.random()*10)+20; //between 20-30
        var crit = Math.floor(Math.random()*4)+1; //between 1-4 25%
        const log = document.createElement("p");

        console.log("Crit:" + crit);
        if(crit == 1){
            damage = Math.floor(Math.random()*10)+35; //between 35-45
            log.innerHTML = "Hero dealt <p1>" + damage + " damage</p1> to the Monster.";
        }
        else{
            log.innerHTML = "Hero dealt <p2>" + damage + " damage</p2> to the Monster.";
        }

        setTimeout(()=>{document.getElementById("consoleLog").appendChild(log)}, 2500);

        EnemyHealth = EnemyHealth - damage;
        setTimeout(()=>{EnemyBar(EnemyHealth)}, 2500);

        if(HealTurn != 3 && HealTurn != 0){
            HealTurn -= 1;
        }
        else if(HealTurn == 0){
            HealTurn = 3;
        }
        setTimeout(()=>{EnemyMovement.classList.remove('hit')}, 3000);
        if(EnemyHealth <= 0){
            setTimeout(()=>{EnemyMovement.classList.add('death')}, 3000);
        }
        else{
            setTimeout(()=>{EnemyMovement.classList.add('idle')}, 3000);
        }
        setTimeout(()=>{HeroMovement.classList.remove('attacking-3')}, 3000);
        setTimeout(()=>{HeroMovement.classList.add('running-2')}, 3000);
        setTimeout(()=>{HeroMovement.classList.remove('running-2')}, 5000);

        if(EnemyTurn){
            setTimeout(()=>{HeroMovement.classList.add('idle')}, 5000);
            setTimeout(()=>{HeroMovement.classList.remove('idle')}, 8000);
        }
        else{
            setTimeout(()=>{HeroMovement.classList.add('idle')}, 5000);
        }
    }
 }

 function heroHealLog(){
    if((HeroHealth > 0) && (EnemyHealth > 0) && (HealTurn == 3))
    {
        HeroMovement.classList.add('heal');
        var heal = Math.floor(Math.random()*5)+ 20; //between 20-25
        HeroHealth = HeroHealth + heal;
        if(HeroHealth >= HeroHealthInitial){
            HeroHealth = HeroHealthInitial;
        }
        const log = document.createElement("p");
        log.innerHTML = "Hero healed <p3>" + heal + " damage</p3> point.";
        document.getElementById("consoleLog").appendChild(log);
        HeroBar(HeroHealth);
        HealTurn = 2;
        document.getElementById("heal").setAttribute("disabled", true);

        setTimeout(()=>{HeroMovement.classList.remove('heal')},1000);
        setTimeout(()=>{HeroMovement.classList.add('idle')},1000);
        setTimeout(()=>{HeroMovement.classList.remove('idle')},4000);
    }
 }

 function heroShieldLog(){
    var EnemyLocalTurn = EnemyTurn;
    if((HeroHealth > 0) && (EnemyHealth > 0) && (EnemyLocalTurn == true)){
        HeroMovement.classList.add('block');
        var block = Math.floor(Math.random()*6)+6 //between 6-12
        Block = block;
        const log = document.createElement("p");
        log.innerHTML = "Hero Blocked <p4>" + block + " damage</p4>.";
        setTimeout(()=>{document.getElementById("consoleLog").appendChild(log);},2299);
        
        HeroHealth = HeroHealth + block;
        if(HealTurn != 3 && HealTurn != 0){
            HealTurn -= 1;
        }
        else if(HealTurn == 0){
            HealTurn = 3;
        }
        setTimeout(()=>{HeroMovement.classList.remove('block')},2400);
    }
    else if(!EnemyLocalTurn){
        if(HealTurn != 3 && HealTurn != 0){
            HealTurn -= 1;
        }
        else if(HealTurn == 0){
            HealTurn = 3;
        }
        HeroMovement.classList.add('block');
        setTimeout(()=>{HeroMovement.classList.remove('block')}, 3500);
        setTimeout(()=>{HeroMovement.classList.add('block-2')},3500);
        setTimeout(()=>{HeroMovement.classList.remove('block-2')},4000);
    }
 }

 function enemyAttackLog(){
    if((HeroHealth > 0) && (EnemyHealth > 0) && (EnemyTurn == true))
    {
        EnemyMovement.classList.add('walk-1');
        setTimeout(()=>{EnemyMovement.classList.remove('walk-1')}, 2000);
        setTimeout(()=>{EnemyMovement.classList.add('attack')}, 2000);

        var damage = Math.floor(Math.random()*15)+35; //between 35-50

        if(Block != 0){
            damage -= Block;
            Block = 0;
        }
        const log = document.createElement("p");
        log.innerHTML = "Enemy dealt <p2>" + damage + " damage</p2> to the Hero.";

        setTimeout(()=>{document.getElementById("consoleLog").appendChild(log)},2300);
        HeroHealth = HeroHealth - damage;

        setTimeout(()=>{HeroBar(HeroHealth)}, 2300);

        setTimeout(()=>{HeroMovement.classList.add('hit')}, 2000);
        setTimeout(()=>{HeroMovement.classList.remove('hit')}, 2400);
        if(HeroHealth <= 0){
            setTimeout(()=>{HeroMovement.classList.add('death')}, 2400);
        }
        else{
            setTimeout(()=>{HeroMovement.classList.add('idle')}, 2400);
        }
        

        setTimeout(()=>{EnemyMovement.classList.remove('attack')}, 3000);
        setTimeout(()=>{EnemyMovement.classList.add('walk-2')}, 3000);
        setTimeout(()=>{EnemyMovement.classList.remove('walk-2')}, 5000);
    }
 }

 function HeroBar(hth){
    var percent = (hth/maxHeroHealth) * 100;
    if(percent <= 0){
        percent = 0;
    }
    percent = percent + '%';
    console.log(percent);
    document.getElementById("HeroHealth").setAttribute("style", "width: " + percent);

    setTimeout(()=>{if(HeroHealth <= 0){
        Attack.setAttribute("disabled", true);
        Heal.setAttribute("disabled", true);
        Shield.setAttribute("disabled", true);
        const notf1 = document.createElement("p");
        const notf2 = document.createElement("p");
        notf1.innerHTML = "You Have Died!";
        document.getElementById("innerBox").appendChild(notf1);
        notf2.innerHTML = "Would you like to play again?";
        document.getElementById("innerBox").appendChild(notf2);
        
        Final.setAttribute('style','display:unset;');
    }},4000);
 }

 function EnemyBar(hth){
    var percent = (hth/maxEnemyHealth) * 100;
    if(percent <= 0){
        percent = 0;
    }
    percent = percent + '%';
    document.getElementById("EnemyHealth").setAttribute("style", "width: " + percent);

    setTimeout(()=>{if(EnemyHealth <= 0){
        Attack.setAttribute("disabled", true);
        Heal.setAttribute("disabled", true);
        Shield.setAttribute("disabled", true);

        const notf1 = document.createElement("p");
        const notf2 = document.createElement("p");
        notf1.innerHTML = "You have killed the Monster.";
        document.getElementById("innerBox").appendChild(notf1);
        notf2.innerHTML = "Congrats!!\nWould you like to play again?";
        document.getElementById("innerBox").appendChild(notf2);

        Final.setAttribute('style','display:unset;');
    }},4000);
 }