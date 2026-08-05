class Component extends DCLogic {
  state = {
    role: 'parent', pScreen: 'home', cScreen: 'join',
    foodDay: 5, weekShared: false,
    openEvent: -1, reportSent: false, moodZ: 'Happy', moodT: 'Calm', reportNote: '', medGiven: false,
    chatInput: '', pStatus: 'Busy', cAiMsgs: [], cAiTyping: false, camOpen: false, camMode: 'photo', lessonOpen: false, quizPick: null,
    audit: [
      {time: '11:15 AM', cat: 'MONEY', text: 'Requested \u20a64,500 market money \u2014 wipes, Milo, fruits'},
      {time: '10:30 AM', cat: 'CARE', text: 'Started Tobi\u2019s nap timer'},
      {time: '9:40 AM', cat: 'MEDIA', text: '2 photos captured in-app \u2192 family vault (not on her phone)'},
      {time: '8:40 AM', cat: 'System', text: 'Asked CEeven: \u201cHow do I remove palm oil stain from a school uniform?\u201d'},
      {time: '7:20 AM', cat: 'CARE', text: 'Marked breakfast done \u2014 Zara ate all, Tobi half'},
      {time: '7:02 AM', cat: 'DUTY', text: 'Checked in for the day'},
    ], cgDuty: 'in', sosOpen: false, sosSent: false, listening: false, shopInput: '',
    tScreen: 'today', sess: 'before', recap: false, quizLogged: false, hwAssigned: false, openStudent: 0, chatThread: 'nanny',
    tPlan: [
      {name: 'Warm-up: number bonds to 10 (Zara)', done: false, rate: null, ev: 0},
      {name: 'Fractions \u2014 halves & quarters, workbook p.33', done: false, rate: null, ev: 0},
      {name: 'Phonics: sounds M, S, T with flashcards (Tobi)', done: false, rate: null, ev: 0},
      {name: 'Wrap-up quiz + set homework', done: false, rate: null, ev: 0}],
    tTopicInput: '', camFor: null,
    tMsgs: [
      {from: 't', text: 'Good evening Ma. Zara scored 8/10 on fractions today \u2014 big jump from 5/10 last week. Full recap is in your Learning tab.', time: 'Thu 5:35 PM'},
      {from: 'p', text: 'Wonderful, thank you! So I don\u2019t need to check her workbook?', time: 'Thu 6:02 PM'},
      {from: 't', text: 'Not at all \u2014 everything is marked with corrections inside. Just try the dinner question \ud83d\ude0a', time: 'Thu 6:04 PM'}],
    shopping: [
      {name: 'Diapers size 4', by: 'Blessing', got: false},
      {name: 'Peak milk (tin)', by: 'Blessing', got: false},
      {name: 'Cooking gas refill', by: 'Mummy', got: false},
      {name: 'Fruits for the week', by: 'Mummy', got: true},
    ],
    msgs: [
      {from: 'c', text: 'Good morning Ma! Zara ate all her breakfast today \ud83c\udf89', time: '7:20 AM'},
      {from: 'p', text: 'Wonderful! Please remember Tobi\u2019s vitamin at 2pm', time: '7:24 AM'},
      {from: 'c', text: 'Yes Ma, the app already reminded me. I will mark it when done.', time: '7:25 AM'},
    ],
    cMeals: [
      {slot: 'BREAKFAST', time: '7:00', dish: 'Pap & akara', note: 'No sugar in Zara\u2019s pap \u00b7 Tobi: half portion, cooled', done: true},
      {slot: 'LUNCH', time: '12:30', dish: 'Jollof rice & grilled chicken', note: 'Small portions \u00b7 no pepper for Tobi', done: false},
      {slot: 'SNACK', time: '16:00', dish: 'Watermelon & garden eggs', note: 'Wash fruit twice', done: false},
      {slot: 'DINNER', time: '18:30', dish: 'Beans porridge & plantain', note: 'Soft beans for Tobi \u00b7 dinner before 7', done: false},
    ],
    events: [
      {dow: 'TUE', dom: '5', name: 'Zara\u2019s swimming lesson', meta: '4:00 PM \u00b7 Ikoyi Club \u00b7 Blessing takes her', note: 'Leave home by 3:30 \u2014 traffic on Awolowo Rd. Daddy picks them up at 5:30.',
        prep: [{name: 'Pack towel & swimsuit', done: true}, {name: 'Armbands & swim cap', done: true}, {name: 'Snack & water bottle', done: false}, {name: 'Extra change of clothes', done: false}, {name: 'Sunscreen (in bathroom cabinet)', done: false}]},
      {dow: 'SAT', dom: '9', name: 'Emeka\u2019s birthday party', meta: '12:00 PM \u00b7 Zara & Tobi attending', note: 'Gift is on the dining table. Party ends 4 PM \u2014 Mummy will pick them up.',
        prep: [{name: 'Wrap the gift', done: false}, {name: 'Iron Zara\u2019s yellow dress', done: false}, {name: 'Pack spare clothes for Tobi', done: false}, {name: 'Charge the camera / phone', done: false}]},
      {dow: 'MON', dom: '11', name: 'Tobi\u2019s vaccination', meta: '9:00 AM \u00b7 Dr Adichie, Lekki Clinic', note: 'Mummy is taking him \u2014 Blessing stays home with Zara.',
        prep: [{name: 'Find the red health card', done: false}, {name: 'Pack water & light snack', done: false}]},
    ],
    moneyRequests: [
      {id: 1, amount: '4,500', purpose: 'Baby wipes \u00d72, Milo refill, fruits for the week', status: 'approved', receipt: null, spentAmount: null, spentDesc: null},
    ],
    showMoneyForm: false,
    moneyAmount: '',
    moneyPurpose: '',
    lowStock: [
      {name: 'Diapers size 4', flagged: true},
      {name: 'Peak milk (tin)', flagged: true},
      {name: 'Baby wipes', flagged: false},
    ],
    lowStockInput: '',
    showEventForm: false,
    newEventName: '',
    newEventDow: '',
    newEventTime: '',
    newEventNote: '',
    calSub: '',
  };
  toast(msg) {
    clearTimeout(this._tt);
    this.setState({toast: msg});
    this._tt = setTimeout(() => this.setState({toast: null}), 2200);
  }
  _moods(key, cur) {
    return [
      {icon: '\ud83d\ude04', name: 'Happy'}, {icon: '\ud83d\ude0c', name: 'Calm'}, {icon: '\ud83d\ude22', name: 'Fussy'}, {icon: '\ud83d\ude21', name: 'Unwell'},
    ].map(m => ({...m, pick: () => this.setState({[key]: m.name}),
      style: {flex: 1, border: '1.5px solid ' + (cur === m.name ? '#3B2513' : '#E6EBF3'), background: cur === m.name ? '#F7E8D4' : '#fff', borderRadius: 8, padding: '8px 2px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 11, color: '#3B2513', cursor: 'pointer'}}));
  }
  _audit(cat, text) {
    this.setState({audit: [{time: '9:41 AM', cat, text}, ...this.state.audit]});
  }
  _addShop() {
    const t = this.state.shopInput.trim();
    if (!t) return;
    const by = this.state.role === 'parent' ? 'Mummy' : 'Blessing';
    this.setState({shopping: [...this.state.shopping, {name: t, by, got: false}], shopInput: ''});
    if (by === 'Blessing') this._audit('MONEY', 'Added \u201c' + t + '\u201d to the market list');
    this.toast('Added \u2014 ' + (this.state.role === 'parent' ? 'Blessing' : 'Mummy') + ' sees it too');
  }
  _addTopic() {
    const t = this.state.tTopicInput.trim();
    if (!t) return;
    this.setState({tPlan: [...this.state.tPlan, {name: t, done: false, rate: null, ev: 0}], tTopicInput: ''});
    this.toast('Topic added \u2014 Funke sees the plan update');
  }
  _send() {
    const t = this.state.chatInput.trim();
    if (!t) return;
    const st = this.state, tutorThread = st.role === 'tutor' || (st.role === 'parent' && st.chatThread === 'tutor');
    const from = st.role === 'parent' ? 'p' : st.role === 'tutor' ? 't' : 'c';
    if (tutorThread) this.setState({tMsgs: [...st.tMsgs, {from, text: t, time: '9:41 AM'}], chatInput: ''});
    else this.setState({msgs: [...st.msgs, {from, text: t, time: '9:41 AM'}], chatInput: ''});
  }
  _addLowStock() {
    const t = this.state.lowStockInput.trim();
    if (!t) return;
    this.setState({lowStock: [...this.state.lowStock, {name: t, flagged: true}], lowStockInput: ''});
    this._audit('CARE', 'Flagged low stock: ' + t);
    this.toast('Flagged \u2014 Mummy sees it in the report');
  }
  renderVals() {
    const s = this.state, B = '#3B2513', tan = '#E0BFA0', mut = '#B9A38F';
    const isP = s.role === 'parent', isT = s.role === 'tutor', pc = isP ? s.pScreen : null, cc = s.role === 'caregiver' ? s.cScreen : null, tc = isT ? s.tScreen : null;
    const thread = isT ? 'tutor' : (isP ? s.chatThread : 'nanny');
    const thBtn = on => ({flex: 1, border: 'none', borderRadius: 99, padding: '8px 10px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 12, cursor: 'pointer', background: on ? '#3B2513' : 'transparent', color: on ? '#FFF9F0' : '#6B7280'});
    const objDone = s.tPlan.filter(p => p.done).length;
    const offline = this.props.offlineMode ?? false;
    const roleBtn = on => ({border: 'none', borderRadius: 7, padding: '9px 18px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 13, cursor: 'pointer', background: on ? B : 'transparent', color: on ? '#FFF9F0' : '#6B7280'});
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const menus = [
      [{slot: 'BREAKFAST', time: '7:00 AM', dish: 'Akara & pap', note: 'No sugar for Zara.'}, {slot: 'LUNCH', time: '12:30 PM', dish: 'Rice & fish stew', note: 'Debone fish well for Tobi.'}, {slot: 'SNACK', time: '4:00 PM', dish: 'Banana & tigernuts', note: 'No tigernuts for Tobi.'}, {slot: 'DINNER', time: '6:30 PM', dish: 'Yam porridge', note: 'Soft pieces for Tobi.'}],
      [{slot: 'BREAKFAST', time: '7:00 AM', dish: 'Bread, egg & Milo', note: 'Milo without sugar for Zara.'}, {slot: 'LUNCH', time: '12:30 PM', dish: 'Spaghetti jollof', note: 'Cut short for Tobi.'}, {slot: 'SNACK', time: '4:00 PM', dish: 'Pawpaw slices', note: 'Zara\u2019s favourite.'}, {slot: 'DINNER', time: '6:30 PM', dish: 'Beans & fried plantain', note: 'Early dinner \u2014 swimming day.'}],
      [{slot: 'BREAKFAST', time: '7:00 AM', dish: 'Oats & banana', note: 'Warm, not hot, for Tobi.'}, {slot: 'LUNCH', time: '12:30 PM', dish: 'Amala & ewedu', note: 'Small amala for Zara.'}, {slot: 'SNACK', time: '4:00 PM', dish: 'Cucumber & carrot sticks', note: 'With yoghurt dip.'}, {slot: 'DINNER', time: '6:30 PM', dish: 'Rice & vegetable sauce', note: 'Extra veg for both.'}],
      [{slot: 'BREAKFAST', time: '7:00 AM', dish: 'Moi moi & pap', note: 'Check moi moi has no fish bones.'}, {slot: 'LUNCH', time: '12:30 PM', dish: 'Eba & okro soup', note: 'Tobi eats rice instead.'}, {slot: 'SNACK', time: '4:00 PM', dish: 'Orange slices', note: 'Wash twice.'}, {slot: 'DINNER', time: '6:30 PM', dish: 'Noodles & egg', note: 'Once a week treat.'}],
      [{slot: 'BREAKFAST', time: '7:00 AM', dish: 'Yam & egg sauce', note: 'Soft yam centre for Tobi.'}, {slot: 'LUNCH', time: '12:30 PM', dish: 'Fried rice & chicken', note: 'Shred chicken for Tobi.'}, {slot: 'SNACK', time: '4:00 PM', dish: 'Puff puff (2 each)', note: 'Friday treat \u2014 no more than 2!'}, {slot: 'DINNER', time: '6:30 PM', dish: 'Pepper-free ofada', note: 'Zara helps set the table.'}],
      [{slot: 'BREAKFAST', time: '7:00 AM', dish: 'Pap & akara', note: 'No sugar in Zara\u2019s pap \u00b7 Tobi half portion.'}, {slot: 'LUNCH', time: '12:30 PM', dish: 'Jollof rice & grilled chicken', note: 'Small portions \u00b7 no pepper for Tobi.'}, {slot: 'SNACK', time: '4:00 PM', dish: 'Watermelon & garden eggs', note: 'Wash fruit twice.'}, {slot: 'DINNER', time: '6:30 PM', dish: 'Beans porridge & plantain', note: 'Soft beans for Tobi.'}],
      [{slot: 'BREAKFAST', time: '8:00 AM', dish: 'Pancakes & fruit', note: 'Sunday late breakfast after church.'}, {slot: 'LUNCH', time: '1:30 PM', dish: 'Rice, stew & salad', note: 'Family lunch \u2014 Mummy cooks!'}, {slot: 'SNACK', time: '4:30 PM', dish: 'Chin chin (small bowl)', note: 'Share one bowl.'}, {slot: 'DINNER', time: '6:30 PM', dish: 'Light: bread & tea', note: 'Early bedtime for school.'}],
    ];
    const swim = s.events[0], swimDone = swim.prep.filter(p => p.done).length;
    const prepRow = (evIdx, pIdx, p) => ({
      ...p,
      toggle: () => { const events = s.events.map((e, i) => i !== evIdx ? e : {...e, prep: e.prep.map((q, j) => j !== pIdx ? q : {name: q.name, done: !q.done})}); this.setState({events}); if (!p.done && !isP) this.toast('Ticked \u2014 Mummy sees it live'); },
      row: {display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer'},
      circle: {width: 22, height: 22, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.done ? '#009061' : '#fff', border: p.done ? '1.5px solid #009061' : '1.5px solid #CCD2DC'},
      text: {fontSize: 13.5, color: p.done ? '#6B7280' : '#1F2937', fontWeight: 600, textDecoration: p.done ? 'line-through' : 'none'},
    });

    const latestReq = s.moneyRequests[s.moneyRequests.length - 1];
    const reqApproved = latestReq && latestReq.status === 'approved';
    const reqPending = latestReq && latestReq.status === 'pending';
    const reqDeclined = latestReq && latestReq.status === 'declined';

    return {
      offline, isParent: isP,
      setParent: () => this.setState({role: 'parent'}),
      setCaregiver: () => this.setState({role: 'caregiver'}),
      setTutor: () => this.setState({role: 'tutor'}),
      roleParentStyle: roleBtn(isP), roleCareStyle: roleBtn(s.role === 'caregiver'), roleTutorStyle: roleBtn(isT),
      showPHome: pc === 'home', showFood: pc === 'food',
      showCalendar: pc === 'calendar' || cc === 'calendar',
      showChat: pc === 'chat' || cc === 'chat' || tc === 'chat',
      showJoin: cc === 'join', showWelcome: cc === 'welcome',
      showCToday: cc === 'today', showCReport: cc === 'report',
      showAsk: cc === 'ask', showAudit: pc === 'audit',
      goAsk: () => this.setState({cScreen: 'ask'}), goAudit: () => this.setState({pScreen: 'audit'}),
      nAsk: cc === 'ask' ? B : mut,
      showPNav: isP, showCNav: cc !== null && cc !== 'join' && cc !== 'welcome', showTNav: isT,
      goHome: () => this.setState({pScreen: 'home'}), goFood: () => this.setState({pScreen: 'food'}),
      goCalendar: () => { this.setState({showEventForm: false}); if (isP) this.setState({pScreen: 'calendar'}); else this.setState({cScreen: 'calendar'}); },
      goChat: () => this.setState({pScreen: 'chat'}),
      goToday: () => this.setState({cScreen: 'today'}), goCCal: () => this.setState({cScreen: 'calendar'}),
      goReport: () => this.setState({cScreen: 'report'}), goCChat: () => this.setState({cScreen: 'chat'}),
      nHome: pc === 'home' ? B : mut, nFood: pc === 'food' ? B : mut, nCal: (pc === 'calendar' || cc === 'calendar') ? B : mut, nChat: (pc === 'chat' || cc === 'chat') ? B : mut,
      nToday: cc === 'today' ? B : mut, nCCal: cc === 'calendar' ? B : mut, nRep: cc === 'report' ? B : mut, nCChat: cc === 'chat' ? B : mut,
      joinFamily: () => this.setState({cScreen: 'welcome'}),
      enterApp: () => this.setState({cScreen: 'today'}),
      otp: ['A', 'D', 'Y', '4', '8', '2'].map(c => ({c})),
      approvalPending: reqPending, approvalDone: reqApproved, approvalDeclined: reqDeclined,
      approve: () => { const moneyRequests = s.moneyRequests.map((r, i) => i === s.moneyRequests.length - 1 ? {...r, status: 'approved'} : r); this.setState({moneyRequests}); this._audit('MONEY', 'Approved \u20a6' + latestReq.amount + ' market money'); this.toast('Blessing has been notified \u2014 approved!'); },
      decline: () => { const moneyRequests = s.moneyRequests.map((r, i) => i === s.moneyRequests.length - 1 ? {...r, status: 'declined'} : r); this.setState({moneyRequests}); this._audit('MONEY', 'Declined \u20a6' + latestReq.amount + ' market money request'); this.toast('Blessing has been notified \u2014 declined'); },
      reqAmount: latestReq ? latestReq.amount : '0',
      reqPurpose: latestReq ? latestReq.purpose : '',
      swimDone, swimTotal: swim.prep.length,
      feed: [
        {title: 'Breakfast finished', sub: 'Zara ate everything \u00b7 Tobi ate half \u2014 Blessing', time: '7:20 AM', c: '#009061'},
        {title: 'Photo added', sub: 'Zara reading her picture book', time: '10:15 AM', c: '#3B82F6'},
        {title: 'Nap started', sub: 'Tobi went down easily today', time: '10:30 AM', c: '#9A6033'},
        ...(s.sess !== 'before' ? [{title: 'Mr Daniel checked in', sub: 'Maths & Phonics session \u2014 verified in-app', time: '4:02 PM', c: '#3B82F6'}] : []),
        ...(s.recap ? [{title: 'Tutoring recap arrived', sub: 'Zara 8/10 fractions \u00b7 Tobi +2 letter sounds \u2014 nothing to mark', time: '5:31 PM', c: '#9A6033'}] : []),
      ].map(e => ({...e, dot: {width: 10, height: 10, flex: 'none', borderRadius: '50%', background: e.c, marginTop: 4}})),
      week: dayNames.map((name, i) => {
        const sel = s.foodDay === i;
        return {name, num: ['28', '29', '30', '31', '1', '2', '3'][i], pick: () => this.setState({foodDay: i}),
          style: {flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '9px 0', borderRadius: 8, cursor: 'pointer', background: sel ? B : '#fff', color: sel ? '#FFF9F0' : '#6B7280', border: sel ? '1px solid ' + B : '1px solid #E6EBF3'}};
      }),
      meals: menus[s.foodDay],
      dayName: dayNames[s.foodDay],
      weekShared: s.weekShared,
      shareDay: () => this.toast(dayNames[s.foodDay] + '\u2019s menu sent to Blessing'),
      shareWeek: () => { this.setState({weekShared: true}); this.toast('Full week shared with Blessing'); },
      calSub: isP ? 'Add an event, attach a get-ready checklist \u2014 Blessing knows exactly what to do.' : 'What\u2019s coming up, and what Mummy needs you to prepare.',
      events: s.events.map((e, i) => {
        const dn = e.prep.filter(p => p.done).length, all = dn === e.prep.length;
        return {...e,
          open: () => this.setState({openEvent: s.openEvent === i ? -1 : i}),
          isOpen: s.openEvent === i,
          datebox: {width: 46, height: 46, borderRadius: 8, background: i === 0 ? '#EFF6FF' : '#F7E8D4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 'none', color: i === 0 ? '#3B82F6' : '#9A6033'},
          chip: {fontFamily: 'Urbanist', fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 99, flex: 'none', background: all ? '#E1F5EC' : '#F9F1E6', color: all ? '#009061' : '#FF9A01'},
          chipLabel: dn + '/' + e.prep.length + ' READY',
          prepLabel: 'GET-READY CHECKLIST' + (isP ? ' \u2014 ASSIGNED TO BLESSING' : ''),
          prep: e.prep.map((p, j) => prepRow(i, j, p)),
        };
      }),
      chatName: isP ? (thread === 'tutor' ? 'Mr Daniel \u2014 Tutor' : 'Aunty Blessing') : isT ? 'Mrs Funke (Parent)' : 'Mrs Funke (Mummy)',
      chatAvatar: isP ? (thread === 'tutor' ? 'D' : 'B') : 'F',
      showThreads: isP, showPin: thread !== 'tutor',
      threadNanny: () => this.setState({chatThread: 'nanny'}), threadTutor: () => this.setState({chatThread: 'tutor'}),
      thNannyStyle: thBtn(thread !== 'tutor'), thTutorStyle: thBtn(thread === 'tutor'),
      msgs: (thread === 'tutor' ? s.tMsgs : s.msgs).map(m => {
        const mine = (isP && m.from === 'p') || (isT && m.from === 't') || (s.role === 'caregiver' && m.from === 'c');
        return {...m, row: {display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start'},
          bubble: {maxWidth: '78%', padding: '10px 14px', borderRadius: mine ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: mine ? B : '#fff', color: mine ? '#FFF9F0' : '#1F2937', border: mine ? 'none' : '1px solid #E6EBF3'},
          time_style: {fontSize: 10.5, marginTop: 4, textAlign: 'right', color: mine ? tan : '#6B7280', fontFamily: 'Urbanist'}};
      }),
      chatInput: s.chatInput,
      onChatInput: e => this.setState({chatInput: e.target.value}),
      onChatKey: e => { if (e.key === 'Enter') this._send(); },
      sendMsg: () => this._send(),
      syncChip: {fontFamily: 'Urbanist', fontSize: 11, fontWeight: 700, padding: '5px 11px', borderRadius: 99, background: offline ? '#F9F1E6' : '#E1F5EC', color: offline ? '#FF9A01' : '#009061', flex: 'none'},
      syncLabel: offline ? '3 queued \u00b7 will sync' : 'All synced',
      logMeal: () => this.toast('Meal logged \u2014 Mummy notified'), logNap: () => this.toast('Nap timer started'),
      logDiaper: () => this.toast('Diaper change logged'), logPhoto: () => this.toast('Photo sent to family'),
      cMeals: s.cMeals.map((m, i) => ({...m,
        toggle: () => { const cMeals = s.cMeals.map((q, j) => j !== i ? q : {...q, done: !q.done}); this.setState({cMeals}); if (!m.done) this.toast('Meal marked done'); },
        card: {background: '#fff', border: '1px solid ' + (m.done ? '#E1F5EC' : '#E6EBF3'), borderRadius: 8, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', opacity: m.done ? .75 : 1},
        circle: {width: 24, height: 24, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.done ? '#009061' : '#fff', border: m.done ? '1.5px solid #009061' : '1.5px solid #CCD2DC'},
        title: {fontFamily: 'Urbanist', fontWeight: 700, fontSize: 14, color: m.done ? '#6B7280' : '#1F2937', textDecoration: m.done ? 'line-through' : 'none'},
      })),
      giveMed: () => { if (!s.medGiven) { this.setState({medGiven: true}); this._audit('CARE', 'Gave Tobi\u2019s vitamin D drops \u00b7 2:00 PM dose'); this.toast('Medicine marked given \u2014 Mummy notified'); } },
      medBtn: {flex: 'none', background: s.medGiven ? '#E1F5EC' : B, color: s.medGiven ? '#009061' : '#FFF9F0', border: s.medGiven ? '1px solid #009061' : 'none', borderRadius: 8, padding: '9px 14px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 12.5, cursor: 'pointer'},
      medLabel: s.medGiven ? 'Given \u2713' : 'Mark given',
      swimPrep: swim.prep.map((p, j) => prepRow(0, j, p)),
      reportNotSent: !s.reportSent, reportSentFlag: s.reportSent, reportArrived: s.reportSent,
      reportChip: {fontFamily: 'Urbanist', fontSize: 11, fontWeight: 700, padding: '5px 11px', borderRadius: 99, background: s.reportSent ? '#E1F5EC' : '#F9F1E6', color: s.reportSent ? '#009061' : '#FF9A01', flex: 'none'},
      reportChipLabel: s.reportSent ? 'Sent 6:02 PM' : 'Auto-building',
      tobiMedText: s.medGiven ? 'Vitamin D given 2:00 PM' : 'Vitamin D due 2:00 PM',
      tobiMedColor: s.medGiven ? '#009061' : '#FF9A01',
      moodsZ: this._moods('moodZ', s.moodZ), moodsT: this._moods('moodT', s.moodT),
      reportNote: s.reportNote, onReportNote: e => this.setState({reportNote: e.target.value}),
      sendReport: () => { this.setState({reportSent: true}); this._audit('CARE', 'Sent the daily report'); this.toast('Report sent to Mummy & Daddy'); },
      toastOn: !!s.toast, toastMsg: s.toast,
      audit: s.audit.map(a => ({...a,
        dot: {width: 10, height: 10, flex: 'none', borderRadius: '50%', marginTop: 4, background: (a.cat === 'System' || a.cat === 'LEARN') ? '#9A6033' : a.cat === 'MEDIA' ? '#3B82F6' : a.cat === 'MONEY' ? '#FF9A01' : a.cat === 'DUTY' ? '#3B2513' : '#009061'},
        badge: {fontFamily: 'Urbanist', fontSize: 10, fontWeight: 700, letterSpacing: '.06em', padding: '3px 9px', borderRadius: 99, background: (a.cat === 'System' || a.cat === 'LEARN') ? '#F7E8D4' : a.cat === 'MEDIA' ? '#EFF6FF' : a.cat === 'MONEY' ? '#F9F1E6' : a.cat === 'DUTY' ? '#F1E6D6' : '#E1F5EC', color: (a.cat === 'System' || a.cat === 'LEARN') ? '#9A6033' : a.cat === 'MEDIA' ? '#3B82F6' : a.cat === 'MONEY' ? '#FF9A01' : a.cat === 'DUTY' ? '#3B2513' : '#009061'},
      })),
      auditCount: s.audit.length + ' actions', auditLatest: s.audit[0].text,
      cAiEmpty: s.cAiMsgs.length === 0 && !s.cAiTyping && !s.lessonOpen, cAiHasMsgs: s.cAiMsgs.length > 1 && !s.lessonOpen, cAiTyping: s.cAiTyping && !s.lessonOpen,
      lessonView: s.lessonOpen,
      openLessonC: () => this.setState({lessonOpen: true, quizPick: null}),
      closeLessonC: () => this.setState({lessonOpen: false, quizPick: null}),
      cLessons: [
        {icon: '\ud83c\udf21\ufe0f', name: 'Managing a mild fever', meta: '6 min \u00b7 quiz \u00b7 badge', st: 'NEW'},
        {icon: '\ud83e\uddfa', name: 'Removing stains from uniforms', meta: '4 min \u00b7 practical demo', st: 'NEW'},
        {icon: '\ud83c\udf5a', name: 'Safe feeding for toddlers', meta: '8 min \u00b7 completed June', st: 'DONE'},
      ].map(l => ({...l, status: l.st, badge: {fontFamily: 'Urbanist', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99, flex: 'none', background: l.st === 'DONE' ? '#E1F5EC' : '#F9F1E6', color: l.st === 'DONE' ? '#009061' : '#FF9A01'}})),
      quiz: [
        {k: 'a', label: 'Use a kitchen teaspoon instead', ok: false},
        {k: 'b', label: 'Message Mummy in the app before giving anything', ok: true},
        {k: 'c', label: 'Skip the dose and say nothing', ok: false},
      ].map(q => ({label: q.label, pick: () => this.setState({quizPick: q.k}),
        style: {textAlign: 'left', background: s.quizPick === q.k ? (q.ok ? '#E1F5EC' : '#FDE8E8') : '#fff', border: '1.5px solid ' + (s.quizPick === q.k ? (q.ok ? '#009061' : '#CD3030') : '#E6EBF3'), borderRadius: 8, padding: '12px 15px', fontFamily: 'Urbanist', fontSize: 13, fontWeight: 600, color: '#1F2937', cursor: 'pointer'}})),
      quizCorrect: s.quizPick === 'b', quizWrong: s.quizPick !== null && s.quizPick !== 'b',
      completeLessonC: () => { this.setState({lessonOpen: false, quizPick: null}); this._audit('LEARN', 'Completed lesson: Giving medicine safely \u00b7 earned a badge'); this.toast('Badge earned: Medicine Safety \ud83c\udf89'); },
      cAiReset: () => this.setState({cAiMsgs: [], cAiTyping: false}),
      cAiPrompts: [
        {icon: '\ud83e\uddfa', label: 'How do I remove a stain from Zara\u2019s uniform?', reply: 'For palm oil or food stains: 1) Don\u2019t use hot water first \u2014 it sets the stain. 2) Rub a little dish soap on it and leave for 10 minutes. 3) Wash with warm water and detergent. 4) Dry in the sun. If it remains, repeat before ironing.'},
        {icon: '\ud83c\udf21\ufe0f', label: 'Zara feels warm. What do I do first?', reply: 'Stay calm. 1) Check her temperature \u2014 the thermometer is in the medicine drawer. 2) If above 37.5\u00b0C, remove heavy clothing and give water. 3) Message Mummy now \u2014 I\u2019ve made that one tap from here. Never give medicine without asking first.'},
        {icon: '\ud83c\udf5a', label: 'What is for lunch and how do I make it?', reply: 'Today\u2019s lunch is jollof rice with grilled chicken at 12:30. Mummy\u2019s notes: small portions, NO pepper for Tobi, and remember no groundnut oil (Zara\u2019s allergy). The full recipe is in the family recipe book \u2014 want me to read it step by step?'},
        {icon: '\ud83c\udfb2', label: 'What can Tobi play inside when it rains?', reply: 'Good ones for 18 months: 1) Pot-and-spoon drumming (his favourite sounds!). 2) Hide the teddy \u2014 hide it under a cloth and let him find it. 3) Stacking cups. Keep small objects away \u2014 anything smaller than his fist can choke.'},
      ].map(p => ({...p, pick: () => {
        this._audit('System', 'Asked CEeven: \u201c' + p.label + '\u201d');
        this.setState({cAiMsgs: [...s.cAiMsgs, {mine: true, text: p.label}], cAiTyping: true});
        setTimeout(() => this.setState({cAiMsgs: [...this.state.cAiMsgs, {mine: false, text: p.reply}], cAiTyping: false}), 1200);
      }})),
      cAiMsgs: (s.lessonOpen ? [] : s.cAiMsgs).map(m => ({...m,
        row: {display: 'flex', justifyContent: m.mine ? 'flex-end' : 'flex-start'},
        bubble: {maxWidth: '86%', padding: '11px 15px', fontSize: 13.5, lineHeight: 1.55, borderRadius: m.mine ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: m.mine ? B : '#fff', color: m.mine ? '#FFF9F0' : '#1F2937', border: m.mine ? 'none' : '1px solid #E6EBF3'}})),
      camOpen: s.camOpen, camIsVideo: s.camMode === 'video',
      openCam: () => this.setState({camOpen: true}),
      closeCam: () => this.setState({camOpen: false}),
      camPhoto: () => this.setState({camMode: 'photo'}),
      camVideo: () => this.setState({camMode: 'video'}),
      camPhotoStyle: {border: 'none', borderRadius: 99, padding: '7px 16px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 12, cursor: 'pointer', background: s.camMode === 'photo' ? '#E0BFA0' : 'transparent', color: s.camMode === 'photo' ? '#3B2513' : '#E0BFA0'},
      camVideoStyle: {border: 'none', borderRadius: 99, padding: '7px 16px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 12, cursor: 'pointer', background: s.camMode === 'video' ? '#E0BFA0' : 'transparent', color: s.camMode === 'video' ? '#3B2513' : '#E0BFA0'},
      camHint: s.camMode === 'video' ? 'Max 60 seconds \u00b7 uploads when done' : 'Tap to capture',
      capture: () => {
        const isV = s.camMode === 'video';
        if (!isT) this._audit('MEDIA', (isV ? '1 video' : '1 photo') + ' captured in-app \u2192 family vault (not on her phone)');
        if (isT && s.camFor !== null) {
          const tPlan = s.tPlan.map((q, j) => j !== s.camFor ? q : {...q, ev: q.ev + 1});
          this.setState({tPlan, camOpen: false, camFor: null});
          this.toast('Evidence \u2192 vault, attached to topic \u2713');
          return;
        }
        this.setState({camOpen: false, camFor: null});
        this.toast(isT ? 'Work sample \u2192 family vault \u2713 (not on this phone)' : (isV ? 'Video' : 'Photo') + ' sent to family vault \u2713');
      },
      statusPills: ['Free', 'Busy', 'In court'].map(p => ({name: p, pick: () => this.setState({pStatus: p}),
        style: {border: 'none', borderRadius: 99, padding: '6px 12px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 11.5, cursor: 'pointer', background: s.pStatus === p ? B : 'transparent', color: s.pStatus === p ? '#FFF9F0' : '#6B7280'}})),
      dutyDot: {width: 9, height: 9, borderRadius: '50%', flex: 'none', background: s.cgDuty === 'in' ? '#009061' : s.cgDuty === 'closed' ? '#6B7280' : '#FF9A01'},
      dutyLabel: s.cgDuty === 'in' ? 'Blessing on duty since 7:02 AM' : s.cgDuty === 'closed' ? 'Blessing closed the day at 6:15 PM' : 'Blessing has not arrived yet',
      notCheckedIn: s.cgDuty === 'out', onDuty: s.cgDuty === 'in', dayClosed: s.cgDuty === 'closed',
      checkIn: () => { this.setState({cgDuty: 'in'}); this._audit('DUTY', 'Checked in for the day'); this.toast('Checked in \u2014 Mummy & Daddy notified'); },
      closeDay: () => { this.setState({cgDuty: 'closed'}); this._audit('DUTY', 'Closed the day \u00b7 handover sent'); this.toast('Handover sent \u2014 well done today! \ud83c\udf89'); },
      mummyStatus: s.pStatus === 'Free' ? 'Mummy is free to talk' : s.pStatus === 'Busy' ? 'Mummy is busy' : 'Mummy is in court',
      mummyBusyBanner: !isP && s.pStatus !== 'Free',
      goLearning: () => this.setState({pScreen: 'learning'}),
      showLearning: pc === 'learning',
      showTToday: tc === 'today', showTStudents: tc === 'students',
      goTToday: () => this.setState({tScreen: 'today'}), goTStudents: () => this.setState({tScreen: 'students'}), goTChat: () => this.setState({tScreen: 'chat'}),
      nTT: tc === 'today' ? B : mut, nTS: tc === 'students' ? B : mut, nTChat: tc === 'chat' ? B : mut,
      sessBefore: s.sess === 'before', sessLive: s.sess === 'live', sessDone: s.sess === 'done', recapReady: s.recap,
      tCheckIn: () => { this.setState({sess: 'live'}); this.toast('Checked in 4:02 PM \u2014 Funke can see you\u2019re here'); },
      tEndSession: () => { this.setState({sess: 'done', recap: true}); this.toast('Recap sent to Mummy & Daddy \u2713'); },
      objDone, objTotal: s.tPlan.length,
      objBarStyle: {height: '100%', width: Math.round(objDone / s.tPlan.length * 100) + '%', background: '#009061', borderRadius: 99, transition: 'width .3s'},
      tPlan: s.tPlan.map((p, i) => ({...p,
        toggle: () => { const tPlan = s.tPlan.map((q, j) => j !== i ? q : {...q, done: !q.done}); this.setState({tPlan}); if (!p.done) this.toast('Ticked \u2014 now rate how it went'); },
        row: {display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer'},
        circle: {width: 22, height: 22, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.done ? '#009061' : '#fff', border: p.done ? '1.5px solid #009061' : '1.5px solid #CCD2DC'},
        text: {fontSize: 13.5, color: p.done ? '#6B7280' : '#1F2937', fontWeight: 600, textDecoration: p.done ? 'line-through' : 'none'},
        showRate: p.done,
        evLabel: p.ev > 0 ? '\ud83d\udcf7 ' + p.ev + ' \u2713' : '\ud83d\udcf7 Evidence',
        evStyle: {border: p.ev ? '1.5px solid #009061' : '1.5px dashed #D4A67F', background: p.ev ? '#E1F5EC' : '#fff', color: p.ev ? '#009061' : '#3B2513', borderRadius: 99, padding: '5px 10px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 10.5, cursor: 'pointer', flex: 'none'},
        addEv: () => this.setState({camOpen: true, camFor: i, camMode: 'photo'}),
        rates: ['Struggled', 'Okay', 'Great'].map(r => ({n: r === 'Struggled' ? '\ud83d\ude15 Struggled' : r === 'Okay' ? '\ud83d\ude42 Okay' : '\ud83c\udf1f Great',
          pick: () => { const tPlan = s.tPlan.map((q, j) => j !== i ? q : {...q, rate: r}); this.setState({tPlan}); this.toast('Report saved \u2014 Funke sees it instantly'); },
          style: {flex: 1, border: '1.5px solid ' + (p.rate === r ? '#3B2513' : '#E6EBF3'), background: p.rate === r ? '#F7E8D4' : '#fff', borderRadius: 99, padding: '5px 3px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 10.5, color: '#3B2513', cursor: 'pointer'}})),
      })),
      tTopicInput: s.tTopicInput,
      onTopicInput: e => this.setState({tTopicInput: e.target.value}),
      onTopicKey: e => { if (e.key === 'Enter') this._addTopic(); },
      addTopic: () => this._addTopic(),
      hasReports: s.tPlan.some(p => p.rate || p.ev > 0),
      reportTopics: s.tPlan.filter(p => p.rate || p.ev > 0).map(p => ({name: p.name,
        hasEv: p.ev > 0, evNote: p.ev + ' photo' + (p.ev > 1 ? 's' : ''),
        rateLabel: p.rate === 'Great' ? '\ud83c\udf1f GREAT' : p.rate === 'Okay' ? '\ud83d\ude42 OKAY' : p.rate === 'Struggled' ? '\ud83d\ude15 STRUGGLED' : 'DONE',
        rateChip: {fontFamily: 'Urbanist', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99, flex: 'none', background: p.rate === 'Great' ? '#E1F5EC' : p.rate === 'Okay' ? '#EFF6FF' : p.rate === 'Struggled' ? '#F9F1E6' : '#F1E6D6', color: p.rate === 'Great' ? '#009061' : p.rate === 'Okay' ? '#3B82F6' : p.rate === 'Struggled' ? '#FF9A01' : '#6B7280'}})),
      tLogQuiz: () => { if (!s.quizLogged) { this.setState({quizLogged: true}); this.toast('8/10 logged \u2014 trend updated for Funke'); } },
      quizBtnLabel: s.quizLogged ? 'Quiz 8/10 \u2713' : '\ud83d\udcca Log quiz score',
      quizBtnStyle: {background: s.quizLogged ? '#E1F5EC' : '#fff', border: s.quizLogged ? '1.5px solid #009061' : '1.5px dashed #D4A67F', borderRadius: 8, padding: '11px 6px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 11.5, color: s.quizLogged ? '#009061' : '#3B2513', cursor: 'pointer'},
      tAssignHw: () => { if (!s.hwAssigned) { this.setState({hwAssigned: true}); this.toast('Homework assigned \u2014 due Thursday'); } },
      hwBtnLabel: s.hwAssigned ? 'Assigned \u2713' : '\ud83d\udcdd Assign homework',
      hwBtnStyle: {background: s.hwAssigned ? '#E1F5EC' : '#fff', border: s.hwAssigned ? '1.5px solid #009061' : '1.5px dashed #D4A67F', borderRadius: 8, padding: '11px 6px', fontFamily: 'Urbanist', fontWeight: 700, fontSize: 11.5, color: s.hwAssigned ? '#009061' : '#3B2513', cursor: 'pointer'},
      hwList: [
        {child: 'Zara', task: 'Workbook p.31 \u2014 number bonds', due: 'Last Thu', st: 'MARKED 9/10', done: true},
        ...(s.hwAssigned ? [{child: 'Zara', task: 'Workbook p.34 \u2014 colour the halves', due: 'Due Thu \u00b7 you mark it in-app', st: 'ASSIGNED', done: false}] : []),
      ].map(h => ({...h, chip: {fontFamily: 'Urbanist', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99, flex: 'none', background: h.done ? '#E1F5EC' : '#F9F1E6', color: h.done ? '#009061' : '#FF9A01'}})),
      learnChip: s.sess === 'live' ? 'IN SESSION' : s.recap ? 'RECAP READY' : 'TUE 4:00 PM',
      learnChipStyle: {fontFamily: 'Urbanist', fontWeight: 700, fontSize: 11, padding: '4px 10px', borderRadius: 99, flex: 'none', background: s.sess === 'live' ? '#E1F5EC' : s.recap ? '#F7E8D4' : '#EFF6FF', color: s.sess === 'live' ? '#009061' : s.recap ? '#9A6033' : '#3B82F6', animation: s.sess === 'live' ? 'pulse 1.6s infinite' : 'none'},
      learnLatest: s.sess === 'live' ? ('Mr Daniel in session \u00b7 ' + objDone + '/' + s.tPlan.length + ' objectives done') : s.recap ? 'Zara 8/10 fractions \u00b7 Tobi +2 letter sounds' : 'Next: Tue 4:00 PM \u00b7 Maths & Phonics with Mr Daniel',
      kids: [
        {init: 'Z', name: 'Zara', meta: 'Age 6 \u00b7 Maths & Reading', streak: '4-week streak \ud83d\udd25',
          focus: 'Rushes word problems \u2014 have her read the question aloud twice before answering.',
          quiz: s.quizLogged ? 'Fractions quiz today: 8/10 (was 5/10)' : 'Last quiz: number bonds 9/10',
          hw: s.hwAssigned ? 'Workbook p.34 \u00b7 due Thu \u2014 Mr Daniel marks it' : 'No homework pending \u2014 last one marked 9/10',
          hwOk: !s.hwAssigned,
          topics: [
            {n: 'Counting & number bonds', lv: 'Mastered', pct: 100},
            {n: 'Fractions \u2014 halves & quarters', lv: s.quizLogged ? 'Proficient' : 'Developing', pct: s.quizLogged ? 80 : 55},
            {n: 'Reading \u2014 CVC words', lv: 'Proficient', pct: 75}]},
        {init: 'T', name: 'Tobi', meta: 'Age 3 \u00b7 Phonics & pre-math', streak: 'Week 2',
          focus: 'Best focus before 4:45 \u2014 phonics first, then play-counting.',
          quiz: 'Letter sounds: 14/26 (was 9 in July)',
          hw: 'Too young for homework \u2014 practice games only', hwOk: true,
          topics: [
            {n: 'Letter sounds A\u2013Z', lv: 'Developing', pct: 54},
            {n: 'Counting 1\u201310', lv: 'Proficient', pct: 78},
            {n: 'Pencil grip & tracing', lv: 'Emerging', pct: 30}]},
      ].map((k, i) => ({...k,
        open: () => this.setState({openStudent: s.openStudent === i ? -1 : i}),
        isOpen: s.openStudent === i,
        streakChip: {fontFamily: 'Urbanist', fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 99, flex: 'none', background: '#F7E8D4', color: '#9A6033'},
        hwChip: {fontFamily: 'Urbanist', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99, flex: 'none', background: k.hwOk ? '#E1F5EC' : '#F9F1E6', color: k.hwOk ? '#009061' : '#FF9A01'},
        hwChipLabel: k.hwOk ? 'NOTHING TO MARK' : 'WITH TUTOR',
        topics: k.topics.map(t => ({...t,
          lvChip: {fontFamily: 'Urbanist', fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 99, flex: 'none', background: t.lv === 'Mastered' ? '#E1F5EC' : t.lv === 'Proficient' ? '#EFF6FF' : t.lv === 'Developing' ? '#F9F1E6' : '#F1E6D6', color: t.lv === 'Mastered' ? '#009061' : t.lv === 'Proficient' ? '#3B82F6' : t.lv === 'Developing' ? '#FF9A01' : '#9A6033'},
          bar: {height: '100%', width: t.pct + '%', background: t.lv === 'Mastered' ? '#009061' : t.lv === 'Proficient' ? '#3B82F6' : t.lv === 'Developing' ? '#FF9A01' : '#9A6033', borderRadius: 99}})),
      })),
      shopping: s.shopping.map((it, i) => ({...it,
        toggle: () => { const shopping = s.shopping.map((q, j) => j !== i ? q : {...q, got: !q.got}); this.setState({shopping}); },
        row: {display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F1E6D6', cursor: 'pointer'},
        circle: {width: 22, height: 22, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: it.got ? '#009061' : '#fff', border: it.got ? '1.5px solid #009061' : '1.5px solid #CCD2DC'},
        text: {flex: 1, fontSize: 13.5, color: it.got ? '#6B7280' : '#1F2937', fontWeight: 600, textDecoration: it.got ? 'line-through' : 'none'},
      })),
      shopInput: s.shopInput,
      onShopInput: e => this.setState({shopInput: e.target.value}),
      onShopKey: e => { if (e.key === 'Enter') this._addShop(); },
      addShopItem: () => this._addShop(),
      voiceLog: () => { if (s.listening) return; this.setState({listening: true}); setTimeout(() => { this.setState({listening: false}); this.toast('Logged: \u201cTobi drank one bottle\u201d \u2713'); }, 1400); },
      micStyle: {display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, border: s.listening ? '1.5px solid #CD3030' : '1.5px dashed #D4A67F', background: s.listening ? '#FDE8E8' : '#fff', color: s.listening ? '#CD3030' : '#3B2513', borderRadius: 8, padding: '13px', cursor: 'pointer', animation: s.listening ? 'pulse 1s infinite' : 'none'},
      micLabel: s.listening ? 'Listening\u2026 speak now' : 'Tap to speak \u2014 log anything by voice',
      sosOpen: s.sosOpen, sosSent: s.sosSent,
      openSos: () => this.setState({sosOpen: true}),
      closeSos: () => this.setState({sosOpen: false}),
      sendSos: () => { this.setState({sosOpen: false, sosSent: true}); this._audit('DUTY', '\ud83d\udea8 Pressed Emergency \u2014 both parents alerted'); this.toast('Mummy & Daddy alerted \u2014 help is coming'); },
      sosContacts: [
        {name: 'Mummy (Funke)', sub: '0803 XXX XXXX' + (s.pStatus !== 'Free' ? ' \u00b7 ' + (s.pStatus === 'In court' ? 'in court' : 'busy') : '')},
        {name: 'Daddy (Tunde)', sub: '0805 XXX XXXX'},
        {name: 'Dr Adichie \u2014 paediatrician', sub: '0701 XXX XXXX \u00b7 knows both children'},
      ],

      /* ===== MONEY REQUEST FLOW (FR-C10 / FR-P03 / FR-P12) ===== */
      moneyRequests: s.moneyRequests.map(r => ({...r,
        isPending: r.status === 'pending',
        isApproved: r.status === 'approved',
        isDeclined: r.status === 'declined',
        statusChip: {fontFamily: 'Urbanist', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99,
          background: r.status === 'approved' ? '#E1F5EC' : r.status === 'declined' ? '#FDE8E8' : '#F9F1E6',
          color: r.status === 'approved' ? '#009061' : r.status === 'declined' ? '#CD3030' : '#FF9A01'},
        statusLabel: r.status === 'approved' ? 'APPROVED' : r.status === 'declined' ? 'DECLINED' : 'PENDING',
      })),
      showMoneyForm: s.showMoneyForm,
      openMoneyForm: () => this.setState({showMoneyForm: true}),
      closeMoneyForm: () => this.setState({showMoneyForm: false, moneyAmount: '', moneyPurpose: ''}),
      moneyAmount: s.moneyAmount,
      onMoneyAmount: e => this.setState({moneyAmount: e.target.value}),
      moneyPurpose: s.moneyPurpose,
      onMoneyPurpose: e => this.setState({moneyPurpose: e.target.value}),
      submitMoneyRequest: () => {
        const amt = s.moneyAmount.trim();
        const purp = s.moneyPurpose.trim();
        if (!amt || !purp) return;
        this.setState({
          moneyRequests: [...s.moneyRequests, {id: Date.now(), amount: amt, purpose: purp, status: 'pending', receipt: null, spentAmount: null, spentDesc: null}],
          showMoneyForm: false, moneyAmount: '', moneyPurpose: '',
        });
        this._audit('MONEY', 'Requested \u20a6' + amt + ' \u2014 ' + purp);
        this.toast('Request sent to Mummy for approval');
      },

      /* ===== RECEIPT / SPENDING (FR-C11) ===== */
      spendingRecorded: s.moneyRequests.length > 0 && s.moneyRequests[s.moneyRequests.length - 1].receipt !== null,
      recordSpending: () => {
        const moneyRequests = s.moneyRequests.map((r, i) => i === s.moneyRequests.length - 1
          ? {...r, receipt: true, spentAmount: r.amount, spentDesc: 'Baby wipes \u00d72 \u20a61,200 \u00b7 Milo \u20a61,800 \u00b7 Fruits \u20a61,500'}
          : r);
        this.setState({moneyRequests});
        this._audit('MONEY', 'Recorded spending with receipt \u2014 embedded in daily report');
        this.toast('Receipt attached \u2014 appears in daily report');
      },

      /* ===== LOW STOCK FLAGS (FR-C12) ===== */
      lowStock: s.lowStock.map(it => ({...it,
        flagStyle: {fontFamily: 'Urbanist', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99, background: it.flagged ? '#FDE8E8' : '#E1F5EC', color: it.flagged ? '#CD3030' : '#009061', flex: 'none'},
        flagLabel: it.flagged ? 'LOW' : 'OK',
      })),
      lowStockInput: s.lowStockInput,
      onLowStockInput: e => this.setState({lowStockInput: e.target.value}),
      onLowStockKey: e => { if (e.key === 'Enter') this._addLowStock(); },
      addLowStockItem: () => this._addLowStock(),

      /* ===== CALENDAR EVENT CREATION (FR-P09) ===== */
      showEventForm: s.showEventForm,
      openEventForm: () => this.setState({showEventForm: true}),
      closeEventForm: () => this.setState({showEventForm: false, newEventName: '', newEventDow: '', newEventTime: '', newEventNote: ''}),
      newEventName: s.newEventName,
      onNewEventName: e => this.setState({newEventName: e.target.value}),
      newEventDow: s.newEventDow,
      onNewEventDow: e => this.setState({newEventDow: e.target.value}),
      newEventTime: s.newEventTime,
      onNewEventTime: e => this.setState({newEventTime: e.target.value}),
      newEventNote: s.newEventNote,
      onNewEventNote: e => this.setState({newEventNote: e.target.value}),
      submitEvent: () => {
        const name = s.newEventName.trim();
        const dow = s.newEventDow.trim().toUpperCase();
        const time = s.newEventTime.trim();
        if (!name || !dow) return;
        const dom = String(Math.floor(Math.random() * 28) + 1);
        this.setState({
          events: [...s.events, {dow, dom, name, meta: (time || '10:00 AM') + ' \u00b7 Home', note: s.newEventNote || 'No additional notes.', prep: [{name: 'Prepare items', done: false}, {name: 'Check with Mummy', done: false}]}],
          showEventForm: false, newEventName: '', newEventDow: '', newEventTime: '', newEventNote: '',
        });
        this._audit('CARE', 'Created event: ' + name);
        this.toast('Event added \u2014 Blessing sees it on her calendar');
      },

      /* ===== FIX: Dead-end button handlers ===== */
      callNowSos: () => this.toast('Calling Daddy \u2026'),
      callSosContact: () => this.toast('Placing call \u2026'),
      viewReport: () => { this.setState({cScreen: 'report', role: 'parent'}); this.toast('Viewing report \u2014 demo: switched to caregiver lens'); },
      checklistClick: () => { this.setState({openEvent: 0}); this.toast('Showing swim-bag checklist'); },
      editMeal: () => this.toast('Meal editor \u2014 coming in production'),
      openVault: () => this.toast('Family vault \u2014 coming in production'),
      voiceAsk: () => { this.setState({listening: true}); setTimeout(() => { this.setState({listening: false}); this.toast('Listening \u2026 try a prompt below'); }, 1200); },
    };
  }
}
