export interface UpgradeDefinition {
  id: string;
  name: string;
  hero: string;
  heroName: string;
  scripture: string;
  desc: string;
  baseCost: number;
  maxLevel: number;
  avatarEmoji: string;
}

export const UPGRADE_DEFINITIONS: UpgradeDefinition[] = [
  {
    id: 'beastie1',
    name: 'Rock Breaker — Phil 4:13',
    hero: 'beastie',
    heroName: 'Big Beastie',
    scripture: 'Philippians 4:13',
    desc: '+50 dmg, shatters boss shields 2x faster.',
    baseCost: 100,
    maxLevel: 3,
    avatarEmoji: '🧔🏾‍♂️',
  },
  {
    id: 'beastie2',
    name: 'Halo Burn — Aura',
    hero: 'beastie',
    heroName: 'Big Beastie',
    scripture: 'Cyan Halo of Fire',
    desc: '+25 card dmg and burns target for 2 turns.',
    baseCost: 150,
    maxLevel: 3,
    avatarEmoji: '🔥',
  },
  {
    id: 'sam1',
    name: 'Warden Shield — Judges 5:21',
    hero: 'sam',
    heroName: 'Samantha the Warden',
    scripture: 'Judges 5:21',
    desc: '+100 team shield, rallies fellowship.',
    baseCost: 100,
    maxLevel: 3,
    avatarEmoji: '🛡️',
  },
  {
    id: 'sam2',
    name: 'VannDiamond Crown of Light',
    hero: 'sam',
    heroName: 'Samantha the Warden',
    scripture: 'Crown of Glory',
    desc: '+50% dmg to Dark Hearts. Once per battle heal full + 600 burst dmg.',
    baseCost: 300,
    maxLevel: 1,
    avatarEmoji: '👑',
  },
  {
    id: 'john1',
    name: 'Sons of Thunder — Mark 3:17',
    hero: 'john',
    heroName: 'John Thunderer',
    scripture: 'Mark 3:17',
    desc: 'Azure lightning stuns boss and exposes hidden cloaks.',
    baseCost: 100,
    maxLevel: 3,
    avatarEmoji: '⚡',
  },
  {
    id: 'silas1',
    name: 'Chain Breaker — Acts 16:26',
    hero: 'silas',
    heroName: 'Silas Unchained',
    scripture: 'Acts 16:26',
    desc: 'Breaks crowd control, paralyzes Gloom shadows.',
    baseCost: 100,
    maxLevel: 3,
    avatarEmoji: '⛓️',
  },
  {
    id: 'verse1',
    name: 'Full Armor of God — Eph 6:11',
    hero: 'verse',
    heroName: 'Fellowship Armor',
    scripture: 'Ephesians 6:11',
    desc: '+40 Security, armor also restores 150 HP.',
    baseCost: 120,
    maxLevel: 3,
    avatarEmoji: '📖',
  },
  {
    id: 'verse2',
    name: 'Wings of Eagles — Isa 40:31',
    hero: 'verse',
    heroName: 'Fellowship Wings',
    scripture: 'Isaiah 40:31',
    desc: 'Glide longer and increases dive-bomb critical dmg +35%.',
    baseCost: 120,
    maxLevel: 3,
    avatarEmoji: '🦅',
  },
];

export function getUpgradeCost(def: UpgradeDefinition, currentLevel: number): number {
  if (currentLevel >= def.maxLevel) return 0;
  return Math.floor(def.baseCost * Math.pow(1.5, currentLevel));
}
