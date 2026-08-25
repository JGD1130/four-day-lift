'use strict';

const STORAGE_KEYS = {
  sessions: 'fourDayLift.sessions.v1',
  history: 'fourDayLift.history.v1',
  settings: 'fourDayLift.settings.v1'
};

const WORKOUTS = [
  { id:'monday', short:'Mon', day:'Monday', title:'Chest, Triceps & Mid Traps', exercises:[
    ex('machine-chest-press','Machine chest press or dumbbell bench press','Chest',3,'6–10','Use the option that lets you stay stable without uncomfortable pressure through the knee.',120),
    ex('incline-press','Incline machine or dumbbell press','Upper chest',3,'8–12','Keep the shoulder blades set and use a controlled lowering phase.',120),
    ex('pec-deck','Pec deck or cable fly','Chest',2,'12–15','Use a comfortable stretch; do not let the shoulders roll forward.',75),
    ex('face-pull','Face pull','Middle traps · rear shoulders',3,'12–20','Pull toward the forehead, separate the rope ends, and avoid shrugging.',75),
    ex('trx-posture-mon','TRX Posture Series — T → Y → W','Posture · middle/lower traps · rear shoulders',2,'6–10 sequences','Lean back with your body straight and straps under tension. Pull into a T with arms out to the sides, transition to a Y overhead, then a W by bending the elbows and externally rotating the shoulders. Keep your chest up and shoulder blades controlled. Return slowly. T → Y → W = 1 rep. Adjust difficulty with foot position; prioritize control over resistance.',75),
    ex('triceps-pressdown','Rope triceps pressdown','Triceps',3,'10–15','Keep the elbows near the ribs and fully straighten under control.',75),
    ex('cable-bar-pushdown','Triceps cable bar pushdown','Triceps',3,'10–15','Keep elbows pinned near your sides. Press the bar down to full extension without leaning over it.',75),
    ex('overhead-triceps-mon','Overhead cable triceps extension','Triceps',2,'10–15','Keep the upper arms steady and avoid arching the lower back.',75),
    ex('hamstring-curl','Seated hamstring curl','KNEE · hamstrings',3,'10–15','Use a smooth range that feels comfortable at the replaced knee; stay well short of failure.',90),
    cardio('strider-mon')
  ]},
  { id:'tuesday', short:'Tue', day:'Tuesday', title:'Back, Biceps & Upper/Mid Traps', exercises:[
    ex('lat-pulldown-tue','Neutral-grip lat pulldown','Lats',3,'8–12','Drive the elbows down and avoid leaning far backward.',120),
    ex('chest-supported-row','Chest-supported row','Middle traps · upper back',3,'8–12','Let the shoulder blades reach slightly forward, then pull them together before finishing the row.',120),
    ex('seated-cable-row','Seated cable row','Back · middle traps',2,'10–12','Keep the torso steady and elbows roughly 45–60 degrees from the body.',105),
    ex('seated-shrug-tue','Seated dumbbell or machine shrug','Upper traps',3,'10–15','Lift the shoulders straight toward the ears, pause, and lower slowly. Do not roll them.',90),
    ex('curl-tue','Cable or dumbbell curl','Biceps',3,'8–12','Keep the elbows still and lower the weight under control.',75),
    ex('hammer-curl-tue','Hammer curl','Biceps · forearms',2,'10–15','Use a neutral grip and avoid swinging.',75),
    ex('hip-sled','Hip sled','KNEE · lower body',3,'10–15','Use a comfortable range and controlled tempo. Do not chase depth or heavy loading; keep several reps in reserve.',105),
    ex('hip-abduction-tue','Hip-abduction machine','Lower body · outer hips',2,'12–20','Keep the pelvis steady and use a controlled range.',75),
    cardio('strider-tue')
  ]},
  { id:'thursday', short:'Thu', day:'Thursday', title:'Shoulders, Arms & Lower Traps', exercises:[
    ex('shoulder-press','Seated machine or dumbbell shoulder press','Shoulders',3,'6–10','Use back support and keep the ribs down.',120),
    ex('lateral-raise','Dumbbell or cable lateral raise','Side shoulders',3,'12–20','Lead with the elbows and stop near shoulder height.',75),
    ex('reverse-pec-deck','Reverse pec deck','Middle traps · rear shoulders',3,'12–20','Keep the chest against the pad, lead with the elbows, and avoid shrugging.',75),
    ex('cable-y-raise-thu','Seated cable Y raise','Lower traps',3,'10–15','Use light resistance. Reach diagonally into a Y without lifting the shoulders toward the ears.',75),
    ex('trx-posture-thu','TRX Posture Series — T → Y → W','Posture · middle/lower traps · rear shoulders',2,'6–10 sequences','Lean back with your body straight and straps under tension. Pull into a T with arms out to the sides, transition to a Y overhead, then a W by bending the elbows and externally rotating the shoulders. Keep your chest up and shoulder blades controlled. Return slowly. T → Y → W = 1 rep. Adjust difficulty with foot position; prioritize control over resistance.',75),
    ex('curl-thu','EZ-bar or cable curl','Biceps',3,'10–15','Keep the upper arms steady and avoid using momentum.',75),
    ex('overhead-triceps-thu','Overhead cable triceps extension','Triceps',3,'10–15','Use a controlled stretch and keep the upper arms fixed.',75),
    ex('hoist-squat','Hoist squat machine — light','KNEE · lower body',2,'10–15','Light weight, comfortable depth, controlled tempo. Keep several repetitions in reserve and stop if the knee becomes irritated.',105),
    ex('terminal-knee-extension','Light band terminal knee extension','KNEE · quadriceps',2,'15–20 per leg','Straighten gently, squeeze the quadriceps for one second, and use only light resistance.',60),
    cardio('strider-thu')
  ]},
  { id:'saturday', short:'Sat', day:'Saturday', title:'Upper Body & Trap Reinforcement', exercises:[
    ex('machine-chest-sat','Machine chest press','Chest',3,'8–12','Use a stable foot position and controlled repetitions.',105),
    ex('lat-pulldown-sat','Neutral-grip lat pulldown','Lats',3,'8–12','Keep the chest tall and pull the elbows toward the ribs.',105),
    ex('one-arm-row','One-arm seated cable row','Back · middle traps',2,'10–12 per side','Keep the torso square and pull the shoulder blade back before bending the elbow fully.',90),
    ex('seated-shrug-sat','Seated cable or machine shrug','Upper traps',2,'12–15','Move straight up and down with a brief pause at the top.',90),
    ex('cable-y-raise-sat','Seated cable Y raise','Lower traps',2,'12–15','Keep the load light and reach into a wide Y without shrugging.',75),
    ex('hammer-curl-sat','Hammer curl','Biceps · forearms',2,'10–15','Keep the wrists neutral and elbows quiet.',75),
    ex('pressdown-sat','Rope triceps pressdown','Triceps',2,'10–15','Fully extend without letting the shoulders tip forward.',75),
    ex('rdl-pullthrough','Light dumbbell Romanian deadlift or cable pull-through','KNEE · hamstrings/glutes',2,'8–12','Treat this as a hip hinge, not a squat. Use a slight knee bend and stop if balance or knee comfort is poor.',105),
    ex('glute-bridge-sat','Glute bridge or supported hip thrust','KNEE · glutes',2,'10–15','Use only a comfortable knee bend and drive the motion from the hips.',90),
    cardio('strider-sat')
  ]}
];

function cardio(id){ return {id,name:'Strider cardio',focus:'Cardio · finisher',sets:1,reps:'10–15 min',cue:'Finish with an easy-to-moderate Strider session. Keep the duration and intensity flexible, especially while your ankle is recovering. Skip it if the ankle is irritated.',rest:0,type:'cardio'}; }

function ex(id, name, focus, sets, reps, cue, rest) {
  return { id, name, focus, sets, reps, cue, rest };
}

const state = {
  selectedDay: getSuggestedWorkoutId(),
  sessions: loadJSON(STORAGE_KEYS.sessions, {}),
  history: loadJSON(STORAGE_KEYS.history, []),
  settings: { unit: 'lb', sound: true, prefill: true, customByDay: {}, ...loadJSON(STORAGE_KEYS.settings, {}) },
  installPrompt: null,
  timer: { preset: 90, remaining: 90, running: false, interval: null },
  workoutTimer: { running:false, interval:null }
};

const els = {};

document.addEventListener('DOMContentLoaded', init);

function init() {
  cacheElements();
  applySavedCustomExercises();
  bindNavigation();
  bindGlobalActions();
  renderDayTabs();
  renderWorkout();
  renderHistory();
  renderSettings();
  setupInstallHandling();
  registerServiceWorker();
}

function cacheElements() {
  [
    'workoutView','historyView','settingsView','todayLabel','workoutHeading','dayTabs','exerciseList',
    'progressText','progressBar','finishWorkoutButton','resetDayButton','historyList','clearHistoryButton',
    'unitSelect','soundToggle','prefillToggle','eraseAllButton','timerDock','timerToggle','timerLabel',
    'timerDisplay','timerReset','installButton','installDialog','installDialogContent','confirmDialog',
    'confirmTitle','confirmMessage','confirmActionButton','exerciseTemplate','workoutTimerDisplay','workoutTimerToggle','workoutTimerFinish','notesField','addExerciseButton','addExerciseDialog','customName','customSets','customReps','customCategory','customNote','saveCustomDay','addExerciseConfirm'
  ].forEach(id => { els[id] = document.getElementById(id); });
}

function applySavedCustomExercises(){const saved=state.settings.customByDay||{};WORKOUTS.forEach(w=>{(saved[w.id]||[]).forEach(item=>{if(!w.exercises.some(ex=>ex.id===item.id))w.exercises.push(item);});});}

function bindNavigation() {
  document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.view;
      document.querySelectorAll('.nav-button').forEach(item => item.classList.toggle('active', item === button));
      document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === target));
      if (target === 'historyView') renderHistory();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function bindGlobalActions() {
  els.resetDayButton.addEventListener('click', () => confirmAction(
    'Reset this workout?',
    'This clears today’s weights, repetitions, and completed sets for the selected workout.',
    () => resetCurrentSession()
  ));

  els.finishWorkoutButton.addEventListener('click', finishWorkout);
  els.workoutTimerToggle.addEventListener('click', toggleWorkoutTimer);
  els.workoutTimerFinish.addEventListener('click', finishWorkout);
  els.addExerciseButton.addEventListener('click', () => els.addExerciseDialog.showModal());
  els.addExerciseConfirm.addEventListener('click', addCustomExercise);
  els.notesField.addEventListener('input', saveNotes);
  els.clearHistoryButton.addEventListener('click', () => confirmAction(
    'Clear workout history?',
    'Your completed workout history will be permanently removed from this device.',
    () => {
      state.history = [];
      saveJSON(STORAGE_KEYS.history, state.history);
      renderHistory();
    }
  ));

  els.eraseAllButton.addEventListener('click', () => confirmAction(
    'Erase all app data?',
    'This removes all active sessions, workout history, and preferences stored on this device.',
    () => {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      state.sessions = {};
      state.history = [];
      state.settings = { unit: 'lb', sound: true, prefill: true };
      renderWorkout();
      renderHistory();
      renderSettings();
    }
  ));

  els.unitSelect.addEventListener('change', () => {
    state.settings.unit = els.unitSelect.value;
    saveSettings();
    renderWorkout();
  });
  els.soundToggle.addEventListener('change', () => { state.settings.sound = els.soundToggle.checked; saveSettings(); });
  els.prefillToggle.addEventListener('change', () => { state.settings.prefill = els.prefillToggle.checked; saveSettings(); });

  document.querySelectorAll('.timer-preset').forEach(button => {
    button.addEventListener('click', () => setTimerPreset(Number(button.dataset.seconds)));
  });
  els.timerToggle.addEventListener('click', toggleTimer);
  els.timerReset.addEventListener('click', resetTimer);
}

function renderDayTabs() {
  els.dayTabs.replaceChildren();
  WORKOUTS.forEach(workout => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `day-tab${workout.id === state.selectedDay ? ' active' : ''}`;
    button.innerHTML = `${workout.short}<span>${workout.exercises.length} exercises</span>`;
    button.addEventListener('click', () => {
      state.selectedDay = workout.id;
      renderDayTabs();
      renderWorkout();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    els.dayTabs.append(button);
  });
}

function renderWorkout() {
  const workout=getWorkout(state.selectedDay), dateKey=localDateKey(), session=getOrCreateSession(dateKey,workout);
  els.todayLabel.textContent=formatLongDate(new Date()); els.workoutHeading.textContent=`${workout.day} — ${workout.title}`;
  els.exerciseList.replaceChildren(); els.notesField.value=session.notes||''; renderWorkoutTimer();
  const exercises=[...workout.exercises,...(session.customExercises||[])];
  exercises.forEach((exercise,index)=>renderExerciseCard(workout,session,exercise,index));
  updateProgress();
}

function renderExerciseCard(workout,session,exercise,index){
  ensureExerciseState(session,exercise);
  const fragment=els.exerciseTemplate.content.cloneNode(true), card=fragment.querySelector('.exercise-card'), heading=fragment.querySelector('.exercise-heading'), focus=fragment.querySelector('.exercise-focus'), name=fragment.querySelector('.exercise-name'), target=fragment.querySelector('.exercise-target'), cue=fragment.querySelector('.exercise-cue'), setsList=fragment.querySelector('.sets-list'), weightHeading=fragment.querySelector('.weight-heading'), skip=fragment.querySelector('.skip-exercise'), exerciseState=session.exercises[exercise.id];
  focus.textContent=exercise.focus; name.textContent=exercise.name; cue.textContent=exercise.cue||'';
  target.textContent=exercise.type==='cardio' ? exercise.reps : `${exercise.sets} sets × ${exercise.reps} reps · ${formatTime(exercise.rest)} rest`;
  weightHeading.textContent=exercise.type==='cardio'?'Minutes':`Weight (${state.settings.unit})`;
  card.classList.toggle('skipped',!!exerciseState.skipped); skip.textContent=exerciseState.skipped?'Unskip':'Skip';
  skip.addEventListener('click',e=>{e.stopPropagation();exerciseState.skipped=!exerciseState.skipped;saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkout();});
  if(index===0||exerciseState.sets.some(x=>x.weight||x.reps||x.done)||exerciseState.skipped) {card.classList.add('open');heading.setAttribute('aria-expanded','true');}
  heading.addEventListener('click',()=>{const open=card.classList.toggle('open');heading.setAttribute('aria-expanded',String(open));});
  exerciseState.sets.forEach((set,setIndex)=>{
    const row=document.createElement('div'); row.className=`set-row${set.done?' done':''}`;
    const cardioMode=exercise.type==='cardio';
    row.innerHTML=`<span class="set-number">${setIndex+1}</span><input class="set-input weight-input" type="number" inputmode="decimal" min="0" step="0.5" placeholder="—" value="${escapeAttribute(set.weight)}"/><input class="set-input reps-input" type="${cardioMode?'text':'number'}" inputmode="${cardioMode?'text':'numeric'}" min="0" step="1" placeholder="${cardioMode?'intensity':'—'}" value="${escapeAttribute(set.reps)}"/><label class="done-check"><input type="checkbox" ${set.done?'checked':''}/><span></span></label>`;
    const wi=row.querySelector('.weight-input'),ri=row.querySelector('.reps-input'),cb=row.querySelector('input[type="checkbox"]');
    wi.addEventListener('input',()=>updateSet(workout,exercise,setIndex,'weight',wi.value)); ri.addEventListener('input',()=>updateSet(workout,exercise,setIndex,'reps',ri.value));
    cb.addEventListener('change',()=>{updateSet(workout,exercise,setIndex,'done',cb.checked);row.classList.toggle('done',cb.checked);updateProgress();if(cb.checked&&exercise.rest){setTimerPreset(exercise.rest,false);startTimer();}});
    setsList.append(row);
  });
  els.exerciseList.append(fragment);
}

function ensureExerciseState(session,exercise){ if(!session.exercises[exercise.id]) session.exercises[exercise.id]={sets:Array.from({length:exercise.sets},()=>({weight:'',reps:'',done:false})),skipped:false}; }

function updateSet(workout, exercise, setIndex, field, value) {
  const session = getOrCreateSession(localDateKey(), workout);
  session.exercises[exercise.id].sets[setIndex][field] = value;
  session.updatedAt = new Date().toISOString();
  saveJSON(STORAGE_KEYS.sessions, state.sessions);
}

function updateProgress(){
  const workout=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),workout), exercises=[...workout.exercises,...(session.customExercises||[])];
  let total=0,completed=0; exercises.forEach(ex=>{ensureExerciseState(session,ex);const es=session.exercises[ex.id];if(es.skipped)return;total+=es.sets.length;completed+=es.sets.filter(x=>x.done).length;});
  els.progressText.textContent=`${completed} / ${total}`; els.progressBar.style.width=`${total?(completed/total)*100:0}%`; els.finishWorkoutButton.disabled=completed===0; els.finishWorkoutButton.textContent=completed===total&&total?'Finish completed workout':'Finish workout';
}

function finishWorkout(){
  const workout=getWorkout(state.selectedDay),dateKey=localDateKey(),sessionKey=`${dateKey}:${workout.id}`,session=state.sessions[sessionKey]; if(!session)return;
  const all=[...workout.exercises,...(session.customExercises||[])]; let completedSets=0,totalSets=0,skipped=[]; all.forEach(ex=>{ensureExerciseState(session,ex);const es=session.exercises[ex.id];if(es.skipped){skipped.push(ex.name);return;}totalSets+=es.sets.length;completedSets+=es.sets.filter(x=>x.done).length;});
  if(!completedSets && !session.notes) return;
  stopWorkoutTimer(); const duration=getWorkoutElapsed(session);
  state.history.unshift({id:`${Date.now()}-${workout.id}`,date:dateKey,finishedAt:new Date().toISOString(),workoutId:workout.id,workoutTitle:`${workout.day} — ${workout.title}`,completedSets,totalSets,unit:state.settings.unit,exercises:JSON.parse(JSON.stringify(session.exercises)),customExercises:session.customExercises||[],skipped,notes:session.notes||'',duration});
  state.history=state.history.slice(0,100);saveJSON(STORAGE_KEYS.history,state.history);delete state.sessions[sessionKey];saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkout();renderHistory();showToast('Workout saved to history');
}

function resetCurrentSession() {
  const workout = getWorkout(state.selectedDay);
  delete state.sessions[`${localDateKey()}:${workout.id}`];
  saveJSON(STORAGE_KEYS.sessions, state.sessions);
  renderWorkout();
}

function getOrCreateSession(dateKey, workout) {
  const sessionKey = `${dateKey}:${workout.id}`;
  if (!state.sessions[sessionKey]) {
    state.sessions[sessionKey] = {
      date: dateKey,
      workoutId: workout.id,
      updatedAt: new Date().toISOString(),
      exercises: {},
      customExercises: [],
      notes: '',
      timerStartedAt: null,
      timerElapsed: 0
    };
    workout.exercises.forEach(exercise => {
      const previous = state.settings.prefill ? findPreviousExercise(exercise.id) : null;
      state.sessions[sessionKey].exercises[exercise.id] = {
        sets: Array.from({ length: exercise.sets }, (_, index) => ({
          weight: previous?.sets?.[index]?.weight || previous?.sets?.[0]?.weight || '',
          reps: '',
          done: false
        }))
      };
    });
    saveJSON(STORAGE_KEYS.sessions, state.sessions);
  }
  return state.sessions[sessionKey];
}

function findPreviousExercise(exerciseId) {
  for (const entry of state.history) {
    const entryUnit = entry.unit || 'lb';
    if (entryUnit === state.settings.unit && entry.exercises?.[exerciseId]) {
      return entry.exercises[exerciseId];
    }
  }
  return null;
}

function renderHistory() {
  els.historyList.replaceChildren();
  if (!state.history.length) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = 'No completed workouts yet. Finish a workout and it will appear here.';
    els.historyList.append(empty);
    return;
  }

  state.history.forEach(entry => {
    const workout = getWorkout(entry.workoutId);
    const card = document.createElement('article');
    card.className = 'history-card';
    const summary = document.createElement('button');
    summary.type = 'button';
    summary.className = 'history-summary';
    summary.innerHTML = `
      <span><strong>${escapeHTML(entry.workoutTitle)}</strong><small>${formatHistoryDate(entry.finishedAt)}</small></span>
      <span class="history-badge">${entry.completedSets}/${entry.totalSets} sets</span>`;
    const details = document.createElement('div');
    details.className = 'history-details';

    const meta=document.createElement('p'); meta.className='history-meta'; meta.textContent=`Duration: ${formatDuration(entry.duration||0)}${entry.skipped?.length ? ' · Skipped: '+entry.skipped.length : ''}`; details.append(meta);
    [...workout.exercises,...(entry.customExercises||[])].forEach(exercise => {
      const data = entry.exercises?.[exercise.id];
      if (!data) return;
      const completed = data.sets.filter(set => set.done || set.weight || set.reps);
      if (!completed.length) return;
      const item = document.createElement('div');
      item.className = 'history-exercise';
      const setText = completed.map((set, index) => {
        const weight = set.weight ? `${set.weight} ${entry.unit || 'lb'}` : '—';
        const reps = set.reps || '—';
        return `S${index + 1}: ${weight} × ${reps}`;
      }).join(' · ');
      item.innerHTML = `<strong>${escapeHTML(exercise.name)}</strong><small>${escapeHTML(setText)}</small>`;
      details.append(item);
    });

    if(entry.notes){const note=document.createElement('p');note.className='history-note';note.textContent='Notes: '+entry.notes;details.append(note);}
    summary.addEventListener('click', () => card.classList.toggle('open'));
    card.append(summary, details);
    els.historyList.append(card);
  });
}

function saveNotes(){const session=getOrCreateSession(localDateKey(),getWorkout(state.selectedDay));session.notes=els.notesField.value;saveJSON(STORAGE_KEYS.sessions,state.sessions);}
function addCustomExercise(event){event.preventDefault();const name=els.customName.value.trim();if(!name)return;const workout=getWorkout(state.selectedDay),session=getOrCreateSession(localDateKey(),workout),sets=Math.max(1,Math.min(10,Number(els.customSets.value)||3)),id=`custom-${Date.now()}`,item=ex(id,name,els.customCategory.value||'Custom',sets,els.customReps.value.trim()||'8–12',els.customNote.value.trim()||'Custom exercise for today.',90);item.custom=true;if(els.saveCustomDay.checked){state.settings.customByDay=state.settings.customByDay||{};state.settings.customByDay[workout.id]=state.settings.customByDay[workout.id]||[];state.settings.customByDay[workout.id].push(item);workout.exercises.push(item);saveSettings();}else{session.customExercises=session.customExercises||[];session.customExercises.push(item);}ensureExerciseState(session,item);saveJSON(STORAGE_KEYS.sessions,state.sessions);els.addExerciseDialog.close();els.customName.value='';els.customNote.value='';els.saveCustomDay.checked=false;renderDayTabs();renderWorkout();}
function toggleWorkoutTimer(){const session=getOrCreateSession(localDateKey(),getWorkout(state.selectedDay));if(session.timerStartedAt){session.timerElapsed=getWorkoutElapsed(session);session.timerStartedAt=null;stopWorkoutTimer();}else{session.timerStartedAt=Date.now();startWorkoutTimer();}saveJSON(STORAGE_KEYS.sessions,state.sessions);renderWorkoutTimer();}
function getWorkoutElapsed(session){return (session.timerElapsed||0)+(session.timerStartedAt?Math.floor((Date.now()-session.timerStartedAt)/1000):0);}
function startWorkoutTimer(){stopWorkoutTimer();state.workoutTimer.interval=setInterval(renderWorkoutTimer,1000);state.workoutTimer.running=true;}
function stopWorkoutTimer(){if(state.workoutTimer.interval)clearInterval(state.workoutTimer.interval);state.workoutTimer.interval=null;state.workoutTimer.running=false;}
function renderWorkoutTimer(){const session=getOrCreateSession(localDateKey(),getWorkout(state.selectedDay));els.workoutTimerDisplay.textContent=formatDuration(getWorkoutElapsed(session));els.workoutTimerToggle.textContent=session.timerStartedAt?'Pause':'Start';if(session.timerStartedAt&&!state.workoutTimer.interval)startWorkoutTimer();}
function formatDuration(seconds){const s=Math.max(0,Number(seconds)||0),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${m}:${String(sec).padStart(2,'0')}`;}

function renderSettings() {
  els.unitSelect.value = state.settings.unit;
  els.soundToggle.checked = state.settings.sound;
  els.prefillToggle.checked = state.settings.prefill;
}

function saveSettings() {
  saveJSON(STORAGE_KEYS.settings, state.settings);
}

function setTimerPreset(seconds, updateButtons = true) {
  state.timer.preset = seconds;
  state.timer.remaining = seconds;
  stopTimer(false);
  if (updateButtons) {
    document.querySelectorAll('.timer-preset').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.seconds) === seconds);
    });
  } else {
    document.querySelectorAll('.timer-preset').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.seconds) === seconds);
    });
  }
  renderTimer();
}

function toggleTimer() {
  state.timer.running ? stopTimer() : startTimer();
}

function startTimer() {
  if (state.timer.running) return;
  if (state.timer.remaining <= 0) state.timer.remaining = state.timer.preset;
  state.timer.running = true;
  state.timer.endAt = Date.now() + state.timer.remaining * 1000;
  state.timer.interval = window.setInterval(tickTimer, 250);
  renderTimer();
}

function tickTimer() {
  state.timer.remaining = Math.max(0, Math.ceil((state.timer.endAt - Date.now()) / 1000));
  renderTimer();
  if (state.timer.remaining <= 0) {
    stopTimer(false);
    els.timerLabel.textContent = 'Rest complete';
    if (state.settings.sound) playTimerTone();
    if ('vibrate' in navigator) navigator.vibrate([160, 80, 160]);
  }
}

function stopTimer(render = true) {
  if (state.timer.interval) clearInterval(state.timer.interval);
  state.timer.interval = null;
  state.timer.running = false;
  if (render) renderTimer();
}

function resetTimer() {
  stopTimer(false);
  state.timer.remaining = state.timer.preset;
  renderTimer();
}

function renderTimer() {
  els.timerDisplay.textContent = formatTime(state.timer.remaining);
  els.timerLabel.textContent = state.timer.running ? 'Tap to pause' : 'Tap to start';
  els.timerDock.classList.toggle('running', state.timer.running);
}

function playTimerTone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 740;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.45);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.48);
  } catch (_) { /* Sound is optional. */ }
}

function setupInstallHandling() {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    state.installPrompt = event;
  });

  els.installButton.addEventListener('click', async () => {
    if (state.installPrompt) {
      state.installPrompt.prompt();
      await state.installPrompt.userChoice;
      state.installPrompt = null;
      return;
    }

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    els.installDialogContent.innerHTML = isIOS
      ? '<p>In Safari, tap the <strong>Share</strong> button, choose <strong>Add to Home Screen</strong>, and then tap <strong>Add</strong>.</p>'
      : '<p>Open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>. If that option is not shown, create a bookmark for quick access.</p>';
    els.installDialog.showModal();
  });
}

function confirmAction(title, message, callback) {
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  const handler = event => {
    els.confirmDialog.removeEventListener('close', handler);
    if (els.confirmDialog.returnValue === 'confirm') callback();
  };
  els.confirmDialog.addEventListener('close', handler);
  els.confirmDialog.showModal();
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed', zIndex: 80, left: '50%', bottom: '220px', transform: 'translateX(-50%)',
    padding: '10px 14px', borderRadius: '12px', background: '#e2e8f0', color: '#0f172a',
    fontWeight: '800', fontSize: '0.82rem', boxShadow: '0 12px 30px rgba(0,0,0,.3)'
  });
  document.body.append(toast);
  setTimeout(() => toast.remove(), 1800);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
}

function getWorkout(id) {
  return WORKOUTS.find(workout => workout.id === id) || WORKOUTS[0];
}

function getSuggestedWorkoutId() {
  const day = new Date().getDay();
  if (day === 1) return 'monday';
  if (day === 2) return 'tuesday';
  if (day === 4) return 'thursday';
  if (day === 6) return 'saturday';
  const next = [
    { day: 1, id: 'monday' }, { day: 2, id: 'tuesday' }, { day: 4, id: 'thursday' }, { day: 6, id: 'saturday' }
  ].map(item => ({ ...item, distance: (item.day - day + 7) % 7 || 7 }))
    .sort((a, b) => a.distance - b.distance)[0];
  return next.id;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(date);
}

function formatHistoryDate(iso) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(iso));
}

function formatTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (_) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* Storage may be unavailable in private mode. */ }
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function escapeAttribute(value) {
  return escapeHTML(value);
}
