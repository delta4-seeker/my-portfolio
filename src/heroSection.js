import { render } from '@testing-library/react'
import React from 'react' 
import Canvas from './Canvas' 
import ethereum from "./images/ethereum.png"
import bitcoin from "./images/bitcoin.png"
import chainlink from "./images/chainlink.png"
import starknet from "./images/starknet.png"
import filecoin from "./images/filecoiin.png"
import rocketImage from "./images/rocket.png";
import prashantImage from "./images/prashant.jpg";
import wolfImage from "./images/wolf.jpg";


const coinsImage = [
     ethereum  ,
     ethereum  ,
     ethereum  ,
     bitcoin  ,
     bitcoin  ,
     chainlink ,
     starknet,
     filecoin 
]

 var wolf = new Image() ; 
 wolf.src = wolfImage ; 

 class Prashant{
    constructor(){

        this.position = {
            x : 430  , y : 270
        }
        this.velocity = {
            x : 0, 
            y : 0
        }
        this.acceleration = {
            x : 0, 
            y : 0,
        }
        this.image = new Image();
        this.image.src = prashantImage; 
    }
 }
class Coin {
    constructor(){
        // console.log(Math.random())
 
        this.position = {
            x :  Math.random() *1200  , y :  -100
        }
        this.scale =  Math.random() * Math.random() * 3;

        this.velocity = {
            x : 0 , 
            y : this.scale
        }
        this.acceleration = {
            x : Math.random() > 0.5 ? -0.5 : 0.5 , 
            y :  0.001
        }
        this.angle  = 0 ; 

        this.image = new Image();
        var random = (Math.random() * coinsImage.length) % coinsImage.length ; 
        // console.log(parseInt(random))
        this.image.src = coinsImage[parseInt(random)] ;

    }
}
var coins = []
for(let i = 0 ; i < 20 ; i++){
    
    coins.push(new Coin());
    
}
var smallCoins = []
for(let i = 0 ; i < 20 ; i++){

    smallCoins.push(new Coin());

}

class Rocket{
    constructor(){

        this.y = 120 ; 
    
        this.image = new Image();
        this.image.src = rocketImage ;
    }
}

const prashant = new Prashant() ; 
const rocket = new Rocket() ; 
// console.log(coins)
const gravity = 0.000091 ; 
const friction = 0.1 ; 

class HeroSection extends React.Component{
    render(){


        const draw =async  (ctx, frameCount) => {
            ctx.clearRect(0, 0, this.props.width, this.props.height)
       
        
            // var myFont = new FontFace('myFont', 'url(./images/CIND.otf)');
            // await myFont.load();
            // document.fonts.add(myFont);


      
            for(var i = 0 ; i < smallCoins.length ; i++){

                if( smallCoins[i].position.y > ctx.canvas.height  ){
                    smallCoins.splice(i , 1);
                    var newCoin = new Coin() ; 
                    newCoin.position.y = -400 ; 
                    smallCoins.push(newCoin);
                  }        
                  smallCoins[i].velocity.y += smallCoins[i].scale * gravity ; 
                  smallCoins[i].position.y += smallCoins[i].velocity.y ;


                  ctx.save();
                  ctx.translate( smallCoins[i].position.x ,smallCoins[i].position.y );
                  ctx.rotate(smallCoins[i].angle * smallCoins[i].scale   * Math.PI/180 );
                  ctx.drawImage(smallCoins[i].image , 0 -  smallCoins[i].scale *30 , 0- smallCoins[i].scale *30 , smallCoins[i].scale *60 , smallCoins[i].scale *60);
                  smallCoins[i].angle += 1 ; 
                  console.log(smallCoins[i].angle)
                  ctx.translate(  -smallCoins[i].position.x , -smallCoins[i].position.y );
                  ctx.restore();
 
                //  ctx.drawImage(smallCoins[i].image, smallCoins[i].position.x , smallCoins[i].position.y , smallCoins[i].scale *50 , smallCoins[i].scale * 50);
                //  ctx.drawImage(smallCoins[i].image, smallCoins[i].position.x + smallCoins[i].scale * 1000 , smallCoins[i].position.y +  smallCoins[i].scale * 100, smallCoins[i].scale *50 , smallCoins[i].scale * 50);
        
            
                }

            ctx.font = "50px Agency FB";
            ctx.fillStyle = "white";
            ctx.fillText("Hi! I'm Prashant and I like to",460, 300)
            ctx.font = " bold small-caps 150px Agency FB" ;
            ctx.fillStyle = "#00b8e6";
            ctx.fillText("Decentralize",380 , 390)

            ctx.drawImage(rocket.image, 590 + Math.random()  ,rocket.y , 120 , 120);
                
         
            // ctx.drawImage(prashant.image, prashant.position.x , prashant.position.y , 250 , 250);
 
      

            for(var i = 0 ; i < coins.length ; i++){

                if(coins[i].position.x >  prashant.position.x - Math.sqrt( coins[i].scale)  * 75/3 && coins[i].position.x <  prashant.position.x + 490  && coins[i].position.y > prashant.position.y - Math.sqrt( coins[i].scale)  * 75/2 ){
                    coins[i].velocity.y *= -1 ; 
                    coins[i].velocity.x = coins[i].acceleration.x ; 
                  

                }
                    coins[i].position.x += coins[i].velocity.x ;
            
                    coins[i].acceleration.y += coins[i].scale * gravity ; 
                    coins[i].velocity.y += coins[i].acceleration.y ; 
                    coins[i].position.y += coins[i].velocity.y ;
                    // coins[i].velocity.x = 0 ; 

                if( coins[i].position.y > ctx.canvas.height + 150  ){
                    coins.splice(i , 1);
                    var newCoin = new Coin() ; 
                    newCoin.position.y = -400 ; 
                    coins.push(newCoin);
                  }        
               
             
                 ctx.save();
                 ctx.translate( coins[i].position.x ,coins[i].position.y );
                 ctx.rotate(coins[i].angle * coins[i].scale   * Math.PI/180 );
                 ctx.drawImage(coins[i].image , 0 - Math.sqrt( coins[i].scale) *75 , -Math.sqrt( coins[i].scale) *75 , Math.sqrt( coins[i].scale) *150 , Math.sqrt( coins[i].scale) *150);
                 coins[i].angle += 0.9 * coins[i].acceleration.x ; 
                 console.log(coins[i].angle)
                 ctx.translate(  -coins[i].position.x , -coins[i].position.y );
                 ctx.restore();


              

                }



         

        }
        return <Canvas draw={draw} />
    }
}
export default HeroSection