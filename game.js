const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
const scoreEl=document.getElementById("score"),healthEl=document.getElementById("health"),levelEl=document.getElementById("level"),msg=document.getElementById("message");
const keys={};let score=0,health=3,level=1,gameOver=false,won=false;
const player={x:50,y:390,w:30,h:40,vx:0,vy:0,speed:4,jump:12,onGround:false};
let platforms=[],stars=[],enemies=[],portal={x:840,y:390,w:38,h:60};

function makeLevel(){
 platforms=[{x:0,y:450,w:900,h:50},{x:140,y:360,w:130,h:18},{x:350,y:290,w:140,h:18},{x:570,y:360,w:130,h:18}];
 stars=[{x:190,y:325},{x:400,y:255},{x:620,y:325},{x:760,y:410}];
 enemies=[{x:300,y:410,w:34,h:40,dx:1.5},{x:520,y:410,w:34,h:40,dx:-1.7}];
 if(level===2){platforms[1].x=100;platforms[1].y=330;platforms[2].x=300;platforms[2].y=230;platforms[3].x=560;platforms[3].y=320;stars.push({x:330,y:195});enemies.push({x:700,y:410,w:34,h:40,dx:-2});}
 if(level===3){platforms[1].x=170;platforms[1].y=310;platforms[2].x=390;platforms[2].y=200;platforms[3].x=650;platforms[3].y=300;stars.push({x:420,y:165},{x:700,y:265});enemies.push({x:450,y:410,w:34,h:40,dx:2.2});}
 player.x=50;player.y=390;player.vx=0;player.vy=0;portal={x:840,y:390,w:38,h:60};
}
function reset(){score=0;health=3;level=1;gameOver=false;won=false;makeLevel();updateHud();msg.textContent="Reach the portal! Collect stars and avoid enemies."}
function updateHud(){scoreEl.textContent=score;healthEl.textContent=health;levelEl.textContent=level}
function rectHit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
function update(){
 if(gameOver||won)return;
 player.vx=0;if(keys.ArrowLeft)player.vx=-player.speed;if(keys.ArrowRight)player.vx=player.speed;
 if(keys.ArrowUp&&player.onGround){player.vy=-player.jump;player.onGround=false}
 player.vy+=0.55;player.x+=player.vx;player.y+=player.vy;
 player.x=Math.max(0,Math.min(canvas.width-player.w,player.x));player.onGround=false;
 for(const p of platforms)if(rectHit(player,p)&&player.vy>=0&&player.y+player.h-player.vy<=p.y){player.y=p.y-player.h;player.vy=0;player.onGround=true}
 for(const s of stars)if(!s.got&&rectHit(player,{x:s.x-10,y:s.y-10,w:20,h:20})){s.got=true;score+=10;updateHud()}
 for(const e of enemies){e.x+=e.dx;if(e.x<0||e.x+e.w>canvas.width)e.dx*=-1;if(rectHit(player,e)){health--;updateHud();player.x=50;player.y=390;player.vy=0;if(health<=0){gameOver=true;msg.textContent="Game over! Press R or 🔄 to try again."}else msg.textContent="Ouch! Watch out for the enemies."}}
 if(rectHit(player,portal)){if(level<3){level++;score+=50;makeLevel();updateHud();msg.textContent="Level "+level+"! Keep going! 🎉"}else{won=true;score+=100;updateHud();msg.textContent="🏆 You won Favour's Adventure! Press R to play again."}}
 if(player.y>canvas.height+30){health--;updateHud();player.x=50;player.y=390;player.vy=0;if(health<=0){gameOver=true;msg.textContent="Game over! Press R or 🔄 to try again."}}
}
function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 const g=ctx.createLinearGradient(0,0,0,canvas.height);g.addColorStop(0,"#68c7ff");g.addColorStop(1,"#d9f5ff");ctx.fillStyle=g;ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle="#79b85a";ctx.fillRect(0,450,900,50);
 for(const p of platforms){ctx.fillStyle="#754c24";ctx.fillRect(p.x,p.y,p.w,p.h);ctx.fillStyle="#49a942";ctx.fillRect(p.x,p.y,p.w,6)}
 for(const s of stars)if(!s.got){ctx.fillStyle="#ffd43b";ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?5:11;ctx.lineTo(s.x+Math.cos(a)*r,s.y+Math.sin(a)*r)}ctx.closePath();ctx.fill()}
 for(const e of enemies){ctx.fillStyle="#8b1e3f";ctx.fillRect(e.x,e.y,e.w,e.h);ctx.fillStyle="#fff";ctx.fillRect(e.x+7,e.y+8,6,6);ctx.fillRect(e.x+21,e.y+8,6,6)}
 ctx.fillStyle="#7b2cff";ctx.fillRect(portal.x,portal.y,portal.w,portal.h);ctx.fillStyle="#d9b3ff";ctx.fillRect(portal.x+8,portal.y+8,22,44);
 ctx.fillStyle="#1b1b1b";ctx.fillRect(player.x,player.y,player.w,player.h);ctx.fillStyle="#f0b27a";ctx.fillRect(player.x+6,player.y-10,18,14);ctx.fillStyle="#fff";ctx.fillRect(player.x+8,player.y-6,4,4);ctx.fillRect(player.x+18,player.y-6,4,4);
}
function loop(){update();draw();requestAnimationFrame(loop)}
addEventListener("keydown",e=>{keys[e.key]=true;if(e.key.toLowerCase()==="r")reset();if(["ArrowUp","ArrowLeft","ArrowRight"].includes(e.key))e.preventDefault()});
addEventListener("keyup",e=>keys[e.key]=false);
document.querySelectorAll(".controls button[data-key]").forEach(b=>{const k=b.dataset.key;const on=()=>keys[k]=true,onoff=()=>keys[k]=false;b.addEventListener("pointerdown",on);b.addEventListener("pointerup",onoff);b.addEventListener("pointerleave",onoff);b.addEventListener("pointercancel",onoff)});
document.getElementById("restart").onclick=reset;reset();loop();