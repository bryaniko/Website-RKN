<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RKN – Rona Karya Nusantara</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<style>
/* ═══════════════════════════════
   RESET & BASE
═══════════════════════════════ */
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}

:root{
  --blue:#453ec2;--deep:#2d27a0;--light:#6c66e8;
  --gold:#d4a843;--gold-lt:#f0c96e;--white:#F5F5F5;
  --muted:rgba(245,245,245,.55);
}

body{
  font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  background:#212121;color:#F5F5F5;overflow-x:hidden;
  transition:background 1s ease-in-out;
}


/* ═══════════════════════════════
   HEADER
═══════════════════════════════ */
header{
  position:fixed;width:100%;top:0;z-index:1000;
  padding:1.4rem 2.5rem;
  display:flex;justify-content:space-between;align-items:center;
  background:rgba(255,255,255,.09);backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(67,56,202,.2);
  transition:transform .3s ease-in-out;
}
header.header-hidden{transform:translateY(-100%);}

.logo{height:50px;width:auto;object-fit:contain;transition:all .3s ease;position:relative;z-index:1001;}
.logo-link{display:flex;align-items:center;text-decoration:none;transition:all .3s ease;position:relative;z-index:1001;}
.logo-link:hover{transform:scale(1.05);}

nav ul{display:flex;gap:3rem;list-style:none;margin:0;padding:0;}
nav a{
  color:rgba(255,255,255,.68);text-decoration:none;
  font-size:.9rem;font-weight:500;letter-spacing:.5px;
  transition:all .3s ease;position:relative;
}
nav a::after{
  content:'';position:absolute;bottom:-5px;left:0;
  width:0;height:2px;background:#fff;transition:width .3s ease;
}
nav a:hover,nav a.active{color:#fff;}
nav a:hover::after,nav a.active::after{width:100%;}

/* Mobile Burger */
.nav-toggle{
  display:none;width:44px;height:44px;align-items:center;justify-content:center;
  flex-direction:column;border-radius:10px;background:rgba(255,255,255,.08);
  border:1px solid rgba(67,56,202,.3);cursor:pointer;
  transition:all .3s ease;position:relative;z-index:1001;
}
.nav-toggle span{display:block;width:22px;height:2px;background:#F5F5F5;border-radius:2px;transition:all .3s cubic-bezier(.4,0,.2,1);}
.nav-toggle span+span{margin-top:5px;}
.nav-toggle.active span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.nav-toggle.active span:nth-child(2){opacity:0;transform:translateX(20px);}
.nav-toggle.active span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

@media(max-width:768px){
  header{padding:1rem 1.5rem;}
  .logo{height:42px;}
  .nav-toggle{display:flex;}
  header nav::before{
    content:'';position:fixed;top:0;left:0;width:100vw;height:100vh;
    background:rgba(0,0,0,.6);opacity:0;visibility:hidden;
    transition:opacity .3s,visibility .3s;z-index:998;pointer-events:none;
  }
  header nav.open::before{opacity:1;visibility:visible;pointer-events:auto;}
  header nav{
    position:fixed;top:0;right:0;width:300px;max-width:85vw;height:100vh;
    background:linear-gradient(180deg,rgba(30,30,45,.98),rgba(20,20,35,.98));
    backdrop-filter:blur(10px);border-left:1px solid rgba(67,56,202,.5);
    transform:translateX(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);
    z-index:999;box-shadow:-4px 0 30px rgba(0,0,0,.6);overflow-y:auto;
  }
  header nav.open{transform:translateX(0);}
  header nav ul{
    flex-direction:column;gap:.5rem;padding:90px 20px 30px;width:100%;
  }
  header nav ul li{opacity:0;transform:translateX(30px);transition:all .5s cubic-bezier(.4,0,.2,1);}
  header nav.open ul li{opacity:1;transform:translateX(0);}
  header nav.open ul li:nth-child(1){transition-delay:.1s;}
  header nav.open ul li:nth-child(2){transition-delay:.15s;}
  header nav.open ul li:nth-child(3){transition-delay:.2s;}
  header nav.open ul li:nth-child(4){transition-delay:.25s;}
  header nav.open ul li:nth-child(5){transition-delay:.3s;}
  nav a{
    font-size:1rem;font-weight:600;padding:.9rem 1.2rem;display:flex;
    border-radius:10px;background:rgba(255,255,255,.08);
    border:1px solid rgba(67,56,202,.35);color:rgba(255,255,255,.9);
    overflow:hidden;
  }
  nav a::before{
    content:'';position:absolute;left:-100%;top:0;width:100%;height:100%;
    background:linear-gradient(90deg,transparent,rgba(67,56,202,.3),transparent);
    transition:left .5s;
  }
  nav a:hover::before,nav a.active::before{left:100%;}
  nav a:hover,nav a.active{
    background:rgba(67,56,202,.4);border-color:rgba(67,56,202,.8);
    transform:translateX(-8px);color:#fff;
  }
  nav a::after{display:none;}
}

/* ════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════ */
.hero{
  min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}

/* BG */
.hero-bg{
  position:absolute;inset:0;
  background:#453ec2;overflow:hidden;
}
.hero-bg::after{
  content:"";position:absolute;inset:0;
  background-image:repeating-linear-gradient(
    -45deg,rgba(255,255,255,.18),rgba(255,255,255,.18) 1px,
    transparent 1px,transparent 10px
  );
  -webkit-mask-image:linear-gradient(to bottom,black 0%,black 55%,transparent 100%);
  mask-image:linear-gradient(to bottom,black 0%,black 55%,transparent 100%);
  opacity:.35;
}
@media(max-width:992px){.hero-bg::after{opacity:.18;}}
@media(max-width:640px){.hero-bg::after{opacity:.12;}}

/* Ripples */
.ripple-layer{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;}
.ripple{position:absolute;border-radius:80%;border:1px solid rgb(65,169,255);opacity:0;animation:rpl 4s linear infinite;}
.ripple-1{top:30%;left:15%;width:180px;height:180px;animation-delay:0s;}
.ripple-2{top:60%;left:40%;width:240px;height:240px;animation-delay:2s;}
.ripple-3{top:35%;right:18%;width:200px;height:200px;animation-delay:4s;}
.ripple-4{bottom:20%;right:35%;width:300px;height:300px;animation-delay:6s;}
@keyframes rpl{
  0%{transform:scale(.4);opacity:0;}15%{opacity:.35;}
  50%{opacity:.15;}100%{transform:scale(2.2);opacity:0;}
}

/* ── HERO GRID ── */
.hero-grid{
  position:relative;z-index:10;width:100%;max-width:1500px;
  padding:7rem 2.5rem 1.5rem;
  display:grid;
  grid-template-columns: 1fr 480px 1fr;
  grid-template-rows:1fr auto;
  gap:0 3rem;
  align-items:center;justify-items:center;
  min-height:100vh;
  margin:0 auto;
}

/* ─── KIRI: BER COMPASS ─── */
.ber-wrap{
  grid-column:1;grid-row:1;
  position:relative;width:380px;height:380px;
  display:flex;align-items:center;justify-content:center;
  animation:fadeLeft .9s .1s ease both;
  justify-self:end;padding-right:20px;
}
@keyframes fadeLeft{from{opacity:0;transform:translateX(-28px);}to{opacity:1;transform:translateX(0);}}

.ber-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible;}

.ber-ring{
  position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);border-radius:50%;border:1px solid;pointer-events:none;
}
.ber-ring-in{width:168px;height:168px;border-color:rgba(212,168,67,.32);animation:orbR 28s linear infinite;}
.ber-ring-out{width:346px;height:346px;border-color:rgba(255,255,255,.07);animation:orbR 52s linear infinite reverse;}
@keyframes orbR{to{transform:translate(-50%,-50%) rotate(360deg);}}

.ber-core{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;
  width:108px;height:108px;border-radius:50%;
  background:radial-gradient(circle at 38% 32%,rgba(108,102,232,.96),rgba(45,39,160,.99));
  border:2px solid rgba(212,168,67,.65);
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  box-shadow:0 0 0 12px rgba(67,56,202,.13),0 0 50px rgba(67,56,202,.55),0 0 90px rgba(67,56,202,.2),inset 0 1px 0 rgba(255,255,255,.18);
  animation:coreP 4s ease-in-out infinite;
}
@keyframes coreP{
  0%,100%{box-shadow:0 0 0 12px rgba(67,56,202,.13),0 0 50px rgba(67,56,202,.55),0 0 90px rgba(67,56,202,.2);}
  50%{box-shadow:0 0 0 18px rgba(67,56,202,.2),0 0 70px rgba(67,56,202,.75),0 0 120px rgba(67,56,202,.32);}
}
.core-label{font-family:Georgia,serif;font-size:1.9rem;font-weight:700;color:var(--gold-lt);letter-spacing:.05em;line-height:1;}
.core-sub{font-size:.38rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-top:.25rem;}

/* Nodes — hex r=148, center=200
   n0 top(270°):     200,52  → top=52-43=9,  left=200-43=157
   n1 top-rt(330°):  328,126 → top=83,  left=285
   n2 bot-rt(30°):   328,274 → top=231, left=285
   n3 bot(90°):      200,348 → top=305, left=157
   n4 bot-lt(150°):  72,274  → top=231, left=29
   n5 top-lt(210°):  72,126  → top=83,  left=29
*/
.ber-node{
  position:absolute;width:86px;height:86px;border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;cursor:default;z-index:20;
  border:1.5px solid rgba(212,168,67,.5);
  transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s;
}
.bn0{top:9px;left:157px;background:radial-gradient(circle at 40% 35%,#2a257e,#1a1660);}
.bn1{top:83px;left:285px;background:radial-gradient(circle at 40% 35%,#312a9a,#201c74);}
.bn2{top:231px;left:285px;background:radial-gradient(circle at 40% 35%,#312a9a,#201c74);}
.bn3{top:305px;left:157px;background:radial-gradient(circle at 40% 35%,#2a257e,#1a1660);}
.bn4{top:231px;left:29px;background:radial-gradient(circle at 40% 35%,#312a9a,#201c74);}
.bn5{top:83px;left:29px;background:radial-gradient(circle at 40% 35%,#2a257e,#1a1660);}

.ber-node::before{
  content:'';position:absolute;inset:-7px;border-radius:50%;
  animation:nodePing 3.2s ease-in-out infinite;animation-delay:var(--nd,0s);
}
@keyframes nodePing{
  0%,100%{box-shadow:0 0 0 0 rgba(212,168,67,.28);}
  50%{box-shadow:0 0 0 9px rgba(212,168,67,0);}
}
.ber-node::after{
  content:attr(data-tip);
  position:absolute;bottom:calc(100% + 7px);left:50%;
  transform:translateX(-50%) scale(.88);
  background:rgba(8,6,24,.97);border:1px solid rgba(212,168,67,.3);
  border-radius:8px;padding:.38rem .7rem;
  font-size:.56rem;line-height:1.5;color:rgba(255,255,255,.88);
  white-space:nowrap;pointer-events:none;opacity:0;
  transition:opacity .25s,transform .25s;z-index:50;
}
.ber-node:hover{transform:scale(1.22);box-shadow:0 0 28px rgba(212,168,67,.5),0 8px 24px rgba(0,0,0,.35);z-index:30;}
.ber-node:hover::after{opacity:1;transform:translateX(-50%) scale(1);}
.bn-icon{
  width:100px;
  height:100px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:.2rem;
}

.bn-icon img{
  width:100%;
  height:100%;
  object-fit:contain;
  filter:drop-shadow(0 0 6px rgba(255,255,255,.35));
}
.bn-lbl{font-size:.38rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.82);line-height:1.3;}

.ber-sp{
  position:absolute;width:4px;height:4px;border-radius:50%;
  background:var(--gold-lt);pointer-events:none;opacity:0;
  animation:spk var(--sd,6s) var(--sdd,0s) ease-in-out infinite;
}
@keyframes spk{
  0%,100%{opacity:0;transform:scale(0) translateY(0);}
  30%{opacity:1;transform:scale(1) translateY(-10px);}
  70%{opacity:.6;transform:scale(1) translateY(-22px);}
}

/* ─── TENGAH: HERO CONTENT ─── */
.hero-center{
  grid-column:2;grid-row:1;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;gap:0;padding:0 1rem;
  width:100%;max-width:480px;
  justify-self:center;
}

.hero-eyebrow{
  display:inline-flex;align-items:center;gap:.6rem;
  font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(255,255,255,.42);margin-bottom:.7rem;
  animation:fadeUp .9s .1s ease both;
}
.ey-line{width:20px;height:1px;background:rgba(255,255,255,.22);}

.hero h1{
  font-size:clamp(4.5rem,10vw,8.5rem);font-weight:800;
  letter-spacing:-.05em;line-height:.9;margin-bottom:.8rem;
  background:#fff;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:fadeUp 1s ease both;
}
.hero-subtitle{
  font-size:clamp(.85rem,1.8vw,1.35rem);
  color:rgba(245,245,245,.82);font-weight:800;letter-spacing:.1em;
  margin-bottom:1.2rem;animation:fadeUp 1s .15s ease both;
}
.hero-desc{
  font-size:.9rem;color:rgba(245,245,245,.65);
  max-width:400px;line-height:1.8;margin:0 auto 1.5rem;
  animation:fadeUp 1s .25s ease both;
}

.cta-btn{
  display:inline-block;padding:1rem 2.5rem;
  background:linear-gradient(135deg,#4338CA,#7C3AED);
  color:#F5F5F5;text-decoration:none;border-radius:50px;
  border:2px solid rgba(255,255,255,.35);
  font-weight:600;font-size:.9rem;letter-spacing:1px;
  position:relative;overflow:hidden;
  transition:transform .4s,box-shadow .4s,border-color .4s;
  animation:fadeUp 1s .35s ease both;
}
.cta-btn::before{
  content:'';position:absolute;top:50%;left:50%;
  width:0;height:0;border-radius:50%;
  background:rgba(185,132,255,.12);transform:translate(-50%,-50%);
  transition:width .6s,height .6s;
}
.cta-btn:hover::before{width:300px;height:300px;}
.cta-btn:hover{transform:translateY(-4px);border-color:#a5b4fc65;box-shadow:0 25px 70px rgba(67,56,202,.45);}

.social-links{
  margin-top:1.2rem;
  display:flex;
  gap:.75rem;
  justify-content:center;
  animation:fadeUp 1s .45s ease both;
}
.social-link{
  width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;
  border-radius:10px;background:rgba(255,255,255,.03);
  border:1px solid rgba(67,56,202,.15);color:#F5F5F5;text-decoration:none;
  box-shadow:0 8px 25px rgba(67,56,202,.15);
  transition:all .3s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden;
  animation:socialPop .6s cubic-bezier(.34,1.56,.64,1) both;
}
.social-link:nth-child(1){animation-delay:.55s;}
.social-link:nth-child(2){animation-delay:.65s;}
.social-link:nth-child(3){animation-delay:.75s;}
.social-link:nth-child(4){animation-delay:.85s;}
.social-link svg{width:19px;height:19px;fill:currentColor;position:relative;z-index:2;transition:transform .4s cubic-bezier(.34,1.56,.64,1);}
.social-link:hover svg{transform:scale(1.2) rotate(5deg);}
.social-link::before{
  content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(67,56,202,.2),transparent);
  transition:left .6s;z-index:1;
}
.social-link:hover::before{left:100%;}
.social-link:hover{transform:translateY(-7px) scale(1.1);box-shadow:0 20px 40px rgba(67,56,202,.3);border-color:rgba(67,56,202,.5);}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}

@keyframes socialPop{
  0%{
    opacity:0;
    transform:scale(0) translateY(30px) rotate(-15deg);
  }
  60%{
    opacity:1;
    transform:scale(1.15) translateY(-5px) rotate(0deg);
  }
  100%{
    opacity:1;
    transform:scale(1) translateY(0) rotate(0deg);
  }
}

/* ─── KANAN: TYPEWRITER ─── */
.hero-right{
  grid-column:3;grid-row:1;
  display:flex;flex-direction:column;justify-content:center;
  background:rgba(8,6,30,.58);
  border:1px solid rgba(255,255,255,.07);
  border-radius:16px;padding:1.8rem 1.6rem;
  backdrop-filter:blur(14px);width:380px;min-height:380px;
  animation:fadeRight .9s .2s ease both;
  justify-self:start;padding-left:20px;
}
@keyframes fadeRight{from{opacity:0;transform:translateX(28px);}to{opacity:1;transform:translateX(0);}}

.tw-label{
  font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1rem;
  display:flex;align-items:center;gap:.5rem;
}
.tw-text{
  font-style:italic;
  font-size:clamp(.88rem,1.6vw,1.1rem);
  line-height:1.8;color:rgba(255,255,255,.85);
  min-height:100px;flex:1;
}
#tw-cursor{
  display:inline-block;width:2px;height:1em;
  background:var(--gold);margin-left:2px;vertical-align:text-bottom;
  animation:curBlink .7s step-end infinite;
}
@keyframes curBlink{0%,100%{opacity:1;}50%{opacity:0;}}
.tw-meta{
  margin-top:1.2rem;display:flex;align-items:center;gap:.6rem;
  font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(255,255,255,.28);
}
.tw-dot{width:6px;height:6px;border-radius:50%;background:var(--gold);}
.tw-pips{margin-top:.8rem;display:flex;gap:.38rem;}
.tw-pip{
  height:3px;border-radius:2px;background:rgba(255,255,255,.14);
  transition:background .35s,width .35s;width:16px;
}
.tw-pip.active{background:var(--gold);width:26px;}

/* ─── MISSION TIMELINE (bawah center) ─── */
.mission-row{
  /* use absolute centering instead of grid to guarantee bottom center
     of hero section */
  position: absolute;
  bottom: 2rem;              /* sejajar dengan tombol LIHAT BRAND */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 900px;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 9;
}
.mission-label{
  font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(255,255,255,.3);margin-bottom:1rem;text-align:center;
}
.mission-track{
  width: 100%;
  max-width: 800px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

}
.mission-track::before{
  content:'';position:absolute;top:27px;left:calc(10% + 6px);right:calc(10% + 6px);
  height:1px;background:linear-gradient(90deg,rgba(212,168,67,0),rgba(212,168,67,.45),rgba(212,168,67,0));z-index:1;
}
.ms-step{flex:1;display:flex;flex-direction:column;align-items:center;gap:.5rem;position:relative;z-index:2;cursor:default;}
.ms-circle{
  width:54px;height:54px;border-radius:50%;
  background:rgba(20,16,60,.85);border:1.5px solid rgba(212,168,67,.45);
  display:flex;align-items:center;justify-content:center;font-size:1.25rem;
  transition:all .4s cubic-bezier(.34,1.56,.64,1);position:relative;
}
.ms-step:hover .ms-circle{
  transform:scale(1.2);border-color:var(--gold);
  box-shadow:0 0 0 8px rgba(212,168,67,.1),0 0 24px rgba(212,168,67,.35);
  background:rgba(67,56,202,.4);
}
.ms-circle::after{
  content:'';position:absolute;inset:-4px;border-radius:50%;
  border:1px dashed rgba(212,168,67,.22);
  animation:msRot 9s linear infinite;animation-delay:var(--mr,0s);
}
@keyframes msRot{to{transform:rotate(360deg);}}
.ms-name{
  font-size:.5rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:rgba(255,255,255,.6);text-align:center;line-height:1.4;transition:color .3s;
}
.ms-step:hover .ms-name{color:var(--gold-lt);}
.ms-desc{
  font-size:.54rem;color:rgba(255,255,255,.3);
  text-align:center;line-height:1.5;max-width:88px;
  opacity:0;transform:translateY(5px);transition:opacity .35s,transform .35s;
}
.ms-step:hover .ms-desc{opacity:1;transform:translateY(0);}

/* Scroll indicator */
.scroll-indicator{
  position:absolute;bottom:.6rem;left:50%;transform:translateX(-50%);
  color:rgba(245,245,245,.35);font-size:.8rem;letter-spacing:2px;
  animation:bounce 2s infinite;z-index:10;
}
@keyframes bounce{
  0%,20%,50%,80%,100%{transform:translateX(-50%) translateY(0);}
  40%{transform:translateX(-50%) translateY(-10px);}
  60%{transform:translateX(-50%) translateY(-5px);}
}

/* ── HERO RESPONSIVE ── */
@media(max-width:1400px){
  .hero-grid{grid-template-columns: 1fr 420px 1fr;gap:0 2.5rem;padding:7rem 2rem 1.5rem;max-width:1300px;}
  .ber-wrap{width:360px;height:360px;padding-right:15px;}
  .hero-right{width:360px;min-height:360px;padding-left:15px;}
  /* r=125, center=180 — node anchor top-left = 180-43=137 */
  .bn0{top:0px;left:137px;}.bn1{top:63px;left:242px;}.bn2{top:188px;left:242px;}
  .bn3{top:251px;left:137px;}.bn4{top:188px;left:32px;}.bn5{top:63px;left:32px;}
  .ber-ring-in{width:140px;height:140px;}.ber-ring-out{width:288px;height:288px;}
}
@media(max-width:1200px){
  .hero-grid{grid-template-columns: 1fr 380px 1fr;gap:0 2rem;padding:6.5rem 1.5rem 1.5rem;max-width:1150px;}
  .ber-wrap{width:340px;height:340px;padding-right:10px;}
  .hero-right{width:340px;min-height:340px;padding-left:10px;}
  /* r=115, center=170 — node anchor top-left = 170-43=127 */
  .bn0{top:0px;left:127px;}.bn1{top:58px;left:220px;}.bn2{top:172px;left:220px;}
  .bn3{top:230px;left:127px;}.bn4{top:172px;left:34px;}.bn5{top:58px;left:34px;}
  .ber-ring-in{width:130px;height:130px;}.ber-ring-out{width:267px;height:267px;}
}
@media(max-width:1024px){
  .hero-grid{
    grid-template-columns:1fr;grid-template-rows:auto auto auto;
    gap:0 0;padding:6rem 2rem 1.5rem;min-height:auto;
  }
  .ber-wrap{grid-column:1;grid-row:1;width:100%;height:300px;max-width:320px;justify-self:center;padding-right:0;padding-left:0;}
  .hero-center{grid-column:1;grid-row:2;padding:2rem 0 1rem;}
  .hero-right{grid-column:1;grid-row:3;width:100%;min-height:auto;max-width:380px;justify-self:center;padding:0;}
  .mission-row{position:static;transform:none;width:100%;max-width:100%;bottom:auto;left:auto;margin-top:3rem;}
}
@media(max-width:768px){
  .hero-grid{grid-template-columns:1fr;padding:5.5rem 1.2rem 1.2rem;max-width:100%;}
  .ber-wrap{height:280px;max-width:280px;}
  .hero-center{padding:1.5rem 0 1rem;}
  .hero-right{max-width:100%;width:100%;padding:1.5rem 1.2rem;}
  /* r=108, center=150 */
  .bn0{top:0px;left:107px;}.bn1{top:53px;left:203px;}.bn2{top:157px;left:203px;}
  .bn3{top:210px;left:107px;}.bn4{top:157px;left:11px;}.bn5{top:53px;left:11px;}
  .ber-ring-in{width:120px;height:120px;}.ber-ring-out{width:240px;height:240px;}
}
@media(max-width:620px){
  .hero-grid{padding:5rem 1rem 1rem;}
  .ber-wrap{height:260px;max-width:260px;}
  .hero h1{font-size:clamp(3rem,8vw,5rem);}
  .hero-right{padding:1.2rem;}
  .tw-text{min-height:80px;font-size:.95rem;}
}

/* ════════════════════════════════════════
   VISION & MISSION
════════════════════════════════════════ */
.vision-mission{
  padding:8rem 4rem;position:relative;overflow:hidden;
  background:linear-gradient(to bottom,#453ec2 0%,#998fff 45%,#93b5ff 100%);
}
.vision-mission .content{
  max-width:1100px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:2rem;position:relative;z-index:1;
}
.vision-mission .section-title h2{font-size:clamp(2.2rem,5.6vw,3.8rem);}
.vision-card{
  background:#110a9c44;border:1px solid rgba(67,56,202,.2);
  border-radius:16px;padding:2.4rem;backdrop-filter:blur(20px);transition:all .4s ease;
}
.vision-card h3{font-size:1.8rem;color:#F5F5F5;margin-bottom:.8rem;}
.vision-card p,.vision-card li{color:rgba(245,245,245,.877);line-height:1.85;font-size:1.12rem;}
.vision-card ul{padding-left:1.2rem;margin-top:.6rem;display:grid;gap:.6rem;}
@media(max-width:968px){.vision-mission .content{grid-template-columns:1fr;}}
@media(max-width:768px){
  .vision-mission{padding:5rem 2rem;}
  .vision-card{padding:2rem;}
  .vision-card h3{font-size:1.5rem;}
}

/* ════════════════════════════════════════
   BRAND CAROUSEL
════════════════════════════════════════ */
.brand-banner{min-height:1100px;position:relative;overflow:hidden;}
.carousel-inner{height:1100px;}
.carousel-item{height:100%;transition:transform 1s cubic-bezier(.4,0,.2,1),opacity .8s ease-in-out;}
.carousel-item.active{opacity:1;}

.brand-slide{background:linear-gradient(135deg,#d32f2f 0%,#ff4b1f 50%,#c20c06 100%);height:100%;position:relative;overflow:hidden;}
.brand-slide-alt{background:linear-gradient(135deg,#1565c0 0%,#00acc1 50%,#26c6da 100%);}
.brand-slide-sbu{background:linear-gradient(135deg,#F9F8F6 0%,#F5F5F0 50%,#F9F8F6 100%);}
.brand-slide-green{background:linear-gradient(135deg,#360303 0%,#b81105 50%,#ad3b06 100%);}
.brand-slide-yellow{background:linear-gradient(135deg,#e2c35e 0%,#ffd54a 50%,#f5e6ac 100%);}
.brand-content{position:relative;z-index:2;}

.brand-tag{
  display:inline-block;background:rgba(255,255,255,.2);backdrop-filter:blur(10px);
  padding:8px 20px;border-radius:50px;font-weight:600;font-size:.85rem;letter-spacing:2px;
  border:2px solid rgba(255,255,255,.3);animation:fadeInDown .8s ease;
}
@keyframes fadeInDown{from{opacity:0;transform:translateY(-30px);}to{opacity:1;transform:translateY(0);}}

.brand-title{font-size:4.5rem;font-weight:900;text-shadow:4px 4px 8px rgba(0,0,0,.3);margin:20px 0;animation:fadeInLeft 1s ease;letter-spacing:3px;}
.brand-description{font-size:1.3rem;line-height:1.8;margin:20px 0;text-shadow:2px 2px 4px rgba(0,0,0,.2);animation:fadeInUp 1.2s ease;}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeInLeft{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}

.brand-logo-container{animation:zoomIn 1s ease;width:200pt;}
@keyframes zoomIn{from{opacity:0;transform:scale(.5);}to{opacity:1;transform:scale(1);}}
.brand-logo{max-width:100%;height:auto;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.4);transition:transform .3s ease;}
.brand-logo:hover{transform:scale(1.05) rotate(1deg);}

.btn-brand{
  background:rgba(255,255,255,.9);color:#d32f2f;padding:15px 40px;
  font-weight:700;font-size:1.1rem;border:none;border-radius:50px;
  box-shadow:0 8px 20px rgba(0,0,0,.2);transition:all .3s ease;
}
.btn-brand:hover{background:white;color:#000;transform:translateY(-3px);box-shadow:0 12px 30px rgba(0,0,0,.3);}
.btn-brand-alt{color:#1565c0;}.btn-brand-green{color:#d32f2f;}.btn-brand-sbu{color:#484978;}.btn-brand-yellow{color:#b8a147;}

.carousel-control-prev,.carousel-control-next{
  width:60px;height:60px;top:50%;transform:translateY(-50%);
  background:rgba(255,255,255,.25);backdrop-filter:blur(15px);
  border-radius:50%;border:2px solid rgba(255,255,255,.7);
  opacity:.95;transition:all .4s cubic-bezier(.4,0,.2,1);
  box-shadow:0 8px 20px rgba(0,0,0,.2);z-index:100;cursor:pointer;
}
.carousel-control-prev:hover,.carousel-control-next:hover{
  opacity:1;background:rgba(255,255,255,.4);transform:translateY(-50%) scale(1.1);
  box-shadow:0 12px 30px rgba(0,0,0,.3);border-color:rgba(255,255,255,.95);
}
.carousel-control-prev{left:30px;}.carousel-control-next{right:30px;}
.carousel-control-prev-icon,.carousel-control-next-icon{width:28px;height:28px;filter:drop-shadow(0 3px 6px rgba(0,0,0,.4));}
.carousel-indicators{bottom:35px;margin-bottom:0;z-index:15;}
.carousel-indicators button{
  width:12px;height:12px;border-radius:50%;border:2px solid white;
  background-color:transparent;opacity:.6;transition:all .4s ease;margin:0 6px;
}
.carousel-indicators button.active{opacity:1;background-color:white;transform:scale(1.4);box-shadow:0 0 15px rgba(255,255,255,.8);}

.chili-icon{position:absolute;font-size:5rem;opacity:.2;animation:floatChili 6s ease-in-out infinite;pointer-events:none;z-index:1;}
@keyframes floatChili{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-20px) rotate(10deg);}}
.chili-1{top:10%;left:5%;}.chili-2{top:15%;right:8%;animation-delay:2s;}
.chili-3{bottom:20%;left:10%;animation-delay:4s;}.chili-4{bottom:15%;right:12%;animation-delay:3s;}

@media(max-width:767px){
  .brand-banner,.carousel-inner{min-height:500px;height:auto;}
  .brand-title{font-size:2.5rem;}.brand-description{font-size:1rem;}
  .carousel-control-prev{left:15px;}.carousel-control-next{right:15px;}
}

/* ════════════════════════════════════════
   ACTIVITIES
════════════════════════════════════════ */
.activities{position:relative;background:#ffffff;overflow:hidden;}
.activities::before{
  content:"";position:absolute;inset:0;
  background-image:
    radial-gradient(circle at 10% 20%,rgba(99,102,241,.25) 2px,transparent 2.5px),
    radial-gradient(circle at 25% 35%,rgba(99,102,241,.18) 2px,transparent 2.5px),
    radial-gradient(circle at 40% 60%,rgba(34,197,94,.22) 2px,transparent 2.5px),
    radial-gradient(circle at 80% 30%,rgba(34,197,94,.18) 2px,transparent 2.5px),
    radial-gradient(circle at 70% 55%,rgba(99,102,241,.2) 2px,transparent 2.5px);
  background-repeat:no-repeat;z-index:0;opacity:.8;
}
.activities .container{position:relative;z-index:2;}

.activity-banner-photos{display:grid;grid-template-columns:repeat(3,1fr);height:350px;gap:0;width:100%;}
.activity-banner-photo{width:100%;height:100%;object-fit:cover;display:block;}

.activity-content-section{padding:80px 0;background:#ffffff;}
.activity-main-tag{
  background:linear-gradient(135deg,#998fff 0%,#453ec2 100%);
  color:white;padding:18px 45px;display:inline-block;margin-bottom:60px;
  box-shadow:0 6px 20px rgba(37,99,168,.3);border-radius:5px;
}
.activity-main-tag h2{font-size:2.5rem;font-weight:800;margin:0;letter-spacing:1px;text-transform:uppercase;}
.activity-item{margin-bottom:80px;position:relative;}
.activity-item:last-child{margin-bottom:0;}

.activity-image-wrapper{
  position:relative;overflow:hidden;border-radius:12px;
  box-shadow:0 10px 30px rgba(0,0,0,.15);transition:all .4s ease;
}
.activity-image-wrapper:hover{transform:translateY(-8px);box-shadow:0 15px 40px rgba(0,0,0,.25);}
.activity-image-wrapper img{width:100%;height:400px;object-fit:cover;transition:transform .4s ease;}
.activity-image-wrapper:hover img{transform:scale(1.08);}

.activity-badge{
  position:absolute;top:20px;right:20px;
  background:linear-gradient(135deg,#ff6b6b 0%,#ee5a6f 100%);
  color:white;padding:10px 25px;border-radius:30px;font-weight:700;font-size:.9rem;
  box-shadow:0 4px 15px rgba(255,107,107,.4);text-transform:uppercase;
}
.activity-content{display:flex;flex-direction:column;justify-content:center;padding:0 30px;}
.activity-date{color:#3498db;font-weight:600;font-size:1rem;margin-bottom:15px;display:flex;align-items:center;gap:8px;}
.activity-title{font-size:2.2rem;font-weight:800;color:#2c3e50;margin-bottom:20px;line-height:1.3;}
.activity-description{color:#5a6c7d;font-size:1.05rem;line-height:1.8;margin-bottom:25px;}
.activity-item:nth-child(even) .row{flex-direction:row-reverse;}

/* ─── ACTIVITY COUNTER ─── */
.activity-counter-section{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem;
  margin-bottom:80px;padding:50px 30px;
  background:linear-gradient(135deg,rgba(67,56,202,.08) 0%,rgba(108,102,232,.08) 100%);
  border-radius:20px;border:1px solid rgba(67,56,202,.15);
}
.counter-item{
  text-align:center;padding:20px;
  border-radius:16px;background:rgba(255,255,255,.6);
  border:2px solid rgba(67,56,202,.2);
  transition:all .4s cubic-bezier(.34,1.56,.64,1);
  opacity:0;animation:counterSlideUp .7s ease both;
}
.counter-item:nth-child(1){animation-delay:0.1s;}
.counter-item:nth-child(2){animation-delay:0.2s;}
.counter-item:nth-child(3){animation-delay:0.3s;}
.counter-item:nth-child(4){animation-delay:0.4s;}
.counter-item:hover{
  background:#fff;border-color:rgba(67,56,202,.5);
  transform:translateY(-12px);box-shadow:0 20px 50px rgba(67,56,202,.2);
}
.counter-number{
  font-size:clamp(3rem,8vw,4.5rem);font-weight:800;
  background:linear-gradient(135deg,#4338CA,#7c3aed);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:15px;line-height:1;display:block;
  animation:counterCount 2s ease-out both;
}
.counter-item:nth-child(1) .counter-number{animation-delay:0.1s;}
.counter-item:nth-child(2) .counter-number{animation-delay:0.2s;}
.counter-item:nth-child(3) .counter-number{animation-delay:0.3s;}
.counter-item:nth-child(4) .counter-number{animation-delay:0.4s;}
.counter-label{
  font-size:1rem;font-weight:700;color:#34495e;
  text-transform:uppercase;letter-spacing:1.5px;
  margin-bottom:10px;display:block;
}
.counter-desc{
  font-size:.85rem;color:#7a8c99;line-height:1.6;
}

@keyframes counterSlideUp{
  from{opacity:0;transform:translateY(40px) scale(0.95);}
  to{opacity:1;transform:translateY(0) scale(1);}
}

@keyframes counterCount{
  from{opacity:0;transform:scale(0.5);}
  to{opacity:1;transform:scale(1);}
}

@media(max-width:991px){
  .activity-content{padding:30px 15px 0 15px;}
  .activity-title{font-size:1.8rem;}
  .activity-item:nth-child(even) .row{flex-direction:column;}
}
@media(max-width:768px){
  .activity-banner-photos{grid-template-columns:1fr;height:auto;}
  .activity-banner-photo{height:220px;}
  .activity-main-tag{padding:15px 35px;margin-bottom:40px;}
  .activity-main-tag h2{font-size:2rem;}
  .activity-image-wrapper img{height:280px;}
}

/* ════════════════════════════════════════
   HISTORY / SEJARAH
════════════════════════════════════════ */
.history-section{
  padding:8rem 4rem;position:relative;
  background:linear-gradient(to bottom,#ffffff 0%,#f8f9ff 20%,#f0f2ff 50%,#f8f9ff 80%,#ffffff 100%);
  overflow:hidden;
}
.section-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;}
.history-section .section-canvas{opacity:.3;}
.history-section .section-title{position:relative;z-index:1;text-align:center;margin-bottom:4rem;}
.history-section .section-title h2{
  font-size:clamp(2.5rem,5vw,4rem);font-weight:700;
  background:linear-gradient(135deg,#4338CA,#5b4de8);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.history-section .section-title p{font-size:1.2rem;color:#64748b;}
.history-container{max-width:1400px;margin:0 auto;position:relative;z-index:1;}

.timeline{position:relative;padding:2rem 0;}
.timeline::before{
  content:'';position:absolute;left:50%;top:0;bottom:0;width:3px;
  background:linear-gradient(to bottom,transparent,rgba(67,56,202,.3) 10%,rgba(67,56,202,.3) 90%,transparent);
  transform:translateX(-50%);
}
.timeline-item{
  position:relative;margin-bottom:5rem;
  display:grid;grid-template-columns:1fr auto 1fr;gap:2rem;align-items:center;
  opacity:0;transform:translateY(40px);transition:opacity .8s ease,transform .8s ease;
}
.timeline-item.visible{opacity:1;transform:translateY(0);}
.timeline-item:nth-child(odd) .timeline-content:first-child{grid-column:1;text-align:right;}
.timeline-item:nth-child(odd) .timeline-date{grid-column:2;}
.timeline-item:nth-child(odd) .timeline-content:last-child{grid-column:3;visibility:hidden;opacity:0;}
.timeline-item:nth-child(even) .timeline-content:first-child{grid-column:1;visibility:hidden;opacity:0;}
.timeline-item:nth-child(even) .timeline-date{grid-column:2;}
.timeline-item:nth-child(even) .timeline-content:last-child{grid-column:3;text-align:left;}

.timeline-date{
  background:linear-gradient(135deg,#4338CA,#5b4de8);
  border:3px solid rgba(255,255,255,.9);border-radius:16px;
  padding:1.2rem 1.8rem;min-width:200px;text-align:center;
  box-shadow:0 10px 40px rgba(67,56,202,.25),0 0 0 8px rgba(67,56,202,.1);
  z-index:2;position:relative;
}
.timeline-date .day{font-size:2.5rem;font-weight:800;color:#fff;line-height:1;display:block;}
.timeline-date .month-year{font-size:1rem;font-weight:600;color:rgba(255,255,255,.95);text-transform:uppercase;letter-spacing:1.5px;margin-top:.5rem;display:block;}
.timeline-date::before,.timeline-date::after{
  content:'';position:absolute;top:50%;width:16px;height:16px;
  background:#fff;border:3px solid #4338CA;border-radius:50%;transform:translateY(-50%);
  box-shadow:0 0 0 4px rgba(67,56,202,.1);
}
.timeline-date::before{left:-38px;}.timeline-date::after{right:-38px;}

.timeline-content{
  background:#fff;border:2px solid rgba(67,56,202,.15);border-radius:20px;padding:2.5rem;
  transition:all .4s cubic-bezier(.4,0,.2,1);
  box-shadow:0 4px 20px rgba(0,0,0,.06);position:relative;overflow:hidden;
}
.timeline-content::before{
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#4338CA,#5b4de8,#7c3aed);
  transform:scaleX(0);transform-origin:left;transition:transform .4s ease;
}
.timeline-content:hover::before{transform:scaleX(1);}
.timeline-content:hover{border-color:rgba(67,56,202,.4);transform:translateY(-8px);}
.timeline-content h3{font-size:1.8rem;font-weight:700;color:#1e293b;margin-bottom:1rem;}
.timeline-content p{font-size:1.05rem;color:#475569;line-height:1.8;margin:0;}

@media(max-width:968px){
  .history-section{padding:5rem 2rem;}
  .timeline::before{left:40px;width:2px;}
  .timeline-item{grid-template-columns:auto 1fr;gap:2rem;margin-bottom:4rem;}
  .timeline-item:nth-child(odd) .timeline-content:first-child,
  .timeline-item:nth-child(even) .timeline-content:first-child{display:none;}
  .timeline-item:nth-child(odd) .timeline-date,.timeline-item:nth-child(even) .timeline-date{grid-column:1;min-width:160px;}
  .timeline-item:nth-child(odd) .timeline-content:last-child,
  .timeline-item:nth-child(even) .timeline-content:last-child{grid-column:2;visibility:visible;opacity:1;text-align:left;}
  .timeline-date::before{left:-60px;width:20px;height:20px;}.timeline-date::after{display:none;}
  .timeline-content{padding:1.8rem;}.timeline-content h3{font-size:1.4rem;}
}
@media(max-width:640px){
  .history-section{padding:4rem 1.5rem;}
  .timeline::before{left:20px;}
  .timeline-date{min-width:120px;padding:.8rem 1rem;}
  .timeline-date .day{font-size:1.5rem;}.timeline-date .month-year{font-size:.75rem;}
  .timeline-date::before{left:-40px;width:16px;height:16px;}
}

/* ════════════════════════════════════════
   CONTACT
════════════════════════════════════════ */
.contact{
  padding:8rem 4rem;
  background:linear-gradient(to bottom,#ffffff 5%,#7C3AED 50%,#212121 100%);
  position:relative;overflow:hidden;
}
.contact-container{
  max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:flex-start;
  position:relative;z-index:1;
}
.contact-info{display:flex;flex-direction:column;gap:1.5rem;}
.contact-info h3{font-size:2rem;font-weight:600;color:#414141;}
.contact-info>p{color:rgba(65,65,65,.55);font-size:.95rem;line-height:1.6;margin-bottom:1rem;}
.address-item{
  background:rgba(245,245,245,.02);border:1px solid rgba(67,56,202,.15);
  border-radius:12px;padding:1.5rem;transition:all .3s ease;
  text-decoration:none;color:inherit;display:block;
}
.address-item:hover{border-color:rgba(67,56,202,.4);transform:translateX(8px);}
.address-item h4{font-size:1.1rem;color:#fff;margin-bottom:.6rem;font-weight:600;}
.address-item p{margin:0;color:#fff;font-size:.9rem;line-height:1.5;}
.address-item .visit-link{display:inline-block;margin-top:.8rem;color:#00f7ffb9;font-weight:500;font-size:.9rem;}
.map-container{position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(67,56,202,.15);}
.map-container iframe{width:100%;height:450px;border:none;display:block;}
@media(max-width:968px){.contact-container{grid-template-columns:1fr;}}
@media(max-width:768px){.contact{padding:5rem 2rem;}}

/* ════════════════════════════════════════
   COMMON SECTION UTILITIES
════════════════════════════════════════ */
.section-title{text-align:center;margin-bottom:5rem;position:relative;z-index:1;}
.section-title h2{font-size:clamp(2rem,5vw,3.5rem);font-weight:600;letter-spacing:-.02em;margin-bottom:.8rem;color:#fff;}
.section-title p{color:#fff;font-size:1rem;}

.fade-in-up{opacity:0;transform:translateY(40px);transition:opacity 1s ease-out,transform 1s ease-out;}
.fade-in-up.show{opacity:1;transform:translateY(0);}
.fade-delay-1{transition-delay:.2s;}.fade-delay-2{transition-delay:.5s;}.fade-delay-3{transition-delay:.8s;}

/* Social links overrides for hero */
.social-links{margin-top:1.2rem;}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
footer{
  padding:3rem 4rem;text-align:center;
  border-top:1px solid rgba(67,56,202,.1);color:rgba(245,245,245,.4);
}
footer p{margin-bottom:.5rem;}
</style>
</head>
<body>


<!-- ═══════════════ HEADER ═══════════════ -->
<header id="main-header">
  <a href="#home" class="logo-link">
    <img src="img/logo/logo-RKN(biru).jpeg" alt="Logo RKN" class="logo"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div style="display:none;height:46px;align-items:center;gap:.5rem;">
      <div style="width:40px;height:40px;background:linear-gradient(135deg,#4338CA,#7C3AED);border-radius:9px;display:grid;place-items:center;font-weight:800;font-size:1.1rem;color:#f0c96e;">R</div>
      <span style="font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);">Rona Karya Nusantara</span>
    </div>
  </a>
  <button class="nav-toggle" id="nav-btn" aria-label="Buka menu navigasi" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <nav id="primary-nav">
    <ul>
      <li><a href="#home" class="active">BERANDA</a></li>
      <li><a href="#vision-mission">VISI &amp; MISI</a></li>
      <li><a href="#brands">DAFTAR BRAND</a></li>
      <li><a href="#history">SEJARAH</a></li>
      <li><a href="#activities">KEGIATAN</a></li>
      <li><a href="#contact">HUBUNGI</a></li>
    </ul>
  </nav>
</header>

<!-- ══════════════════════════════════════════
     HERO SECTION — BER COMPASS + TYPEWRITER
══════════════════════════════════════════ -->
<section class="hero" id="home">
  <div class="hero-bg"></div>
  <div class="ripple-layer">
    <span class="ripple ripple-1"></span>
    <span class="ripple ripple-2"></span>
    <span class="ripple ripple-3"></span>
    <span class="ripple ripple-4"></span>
  </div>

  <div class="hero-grid">

    <!-- ── KIRI: BER COMPASS ── -->
    <div class="ber-wrap">
      <!-- SVG web lines — center(200,200), r=148
           n0(200,52) n1(328,126) n2(328,274) n3(200,348) n4(72,274) n5(72,126) -->
      <svg class="ber-svg" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(212,168,67,0)"/>
            <stop offset="50%" stop-color="rgba(212,168,67,.42)"/>
            <stop offset="100%" stop-color="rgba(212,168,67,0)"/>
          </linearGradient>
          <radialGradient id="webFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255,255,255,.05)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </radialGradient>
        </defs>
        <!-- Spokes -->
        <line class="spoke" x1="200" y1="200" x2="200" y2="52"  stroke="url(#lg)" stroke-width="1.3"/>
        <line class="spoke" x1="200" y1="200" x2="328" y2="126" stroke="url(#lg)" stroke-width="1.3"/>
        <line class="spoke" x1="200" y1="200" x2="328" y2="274" stroke="url(#lg)" stroke-width="1.3"/>
        <line class="spoke" x1="200" y1="200" x2="200" y2="348" stroke="url(#lg)" stroke-width="1.3"/>
        <line class="spoke" x1="200" y1="200" x2="72"  y2="274" stroke="url(#lg)" stroke-width="1.3"/>
        <line class="spoke" x1="200" y1="200" x2="72"  y2="126" stroke="url(#lg)" stroke-width="1.3"/>
        <!-- Outer hex -->
        <polygon points="200,52 328,126 328,274 200,348 72,274 72,126"
          stroke="rgba(255,255,255,.07)" stroke-width="1" stroke-dasharray="5,9" fill="none"/>
        <!-- Inner hex -->
        <polygon points="200,126 264,163 264,237 200,274 136,237 136,163"
          stroke="rgba(255,255,255,.04)" stroke-width="1" stroke-dasharray="3,8" fill="none"/>
        <circle cx="200" cy="200" r="172" fill="url(#webFade)"/>
      </svg>

      <!-- Rings -->
      <div class="ber-ring ber-ring-in"></div>
      <div class="ber-ring ber-ring-out"></div>

      <!-- Core -->
      <div class="ber-core">
        <div class="core-label">BER</div>
        <div class="core-sub">Nilai Utama</div>
      </div>

      <!-- 6 Nodes -->
      <div class="ber-node bn0" data-tip="Meyakini rukun iman & orientasi akhirat" style="--nd:0s">
        <div class="bn-icon">
          <img src="img/logo/logo-beriman3.png" alt="Beriman">
        </div>
          <div class="bn-lbl">Beriman</div>
      </div>
      <div class="ber-node bn1" data-tip="Keselarasan pikiran, perkataan & perbuatan" style="--nd:.5s">
        <div class="bn-icon">
          <img src="img/logo/logo-berintegritas2.png" alt="Berintegritas">
        </div>
        <div class="bn-lbl">Berintegritas</div>
      </div>
      <div class="ber-node bn2" data-tip="Merespons segala hal dengan lapang dada" style="--nd:1s">
        <div class="bn-icon">
          <img src="img/logo/logo-berjiwabesar2.png" alt="Berjiwa Besar">
        </div>
        <div class="bn-lbl">Berjiwa Besar</div>
      </div>
      <div class="ber-node bn3" data-tip="Terus belajar, berkreasi & kembangkan karya" style="--nd:1.5s">
        <div class="bn-icon">
          <img src="img/logo/logo-berinovasi.png" alt="Berinovasi">
        </div>
        <div class="bn-lbl">Berinovasi</div>
      </div>
      <div class="ber-node bn4" data-tip="Menjalani aktivitas dengan energi penuh" style="--nd:2s">
        <div class="bn-icon">
          <img src="img/logo/logo-bersemangat.png" alt="Bersemangat">
        </div>
        <div class="bn-lbl">Bersemangat</div>
      </div>
      <div class="ber-node bn5" data-tip="Mengutamakan kepuasan konsumen & lingkungan" style="--nd:2.5s">
        <div class="bn-icon">
          <img src="img/logo/logo-berorientasi2.png" alt="Berorientasi">
        </div>
        <div class="bn-lbl">Berorientasi</div>
      </div>

      <!-- Sparks -->
      <div class="ber-sp" style="top:14%;left:55%;--sd:5.2s;--sdd:0s"></div>
      <div class="ber-sp" style="top:68%;left:26%;--sd:7s;--sdd:1.4s"></div>
      <div class="ber-sp" style="top:38%;left:82%;--sd:6s;--sdd:.7s"></div>
      <div class="ber-sp" style="top:78%;left:62%;--sd:5.5s;--sdd:2.1s"></div>
      <div class="ber-sp" style="top:22%;left:18%;--sd:8s;--sdd:3.2s"></div>
    </div><!-- /ber-wrap -->

    <!-- ── TENGAH: HERO CONTENT ── -->
    <div class="hero-center">
      <div class="hero-eyebrow">
        <span class="ey-line"></span>Dari Nusantara · Untuk Dunia<span class="ey-line"></span>
      </div>
      <h1>RKN</h1>
      <div class="hero-subtitle">RONA KARYA NUSANTARA</div>
      <p class="hero-desc">
        Kami menciptakan dan mengembangkan brand-brand inovatif yang memberikan
        dampak positif bagi masyarakat Indonesia. Setiap brand adalah karya seni
        yang dirancang dengan semangat dan dedikasi.
      </p>
      <a href="#brands" class="cta-btn">LIHAT BRAND</a>

      <!-- Social -->
      <div class="social-links" aria-label="Ikuti RKN di media sosial">
        <a class="social-link" href="https://www.youtube.com/your_channel" target="_blank" rel="noopener" aria-label="YouTube RKN">
          <svg viewBox="0 0 24 24"><path d="M23.498 6.186a2.996 2.996 0 0 0-2.107-2.12C19.88 3.5 12 3.5 12 3.5s-7.88 0-9.39.566A2.996 2.996 0 0 0 .503 6.186C0 7.705 0 12 0 12s0 4.295.503 5.814a2.996 2.996 0 0 0 2.107 2.12C4.12 20.5 12 20.5 12 20.5s7.88 0 9.39-.566a2.996 2.996 0 0 0 2.107-2.12C24 16.295 24 12 24 12s0-4.295-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a class="social-link" href="https://www.instagram.com/your_handle" target="_blank" rel="noopener" aria-label="Instagram RKN">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.347 3.608 1.322.975.975 1.26 2.242 1.322 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.347 2.633-1.322 3.608-.975.975-2.242 1.26-3.608 1.322-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.347-3.608-1.322-.975-.975-1.26-2.242-1.322-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.347-2.633 1.322-3.608.975-.975 2.242-1.26 3.608-1.322C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.78.131 4.648.403 3.678 1.372 2.709 2.341 2.437 3.473 2.378 4.745 2.319 6.025 2.306 6.434 2.306 12s.013 5.975.072 7.255c.059 1.272.331 2.404 1.3 3.373.969.969 2.101 1.241 3.373 1.3 1.28.059 1.689.072 7.255.072s5.975-.013 7.255-.072c1.272-.059 2.404-.331 3.373-1.3.969-.969 1.241-2.101 1.3-3.373.059-1.28.072-1.689.072-7.255s-.013-5.975-.072-7.255c-.059-1.272-.331-2.404-1.3-3.373C20.404.403 19.272.131 18 .072 16.719.013 16.309 0 12 0z"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z"/><circle cx="18.406" cy="5.594" r="1.44"/></svg>
        </a>
        <a class="social-link" href="https://twitter.com/your_handle" target="_blank" rel="noopener" aria-label="Twitter RKN">
          <svg viewBox="0 0 24 24"><path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723 9.993 9.993 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.149a4.822 4.822 0 0 0-.665 2.475 4.92 4.92 0 0 0 2.188 4.1 4.902 4.902 0 0 1-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.93 4.93 0 0 0 4.604 3.417A9.868 9.868 0 0 1 .96 19.54a13.94 13.94 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646a9.936 9.936 0 0 0 2.411-2.534z"/></svg>
        </a>
        <a class="social-link" href="https://www.linkedin.com/company/your_company" target="_blank" rel="noopener" aria-label="LinkedIn RKN">
          <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.85 0-2.134 1.445-2.134 2.941v5.665H9.356V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.266 2.37 4.266 5.456v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.069 0-1.144.926-2.069 2.069-2.069 1.144 0 2.069.926 2.069 2.069 0 1.144-.926 2.069-2.069 2.069zM7.119 20.452H3.554V9H7.12v11.452z"/></svg>
        </a>
      </div>
    </div><!-- /hero-center -->

    <!-- ── KANAN: TYPEWRITER ── -->
    <div class="hero-right">
      <div class="tw-label"><span>✦</span> Kata-Kata Kami</div>
      <div class="tw-text" id="tw-display"><span id="tw-cursor"></span></div>
      <div class="tw-meta">
        <div class="tw-dot" id="tw-dot"></div>
        <span id="tw-source">Visi Perusahaan</span>
      </div>
      <div class="tw-pips" id="tw-pips"></div>
    </div>


  </div><!-- /hero-grid -->
  <div class="scroll-indicator">GULIR ↓</div>
</section>

<!-- ══════════════ VISI & MISI ══════════════ -->
<section class="vision-mission" id="vision-mission">
  <div class="section-title fade-in-up fade-delay-1">
    <h2>Visi, Misi &amp; Nilai Perusahaan</h2>
    <p>Arah, tujuan, dan prinsip yang menjadi fondasi Rona Karya Nusantara</p>
  </div>
  <div class="content">
    <div class="vision-card fade-in-up fade-delay-2">
      <h3>Visi &amp; Misi</h3>
      <p><strong>Visi</strong><br>
      Menciptakan brand-brand unggul, yang bermanfaat dan menginspirasi, serta mengharumkan Nusantara hingga kancah internasional, demi meraih ridho Allah SWT.</p>
      <ul>
        <li><strong>Menciptakan</strong> brand dan produk unggul yang halal, aman, berkualitas, dan bernilai global.</li>
        <li><strong>Memberikan</strong> manfaat dan inspirasi bagi konsumen serta lingkungan.</li>
        <li><strong>Menguatkan</strong> ekosistem Nusantara melalui kolaborasi dengan mitra, supplier, dan agen.</li>
        <li><strong>Menebar</strong> kebaikan ke dunia internasional, membawa harum nama Nusantara.</li>
        <li><strong>Menjadikan</strong> setiap langkah sebagai ibadah, dengan menumbuhkan nilai spiritualitas.</li>
      </ul>
    </div>
    <div class="vision-card fade-in-up fade-delay-2">
      <h3>Nilai Perusahaan</h3>
      <p><strong>2 Pondasi (BER)</strong></p>
      <ul>
        <li><strong>Beriman</strong> — meyakini rukun iman 6 dan selalu berorientasi pada kehidupan akhirat.</li>
        <li><strong>Berintegritas</strong> — menjaga keselarasan pikiran, perkataan, dan perbuatan.</li>
      </ul>
      <p style="margin-top:1rem"><strong>4 Penguat (BER)</strong></p>
      <ul>
        <li><strong>Berjiwa Besar</strong> — menerima dan merespons segala hal dengan lapang dada.</li>
        <li><strong>Berinovasi</strong> — terus belajar, berkreasi, dan mengembangkan karya baru.</li>
        <li><strong>Bersemangat</strong> — menjalani aktivitas dengan energi penuh dan antusiasme.</li>
        <li><strong>Berorientasi</strong> — mengutamakan kepuasan konsumen &amp; lingkungan.</li>
      </ul>
    </div>
  </div>
</section>

<!-- ══════════════ BRAND CAROUSEL ══════════════ -->
<section class="brand" id="brands">
  <section class="container-fluid px-0">
    <div id="brandBanner" class="carousel slide brand-banner" data-bs-ride="carousel" data-bs-interval="5500">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#brandBanner" data-bs-slide-to="0" class="active" aria-current="true"></button>
        <button type="button" data-bs-target="#brandBanner" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#brandBanner" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#brandBanner" data-bs-slide-to="3"></button>
        <button type="button" data-bs-target="#brandBanner" data-bs-slide-to="4"></button>
      </div>
      <div class="carousel-inner">
        <!-- Slide 1 - Cik Emam -->
        <div class="carousel-item active">
          <div class="brand-slide brand-slide-alt d-flex align-items-center">
            <div class="container brand-content">
              <div class="row align-items-center gy-4">
                <div class="col-md-5 text-center brand-logo-container">
                  <img src="img/brand/logo-cikemam.jpeg" class="brand-logo" alt="Cik Emam Logo">
                </div>
                <div class="col-md-7 text-white">
                  <h1 class="brand-title">CIK EMAM</h1>
                  <span class="brand-tag">🥤 MINUMAN SEGAR</span>
                  <p class="brand-description">Minuman modern dengan rasa unik dan desain kekinian. Setiap tegukan membawa kesegaran yang memanjakan lidah.</p>
                  <button class="btn btn-brand btn-brand-alt">▶ Lihat Selengkapnya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide 2 - Bocinyoi -->
        <div class="carousel-item">
          <div class="brand-slide brand-slide-green d-flex align-items-center">
            <div class="container brand-content">
              <div class="row align-items-center gy-4">
                <div class="col-md-5 text-center brand-logo-container">
                  <img src="img/brand/logo-bocinyoi.jpeg" class="brand-logo" alt="Bocinyoi Logo">
                </div>
                <div class="col-md-7 text-white">
                  <h1 class="brand-title">BOCINYOI</h1>
                  <span class="brand-tag">🌶️ MAKANAN PEDAS</span>
                  <p class="brand-description">Sajian makanan pedas dengan bahan organik pilihan. Cocok untuk gaya hidup modern yang peduli kesehatan.</p>
                  <button class="btn btn-brand btn-brand-green">▶ Lihat Selengkapnya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide 3 - SBU -->
        <div class="carousel-item">
          <div class="brand-slide brand-slide-sbu d-flex align-items-center">
            <div class="container brand-content">
              <div class="row align-items-center gy-4">
                <div class="col-md-5 text-center brand-logo-container">
                  <img src="img/brand/logo-sbu.png" class="brand-logo" alt="SBU Logo">
                </div>
                <div class="col-md-7 text-white">
                  <h1 class="brand-title" style="color:#484978;">SBU</h1>
                  <p class="brand-description" style="color:#484978;">Sajian makanan sehat dengan bahan organik pilihan. Cocok untuk gaya hidup modern yang peduli kesehatan.</p>
                  <button class="btn btn-brand btn-brand-sbu">▶ Lihat Selengkapnya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide 4 - Nakring Seblak -->
        <div class="carousel-item">
          <div class="brand-slide d-flex align-items-center">
            <div class="chili-icon chili-1">🌶️</div>
            <div class="chili-icon chili-2">🌶️</div>
            <div class="chili-icon chili-3">🌶️</div>
            <div class="chili-icon chili-4">🌶️</div>
            <div class="container brand-content">
              <div class="row align-items-center gy-4">
                <div class="col-md-5 text-center brand-logo-container">
                  <img src="img/brand/logo-nagkringseblak.jpeg" class="brand-logo" alt="Nakring Seblak Logo">
                </div>
                <div class="col-md-7 text-white">
                  <h1 class="brand-title">Nakring Seblak</h1>
                  <span class="brand-tag">🔥 MAKANAN PEDAS</span>
                  <p class="brand-description">Brand makanan pedas dengan cita rasa ekstrem, dibuat dari bahan pilihan dan sambal khas yang menggugah selera.</p>
                  <a href="nagkring-Seblak.html"><button class="btn btn-brand">▶ Lihat Selengkapnya</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide 5 - Okipokki -->
        <div class="carousel-item">
          <div class="brand-slide brand-slide-yellow d-flex align-items-center">
            <div class="container brand-content">
              <div class="row align-items-center gy-4">
                <div class="col-md-5 text-center brand-logo-container">
                  <img src="img/brand/logo-okipokki.jpeg" class="brand-logo" alt="Okipokki Logo">
                </div>
                <div class="col-md-7 text-white">
                  <h1 class="brand-title">OKIPOKKI</h1>
                  <span class="brand-tag">🌶️ MAKANAN SEHAT</span>
                  <p class="brand-description">Sajian makanan sehat dengan bahan organik pilihan. Cocok untuk gaya hidup modern yang peduli kesehatan.</p>
                  <button class="btn btn-brand btn-brand-yellow">▶ Lihat Selengkapnya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#brandBanner" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span><span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#brandBanner" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span><span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>

  <!-- ══════════════ ACTIVITIES ══════════════ -->
  <section class="activities" id="activities">
    <div class="activity-banner-photos">
      <img src="img/banner/Office.JPG" alt="Tim Kerja Kreatif" class="activity-banner-photo">
      <img src="img/banner/TempatProduksi.JPG" alt="Kolaborasi Tim" class="activity-banner-photo">
      <img src="img/banner/StudioKonten.JPG" alt="Aktivitas Kantor" class="activity-banner-photo">
    </div>
    <div class="activity-content-section">
      <div class="container">
        <div class="text-center text-lg-start fade-in-up fade-delay-1">
          <div class="activity-main-tag"><h2>KEGIATAN</h2></div>
        </div>
        <div class="activity-counter-section">
          <div class="counter-item">
            <span class="counter-number" data-target="50+">0</span>
            <span class="counter-label">Tim Anggota</span>
            <p class="counter-desc">Profesional berdedikasi dalam ekspansi brand</p>
          </div>
          <div class="counter-item">
            <span class="counter-number" data-target="5">0</span>
            <span class="counter-label">Brand Aktif</span>
            <p class="counter-desc">Portofolio berkualitas tinggi di pasar</p>
          </div>
          <div class="counter-item">
            <span class="counter-number" data-target="50+">0</span>
            <span class="counter-label">Produk</span>
            <p class="counter-desc">Inovasi berkelanjutan untuk konsumen</p>
          </div>
          <div class="counter-item">
            <span class="counter-number" data-target="10+">0</span>
            <span class="counter-label">Provinsi</span>
            <p class="counter-desc">Jangkauan distribusi di seluruh Indonesia</p>
          </div>
        </div>
        <!-- Activity 1 -->
        <div class="activity-item fade-in-up fade-delay-2">
          <div class="row g-4 align-items-center">
            <div class="col-lg-6">
              <div class="activity-image-wrapper">
                <img src="img/kegiatan/Studio Live.JPG" alt="Studio Live Streaming">
                <div class="activity-badge">Live Studio</div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="activity-content">
                <div class="activity-date">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                  15 Januari 2026
                </div>
                <h3 class="activity-title">Studio Live Streaming</h3>
                <p class="activity-description">Dalam menghadapi era digital, kami menyediakan studio khusus yang dilengkapi dengan pencahayaan profesional dan setup produk yang menarik. Tim kreatif kami berinteraksi langsung dengan pelanggan secara interaktif dan real-time.</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Activity 2 -->
        <div class="activity-item fade-in-up fade-delay-2">
          <div class="row g-4 align-items-center">
            <div class="col-lg-6">
              <div class="activity-image-wrapper">
                <img src="img/kegiatan/Mushola.JPG" alt="Fasilitas Mushola">
                <div class="activity-badge">Sarana Ibadah</div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="activity-content">
                <div class="activity-date">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                  10 Januari 2026
                </div>
                <h3 class="activity-title">Fasilitas Mushola</h3>
                <p class="activity-description">Kesejahteraan spiritual karyawan adalah prioritas kami. Kami menyediakan fasilitas ibadah yang bersih, luas, dan tenang di dalam area perusahaan, dilengkapi perlengkapan ibadah yang tertata rapi.</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Activity 3 -->
        <div class="activity-item fade-in-up fade-delay-2">
          <div class="row g-4 align-items-center">
            <div class="col-lg-6">
              <div class="activity-image-wrapper">
                <img src="img/kegiatan/Office.JPG" alt="Ruang Kerja">
                <div class="activity-badge">Workshop</div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="activity-content">
                <div class="activity-date">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                  5 Januari 2026
                </div>
                <h3 class="activity-title">Ruang Kerja Operasional</h3>
                <p class="activity-description">Area kantor kami mengusung konsep terbuka untuk mendorong komunikasi antar tim yang lebih lancar. Setiap anggota dapat bekerja fokus namun tetap terkoneksi satu sama lain.</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Activity 4 -->
        <div class="activity-item fade-in-up fade-delay-2">
          <div class="row g-4 align-items-center">
            <div class="col-lg-6">
              <div class="activity-image-wrapper">
                <img src="img/kegiatan/Tempat Produksi.JPG" alt="Fasilitas Produksi">
                <div class="activity-badge">Ruang Produksi</div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="activity-content">
                <div class="activity-date">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                  Desember 2021
                </div>
                <h3 class="activity-title">Fasilitas Produksi yang Higienis</h3>
                <p class="activity-description">Pusat operasional kami dirancang dengan sistem manajemen stok yang rapi dan standar kebersihan ketat, memastikan kualitas produk makanan terjaga hingga ke tangan konsumen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════ SEJARAH ══════════════ -->
  <section class="history-section" id="history">
    <canvas class="section-canvas" id="history-canvas"></canvas>
    <div class="section-title">
      <h2>Sejarah Perusahaan</h2>
      <p>Perjalanan Rona Karya Nusantara dalam membangun brand Indonesia</p>
    </div>
    <div class="history-container">
      <div class="timeline" id="history-timeline">
        <div class="timeline-item">
          <div class="timeline-content"><h3>Pendirian Perusahaan</h3><p>Rona Karya Nusantara resmi didirikan dengan visi menjadi perusahaan kreatif yang menghadirkan brand lokal berkualitas tinggi. Dimulai dengan tim kecil yang penuh semangat.</p></div>
          <div class="timeline-date"><span class="day">15</span><span class="month-year">Januari 2020</span></div>
          <div class="timeline-content"><h3>Pendirian Perusahaan</h3><p>Rona Karya Nusantara resmi didirikan dengan visi menjadi perusahaan kreatif yang menghadirkan brand lokal berkualitas tinggi. Dimulai dengan tim kecil yang penuh semangat.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Peluncuran Brand Pertama</h3><p>Meluncurkan brand pertama sebagai langkah awal dalam industri kreatif Indonesia. Brand ini menjadi fondasi pengalaman kami dalam memahami pasar dan kebutuhan konsumen.</p></div>
          <div class="timeline-date"><span class="day">10</span><span class="month-year">Mei 2020</span></div>
          <div class="timeline-content"><h3>Peluncuran Brand Pertama</h3><p>Meluncurkan brand pertama sebagai langkah awal dalam industri kreatif Indonesia. Brand ini menjadi fondasi pengalaman kami dalam memahami pasar dan kebutuhan konsumen.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Ekspansi Produk – Bocinyoi</h3><p>Meluncurkan Bocinyoi, brand makanan pedas yang langsung mendapat sambutan luar biasa dari pecinta kuliner pedas di Indonesia.</p></div>
          <div class="timeline-date"><span class="day">22</span><span class="month-year">Agustus 2021</span></div>
          <div class="timeline-content"><h3>Ekspansi Produk – Bocinyoi</h3><p>Meluncurkan Bocinyoi, brand makanan pedas yang langsung mendapat sambutan luar biasa dari pecinta kuliner pedas di Indonesia.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Kolaborasi &amp; Kemitraan</h3><p>Membangun kolaborasi strategis dengan mitra bisnis dan supplier lokal untuk memperkuat rantai pasokan dan membuka peluang ekspansi ke berbagai daerah.</p></div>
          <div class="timeline-date"><span class="day">05</span><span class="month-year">Maret 2022</span></div>
          <div class="timeline-content"><h3>Kolaborasi &amp; Kemitraan</h3><p>Membangun kolaborasi strategis dengan mitra bisnis dan supplier lokal untuk memperkuat rantai pasokan dan membuka peluang ekspansi ke berbagai daerah.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Peluncuran Cikemam</h3><p>Memperkenalkan Cikemam, minuman segar dengan berbagai varian rasa inovatif yang memperluas jangkauan pasar ke segmen minuman.</p></div>
          <div class="timeline-date"><span class="day">18</span><span class="month-year">September 2022</span></div>
          <div class="timeline-content"><h3>Peluncuran Cikemam</h3><p>Memperkenalkan Cikemam, minuman segar dengan berbagai varian rasa inovatif yang memperluas jangkauan pasar ke segmen minuman.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Sertifikasi &amp; Standarisasi</h3><p>Mendapatkan sertifikasi halal dan standarisasi kualitas produk untuk memastikan semua brand memenuhi standar nasional dan internasional.</p></div>
          <div class="timeline-date"><span class="day">12</span><span class="month-year">April 2023</span></div>
          <div class="timeline-content"><h3>Sertifikasi &amp; Standarisasi</h3><p>Mendapatkan sertifikasi halal dan standarisasi kualitas produk untuk memastikan semua brand memenuhi standar nasional dan internasional.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Ekspansi Digital</h3><p>Meluncurkan platform e-commerce dan memperkuat kehadiran digital melalui berbagai marketplace dan media sosial di seluruh Indonesia.</p></div>
          <div class="timeline-date"><span class="day">08</span><span class="month-year">November 2023</span></div>
          <div class="timeline-content"><h3>Ekspansi Digital</h3><p>Meluncurkan platform e-commerce dan memperkuat kehadiran digital melalui berbagai marketplace dan media sosial di seluruh Indonesia.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Inovasi Produk Berkelanjutan</h3><p>Meluncurkan inisiatif keberlanjutan dengan menggunakan kemasan ramah lingkungan dan bahan baku lokal.</p></div>
          <div class="timeline-date"><span class="day">20</span><span class="month-year">Mei 2024</span></div>
          <div class="timeline-content"><h3>Inovasi Produk Berkelanjutan</h3><p>Meluncurkan inisiatif keberlanjutan dengan menggunakan kemasan ramah lingkungan dan bahan baku lokal.</p></div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content"><h3>Pencapaian 5 Tahun</h3><p>Merayakan 5 tahun perjalanan RKN dengan lebih dari 5 brand aktif, puluhan produk inovatif, dan ribuan konsumen setia di seluruh Indonesia.</p></div>
          <div class="timeline-date"><span class="day">15</span><span class="month-year">Januari 2025</span></div>
          <div class="timeline-content"><h3>Pencapaian 5 Tahun</h3><p>Merayakan 5 tahun perjalanan RKN dengan lebih dari 5 brand aktif, puluhan produk inovatif, dan ribuan konsumen setia di seluruh Indonesia.</p></div>
        </div>
      </div>
    </div>
  </section>

</section><!-- /brand section wrapper -->

<!-- ══════════════ CONTACT ══════════════ -->
<section class="contact" id="contact">
  <canvas id="contact-canvas" class="section-canvas"></canvas>
  <div class="contact-container">
    <div class="contact-info fade-in-up fade-delay-2">
      <h3>Kunjungi Kami</h3>
      <p>Temukan lokasi kantor RKN dan hubungi kami untuk pertanyaan atau kerja sama.</p>
      <a href="https://www.google.com/maps/place/Jl.+Pesantren+No.137" target="_blank" class="address-item">
        <h4>📍 Cimahi</h4>
        <p>Jl. Pesantren No. 137<br>Cibabat, Kec. Cimahi Utara<br>Kota Cimahi, Jawa Barat 40513<br>Indonesia</p>
        <span class="visit-link">Lihat di Google Maps →</span>
      </a>
      <a href="https://wa.me/6285771245426?text=Halo%20RKN%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Anda." target="_blank" rel="noopener" class="address-item">
        <h4>📞 Telepon</h4>
        <p>+62 857-7124-5426</p>
        <span class="visit-link">Hubungi via WhatsApp →</span>
      </a>
      <a href="mailto:info@rknusantara.com" class="address-item">
        <h4>✉️ Email</h4>
        <p>info@rknusantara.com</p>
        <span class="visit-link">Kirim Email →</span>
      </a>
    </div>
    <div class="map-container">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8!2d107.5556!3d-6.8865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e43bf0000001%3A0xabcdef1234567890!2sJl%20Pesantren%20No.%20137%2C%20Cibabat%2C%20Cimahi%20Utara%2C%20Kota%20Cimahi%2C%20Jawa%20Barat%2040513!5e0!3m2!1sid!2sid!4v1700000000000" allowfullscreen="" loading="lazy"></iframe>
    </div>
  </div>
</section>

<footer>
  <p>&copy; 2026 RKN – Rona Karya Nusantara</p>
  <p>Mengembangkan Brand Indonesia untuk Dunia</p>
</footer>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<script>
/* ══════════════════════════════════════════
   CURSOR
══════════════════════════════════════════ */
if(window.innerWidth>1024&&!('ontouchstart' in window)){
  const cur=document.querySelector('.cursor'),fol=document.querySelector('.cursor-follower');
  if(cur&&fol){
    let px=0,py=0,rfId=null;
    const trailPool=[];
    for(let i=0;i<10;i++){
      const t=document.createElement('div');t.className='cursor-trail';t.style.display='none';
      document.body.appendChild(t);trailPool.push({el:t,busy:false});
    }
    document.addEventListener('mousemove',e=>{
      px=e.clientX;py=e.clientY;
      cur.style.left=px+'px';cur.style.top=py+'px';
      fol.style.left=px+'px';fol.style.top=py+'px';
      if(!rfId&&Math.random()>.82){
        const t=trailPool.find(x=>!x.busy);
        if(t){t.busy=true;t.el.style.display='block';t.el.style.left=px+'px';t.el.style.top=py+'px';
          t.el.style.animation='none';void t.el.offsetWidth;t.el.style.animation='trailFade .8s ease-out forwards';
          setTimeout(()=>{t.busy=false;t.el.style.display='none';},800);}
      }
    },{passive:true});
    document.addEventListener('mouseover',e=>{
      if(e.target.closest('a,.ber-node,.ms-step,button')){
        cur.style.transform='translate(-50%,-50%) scale(1.8)';fol.style.transform='translate(-50%,-50%) scale(1.5)';
      }
    },true);
    document.addEventListener('mouseout',e=>{
      if(e.target.closest('a,.ber-node,.ms-step,button')){
        cur.style.transform='translate(-50%,-50%) scale(1)';fol.style.transform='translate(-50%,-50%) scale(1)';
      }
    },true);
  }
}

/* ══════════════════════════════════════════
   AUTO-HIDE HEADER
══════════════════════════════════════════ */
(function(){
  let last=0;const h=document.getElementById('main-header');
  window.addEventListener('scroll',()=>{
    const st=window.pageYOffset;
    if(st<=100){h.classList.remove('header-hidden');last=st;return;}
    if(Math.abs(st-last)>10){h.classList.toggle('header-hidden',st>last);last=st;}
  },{passive:true});
})();

/* ══════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════ */
(function(){
  const nav=document.getElementById('primary-nav'),btn=document.getElementById('nav-btn');
  if(!nav||!btn)return;
  btn.addEventListener('click',()=>{
    const o=nav.classList.toggle('open');
    btn.classList.toggle('active',o);btn.setAttribute('aria-expanded',String(o));
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');btn.classList.remove('active');btn.setAttribute('aria-expanded','false');
  }));
  window.addEventListener('resize',()=>{
    if(window.innerWidth>768){nav.classList.remove('open');btn.classList.remove('active');}
  });
})();

/* ══════════════════════════════════════════
   ACTIVE NAV
══════════════════════════════════════════ */
const navLinks=document.querySelectorAll('nav a');
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-200)cur=s.id;});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href').slice(1)===cur));
},{passive:true});

/* ══════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});

/* ══════════════════════════════════════════
   SVG SPOKE DRAW-IN
══════════════════════════════════════════ */
window.addEventListener('load',()=>{
  document.querySelectorAll('.ber-svg .spoke').forEach((l,i)=>{
    const len=l.getTotalLength?l.getTotalLength():200;
    l.style.strokeDasharray=len;l.style.strokeDashoffset=len;
    l.style.transition=`stroke-dashoffset 1.1s ${.3+i*.16}s ease`;
    requestAnimationFrame(()=>l.style.strokeDashoffset=0);
  });
});

/* ══════════════════════════════════════════
   TYPEWRITER ENGINE
══════════════════════════════════════════ */
const TW_LINES=[
  {text:"Menciptakan brand-brand unggul yang bermanfaat dan menginspirasi.",source:"Visi Perusahaan",dot:"#d4a843"},
  {text:"Setiap langkah adalah ibadah, dengan nilai spiritualitas dalam setiap karya.",source:"Misi ke-5",dot:"#a78bfa"},
  {text:"Berjiman — meyakini rukun iman dan berorientasi pada kehidupan akhirat.",source:"Nilai: Pondasi BER",dot:"#f0c96e"},
  {text:"Berintegritas — menjaga keselarasan pikiran, perkataan, dan perbuatan.",source:"Nilai: Pondasi BER",dot:"#f0c96e"},
  {text:"Menebar kebaikan ke dunia internasional, membawa harum nama Nusantara.",source:"Misi ke-4",dot:"#6ee7b7"},
  {text:"Berinovasi — terus belajar, berkreasi, dan mengembangkan karya baru.",source:"Nilai: Penguat BER",dot:"#93c5fd"},
  {text:"Mengharumkan Nusantara hingga kancah internasional, demi ridho Allah SWT.",source:"Visi Perusahaan",dot:"#d4a843"},
];
const twDisplay=document.getElementById('tw-display');
const twSource=document.getElementById('tw-source');
const twDot=document.getElementById('tw-dot');
const twPips=document.getElementById('tw-pips');
TW_LINES.forEach((_,i)=>{
  const p=document.createElement('div');
  p.className='tw-pip'+(i===0?' active':'');twPips.appendChild(p);
});
let twIdx=0,twCi=0,twDel=false,twPaused=false;
function twUpdatePips(i){twPips.querySelectorAll('.tw-pip').forEach((p,j)=>p.classList.toggle('active',j===i));}
function twTick(){
  if(twPaused){setTimeout(twTick,1400);twPaused=false;return;}
  const ln=TW_LINES[twIdx];
  if(!twDel){
    twCi++;
    twDisplay.innerHTML=ln.text.slice(0,twCi)+'<span id="tw-cursor"></span>';
    twSource.textContent=ln.source;twDot.style.background=ln.dot;
    if(twCi>=ln.text.length){twPaused=true;twDel=true;setTimeout(twTick,60);return;}
    setTimeout(twTick,36+Math.random()*20);
  } else {
    twCi--;
    twDisplay.innerHTML=ln.text.slice(0,twCi)+'<span id="tw-cursor"></span>';
    if(twCi<=0){
      twDel=false;twCi=0;twIdx=(twIdx+1)%TW_LINES.length;
      twUpdatePips(twIdx);setTimeout(twTick,380);return;
    }
    setTimeout(twTick,16);
  }
}
setTimeout(twTick,1000);

/* ══════════════════════════════════════════
   FADE-IN-UP OBSERVER
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  const els=document.querySelectorAll('.fade-in-up');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target);}});
  },{threshold:.1});
  els.forEach(el=>obs.observe(el));
});

/* ══════════════════════════════════════════
   TIMELINE SCROLL ANIMATION
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  const items=document.querySelectorAll('.timeline-item');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
    },{threshold:.15,rootMargin:'0px 0px -80px 0px'});
    items.forEach(i=>obs.observe(i));
  } else {items.forEach(i=>i.classList.add('visible'));}
});

/* ══════════════════════════════════════════
   BRAND CARDS ANIMATE
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  const cards=document.querySelectorAll('.brand-card');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver((entries,o)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const idx=Array.from(cards).indexOf(e.target);
          e.target.style.transitionDelay=(idx*.13)+'s';
          e.target.classList.add('visible');o.unobserve(e.target);
        }
      });
    },{threshold:.2});
    cards.forEach(c=>obs.observe(c));
  } else {cards.forEach((c,i)=>{c.style.transitionDelay=(i*.13)+'s';c.classList.add('visible');});}
});

/* ══════════════════════════════════════════
   THREE.JS — HISTORY CANVAS
══════════════════════════════════════════ */
window.addEventListener('load',()=>{
  try{
    const canvas=document.getElementById('history-canvas');
    const section=document.querySelector('.history-section');
    if(!canvas||!section||typeof THREE==='undefined')return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1000);
    camera.position.z=8;
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
    renderer.setSize(window.innerWidth,section.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    const geo=new THREE.BufferGeometry();
    const cnt=200,pos=new Float32Array(cnt*3);
    for(let i=0;i<cnt;i++){pos[i*3]=(Math.random()-.5)*20;pos[i*3+1]=(Math.random()-.5)*20;pos[i*3+2]=(Math.random()-.5)*10;}
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const pts=new THREE.Points(geo,new THREE.PointsMaterial({size:.05,color:0x4338CA,transparent:true,opacity:.6}));
    scene.add(pts);
    let t=0;
    (function animate(){requestAnimationFrame(animate);t+=.005;pts.rotation.y=t*.2;pts.rotation.x=Math.sin(t*.3)*.1;renderer.render(scene,camera);})();
    window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,section.offsetHeight);});
  }catch(e){console.warn('Three.js history scene failed:',e);}
});

/* ══════════════════════════════════════════
   THREE.JS — CONTACT CANVAS
══════════════════════════════════════════ */
window.addEventListener('load',()=>{
  try{
    const canvas=document.getElementById('contact-canvas');
    const section=document.querySelector('.contact');
    if(!canvas||!section||typeof THREE==='undefined')return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1000);
    camera.position.z=6;
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
    renderer.setSize(window.innerWidth,section.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    const waves=[];
    for(let i=0;i<3;i++){
      const m=new THREE.Mesh(new THREE.TorusGeometry(.8+i*.3,.02,8,32),new THREE.MeshBasicMaterial({color:0x4338CA,transparent:true,opacity:.3-i*.05}));
      m.rotation.x=Math.PI/2;waves.push(m);scene.add(m);
    }
    let t=0;
    (function animate(){requestAnimationFrame(animate);t+=.005;
      waves.forEach((w,i)=>{const s=1+Math.sin(t*2-i*.3)*.2;w.scale.set(s,s,s);w.material.opacity=.3-i*.05+Math.sin(t*2-i*.3)*.1;});
      renderer.render(scene,camera);
    })();
    window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,section.offsetHeight);});
  }catch(e){console.warn('Three.js contact scene failed:',e);}
});

/* ══════════════════════════════════════════
   BOOTSTRAP CAROUSEL
══════════════════════════════════════════ */
window.addEventListener('load',()=>{
  const carouselEl=document.querySelector('#brandBanner');
  if(!carouselEl)return;
  const bsCar=new bootstrap.Carousel(carouselEl,{interval:7000,wrap:true,touch:true});

  carouselEl.addEventListener('slide.bs.carousel',e=>{
    const els=e.relatedTarget.querySelectorAll('.brand-tag,.brand-title,.brand-description,.btn-brand,.brand-logo-container');
    els.forEach(el=>{el.style.animation='none';setTimeout(()=>el.style.animation=null,10);});
  });
  document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')bsCar.prev();else if(e.key==='ArrowRight')bsCar.next();});
  let tx=0;
  carouselEl.addEventListener('touchstart',e=>{tx=e.changedTouches[0].screenX;});
  carouselEl.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].screenX-tx;
    if(dx<-50)bsCar.next();else if(dx>50)bsCar.prev();
  });
  carouselEl.addEventListener('mouseenter',()=>bsCar.pause());
  carouselEl.addEventListener('mouseleave',()=>bsCar.cycle());
});

// counter animation from zero
document.addEventListener('DOMContentLoaded',function(){
  const counters = document.querySelectorAll('.counter-number');
  const speed = 200; // higher = slower

  // prepare counters
  counters.forEach(counter=>{
    let tgt = counter.getAttribute('data-target')||counter.textContent.trim();
    counter.setAttribute('data-target',tgt);
    counter.textContent = '0';
  });

  const runCounter = counter=>{
    const tgtText = counter.getAttribute('data-target');
    let plus = '';
    let tgt = tgtText;
    if(tgtText.endsWith('+')){plus='+';tgt=tgtText.slice(0,-1);}    
    tgt = parseInt(tgt,10);
    const current = parseInt(counter.textContent.replace('+',''),10);
    const inc = Math.ceil(tgt/speed) || 1;
    if(current < tgt){
      counter.textContent = (current+inc)+plus;
      setTimeout(()=>runCounter(counter),20);
    } else {
      counter.textContent = tgt+plus;
    }
  };

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.5});

  counters.forEach(c=>observer.observe(c));
});

</script>
</body>
</html>








































pembuatan website RKN (perusahaan) di bagian frontend dan untuk bagian desainnya dari perusahaannya

