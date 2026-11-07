export type ScreenType = 
  | 'home'
  | 'nodes'
  | 'upgrades'
  | 'battle'
  | 'pray'
  | 'shop'
  | 'board'
  | 'title' 
  | 'prologue' 
  | 'strategy' 
  | 'treasury' 
  | 'map' 
  | 'victory';

export type StrategyType = 'ARCHITECT' | 'VELOCITY' | 'GUARDIAN' | '';

export interface Card {
  id: string;
  name: string;
  scripture: string;
  txt: string;
  dmg: number;
  cost: number;
  sound: 'verse' | 'shield' | 'thunder' | 'crown' | 'strike';
  isLegendary?: boolean;
  effectDesc: string;
  heals?: number;
  armorBoost?: number;
  shieldShatterMultiplier?: number;
}

export interface EnemyBoss {
  id: string;
  name: string;
  title: string;
  chapter: number;
  hp: number;
  maxHp: number;
  shield: number;
  maxShield: number;
  attackPower: number;
  quote: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: number;
  completed: boolean;
  claimed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  chapter: number;
  valuation: number;
  momentum: number;
  verses: number;
  date: string;
}

export interface GameState {
  screen: ScreenType;
  sound: boolean;
  vol: number;
  valuation: number;
  security: number;
  faith: number;
  momentum: number;
  verses: number;
  fragments: number;
  energy: number;
  maxEnergy: number;
  hp: number;
  maxHp: number;
  bossHp: number;
  bossMax: number;
  bossShield: number;
  bossMaxShield: number;
  turn: number;
  combo: number;
  log: string;
  strategy: StrategyType;
  crownUsed: boolean;
  chapter: number;
  // Retention & Progression
  dailyStreak: number;
  lastClaimDate: string;
  missions: DailyMission[];
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  // Stats
  perfectDodgesCount: number;
  shieldsShatteredCount: number;
  crownsUsedCount: number;
  // Treasury allocation
  protocolAlloc: number;
  productAlloc: number;
  liquidityAlloc: number;
  // Upgrades & Nodes progression
  upgrades: Record<string, number>;
  unlockedNodes: number[];
}
