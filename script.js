const music = document.getElementById("bg-music");
let musicPlaying = false;

const quiz = [
  {question:"What is the primary long-term value of teleoperation in AI systems?",options:["Reducing hardware costs","Increasing robot speed","Capturing structured human decision data","Eliminating human labor"],answer:2},
  {question:"In a scaled teleoperation model, the human operator’s role shifts primarily from:",options:["Programmer to mechanic","Executor to supervisor","Observer to investor","Trainer to salesperson"],answer:1},
  {question:"Why is real-world teleoperation data more valuable than simulation data?",options:["It is cheaper to generate","It contains controlled variables","It captures edge-case uncertainty","It removes human bias"],answer:2},
  {question:"The key scalability advantage of teleoperation comes from:",options:["Faster motors","Cloud storage","One human supervising multiple robots","Higher bandwidth networks"],answer:2},
  {question:"What makes teleoperation a strategic moat rather than just a feature?",options:["UI design","Accumulated human correction patterns","Marketing visibility","Hardware patents"],answer:1},
  {question:"When autonomy encounters low-confidence scenarios, teleoperation acts as:",options:["A shutdown mechanism","A safety and learning layer","A latency booster","A data deletion tool"],answer:1},
  {question:"The feedback loop in teleoperation can best be described as:",options:["Robot → Error → Shutdown","Deployment → Intervention → Learning → Redeployment","Human → Robot → Replacement","Model → Freeze → Release"],answer:1},
  {question:"Why does scaling fleets increase the importance of teleoperation?",options:["More robots reduce AI accuracy","Environmental variability increases","Humans prefer remote work","Hardware degrades faster"],answer:1},
  {question:"Teleoperation reduces long-term intervention by:",options:["Increasing human workload","Randomizing responses","Structuring corrective data into learning signals","Slowing robot deployment"],answer:2},
  {question:"In regulated industries, teleoperation improves adoption by providing:",options:["Full autonomy immediately","Logged human accountability","Faster robot speeds","Reduced compliance standards"],answer:1},
  {question:"The economic leverage of teleoperation at scale is created when:",options:["Every robot has its own operator","Human oversight becomes rare but strategic","Robots stop collecting data","Operators control every movement"],answer:1},
  {question:"What is the biggest misconception about teleoperation?",options:["It requires internet","It slows autonomy","It is temporary support rather than infrastructure","It uses cameras"],answer:2},
  {question:"Why are edge cases critical in teleoperation learning?",options:["They are common events","They are easy to simulate","They expose model weaknesses","They reduce hardware lifespan"],answer:2},
  {question:"A mature teleoperation platform strengthens over time primarily because:",options:["Hardware gets replaced","Intervention frequency increases","Learning loops compound","UI becomes simpler"],answer:2},
  {question:"The ultimate transformation enabled by teleoperation is:",options:["Manual robotics","Fully remote work culture","Human judgment scaling across systems","Faster hardware cycles"],answer:2}
];

let current=0;
let selected=new Array(quiz.length).fill(null);
let score=0;
let timer;
let timeLeft=15;

function startQuiz(){
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  if(!musicPlaying){
    music.volume=0.5;
    music.play();
    musicPlaying=true;
  }

  loadQuestion();
}

function toggleMusic(){
  if(music.paused) music.play();
  else music.pause();
}

function changeVolume(val){
  music.volume=val;
}

function loadQuestion(){
  const q=quiz[current];

  document.getElementById("question-number").innerText=
    `Question ${current+1} / ${quiz.length}`;

  document.getElementById("question").innerText=q.question;

  document.getElementById("progress-bar").style.width=
    (current/quiz.length)*100+"%";

  const answers=document.getElementById("answers");
  answers.innerHTML="";

  q.options.forEach((opt,i)=>{
    const btn=document.createElement("button");
    btn.innerText=opt;
    btn.onclick=()=>selectAnswer(i);

    if(selected[current]===i){
      btn.style.background="#00ffcc";
      btn.style.color="black";
    }

    answers.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(i){
  selected[current]=i;
  loadQuestion();
}

function nextQuestion(){
  if(selected[current]===null){
    alert("Select an answer first");
    return;
  }

  if(current<quiz.length-1){
    current++;
    loadQuestion();
  }else{
    calculateScore();
    showResult();
  }
}

function prevQuestion(){
  if(current>0){
    current--;
    loadQuestion();
  }
}

function calculateScore(){
  score=0;
  quiz.forEach((q,i)=>{
    if(selected[i]===q.answer) score++;
  });
}

function showResult(){
  clearInterval(timer);
  music.pause();

  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("final-score").innerText=score;

  let grade="";
  if(score>=13){ grade="🏆 Elite Teleoperation Strategist"; launchConfetti(); }
  else if(score>=9){ grade="⚡ Strategic Thinker"; }
  else{ grade="📘 Developing Intelligence"; }

  document.getElementById("grade").innerText=grade;
}

function resetQuiz(){
  current=0;
  selected=new Array(quiz.length).fill(null);
  score=0;
  loadQuestion();
}

function restart(){
  location.reload();
}

function startTimer(){
  timeLeft=15;
  document.getElementById("timer").innerText="Time: "+timeLeft;

  clearInterval(timer);
  timer=setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText="Time: "+timeLeft;
    if(timeLeft<=0){
      clearInterval(timer);
      nextQuestion();
    }
  },1000);
}

function launchConfetti(){
  const canvas=document.getElementById("confetti-canvas");
  const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  let pieces=[];
  for(let i=0;i<150;i++){
    pieces.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height-canvas.height,
      size:Math.random()*6+4,
      speed:Math.random()*3+2
    });
  }

  function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.y+=p.speed;
      if(p.y>canvas.height) p.y=-10;
      ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
      ctx.fillRect(p.x,p.y,p.size,p.size);
    });
    requestAnimationFrame(update);
  }
  update();
}

// Particle Background
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    radius:Math.random()*2,
    speed:Math.random()*1
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(0,255,255,0.5)";
  particles.forEach(p=>{
    p.y+=p.speed;
    if(p.y>canvas.height) p.y=0;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
