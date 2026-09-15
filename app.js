'use strict';

const STORAGE_KEYS = {
  sessions: 'fourDayLift.sessions.v1',
  history: 'fourDayLift.history.v1',
  settings: 'fourDayLift.settings.v1'
};

const LEGACY_TO_ROTATION = { monday:'a1', tuesday:'b1', thursday:'c1', saturday:'d1', a:'a1', b:'b1', c:'c1', d:'d1' };
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
  crunch: guide('Abdominal Crunch Machine','crunch',['Set the machine so your hips and back are supported.','Exhale and bring the ribs toward the pelvis using the abdominals.','Pause briefly, then return under control.'],['Pulling mainly with the arms','Jerking the torso','Hyperextending on the return']),
  dumbbellBenchRow: guide('One-Arm Dumbbell Bench Row','dbrow',['Support yourself with one hand and the same-side knee or a staggered stance at the bench; choose the setup that keeps your neck and lower body comfortable.','Keep your shoulders approximately level, neck in line with the spine, and torso quiet.','Pull the elbow toward your hip; stop when the shoulder blade is fully back rather than twisting to lift the dumbbell higher.'],['Rotating the torso to gain range','Shrugging the working shoulder toward the ear','Looking up or craning the neck','Letting the shoulder roll forward under load']),
  dragCurl: guide('Barbell or Cable Drag Curl','dragcurl',['Stand tall with ribs stacked and shoulders relaxed.','Drag the bar or cable close to the torso while allowing the elbows to travel slightly behind you.','Squeeze the biceps without shrugging, then lower slowly along the same path.'],['Leaning backward','Shoulders rolling forward or shrugging','Letting the bar drift away from the body','Using momentum from the hips'])
};

function guide(title,type,cues,avoid){ return {title,type,cues,avoid}; }
function ex(id,name,focus,sets,reps,cue,rest,muscles=[],form=null){return{id,name,focus,sets,reps,cue,rest,muscles,form};}
function cardio(id){return{id,name:'Strider cardio',focus:'Cardio · finisher',sets:1,reps:'10–15 min',cue:'Finish with an easy-to-moderate Strider session. Keep duration and intensity flexible and skip it if the ankle is irritated.',rest:0,type:'cardio',muscles:[]};}
function crunch(id){return ex(id,'Abdominal crunch machine','Core',2,'12–20','Exhale as you crunch; keep the movement controlled rather than pulling with the arms.',60,['Core'],FORM_GUIDES.crunch);}

const WORKOUTS = [
  {id:'a1',base:'a',variant:1,short:'A1',title:'Chest & Triceps — Press / Fly',muscles:['Chest','Triceps','Traps','Shoulders'],exercises:[
    ex('machine-chest-press','Machine chest press or dumbbell bench press','Chest thickness',2,'6–10','Set the shoulder blades and press through a comfortable, pain-free range.',120,['Chest','Triceps','Shoulders']),
    ex('incline-press','Slight-incline machine or dumbbell press','Upper chest',2,'8–12','Use a modest incline; keep the shoulder blades set and neck neutral.',120,['Chest','Triceps','Shoulders']),
    ex('pec-deck','Pec deck or cable fly','Chest',2,'10–15','Use a comfortable stretch; stop before the shoulders roll forward.',75,['Chest'],FORM_GUIDES.pecFly),
    ex('high-low-fly-a1','High-to-low cable fly','Lower chest',2,'10–15','Bring the handles down and inward toward the lower chest/upper abdomen without rolling the shoulders forward.',75,['Chest'],FORM_GUIDES.pecFly),
    ex('face-pull','Face pull','Mid traps · rear shoulders',2,'12–20','Pull toward the forehead, separate the rope ends, and avoid shrugging.',75,['Traps','Shoulders'],FORM_GUIDES.facePull),
    ex('triceps-pressdown','Rope triceps pressdown','Triceps',2,'10–15','Keep the elbows near the ribs and fully straighten under control.',75,['Triceps'],FORM_GUIDES.ropePressdown),
    ex('overhead-triceps-a','Overhead cable triceps extension','Triceps',2,'10–15','Keep the upper arms steady and avoid arching the lower back.',75,['Triceps'],FORM_GUIDES.overheadTri),
    ex('hamstring-curl','Seated hamstring curl','KNEE · hamstrings',2,'10–15','Use a smooth comfortable range and stay short of grinding reps.',90,['Lower Body']),
    crunch('crunch-a1'), cardio('strider-a1')
  ]},
  {id:'a2',base:'a',variant:2,short:'A2',title:'Chest & Triceps — Alternate',muscles:['Chest','Triceps','Traps','Shoulders'],exercises:[
    ex('flat-db-press-a2','Flat dumbbell or machine press','Chest thickness',2,'8–12','Use a neutral-to-comfortable grip and keep shoulder blades supported.',120,['Chest','Triceps','Shoulders']),
    ex('low-incline-db-a2','Low-incline dumbbell press','Chest',2,'8–12','Keep the incline low and use only the shoulder range that feels stable.',120,['Chest','Triceps','Shoulders']),
    ex('high-low-fly-a2','High-to-low cable fly','Lower chest',2,'10–15','Sweep down and inward with a soft elbow bend; do not chase an excessive stretch.',75,['Chest'],FORM_GUIDES.pecFly),
    ex('trx-posture-a2','TRX Posture Series — T → Y → W','Posture · traps · rear shoulders',2,'6–10 sequences','Keep the body straight and move deliberately through T, Y and W.',75,['Traps','Shoulders'],FORM_GUIDES.trx),
    ex('cable-bar-pushdown','Triceps cable bar pushdown','Triceps',2,'10–15','Keep elbows pinned near your sides and press to full extension.',75,['Triceps'],FORM_GUIDES.barPushdown),
    ex('seated-dip-a2','Seated dip machine','Triceps · lower chest',2,'8–12','Set the seat so the shoulders stay comfortable; avoid an excessively deep return.',90,['Triceps','Chest'],FORM_GUIDES.dip),
    ex('hamstring-curl-a2','Seated hamstring curl','KNEE · hamstrings',2,'10–15','Use a smooth comfortable range and stay short of grinding reps.',90,['Lower Body']),
    crunch('crunch-a2'), cardio('strider-a2')
  ]},
  {id:'b1',base:'b',variant:1,short:'B1',title:'Back & Biceps — Row Thickness',muscles:['Back','Biceps','Traps'],exercises:[
    ex('chest-supported-row','Chest-supported row','Back thickness',2,'8–12','Keep chest supported and neck neutral; pull shoulder blades together before finishing with the elbows.',120,['Back','Traps','Biceps'],FORM_GUIDES.chestRow),
    ex('one-arm-dumbbell-bench-row-b','One-arm dumbbell bench row','Back thickness',2,'8–12 per side','Keep shoulders level and pull the elbow toward the hip without rotating the torso.',105,['Back','Traps','Biceps'],FORM_GUIDES.dumbbellBenchRow),
    ex('seated-cable-row','Seated cable row','Back thickness',2,'10–12','Keep the torso steady and elbows roughly 45–60 degrees from the body.',105,['Back','Traps','Biceps'],FORM_GUIDES.seatedRow),
    ex('lat-pulldown-b','Neutral-grip lat pulldown','Lats',2,'8–12','Drive elbows down and avoid leaning far backward.',120,['Back','Biceps'],FORM_GUIDES.latPulldown),
    ex('cable-pullover-b','Straight-arm cable pullover','Lats',2,'10–15','Sweep the arms toward the thighs with a soft, nearly fixed elbow bend.',75,['Back'],FORM_GUIDES.pullover),
    ex('drag-curl-b','Barbell or cable drag curl','Biceps',2,'8–12','Keep the bar/cable close and avoid leaning back.',75,['Biceps'],FORM_GUIDES.dragCurl),
    ex('seated-shrug-b','Seated dumbbell or machine shrug','Upper traps',2,'10–15','Lift straight up and down; do not roll the shoulders.',90,['Traps'],FORM_GUIDES.shrug),
    ex('hip-sled','Hip sled','KNEE · lower body',2,'10–15','Use a comfortable range, controlled tempo and stable foot position.',105,['Lower Body'],FORM_GUIDES.hipSled),
    crunch('crunch-b1'), cardio('strider-b1')
  ]},
  {id:'b2',base:'b',variant:2,short:'B2',title:'Back & Biceps — Alternate Rows',muscles:['Back','Biceps','Traps'],exercises:[
    ex('machine-row-b2','Machine row','Back thickness',2,'8–12','Keep the chest tall or supported and pull without shrugging.',120,['Back','Traps','Biceps'],FORM_GUIDES.chestRow),
    ex('one-arm-row-b2','One-arm seated cable row','Back thickness',2,'10–12 per side','Stay square and pull the shoulder blade back before finishing with the elbow.',90,['Back','Traps','Biceps'],FORM_GUIDES.oneArmRow),
    ex('wide-cable-row-b2','Wide-grip seated cable row','Upper/mid back thickness',2,'10–12','Pull toward the lower chest with elbows out comfortably; keep the neck neutral.',105,['Back','Traps','Biceps'],FORM_GUIDES.seatedRow),
    ex('neutral-pulldown-b2','Neutral-grip lat pulldown','Lats',2,'8–12','Pull elbows toward ribs without turning it into a backward lean.',105,['Back','Biceps'],FORM_GUIDES.latPulldown),
    ex('straight-arm-pulldown-b2','Straight-arm cable pulldown','Lats',2,'10–15','Keep ribs stacked and elbows softly bent.',75,['Back'],FORM_GUIDES.pullover),
    ex('hammer-curl-b2','Hammer curl','Biceps · forearms',2,'10–15','Use a neutral grip and avoid swinging.',75,['Biceps']),
    ex('cable-shrug-b2','Cable or machine shrug','Upper traps',2,'10–15','Move shoulders straight up and down with the head neutral.',90,['Traps'],FORM_GUIDES.shrug),
    ex('hip-abduction-b2','Hip-abduction machine','Lower body · outer hips',2,'12–20','Keep the pelvis steady and use a controlled range.',75,['Lower Body']),
    crunch('crunch-b2'), cardio('strider-b2')
  ]},
  {id:'c1',base:'c',variant:1,short:'C1',title:'Shoulders & Arms — Stability',muscles:['Shoulders','Biceps','Triceps','Traps'],exercises:[
    ex('shoulder-press','Seated machine or dumbbell shoulder press','Shoulders',2,'6–10','Use back support, ribs down and only a comfortable shoulder range.',120,['Shoulders','Triceps']),
    ex('lateral-raise','Dumbbell or cable lateral raise','Side shoulders',2,'12–20','Lead with elbows and stop near shoulder height or earlier if needed.',75,['Shoulders'],FORM_GUIDES.lateralRaise),
    ex('reverse-pec-deck','Reverse pec deck','Rear shoulders · mid traps',2,'12–20','Keep chest against pad, lead with elbows and avoid shrugging.',75,['Shoulders','Traps'],FORM_GUIDES.reversePec),
    ex('standing-y-raise-c','Standing cable Y raise','Lower traps',2,'10–15','Use light resistance and reach into a Y without shrugging.',75,['Traps','Shoulders'],FORM_GUIDES.standingY),
    ex('machine-lateral-c1','Machine lateral raise','Side shoulders',2,'10–15','Use a controlled range and stop before the shoulders begin to shrug.',75,['Shoulders'],FORM_GUIDES.lateralRaise),
    ex('curl-c','EZ-bar or cable curl','Biceps',2,'10–15','Keep upper arms steady and avoid momentum.',75,['Biceps']),
    ex('overhead-triceps-c','Overhead cable triceps extension','Triceps',2,'10–15','Use a controlled stretch and keep upper arms fixed.',75,['Triceps'],FORM_GUIDES.overheadTri),
    ex('seated-dip-c','Seated dip machine','Triceps · chest',2,'8–12','Keep shoulders down and avoid a deep shoulder stretch.',90,['Triceps','Chest'],FORM_GUIDES.dip),
    ex('hoist-squat','Hoist squat machine — light','KNEE · lower body',2,'10–15','Light weight, comfortable depth, controlled tempo.',105,['Lower Body'],FORM_GUIDES.hoistSquat),
    ex('single-leg-kickback-c','Single-leg kickback machine','Glutes · lower body',2,'10–15 per leg','Keep the pelvis square and move from the hip without arching the back.',75,['Lower Body']),
    crunch('crunch-c1'), cardio('strider-c1')
  ]},
  {id:'c2',base:'c',variant:2,short:'C2',title:'Shoulders & Arms — Alternate',muscles:['Shoulders','Biceps','Triceps','Traps'],exercises:[
    ex('neutral-machine-press-c2','Neutral-grip machine shoulder press','Shoulders',2,'8–12','Use back support and a neutral grip; stop short of any unstable or pinching range.',105,['Shoulders','Triceps']),
    ex('cable-lateral-c2','Cable lateral raise','Side shoulders',2,'10–15','Lead with the elbow and keep the shoulder down.',75,['Shoulders'],FORM_GUIDES.lateralRaise),
    ex('rear-delt-cable-c2','Cable rear-delt fly','Rear shoulders · mid traps',2,'12–15','Use light resistance and keep the neck neutral.',75,['Shoulders','Traps'],FORM_GUIDES.reversePec),
    ex('face-pull-c2','Face pull','Rear shoulders · mid traps',2,'12–20','Pull toward forehead and rotate hands apart without forcing range.',75,['Shoulders','Traps'],FORM_GUIDES.facePull),
    ex('standing-y-c2','Standing cable Y raise','Lower traps',2,'10–15','Keep load light and ribs stacked.',75,['Traps','Shoulders'],FORM_GUIDES.standingY),
    ex('drag-curl-c2','Barbell or cable drag curl','Biceps',2,'8–12','Keep bar/cable close and shoulders relaxed.',75,['Biceps'],FORM_GUIDES.dragCurl),
    ex('rope-pressdown-c2','Rope triceps pressdown','Triceps',2,'10–15','Keep elbows near ribs and shoulders down.',75,['Triceps'],FORM_GUIDES.ropePressdown),
    ex('single-leg-kickback-c2','Single-leg kickback machine','Glutes · lower body',2,'10–15 per leg','Keep pelvis square and move from the hip.',75,['Lower Body']),
    crunch('crunch-c2'), cardio('strider-c2')
  ]},
  {id:'d1',base:'d',variant:1,short:'D1',title:'Smith Day — Chest / Back Thickness',muscles:['Chest','Back','Shoulders','Triceps','Biceps','Traps'],exercises:[
    ex('smith-incline-d','Smith machine incline bench press','Upper chest',2,'8–12','Use a moderate incline and keep shoulder blades set.',120,['Chest','Triceps','Shoulders'],FORM_GUIDES.smithIncline),
    ex('smith-flat-d','Smith machine flat bench press','Chest thickness',2,'8–12','Track to mid/lower chest with shoulders supported.',120,['Chest','Triceps','Shoulders'],FORM_GUIDES.smithFlat),
    ex('smith-shrug-d','Smith machine shoulder shrugs','Upper traps',2,'10–15','Move shoulders straight up and down; keep head neutral.',90,['Traps'],FORM_GUIDES.shrug),
    ex('smith-close-d','Smith machine close-grip triceps press','Triceps · chest',2,'8–12','Use a moderately close grip and keep wrists stacked.',105,['Triceps','Chest'],FORM_GUIDES.smithClose),
    ex('lat-pulldown-d','Neutral-grip lat pulldown','Lats',2,'8–12','Keep chest tall and pull elbows toward ribs.',105,['Back','Biceps'],FORM_GUIDES.latPulldown),
    ex('hammer-curl-d','Hammer curl','Biceps · forearms',2,'10–15','Keep wrists neutral and elbows quiet.',75,['Biceps']),
    ex('rdl-pullthrough','Light dumbbell Romanian deadlift or cable pull-through','KNEE · hamstrings/glutes',2,'8–12','Hip hinge with a neutral neck and spine.',105,['Lower Body'],FORM_GUIDES.rdl),
    ex('smith-row-d1','Smith machine bent-over row','Back thickness · final lift',2,'8–12','Hinge to a stable torso angle, keep neck neutral and row toward the lower ribs without jerking.',120,['Back','Traps','Biceps'],FORM_GUIDES.seatedRow),
    crunch('crunch-d1'), cardio('strider-d1')
  ]},
  {id:'d2',base:'d',variant:2,short:'D2',title:'Upper Thickness — Alternate',muscles:['Chest','Back','Shoulders','Triceps','Biceps','Traps'],exercises:[
    ex('machine-chest-d2','Plate-loaded or machine chest press','Chest thickness',2,'8–12','Keep shoulder blades supported and use a comfortable elbow path.',120,['Chest','Triceps','Shoulders']),
    ex('high-low-fly-d2','High-to-low cable fly','Lower chest',2,'10–15','Sweep down and inward without rolling shoulders forward.',75,['Chest'],FORM_GUIDES.pecFly),
    ex('chest-row-d2','Chest-supported row','Back thickness',2,'8–12','Keep chest supported and neck neutral.',120,['Back','Traps','Biceps'],FORM_GUIDES.chestRow),
    ex('db-bench-row-d2','One-arm dumbbell bench row','Back thickness',2,'8–12 per side','Keep shoulders level and avoid torso rotation.',105,['Back','Traps','Biceps'],FORM_GUIDES.dumbbellBenchRow),
    ex('machine-shrug-d2','Machine or cable shrug','Upper traps',2,'10–15','Move straight up and down; do not roll.',90,['Traps'],FORM_GUIDES.shrug),
    ex('cable-bar-tri-d2','Cable bar pushdown','Triceps',2,'10–15','Keep elbows pinned and shoulders down.',75,['Triceps'],FORM_GUIDES.barPushdown),
    ex('cable-curl-d2','Cable curl','Biceps',2,'10–15','Keep upper arms quiet and avoid leaning back.',75,['Biceps']),
    ex('glute-bridge-d2','Glute bridge or supported hip thrust','KNEE · glutes',2,'10–15','Use a comfortable knee bend and drive from hips.',90,['Lower Body']),
    crunch('crunch-d2'), cardio('strider-d2')
  ]}
];

const state = {
  sessions: loadJSON(STORAGE_KEYS.sessions, {}),
  history: loadJSON(STORAGE_KEYS.history, []),
  settings: {unit:'lb',sound:true,prefill:true,customByDay:{},...loadJSON(STORAGE_KEYS.settings,{})},
  selectedDay: 'a1', installPrompt:null,
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
  'workoutView','historyView','settingsView','todayLabel','workoutHeading','dayTabs','exerciseList','progressText','progressBar','finishWorkoutButton','resetDayButton','historyList','clearHistoryButton','unitSelect','soundToggle','prefillToggle','eraseAllButton','timerDock','timerToggle','timerLabel','timerDisplay','timerReset','installButton','installDialog','installDialogContent','confirmDialog','confirmTitle','confirmMessage','confirmActionButton','exerciseTemplate','workoutTimerDisplay','workoutTimerToggle','workoutTimerFinish','notesField','addExerciseButton','addExerciseDialog','customName','customSets','customReps','customCategory','customNote','saveCustomDay','addExerciseConfirm','recommendationCard','recommendationTitle','recommendationDetail','recommendationButton','muscleStatus','formDialog','formTitle','formVisual','formTargets','formJoints','formCues','formAvoid'
].forEach(id=>els[id]=document.getElementById(id));}

function bindNavigation(){document.querySelectorAll('.nav-button').forEach(btn=>btn.addEventListener('click',()=>{const target=btn.dataset.view;document.querySelectorAll('.nav-button').forEach(x=>x.classList.toggle('active',x===btn));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===target));if(target==='historyView')renderHistory();window.scrollTo({top:0,behavior:'smooth'});}));}

function bindGlobalActions(){
  els.resetDayButton.addEventListener('click',()=>confirmAction('Reset this workout?','This clears today’s weights, repetitions, and completed sets for the selected workout.',resetCurrentSession));
  els.finishWorkoutButton.addEventListener('click',finishWorkout); els.workoutTimerToggle.addEventListener('click',toggleWorkoutTimer); els.workoutTimerFinish.addEventListener('click',finishWorkout);
  els.addExerciseButton.addEventListener('click',()=>els.addExerciseDialog.showModal()); els.addExerciseConfirm.addEventListener('click',addCustomExercise); els.notesField.addEventListener('input',saveNotes);
  els.recommendationButton.addEventListener('click',()=>{state.selectedDay=getSuggestedWorkoutId();renderDayTabs();renderWorkout();window.scrollTo({top:0,behavior:'smooth'});});
  els.clearHistoryButton.addEventListener('click',()=>confirmAction('Clear workout history?','Your completed workout history will be permanently removed from this device.',()=>{state.history=[];saveJSON(STORAGE_KEYS.history,state.history);renderHistory();renderRecommendation();}));
  els.eraseAllButton.addEventListener('click',()=>confirmAction('Erase all app data?','This removes all active sessions, workout history, and preferences stored on this device.',()=>{Object.values(STORAGE_KEYS).forEach(k=>localStorage.removeItem(k));state.sessions={};state.history=[];state.settings={unit:'lb',sound:true,prefill:true,customByDay:{}};state.selectedDay='a1';renderDayTabs();renderWorkout();renderHistory();renderSettings();renderRecommendation();}));
  els.unitSelect.addEventListener('change',()=>{state.settings.unit=els.unitSelect.value;saveSettings();renderWorkout();});
  els.soundToggle.addEventListener('change',()=>{state.settings.sound=els.soundToggle.checked;saveSettings();}); els.prefillToggle.addEventListener('change',()=>{state.settings.prefill=els.prefillToggle.checked;saveSettings();});
  document.querySelectorAll('.timer-preset').forEach(btn=>btn.addEventListener('click',()=>setTimerPreset(Number(btn.dataset.seconds)))); els.timerToggle.addEventListener('click',toggleTimer); els.timerReset.addEventListener('click',resetTimer);
}

function applySavedCustomExercises(){const saved=state.settings.customByDay||{};WORKOUTS.forEach(w=>(saved[w.id]||[]).forEach(item=>{if(!w.exercises.some(exercise=>exercise.id===item.id))w.exercises.push(item);}));}

function renderDayTabs(){els.dayTabs.replaceChildren();ROTATION.forEach(base=>{const w=getWorkout(nextVariantForBase(base));const btn=document.createElement('button');btn.type='button';btn.className=`day-tab${getWorkout(state.selectedDay).base===base?' active':''}`;btn.innerHTML=`Workout ${base.toUpperCase()}<span>Next: ${w.short}</span>`;btn.addEventListener('click',()=>{state.selectedDay=nextVariantForBase(base);renderDayTabs();renderWorkout();window.scrollTo({top:0,behavior:'smooth'});});els.dayTabs.append(btn);});}

function renderRecommendation(){
  const suggested=getWorkout(getSuggestedWorkoutId()),last=getLastRotationWorkout();
  els.recommendationTitle.textContent=`Recommended next: Workout ${suggested.short}`;
  els.recommendationDetail.textContent=last?`Last completed: Workout ${getWorkout(last.workoutId).short} · ${formatHistoryDate(last.finishedAt)}`:'Start with Workout A, then continue A → B → C → D regardless of weekday.';
  els.recommendationButton.textContent=`Open Workout ${suggested.short}`;
  const groups=['Chest','Back','Shoulders','Biceps','Triceps','Traps','Lower Body','Core'];els.muscleStatus.replaceChildren();
  groups.forEach(group=>{const lastDate=findLastMuscleDate(group),chip=document.createElement('div');chip.className='muscle-chip';chip.innerHTML=`<strong>${group}</strong><span>${lastDate?timeAgo(lastDate):'Not logged'}</span>`;els.muscleStatus.append(chip);});
}

function getSuggestedWorkoutId(){const last=getLastRotationWorkout();if(!last)return nextVariantForBase('a');const lastBase=workoutBase(last.workoutId);const idx=ROTATION.indexOf(lastBase);const nextBase=ROTATION[(idx+1+ROTATION.length)%ROTATION.length]||'a';return nextVariantForBase(nextBase);}
function getLastRotationWorkout(){return(state.history||[]).find(h=>ROTATION.includes(workoutBase(h.workoutId)))||null;}
function workoutBase(id){const mapped=LEGACY_TO_ROTATION[id]||id;return String(mapped).charAt(0);}
function nextVariantForBase(base){for(const h of state.history||[]){const id=LEGACY_TO_ROTATION[h.workoutId]||h.workoutId;if(workoutBase(id)===base)return id.endsWith('1')?`${base}2`:`${base}1`;}return `${base}1`;}
function findLastMuscleDate(group){for(const h of state.history){const groups=h.musclesTrained||inferMusclesFromHistory(h);if(groups.includes(group))return h.finishedAt||h.date;}return null;}
function inferMusclesFromHistory(h){const w=getWorkout(h.workoutId,false);return w?.muscles||[];}

function renderWorkout(){const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w);els.todayLabel.textContent=formatLongDate(new Date());els.workoutHeading.textContent=`Workout ${w.short} — ${w.title}`;els.exerciseList.replaceChildren();els.notesField.value=session.notes||'';renderWorkoutTimer();[...w.exercises,...(session.customExercises||[])].forEach((exercise,index)=>renderExerciseCard(w,session,exercise,index));updateProgress();}

function renderExerciseCard(workout,session,exercise,index){
  ensureExerciseState(session,exercise);
  const frag=els.exerciseTemplate.content.cloneNode(true),card=frag.querySelector('.exercise-card'),heading=frag.querySelector('.exercise-heading'),focus=frag.querySelector('.exercise-focus'),name=frag.querySelector('.exercise-name'),target=frag.querySelector('.exercise-target'),cue=frag.querySelector('.exercise-cue'),setsList=frag.querySelector('.sets-list'),weightHeading=frag.querySelector('.weight-heading'),skip=frag.querySelector('.skip-exercise'),exerciseState=session.exercises[exercise.id],body=frag.querySelector('.exercise-body');
  focus.textContent=exercise.focus; name.textContent=exercise.name; cue.textContent=exercise.cue||'';
  const activeSets=exerciseState.sets.length;
  target.textContent=exercise.type==='cardio'?exercise.reps:`${activeSets} sets × ${exercise.reps} reps · ${formatTime(exercise.rest)} rest`;
  weightHeading.textContent=exercise.type==='cardio'?'Minutes':`Weight (${state.settings.unit})`;
  card.classList.toggle('skipped',!!exerciseState.skipped); skip.textContent=exerciseState.skipped?'Unskip':'Skip';
  skip.addEventListener('click',e=>{e.stopPropagation();exerciseState.skipped=!exerciseState.skipped;saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkout();});
  if(exercise.form){const formButton=document.createElement('button');formButton.className='form-button';formButton.type='button';formButton.textContent='FORM';formButton.addEventListener('click',e=>{e.stopPropagation();openFormGuide(exercise.form);});body.insertBefore(formButton,cue);}
  const prev=exerciseState.previousSets?.length?exerciseState.previousSets:findPreviousExercise(exercise.id)?.sets;
  if(prev?.length && exercise.type!=='cardio'){const p=document.createElement('div');p.className='previous-performance';p.innerHTML=`<strong>Last time</strong><span>${prev.slice(0,3).map((x,i)=>`S${i+1}: ${escapeHTML(x.weight||'—')} ${state.settings.unit} × ${escapeHTML(x.reps||'—')}`).join(' · ')}</span>`;body.insertBefore(p,body.querySelector('.set-header'));}
  const completed=exerciseState.sets.length>0&&exerciseState.sets.every(x=>x.done);
  card.classList.toggle('complete',completed);
  if(!completed&&(index===0||exerciseState.sets.some(x=>x.weight||x.reps||x.done)||exerciseState.skipped)){card.classList.add('open');heading.setAttribute('aria-expanded','true');}
  heading.addEventListener('click',()=>{const open=card.classList.toggle('open');heading.setAttribute('aria-expanded',String(open));});
  exerciseState.sets.forEach((set,setIndex)=>{const row=document.createElement('div');row.className=`set-row${set.done?' done':''}`;const cardioMode=exercise.type==='cardio';row.innerHTML=`<span class="set-number">${setIndex+1}</span><input class="set-input weight-input" type="number" inputmode="decimal" min="0" step="0.5" placeholder="—" value="${escapeAttribute(set.weight)}"/><input class="set-input reps-input" type="${cardioMode?'text':'number'}" inputmode="${cardioMode?'text':'numeric'}" min="0" step="1" placeholder="${cardioMode?'intensity':'—'}" value="${escapeAttribute(set.reps)}"/><label class="done-check"><input type="checkbox" ${set.done?'checked':''}/><span></span></label>`;const wi=row.querySelector('.weight-input'),ri=row.querySelector('.reps-input'),cb=row.querySelector('input[type="checkbox"]');wi.addEventListener('input',()=>updateSet(workout,exercise,setIndex,'weight',wi.value));ri.addEventListener('input',()=>updateSet(workout,exercise,setIndex,'reps',ri.value));cb.addEventListener('change',()=>{updateSet(workout,exercise,setIndex,'done',cb.checked);if(cb.checked&&exercise.rest){setTimerPreset(exercise.rest,false);startTimer();}renderWorkout();});setsList.append(row);});
  if(exercise.type!=='cardio'&&exerciseState.sets.length===2){const add=document.createElement('button');add.type='button';add.className='add-third-set';add.textContent='+ Add 3rd set';add.addEventListener('click',()=>{const previous=prev?.[2]||prev?.[1]||{};exerciseState.sets.push({weight:previous.weight||exerciseState.sets[1]?.weight||'',reps:'',done:false});saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkout();});body.append(add);}
  els.exerciseList.append(frag);
}

function openFormGuide(form){
  els.formTitle.textContent=form.title;
  const meta=getFormMeta(form.type);
  els.formVisual.innerHTML='';
  els.formVisual.hidden=true;
  els.formTargets.textContent=meta.targets.join(' · ');
  els.formJoints.innerHTML=meta.joints.map(x=>`<li>${escapeHTML(x)}</li>`).join('');
  els.formCues.innerHTML=form.cues.map(x=>`<li>${escapeHTML(x)}</li>`).join('');
  els.formAvoid.innerHTML=form.avoid.map(x=>`<li>${escapeHTML(x)}</li>`).join('');
  els.formDialog.showModal();
}

function getFormMeta(type){
  const commonUpper=['Keep the head stacked over the torso; do not reach the chin forward.','Keep shoulders away from the ears unless the exercise is a shrug.','Use a pain-free range and stop if you feel sharp pain, instability, numbness, or radiating symptoms.'];
  const map={
    press:{targets:['Chest','Triceps','Front delts'],joints:['Shoulder blades stay set against the bench.','Keep wrists stacked over forearms and elbows in the illustrated path.',...commonUpper]},
    overhead:{targets:['Triceps','Shoulder stabilizers'],joints:['Keep ribs stacked rather than arching to create range.','Upper arms stay controlled; do not force the shoulder into a painful overhead position.',...commonUpper]},
    fly:{targets:['Chest','Front shoulder stabilizers'],joints:['Maintain a soft, nearly fixed elbow bend.','Stop the stretch before the front of the shoulder rolls forward.',...commonUpper]},
    reversefly:{targets:['Rear delts','Middle traps','Rhomboids'],joints:['Lead with the elbows while the shoulder blades move together.','Keep the neck long and avoid shrugging.',...commonUpper]},
    facepull:{targets:['Rear delts','Middle traps','Rotator cuff'],joints:['Elbows finish roughly level with the shoulders, not dropped toward the ribs.','Rotate the hands apart without forcing the shoulder backward.',...commonUpper]},
    pressdown:{targets:['Triceps'],joints:['Upper arms stay beside the torso while only the elbows open and close.','Wrists stay neutral; shoulders remain down and back.',...commonUpper]},
    pulldown:{targets:['Lats','Biceps','Lower/mid traps'],joints:['Pull elbows toward the ribs without leaning far backward.','At the top, allow reach without losing shoulder control or craning the neck.',...commonUpper]},
    lateral:{targets:['Side delts','Supraspinatus / cuff support'],joints:['Lead with elbows and keep a soft elbow bend.','Stop around shoulder height unless a lower pain-free range feels better.',...commonUpper]},
    row:{targets:['Lats','Middle traps','Rhomboids','Biceps'],joints:['Keep torso square and neck neutral.','Let the shoulder blade move, then finish with the elbow without shrugging.',...commonUpper]},
    dbrow:{targets:['Lats','Middle traps','Rhomboids','Biceps'],joints:['Keep shoulders approximately level and torso square to the floor/bench.','Support the non-working side so the neck and spine stay neutral.','Pull elbow toward hip; do not rotate the torso to chase height.',...commonUpper]},
    pullover:{targets:['Lats','Serratus / shoulder stabilizers'],joints:['Keep elbows softly bent and nearly fixed.','Keep ribs down so shoulder motion does not come from arching the spine.',...commonUpper]},
    trx:{targets:['Rear delts','Middle/lower traps','Rotator cuff'],joints:['Keep the body in one straight line and move from the shoulders/scapulae.','Use a more upright body angle if the shoulder or neck feels strained.',...commonUpper]},
    yraise:{targets:['Lower traps','Serratus','Shoulder stabilizers'],joints:['Raise in a wide Y with light resistance and thumbs generally up.','Reach upward without shrugging the shoulders toward the ears.',...commonUpper]},
    shrug:{targets:['Upper traps'],joints:['Move shoulders straight up and down; do not roll them.','Keep elbows straight and head neutral; do not jut the chin forward.']},
    dip:{targets:['Triceps','Lower chest'],joints:['Set the seat so the shoulders do not begin in an excessively deep position.','Keep shoulders down and elbows tracking comfortably beside the body.',...commonUpper]},
    dragcurl:{targets:['Biceps'],joints:['Let elbows drift slightly behind the torso while shoulders remain relaxed.','Keep wrists neutral and bar/cable close to the body.',...commonUpper]},
    hinge:{targets:['Hamstrings','Glutes','Posterior chain'],joints:['Maintain only a soft knee bend and move primarily at the hips.','Keep spine and neck neutral; stop before the back rounds.']},
    sled:{targets:['Quadriceps','Glutes'],joints:['Keep knees tracking with the feet and use only a comfortable depth.','Keep the whole foot supported; do not force ankle range to gain depth.']},
    squat:{targets:['Quadriceps','Glutes'],joints:['Use the machine path and a comfortable knee depth.','Keep knees aligned with the feet and foot pressure stable; do not force ankle motion.']},
    crunch:{targets:['Abdominals'],joints:['Keep the neck relaxed and move by bringing ribs toward pelvis.','Do not pull the head forward or hyperextend on the return.']}
  };
  return map[type]||{targets:['Primary working muscles'],joints:commonUpper};
}

function buildFormVisual(type){
  const cls=`motion-${type}`;
  const lower=['hinge','sled','squat','crunch'].includes(type);
  const targetClass= lower ? 'target-lower' : (['row','dbrow','reversefly','facepull','pulldown','pullover','trx','yraise','shrug'].includes(type)?'target-back':'target-front');
  const equipment = type==='pulldown' || type==='pressdown' || type==='facepull' || type==='pullover' || type==='yraise' ? '<line class="cable" x1="274" y1="24" x2="242" y2="95"/><circle class="pulley" cx="276" cy="21" r="7"/>' : type==='dbrow' ? '<rect class="bench" x="64" y="115" width="112" height="10" rx="5"/><line class="bench-leg" x1="78" y1="125" x2="70" y2="162"/><circle class="weight" cx="236" cy="126" r="9"/>' : type==='press' ? '<line class="bar" x1="88" y1="92" x2="232" y2="92"/>' : '';
  return `<div class="anatomy-wrap"><svg class="form-svg anatomy-svg ${cls} ${targetClass}" viewBox="0 0 320 220" role="img" aria-label="Animated joint-position and movement guide"><line class="floor" x1="24" y1="192" x2="296" y2="192"/>${equipment}<g class="figure"><circle class="head" cx="160" cy="43" r="18"/><rect class="neck" x="152" y="59" width="16" height="14" rx="7"/><path class="torso-shape" d="M132 72 Q160 62 188 72 L180 132 Q160 145 140 132 Z"/><ellipse class="pelvis" cx="160" cy="137" rx="23" ry="12"/><path class="muscle muscle-front" d="M143 78 Q160 69 177 78 L173 106 Q160 113 147 106 Z"/><path class="muscle muscle-back" d="M138 79 Q160 67 182 79 L176 110 Q160 120 144 110 Z"/><path class="muscle muscle-lower" d="M146 145 L157 145 L151 181 L137 181 Z M163 145 L174 145 L183 181 L169 181 Z"/><g class="arm-left limb"><line class="upper" x1="137" y1="80" x2="112" y2="112"/><circle class="joint shoulder" cx="137" cy="80" r="6"/><circle class="joint elbow" cx="112" cy="112" r="6"/><line class="fore" x1="112" y1="112" x2="104" y2="148"/><circle class="hand" cx="104" cy="151" r="6"/></g><g class="arm-right limb"><line class="upper" x1="183" y1="80" x2="208" y2="112"/><circle class="joint shoulder" cx="183" cy="80" r="6"/><circle class="joint elbow" cx="208" cy="112" r="6"/><line class="fore" x1="208" y1="112" x2="216" y2="148"/><circle class="hand" cx="216" cy="151" r="6"/></g><g class="leg-left"><line class="thigh" x1="148" y1="145" x2="135" y2="168"/><circle class="joint knee" cx="135" cy="168" r="6"/><line class="shin" x1="135" y1="168" x2="128" y2="190"/></g><g class="leg-right"><line class="thigh" x1="172" y1="145" x2="185" y2="168"/><circle class="joint knee" cx="185" cy="168" r="6"/><line class="shin" x1="185" y1="168" x2="192" y2="190"/></g></g><path class="motion-path" d="M102 158 Q160 83 218 158"/><g class="joint-labels"><text x="194" y="58">neck neutral</text><text x="206" y="84">shoulder</text><text x="217" y="116">elbow</text></g></svg><div class="visual-caption"><strong>Animated position guide</strong> · focus on joint alignment and the highlighted movement path. Use a comfortable, pain-free range.</div></div>`;
}

function ensureExerciseState(session,exercise){if(!session.exercises[exercise.id])session.exercises[exercise.id]={sets:Array.from({length:exercise.sets},()=>({weight:'',reps:'',done:false})),skipped:false};else if(session.exercises[exercise.id].sets.length<exercise.sets){while(session.exercises[exercise.id].sets.length<exercise.sets)session.exercises[exercise.id].sets.push({weight:'',reps:'',done:false});}}
function updateSet(workout,exercise,setIndex,field,value){const session=getOrCreateSession(localDateKey(),workout);session.exercises[exercise.id].sets[setIndex][field]=value;session.updatedAt=new Date().toISOString();saveJSON(STORAGE_KEYS.sessions,state.sessions);}
function updateProgress(){const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w),all=[...w.exercises,...(session.customExercises||[])];let total=0,completed=0;all.forEach(exercise=>{ensureExerciseState(session,exercise);const d=session.exercises[exercise.id];if(d.skipped)return;total+=d.sets.length;completed+=d.sets.filter(x=>x.done).length;});els.progressText.textContent=`${completed} / ${total}`;els.progressBar.style.width=`${total?(completed/total)*100:0}%`;els.finishWorkoutButton.disabled=completed===0;els.finishWorkoutButton.textContent=completed===total&&total?'Finish completed workout':'Finish workout';}

function finishWorkout(){
  const w=getWorkout(state.selectedDay),dateKey=localDateKey(),sessionKey=`${dateKey}:${w.id}`,session=state.sessions[sessionKey];if(!session)return;const all=[...w.exercises,...(session.customExercises||[])];let completedSets=0,totalSets=0;const skipped=[],muscles=new Set();
  all.forEach(exercise=>{ensureExerciseState(session,exercise);const d=session.exercises[exercise.id];if(d.skipped){skipped.push(exercise.name);return;}totalSets+=d.sets.length;const has=d.sets.some(s=>s.done||s.weight||s.reps);completedSets+=d.sets.filter(x=>x.done).length;if(has)(exercise.muscles||categoryToMuscles(exercise.focus)).forEach(m=>muscles.add(m));});
  if(!completedSets&&!session.notes)return;stopWorkoutTimer();const duration=getWorkoutElapsed(session);state.history.unshift({id:`${Date.now()}-${w.id}`,date:dateKey,finishedAt:new Date().toISOString(),workoutId:w.id,workoutTitle:`Workout ${w.short} — ${w.title}`,completedSets,totalSets,unit:state.settings.unit,exercises:JSON.parse(JSON.stringify(session.exercises)),customExercises:session.customExercises||[],skipped,notes:session.notes||'',duration,musclesTrained:[...muscles]});state.history=state.history.slice(0,100);saveJSON(STORAGE_KEYS.history,state.history);delete state.sessions[sessionKey];saveJSON(STORAGE_KEYS.sessions,state.sessions);renderHistory();renderRecommendation();state.selectedDay=getSuggestedWorkoutId();renderDayTabs();renderWorkout();showToast(`Workout ${w.short} saved — next is Workout ${getWorkout(state.selectedDay).short}`);
}

function resetCurrentSession(){const w=getWorkout(state.selectedDay);delete state.sessions[`${localDateKey()}:${w.id}`];saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkout();}
function getOrCreateSession(dateKey,w){const key=`${dateKey}:${w.id}`;if(!state.sessions[key]){state.sessions[key]={date:dateKey,workoutId:w.id,updatedAt:new Date().toISOString(),exercises:{},customExercises:[],notes:'',timerStartedAt:null,timerElapsed:0};w.exercises.forEach(exercise=>{const previous=state.settings.prefill?findPreviousExercise(exercise.id):null;state.sessions[key].exercises[exercise.id]={sets:Array.from({length:exercise.sets},(_,i)=>({weight:previous?.sets?.[i]?.weight||previous?.sets?.[0]?.weight||'',reps:'',done:false})),skipped:false,previousSets:previous?.sets?JSON.parse(JSON.stringify(previous.sets)):[]};});saveJSON(STORAGE_KEYS.sessions,state.sessions);}return state.sessions[key];}
function findPreviousExercise(id){for(const entry of state.history){if((entry.unit||'lb')===state.settings.unit&&entry.exercises?.[id])return entry.exercises[id];}return null;}

function renderHistory(){els.historyList.replaceChildren();if(!state.history.length){const e=document.createElement('div');e.className='history-empty';e.textContent='No completed workouts yet. Finish a workout and it will appear here.';els.historyList.append(e);return;}state.history.forEach(entry=>{const w=getWorkout(entry.workoutId,false),card=document.createElement('article');card.className='history-card';const summary=document.createElement('button');summary.type='button';summary.className='history-summary';summary.innerHTML=`<span><strong>${escapeHTML(entry.workoutTitle||w?.title||'Workout')}</strong><small>${formatHistoryDate(entry.finishedAt||entry.date)}</small></span><span class="history-badge">${entry.completedSets}/${entry.totalSets} sets</span>`;const details=document.createElement('div');details.className='history-details';const meta=document.createElement('p');meta.className='history-meta';meta.textContent=`Duration: ${formatDuration(entry.duration||0)}${entry.skipped?.length?' · Skipped: '+entry.skipped.length:''}`;details.append(meta);const exercises=w?[...w.exercises,...(entry.customExercises||[])]:entry.customExercises||[];exercises.forEach(exercise=>{const data=entry.exercises?.[exercise.id];if(!data)return;const completed=data.sets?.filter(set=>set.done||set.weight||set.reps)||[];if(!completed.length)return;const item=document.createElement('div');item.className='history-exercise';const text=completed.map((set,i)=>`S${i+1}: ${set.weight?set.weight+' '+(entry.unit||'lb'):'—'} × ${set.reps||'—'}`).join(' · ');item.innerHTML=`<strong>${escapeHTML(exercise.name)}</strong><small>${escapeHTML(text)}</small>`;details.append(item);});if(entry.notes){const n=document.createElement('p');n.className='history-note';n.textContent='Notes: '+entry.notes;details.append(n);}summary.addEventListener('click',()=>card.classList.toggle('open'));card.append(summary,details);els.historyList.append(card);});}

function saveNotes(){const session=getOrCreateSession(localDateKey(),getWorkout(state.selectedDay));session.notes=els.notesField.value;saveJSON(STORAGE_KEYS.sessions,state.sessions);}
function addCustomExercise(event){event.preventDefault();const name=els.customName.value.trim();if(!name)return;const w=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),w),sets=Math.max(1,Math.min(10,Number(els.customSets.value)||2)),focus=els.customCategory.value;const item={id:`custom-${Date.now()}`,name,focus,sets,reps:els.customReps.value.trim()||'8–12',cue:els.customNote.value.trim(),rest:90,muscles:categoryToMuscles(focus),custom:true};session.customExercises.push(item);ensureExerciseState(session,item);if(els.saveCustomDay.checked){state.settings.customByDay=state.settings.customByDay||{};state.settings.customByDay[w.id]=state.settings.customByDay[w.id]||[];state.settings.customByDay[w.id].push(item);w.exercises.push(item);session.customExercises=session.customExercises.filter(x=>x.id!==item.id);saveSettings();}saveJSON(STORAGE_KEYS.sessions,state.sessions);els.customName.value='';els.customNote.value='';els.saveCustomDay.checked=false;els.addExerciseDialog.close();renderDayTabs();renderWorkout();}
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

function getWorkout(id,strict=true){const exact=WORKOUTS.find(x=>x.id===id);if(exact)return exact;const mapped=LEGACY_TO_ROTATION[id]||id,w=WORKOUTS.find(x=>x.id===mapped);if(w)return w;if(strict)return WORKOUTS[0];return null;}
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
