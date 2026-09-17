const questions = [
{q:"The marketing manager _____ the monthly sales report before the meeting.",o:["review","reviews","reviewed","reviewing","has review"],a:1,e:"ประธานเอกพจน์ The marketing manager ต้องใช้ reviews."},
{q:"Please submit the application form _____ Friday afternoon.",o:["at","in","by","on","from"],a:2,e:"by ใช้ในความหมายว่าไม่เกิน/ภายในกำหนดเวลา."},
{q:"All employees are required to wear their ID badges _____ working hours.",o:["during","between","since","until","among"],a:0,e:"during + ช่วงเวลา = ระหว่างช่วงเวลานั้น."},
{q:"The conference room is currently _____, so we will use Room B instead.",o:["occupy","occupation","occupied","occupying","occupies"],a:2,e:"หลัง is ต้องใช้ adjective/past participle: occupied."},
{q:"Ms. Chen will contact you as soon as the documents _____ ready.",o:["is","are","was","be","being"],a:1,e:"documents เป็นพหูพจน์ จึงใช้ are."},
{q:"The new software allows employees _____ files more efficiently.",o:["manage","managing","to manage","managed","management"],a:2,e:"allow + someone + to + verb."},
{q:"Sales increased significantly _____ the company launched its new product.",o:["because","although","unless","while","despite"],a:0,e:"because เชื่อมเหตุผลกับประโยค."},
{q:"Customers can receive a discount if they make a purchase _____ $100.",o:["over","between","during","among","through"],a:0,e:"over $100 = มากกว่า 100 ดอลลาร์."},
{q:"The flight has been delayed _____ heavy rain at the airport.",o:["because","due to","although","despite","unless"],a:1,e:"due to + noun phrase: due to heavy rain."},
{q:"Mr. Wilson is one of the most _____ sales representatives in the company.",o:["success","successfully","successful","succeed","successes"],a:2,e:"หลัง most + adjective: successful."},
{q:"The office will remain closed _____ the electrical repairs are completed.",o:["until","during","among","beside","toward"],a:0,e:"until = จนกระทั่ง."},
{q:"Please make sure that all information is _____ before submitting the form.",o:["accurate","accuracy","accurately","accurateing","accurateness"],a:0,e:"หลัง is ต้องใช้ adjective: accurate."},
{q:"The manager asked the assistant _____ copies of the contract.",o:["make","making","made","to make","makes"],a:3,e:"ask + someone + to + verb."},
{q:"We are looking for a candidate who has experience _____ customer service.",o:["at","on","with","to","from"],a:2,e:"experience with + noun = มีประสบการณ์ด้านนั้น."},
{q:"The company plans to open a new branch _____ the end of the year.",o:["by","at","on","from","between"],a:0,e:"by the end of = ภายในสิ้นสุดช่วงเวลา."},
{q:"The instructions were written clearly, so they were easy _____.",o:["understand","understanding","to understand","understood","understands"],a:2,e:"easy + to + verb."},
{q:"If you have any questions, please _____ the customer service department.",o:["contact","contacts","contacted","contacting","to contacting"],a:0,e:"หลัง please ใช้ base verb: contact."},
{q:"The annual report provides useful information _____ the company's financial performance.",o:["about","at","between","from","onto"],a:0,e:"information about = ข้อมูลเกี่ยวกับ."},
{q:"Neither the manager nor the employees _____ available this morning.",o:["was","is","be","were","has"],a:3,e:"กริยาตามประธานที่อยู่ใกล้ที่สุด: employees → were."},
{q:"The package should arrive _____ three business days.",o:["within","between","during","since","among"],a:0,e:"within three business days = ภายใน 3 วันทำการ."}
];

let current=0, answers=Array(questions.length).fill(null), submitted=false, time=1200, interval;
const quiz=document.getElementById("quiz"), progressText=document.getElementById("progressText"), progressBar=document.getElementById("progressBar"), scorePreview=document.getElementById("scorePreview"), result=document.getElementById("result"), timer=document.getElementById("timer");

function render(){
 const x=questions[current];
 quiz.innerHTML=`<div class="question"><div class="question-type">QUESTION ${current+1} • TOEIC GRAMMAR / VOCABULARY</div><h2>${x.q}</h2><div class="options">${x.o.map((v,i)=>`<button class="option ${answers[current]===i?"selected":""}" onclick="choose(${i})"><span class="letter">${String.fromCharCode(65+i)}.</span><span>${v}</span></button>`).join("")}</div></div>`;
 progressText.textContent=`ข้อ ${current+1} / ${questions.length}`;
 progressBar.style.width=`${((current+1)/questions.length)*100}%`;
 document.getElementById("prevBtn").disabled=current===0;
 document.getElementById("nextBtn").disabled=current===questions.length-1;
 scorePreview.textContent=`ตอบแล้ว ${answers.filter(x=>x!==null).length}/${questions.length}`;
}
function choose(i){if(submitted)return;answers[current]=i;render();}
function next(){if(current<questions.length-1){current++;render();}}
function prev(){if(current>0){current--;render();}}
function submit(){
 if(answers.includes(null)){alert("กรุณาตอบให้ครบทั้ง 20 ข้อก่อนส่งคำตอบ");return;}
 submitted=true; clearInterval(interval);
 const score=answers.reduce((s,v,i)=>s+(v===questions[i].a?1:0),0);
 const pct=Math.round(score/questions.length*100);
 result.classList.remove("hidden");
 result.innerHTML=`<h2>ผลการทดสอบ</h2><div class="score">${score} / 20</div><p>คะแนนคิดเป็น ${pct}%</p><div class="review">${questions.map((q,i)=>`<div class="review-item"><b>ข้อ ${i+1}</b> — ${q.q}<br><span class="${answers[i]===q.a?"correct":"wrong"}">${answers[i]===q.a?"✓ ถูก":"✗ ผิด"} | คำตอบที่ถูก: ${String.fromCharCode(65+q.a)}. ${q.o[q.a]}</span><br><small>${q.e}</small></div>`).join("")}</div>`;
 result.scrollIntoView({behavior:"smooth"});
 document.querySelector(".nav").style.display="none";
}
function tick(){
 time--; if(time<0){time=0;submitForce();}
 const m=String(Math.floor(time/60)).padStart(2,"0"),s=String(time%60).padStart(2,"0");timer.textContent=`${m}:${s}`;
 if(time<=60) timer.style.color="#ff8a8a";
}
function submitForce(){
 if(submitted)return;
 answers=answers.map(x=>x===null?0:x);
 submitted=true; clearInterval(interval);
 const score=answers.reduce((s,v,i)=>s+(v===questions[i].a?1:0),0);
 result.classList.remove("hidden");
 result.innerHTML=`<h2>หมดเวลา</h2><div class="score">${score} / 20</div><p>ระบบส่งคำตอบที่เลือกไว้โดยอัตโนมัติ</p>`;
 document.querySelector(".nav").style.display="none";
 result.scrollIntoView({behavior:"smooth"});
}
document.getElementById("nextBtn").onclick=next;
document.getElementById("prevBtn").onclick=prev;
document.getElementById("submitBtn").onclick=submit;
render(); interval=setInterval(tick,1000);
