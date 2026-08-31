'use strict';

const STORAGE_KEYS = {
  sessions: 'fourDayLift.sessions.v1',
  history: 'fourDayLift.history.v1',
  settings: 'fourDayLift.settings.v1'
};

const LEGACY_TO_ROTATION = { monday:'a', tuesday:'b', thursday:'c', saturday:'d' };
const ROTATION = ['a','b','c','d'];

const FORM_GUIDES = {
  pecFly: guide('Pec Deck / Cable Fly','fly',['Set the handles so your upper arms start slightly behind your torso.','Keep your chest tall and shoulder blades gently set.','Bring the arms together in a smooth arc; do not turn it into a press.'],['Shoulders rolling forward','Overstretching at the back','Bending and straightening the elbows during the rep']),
  facePull: guide('Face Pull','facepull',['Set the rope around upper-chest to face height.','Pull toward your forehead while separating the rope ends.','Finish with the hands near the sides of your head and shoulder blades controlled.'],['Shrugging toward the ears','Leaning far backward','Pulling the rope toward the chest']),
  ropePressdown: guide('Rope Triceps Pressdown','pressdown',['Keep elbows close to your ribs.','Press down until the elbows are straight, then separate the rope slightly.','Return under control without letting the elbows drift forward.'],['Using bodyweight to push','Elbows flaring or traveling','Shoulders rolling forward']),
  barPushdown: guide('Cable Bar Pushdown','pressdown',['Stand tall with elbows pinned near your sides.','Press the bar down to full elbow extension.','Let the bar return only as far as you can keep the upper arms still.'],['Leaning over the bar','Elbows drifting forward','Bouncing out of the bottom']),
  overheadTri: guide('Overhead Cable Triceps Extension','overhead',['Brace your trunk and keep the upper arms aimed forward/up.','Allow a controlled elbow bend behind the head.','Extend the elbows without arching your lower back.'],['Rib flare / back arch','Upper arms moving excessively','Using too much load for the stretch']),
  latPulldown: guide('Neutral-Grip Lat Pulldown','pulldown',['Sit tall and secure the thighs under the pad.','Pull the elbows down toward your ribs while keeping the chest lifted.','Control the return until the lats are stretched without losing shoulder position.'],['Leaning far backward','Pulling behind the neck','Shrugging at the top']),
  lateralRaise: guide('Dumbbell / Cable Lateral Raise','lateral',['Keep a soft bend in the elbows.','Lead with the elbows and raise the arms to about shoulder height.','Use a controlled lowering phase.'],['Shrugging to lift the weight','Swinging from the hips','Raising far above shoulder height']),
  reversePec: guide('Reverse Pec Deck','reversefly',['Keep your chest against the pad.','Lead with the elbows as you open the arms.','Finish by drawing the shoulder blades together without shrugging.'],['Head jutting forward','Elbows dropping too low','Using momentum']),
  oneArmRow: guide('One-Arm Seated Cable Row','row',['Stay square through the torso.','Let the shoulder blade reach slightly forward at the start.','Pull the shoulder blade back first, then finish with the elbow.'],['Twisting through the torso','Shrugging the working shoulder','Yanking with the arm']),
  chestRow: guide('Chest-Supported Row','row',['Keep the chest supported and neck neutral.','Reach the shoulder blades slightly forward at the start.','Pull the shoulder blades together, then drive the elbows back.'],['Lifting the chest off the pad','Shrugging','Cutting the range short']),
  seatedRow: guide('Seated Cable Row','row',['Sit tall with a stable torso.','Initiate by pulling the shoulder blades back.','Finish with elbows about 45–60° from the torso, then return slowly.'],['Rocking backward','Shrugging','Pulling too low toward the waist']),
  pullover: guide('Straight-Arm Cable Pullover','pullover',['Use a slight hip hinge and soft elbows.','Start with the arms overhead without losing rib position.','Sweep the arms down toward the thighs while keeping the elbows nearly fixed.'],['Turning it into a triceps press','Arching the lower back','Using momentum']),
  trx: guide('TRX Posture Series — T → Y → W','trx',['Keep your body straight and straps under tension.','Move through T, then Y, then W with deliberate shoulder-blade control.','T → Y → W → return counts as one sequence; change foot position to adjust difficulty.'],['Losing body tension','Shrugging during the Y','Rushing between positions']),
  standingY: guide('Standing Cable Y Raise','yraise',['Use light low-pulley resistance and stand tall.','Raise the arms diagonally into a wide Y with thumbs generally up.','Reach upward without shrugging the shoulders toward your ears.'],['Too much weight','Rib flare / back arch','Turning it into a front raise']),
  smithIncline: guide('Smith Machine Incline Press','press',['Set the bench around 25–35° and position the bar over the upper chest.','Set shoulder blades back/down and lower the bar under control.','Press smoothly while keeping the forearms close to vertical.'],['Bar drifting toward the neck','Shoulders rolling forward','Excessive back arch']),
  smithFlat: guide('Smith Machine Flat Bench Press','press',['Position the bench so the bar tracks to the mid/lower chest.','Keep shoulder blades set and wrists stacked over forearms.','Touch lightly and press without bouncing.'],['Elbows flared straight out','Bouncing off the chest','Losing shoulder position']),
  smithClose: guide('Smith Machine Close-Grip Triceps Press','press',['Use a grip just inside your normal bench grip, not extremely narrow.','Keep elbows closer to the torso and lower toward the lower chest.','Press to full extension while maintaining wrist alignment.'],['Hands too close together','Elbows flaring aggressively','Bouncing the bar']),
  shrug: guide('Shoulder Shrug','shrug',['Stand or sit tall with arms straight.','Lift the shoulders straight toward the ears.','Pause briefly, then lower slowly to a full relaxed position.'],['Rolling the shoulders','Bending the elbows','Jutting the head forward']),
  hipSled: guide('Hip Sled','sled',['Place the feet where the knee feels stable and comfortable.','Lower only through a pain-free range; do not chase depth.','Drive smoothly and stop short of locking or grinding.'],['Deep knee bend that irritates the joint','Knees collapsing inward','Heavy grinding reps']),
  hoistSquat: guide('Hoist Squat Machine','squat',['Use light resistance and a comfortable stance.','Descend only to a knee-friendly depth with the knees tracking over the feet.','Rise smoothly while keeping several reps in reserve.'],['Chasing depth','Knees collapsing inward','Grinding repetitions']),
  rdl: guide('Romanian Deadlift / Cable Pull-Through','hinge',['Keep only a slight knee bend.','Push the hips backward while maintaining a neutral spine.','Stop when the hamstrings are loaded, then drive the hips forward.'],['Turning it into a squat','Rounding the lower back','Weight drifting far from the body']),
  dip: guide('Seated Dip Machine','dip',['Set the seat so the handles are comfortable and shoulders stay down.','Press through the handles by extending the elbows.','Return under control without letting the shoulders roll forward.'],['Shrugging','Excessively deep shoulder position','Bouncing']),
  crunch: guide('Abdominal Crunch Machine','crunch',['Set the machine so your hips and back are supported.','Exhale and bring the ribs toward the pelvis using the abdominals.','Pause briefly, then return under control.'],['Pulling mainly with the arms','Jerking the torso','Hyperextending on the return'])
};

function guide(title,type,cues,avoid){ return {title,type,cues,avoid}; }
function ex(id,name,focus,sets,reps,cue,rest,muscles=[],form=null){return{id,name,focus,sets,reps,cue,rest,muscles,form};}
function cardio(id){return{id,name:'Strider cardio',focus:'Cardio · finisher',sets:1,reps:'10–15 min',cue:'Finish with an easy-to-moderate Strider session. Keep duration and intensity flexible and skip it if the ankle is irritated.',rest:0,type:'cardio',muscles:[]};}
function crunch(id){return ex(id,'Abdominal crunch machine','Core',2,'12–20','Exhale as you crunch; keep the movement controlled rather than pulling with the arms.',60,['Core'],FORM_GUIDES.crunch);}

const WORKOUTS = [
  {id:'a',short:'A',title:'Chest, Triceps & Mid Traps',muscles:['Chest','Triceps','Traps','Shoulders'],exercises:[
    ex('machine-chest-press','Machine chest press or dumbbell bench press','Chest',3,'6–10','Use the option that lets you stay stable without uncomfortable pressure through the knee.',120,['Chest','Triceps','Shoulders']),
    ex('incline-press','Incline machine or dumbbell press','Upper chest',3,'8–12','Keep the shoulder blades set and use a controlled lowering phase.',120,['Chest','Triceps','Shoulders']),
    ex('pec-deck','Pec deck or cable fly','Chest',2,'12–15','Use a comfortable stretch; do not let the shoulders roll forward.',75,['Chest'],FORM_GUIDES.pecFly),
    ex('face-pull','Face pull','Middle traps · rear shoulders',3,'12–20','Pull toward the forehead, separate the rope ends, and avoid shrugging.',75,['Traps','Shoulders'],FORM_GUIDES.facePull),
    ex('trx-posture-a','TRX Posture Series — T → Y → W','Posture · middle/lower traps · rear shoulders',2,'6–10 sequences','Lean back with your body straight and straps under tension. Pull into a T, transition to a Y, then a W. Keep your chest up and shoulder blades controlled. T → Y → W = 1 rep. Adjust difficulty with foot position; prioritize control over resistance.',75,['Traps','Shoulders'],FORM_GUIDES.trx),
    ex('triceps-pressdown','Rope triceps pressdown','Triceps',3,'10–15','Keep the elbows near the ribs and fully straighten under control.',75,['Triceps'],FORM_GUIDES.ropePressdown),
    ex('cable-bar-pushdown','Triceps cable bar pushdown','Triceps',3,'10–15','Keep elbows pinned near your sides. Press the bar down to full extension without leaning over it.',75,['Triceps'],FORM_GUIDES.barPushdown),
    ex('overhead-triceps-a','Overhead cable triceps extension','Triceps',2,'10–15','Keep the upper arms steady and avoid arching the lower back.',75,['Triceps'],FORM_GUIDES.overheadTri),
    ex('hamstring-curl','Seated hamstring curl','KNEE · hamstrings',3,'10–15','Use a smooth range that feels comfortable at the replaced knee; stay well short of failure.',90,['Lower Body']),
    crunch('crunch-a'),
    cardio('strider-a')
  ]},
  {id:'b',short:'B',title:'Back, Biceps & Upper/Mid Traps',muscles:['Back','Biceps','Traps'],exercises:[
    ex('lat-pulldown-b','Neutral-grip lat pulldown','Lats',3,'8–12','Drive the elbows down and avoid leaning far backward.',120,['Back','Biceps'],FORM_GUIDES.latPulldown),
    ex('chest-supported-row','Chest-supported row','Middle traps · upper back',3,'8–12','Let the shoulder blades reach slightly forward, then pull them together before finishing the row.',120,['Back','Traps','Biceps'],FORM_GUIDES.chestRow),
    ex('seated-cable-row','Seated cable row','Back · middle traps',2,'10–12','Keep the torso steady and elbows roughly 45–60 degrees from the body.',105,['Back','Traps','Biceps'],FORM_GUIDES.seatedRow),
    ex('seated-shrug-b','Seated dumbbell or machine shrug','Upper traps',3,'10–15','Lift the shoulders straight toward the ears, pause, and lower slowly. Do not roll them.',90,['Traps'],FORM_GUIDES.shrug),
    ex('cable-pullover-b','Straight-arm cable pullover','Lats',3,'10–15','Keep a soft elbow bend and sweep the arms toward the thighs without turning it into a triceps press.',75,['Back'],FORM_GUIDES.pullover),
    ex('curl-b','Cable or dumbbell curl','Biceps',3,'8–12','Keep the elbows still and lower the weight under control.',75,['Biceps']),
    ex('hammer-curl-b','Hammer curl','Biceps · forearms',2,'10–15','Use a neutral grip and avoid swinging.',75,['Biceps']),
    ex('hip-sled','Hip sled','KNEE · lower body',3,'10–15','Use a comfortable range and controlled tempo. Do not chase depth or heavy loading; keep several reps in reserve.',105,['Lower Body'],FORM_GUIDES.hipSled),
    ex('hip-abduction-b','Hip-abduction machine','Lower body · outer hips',2,'12–20','Keep the pelvis steady and use a controlled range.',75,['Lower Body']),
    crunch('crunch-b'),
    cardio('strider-b')
  ]},
  {id:'c',short:'C',title:'Shoulders, Arms & Lower Traps',muscles:['Shoulders','Biceps','Triceps','Traps'],exercises:[
    ex('shoulder-press','Seated machine or dumbbell shoulder press','Shoulders',3,'6–10','Use back support and keep the ribs down.',120,['Shoulders','Triceps']),
    ex('lateral-raise','Dumbbell or cable lateral raise','Side shoulders',3,'12–20','Lead with the elbows and stop near shoulder height.',75,['Shoulders'],FORM_GUIDES.lateralRaise),
    ex('reverse-pec-deck','Reverse pec deck','Middle traps · rear shoulders',3,'12–20','Keep the chest against the pad, lead with the elbows, and avoid shrugging.',75,['Shoulders','Traps'],FORM_GUIDES.reversePec),
    ex('standing-y-raise-c','Standing cable Y raise','Lower traps',3,'10–15','Use light resistance. Reach diagonally into a Y without lifting the shoulders toward the ears.',75,['Traps','Shoulders'],FORM_GUIDES.standingY),
    ex('trx-posture-c','TRX Posture Series — T → Y → W','Posture · middle/lower traps · rear shoulders',2,'6–10 sequences','Lean back with your body straight and straps under tension. Pull into a T, transition to a Y, then a W. Keep your chest up and shoulder blades controlled. T → Y → W = 1 rep. Adjust difficulty with foot position; prioritize control over resistance.',75,['Traps','Shoulders'],FORM_GUIDES.trx),
    ex('curl-c','EZ-bar or cable curl','Biceps',3,'10–15','Keep the upper arms steady and avoid using momentum.',75,['Biceps']),
    ex('overhead-triceps-c','Overhead cable triceps extension','Triceps',3,'10–15','Use a controlled stretch and keep the upper arms fixed.',75,['Triceps'],FORM_GUIDES.overheadTri),
    ex('seated-dip-c','Seated dip machine','Triceps · chest',3,'8–12','Keep the shoulders down and press through the handles with controlled elbow extension.',90,['Triceps','Chest'],FORM_GUIDES.dip),
    ex('hoist-squat','Hoist squat machine — light','KNEE · lower body',2,'10–15','Light weight, comfortable depth, controlled tempo. Keep several repetitions in reserve and stop if the knee becomes irritated.',105,['Lower Body'],FORM_GUIDES.hoistSquat),
    ex('terminal-knee-extension','Light band terminal knee extension','KNEE · quadriceps',2,'15–20 per leg','Straighten gently, squeeze the quadriceps for one second, and use only light resistance.',60,['Lower Body']),
    crunch('crunch-c'),
    cardio('strider-c')
  ]},
  {id:'d',short:'D',title:'Upper Body & Trap Reinforcement',muscles:['Chest','Back','Shoulders','Triceps','Biceps','Traps'],exercises:[
    ex('smith-incline-d','Smith machine incline bench press','Upper chest',3,'8–12','Use a moderate incline, set the shoulder blades, and lower toward the upper chest with control.',120,['Chest','Triceps','Shoulders'],FORM_GUIDES.smithIncline),
    ex('smith-flat-d','Smith machine flat bench press','Chest',3,'8–12','Position the bench so the bar tracks comfortably to the mid/lower chest.',120,['Chest','Triceps','Shoulders'],FORM_GUIDES.smithFlat),
    ex('smith-shrug-d','Smith machine shoulder shrugs','Upper traps',3,'10–15','Move the shoulders straight up and down. Pause briefly at the top; do not roll.',90,['Traps'],FORM_GUIDES.shrug),
    ex('smith-close-d','Smith machine close-grip triceps press','Triceps · chest',3,'8–12','Use a moderately close grip, keep wrists stacked, and keep elbows closer to the torso.',105,['Triceps','Chest'],FORM_GUIDES.smithClose),
    ex('lat-pulldown-d','Neutral-grip lat pulldown','Lats',3,'8–12','Keep the chest tall and pull the elbows toward the ribs.',105,['Back','Biceps'],FORM_GUIDES.latPulldown),
    ex('one-arm-row','One-arm seated cable row','Back · middle traps',2,'10–12 per side','Keep the torso square and pull the shoulder blade back before bending the elbow fully.',90,['Back','Traps','Biceps'],FORM_GUIDES.oneArmRow),
    ex('standing-y-raise-d','Standing cable Y raise','Lower traps',2,'12–15','Keep the load light and reach into a wide Y without shrugging.',75,['Traps','Shoulders'],FORM_GUIDES.standingY),
    ex('hammer-curl-d','Hammer curl','Biceps · forearms',2,'10–15','Keep the wrists neutral and elbows quiet.',75,['Biceps']),
    ex('rdl-pullthrough','Light dumbbell Romanian deadlift or cable pull-through','KNEE · hamstrings/glutes',2,'8–12','Treat this as a hip hinge, not a squat. Use a slight knee bend and stop if balance or knee comfort is poor.',105,['Lower Body'],FORM_GUIDES.rdl),
    ex('glute-bridge-d','Glute bridge or supported hip thrust','KNEE · glutes',2,'10–15','Use only a comfortable knee bend and drive the motion from the hips.',90,['Lower Body']),
    crunch('crunch-d'),
    cardio('strider-d')
  ]}
];

const state = {
  sessions: loadJSON(STORAGE_KEYS.sessions, {}),
  history: loadJSON(STORAGE_KEYS.history, []),
  settings: {unit:'lb',sound:true,prefill:true,customByDay:{},...loadJSON(STORAGE_KEYS.settings,{})},
  selectedDay: 'a', installPrompt:null,
  timer:{preset:90,remaining:90,running:false,interval:null},
  workoutTimer:{running:false,interval:null}
};
const els={};

document.addEventListener('DOMContentLoaded',init);

function init(){
  migrateV2Data();
  state.selectedDay=getSuggestedWorkoutId();
  cacheElements(); applySavedCustomExercises(); bindNavigation(); bindGlobalActions();
  renderDayTabs(); renderWorkout(); renderHistory(); renderSettings(); renderRecommendation();
  setupInstallHandling(); registerServiceWorker();
}

function migrateV2Data(){
  let changed=false;
  const nextSessions={};
  Object.entries(state.sessions||{}).forEach(([key,s])=>{
    const mapped=LEGACY_TO_ROTATION[s?.workoutId]||s?.workoutId;
    if(mapped!==s?.workoutId){changed=true;s={...s,workoutId:mapped};}
    const prefix=s?.date||key.split(':')[0]; nextSessions[`${prefix}:${mapped}`]=s;
  });
  state.sessions=nextSessions;
  state.history=(state.history||[]).map(h=>{const mapped=LEGACY_TO_ROTATION[h.workoutId]||h.workoutId;if(mapped!==h.workoutId){changed=true;return{...h,workoutId:mapped};}return h;});
  const custom=state.settings.customByDay||{}, migrated={};
  Object.entries(custom).forEach(([id,items])=>{const mapped=LEGACY_TO_ROTATION[id]||id;migrated[mapped]=[...(migrated[mapped]||[]),...items];if(mapped!==id)changed=true;});
  state.settings.customByDay=migrated;
  if(changed){saveJSON(STORAGE_KEYS.sessions,state.sessions);saveJSON(STORAGE_KEYS.history,state.history);saveSettings();}
}

function cacheElements(){[
  'workoutView','historyView','settingsView','todayLabel','workoutHeading','dayTabs','exerciseList','progressText','progressBar','finishWorkoutButton','resetDayButton','historyList','clearHistoryButton','unitSelect','soundToggle','prefillToggle','eraseAllButton','timerDock','timerToggle','timerLabel','timerDisplay','timerReset','installButton','installDialog','installDialogContent','confirmDialog','confirmTitle','confirmMessage','confirmActionButton','exerciseTemplate','workoutTimerDisplay','workoutTimerToggle','workoutTimerFinish','notesField','addExerciseButton','addExerciseDialog','customName','customSets','customReps','customCategory','customNote','saveCustomDay','addExerciseConfirm','recommendationCard','recommendationTitle','recommendationDetail','recommendationButton','muscleStatus','formDialog','formTitle','formVisual','formCues','formAvoid'
].forEach(id=>els[id]=document.getElementById(id));}

function bindNavigation(){document.querySelectorAll('.nav-button').forEach(btn=>btn.addEventListener('click',()=>{const target=btn.dataset.view;document.querySelectorAll('.nav-button').forEach(x=>x.classList.toggle('active',x===btn));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===target));if(target==='historyView')renderHistory();window.scrollTo({top:0,behavior:'smooth'});}));}

function bindGlobalActions(){
  els.resetDayButton.addEventListener('click',()=>confirmAction('Reset this workout?','This clears today’s weights, repetitions, and completed sets for the selected workout.',resetCurrentSession));
  els.finishWorkoutButton.addEventListener('click',finishWorkout); els.workoutTimerToggle.addEventListener('click',toggleWorkoutTimer); els.workoutTimerFinish.addEventListener('click',finishWorkout);
  els.addExerciseButton.addEventListener('click',()=>els.addExerciseDialog.showModal()); els.addExerciseConfirm.addEventListener('click',addCustomExercise); els.notesField.addEventListener('input',saveNotes);
  els.recommendationButton.addEventListener('click',()=>{state.selectedDay=getSuggestedWorkoutId();renderDayTabs();renderWorkout();window.scrollTo({top:0,behavior:'smooth'});});
  els.clearHistoryButton.addEventListener('click',()=>confirmAction('Clear workout history?','Your completed workout history will be permanently removed from this device.',()=>{state.history=[];saveJSON(STORAGE_KEYS.history,state.history);renderHistory();renderRecommendation();}));
  els.eraseAllButton.addEventListener('click',()=>confirmAction('Erase all app data?','This removes all active sessions, workout history, and preferences stored on this device.',()=>{Object.values(STORAGE_KEYS).forEach(k=>localStorage.removeItem(k));state.sessions={};state.history=[];state.settings={unit:'lb',sound:true,prefill:true,customByDay:{}};state.selectedDay='a';renderDayTabs();renderWorkout();renderHistory();renderSettings();renderRecommendation();}));
  els.unitSelect.addEventListener('change',()=>{state.settings.unit=els.unitSelect.value;saveSettings();renderWorkout();});
  els.soundToggle.addEventListener('change',()=>{state.settings.sound=els.soundToggle.checked;saveSettings();}); els.prefillToggle.addEventListener('change',()=>{state.settings.prefill=els.prefillToggle.checked;saveSettings();});
  document.querySelectorAll('.timer-preset').forEach(btn=>btn.addEventListener('click',()=>setTimerPreset(Number(btn.dataset.seconds)))); els.timerToggle.addEventListener('click',toggleTimer); els.timerReset.addEventListener('click',resetTimer);
}

function applySavedCustomExercises(){const saved=state.settings.customByDay||{};WORKOUTS.forEach(w=>(saved[w.id]||[]).forEach(item=>{if(!w.exercises.some(exercise=>exercise.id===item.id))w.exercises.push(item);}));}

function renderDayTabs(){els.dayTabs.replaceChildren();WORKOUTS.forEach(w=>{const btn=document.createElement('button');btn.type='button';btn.className=`day-tab${w.id===state.selectedDay?' active':''}`;btn.innerHTML=`Workout ${w.short}<span>${w.title.split(/[,&]/)[0]}</span>`;btn.addEventListener('click',()=>{state.selectedDay=w.id;renderDayTabs();renderWorkout();window.scrollTo({top:0,behavior:'smooth'});});els.dayTabs.append(btn);});}

function renderRecommendation(){
  const suggested=getWorkout(getSuggestedWorkoutId()),last=getLastRotationWorkout();
  els.recommendationTitle.textContent=`Recommended next: Workout ${suggested.short}`;
  els.recommendationDetail.textContent=last?`Last completed: Workout ${getWorkout(last.workoutId).short} · ${formatHistoryDate(last.finishedAt)}`:'Start with Workout A, then continue A → B → C → D regardless of weekday.';
  els.recommendationButton.textContent=`Open Workout ${suggested.short}`;
  const groups=['Chest','Back','Shoulders','Biceps','Triceps','Traps','Lower Body','Core'];els.muscleStatus.replaceChildren();
  groups.forEach(group=>{const lastDate=findLastMuscleDate(group),chip=document.createElement('div');chip.className='muscle-chip';chip.innerHTML=`<strong>${group}</strong><span>${lastDate?timeAgo(lastDate):'Not logged'}</span>`;els.muscleStatus.append(chip);});
}

function getSuggestedWorkoutId(){const last=getLastRotationWorkout();if(!last)return'a';const idx=ROTATION.indexOf(LEGACY_TO_ROTATION[last.workoutId]||last.workoutId);return ROTATION[(idx+1+ROTATION.length)%ROTATION.length]||'a';}
function getLastRotationWorkout(){return(state.history||[]).find(h=>ROTATION.includes(LEGACY_TO_ROTATION[h.workoutId]||h.workoutId))||null;}
function findLastMuscleDate(group){for(const h of state.history){const groups=h.musclesTrained||inferMusclesFromHistory(h);if(groups.includes(group))return h.finishedAt||h.date;}return null;}
function inferMusclesFromHistory(h){const w=getWorkout(h.workoutId,false);return w?.muscles||[];}

function renderWorkout(){const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w);els.todayLabel.textContent=formatLongDate(new Date());els.workoutHeading.textContent=`Workout ${w.short} — ${w.title}`;els.exerciseList.replaceChildren();els.notesField.value=session.notes||'';renderWorkoutTimer();[...w.exercises,...(session.customExercises||[])].forEach((exercise,index)=>renderExerciseCard(w,session,exercise,index));updateProgress();}

function renderExerciseCard(workout,session,exercise,index){
  ensureExerciseState(session,exercise);const frag=els.exerciseTemplate.content.cloneNode(true),card=frag.querySelector('.exercise-card'),heading=frag.querySelector('.exercise-heading'),focus=frag.querySelector('.exercise-focus'),name=frag.querySelector('.exercise-name'),target=frag.querySelector('.exercise-target'),cue=frag.querySelector('.exercise-cue'),setsList=frag.querySelector('.sets-list'),weightHeading=frag.querySelector('.weight-heading'),skip=frag.querySelector('.skip-exercise'),exerciseState=session.exercises[exercise.id],body=frag.querySelector('.exercise-body');
  focus.textContent=exercise.focus;name.textContent=exercise.name;cue.textContent=exercise.cue||'';target.textContent=exercise.type==='cardio'?exercise.reps:`${exercise.sets} sets × ${exercise.reps} reps · ${formatTime(exercise.rest)} rest`;weightHeading.textContent=exercise.type==='cardio'?'Minutes':`Weight (${state.settings.unit})`;
  card.classList.toggle('skipped',!!exerciseState.skipped);skip.textContent=exerciseState.skipped?'Unskip':'Skip';skip.addEventListener('click',e=>{e.stopPropagation();exerciseState.skipped=!exerciseState.skipped;saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkout();});
  if(exercise.form){const formButton=document.createElement('button');formButton.className='form-button';formButton.type='button';formButton.textContent='FORM';formButton.addEventListener('click',e=>{e.stopPropagation();openFormGuide(exercise.form);});body.insertBefore(formButton,cue);}
  if(index===0||exerciseState.sets.some(x=>x.weight||x.reps||x.done)||exerciseState.skipped){card.classList.add('open');heading.setAttribute('aria-expanded','true');}
  heading.addEventListener('click',()=>{const open=card.classList.toggle('open');heading.setAttribute('aria-expanded',String(open));});
  exerciseState.sets.forEach((set,setIndex)=>{const row=document.createElement('div');row.className=`set-row${set.done?' done':''}`;const cardioMode=exercise.type==='cardio';row.innerHTML=`<span class="set-number">${setIndex+1}</span><input class="set-input weight-input" type="number" inputmode="decimal" min="0" step="0.5" placeholder="—" value="${escapeAttribute(set.weight)}"/><input class="set-input reps-input" type="${cardioMode?'text':'number'}" inputmode="${cardioMode?'text':'numeric'}" min="0" step="1" placeholder="${cardioMode?'intensity':'—'}" value="${escapeAttribute(set.reps)}"/><label class="done-check"><input type="checkbox" ${set.done?'checked':''}/><span></span></label>`;const wi=row.querySelector('.weight-input'),ri=row.querySelector('.reps-input'),cb=row.querySelector('input[type="checkbox"]');wi.addEventListener('input',()=>updateSet(workout,exercise,setIndex,'weight',wi.value));ri.addEventListener('input',()=>updateSet(workout,exercise,setIndex,'reps',ri.value));cb.addEventListener('change',()=>{updateSet(workout,exercise,setIndex,'done',cb.checked);row.classList.toggle('done',cb.checked);updateProgress();if(cb.checked&&exercise.rest){setTimerPreset(exercise.rest,false);startTimer();}});setsList.append(row);});
  els.exerciseList.append(frag);
}

function openFormGuide(form){els.formTitle.textContent=form.title;els.formVisual.innerHTML=buildFormVisual(form.type);els.formCues.innerHTML=form.cues.map(x=>`<li>${escapeHTML(x)}</li>`).join('');els.formAvoid.innerHTML=form.avoid.map(x=>`<li>${escapeHTML(x)}</li>`).join('');els.formDialog.showModal();}
function buildFormVisual(type){const cls=`motion-${type}`;return `<svg class="form-svg ${cls}" viewBox="0 0 320 190" role="img" aria-label="Simple animated movement cue"><line class="floor" x1="25" y1="165" x2="295" y2="165"/><circle class="head" cx="160" cy="48" r="16"/><line class="torso" x1="160" y1="64" x2="160" y2="118"/><line class="leg leg-l" x1="160" y1="118" x2="135" y2="162"/><line class="leg leg-r" x1="160" y1="118" x2="185" y2="162"/><g class="arms"><line class="arm arm-l" x1="160" y1="78" x2="112" y2="105"/><line class="arm arm-r" x1="160" y1="78" x2="208" y2="105"/><circle class="hand hand-l" cx="112" cy="105" r="5"/><circle class="hand hand-r" cx="208" cy="105" r="5"/></g><path class="motion-path" d="M110 128 Q160 65 210 128"/></svg><div class="visual-caption">Looping motion cue — use the written setup and form notes below.</div>`;}

function ensureExerciseState(session,exercise){if(!session.exercises[exercise.id])session.exercises[exercise.id]={sets:Array.from({length:exercise.sets},()=>({weight:'',reps:'',done:false})),skipped:false};else if(session.exercises[exercise.id].sets.length!==exercise.sets){const old=session.exercises[exercise.id].sets;session.exercises[exercise.id].sets=Array.from({length:exercise.sets},(_,i)=>old[i]||{weight:'',reps:'',done:false});}}
function updateSet(workout,exercise,setIndex,field,value){const session=getOrCreateSession(localDateKey(),workout);session.exercises[exercise.id].sets[setIndex][field]=value;session.updatedAt=new Date().toISOString();saveJSON(STORAGE_KEYS.sessions,state.sessions);}
function updateProgress(){const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w),all=[...w.exercises,...(session.customExercises||[])];let total=0,completed=0;all.forEach(exercise=>{ensureExerciseState(session,exercise);const d=session.exercises[exercise.id];if(d.skipped)return;total+=d.sets.length;completed+=d.sets.filter(x=>x.done).length;});els.progressText.textContent=`${completed} / ${total}`;els.progressBar.style.width=`${total?(completed/total)*100:0}%`;els.finishWorkoutButton.disabled=completed===0;els.finishWorkoutButton.textContent=completed===total&&total?'Finish completed workout':'Finish workout';}

function finishWorkout(){
  const w=getWorkout(state.selectedDay),dateKey=localDateKey(),sessionKey=`${dateKey}:${w.id}`,session=state.sessions[sessionKey];if(!session)return;const all=[...w.exercises,...(session.customExercises||[])];let completedSets=0,totalSets=0;const skipped=[],muscles=new Set();
  all.forEach(exercise=>{ensureExerciseState(session,exercise);const d=session.exercises[exercise.id];if(d.skipped){skipped.push(exercise.name);return;}totalSets+=d.sets.length;const has=d.sets.some(s=>s.done||s.weight||s.reps);completedSets+=d.sets.filter(x=>x.done).length;if(has)(exercise.muscles||categoryToMuscles(exercise.focus)).forEach(m=>muscles.add(m));});
  if(!completedSets&&!session.notes)return;stopWorkoutTimer();const duration=getWorkoutElapsed(session);state.history.unshift({id:`${Date.now()}-${w.id}`,date:dateKey,finishedAt:new Date().toISOString(),workoutId:w.id,workoutTitle:`Workout ${w.short} — ${w.title}`,completedSets,totalSets,unit:state.settings.unit,exercises:JSON.parse(JSON.stringify(session.exercises)),customExercises:session.customExercises||[],skipped,notes:session.notes||'',duration,musclesTrained:[...muscles]});state.history=state.history.slice(0,100);saveJSON(STORAGE_KEYS.history,state.history);delete state.sessions[sessionKey];saveJSON(STORAGE_KEYS.sessions,state.sessions);renderHistory();renderRecommendation();state.selectedDay=getSuggestedWorkoutId();renderDayTabs();renderWorkout();showToast(`Workout ${w.short} saved — next is Workout ${getWorkout(state.selectedDay).short}`);
}

function resetCurrentSession(){const w=getWorkout(state.selectedDay);delete state.sessions[`${localDateKey()}:${w.id}`];saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkout();}
function getOrCreateSession(dateKey,w){const key=`${dateKey}:${w.id}`;if(!state.sessions[key]){state.sessions[key]={date:dateKey,workoutId:w.id,updatedAt:new Date().toISOString(),exercises:{},customExercises:[],notes:'',timerStartedAt:null,timerElapsed:0};w.exercises.forEach(exercise=>{const previous=state.settings.prefill?findPreviousExercise(exercise.id):null;state.sessions[key].exercises[exercise.id]={sets:Array.from({length:exercise.sets},(_,i)=>({weight:previous?.sets?.[i]?.weight||previous?.sets?.[0]?.weight||'',reps:'',done:false})),skipped:false};});saveJSON(STORAGE_KEYS.sessions,state.sessions);}return state.sessions[key];}
function findPreviousExercise(id){for(const entry of state.history){if((entry.unit||'lb')===state.settings.unit&&entry.exercises?.[id])return entry.exercises[id];}return null;}

function renderHistory(){els.historyList.replaceChildren();if(!state.history.length){const e=document.createElement('div');e.className='history-empty';e.textContent='No completed workouts yet. Finish a workout and it will appear here.';els.historyList.append(e);return;}state.history.forEach(entry=>{const w=getWorkout(entry.workoutId,false),card=document.createElement('article');card.className='history-card';const summary=document.createElement('button');summary.type='button';summary.className='history-summary';summary.innerHTML=`<span><strong>${escapeHTML(entry.workoutTitle||w?.title||'Workout')}</strong><small>${formatHistoryDate(entry.finishedAt||entry.date)}</small></span><span class="history-badge">${entry.completedSets}/${entry.totalSets} sets</span>`;const details=document.createElement('div');details.className='history-details';const meta=document.createElement('p');meta.className='history-meta';meta.textContent=`Duration: ${formatDuration(entry.duration||0)}${entry.skipped?.length?' · Skipped: '+entry.skipped.length:''}`;details.append(meta);const exercises=w?[...w.exercises,...(entry.customExercises||[])]:entry.customExercises||[];exercises.forEach(exercise=>{const data=entry.exercises?.[exercise.id];if(!data)return;const completed=data.sets?.filter(set=>set.done||set.weight||set.reps)||[];if(!completed.length)return;const item=document.createElement('div');item.className='history-exercise';const text=completed.map((set,i)=>`S${i+1}: ${set.weight?set.weight+' '+(entry.unit||'lb'):'—'} × ${set.reps||'—'}`).join(' · ');item.innerHTML=`<strong>${escapeHTML(exercise.name)}</strong><small>${escapeHTML(text)}</small>`;details.append(item);});if(entry.notes){const n=document.createElement('p');n.className='history-note';n.textContent='Notes: '+entry.notes;details.append(n);}summary.addEventListener('click',()=>card.classList.toggle('open'));card.append(summary,details);els.historyList.append(card);});}

function saveNotes(){const session=getOrCreateSession(localDateKey(),getWorkout(state.selectedDay));session.notes=els.notesField.value;saveJSON(STORAGE_KEYS.sessions,state.sessions);}
function addCustomExercise(event){event.preventDefault();const name=els.customName.value.trim();if(!name)return;const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w),sets=Math.max(1,Math.min(10,Number(els.customSets.value)||3)),focus=els.customCategory.value;const item={id:`custom-${Date.now()}`,name,focus,sets,reps:els.customReps.value.trim()||'8–12',cue:els.customNote.value.trim(),rest:90,muscles:categoryToMuscles(focus),custom:true};session.customExercises.push(item);ensureExerciseState(session,item);if(els.saveCustomDay.checked){state.settings.customByDay=state.settings.customByDay||{};state.settings.customByDay[w.id]=state.settings.customByDay[w.id]||[];state.settings.customByDay[w.id].push(item);w.exercises.push(item);session.customExercises=session.customExercises.filter(x=>x.id!==item.id);saveSettings();}saveJSON(STORAGE_KEYS.sessions,state.sessions);els.customName.value='';els.customNote.value='';els.saveCustomDay.checked=false;els.addExerciseDialog.close();renderDayTabs();renderWorkout();}
function categoryToMuscles(focus){const s=(focus||'').toLowerCase(),out=[];if(s.includes('chest'))out.push('Chest');if(s.includes('back'))out.push('Back');if(s.includes('should'))out.push('Shoulders');if(s.includes('bicep'))out.push('Biceps');if(s.includes('tricep')||s.includes('arm'))out.push('Triceps');if(s.includes('trap'))out.push('Traps');if(s.includes('lower')||s.includes('leg'))out.push('Lower Body');if(s.includes('core')||s.includes('ab'))out.push('Core');return out.length?out:['Custom'];}

function renderSettings(){els.unitSelect.value=state.settings.unit;els.soundToggle.checked=!!state.settings.sound;els.prefillToggle.checked=!!state.settings.prefill;}
function saveSettings(){saveJSON(STORAGE_KEYS.settings,state.settings);}

function toggleWorkoutTimer(){const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w);if(session.timerStartedAt){session.timerElapsed=getWorkoutElapsed(session);session.timerStartedAt=null;state.workoutTimer.running=false;clearInterval(state.workoutTimer.interval);state.workoutTimer.interval=null;}else{session.timerStartedAt=Date.now();state.workoutTimer.running=true;state.workoutTimer.interval=setInterval(renderWorkoutTimer,1000);}saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkoutTimer();}
function stopWorkoutTimer(){const w=getWorkout(state.selectedDay),session=state.sessions[`${localDateKey()}:${w.id}`];if(!session)return;if(session.timerStartedAt){session.timerElapsed=getWorkoutElapsed(session);session.timerStartedAt=null;}state.workoutTimer.running=false;clearInterval(state.workoutTimer.interval);state.workoutTimer.interval=null;saveJSON(STORAGE_KEYS.sessions,state.sessions);}
function getWorkoutElapsed(session){return Math.floor((session.timerElapsed||0)+((session.timerStartedAt?Date.now()-session.timerStartedAt:0)/1000));}
function renderWorkoutTimer(){const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w),elapsed=getWorkoutElapsed(session);els.workoutTimerDisplay.textContent=formatDuration(elapsed);els.workoutTimerToggle.textContent=session.timerStartedAt?'Pause':elapsed?'Resume':'Start';if(session.timerStartedAt&&!state.workoutTimer.interval){state.workoutTimer.interval=setInterval(renderWorkoutTimer,1000);}}

function setTimerPreset(seconds,reset=true){state.timer.preset=seconds;if(reset||!state.timer.running)state.timer.remaining=seconds;document.querySelectorAll('.timer-preset').forEach(b=>b.classList.toggle('active',Number(b.dataset.seconds)===seconds));renderTimer();}
function toggleTimer(){state.timer.running?pauseTimer():startTimer();}
function startTimer(){if(state.timer.remaining<=0)state.timer.remaining=state.timer.preset;if(state.timer.running)return;state.timer.running=true;els.timerDock.classList.add('running');state.timer.interval=setInterval(()=>{state.timer.remaining-=1;if(state.timer.remaining<=0){state.timer.remaining=0;pauseTimer();if(state.settings.sound)playTone();showToast('Rest complete');}renderTimer();},1000);renderTimer();}
function pauseTimer(){state.timer.running=false;clearInterval(state.timer.interval);state.timer.interval=null;els.timerDock.classList.remove('running');renderTimer();}
function resetTimer(){pauseTimer();state.timer.remaining=state.timer.preset;renderTimer();}
function renderTimer(){els.timerDisplay.textContent=formatTime(state.timer.remaining);els.timerLabel.textContent=state.timer.running?'Resting…':'Rest timer';}
function playTone(){try{const C=window.AudioContext||window.webkitAudioContext,ctx=new C(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.frequency.value=700;gain.gain.setValueAtTime(.08,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.35);osc.start();osc.stop(ctx.currentTime+.35);}catch{}}

function setupInstallHandling(){window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.installPrompt=e;});els.installButton.addEventListener('click',async()=>{if(state.installPrompt){state.installPrompt.prompt();await state.installPrompt.userChoice;state.installPrompt=null;return;}const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);els.installDialogContent.innerHTML=ios?'<p>In Safari, tap <strong>Share</strong>, choose <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.</p>':'<p>Use your browser menu and choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p>';els.installDialog.showModal();});}
function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});}

function getWorkout(id,strict=true){const mapped=LEGACY_TO_ROTATION[id]||id,w=WORKOUTS.find(x=>x.id===mapped);if(w)return w;if(strict)return WORKOUTS[0];return null;}
function confirmAction(title,message,fn){els.confirmTitle.textContent=title;els.confirmMessage.textContent=message;const handler=()=>{if(els.confirmDialog.returnValue==='confirm')fn();els.confirmDialog.removeEventListener('close',handler);};els.confirmDialog.addEventListener('close',handler);els.confirmDialog.showModal();}
function showToast(text){let toast=document.querySelector('.toast');if(!toast){toast=document.createElement('div');toast.className='toast';document.body.append(toast);}toast.textContent=text;toast.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>toast.classList.remove('show'),2300);}
function loadJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}}
function saveJSON(key,value){localStorage.setItem(key,JSON.stringify(value));}
function localDateKey(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return`${y}-${m}-${day}`;}
function formatLongDate(d){return new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(d);}
function formatHistoryDate(v){const d=new Date(v);return Number.isNaN(d.getTime())?String(v):new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric',year:'numeric'}).format(d);}
function timeAgo(v){const d=new Date(v);if(Number.isNaN(d.getTime()))return'Logged';const days=Math.floor((Date.now()-d.getTime())/86400000);if(days<=0)return'Today';if(days===1)return'1 day ago';return`${days} days ago`;}
function formatTime(sec){sec=Math.max(0,Math.floor(sec||0));return`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;}
function formatDuration(sec){sec=Math.max(0,Math.floor(sec||0));const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`;}
function escapeHTML(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function escapeAttribute(v){return escapeHTML(v);}
