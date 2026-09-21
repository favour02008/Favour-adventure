const modal=document.getElementById('modal'),content=document.getElementById('modalContent');
function openModal(html){content.innerHTML=html;modal.classList.remove('hidden')}
function closeModal(){modal.classList.add('hidden')}
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
function practice(subject,question){openModal('<h2>📝 '+subject+'</h2><p>'+question+'</p><div class="answer"><b>Try it yourself first.</b><p>Write your answer, then use the explanation button to check the concept.</p></div><button onclick="explain(\''+subject+'\')">💡 Show explanation</button><button class="close" onclick="closeModal()">Close</button>')}
function explain(subject){openModal('<h2>💡 '+subject+' explanation</h2><p>Great practice! In the full version, Favour Study will give a step-by-step explanation, similar questions and a topic score.</p><button onclick="closeModal()">Continue</button>')}
function showPremium(){openModal('<h2>⭐ Favour Study Premium</h2><p>Unlock more practice and deeper revision tools.</p><div class="plans"><div class="plan featured"><b>⭐ Monthly</b><div class="price">GH₵15</div><p>Full question bank, AI explanations, mock exams and progress analytics.</p><button onclick="startPayment(15)">Pay with Paystack</button></div><div class="plan"><b>👑 Lifetime</b><div class="price">GH₵200</div><p>Premium access without a monthly renewal.</p><button onclick="startPayment(200)">Pay with Paystack</button></div></div><button class="close" onclick="closeModal()">Not now</button>')}
function startPayment(amount){alert('Paystack checkout will be connected after the secure Paystack backend and test key are configured. Amount: GH₵'+amount)}
function showPractice(){practice('Daily Challenge','A new WASSCE-style challenge will appear here every day.')}
