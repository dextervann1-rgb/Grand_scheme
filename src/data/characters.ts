import { EnemyBoss, DailyMission, Achievement } from '../types';

export interface FellowshipHero {
  id: string;
  name: string;
  title: string;
  verse: string;
  verseRef: string;
  role: string;
  description: string;
  avatarEmoji: string;
  gradient: string;
  borderColor: string;
}

export const HEROES: FellowshipHero[] = [
  {
    id: 'samantha',
    name: 'Samantha the Warden',
    title: 'CROWNED QUEEN OF LIGHT',
    verse: 'March on, my soul, with might!',
    verseRef: 'Judges 5:21',
    role: 'Warden & Vanguard',
    description: 'Wearing the VannDiamond Armored Crown of Light. Long burgundy-red hair, tattooed arm, white & gold cyber armor with cyan seams.',
    avatarEmoji: '👑🛡️',
    gradient: 'from-amber-200 via-yellow-400 to-amber-600',
    borderColor: '#FFD700',
  },
  {
    id: 'peter',
    name: 'Big Beastie / Peter',
    title: 'THE BEAM SHATTERER',
    verse: 'I can do all things through Christ who strengthens me',
    verseRef: 'Philippians 4:13',
    role: 'Apostolic Heavyweight',
    description: 'Dreadlocks, salt-and-grey beard, black fedora crowned with a radiant cyan-blue halo. Vest embossed with JESUS SAVES.',
    avatarEmoji: '🧔🏾‍♂️👑',
    gradient: 'from-amber-500 via-yellow-500 to-cyan-500',
    borderColor: '#00E5FF',
  },
  {
    id: 'john',
    name: 'John Thunderer',
    title: 'SON OF THUNDER',
    verse: 'Boanerges, which is, Sons of Thunder',
    verseRef: 'Mark 3:17',
    role: 'Divine Striker',
    description: 'Channels celestial azure lightning through cybernetic gauntlets. High-voltage gospel smite.',
    avatarEmoji: '⚡',
    gradient: 'from-cyan-400 to-blue-600',
    borderColor: '#00E5FF',
  },
  {
    id: 'silas',
    name: 'Silas Unchained',
    title: 'MIDNIGHT PRAISE BREAKER',
    verse: 'And suddenly there was a great earthquake...',
    verseRef: 'Acts 16:26',
    role: 'Stealth Infiltrator',
    description: 'Dual phase-blades forged from shattered iron chains. Silent night stealth operative.',
    avatarEmoji: '🥷',
    gradient: 'from-slate-600 to-zinc-900',
    borderColor: '#94a3b8',
  },
];

export const CHAPTER_BOSSES: Record<number, EnemyBoss> = {
  0: {
    id: 'gloom_trooper',
    name: 'GLOOM TROOPER',
    title: 'Prey Encounter • Dark Shadow Vanguard',
    chapter: 0,
    hp: 1800,
    maxHp: 1800,
    shield: 300,
    maxShield: 300,
    attackPower: 75,
    quote: 'The shadows will feast on your fellowship!',
  },
  1: {
    id: 'malice',
    name: 'COMMANDER MALICE',
    title: 'Dark Hearts Enforcer',
    chapter: 1,
    hp: 3500,
    maxHp: 3500,
    shield: 500,
    maxShield: 500,
    attackPower: 110,
    quote: 'Your light ends in the Blackout, Fellowship!',
  },
  2: {
    id: 'phantasm',
    name: 'PHANTASM',
    title: 'Phantom of Neon Shadows',
    chapter: 2,
    hp: 4200,
    maxHp: 4200,
    shield: 750,
    maxShield: 750,
    attackPower: 140,
    quote: 'You cannot strike what you cannot catch in the dark!',
  },
  3: {
    id: 'overlord',
    name: 'THE GLOOM OVERLORD',
    title: 'Master of Ancient Shadows',
    chapter: 3,
    hp: 6000,
    maxHp: 6000,
    shield: 1200,
    maxShield: 1200,
    attackPower: 180,
    quote: 'All kingdoms bow to the shadow... unless Jesus reigns!',
  },
};

export const INITIAL_MISSIONS: DailyMission[] = [
  {
    id: 'm1',
    title: 'Shield Shatterer',
    description: 'Shatter a Gloom Boss Shield using Philippians 4:13 or VannDiamond Crown',
    target: 1,
    current: 0,
    reward: 80,
    completed: false,
    claimed: false,
  },
  {
    id: 'm2',
    title: 'Holy Verses',
    description: 'Play 5 scripture verse cards during campaign battles',
    target: 5,
    current: 0,
    reward: 100,
    completed: false,
    claimed: false,
  },
  {
    id: 'm3',
    title: 'Swift Reflexes',
    description: 'Execute a PERFECT Real-Time Dodge during an incoming attack',
    target: 1,
    current: 0,
    reward: 120,
    completed: false,
    claimed: false,
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'First Shatter',
    description: 'Crack open a boss Gloom Shield with scripture truth',
    icon: '💥',
    unlocked: false,
  },
  {
    id: 'a2',
    title: 'VannDiamond Descent',
    description: 'Unleash the Legendary Crown of Light in battle',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'a3',
    title: 'Perfect Timing x5',
    description: 'Perform 5 Perfect Dodges against enemy attacks',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'a4',
    title: '7-Day Devotion',
    description: 'Claim your 7-day login streak for the legendary Crown Shard',
    icon: '💎',
    unlocked: false,
  },
  {
    id: 'a5',
    title: 'Overlord Slayer',
    description: 'Defeat Chapter 3 Overlord and restore divine color to the city',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'a6',
    title: 'High Valuation',
    description: 'Surpass 2,000 Valuation through strategic treasury management',
    icon: '📈',
    unlocked: false,
  },
];

export const INITIAL_LEADERBOARD = [
  { id: '1', playerName: 'Dexter Vann', score: 845200, chapter: 3, valuation: 2450, momentum: 1.85, verses: 42, date: '2026-11-06' },
  { id: '2', playerName: 'Samantha Queen', score: 720400, chapter: 3, valuation: 2200, momentum: 1.70, verses: 38, date: '2026-11-05' },
  { id: '3', playerName: 'Big Beastie', score: 650000, chapter: 3, valuation: 2100, momentum: 1.65, verses: 35, date: '2026-11-04' },
  { id: '4', playerName: 'Boanerges Thunder', score: 512000, chapter: 2, valuation: 1800, momentum: 1.45, verses: 28, date: '2026-11-03' },
  { id: '5', playerName: 'Silas Nightwalker', score: 489000, chapter: 2, valuation: 1650, momentum: 1.40, verses: 24, date: '2026-11-02' },
  { id: '6', playerName: 'Faith Vanguard', score: 380000, chapter: 1, valuation: 1400, momentum: 1.30, verses: 19, date: '2026-11-01' },
  { id: '7', playerName: 'Cathedral Architect', score: 320000, chapter: 1, valuation: 1250, momentum: 1.25, verses: 15, date: '2026-10-31' },
  { id: '8', playerName: 'Zion Shield', score: 285000, chapter: 1, valuation: 1150, momentum: 1.15, verses: 12, date: '2026-10-30' },
  { id: '9', playerName: 'Light Bearer 77', score: 240000, chapter: 1, valuation: 1050, momentum: 1.10, verses: 10, date: '2026-10-29' },
  { id: '10', playerName: 'Omega Rookie', score: 180000, chapter: 1, valuation: 1000, momentum: 1.00, verses: 8, date: '2026-10-28' },
];
