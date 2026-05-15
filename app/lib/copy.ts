// ChayKhata UI Microcopy — The Tapri Remembers Everything

export const SPLASH = {
  tagline: "Friendship fades. Chay debt stays.",
  loading: [
    "Brewing your khata…",
    "Counting biscuits…",
    "Asking the tapri wala…",
    "Warming up the receipts…",
    "Loading guilt trips…",
    "Calibrating chai economy…",
    "Summoning your debtors…",
    "Heating memories…",
  ],
  subtagline: "Powered by trust. Fuelled by chai.",
};

export const LANDING = {
  hero: "Who still owes you chai?",
  heroSub: "Track every sip. Every snack. Every 'kal pakka'.",
  cta: "Start your khata",
  installPwa: "Add to Home Screen",
  socialProof: {
    friendships: "friendships preserved",
    debts: "chai debts remembered",
    excuses: "excuses ignored",
    tagline: "The chai economy is real.",
  },
  floatingCards: [
    "Rahul owes 3 chay ☕",
    "Priya: 'Kal pakka' (Day 47)",
    "Aman's tab: ₹0 paid, ∞ excuses",
    "Sarthak finally settled 🎉",
  ],
};

export const AUTH = {
  loginTitle: "Back again?",
  loginSub: "Your khata missed you.",
  signupTitle: "Open your khata.",
  signupSub: "Free to join. Emotional damage extra.",
  pinLabel: "Secret chai code",
  pinPlaceholder: "••••",
  pinHint: "4 digits. Not your birthday. We know.",
  footer: "Real friends repay eventually.",
  footerAlt: "Or they don't. That's why we exist.",
  nameLabel: "What do people call you?",
  birthdateLabel: "Date of birth",
  birthdateHint: "We won't wish you. Debts don't care about birthdays.",
  usernameLabel: "Your tapri identity",
  usernamePlaceholder: "chaimaster_69",
  usernameHint: "Lowercase. No spaces. Maximum damage.",
  submitting: "Opening your khata…",
  loginSubmitting: "Checking credentials and karma…",
};

export const DASHBOARD = {
  greeting: {
    morning: "Good morning. Someone owes you chai.",
    afternoon: "Afternoon check. Still owed?",
    evening: "Evening recap. Debts don't sleep.",
    night: "Late night. So is your pending balance.",
  },
  sections: {
    pending: "Outstanding Sips",
    recentActivity: "Chai Lore",
    topCriminal: "Top Chai Criminal",
    streak: "Streak of Shame",
    settled: "Peace Restored",
    summary: "The Tapri's Report",
    quickAdd: "New Crime",
  },
  stats: {
    totalPending: "Total Outstanding",
    totalSettled: "Recovered",
    activeBorrowers: "Active Debtors",
    avgRepaymentDays: "Avg Days to Guilt",
    longestDebt: "Oldest Crime",
    repaymentRate: "Repayment Probability",
  },
  emptyFeed: "All quiet at the tapri. Suspicious.",
};

export const DEBT_LIST = {
  title: "Your Chai Ledger",
  subtitle: "The Tapri remembers everything.",
  swipeRight: "Settled ✓",
  swipeLeft: "Send Nudge",
  filters: {
    all: "All Crimes",
    pending: "Pending Justice",
    settled: "Recovered",
    disputed: "War Zone",
  },
  sort: {
    newest: "Freshest Guilt",
    oldest: "Vintage Debt",
    amount: "Maximum Damage",
    person: "By Offender",
  },
  cardLabels: {
    since: "Pending since",
    excuse: "Latest excuse",
    count: "sips owed",
    item: "crime committed",
  },
};

export const DEBT_STATUS = {
  pending: "Pending Since 'Kal Pakka'",
  active: "Actively Unpaid",
  settled: "Peace Restored",
  disputed: "Currently at War",
  pendingConfirmation: "Awaiting Acknowledgment",
  longOverdue: "Chai Debt Archaeology",
  suspicious: "Under Investigation",
  legendary: "Historic Debt",
  // fun status based on days
  fresh: "Hot & Pending (< 1 day)",
  warming: "Getting Cold (2-7 days)",
  stale: "Room Temperature (1-2 weeks)",
  expired: "Biryani Cooked Long Ago (1 month+)",
  fossil: "Geological Record (3 months+)",
  myth: "Tapri Legend (6 months+)",
};

export const DEBT_STATES = {
  names: [
    "Certified Chay Chor",
    "Tapri Fugitive",
    "Ghost Mode Activated",
    "Emotionally Unavailable, Financially Too",
    "Running from Receipts",
    "Professional Borrower",
    "Serial Kal-Pakka Offender",
    "Chai Debt Archaeologist",
    "Known to the Tapri Wala",
    "Repayment: Coming Soon™",
    "Currently in Witness Protection",
    "Excuses PhD Candidate",
    "Balance: Vibes Only",
  ],
};

export const ADD_DEBT = {
  title: "Log a Crime",
  subtitle: "What did they eat and refuse to pay for?",
  items: {
    CHAY: "Chai ☕",
    LUNCH: "Lunch 🍱",
    SNACKS: "Snacks 🍟",
    MAGGI: "Maggi 🍜",
    CUSTOM: "Other Crime ✍️",
  },
  countLabel: "How many times?",
  countHint: "Be honest. The tapri saw everything.",
  notesLabel: "Any notes? (Optional)",
  notesPlaceholder: "e.g. 'He ordered extra biscuit too'",
  customItemLabel: "What exactly?",
  customItemPlaceholder: "Cold coffee, samosa, emotional damage...",
  selectPerson: "Who's the accused?",
  selectPersonHint: "Choose your debtor wisely.",
  cta: "File the Complaint",
  ctaLoading: "Notarizing at tapri…",
  success: "Crime logged. Justice pending.",
  confirmation: {
    title: "Confirm this debt?",
    subtitle: "Once logged, they'll be notified. And judged.",
    accept: "Yes, they owe me",
    cancel: "Actually nah",
  },
};

export const DEBT_CONFIRMATION = {
  states: {
    pendingConfirmation: {
      title: "Awaiting Their Confession",
      sub: "Sent. Now we wait. And judge.",
    },
    acceptedByDebtor: {
      title: "They Admitted It",
      sub: "Rare. Respect.",
    },
    disputed: {
      title: "They Lied",
      sub: "Claims to have paid. We remain skeptical.",
    },
    settled: {
      title: "Peace Restored ✓",
      sub: "The tapri acknowledges this transaction.",
    },
  },
  debtorView: {
    title: "You've Been Accused",
    sub: "Someone filed a chai complaint against you.",
    accept: "I owe this",
    dispute: "This is slander",
    acceptLoading: "Accepting reality…",
    disputeLoading: "Filing counterclaim…",
  },
  settlementFlow: {
    creditorTitle: "Did they actually pay?",
    creditorSub: "Don't let them gaslight you.",
    debtorTitle: "Have you paid?",
    debtorSub: "Be honest. The tapri knows.",
    confirm: "Yes, settled",
    deny: "No, not yet",
  },
};

export const REMINDERS = {
  templates: [
    "Bhai chai ka hisaab? ☕",
    "Next time pakka? 👀",
    "Interest lag jayega.",
    "Tapri remembers everything.",
    "Your chai debt arc continues.",
    "Bro ki yaad dila doon?",
    "Chai thi, payment nahi.",
    "3 din baad bhi kal pakka?",
    "Yaar, kal tha. Aaj hai.",
    "The sip was real. The payment wasn't.",
    "Friendship has limits. Chai debt doesn't.",
    "Kitna sochoge? Pay karo.",
    "Sun bhai, tapri mein naam aane wala hai.",
  ],
  nudgeLevels: {
    gentle: "Friendly nudge",
    medium: "Slightly serious",
    spicy: "We're done being polite",
    nuclear: "Final notice from tapri HQ",
  },
  scheduledReminder: {
    set: "Reminder set. Justice incoming.",
    cancel: "Reminder cancelled. Your trust.",
  },
};

export const NOTIFICATIONS = {
  newDebt: {
    title: "You've been accused ☕",
    body: (name: string, item: string) =>
      `${name} says you owe them ${item}. Confirm or face the tapri.`,
  },
  reminder: {
    title: "Tapri Intelligence Bureau",
    bodies: [
      "Still pending. Still judging.",
      "Your chai debt has not aged well.",
      "The tapri remembers. Do you?",
      "Kal pakka was yesterday.",
      "Interest: emotional guilt (compounding).",
      "Your credit score at the tapri: 0.",
      "Bro. Chai. Pay.",
    ],
  },
  settled: {
    title: "Peace Restored ✓",
    body: (name: string) => `${name} cleared their tab. Rare occurrence. Noted.`,
  },
  disputed: {
    title: "War Declared ⚔️",
    body: (name: string) => `${name} is disputing your claim. Interesting move.`,
  },
  nudge: {
    title: "Your friend is generous",
    bodies: [
      "They're giving you another chance. Use it.",
      "Ek aur mauka. Last time.",
      "Nudge received. Guilt activated.",
      "They haven't forgotten. Neither has the tapri.",
    ],
  },
  leaderboard: {
    title: "Tapri Leaderboard Update",
    body: "You've climbed the ranks. Unfortunately.",
  },
  streak: {
    title: "Streak Milestone ☕",
    body: "You've been consistently not paying. Consistent.",
  },
};

export const LEADERBOARD = {
  title: "Top Chai Criminals",
  subtitle: "The Tapri's Most Wanted",
  categories: {
    mostBorrowed: "Maximum Chai Borrowed",
    longestPending: "Oldest Unsettled Crime",
    mostExcuses: "Most Excuses Given",
    monthlyFugitive: "Tapri Fugitive of the Month",
    mostSettled: "Reformed Criminal",
    fastestRepayer: "Rare Honest One",
    mostNudged: "Most Reminded (Least Effective)",
    biggestLender: "Tapri Banker",
  },
  ranks: {
    1: "Supreme Chai Criminal 👑",
    2: "Vice Chor",
    3: "Senior Borrower",
    4: "In Training",
    5: "Rookie Offender",
  },
  medals: {
    gold: "Tapri Gold",
    silver: "Tapri Silver",
    bronze: "Tapri Bronze",
    wooden: "At Least You're Honest",
  },
  emptyState: "No criminals yet. Give it time.",
  yourRank: "Your rank in the shame hierarchy",
};

export const ANALYTICS = {
  title: "Chai Intelligence Report",
  subtitle: "The numbers don't lie. Your friends do.",
  terms: {
    repaymentProbability: "Repayment Probability",
    chaiDebtIndex: "Chai Debt Index",
    karmaScore: "Tapri Karma Score",
    guiltMultiplier: "Guilt Multiplier",
    excuseFrequency: "Excuse Frequency",
    chaiBurnRate: "Chai Burn Rate",
    debtHalfLife: "Debt Half-Life",
    socialRisk: "Social Credit Score",
    tapriTrustRating: "Tapri Trust Rating™",
    borrowingVelocity: "Borrowing Velocity",
    repaymentLag: "Payment Delay Index",
    netChaiPosition: "Net Chai Position",
    lendingExposure: "Friendship Exposure",
    defaultRisk: "Ghosting Risk",
    avgExcuseLength: "Excuse Verbosity Score",
    peakBorrowingHour: "Peak Crime Hour",
    weeklyChaiPnl: "Weekly Chai P&L",
    portfolioRisk: "Relationship Portfolio Risk",
  },
  values: {
    repaymentLow: "2% (Vibes-Based)",
    repaymentMedium: "47% (Hopeful)",
    repaymentHigh: "94% (Rare Gem)",
    riskHigh: "Send backup",
    riskMedium: "Proceed with chai and caution",
    riskLow: "You can trust this one. Probably.",
  },
  insights: [
    "Peak borrowing: Friday evening",
    "Most excuses given: Monday morning",
    "Fastest repayment: When they need a favor",
    "Longest pending: Since 'the group trip'",
    "Most active borrower: Changes monthly, stays same person",
  ],
  chartLabels: {
    thisWeek: "This Week's Damage",
    lastWeek: "Last Week's Regret",
    monthly: "Monthly Chai Flow",
    allTime: "All-Time Chai Balance Sheet",
  },
};

export const EMPTY_STATES = {
  noDebts: {
    title: "All Clear at the Tapri",
    sub: "No pending debts. Either your friends are honest or you have no friends.",
    illustration: "sleeping_chai",
  },
  noFriends: {
    title: "Flying Solo",
    sub: "Add friends to start tracking chai. Or keep lending into the void.",
    illustration: "lonely_cup",
  },
  allSettled: {
    title: "Balance Achieved ✓",
    sub: "All debts settled. The tapri is at peace. For now.",
    illustration: "happy_chai",
  },
  noActivity: {
    title: "Quiet at the Tapri",
    sub: "Nothing happening. Suspicious.",
    illustration: "empty_tapri",
  },
  noLeaderboard: {
    title: "No Criminals Yet",
    sub: "Start lending chai to populate this list.",
    illustration: "empty_board",
  },
  noNotifications: {
    title: "Inbox Empty",
    sub: "No nudges, no crimes, no drama. Unusual.",
    illustration: "no_notif",
  },
  offline: {
    title: "No Signal at the Tapri",
    sub: "We'll protect your chai lore offline.",
    subAlt: "Internet gone. Debts remain.",
    illustration: "sleeping_chai",
    retryBtn: "Try Again",
  },
  searchEmpty: {
    title: "Not Found",
    sub: "This person either doesn't exist or is hiding from their tab.",
  },
};

export const GAMIFICATION = {
  badges: {
    firstDebt: {
      name: "First Crime ☕",
      desc: "Logged your first chai debt",
    },
    firstSettlement: {
      name: "Peace Maker",
      desc: "First debt settled",
    },
    tenDebts: {
      name: "Serial Lender",
      desc: "10 debts tracked",
    },
    centurion: {
      name: "Chai Centurion",
      desc: "100 chai debts logged",
    },
    ghostBuster: {
      name: "Ghost Detector",
      desc: "Caught someone ignoring repayment",
    },
    fastPayer: {
      name: "Rare Honest One",
      desc: "Paid within 24 hours",
    },
    veteran: {
      name: "Tapri Veteran",
      desc: "30 days on ChayKhata",
    },
    diplomat: {
      name: "Tapri Diplomat",
      desc: "Resolved a disputed debt peacefully",
    },
    nudgeMaster: {
      name: "Nudge Artist",
      desc: "Sent 10 reminders",
    },
    inDebt: {
      name: "Emotionally Invested",
      desc: "Currently owe more than you're owed",
    },
    creditor: {
      name: "Tapri Banker",
      desc: "Owed by 5+ people simultaneously",
    },
    forgiver: {
      name: "Surprisingly Chill",
      desc: "Forgave a debt",
    },
    monthlyFugitive: {
      name: "Fugitive of the Month",
      desc: "Top of leaderboard. Yikes.",
    },
    archaeologist: {
      name: "Chai Debt Archaeologist",
      desc: "Had a debt pending for 90+ days",
    },
    lifetimeAchiever: {
      name: "Lifetime Achievement in Borrowing",
      desc: "Special. Not in a good way.",
    },
  },

  streaks: {
    lendingStreak: "Lending Streak",
    pendingStreak: "Streak of Shame",
    settlementStreak: "Repayment Redemption Arc",
    activityStreak: "Tapri Presence",
    streakBroken: "The streak died. Like their promises.",
    streakMilestones: {
      3: "3 Day Chai Run",
      7: "Weekly Sinner",
      14: "Fortnight Fugitive",
      30: "Monthly Criminal",
      90: "Quarterly Legend",
      365: "Annual Chai Archaeologist",
    },
  },

  achievements: [
    "Graduated from Chai to Lunch Debts",
    "Survived a Disputed Debt",
    "Actually Got Paid Back",
    "Had 5 Pending Debts Simultaneously",
    "Used 'Kal Pakka' More Than 3 Times",
    "Logged a Debt at 2AM",
    "Sent a Reminder on Someone's Birthday",
    "Disputed and Won",
    "Forgave a Fossil Debt",
    "Became Someone's Top Chai Criminal",
    "Never Been on Leaderboard (Clean Record)",
    "Paid Within the Hour",
  ],
};

export const CTA_BUTTONS = {
  primary: {
    addDebt: "Log a Crime",
    settle: "Mark as Settled",
    nudge: "Send a Nudge",
    viewAll: "See All Crimes",
    shareProfile: "Share Khata",
    joinLeaderboard: "Check My Rank",
    acceptDebt: "I Owe This",
    disputeDebt: "This Is Slander",
    confirmSettle: "Yes, Peace Restored",
    startKhata: "Start Your Khata",
    addFriend: "Add a Debtor",
    sendReminder: "Remind Them",
    forgive: "Forgive (Don't)",
    viewAnalytics: "See the Damage",
  },
  secondary: {
    cancel: "Nah",
    skip: "Skip for Now",
    later: "Later (Like Your Friend)",
    dismiss: "I'll Ignore This Too",
    viewDetails: "Investigate",
    shareEvidence: "Share Proof",
  },
  loading: {
    saving: "Notarizing at tapri…",
    settling: "Processing peace…",
    sending: "Dispatching nudge…",
    loading: "Asking the tapri wala…",
    confirming: "Verifying with higher authority…",
  },
};

export const PROFILE = {
  defaultBios: [
    "Professional chai lender 😎",
    "Emotionally invested, financially ruined",
    "Funded more chais than I can count",
    "Tapri's most loyal customer (and donor)",
    "My friends owe me, but so does life",
    "Running a charity disguised as friendship",
    "Chai banker. Zero interest. Maximum regret.",
    "Known at the tapri by first name",
    "Certified friend. Uncertified accountant.",
    "Will lend chai. Will remember forever.",
  ],
  editBioPlaceholder: "Tell the tapri who you are",
  editBioHint: "Max 100 chars. Make it count.",
  shareProfile: {
    title: "Send your khata into the wild",
    sub: "Anyone can see your public debt profile",
    shareText: (username: string) =>
      `Check my ChayKhata: chaykhata.app/${username} — track chai debts with me`,
    qrTitle: "Your Tapri QR",
    qrSub: "Scan to view public profile",
    copyLink: "Copy Link",
    copied: "Link copied. Send it to your debtors.",
  },
  stats: {
    pendingCount: "Chai Pending",
    settledCount: "Peace Made",
    mostNotorious: "Most Notorious Borrower",
    friendshipStreak: "Friendship Streak",
    memberSince: "At the Tapri Since",
    totalLent: "Total Lent (₹ equivalent)",
    totalOwed: "Currently Owed",
  },
};

export const ACTIVITY_FEED = {
  templates: {
    debtCreated: (lender: string, borrower: string, item: string) =>
      `${lender} logged ${item} for ${borrower}.`,
    debtSettled: (borrower: string, days: number) =>
      `${borrower} finally settled after ${days} day${days > 1 ? "s" : ""}. Noted.`,
    disputed: (borrower: string) =>
      `${borrower} is disputing the charge. Bold.`,
    nudgeSent: (lender: string, borrower: string) =>
      `${lender} sent a reminder to ${borrower}. The tapri watches.`,
    longestPending: (borrower: string, days: number) =>
      `${borrower}'s debt just crossed ${days} days. Historic.`,
    escaped: (borrower: string) =>
      `${borrower} claimed they paid. Investigation ongoing.`,
    forgiven: (lender: string, borrower: string) =>
      `${lender} forgave ${borrower}'s debt. Unprecedented.`,
    streak: (user: string, count: number) =>
      `${user} hit a ${count}-day lending streak. Concerning.`,
    leaderboard: (user: string) =>
      `${user} is now Tapri Fugitive of the Month.`,
  },
};

export const PAYMENT_CELEBRATIONS = {
  messages: [
    "Peace Restored ✓",
    "Tapri Justice Delivered.",
    "The arc is complete.",
    "Debt served. Friendship saved. Probably.",
    "Your repayment arc begins now.",
    "Recovered. Against all odds.",
    "They actually paid. Screenshot this.",
    "The impossible happened.",
    "Chai economy rebalanced.",
    "Karma settled at the tapri.",
    "You believed in them. It worked.",
    "History made at the tapri today.",
    "Redemption arc complete.",
    "Bhai ne maana. Respect.",
  ],
  confettiVariants: [
    "☕", "✓", "🎉", "🫖", "🍵", "💰", "🙌"
  ],
};

export const ERROR_MESSAGES = {
  generic: "Something broke. Probably not your friend's fault.",
  network: "Connection lost. Like your friend's memory.",
  notFound: "Not found. Maybe they're hiding.",
  unauthorized: "You're not allowed here. Log in.",
  serverError: "Tapri server crashed. Our fault, not yours.",
  sessionExpired: "Session expired. Log back in.",
  debtNotFound: "Debt not found. It didn't disappear though.",
  userNotFound: "User not found. Either new or running.",
  invalidPin: "Wrong PIN. Not your chai, apparently.",
  usernameExists: "Username taken. Someone beat you to it.",
  tooManyRequests: "Slow down. Tapri is busy.",
  disputeFailed: "Dispute failed. Settle it over chai instead.",
  alreadySettled: "Already settled. No double claiming.",
  cantNudgeSelf: "You can't nudge yourself. That's just anxiety.",
  formErrors: {
    required: "This field won't fill itself.",
    pinMismatch: "PINs don't match. Breathe.",
    pinLength: "PIN must be exactly 4 digits.",
    usernameFormat: "Lowercase letters, numbers, underscores only.",
    countMin: "At least 1. They owe something.",
    countMax: "More than 100? What happened?",
    nameTooShort: "Two characters minimum. At least.",
    bioTooLong: "Keep it under 100 chars. Twitter taught us this.",
  },
};

export const TOAST = {
  debtAdded: "Crime logged. ☕",
  debtSettled: "Peace restored.",
  nudgeSent: "Reminder sent. Now we wait.",
  profileUpdated: "Tapri identity updated.",
  linkCopied: "Link copied. Send it.",
  loggedOut: "Logged out. Debts remain.",
  disputed: "Dispute filed. Bold move.",
  forgiven: "Forgiven. You're too nice.",
  pinChanged: "New PIN set. Don't forget this one.",
  reminderSet: "Reminder set. Justice scheduled.",
  reminderCancelled: "Reminder cancelled. Your loss.",
};

export const LOADING = {
  general: [
    "Asking the tapri wala…",
    "Counting pending chais…",
    "Consulting the khata…",
    "Loading debt history…",
    "Brewing your data…",
    "Calculating guilt…",
    "Verifying at tapri HQ…",
    "Checking who owes what…",
    "Running tapri intelligence…",
    "Warming up the ledger…",
  ],
  analytics: [
    "Running Chai Debt Analysis…",
    "Computing Repayment Probability…",
    "Calculating your Tapri Trust Rating…",
    "Aggregating Excuse Frequency…",
    "Loading Friendship Exposure Report…",
  ],
  leaderboard: [
    "Ranking the criminals…",
    "Sorting by shame level…",
    "Computing Chai Debt Index…",
  ],
  profile: [
    "Fetching tapri identity…",
    "Loading reputation data…",
    "Retrieving chai track record…",
  ],
};

export const OFFLINE = {
  title: "No Signal at the Tapri",
  sub: "We'll protect your chai lore offline.",
  sub2: "Internet gone. Debts remain.",
  hint: "Your pending khata is safe. Come back online to sync.",
  retry: "Try Again",
  mascot: "sleeping_chai",
};

export const DESI_TAPRI_REFERENCES = {
  terminology: {
    tapri: "The street chai stall. Sacred institution.",
    khata: "The ledger. Memory of all transactions.",
    kalPakka: "Tomorrow for sure (famously never).",
    udhaar: "Credit at the tapri. Given freely, returned rarely.",
    hisaab: "The reckoning. Final accounting of all debts.",
    yaar: "Friend. Who owes you chai.",
    bhai: "Brother. Who definitely owes you chai.",
    tapriWala: "The keeper of chai. Knows everyone's order.",
    chayKhata: "The sacred record of all chai debts.",
  },
  microCopy: [
    "Bro Ordered Extra Biscuit Too",
    "Chai Thi, Payment Nahi",
    "Tapri Ke Darbar Mein Sab Equal Hain",
    "Udhaar Ki Chai Kadvi Hoti Hai",
    "Hisaab Kitaab Sab Yahan",
    "Kal Ka Kal Dekhenge (We Won't)",
    "Yaar Ne Maara ₹20 Ka Chai",
    "Group Trip Ka Hisaab Abhi Bhi Pending",
    "Canteen Mein Milte Hain (Never Happened)",
    "Hostel Ki Chai, Hostel Ki Yaadein",
    "Sab Jhooth, Tapri Sach",
    "Senior Ne Pilaya, Junior Ne Bhulaya",
  ],
  hostelHumor: [
    "Settled before graduation? Rare.",
    "Night canteen tab from 2nd year, still alive",
    "Mess food = reason for tapri debt",
    "3AM Maggi: The Original Udhaar",
    "Roommate owes, friendship survives (barely)",
    "Batch ka most borrowed: Unchanged since Day 1",
    "Viva the night before: chai debt spikes",
    "Back-benchers run the chai economy",
  ],
  financeJargon: {
    fake: [
      "ChayKhata Debt Obligation (CDO)",
      "Tapri Futures Index",
      "Chai-backed Securities",
      "Friend-to-Friend Lending Rate (FFRL)",
      "Kal-Pakka Default Swap",
      "Udhaar Yield Curve",
      "Tapri Reserve Rate: 0% (No reserves)",
      "Emotional Collateral (Non-recoverable)",
      "Guilt-Adjusted Return on Investment",
      "Friendship Exposure: Maximum",
      "Biscuit-Backed Borrowing",
      "Social Credit Score: Pending",
    ],
  },
};

export const SECTION_TITLES = {
  home: {
    pendingDebts: "Outstanding Sips ☕",
    recentActivity: "Chai Lore 📜",
    topBorrower: "Top Chai Criminal 😈",
    quickActions: "What happened now?",
    yourStats: "The Tapri's Verdict",
    streak: "Current Streak",
  },
  debtList: {
    pending: "Pending Justice ⚖️",
    settled: "Recovered Chais ✓",
    disputed: "Active Conflicts ⚔️",
    oldest: "Chai Debt Archaeology",
    recent: "Fresh Crimes",
  },
  profile: {
    about: "Tapri Identity",
    stats: "By the Numbers",
    badges: "Earned in the Field",
    recentDebts: "Recent Activity",
    shareSection: "Send to Debtors",
  },
  analytics: {
    overview: "The Full Picture",
    topDebtor: "Your Biggest Liability",
    repaymentTrend: "Payment Arc (If Any)",
    timeAnalysis: "When Crimes Happen",
    riskReport: "Relationship Risk Matrix",
  },
};

export const ONBOARDING = {
  steps: [
    {
      title: "Who owes you chai?",
      sub: "Track every sip lent to every friend who said 'kal pakka'.",
    },
    {
      title: "Log it once.",
      sub: "The tapri remembers. Even when they don't.",
    },
    {
      title: "Nudge. Remind. Roast.",
      sub: "Send reminders that are funny, not annoying. Mostly.",
    },
    {
      title: "Peace restored.",
      sub: "Mark it settled. The khata closes. Friendship survives.",
    },
  ],
  final: {
    title: "Your khata is ready.",
    sub: "Start with the person who owes you most.",
    cta: "Open the Tapri",
  },
};

export const MISC = {
  appName: "ChayKhata",
  taglines: [
    "Friendship fades. Chay debt stays.",
    "The tapri remembers everything.",
    "Debt served hot.",
    "Emotionally invested, financially aware.",
    "Your chai, their problem.",
    "Chai today. Hisaab forever.",
  ],
  footerLines: [
    "Real friends repay eventually.",
    "Built at the tapri, for the tapri.",
    "No chai was harmed in making this app.",
    "Powered by trust and unrecovered funds.",
    "Your repayment arc begins now.",
  ],
  easterEggs: [
    "You found the bottom of the khata. Nothing here except regret.",
    "If you're reading this, someone owes you chai.",
    "The tapri wala has been watching this whole time.",
    "404: Payment not found (expected).",
    "Loading... just like your friend's Gpay.",
    "Terms & Conditions: Your friend is lying.",
    "Privacy Policy: The tapri knows everything.",
    "Version 1.0.0 — Debt not included (but tracked).",
  ],
  currencyLabel: "Chai",
  debtUnit: "sip",
  debtUnitPlural: "sips",
};
