/**
 * ChristFire: Omega Protocol - Grand Scheme Complete v9.1
 * © 2026 Vann Family Ventures LLC. All Rights Reserved.
 * Pure Client-side React + TypeScript + Tailwind CSS + Procedural WebAudio
 * IN LUMINE VERITAS | May Jesus Reign
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  GameState, 
  ScreenType, 
  StrategyType, 
  Card, 
  EnemyBoss 
} from './types';
import { 
  BATTLE_CARDS, 
  SAMANTHA_ASCENSION_CARD, 
  JOHN_THUNDER_ASCENSION_CARD,
  SILAS_UNCHAINED_ASCENSION_CARD,
  OVERLORD_PLAYABLE_ASCENSION_CARD,
  PHANTASM_PLAYABLE_ASCENSION_CARD,
  LOWKEY_ASCENSION_CARD, 
  ABADDON_ASCENSION_CARD, 
  INITIAL_INVENTORY 
} from './data/cards';
import { 
  HEROES, 
  CHAPTER_BOSSES, 
  INITIAL_MISSIONS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_LEADERBOARD 
} from './data/characters';
import { soundEngine } from './sound/audio';
import { 
  SamanthaCrownedPortrait, 
  BigBeastiePortrait, 
  BossPortrait,
  DarkHeartCrack,
  AppIconBadge,
  OFFICIAL_APP_ICON,
  SAMANTHA_CROWNED_HERO,
  BOSS_MALICE_IMG,
  BOSS_PHANTASM_IMG,
  BOSS_OVERLORD_IMG,
  GLOOM_TROOPER_IMG,
  HeroAnimationState,
  BossAnimationState
} from './components/CharacterPortraits';
import { DodgeBar } from './components/DodgeBar';
import { QuickTimeVerse } from './components/QuickTimeVerse';
import { ComboMultiplierBadge } from './components/ComboMultiplierBadge';
import { SoundTestModal } from './components/SoundTestModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { DailyStreakModal } from './components/DailyStreakModal';
import { MissionsModal } from './components/MissionsModal';
import { SettingsModal } from './components/SettingsModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { AIDevotionalCard } from './components/AIDevotionalCard';
import { voiceNarrator } from './sound/voiceNarrator';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { NodesView } from './components/NodesView';
import { UpgradesView } from './components/UpgradesView';
import { BoardView } from './components/BoardView';
import { SamanthaAscensionView } from './components/SamanthaAscensionView';
import { JohnThunderAscensionView } from './components/JohnThunderAscensionView';
import { SilasUnchainedAscensionView } from './components/SilasUnchainedAscensionView';
import { OverlordAscensionView } from './components/OverlordAscensionView';
import { PhantasmAscensionView } from './components/PhantasmAscensionView';
import { AscensionRosterView } from './components/AscensionRosterView';
import { MarketplaceView } from './components/MarketplaceView';
import { BFFDexAIView } from './components/BFFDexAIView';
import { WorkflowView } from './components/WorkflowView';
import { AabIconView } from './components/AabIconView';
import { LowkeyAbaddonArtView } from './components/LowkeyAbaddonArtView';
import { TributeView } from './components/TributeView';
import { AabTestView } from './components/AabTestView';
import { AabGuideView } from './components/AabGuideView';
import { DailyView } from './components/DailyView';
import { SettingsScreenView } from './components/SettingsScreenView';
import { 
  Volume2, 
  VolumeX, 
  Trophy, 
  Flame, 
  Target, 
  Settings, 
  Shield, 
  Sparkles, 
  Zap, 
  Heart, 
  Crown, 
  ShoppingBag, 
  Compass, 
  RotateCcw,
  Play,
  Mic,
  Smartphone,
  Bot
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'christfire_omega_v10_save';

const DEFAULT_TASKS = [
  "✅ CF-001 Samantha — DONE v10.1",
  "✅ CF-002 John Thunder — DONE v10.2",
  "✅ CF-003 Silas Unchained — DONE v10.3",
  "✅ CF-004 Overlord Playable — DONE v10.4",
  "✅ CF-005 Phantasm Playable — DONE v10.5",
  "✅ CF-006 Fix AAB Icon — Beastie+Samantha — DONE (Dex Yes)",
  "✅ CF-007 LOWKEY/ABADDON art — DONE (Dex Yes)",
  "✅ CF-008 BFF Console — DONE (Dex Yes)",
  "✅ CF-009 Tribute — DONE (Dex Yes)",
  "✅ CF-010 AAB Test — DONE (Dex Yes)"
];

const DEFAULT_STATE: GameState = {
  screen: 'home',
  sound: true,
  vol: 0.7,
  valuation: 1000,
  security: 80,
  faith: 50,
  momentum: 1.0,
  verses: 0,
  fragments: 150,
  energy: 3,
  maxEnergy: 5,
  hp: 1000,
  maxHp: 1000,
  bossHp: 3500,
  bossMax: 3500,
  bossShield: 500,
  bossMaxShield: 500,
  turn: 1,
  combo: 0,
  log: '',
  strategy: 'ARCHITECT',
  crownUsed: false,
  chapter: 1,
  dailyStreak: 1,
  lastClaimDate: '',
  missions: INITIAL_MISSIONS,
  achievements: INITIAL_ACHIEVEMENTS,
  leaderboard: INITIAL_LEADERBOARD,
  perfectDodgesCount: 0,
  shieldsShatteredCount: 0,
  crownsUsedCount: 0,
  protocolAlloc: 40,
  productAlloc: 30,
  liquidityAlloc: 30,
  upgrades: {},
  unlockedNodes: [1, 2],
  inventory: INITIAL_INVENTORY,
  workflowTasks: DEFAULT_TASKS,
  phantasmRevealed: false,
  stunned: false,
  paralyzed: 0,
  ccCleanse: false,
  overlordUnlocked: false,
  tankTurns: 0,
  phantasmUnlocked: false,
  stealthTurns: 0,
  playerId: 'CF-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
  devMode: false,
  haptics: true,
  wins: 0,
  bossRushProgress: 0,
  lastAdAt: 0,
  tutorialCompleted: false,
  dailyStreakDay: 1,
  lightPassActive: false,
  starterCrownUnlocked: false,
  savedAt: new Date().toISOString(),
};

export default function App() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { 
          ...DEFAULT_STATE, 
          ...parsed,
          upgrades: parsed.upgrades || {},
          unlockedNodes: parsed.unlockedNodes || [1, 2],
          inventory: parsed.inventory && parsed.inventory.length > 0 ? parsed.inventory : INITIAL_INVENTORY,
          workflowTasks: parsed.workflowTasks && parsed.workflowTasks.length > 0 ? parsed.workflowTasks : DEFAULT_TASKS,
          overlordUnlocked: parsed.overlordUnlocked ?? false,
          tankTurns: parsed.tankTurns ?? 0,
          phantasmUnlocked: parsed.phantasmUnlocked ?? false,
          stealthTurns: parsed.stealthTurns ?? 0,
          playerId: parsed.playerId || DEFAULT_STATE.playerId,
          devMode: parsed.devMode ?? false,
          haptics: parsed.haptics ?? true,
          wins: parsed.wins ?? 0,
          bossRushProgress: parsed.bossRushProgress ?? 0,
          lastAdAt: parsed.lastAdAt ?? 0,
          tutorialCompleted: parsed.tutorialCompleted ?? false,
          dailyStreakDay: parsed.dailyStreakDay ?? 1,
        };
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_STATE;
  });

  const [packResultText, setPackResultText] = useState<string | null>(null);
  const [billingMsg, setBillingMsg] = useState<string | null>(null);
  const [adMsg, setAdMsg] = useState<string | null>(null);
  const [adCooldownSec, setAdCooldownSec] = useState<number>(0);
  const [dailyMessage, setDailyMessage] = useState<string | null>(null);
  const [tutorialMessage, setTutorialMessage] = useState<string | null>(null);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isDodging, setIsDodging] = useState<boolean>(false);
  const [pendingEnemyDamage, setPendingEnemyDamage] = useState<number>(0);
  const [showQte, setShowQte] = useState<boolean>(false);
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const [screenFlash, setScreenFlash] = useState<boolean>(false);

  // Sprite animation states for combat visual impact
  const [heroAnimState, setHeroAnimState] = useState<HeroAnimationState>('idle');
  const [bossAnimState, setBossAnimState] = useState<BossAnimationState>('idle');
  const [heroFloatingText, setHeroFloatingText] = useState<string | null>(null);
  const [bossFloatingText, setBossFloatingText] = useState<string | null>(null);

  const triggerHeroAnimation = (anim: HeroAnimationState, text?: string | null, durationMs = 600) => {
    setHeroAnimState(anim);
    if (text) setHeroFloatingText(text);
    setTimeout(() => {
      setHeroAnimState('idle');
      if (text) setHeroFloatingText(null);
    }, durationMs);
  };

  const triggerBossAnimation = (anim: BossAnimationState, text?: string | null, durationMs = 600) => {
    setBossAnimState(anim);
    if (text) setBossFloatingText(text);
    setTimeout(() => {
      setBossAnimState('idle');
      if (text) setBossFloatingText(null);
    }, durationMs);
  };

  // Modals
  const [showSoundTest, setShowSoundTest] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showDailyStreak, setShowDailyStreak] = useState<boolean>(false);
  const [showMissions, setShowMissions] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [settingsInitialTab, setSettingsInitialTab] = useState<'settings' | 'privacy'>('settings');
  const [showArtModal, setShowArtModal] = useState<'icon' | 'samantha' | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [narrateVerses, setNarrateVerses] = useState<boolean>(true);

  // Sync state to local storage on every change
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ ...state, savedAt: new Date().toISOString() })
      );
    } catch {
      // ignore
    }
  }, [state]);

  // Rewarded ad 30s cooldown ticker
  useEffect(() => {
    const updateCooldown = () => {
      const elapsed = Math.floor((Date.now() - (state.lastAdAt || 0)) / 1000);
      const rem = Math.max(0, 30 - elapsed);
      setAdCooldownSec(rem);
    };
    updateCooldown();
    const timer = setInterval(updateCooldown, 1000);
    return () => clearInterval(timer);
  }, [state.lastAdAt]);

  // Sync sound engine and voice narrator options
  useEffect(() => {
    soundEngine.setSoundEnabled(state.sound);
    soundEngine.setVolume(state.vol);
    voiceNarrator.setEnabled(state.sound);
    voiceNarrator.setVolume(state.vol);
  }, [state.sound, state.vol]);

  const triggerHaptic = (ms = 20) => {
    if (state.haptics !== false && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(ms);
      } catch {
        // ignore
      }
    }
  };

  const triggerScreenShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 400);
  };

  const triggerScreenFlash = () => {
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 350);
  };

  // Nav helpers
  const goToScreen = (s: ScreenType) => {
    soundEngine.click();
    setState(prev => ({ ...prev, screen: s, log: '' }));
  };

  const toggleSound = () => {
    const next = !state.sound;
    soundEngine.setSoundEnabled(next);
    if (next) soundEngine.click();
    setState(prev => ({ ...prev, sound: next }));
  };

  const setVolume = (v: number) => {
    soundEngine.setVolume(v);
    setState(prev => ({ ...prev, vol: v }));
  };

  // STRATEGY
  const pickStrategy = (strat: StrategyType) => {
    soundEngine.click();
    let secBonus = 0;
    let momBonus = 0;
    let faithBonus = 0;

    if (strat === 'ARCHITECT') secBonus = 20;
    if (strat === 'VELOCITY') momBonus = 0.35;
    if (strat === 'GUARDIAN') faithBonus = 50;

    setState(prev => ({
      ...prev,
      strategy: strat,
      security: prev.security + secBonus,
      momentum: prev.momentum + momBonus,
      faith: prev.faith + faithBonus,
    }));
  };

  // TREASURY
  const updateTreasury = (type: 'protocol' | 'product' | 'liquidity', val: number) => {
    setState(prev => {
      let pr = prev.protocolAlloc;
      let pd = prev.productAlloc;
      let lq = prev.liquidityAlloc;

      if (type === 'protocol') pr = val;
      if (type === 'product') pd = val;
      if (type === 'liquidity') lq = val;

      // Adjust dynamic stats based on treasury points
      const newSec = 60 + Math.round(pr * 0.8);
      const newVal = 800 + Math.round(pd * 15);
      const newFaith = 40 + Math.round(lq * 1.5);

      return {
        ...prev,
        protocolAlloc: pr,
        productAlloc: pd,
        liquidityAlloc: lq,
        security: newSec,
        valuation: newVal,
        faith: newFaith,
      };
    });
  };

  // v10.1 SAMANTHA ASCENSION & MARKETPLACE HANDLERS
  const handleAddSamanthaAscension = () => {
    soundEngine.powerUp();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id === 'sam_asc' || c.name.includes('Samantha Crowned Ascension'));
      if (alreadyHas) {
        return {
          ...prev,
          inventory: prev.inventory.map(c => (c.id === 'sam_asc' || c.name.includes('Samantha Crowned Ascension')) ? { ...c, equipped: true } : c),
          log: '👑 Samantha Crowned Ascension equipped for battle!',
        };
      }
      return {
        ...prev,
        inventory: [SAMANTHA_ASCENSION_CARD, ...prev.inventory],
        log: '✅ Samantha Crowned Ascension added! +800 DMG, WARDEN JUDGMENT, Shield +500. Equipped for battle!',
      };
    });
  };

  const handleAddJohnThunder = () => {
    soundEngine.thunder();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id === 'john_asc' || c.name.includes('John Thunder'));
      if (alreadyHas) {
        return {
          ...prev,
          inventory: prev.inventory.map(c => (c.id === 'john_asc' || c.name.includes('John Thunder')) ? { ...c, equipped: true } : c),
          phantasmRevealed: true,
          log: '⚡ John Thunder Ascension equipped! Phantasm revealed! Mark 3:17!',
        };
      }
      return {
        ...prev,
        inventory: [JOHN_THUNDER_ASCENSION_CARD, ...prev.inventory],
        phantasmRevealed: true,
        log: '✅ John Thunder added! +700 DMG, THUNDER REVEAL! Phantasm revealed! Equipped for battle!',
      };
    });
  };

  const handleAddSilasUnchained = () => {
    soundEngine.shatter();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id === 'silas_asc' || c.name.includes('Silas'));
      if (alreadyHas) {
        return {
          ...prev,
          inventory: prev.inventory.map(c => (c.id === 'silas_asc' || c.name.includes('Silas')) ? { ...c, equipped: true } : c),
          paralyzed: 2,
          ccCleanse: true,
          log: '⛓️ Silas Unchained Ascension equipped! All CC cleansed! Shadow paralyzed 2 turns! Acts 16:26!',
        };
      }
      return {
        ...prev,
        inventory: [SILAS_UNCHAINED_ASCENSION_CARD, ...prev.inventory],
        paralyzed: 2,
        ccCleanse: true,
        log: '✅ Silas added! +650 DMG, CHAIN BREAKER! All CC cleansed! Shadow paralyzed 2 turns! Equipped for battle!',
      };
    });
  };

  const handleAddOverlord = () => {
    soundEngine.strike();
    soundEngine.thunder();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id === 'overlord_asc' || c.name.includes('Overlord'));
      if (alreadyHas) {
        return {
          ...prev,
          inventory: prev.inventory.map(c => (c.id === 'overlord_asc' || c.name.includes('Overlord')) ? { ...c, equipped: true } : c),
          overlordUnlocked: true,
          tankTurns: 2,
          log: '👹 Overlord Redeemed equipped! OVERLORD CRUSH ready! Tank 50% active for 2 turns! Revelation 19:16!',
        };
      }
      return {
        ...prev,
        inventory: [OVERLORD_PLAYABLE_ASCENSION_CARD, ...prev.inventory],
        overlordUnlocked: true,
        tankTurns: 2,
        log: '✅ Overlord Redeemed added! +1200 DMG, OVERLORD CRUSH! Tank 50% active for 2 turns! Revelation 19:16!',
      };
    });
  };

  const handleSimulateBeatOverlord = () => {
    soundEngine.victory();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id === 'overlord_asc' || c.name.includes('Overlord'));
      const newInventory = alreadyHas 
        ? prev.inventory.map(c => (c.id === 'overlord_asc' || c.name.includes('Overlord')) ? { ...c, equipped: true } : c)
        : [OVERLORD_PLAYABLE_ASCENSION_CARD, ...prev.inventory];
      return {
        ...prev,
        overlordUnlocked: true,
        tankTurns: 2,
        inventory: newInventory,
        log: '🏆 OVERLORD BEATEN! Ch3 Cleared! Overlord Redeemed unlocked & added to inventory! Revelation 19:16!',
      };
    });
  };

  const handleAddPhantasm = () => {
    soundEngine.shield();
    soundEngine.thunder();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id === 'phantasm_asc' || c.name.includes('Phantasm'));
      if (alreadyHas) {
        return {
          ...prev,
          inventory: prev.inventory.map(c => (c.id === 'phantasm_asc' || c.name.includes('Phantasm')) ? { ...c, equipped: true } : c),
          phantasmUnlocked: true,
          stealthTurns: 1,
          log: '👻 Phantasm Redeemed equipped! PHANTASM GLIDE ready! Stealth active for 1 turn! 1 John 4:4!',
        };
      }
      return {
        ...prev,
        inventory: [PHANTASM_PLAYABLE_ASCENSION_CARD, ...prev.inventory],
        phantasmUnlocked: true,
        stealthTurns: 1,
        log: '✅ Phantasm Redeemed added! +900 DMG, PHANTASM GLIDE (True Damage)! Stealth active for 1 turn! 1 John 4:4!',
      };
    });
  };

  const handleSimulateBeatPhantasm = () => {
    soundEngine.victory();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id === 'phantasm_asc' || c.name.includes('Phantasm'));
      const newInventory = alreadyHas 
        ? prev.inventory.map(c => (c.id === 'phantasm_asc' || c.name.includes('Phantasm')) ? { ...c, equipped: true } : c)
        : [PHANTASM_PLAYABLE_ASCENSION_CARD, ...prev.inventory];
      return {
        ...prev,
        phantasmUnlocked: true,
        stealthTurns: 1,
        inventory: newInventory,
        log: '🏆 PHANTASM BEATEN! Ch2 Cleared! Phantasm Redeemed unlocked & added to inventory! 1 John 4:4!',
      };
    });
  };

  const handleAddLowkey = () => {
    soundEngine.shatter();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id.includes('lowkey') || c.name.includes('LOWKEY'));
      if (alreadyHas) {
        return {
          ...prev,
          inventory: prev.inventory.map(c => (c.id.includes('lowkey') || c.name.includes('LOWKEY')) ? { ...c, equipped: true } : c),
          log: '🃏 LOWKEY Judgment equipped! +1000 DMG, LOWKEY JUDGMENT 4x ready! Revelation 1:15!',
        };
      }
      return {
        ...prev,
        inventory: [{ ...LOWKEY_ASCENSION_CARD, id: `lowkey_${Date.now()}`, equipped: true }, ...prev.inventory],
        log: '✅ LOWKEY added! +1000 DMG, LOWKEY JUDGMENT 4x! Dexter likeness, Feet of Bronze! Revelation 1:15!',
      };
    });
  };

  const handleAddAbaddon = () => {
    soundEngine.thunder();
    setState(prev => {
      const alreadyHas = prev.inventory.some(c => c.id.includes('abaddon') || c.name.includes('ABADDON'));
      if (alreadyHas) {
        return {
          ...prev,
          inventory: prev.inventory.map(c => (c.id.includes('abaddon') || c.name.includes('ABADDON')) ? { ...c, equipped: true } : c),
          log: '👑 ABADDON Abyss Sting equipped! +1000 DMG, ABYSS STING 5x ready! Revelation 9:1-11!',
        };
      }
      return {
        ...prev,
        inventory: [{ ...ABADDON_ASCENSION_CARD, id: `abaddon_${Date.now()}`, equipped: true }, ...prev.inventory],
        log: '✅ ABADDON added! +1000 DMG, ABYSS STING 5x! Andrew likeness, 15-gem Crown, Firmament Blue! Revelation 9:1-11!',
      };
    });
  };

  const handleAddNemesisPair = () => {
    soundEngine.shatter();
    soundEngine.thunder();
    setState(prev => {
      const withoutPairs = prev.inventory.filter(c => !c.name.includes('LOWKEY') && !c.name.includes('ABADDON'));
      const lowkeyCard = { ...LOWKEY_ASCENSION_CARD, id: `lowkey_${Date.now()}`, equipped: true };
      const abaddonCard = { ...ABADDON_ASCENSION_CARD, id: `abaddon_${Date.now() + 1}`, equipped: true };
      return {
        ...prev,
        inventory: [lowkeyCard, abaddonCard, ...withoutPairs],
        log: '⚡ NEMESIS PAIR ACTIVATED! LOWKEY + ABADDON equipped! +50% all DMG, abilities trigger twice! Revelation 1:15 & Revelation 9:11!',
      };
    });
  };

  const handleBuyCovenantPack = () => {
    if (state.fragments < 100) {
      soundEngine.hurt();
      setPackResultText('❌ Need 100 💎 Fragments to open a Covenant Pack!');
      return;
    }
    soundEngine.powerUp();
    const r = Math.random();
    let card: Card;
    if (r < 0.02) {
      card = { ...LOWKEY_ASCENSION_CARD, id: `lowkey_${Date.now()}` };
    } else if (r < 0.04) {
      card = { ...ABADDON_ASCENSION_CARD, id: `abaddon_${Date.now()}` };
    } else if (r < 0.12) {
      card = { ...SAMANTHA_ASCENSION_CARD, id: `sam_asc_${Date.now()}` };
    } else if (r < 0.20) {
      card = { ...JOHN_THUNDER_ASCENSION_CARD, id: `john_asc_${Date.now()}` };
    } else if (r < 0.28) {
      card = { ...SILAS_UNCHAINED_ASCENSION_CARD, id: `silas_asc_${Date.now()}` };
    } else if (r < 0.66) {
      card = {
        id: `psalm_${Date.now()}`,
        name: '🔥 Psalm 91 Shield',
        scripture: 'Psalm 91:4',
        txt: 'He will cover you with His feathers',
        dmg: 280,
        cost: 1,
        sound: 'shield',
        tier: 'Biblical',
        mult: 1.8,
        equipped: false,
        effectDesc: 'Biblical Tier: 280 DMG + 150 Shield barrier.',
      };
    } else {
      card = {
        id: `conqueror_${Date.now()}`,
        name: '⚔️ Conqueror Blade',
        scripture: 'Romans 8:37',
        txt: 'More than conquerors through Him',
        dmg: 220,
        cost: 1,
        sound: 'strike',
        tier: 'Epic',
        mult: 1.0,
        equipped: false,
        effectDesc: 'Epic Tier: 220 DMG holy strike.',
      };
    }

    setPackResultText(`🎉 PULL RESULT: ${card.name} — ${card.tier || 'Epic'} (${card.dmg} DMG) added to Inventory!`);
    setState(prev => ({
      ...prev,
      fragments: prev.fragments - 100,
      inventory: [card, ...prev.inventory],
      log: `📦 Opened Covenant Pack: Pulled ${card.name}!`,
    }));
  };

  const handleToggleEquip = (cardId: string) => {
    soundEngine.click();
    setState(prev => ({
      ...prev,
      inventory: prev.inventory.map(c => c.id === cardId ? { ...c, equipped: !c.equipped } : c)
    }));
  };

  const handleAddWorkflowTask = (task: string) => {
    soundEngine.click();
    setState(prev => ({
      ...prev,
      workflowTasks: [...prev.workflowTasks, task]
    }));
  };

  const handleSpeakVerse = (text: string) => {
    voiceNarrator.speak(text);
    if ('speechSynthesis' in window) {
      try {
        const u = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(u);
      } catch {}
    }
  };

  const handleActivateQuadAscension = () => {
    soundEngine.crown();
    triggerScreenFlash();
    triggerHeroAnimation('crown', '🔺 QUAD ASCENSION!', 900);
    setState(prev => ({
      ...prev,
      hp: 1000,
      energy: 5,
      faith: prev.faith + 100,
      log: '🔺 QUAD ASCENSION! Samantha + LOWKEY + ABADDON + BEASTIE = +75% all, full heal, 4000 DMG!',
    }));
  };

  // BATTLE START (With CF-009 Brenda & Benjamin Blessings active)
  const startBattle = (ch: number) => {
    soundEngine.click();
    soundEngine.verse();
    const boss = CHAPTER_BOSSES[ch] || CHAPTER_BOSSES[1];
    setState(prev => {
      const benjaminFaithBonus = 50; // Beastie leads OMEGA (+50 Faith)
      const brendaHpBonus = 100; // Brenda Blessing: +100 HP start of battle
      return {
        ...prev,
        chapter: ch,
        bossHp: boss.hp,
        bossMax: boss.hp,
        bossShield: boss.shield,
        bossMaxShield: boss.shield,
        hp: 1000 + brendaHpBonus,
        maxHp: 1000 + brendaHpBonus,
        faith: prev.faith + benjaminFaithBonus,
        energy: 3,
        maxEnergy: 5,
        turn: 1,
        verses: 0,
        combo: 0,
        crownUsed: false,
        log: `⚔️ Entering Chapter ${ch} Arena! ${boss.name} looms. 💖 Brenda Blessing active (+100 HP)! 👑 Benjamin Blessing active (+50 Faith)!`,
        screen: 'battle',
      };
    });
    setSelectedCardId(null);
  };

  // CARD SELECTION & PLAY
  const handleSelectCard = (id: string) => {
    soundEngine.click();
    setSelectedCardId(id);
  };

  const handlePlayCard = () => {
    if (!selectedCardId) {
      soundEngine.hurt();
      setState(prev => ({ ...prev, log: '⚠️ Tap a card from your hand first before playing!' }));
      return;
    }
    const card = (state.inventory && state.inventory.find(c => c.id === selectedCardId)) || BATTLE_CARDS.find(c => c.id === selectedCardId);
    if (!card) return;

    if (state.energy < card.cost) {
      soundEngine.hurt();
      setState(prev => ({ ...prev, log: '⚡ Not enough Energy! Tap 🛡️ DEFEND (+2 ⚡) to restore energy.' }));
      return;
    }

    if (card.id === 'crown' && state.crownUsed) {
      soundEngine.hurt();
      setState(prev => ({ ...prev, log: '👑 The VannDiamond Crown has already been unleashed this battle!' }));
      return;
    }

    // If Philippians 4:13, trigger QuickTimeVerse for 3.5x shield shatter critical reflex!
    if (card.id === 'phil' || card.name.includes('Philippians')) {
      setShowQte(true);
      return;
    }

    executeCardPlay(card, false);
  };

  const executeCardPlay = (card: Card, isQteCritical: boolean) => {
    setShowQte(false);
    triggerScreenShake();

    setState(prev => {
      let energy = prev.energy - card.cost;
      let verses = prev.verses + 1;
      let combo = prev.combo + 1;
      let comboMultiplier = 1.0 + Math.min(2.0, (combo - 1) * 0.25);
      let bossHp = prev.bossHp;
      let bossShield = prev.bossShield;
      let partyHp = prev.hp;
      let crownUsed = prev.crownUsed;
      let log = '';
      let shieldsShattered = prev.shieldsShatteredCount;
      let crownsCount = prev.crownsUsedCount;

      const activeUpgrades = prev.upgrades || {};
      const beastie1Bonus = (activeUpgrades['beastie1'] || 0) * 50;
      const beastie2Bonus = (activeUpgrades['beastie2'] || 0) * 25;
      const sam2Bonus = (activeUpgrades['sam2'] || 0) > 0 ? 1.5 : 1.0;
      const verse1Heal = (activeUpgrades['verse1'] || 0) * 50;

      let cardDamage = card.dmg;
      if (card.id === 'phil' || card.name.includes('Philippians')) cardDamage += beastie1Bonus;
      if (card.id === 'burn' || card.name.includes('Aura')) cardDamage += beastie2Bonus;
      if (card.id === 'crown') cardDamage = Math.round((cardDamage + 600) * sam2Bonus);

      let baseDmg = Math.round(cardDamage * (card.mult || 1.0) * comboMultiplier);
      let isStunnedByThunder = false;
      let revealsPhantasm = false;
      let cleansesCc = false;
      let paralyzeTurns = prev.paralyzed || 0;
      let tankTurns = prev.tankTurns || 0;
      let stealthTurns = prev.stealthTurns || 0;

      if (card.name.includes('Phantasm') || card.id === 'phantasm_asc') {
        stealthTurns = 1;
        const hasJohnEquipped = prev.inventory.some(c => (c.name.includes('John') || c.id === 'john_asc') && c.equipped);
        const isRevealed = prev.phantasmRevealed || hasJohnEquipped;
        const comboMult = isRevealed ? 1.6 : 1.0; // SHADOW + THUNDER combo: +60% DMG
        const actualDmg = Math.round(baseDmg * comboMult);
        // Ignores 100% boss shield: deals pure TRUE damage straight to boss HP!
        bossHp = Math.max(0, bossHp - actualDmg);
        soundEngine.shield();
        soundEngine.thunder();
        log = isRevealed
          ? `👻⚡ SHADOW + THUNDER COMBO! John reveals, Phantasm glides! +60% DMG! -${actualDmg} TRUE DMG (ignores 100% shield)! Whole team gains STEALTH for 1 turn! 1 John 4:4!`
          : `👻 PHANTASM GLIDE! -${actualDmg} TRUE DMG directly to boss HP (ignores 100% shield)! Whole team gains STEALTH for 1 turn! 1 John 4:4!`;
        triggerHeroAnimation('attack', isRevealed ? '👻⚡ SHADOW + THUNDER!' : '👻 PHANTASM GLIDE!', 900);
        triggerBossAnimation('damage', `👻 -${actualDmg} TRUE HP!`, 850);
        triggerScreenFlash();
        if (narrateVerses) {
          voiceNarrator.speak("1 John 4:4! Greater is He who is in you than he who is in the world! Phantasm Glide!");
        }
      } else if (card.name.includes('Overlord') || card.id === 'overlord_asc') {
        tankTurns = 2;
        let actualDmg = Math.round(baseDmg * 1.4); // BOSS + ROCK combo: +40% all DMG
        // Ignores 50% shield (pierces directly to boss HP)
        if (bossShield > 0) {
          const shieldTarget = Math.round(actualDmg * 0.5);
          const shieldAbsorbed = Math.min(bossShield, shieldTarget);
          bossShield = Math.max(0, bossShield - shieldAbsorbed);
          const directHpDmg = actualDmg - shieldAbsorbed;
          bossHp = Math.max(0, bossHp - directHpDmg);
          log = `👹 OVERLORD CRUSH (BOSS + ROCK)! ${actualDmg} DMG! Ignored 50% shield (-${shieldAbsorbed} shield, -${directHpDmg} HP)! Tank 50% active for 2 turns! Revelation 19:16!`;
        } else {
          bossHp = Math.max(0, bossHp - actualDmg);
          log = `👹 OVERLORD CRUSH (BOSS + ROCK)! -${actualDmg} PIERCING DAMAGE! Tank 50% active for 2 turns! Revelation 19:16!`;
        }
        soundEngine.strike();
        soundEngine.thunder();
        triggerHeroAnimation('attack', '👹 OVERLORD CRUSH!', 900);
        triggerBossAnimation('damage', `💥 -${actualDmg} CRUSH!`, 850);
        triggerScreenFlash();
        triggerScreenShake();
        if (narrateVerses) {
          voiceNarrator.speak("Revelation 19:16! KING OF KINGS AND LORD OF LORDS! Overlord Crush!");
        }
      } else if (card.name.includes('Silas') || card.id === 'silas_asc') {
        cleansesCc = true;
        paralyzeTurns = 2;
        const hasJohnEquipped = prev.inventory.some(c => (c.name.includes('John') || c.id === 'john_asc') && c.equipped);
        let actualDmg = Math.round(baseDmg);
        if (hasJohnEquipped) {
          isStunnedByThunder = true;
          revealsPhantasm = true;
          actualDmg = Math.round(actualDmg * 1.5);
          bossHp = Math.max(0, bossHp - actualDmg);
          soundEngine.shatter();
          soundEngine.thunder();
          log = `⛓️⚡ CHAIN + THUNDER COMBO! CC Cleanse + Phantasm Reveal + 2-Turn Paralyze + Stun! -${actualDmg} DMG! Acts 16:26 & Mark 3:17!`;
          triggerHeroAnimation('attack', '⛓️⚡ CHAIN + THUNDER!', 900);
          triggerBossAnimation('damage', `⛓️⚡ -${actualDmg} DMG!`, 800);
        } else {
          bossHp = Math.max(0, bossHp - actualDmg);
          soundEngine.shatter();
          log = `⛓️ CHAIN BREAKER! All CC cleansed! Shadow Paralyzed for 2 turns! -${actualDmg} DMG! Acts 16:26!`;
          triggerHeroAnimation('attack', '⛓️ CHAIN BREAKER!', 850);
          triggerBossAnimation('damage', `⛓️ -${actualDmg} PARALYZED!`, 750);
        }
        triggerScreenFlash();
        triggerScreenShake();
        if (narrateVerses) {
          voiceNarrator.speak("Acts 16:26! Suddenly there was a violent earthquake, and every chain broke loose! Silas Unchained!");
        }
      } else if (card.name.includes('John') || card.id === 'john_asc') {
        isStunnedByThunder = true;
        revealsPhantasm = true;
        const hasSamanthaEquipped = prev.inventory.some(c => (c.name.includes('Samantha') || c.id === 'sam_asc') && c.equipped);
        if (hasSamanthaEquipped) {
          partyHp = Math.min(1000, partyHp + 500);
        }
        // Phantasm illuminated -> +50% DMG
        const phantasmBonus = 1.5;
        const actualDmg = Math.round(baseDmg * phantasmBonus);
        bossHp = Math.max(0, bossHp - actualDmg);
        soundEngine.thunder();
        log = hasSamanthaEquipped
          ? `⚡ THUNDER + WARDEN! Shield +500, Stun all 1 turn, Phantasm Revealed! -${actualDmg} DMG! Mark 3:17!`
          : `⚡ THUNDER REVEAL! Phantasm revealed (+50% DMG)! Stun all 1 turn! -${actualDmg} DMG! Mark 3:17!`;
        triggerHeroAnimation('attack', '⚡ THUNDER REVEAL!', 850);
        triggerBossAnimation('damage', `⚡ -${actualDmg} DMG!`, 750);
        triggerScreenFlash();
        triggerScreenShake();
        if (narrateVerses) {
          voiceNarrator.speak("Mark 3:17! Boanerges! Sons of Thunder! Thunder reveal!");
        }
      } else if (card.name.includes('Samantha') || card.id === 'sam_asc') {
        const shatter = Math.min(bossShield, 400);
        bossShield = Math.max(0, bossShield - 400);
        if (bossShield === 0) shieldsShattered++;
        partyHp = Math.min(1000, partyHp + 500);
        const actualDmg = Math.round(baseDmg);
        bossHp = Math.max(0, bossHp - actualDmg);
        soundEngine.crown();
        log = `👑 WARDEN JUDGMENT! Shield +500 team, 400 shatter + ${actualDmg} DMG! Judges 5:21!`;
        triggerHeroAnimation('crown', '👑 WARDEN JUDGMENT!', 850);
        triggerBossAnimation('damage', `💥 -${actualDmg} DMG!`, 750);
        triggerScreenFlash();
        if (narrateVerses) {
          voiceNarrator.speak("Judges 5:21! March on, my soul; be strong! Warden Judgment!");
        }
      } else if (card.name.includes('LOWKEY')) {
        bossShield = 0;
        shieldsShattered++;
        const hasAbaddonEquipped = prev.inventory.some(c => c.name.includes('ABADDON') && c.equipped);
        if (hasAbaddonEquipped) {
          const actualDmg = Math.round(baseDmg * 1.5 * 1.5);
          bossHp = Math.max(0, bossHp - actualDmg);
          soundEngine.shatter();
          soundEngine.thunder();
          log = `🃏👑 NEMESIS PAIR! LOWKEY + ABADDON UNLEASHED! +50% ALL DMG! LOWKEY JUDGMENT 4X + ABYSS STING 5X! -${actualDmg} DEVASTATING DAMAGE! All shields shattered! Revelation 1:15 & Revelation 9:11!`;
          triggerHeroAnimation('attack', '🃏👑 NEMESIS PAIR!', 950);
          triggerBossAnimation('damage', `💥 -${actualDmg} NEMESIS!`, 900);
          triggerScreenFlash();
          triggerScreenShake();
          if (narrateVerses) {
            voiceNarrator.speak("Revelation 1:15 & 9:11! Secret Nemesis Pair! Lowkey and Abaddon!");
          }
        } else {
          const actualDmg = Math.round(baseDmg * 1.5);
          bossHp = Math.max(0, bossHp - actualDmg);
          soundEngine.shatter();
          log = `🃏 LOWKEY JUDGMENT 4X! -${actualDmg} DEVASTATING DAMAGE! All shields shattered! Feet of Bronze! Revelation 1:15!`;
          triggerHeroAnimation('attack', '🃏 LOWKEY JUDGMENT!', 800);
          triggerBossAnimation('damage', `💥 -${actualDmg}!`, 800);
          triggerScreenFlash();
          if (narrateVerses) {
            voiceNarrator.speak("Revelation 1:15! His feet like unto fine bronze! Lowkey Judgment!");
          }
        }
      } else if (card.name.includes('ABADDON')) {
        bossShield = 0;
        shieldsShattered++;
        const hasLowkeyEquipped = prev.inventory.some(c => c.name.includes('LOWKEY') && c.equipped);
        if (hasLowkeyEquipped) {
          const actualDmg = Math.round(baseDmg * 1.8 * 1.5);
          bossHp = Math.max(0, bossHp - actualDmg);
          soundEngine.thunder();
          soundEngine.shatter();
          log = `👑🃏 NEMESIS PAIR! ABADDON + LOWKEY UNLEASHED! +50% ALL DMG! ABYSS STING 5X + LOWKEY JUDGMENT 4X! -${actualDmg} BRIMSTONE DAMAGE! All shields shattered! Revelation 9:11 & Revelation 1:15!`;
          triggerHeroAnimation('attack', '👑🃏 NEMESIS PAIR!', 950);
          triggerBossAnimation('damage', `💥 -${actualDmg} NEMESIS!`, 900);
          triggerScreenFlash();
          triggerScreenShake();
          if (narrateVerses) {
            voiceNarrator.speak("Revelation 9:11 & 1:15! Secret Nemesis Pair! Abaddon and Lowkey!");
          }
        } else {
          const actualDmg = Math.round(baseDmg * 1.8);
          bossHp = Math.max(0, bossHp - actualDmg);
          soundEngine.thunder();
          log = `👑 ABADDON ABYSS STING 5X! -${actualDmg} BRIMSTONE DAMAGE! 15-gem Crown! Firmament Blue! Revelation 9:1-11!`;
          triggerHeroAnimation('attack', '👑 ABYSS STING!', 800);
          triggerBossAnimation('damage', `💥 -${actualDmg}!`, 800);
          triggerScreenFlash();
          if (narrateVerses) {
            voiceNarrator.speak("Revelation 9:11! King of the Abyss! Abaddon!");
          }
        }
      } else if (card.id === 'crown') {
        crownUsed = true;
        crownsCount++;
        bossShield = 0;
        shieldsShattered++;
        partyHp = 1000;
        bossHp = Math.max(0, bossHp - baseDmg);
        soundEngine.crown();
        log = `👑 MAY JESUS REIGN! VANNDIAMOND CROWN SHATTERS ALL SHIELDS (-${baseDmg} DMG) + HEALS PARTY FULL!`;
        triggerHeroAnimation('crown', '👑 CROWN BURST!', 850);
        triggerBossAnimation('damage', `-${baseDmg} DMG!`, 750);
        triggerScreenFlash();
        if (narrateVerses) {
          voiceNarrator.speak("May Jesus Reign! VannDiamond Crown of Light shatters all gloom!");
        }
      } else if (card.id === 'phil') {
        const multiplier = isQteCritical ? 3.5 : (card.shieldShatterMultiplier || 2.5);
        if (bossShield > 0) {
          const shatterDmg = Math.round(baseDmg * multiplier);
          bossShield = 0;
          shieldsShattered++;
          bossHp = Math.max(0, bossHp - shatterDmg);
          soundEngine.shatter();
          log = `💥 PHILIPPIANS 4:13 ${isQteCritical ? 'HOLY CRITICAL!' : 'SMITE!'} GLOOM SHIELD SHATTERED! (-${shatterDmg} DMG)`;
          triggerHeroAnimation('attack', isQteCritical ? '💥 3.5x SHIELD CRITICAL!' : '✨ PHIL 4:13 SMITE!', 600);
          triggerBossAnimation('damage', `💥 -${shatterDmg} SHATTER!`, 650);
          if (narrateVerses) {
            voiceNarrator.speak("Philippians 4:13! I can do all things through Christ who strengthens me!");
          }
        } else {
          bossHp = Math.max(0, bossHp - baseDmg);
          soundEngine.verse(verses);
          log = `✨ PHILIPPIANS 4:13 SMITE! -${baseDmg} DMG!`;
          triggerHeroAnimation('attack', '✨ PHILIPPIANS 4:13!', 550);
          triggerBossAnimation('damage', `-${baseDmg} DMG!`, 550);
          if (narrateVerses) {
            voiceNarrator.speak("Philippians 4:13! Holy smite!");
          }
        }
      } else {
        triggerHeroAnimation('attack', `⚔️ ${card.name.toUpperCase()}!`, 550);
        triggerBossAnimation('damage', `-${baseDmg} DMG!`, 550);
        if (narrateVerses) {
          voiceNarrator.speak(`${card.name}! ${card.txt}`);
        }
        // Standard card resolution
        if (card.sound === 'thunder') soundEngine.thunder();
        else if (card.sound === 'shield') soundEngine.shield();
        else if (card.sound === 'verse') soundEngine.verse(verses);
        else if (card.sound === 'shatter') soundEngine.shatter();
        else soundEngine.strike();

        if (card.heals) {
          partyHp = Math.min(1000, partyHp + card.heals + verse1Heal);
        }

        if (bossShield > 0) {
          const absorbed = Math.min(bossShield, baseDmg);
          bossShield -= absorbed;
          baseDmg -= absorbed;
          log = `⚔️ ${card.name} dealt damage! (Shield absorbed ${absorbed})`;
        } else {
          log = `⚔️ ${card.name} struck true! -${baseDmg} DMG!`;
        }
        bossHp = Math.max(0, bossHp - baseDmg);
      }

      // Check Mission updates
      const updatedMissions = prev.missions.map(m => {
        if (m.id === 'm1' && shieldsShattered > prev.shieldsShatteredCount) {
          return { ...m, current: Math.min(m.target, m.current + 1), completed: true };
        }
        if (m.id === 'm2') {
          const next = m.current + 1;
          return { ...m, current: Math.min(m.target, next), completed: next >= m.target };
        }
        return m;
      });

      // Check Achievements
      const updatedAch = prev.achievements.map(a => {
        if (a.id === 'a1' && shieldsShattered > 0) return { ...a, unlocked: true };
        if (a.id === 'a2' && crownsCount > 0) return { ...a, unlocked: true };
        return a;
      });

      // Check victory
      if (bossHp <= 0) {
        soundEngine.victory();
        if (narrateVerses) {
          voiceNarrator.speak("Victory achieved! In Lumine Veritas! May Jesus Reign!");
        }
        const score = Math.min(
          999999999,
          Math.round((prev.valuation * prev.momentum) + (prev.security * 25) + (verses * 500))
        );

        // Add to leaderboard if qualified
        const newLeaderboard = [
          ...prev.leaderboard,
          {
            id: String(Date.now()),
            playerName: 'Samantha Warden (You)',
            score,
            chapter: prev.chapter,
            valuation: prev.valuation + 500,
            momentum: prev.momentum + 0.2,
            verses,
            date: new Date().toISOString().split('T')[0],
          }
        ].sort((a, b) => b.score - a.score).slice(0, 10);

        const achWithBoss = updatedAch.map(a => {
          if (a.id === 'a5' && prev.chapter >= 3) return { ...a, unlocked: true };
          if (a.id === 'a6' && prev.valuation >= 2000) return { ...a, unlocked: true };
          return a;
        });

        // Unlock next campaign node
        const nextChapter = prev.chapter + 1;
        const updatedUnlockedNodes = Array.from(new Set([...(prev.unlockedNodes || [1, 2]), nextChapter]));

        const isOverlordBeaten = prev.chapter === 3 || prev.overlordUnlocked;
        const isPhantasmBeaten = prev.chapter === 2 || prev.phantasmUnlocked;
        const alreadyHasOverlord = prev.inventory.some(c => c.id === 'overlord_asc' || c.name.includes('Overlord'));
        const alreadyHasPhantasm = prev.inventory.some(c => c.id === 'phantasm_asc' || c.name.includes('Phantasm'));
        let updatedInventory = prev.inventory;
        if (prev.chapter === 3 && !alreadyHasOverlord) {
          updatedInventory = [OVERLORD_PLAYABLE_ASCENSION_CARD, ...updatedInventory];
        }
        if (prev.chapter === 2 && !alreadyHasPhantasm) {
          updatedInventory = [PHANTASM_PLAYABLE_ASCENSION_CARD, ...updatedInventory];
        }

        return {
          ...prev,
          bossHp: 0,
          bossShield: 0,
          valuation: prev.valuation + 500,
          fragments: prev.fragments + 500,
          unlockedNodes: updatedUnlockedNodes,
          inventory: updatedInventory,
          overlordUnlocked: isOverlordBeaten,
          phantasmUnlocked: isPhantasmBeaten,
          wins: (prev.wins || 0) + 1,
          bossRushProgress: Math.min(3, (prev.bossRushProgress || 0) + 1),
          verses,
          combo,
          log: prev.chapter === 2
            ? `🏆 CHAPTER 2 PHANTASM DEFEATED! Phantasm Redeemed Playable Ascension UNLOCKED! +500 💎 Fragments! 1 John 4:4!`
            : prev.chapter === 3
            ? `🏆 CHAPTER 3 OVERLORD DEFEATED! Overlord Redeemed Playable Ascension UNLOCKED! +500 💎 Fragments! In Lumine Veritas!`
            : `🏆 CHAPTER ${prev.chapter} BOSS SLAIN! +500 💎 Fragments Awarded! In Lumine Veritas!`,
          missions: updatedMissions,
          achievements: achWithBoss,
          leaderboard: newLeaderboard,
          shieldsShatteredCount: shieldsShattered,
          crownsUsedCount: crownsCount,
          screen: 'victory',
        };
      }

      // Proceed to Enemy Turn with Dodge Bar (unless stunned or paralyzed)
      const isBossBlocked = isStunnedByThunder || paralyzeTurns > 0;
      if (paralyzeTurns > 0) {
        paralyzeTurns -= 1;
      }

      if (!isBossBlocked) {
        setTimeout(() => {
          const boss = CHAPTER_BOSSES[prev.chapter] || CHAPTER_BOSSES[1];
          const incoming = Math.floor(Math.random() * 40) + boss.attackPower;
          setPendingEnemyDamage(incoming);
          setIsDodging(true);
        }, 700);
      } else {
        if (isStunnedByThunder) {
          log += ' (Boss Stunned! Enemy attack skipped!)';
        } else {
          log += ` (Boss Paralyzed! Enemy attack skipped! ${paralyzeTurns > 0 ? '1 turn remaining!' : 'Paralyze expired!'})`;
        }
      }

      return {
        ...prev,
        energy,
        verses,
        combo,
        hp: partyHp,
        bossHp,
        bossShield,
        crownUsed,
        shieldsShatteredCount: shieldsShattered,
        crownsUsedCount: crownsCount,
        missions: updatedMissions,
        achievements: updatedAch,
        phantasmRevealed: prev.phantasmRevealed || revealsPhantasm,
        stunned: isStunnedByThunder,
        paralyzed: paralyzeTurns,
        ccCleanse: cleansesCc || prev.ccCleanse,
        tankTurns,
        stealthTurns,
        log,
      };
    });

    setSelectedCardId(null);
  };

  // DEFEND ACTION
  const handleDefend = () => {
    soundEngine.shield();
    triggerHeroAnimation('dodge', '🛡️ DEFEND POISE!', 550);
    if (state.paralyzed && state.paralyzed > 0) {
      setState(prev => ({
        ...prev,
        energy: Math.min(prev.maxEnergy, prev.energy + 2),
        hp: Math.min(prev.maxHp, prev.hp + 80),
        paralyzed: Math.max(0, (prev.paralyzed || 1) - 1),
        log: '🛡️ DEFEND POISE: +2 Energy & +80 HP restored! Boss remains paralyzed — attack skipped!',
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      energy: Math.min(prev.maxEnergy, prev.energy + 2),
      hp: Math.min(prev.maxHp, prev.hp + 80),
      log: '🛡️ DEFEND POISE: +2 Energy & +80 HP restored! Readying dodge reflex.',
    }));

    setTimeout(() => {
      const boss = CHAPTER_BOSSES[state.chapter] || CHAPTER_BOSSES[1];
      const incoming = Math.floor(Math.random() * 30) + Math.round(boss.attackPower * 0.7);
      setPendingEnemyDamage(incoming);
      setIsDodging(true);
    }, 600);
  };

  // DODGE RESOLUTION
  const handleDodgeComplete = (result: 'PERFECT' | 'GOOD' | 'MISS', finalDamage: number, energyBonus: number) => {
    setIsDodging(false);
    triggerScreenShake();

    if (result === 'PERFECT') {
      triggerHeroAnimation('dodge', '✨ PERFECT DODGE! +1⚡', 550);
      triggerBossAnimation('attack', 'MISS!', 450);
    } else if (result === 'GOOD') {
      triggerHeroAnimation('damage', `-${finalDamage} HP`, 500);
      triggerBossAnimation('attack', 'GLANCED!', 450);
    } else {
      triggerHeroAnimation('damage', `💥 -${finalDamage} HP`, 600);
      triggerBossAnimation('attack', 'DIRECT HIT!', 500);
    }

    setState(prev => {
      let finalTakenDamage = finalDamage;
      let remainingStealthTurns = prev.stealthTurns || 0;
      let remainingTankTurns = prev.tankTurns || 0;
      let defenseMsg = '';

      if (finalTakenDamage > 0 && remainingStealthTurns > 0) {
        finalTakenDamage = 0;
        remainingStealthTurns = Math.max(0, remainingStealthTurns - 1);
        defenseMsg = ' (Phantasm STEALTH completely evaded all incoming damage!)';
      } else if (finalTakenDamage > 0 && remainingTankTurns > 0) {
        finalTakenDamage = Math.round(finalTakenDamage * 0.5);
        remainingTankTurns = Math.max(0, remainingTankTurns - 1);
        defenseMsg = ` (Overlord absorbed 50% damage! ${remainingTankTurns > 0 ? '1 turn remaining' : 'Tank expired'})`;
      }

      const newHp = Math.max(0, prev.hp - finalTakenDamage);
      const newEnergy = Math.min(prev.maxEnergy, prev.energy + energyBonus + 1);
      const newTurn = prev.turn + 1;
      const perfectCount = prev.perfectDodgesCount + (result === 'PERFECT' ? 1 : 0);
      const newCombo = result === 'MISS' ? 0 : prev.combo;

      let log = '';
      if (result === 'PERFECT') {
        log = `✨ PERFECT DODGE! Zero damage taken, +1⚡ Energy, and COMBO x${prev.combo} preserved!`;
      } else if (result === 'GOOD') {
        log = `🛡️ GOOD DODGE! Glanced blow for -${finalTakenDamage} DMG!${defenseMsg} Combo x${prev.combo} held.`;
      } else {
        soundEngine.hurt();
        log = `💥 MISS! Boss hit for -${finalTakenDamage} DMG!${defenseMsg}${prev.combo > 1 ? ` (Combo x${prev.combo} broken!)` : ''}`;
      }

      // Mission update
      const updatedMissions = prev.missions.map(m => {
        if (m.id === 'm3' && result === 'PERFECT') {
          return { ...m, current: 1, completed: true };
        }
        return m;
      });

      // Achievement check
      const updatedAch = prev.achievements.map(a => {
        if (a.id === 'a3' && perfectCount >= 5) return { ...a, unlocked: true };
        return a;
      });

      if (newHp <= 0) {
        log = '💀 The Fellowship sustained critical damage. Pray for strength and try again!';
        return {
          ...prev,
          hp: 1000,
          bossHp: prev.bossMax,
          bossShield: prev.bossMaxShield,
          energy: 3,
          combo: 0,
          turn: 1,
          tankTurns: 0,
          stealthTurns: 0,
          log,
        };
      }

      return {
        ...prev,
        hp: newHp,
        energy: newEnergy,
        turn: newTurn,
        combo: newCombo,
        tankTurns: remainingTankTurns,
        stealthTurns: remainingStealthTurns,
        perfectDodgesCount: perfectCount,
        missions: updatedMissions,
        achievements: updatedAch,
        log: `${log} (Turn ${newTurn})`,
      };
    });
  };

  // PRAY FOR PREY
  const handlePray = () => {
    soundEngine.pray();
    setState(prev => ({
      ...prev,
      fragments: prev.fragments + 50,
      faith: prev.faith + 10,
      log: '🙏 PRAYER OFFERED: +50 Faith Fragments! Prey revealed in the dark. Ready to Hunt.',
    }));
  };

  const handleHunt = () => {
    const isGolden = Math.random() < 0.10; // 10% Golden Prey
    const gain = isGolden ? 100 : 25;

    if (isGolden) {
      soundEngine.crown();
      triggerScreenFlash();
    } else {
      soundEngine.strike();
    }

    setState(prev => ({
      ...prev,
      fragments: prev.fragments + gain,
      log: isGolden 
        ? '🌟 GOLDEN PREY REVEALED! +100 FAITH FRAGMENTS JACKPOT!' 
        : `🏹 Hunted Gloom Trooper! Cleansed shadow & gained +${gain} Faith Fragments.`,
    }));
  };

  // SHOP (DEMO)
  const handleShopPurchase = (name: string, fragmentsReward: number) => {
    soundEngine.victory();
    triggerHaptic(30);
    setState(prev => ({
      ...prev,
      fragments: prev.fragments + fragmentsReward,
      log: `🎉 ${name} purchased (Demo)! +${fragmentsReward} Faith Fragments added to inventory.`,
    }));
  };

  // v10.6 PLAY BILLING HOOK
  const handleBuyBilling = (product: 'starter_crown_bundle' | 'fragments_1000' | 'light_pass', price: number) => {
    soundEngine.victory();
    triggerHaptic(35);
    const nativeBridge = (window as unknown as { ChristFireBilling?: { purchase?: (sku: string) => boolean } }).ChristFireBilling;
    if (nativeBridge && typeof nativeBridge.purchase === 'function') {
      nativeBridge.purchase(product);
    }

    if (product === 'fragments_1000') {
      setState(prev => ({ ...prev, fragments: prev.fragments + 1000, log: '💎 Play Billing: +1,000 Fragments added!' }));
      setBillingMsg(`🛒 Play Billing Hook (${product} • $${price.toFixed(2)}): +1,000 Fragments added (Preview Sim). In Play AAB: Opens Google Play Billing.`);
    } else if (product === 'starter_crown_bundle') {
      setState(prev => ({ ...prev, fragments: prev.fragments + 500, starterCrownUnlocked: true, log: '👑 Starter Crown Bundle unlocked! +500 Fragments!' }));
      setBillingMsg(`🛒 Play Billing Hook (${product} • $${price.toFixed(2)}): +500 Fragments + Crown Starter perk added (Preview Sim). In Play AAB: Opens Google Play Billing.`);
    } else {
      setState(prev => ({ ...prev, fragments: prev.fragments + 250, lightPassActive: true, log: '🎫 Light Pass activated! +250 Fragments bonus!' }));
      setBillingMsg(`🛒 Play Billing Hook (${product} • $${price.toFixed(2)}/mo): Light Pass activated + 250 Fragments (Preview Sim). In Play AAB: Opens Google Play Billing.`);
    }
  };

  // v10.6 REWARDED AD (30s Cooldown)
  const handleWatchAd = () => {
    const now = Date.now();
    const elapsed = Math.floor((now - (state.lastAdAt || 0)) / 1000);
    if (elapsed < 30) {
      const rem = 30 - elapsed;
      soundEngine.hurt();
      setAdMsg(`⏳ Ad cooldown — wait ${rem}s before watching another rewarded ad.`);
      return;
    }
    const adBridge = (window as unknown as { ChristFireAds?: { showRewardedAd?: () => void } }).ChristFireAds;
    if (adBridge && typeof adBridge.showRewardedAd === 'function') {
      adBridge.showRewardedAd();
    }
    soundEngine.powerUp();
    triggerHaptic(25);
    const nextFrags = state.fragments + 50;
    setState(prev => ({
      ...prev,
      fragments: prev.fragments + 50,
      lastAdAt: now,
      log: `📺 Rewarded Ad completed! +50 💎 Fragments! Total: ${nextFrags}`,
    }));
    setAdMsg(`📺 Ad watched! +50 💎 Fragments awarded! Total: ${nextFrags}`);
  };

  // v10.6 BOSS RUSH (Beat 3 Bosses -> +500 + Gold Pack)
  const handleBossRush = () => {
    const progress = state.bossRushProgress || 0;
    if (progress < 3) {
      soundEngine.click();
      setState(prev => ({
        ...prev,
        log: `🏆 Boss Rush: Beat 3 bosses in a row to claim +500 💎 + Gold Pack! Current progress: ${progress}/3.`,
      }));
      return;
    }
    soundEngine.crown();
    triggerScreenFlash();
    triggerHaptic(40);
    const goldPool = [
      SAMANTHA_ASCENSION_CARD,
      JOHN_THUNDER_ASCENSION_CARD,
      SILAS_UNCHAINED_ASCENSION_CARD,
    ];
    const bonusCard: Card = {
      ...goldPool[Math.floor(Math.random() * goldPool.length)],
      id: `rush_gold_${Date.now()}`,
      equipped: true,
    };
    setState(prev => ({
      ...prev,
      fragments: prev.fragments + 500,
      bossRushProgress: 0,
      inventory: [bonusCard, ...prev.inventory],
      log: `🏆 BOSS RUSH COMPLETE! +500 💎 Fragments + Gold Pack (${bonusCard.name}) added!`,
    }));
  };

  // v10.6 DAILY LOGIN & TUTORIAL
  const handleClaimDailyTab = () => {
    const today = new Date().toISOString().split('T')[0];
    if (state.lastClaimDate === today) {
      setDailyMessage('✅ Already claimed today! Come back tomorrow to continue your streak.');
      return;
    }
    const amounts = [25, 50, 75, 100, 125, 150, 200];
    const currentDay = Math.max(1, Math.min(7, state.dailyStreakDay || 1));
    const reward = amounts[currentDay - 1];
    const nextDay = currentDay >= 7 ? 1 : currentDay + 1;
    soundEngine.crown();
    triggerHaptic(30);

    setState(prev => ({
      ...prev,
      fragments: prev.fragments + reward,
      dailyStreak: prev.dailyStreak + 1,
      dailyStreakDay: nextDay,
      lastClaimDate: today,
      log: `📅 Day ${currentDay} Daily claimed! +${reward} 💎 Fragments! Streak: ${prev.dailyStreak + 1} days.`,
    }));
    setDailyMessage(`✅ Day ${currentDay} claimed! +${reward} 💎 Fragments! Streak: ${state.dailyStreak + 1} days.`);
  };

  const handleFinishTutorial = () => {
    if (state.tutorialCompleted) {
      setTutorialMessage('✅ Tutorial reward already claimed (+100 💎).');
      return;
    }
    soundEngine.victory();
    triggerHaptic(30);
    setState(prev => ({
      ...prev,
      fragments: prev.fragments + 100,
      tutorialCompleted: true,
      log: '🎓 Tutorial Completed! +100 💎 Fragments awarded!',
    }));
    setTutorialMessage('✅ Tutorial Done! +100 💎 Fragments added! You know Battle, Covenant Packs, and Pray For Prey.');
  };

  // v10.6 DEX-ONLY DEV MODE TOGGLE
  const handleToggleDevMode = () => {
    soundEngine.click();
    triggerHaptic(15);
    const devScreens: ScreenType[] = ['oracle', 'workflow', 'aab', 'aabtest', 'aabguide'];
    setState(prev => {
      const nextDev = !prev.devMode;
      const shouldLeaveDevTab = !nextDev && devScreens.includes(prev.screen);
      return {
        ...prev,
        devMode: nextDev,
        screen: shouldLeaveDevTab ? 'home' : prev.screen,
      };
    });
  };

  const handleToggleHaptics = () => {
    soundEngine.click();
    setState(prev => {
      const next = prev.haptics === false;
      if (next && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try { navigator.vibrate(20); } catch {}
      }
      return { ...prev, haptics: next };
    });
  };

  // DAILY STREAK CLAIM (Modal compatibility)
  const handleClaimStreak = (day: number, fragments: number, isCrown?: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => {
      const nextStreak = prev.dailyStreak + 1;
      const nextDay = (prev.dailyStreakDay || 1) >= 7 ? 1 : (prev.dailyStreakDay || 1) + 1;
      const updatedAch = prev.achievements.map(a => {
        if (a.id === 'a4' && nextStreak >= 7) return { ...a, unlocked: true };
        return a;
      });

      return {
        ...prev,
        fragments: prev.fragments + fragments,
        dailyStreak: nextStreak,
        dailyStreakDay: nextDay,
        lastClaimDate: today,
        achievements: updatedAch,
        log: `📅 Day ${day} Streak Claimed! +${fragments} Fragments ${isCrown ? 'and Crown Shard!' : ''}`,
      };
    });
  };

  // MISSION CLAIM
  const handleClaimMission = (id: string, reward: number) => {
    setState(prev => ({
      ...prev,
      fragments: prev.fragments + reward,
      missions: prev.missions.map(m => m.id === id ? { ...m, claimed: true } : m),
      log: `🎯 Daily Mission completed! +${reward} Faith Fragments rewarded.`,
    }));
  };

  // NEW RUN
  const handleNewRun = () => {
    soundEngine.click();
    setState(prev => ({
      ...prev,
      screen: 'title',
      valuation: 1000,
      security: 80,
      faith: 50,
      momentum: 1.0,
      verses: 0,
      fragments: 150,
      energy: 3,
      hp: 1000,
      bossHp: 3500,
      bossShield: 500,
      bossMax: 3500,
      bossMaxShield: 500,
      turn: 1,
      combo: 0,
      log: '',
      strategy: '',
      crownUsed: false,
      chapter: 1,
    }));
  };

  // RESET ALL DATA
  const handleDeleteAllData = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem('christfire_tributes_v10');
    } catch {
      // ignore
    }
    setState({
      ...DEFAULT_STATE,
      playerId: 'CF-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
    });
  };

  const currentScore = Math.min(
    999999999,
    Math.round((state.valuation * state.momentum) + (state.security * 25) + (state.verses * 500))
  );

  return (
    <div className={`min-h-screen bg-[#05070f] text-slate-100 flex flex-col font-sans transition-all select-none ${
      screenShake ? 'shake' : ''
    } ${screenFlash ? 'flash' : ''}`}>
      {/* Top Cyber Navigation Bar */}
      <header className="w-full bg-[#080d22]/90 border-b border-amber-500/20 px-3 py-2.5 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => goToScreen('title')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <AppIconBadge 
              size="xs" 
              withGlow={true} 
              onClick={() => setShowArtModal('icon')}
            />
            <div>
              <span className="font-serif font-black tracking-wider text-sm text-amber-300 block leading-tight group-hover:text-amber-200">
                CHRISTFIRE
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-300 block">
                OMEGA GRAND SCHEME v10.6
              </span>
            </div>
          </div>

          {/* Quick HUD Metrics & Utility Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowArtModal('icon')}
              className="bg-amber-950/60 hover:bg-amber-900/70 border border-amber-400/50 px-2 py-1 rounded-lg text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 cursor-pointer transition shadow-sm"
              title="Official Character Art & Icon"
            >
              <Crown size={13} className="text-amber-400" />
              <span className="hidden sm:inline">OFFICIAL ART</span>
            </button>

            <button
              onClick={() => setShowDailyStreak(true)}
              className="bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 px-2 py-1 rounded-lg text-xs font-mono font-bold text-amber-300 flex items-center gap-1 cursor-pointer transition"
              title="Daily Streak Devotion"
            >
              <Flame size={13} className="text-amber-400 animate-pulse" />
              <span>D{state.dailyStreak}</span>
            </button>

            <button
              onClick={() => setShowMissions(true)}
              className="bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 px-2 py-1 rounded-lg text-xs font-mono font-bold text-cyan-300 flex items-center gap-1 cursor-pointer transition"
              title="Daily Missions"
            >
              <Target size={13} />
              <span className="hidden sm:inline">MISSIONS</span>
            </button>

            <button
              onClick={() => setShowLeaderboard(true)}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg text-xs font-mono font-bold text-amber-300 flex items-center gap-1 cursor-pointer transition"
              title="Hall of Faith Leaderboard"
            >
              <Trophy size={13} />
              <span className="hidden sm:inline">RANK</span>
            </button>

            <button
              onClick={() => setShowSoundTest(true)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition cursor-pointer"
              title="Procedural Sound Tester"
            >
              <span className="text-xs">🎧</span>
            </button>

            <button
              onClick={() => setShowVoiceModal(true)}
              className="bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/50 px-2 py-1 rounded-lg text-xs font-mono font-bold text-amber-300 flex items-center gap-1 cursor-pointer transition shadow-sm"
              title="Voice Narration & Sound Persona Changer"
            >
              <Mic size={13} className="text-amber-400" />
              <span className="hidden sm:inline">VOICE</span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                state.sound 
                  ? 'bg-amber-400 text-black border-amber-300 shadow-sm' 
                  : 'bg-red-950 text-red-300 border-red-500/40'
              }`}
              title={state.sound ? "Sound Mute" : "Sound Unmute"}
            >
              {state.sound ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            <button
              onClick={() => { setSettingsInitialTab('settings'); setShowSettings(true); }}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Settings & Save Backup"
            >
              <Settings size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* User Title Lockup */}
      <div className="max-w-6xl w-full mx-auto px-3 pt-3 pb-1 text-center">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider m-0">
          ✝️ CHRISTFIRE
        </h1>
        <h2 className="text-sm sm:text-base font-mono font-bold text-cyan-400 tracking-widest mt-0.5 mb-1">
          OMEGA GRAND SCHEME - BEASTIE
        </h2>
        <p className="text-xs text-slate-400">
          v10.6 — PRODUCTION FIXES + UPGRADES • Dev Tabs Gated • Cloud Save Ready • Play Billing Ready • Rewarded Ads Ready • IN LUMINE VERITAS
        </p>

        {/* Top Status Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 my-2.5">
          <div className="bg-[#11182E] border border-amber-400/80 rounded-full px-3.5 py-1.5 font-bold text-xs shadow-md">
            💎 FRAGMENTS: <b className="text-amber-400 font-black">{state.fragments}</b>
          </div>
          <div className="bg-[#11182E] border border-amber-400/80 rounded-full px-3.5 py-1.5 font-bold text-xs shadow-md">
            💰 VAL: <b className="text-amber-400 font-black">{state.valuation}</b>
          </div>
          <div className="bg-[#11182E] border border-cyan-400/80 rounded-full px-3.5 py-1.5 font-bold text-xs shadow-md">
            🛡️ SEC: <span className="text-cyan-400 font-black">{state.security}</span>
          </div>
          <div className="bg-[#11182E] border border-emerald-500/80 rounded-full px-3.5 py-1.5 font-bold text-xs shadow-md text-emerald-300">
            ☁️ SAVE: <b className="text-emerald-400">LOCAL ✓ SAVED</b>
          </div>
          <div className={`bg-[#11182E] border rounded-full px-3.5 py-1.5 font-bold text-xs shadow-md ${state.devMode ? 'border-red-500 text-red-300' : 'border-emerald-400/80 text-emerald-300'}`}>
            📱 MODE: <b>{state.devMode ? 'DEV' : 'PRODUCTION'}</b>
          </div>
          {state.devMode && (
            <>
              <button 
                onClick={() => goToScreen('oracle')}
                className="bg-[#11182E] border border-red-500/80 hover:bg-red-950/50 rounded-full px-3.5 py-1.5 font-bold text-xs shadow-md text-emerald-300 cursor-pointer transition flex items-center gap-1.5"
              >
                <Bot size={13} className="text-emerald-400" />
                <span>BFF-DEX-AI [DEV]</span>
              </button>
              <button 
                onClick={() => goToScreen('aab')}
                className="bg-[#11182E] border border-red-500/80 hover:bg-red-950/50 rounded-full px-3.5 py-1.5 font-bold text-xs shadow-md text-emerald-300 cursor-pointer transition flex items-center gap-1.5"
              >
                <Smartphone size={13} className="text-emerald-400" />
                <span>AAB ICON [DEV]</span>
              </button>
            </>
          )}
        </div>

        {/* Dex-Only Dev Mode Bar */}
        <div className="max-w-4xl mx-auto mb-3 bg-[#7c2d12]/80 border border-amber-400/80 rounded-xl px-3.5 py-2 flex flex-wrap items-center justify-center gap-2.5 text-xs">
          <span>
            <b className="text-amber-300">⚠️ DEX ONLY:</b>{' '}
            <span className="text-slate-200">
              Dev Mode hides BFF Console / Workflow / AAB Guide from players.
            </span>
          </span>
          <button
            onClick={handleToggleDevMode}
            className={`px-3 py-1 rounded-full font-black text-[11px] uppercase tracking-wider cursor-pointer transition shadow ${
              state.devMode
                ? 'bg-red-600 text-white border border-red-300'
                : 'bg-emerald-500 text-slate-950 border border-emerald-300'
            }`}
          >
            {state.devMode ? 'DEV MODE — Dev Tabs Visible' : 'PRODUCTION — Dev Tabs Hidden'}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
          {[
            { id: 'home', label: '🏠 HOME' },
            { id: 'asc', label: '🔺 ASCENSION' },
            { id: 'battle', label: '⚔️ BATTLE' },
            { id: 'market', label: '🛒 MARKETPLACE' },
            { id: 'pray', label: '🙏 PRAY' },
            { id: 'daily', label: '📅 DAILY' },
            { id: 'settings', label: '⚙️ SETTINGS' },
            { id: 'tribute', label: '👑💎 TRIBUTE' },
            { id: 'nemesis', label: '🃏👑 NEMESIS' },
            { id: 'samantha', label: '👑 SAMANTHA' },
            { id: 'john', label: '⚡ JOHN' },
            { id: 'silas', label: '⛓️ SILAS' },
            { id: 'overlord', label: '👹 OVERLORD' },
            { id: 'phantasm', label: '👻 PHANTASM' },
            { id: 'oracle', label: '🤖 BFF-DEX-AI [DEV]', devOnly: true },
            { id: 'workflow', label: '⚙️ WORKFLOW [DEV]', devOnly: true },
            { id: 'aab', label: '📦 AAB ICON [DEV]', devOnly: true },
            { id: 'aabtest', label: '🧪 AAB TEST [DEV]', devOnly: true },
            { id: 'aabguide', label: '📖 AAB GUIDE [DEV]', devOnly: true },
          ]
            .filter((tab) => !tab.devOnly || Boolean(state.devMode))
            .map((tab) => {
              const isActive = 
                state.screen === tab.id ||
                (tab.id === 'home' && (state.screen === 'title' || state.screen === 'prologue' || state.screen === 'strategy' || state.screen === 'treasury')) ||
                (tab.id === 'market' && state.screen === 'shop');

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.click();
                    if (tab.id === 'battle' && state.bossHp <= 0) {
                      startBattle(state.chapter || 1);
                    } else {
                      goToScreen(tab.id as ScreenType);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-full font-extrabold text-xs tracking-wider transition-all cursor-pointer shadow-md active:scale-95 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 border border-amber-300 shadow-[0_0_12px_rgba(255,215,0,0.4)] scale-105'
                      : tab.devOnly
                      ? 'bg-[#1a0b12] text-red-200 border border-red-500/80 hover:border-red-400'
                      : 'bg-[#11182E] text-slate-200 border border-slate-700 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
        </div>
      </div>

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-4 md:p-6 flex flex-col justify-center">
        {/* ========================================================
            SCREEN: HOME
        ======================================================== */}
        {state.screen === 'home' && (
          <HomeView
            state={state}
            onSelectScreen={(scr) => goToScreen(scr)}
            onUpdateStrategy={(strat) => pickStrategy(strat)}
            onUpdateTreasury={(pr, pd, lq) => {
              const newSec = 60 + Math.round(pr * 0.8);
              const newVal = 800 + Math.round(pd * 15);
              const newFaith = 40 + Math.round(lq * 1.5);
              setState(prev => ({
                ...prev,
                protocolAlloc: pr,
                productAlloc: pd,
                liquidityAlloc: lq,
                security: newSec,
                valuation: newVal,
                faith: newFaith,
              }));
            }}
            onLogMessage={(msg) => setState(prev => ({ ...prev, log: msg }))}
          />
        )}

        {/* ========================================================
            SCREEN: ASCENSION ROSTER
        ======================================================== */}
        {state.screen === 'asc' && (
          <AscensionRosterView
            onActivateQuadAscension={handleActivateQuadAscension}
            onNavigateToSamantha={() => goToScreen('samantha')}
            onNavigateToJohn={() => goToScreen('john')}
            onNavigateToSilas={() => goToScreen('silas')}
            onNavigateToOverlord={() => goToScreen('overlord')}
            onNavigateToPhantasm={() => goToScreen('phantasm')}
            onNavigateToNemesis={() => goToScreen('nemesis')}
          />
        )}

        {/* ========================================================
            SCREEN: SAMANTHA CROWNED ASCENSION (CF-001)
        ======================================================== */}
        {state.screen === 'samantha' && (
          <SamanthaAscensionView
            onAddSamantha={handleAddSamanthaAscension}
            hasSamantha={Boolean(state.inventory && state.inventory.find(c => c.id === 'sam_asc' || c.name.includes('Samantha Crowned Ascension')))}
            onNavigateToBattle={() => goToScreen('battle')}
          />
        )}

        {/* ========================================================
            SCREEN: JOHN THUNDER ASCENSION (CF-002)
        ======================================================== */}
        {state.screen === 'john' && (
          <JohnThunderAscensionView
            onAddJohn={handleAddJohnThunder}
            hasJohn={Boolean(state.inventory && state.inventory.find(c => c.id === 'john_asc' || c.name.includes('John Thunder')))}
            onNavigateToBattle={() => goToScreen('battle')}
          />
        )}

        {/* ========================================================
            SCREEN: SILAS UNCHAINED ASCENSION (CF-003)
        ======================================================== */}
        {state.screen === 'silas' && (
          <SilasUnchainedAscensionView
            onAddSilas={handleAddSilasUnchained}
            hasSilas={Boolean(state.inventory && state.inventory.find(c => c.id === 'silas_asc' || c.name.includes('Silas')))}
            onNavigateToBattle={() => goToScreen('battle')}
          />
        )}

        {/* ========================================================
            SCREEN: OVERLORD PLAYABLE ASCENSION (CF-004)
        ======================================================== */}
        {state.screen === 'overlord' && (
          <OverlordAscensionView
            onAddOverlord={handleAddOverlord}
            onSimulateBeatOverlord={handleSimulateBeatOverlord}
            hasOverlord={Boolean(state.inventory && state.inventory.find(c => c.id === 'overlord_asc' || c.name.includes('Overlord')))}
            overlordUnlocked={Boolean(state.overlordUnlocked)}
            onNavigateToBattle={() => goToScreen('battle')}
          />
        )}

        {/* ========================================================
            SCREEN: PHANTASM PLAYABLE ASCENSION (CF-005)
        ======================================================== */}
        {state.screen === 'phantasm' && (
          <PhantasmAscensionView
            onAddPhantasm={handleAddPhantasm}
            onSimulateBeatPhantasm={handleSimulateBeatPhantasm}
            hasPhantasm={Boolean(state.inventory && state.inventory.find(c => c.id === 'phantasm_asc' || c.name.includes('Phantasm')))}
            phantasmUnlocked={Boolean(state.phantasmUnlocked)}
            onNavigateToBattle={() => goToScreen('battle')}
          />
        )}

        {/* ========================================================
            SCREEN: MARKETPLACE & PACKS (Play Billing + Rewarded Ads)
        ======================================================== */}
        {state.screen === 'market' && (
          <MarketplaceView
            fragments={state.fragments}
            inventory={state.inventory}
            onBuyPack={handleBuyCovenantPack}
            onToggleEquip={handleToggleEquip}
            packResult={packResultText}
            onBuyBilling={handleBuyBilling}
            billingMsg={billingMsg}
            onWatchAd={handleWatchAd}
            adMsg={adMsg}
            adCooldownSec={adCooldownSec}
            onOpenSettings={() => goToScreen('settings')}
          />
        )}

        {/* ========================================================
            SCREEN: DAILY LOGIN & TUTORIAL (v10.6)
        ======================================================== */}
        {state.screen === 'daily' && (
          <DailyView
            streakCount={state.dailyStreak}
            streakDay={state.dailyStreakDay || 1}
            lastClaimDate={state.lastClaimDate}
            tutorialCompleted={Boolean(state.tutorialCompleted)}
            dailyMessage={dailyMessage}
            tutorialMessage={tutorialMessage}
            onClaimDaily={handleClaimDailyTab}
            onFinishTutorial={handleFinishTutorial}
            onNavigateToScreen={(scr) => goToScreen(scr)}
          />
        )}

        {/* ========================================================
            SCREEN: SETTINGS & PRIVACY DATA DELETION (v10.6)
        ======================================================== */}
        {state.screen === 'settings' && (
          <SettingsScreenView
            state={state}
            onToggleSound={toggleSound}
            onToggleHaptics={handleToggleHaptics}
            onToggleDevMode={handleToggleDevMode}
            onImportState={(newState) => setState(newState)}
            onDeleteAllData={handleDeleteAllData}
            onOpenPrivacyModal={() => { setSettingsInitialTab('privacy'); setShowSettings(true); }}
          />
        )}

        {/* ========================================================
            SCREEN: BFF-DEX-AI (ORACLE & TROUBLESHOOTER)
        ======================================================== */}
        {state.screen === 'oracle' && (
          <BFFDexAIView
            onSpeakVerse={handleSpeakVerse}
            onNavigateToScreen={(s) => goToScreen(s as ScreenType)}
          />
        )}

        {/* ========================================================
            SCREEN: WORKFLOW & AGENT QUEUE
        ======================================================== */}
        {state.screen === 'workflow' && (
          <WorkflowView
            tasks={state.workflowTasks || DEFAULT_TASKS}
            onAddTask={handleAddWorkflowTask}
          />
        )}

        {/* ========================================================
            SCREEN: CF-006 AAB ICON & ANDROID STUDIO SPEC
        ======================================================== */}
        {state.screen === 'aab' && (
          <AabIconView
            onBackToHome={() => goToScreen('home')}
          />
        )}

        {/* ========================================================
            SCREEN: CF-007 LOWKEY & ABADDON ART SPEC / NEMESIS PAIR
        ======================================================== */}
        {state.screen === 'nemesis' && (
          <LowkeyAbaddonArtView
            onAddLowkey={handleAddLowkey}
            onAddAbaddon={handleAddAbaddon}
            onAddBoth={handleAddNemesisPair}
            hasLowkey={Boolean(state.inventory && state.inventory.find(c => c.name.includes('LOWKEY')))}
            hasAbaddon={Boolean(state.inventory && state.inventory.find(c => c.name.includes('ABADDON')))}
            onNavigateToBattle={() => goToScreen('battle')}
          />
        )}

        {/* ========================================================
            SCREEN: CF-009 TRIBUTE TO 5 FOUNDATIONAL PILLARS
        ======================================================== */}
        {state.screen === 'tribute' && (
          <TributeView
            onNavigateToBattle={() => startBattle(state.chapter || 1)}
            onNavigateToOracle={() => goToScreen('oracle')}
          />
        )}

        {/* ========================================================
            SCREEN: CF-010 AAB TEST & PRODUCTION INTEGRITY
        ======================================================== */}
        {state.screen === 'aabtest' && (
          <AabTestView
            onBackToHome={() => goToScreen('home')}
            onNavigateToScreen={(s) => goToScreen(s as ScreenType)}
          />
        )}

        {/* ========================================================
            SCREEN: AAB UPLOAD GUIDE (HOW + FROM WHERE)
        ======================================================== */}
        {state.screen === 'aabguide' && (
          <AabGuideView
            onBackToHome={() => goToScreen('home')}
            onNavigateToScreen={(s) => goToScreen(s as ScreenType)}
          />
        )}

        {/* ========================================================
            SCREEN: NODES
        ======================================================== */}
        {state.screen === 'nodes' && (
          <NodesView
            state={state}
            onStartNodeBattle={(ch) => startBattle(ch)}
            onClaimMiracleReward={() => {
              soundEngine.powerUp();
              setState(prev => ({
                ...prev,
                fragments: prev.fragments + 120,
                faith: prev.faith + 40,
                log: '✨ Miracle Fountain Restored! +120 Fragments and +40 Faith!',
              }));
            }}
            onStartPreyHunt={() => startBattle(0)}
          />
        )}

        {/* ========================================================
            SCREEN: UPGRADES
        ======================================================== */}
        {state.screen === 'upgrades' && (
          <UpgradesView
            state={state}
            onUpgrade={(upgradeId, cost) => {
              if (state.fragments < cost) {
                soundEngine.hurt();
                return;
              }
              soundEngine.powerUp();
              setState(prev => {
                const currentLevel = (prev.upgrades || {})[upgradeId] || 0;
                const newUpgrades = { ...(prev.upgrades || {}), [upgradeId]: currentLevel + 1 };
                let newSec = prev.security;
                let newVal = prev.valuation;
                if (upgradeId === 'verse1') {
                  newSec += 40;
                  newVal += 250;
                }
                return {
                  ...prev,
                  fragments: prev.fragments - cost,
                  security: newSec,
                  valuation: newVal,
                  upgrades: newUpgrades,
                  log: `⬆️ Upgraded ${upgradeId} to Level ${currentLevel + 1}!`,
                };
              });
            }}
            onClaimDailyFragments={() => {
              soundEngine.powerUp();
              setState(prev => ({
                ...prev,
                fragments: prev.fragments + 50,
                dailyStreak: prev.dailyStreak + 1,
                log: '🎁 Claimed Daily Prayer Reward: +50 Fragments!',
              }));
            }}
            onReturnToNodes={() => goToScreen('nodes')}
          />
        )}

        {/* ========================================================
            SCREEN: BOARD
        ======================================================== */}
        {state.screen === 'board' && (
          <BoardView
            state={state}
            onSaveScore={(playerName) => {
              const curScore = Math.min(
                999999999,
                Math.floor((state.valuation * state.momentum) + (state.security * 25) + (state.verses * 500))
              );
              const newEntry = {
                id: `entry_${Date.now()}`,
                playerName,
                score: curScore,
                chapter: state.chapter,
                valuation: state.valuation,
                momentum: state.momentum,
                verses: state.verses,
                date: new Date().toLocaleDateString(),
              };
              setState(prev => ({
                ...prev,
                leaderboard: [newEntry, ...(prev.leaderboard || [])].sort((a, b) => b.score - a.score),
              }));
            }}
            onExportSave={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `christfire_save_${Date.now()}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            onImportSave={(jsonStr) => {
              try {
                const parsed = JSON.parse(jsonStr);
                setState(prev => ({ ...prev, ...parsed }));
              } catch {
                soundEngine.hurt();
                setState(prev => ({ ...prev, log: '❌ Invalid JSON save string!' }));
              }
            }}
            onResetGame={() => {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              setState(DEFAULT_STATE);
            }}
          />
        )}

        {/* ========================================================
            SCREEN: TITLE (ALTERNATE VIEW)
        ======================================================== */}
        {state.screen === 'title' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn">
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block bg-amber-400 text-black font-black font-mono text-[11px] px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                FINAL BUILD • SOUND SYNTH ON
              </span>
              <span className="text-xs font-mono text-cyan-300">
                💎 FRAGMENTS: {state.fragments}
              </span>
            </div>

            {/* Title Lockup */}
            <div className="text-center my-3">
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-amber-400 tracking-wider leading-none">
                CHRISTFIRE
              </h1>
              <div className="text-xl sm:text-2xl font-mono font-black text-cyan-300 tracking-widest mt-1">
                OMEGA PROTOCOL
              </div>
              <p className="text-[11px] tracking-widest text-slate-400 mt-1 uppercase font-serif">
                GRAND SCHEME COMPLETE • IN LUMINE VERITAS • MAY JESUS REIGN
              </p>
            </div>

            {/* Official Characters Feature Hero Showcase Card */}
            <div className="bg-[#0f1738] border-2 border-amber-400/80 rounded-3xl p-4 sm:p-5 shadow-[0_0_35px_rgba(255,215,0,0.25)] relative overflow-hidden mb-4">
              <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-amber-400/25 to-transparent blur-xl pointer-events-none" />
              
              {/* Dual Artwork Showcase: Samantha Crowned + Official App Icon */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-2">
                {/* Official Samantha Crowned */}
                <div 
                  onClick={() => setShowArtModal('samantha')}
                  className="cursor-pointer group flex flex-col items-center"
                >
                  <SamanthaCrownedPortrait size="md" />
                  <span className="text-[10px] font-mono text-cyan-300 mt-1 group-hover:text-amber-300 transition flex items-center gap-1">
                    🔍 TAP FOR HIGH-RES SAMANTHA
                  </span>
                </div>

                {/* Official App Icon (Samantha & Big Beastie) */}
                <div 
                  onClick={() => setShowArtModal('icon')}
                  className="cursor-pointer group flex flex-col items-center"
                >
                  <div className="text-center mb-1">
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block font-bold">
                      OFFICIAL APP ICON
                    </span>
                  </div>
                  <AppIconBadge size="lg" withGlow={true} />
                  <span className="text-[10px] font-mono text-amber-300 mt-1.5 group-hover:text-cyan-300 transition flex items-center gap-1">
                    🔍 SAMANTHA & BIG BEASTIE / PETER
                  </span>
                </div>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-lg font-black text-amber-300 font-serif">
                  SAMANTHA THE WARDEN & BIG BEASTIE / PETER
                </h3>
                <p className="text-xs text-cyan-200 mt-0.5">
                  VannDiamond Armored Crown of Light • JUDGES 5:21 • PHILIPPIANS 4:13
                </p>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed max-w-lg mx-auto">
                  Big Beastie / Peter speaks <b>Philippians 4:13</b>, shatters the skyscraper beam. 
                  The Crown descends from the Beacon and crowns <b>Samantha</b> — Queen of Light, Warden of the Fellowship. 
                  <b className="text-amber-300 block mt-0.5">IN LUMINE VERITAS • May Jesus Reign.</b>
                </p>
              </div>

              {/* Fellowship party summary */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-700/60 text-xs">
                <div className="bg-slate-950/80 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Valuation</span>
                  <span className="font-mono font-bold text-amber-300">{state.valuation}</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Security</span>
                  <span className="font-mono font-bold text-cyan-300">{state.security}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => goToScreen('prologue')}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-base rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.4)] active:scale-98 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Play size={18} fill="black" />
                <span>PLAY — START PROLOGUE</span>
              </button>

              <button
                onClick={() => startBattle(1)}
                className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-sm rounded-2xl shadow-[0_0_15px_rgba(0,229,255,0.35)] active:scale-98 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                <span>⚔️ JUMP TO BATTLE — TEST SOUND NOW</span>
              </button>

              <button
                onClick={() => setShowSoundTest(true)}
                className="w-full py-2.5 bg-[#17224d] hover:bg-[#1f2d66] border border-cyan-500/40 text-cyan-200 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🎧 PROCEDURAL SOUND TESTER — Strike / Verse / Shatter / Crown</span>
              </button>
            </div>

            {/* Quick How-to-play Card */}
            <div className="mt-4 bg-[#090e24] border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-300">
              <b className="text-amber-300 block mb-1 font-serif">HOW TO PLAY:</b>
              <p className="leading-relaxed text-[11px]">
                Play 1–2 cards per turn. Philippians 4:13 triggers 3-sec Quick-Time reflex to shatter boss shield instantly for x3.5. 
                VannDiamond Crown shatters ALL shields + heals full once per battle. 
                Time your Real-Time Dodge when the boss strikes!
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN: PROLOGUE
        ======================================================== */}
        {state.screen === 'prologue' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider">
              PROLOGUE
            </h1>
            <div className="text-xs font-mono text-cyan-300 tracking-widest uppercase mb-3">
              OUT OF THE SHADOWS • BLACKOUT INITIATION
            </div>

            <div className="bg-[#0f1738] border border-amber-500/40 rounded-3xl p-5 shadow-lg space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <BigBeastiePortrait size="sm" />
                <div>
                  <b className="text-cyan-300 font-mono text-xs block">BIG BEASTIE / PETER</b>
                  <p className="text-[11px] text-slate-300 mt-1 italic">
                    &ldquo;Illustrious illuminated land → sudden shockwave strips all color → city plunges into darkness.&rdquo;
                  </p>
                </div>
              </div>

              <p>
                Big Beastie is pinned under a collapsing skyscraper beam in the ruined downtown plaza. 
                Phantoms of the Gloom emerge from the shadows to seal the doom of the Fellowship.
              </p>

              <div className="p-3 bg-amber-400/10 border-l-4 border-amber-400 rounded-r-xl">
                <p className="font-serif font-bold text-amber-300">
                  He speaks PHILIPPIANS 4:13:
                </p>
                <p className="italic text-slate-100 mt-1 text-xs sm:text-sm">
                  &ldquo;I can do all things through Christ who strengthens me.&rdquo;
                </p>
                <p className="text-[10px] text-cyan-300 mt-1 font-mono">
                  Gold flash erupts • The heavy steel beam shatters into dust • His fedora halo burns radiant blue!
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <SamanthaCrownedPortrait size="sm" />
                <div>
                  <b className="text-amber-300 font-serif text-xs block">THE CORONATION OF SAMANTHA</b>
                  <p className="text-[11px] text-slate-300 mt-1">
                    The VannDiamond Armored Crown of Light descends from the celestial Beacon. 
                    Samantha is crowned Queen of Light and Warden of the Fellowship. 
                    <span className="text-amber-400 font-bold block mt-1">May Jesus Reign.</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => goToScreen('strategy')}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-sm rounded-2xl shadow-lg transition cursor-pointer"
            >
              CONTINUE → STRATEGY SELECT
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN: STRATEGY
        ======================================================== */}
        {state.screen === 'strategy' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider">
              STRATEGY SELECT
            </h1>
            <p className="text-xs text-cyan-300 font-mono mb-4">
              Choose your foundational fellowship doctrine for this campaign
            </p>

            <div className="bg-[#0f1738] border border-amber-500/40 rounded-3xl p-5 shadow-lg space-y-3 mb-4">
              <button
                onClick={() => pickStrategy('ARCHITECT')}
                className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                  state.strategy === 'ARCHITECT' 
                    ? 'bg-amber-400/20 border-amber-400 shadow-[0_0_15px_rgba(255,215,0,0.3)]' 
                    : 'bg-[#141d40] border-slate-700 hover:border-amber-400/50'
                }`}
              >
                <div>
                  <div className="font-black text-sm text-amber-300 font-serif">ARCHITECT DOCTRINE</div>
                  <div className="text-xs text-slate-300 mt-0.5">Focus on cyber-cathedral structural fortification</div>
                </div>
                <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/40">
                  +20 Security
                </span>
              </button>

              <button
                onClick={() => pickStrategy('VELOCITY')}
                className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                  state.strategy === 'VELOCITY' 
                    ? 'bg-cyan-400/20 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                    : 'bg-[#141d40] border-slate-700 hover:border-cyan-400/50'
                }`}
              >
                <div>
                  <div className="font-black text-sm text-cyan-300 font-serif">VELOCITY DOCTRINE</div>
                  <div className="text-xs text-slate-300 mt-0.5">High-cadence verse chaining & momentum multiplier</div>
                </div>
                <span className="text-xs font-mono font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/40">
                  +0.35 Momentum
                </span>
              </button>

              <button
                onClick={() => pickStrategy('GUARDIAN')}
                className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                  state.strategy === 'GUARDIAN' 
                    ? 'bg-purple-400/20 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                    : 'bg-[#141d40] border-slate-700 hover:border-purple-400/50'
                }`}
              >
                <div>
                  <div className="font-black text-sm text-purple-300 font-serif">GUARDIAN DOCTRINE</div>
                  <div className="text-xs text-slate-300 mt-0.5">Faith communion and enhanced spiritual endurance</div>
                </div>
                <span className="text-xs font-mono font-black text-purple-200 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-500/40">
                  +50 Faith
                </span>
              </button>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs flex justify-between">
                <span className="text-slate-400">Selected Strategy:</span>
                <span className="font-bold text-amber-300 font-mono">{state.strategy || '— PLEASE SELECT —'}</span>
              </div>
            </div>

            <button
              onClick={() => goToScreen('treasury')}
              disabled={!state.strategy}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 disabled:opacity-40 text-black font-black text-sm rounded-2xl shadow-lg transition cursor-pointer"
            >
              CONTINUE → TREASURY ALLOCATION
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN: TREASURY
        ======================================================== */}
        {state.screen === 'treasury' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider">
              TREASURY ALLOCATION
            </h1>
            <p className="text-xs text-cyan-300 font-mono mb-4">
              Allocate 100 Resource Units across Protocol, Product, and Liquidity
            </p>

            <div className="bg-[#0f1738] border border-amber-500/40 rounded-3xl p-5 shadow-lg space-y-4 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-200">Protocol (Fortifies Security)</span>
                  <span className="font-mono text-cyan-300 font-bold">{state.protocolAlloc} Units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={state.protocolAlloc}
                  onChange={(e) => updateTreasury('protocol', parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-200">Product (Boosts Valuation)</span>
                  <span className="font-mono text-amber-300 font-bold">{state.productAlloc} Units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={state.productAlloc}
                  onChange={(e) => updateTreasury('product', parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-200">Liquidity (Expands Faith & Energy)</span>
                  <span className="font-mono text-purple-300 font-bold">{state.liquidityAlloc} Units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={state.liquidityAlloc}
                  onChange={(e) => updateTreasury('liquidity', parseInt(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>

              {/* Dynamic stats preview */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-700 text-center">
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SECURITY</span>
                  <span className="text-sm font-mono font-black text-cyan-300">{state.security}</span>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">VALUATION</span>
                  <span className="text-sm font-mono font-black text-amber-300">{state.valuation}</span>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">FAITH</span>
                  <span className="text-sm font-mono font-black text-purple-300">{state.faith}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => goToScreen('map')}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-black text-sm rounded-2xl shadow-lg transition cursor-pointer"
            >
              CONTINUE → CAMPAIGN MAP
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN: CAMPAIGN MAP
        ======================================================== */}
        {state.screen === 'map' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider">
                CAMPAIGN MAP
              </h1>
              <span className="text-xs font-mono text-cyan-300">
                FAITH FRAGMENTS: 💎 {state.fragments}
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              March across the fallen sectors and break the Gloom Commander hierarchy
            </p>

            <div className="space-y-3.5 mb-5">
              {/* Prey Skirmish - Gloom Trooper */}
              <div className="bg-[#120a28] border-2 border-purple-500/70 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-purple-400 shadow-md shrink-0 bg-black">
                    <img 
                      src={GLOOM_TROOPER_IMG} 
                      alt="Gloom Trooper - Prey Encounter" 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-300 font-bold block">PREY SKIRMISH</span>
                    <h3 className="font-serif font-black text-base text-white">GLOOM TROOPER</h3>
                    <p className="text-xs text-purple-300 font-mono">
                      Dark Hearts Vanguard • 1,800 HP + 300 Gloom Shield
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startBattle(0)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 text-white font-black text-xs rounded-xl shadow cursor-pointer whitespace-nowrap"
                >
                  ⚔️ HUNT PREY
                </button>
              </div>

              {/* Chapter 1 */}
              <div className="bg-[#0f1738] border-2 border-amber-400/70 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-purple-500/80 shadow-md shrink-0 bg-black">
                    <img 
                      src={BOSS_MALICE_IMG} 
                      alt="Commander Malice" 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 font-bold block">CHAPTER 1</span>
                    <h3 className="font-serif font-black text-base text-white">BLACKOUT DOWNTOWN</h3>
                    <p className="text-xs text-purple-300 font-mono">
                      Boss: Commander Malice • 3,500 HP + 500 Gloom Shield
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startBattle(1)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 text-black font-black text-xs rounded-xl shadow cursor-pointer whitespace-nowrap"
                >
                  ⚔️ FIGHT MALICE
                </button>
              </div>

              {/* Chapter 2 */}
              <div className="bg-[#0e1635] border border-cyan-500/60 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-cyan-400/80 shadow-md shrink-0 bg-black">
                    <img 
                      src={BOSS_PHANTASM_IMG} 
                      alt="Phantasm" 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold block">CHAPTER 2</span>
                    <h3 className="font-serif font-black text-base text-white">NEON SHADOWS</h3>
                    <p className="text-xs text-cyan-300 font-mono">
                      Boss: Phantasm • 4,200 HP + 750 Shield • Glide Stride
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startBattle(2)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-black font-black text-xs rounded-xl shadow cursor-pointer whitespace-nowrap"
                >
                  ⚔️ FIGHT PHANTASM
                </button>
              </div>

              {/* Chapter 3 */}
              <div className="bg-[#120f26] border border-purple-500/60 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-purple-400/80 shadow-md shrink-0 bg-black">
                    <img 
                      src={BOSS_OVERLORD_IMG} 
                      alt="Overlord" 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-300 font-bold block">CHAPTER 3 — FINALE</span>
                    <h3 className="font-serif font-black text-base text-white">ANCIENT SOURCE CITADEL</h3>
                    <p className="text-xs text-purple-300 font-mono">
                      Boss: Overlord • 6,000 HP + 1,200 Shield • Trinity Beam
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startBattle(3)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 text-white font-black text-xs rounded-xl shadow cursor-pointer whitespace-nowrap"
                >
                  ⚔️ FIGHT OVERLORD
                </button>
              </div>
            </div>

            {/* Campaign Navigation Shortcuts */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => goToScreen('pray')}
                className="py-3 bg-[#131b3e] hover:bg-[#1a2554] border border-cyan-500/30 text-cyan-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🙏 PRAY FOR PREY</span>
              </button>
              <button
                onClick={() => goToScreen('shop')}
                className="py-3 bg-[#131b3e] hover:bg-[#1a2554] border border-amber-500/30 text-amber-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🛒 FAITH SHOP</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN: BATTLE (2-COLUMN RESPONSIVE LAYOUT)
        ======================================================== */}
        {state.screen === 'battle' && (
          <div className="max-w-5xl mx-auto w-full animate-fadeIn">
            {/* Top Battle Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-[#0c122c] border border-amber-500/30 rounded-2xl px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  CH {state.chapter}
                </span>
                <span className="text-xs font-mono text-slate-300">
                  TURN {state.turn}
                </span>
                <span className="text-xs font-mono text-emerald-300 font-bold">
                  WINS {state.wins || 0}
                </span>
                <span className="text-xs font-mono text-purple-300 font-bold">
                  RUSH {state.bossRushProgress || 0}/3
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-300">
                  ⚡ ENERGY {state.energy}/{state.maxEnergy}
                </span>
              </div>
            </div>

            {/* Visual Combo Multiplier Indicator */}
            <div className="mb-3.5">
              <ComboMultiplierBadge 
                combo={state.combo}
                multiplier={1.0 + Math.min(2.0, Math.max(0, state.combo - 1) * 0.25)}
                selectedCardDamage={BATTLE_CARDS.find(c => c.id === selectedCardId)?.dmg || null}
                selectedCardName={BATTLE_CARDS.find(c => c.id === selectedCardId)?.name || null}
              />
            </div>

            {/* Responsive Grid: 2 columns on desktop (max 1100px), single column on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* ================= LEFT COLUMN: BOSS ARENA & COMBAT FEEDBACK ================= */}
              <div className="space-y-4">
                {/* Boss Card */}
                <div className="bg-[#110b24] border-2 border-purple-500/60 rounded-3xl p-4 sm:p-5 shadow-[0_0_30px_rgba(168,85,247,0.25)] relative overflow-hidden">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
                        GLOOM OPPONENT • LV 20
                      </span>
                      <h2 className="text-lg sm:text-xl font-serif font-black text-purple-200">
                        {state.chapter === 0
                          ? 'GLOOM TROOPER (PREY)'
                          : state.chapter === 1 
                          ? 'COMMANDER MALICE' 
                          : state.chapter === 2 
                          ? 'PHANTASM' 
                          : 'THE OVERLORD'}
                      </h2>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400 block">
                        HP {state.bossHp} / {state.bossMax}
                      </span>
                      <span className="text-xs font-mono text-purple-400 font-bold">
                        SHIELD {state.bossShield}
                      </span>
                    </div>
                  </div>

                  {/* Boss Portrait Center with Real Boss Photo & Sprite Animations */}
                  <div className="my-2 flex justify-center">
                    <BossPortrait 
                      bossId={state.chapter === 0 ? 'gloom_trooper' : state.chapter === 1 ? 'malice' : state.chapter === 2 ? 'phantasm' : 'overlord'}
                      shieldActive={state.bossShield > 0}
                      hpRatio={state.bossHp / state.bossMax}
                      animationState={bossAnimState}
                      floatingText={bossFloatingText}
                    />
                  </div>

                  {/* Dark Heart Crack Progression Component */}
                  <div className="my-2.5">
                    <DarkHeartCrack 
                      hpRatio={state.bossHp / state.bossMax}
                      hp={state.bossHp}
                      maxHp={state.bossMax}
                    />
                  </div>

                  {/* Boss HP Bar */}
                  <div className="space-y-1.5 mt-2">
                    <div className="flex justify-between text-[10px] font-mono text-slate-300">
                      <span>DARK HEART HP ({Math.round((state.bossHp / state.bossMax) * 100)}%)</span>
                      <span className="text-red-400 font-bold">{state.bossHp} / {state.bossMax}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-950 rounded-full border border-red-950 overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 transition-all duration-300"
                        style={{ width: `${Math.max(0, (state.bossHp / state.bossMax) * 100)}%` }}
                      />
                      {/* Visual Crack Threshold Markers */}
                      <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-yellow-300/60 pointer-events-none" title="60% Crack Point" />
                      <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-cyan-300/70 pointer-events-none" title="30% Shatter Point" />
                    </div>

                    {/* Shield Bar */}
                    <div className="flex justify-between text-[10px] font-mono text-purple-300 pt-1">
                      <span>GLOOM SHIELD BARRIER</span>
                      <span>{state.bossShield} / {state.bossMaxShield}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full border border-purple-950 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 transition-all duration-300"
                        style={{ width: `${Math.max(0, (state.bossShield / state.bossMaxShield) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Combat State: Phantasm Boss, Stun, Paralyze, CC, Tank, Overlord, Stealth & Phantasm Ally */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 mt-2.5 text-[10px] font-mono">
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-purple-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Boss Veil:</span>
                      {state.phantasmRevealed ? (
                        <span className="text-cyan-300 font-bold">REVEALED</span>
                      ) : (
                        <span className="text-purple-400">HIDDEN</span>
                      )}
                    </div>
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-cyan-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Stun:</span>
                      {state.stunned ? (
                        <span className="text-cyan-300 font-bold">STUNNED</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </div>
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-orange-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Paralyze:</span>
                      {state.paralyzed && state.paralyzed > 0 ? (
                        <span className="text-orange-400 font-bold">{state.paralyzed}T</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </div>
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-slate-400">CC:</span>
                      {state.ccCleanse ? (
                        <span className="text-emerald-400 font-bold">CLEANSED</span>
                      ) : (
                        <span className="text-slate-500">Normal</span>
                      )}
                    </div>
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-red-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Tank 50%:</span>
                      {state.tankTurns && state.tankTurns > 0 ? (
                        <span className="text-red-400 font-bold">{state.tankTurns}T</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </div>
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-amber-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Overlord:</span>
                      {state.overlordUnlocked ? (
                        <span className="text-amber-300 font-bold">UNLOCKED</span>
                      ) : (
                        <span className="text-slate-500">LOCKED</span>
                      )}
                    </div>
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-purple-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Stealth:</span>
                      {state.stealthTurns && state.stealthTurns > 0 ? (
                        <span className="text-purple-300 font-bold">STEALTH (1T)</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </div>
                    <div className="bg-[#0c071a] p-1.5 rounded-lg border border-indigo-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Phantasm:</span>
                      {state.phantasmUnlocked ? (
                        <span className="text-purple-300 font-bold">UNLOCKED</span>
                      ) : (
                        <span className="text-slate-500">LOCKED</span>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-2.5 flex items-center justify-between text-xs font-mono bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="flex items-center gap-1.5">
                      {state.bossShield <= 0 ? (
                        <span className="text-amber-300 font-bold flex items-center gap-1">
                          💔 HEART CRACKED — WEAK TO HOLY SMITE!
                        </span>
                      ) : (
                        <span className="text-purple-300 flex items-center gap-1">
                          ❤️🔥 Gloom Shield Barrier Active ({state.bossShield} HP)
                        </span>
                      )}
                    </span>
                    <span className="text-slate-400">
                      {state.crownUsed ? '👑 Crown Expended' : '👑 Crown Ready'}
                    </span>
                  </div>
                </div>

                {/* Combat Log Banner */}
                <div className="bg-[#0b1024] border border-cyan-500/30 rounded-2xl p-3 text-center min-h-[50px] flex items-center justify-center shadow-inner">
                  <p className="text-xs sm:text-sm font-mono font-bold text-amber-300">
                    {state.log || 'Select a card or tap Defend to engage in holy combat!'}
                  </p>
                </div>

                {/* Quick Utility Row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => goToScreen('pray')}
                    className="flex-1 py-2 bg-[#10183b] hover:bg-[#16214f] border border-slate-800 text-cyan-300 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    🙏 PRAY & AI
                  </button>
                  <button
                    onClick={() => setShowVoiceModal(true)}
                    className="flex-1 py-2 bg-[#121c45] hover:bg-[#19275e] border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    title="Voice Persona & Sound Changer"
                  >
                    <Mic size={12} className="text-amber-400" />
                    <span>VOICE</span>
                  </button>
                  <button
                    onClick={() => goToScreen('shop')}
                    className="flex-1 py-2 bg-[#10183b] hover:bg-[#16214f] border border-slate-800 text-amber-300 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    🛒 SHOP
                  </button>
                  <button
                    onClick={() => goToScreen('map')}
                    className="flex-1 py-2 bg-[#10183b] hover:bg-[#16214f] border border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    🗺️ MAP
                  </button>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: FELLOWSHIP PARTY & CARDS HAND ================= */}
              <div className="space-y-4">
                {/* Samantha & Fellowship Hero HUD with Real Crowned Samantha Photo */}
                <div className="bg-[#0f1738] border-2 border-amber-400/80 rounded-3xl p-4 sm:p-5 shadow-[0_0_25px_rgba(255,215,0,0.2)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Real Crowned Samantha Photo Avatar with Keyframe Sprite Animation System */}
                      <div 
                        onClick={() => setShowArtModal('samantha')}
                        className={`w-16 h-22 sm:w-20 sm:h-26 rounded-2xl overflow-hidden border-2 ${
                          heroAnimState === 'damage' ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.85)]' :
                          heroAnimState === 'crown' ? 'border-amber-300 shadow-[0_0_35px_rgba(255,215,0,0.9)]' :
                          heroAnimState === 'dodge' ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.85)]' :
                          'border-amber-400 shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                        } shrink-0 bg-black cursor-pointer hover:scale-105 transition-all relative ${
                          heroAnimState === 'attack' ? 'sprite-hero-attack' :
                          heroAnimState === 'damage' ? 'sprite-hero-damage' :
                          heroAnimState === 'dodge' ? 'sprite-hero-dodge' :
                          heroAnimState === 'crown' ? 'sprite-hero-crown' :
                          'sprite-hero-idle'
                        }`}
                        title="Samantha Crowned - Real Photo (Tap to view full)"
                      >
                        {/* Floating Combat Text Indicator */}
                        {heroFloatingText && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap">
                            <span className="fx-combat-number inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-black shadow-lg bg-black/95 border border-amber-400 text-amber-300">
                              {heroFloatingText}
                            </span>
                          </div>
                        )}

                        {/* Special VFX Overlays */}
                        {heroAnimState === 'crown' && (
                          <div className="absolute inset-0 bg-radial from-amber-300/60 to-transparent pointer-events-none animate-ping z-20" />
                        )}
                        {heroAnimState === 'damage' && (
                          <div className="absolute inset-0 bg-red-600/40 pointer-events-none z-20 animate-pulse" />
                        )}
                        {heroAnimState === 'dodge' && (
                          <div className="absolute inset-0 border-2 border-cyan-400 bg-cyan-400/20 pointer-events-none z-20" />
                        )}
                        {heroAnimState === 'attack' && (
                          <div className="absolute inset-0 bg-radial from-amber-400/40 via-cyan-400/20 to-transparent pointer-events-none z-20 animate-pulse" />
                        )}

                        <img 
                          src={SAMANTHA_CROWNED_HERO} 
                          alt="Samantha Crowned" 
                          className="w-full h-full object-cover object-top" 
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Crown size={15} className="text-amber-400" />
                          <span className="font-serif font-black text-amber-300 text-sm leading-tight">
                            SAMANTHA CROWNED
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 block">
                          JUDGES 5:21 • QUEEN OF LIGHT
                        </span>
                        <span className="text-[9px] text-slate-300 block">
                          Burgundy-red hair • Tattooed arm • White+Gold Armor
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-sm text-emerald-400 block">
                        ❤️ {state.hp} / {state.maxHp} HP
                      </span>
                      <span className="text-[9px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                        {state.crownUsed ? '👑 Crown Used' : '👑 Crown Ready'}
                      </span>
                    </div>
                  </div>

                  {/* Player HP Bar */}
                  <div className="w-full h-3 bg-slate-950 rounded-full border border-emerald-950 overflow-hidden mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${Math.max(0, (state.hp / state.maxHp) * 100)}%` }}
                    />
                  </div>

                  {/* Fellowship Roster Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-300">
                    <span className="bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded text-amber-300">
                      Samantha (Judges 5:21)
                    </span>
                    <span className="bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded text-cyan-300">
                      Peter (Phil 4:13)
                    </span>
                    <span className="bg-blue-950/60 border border-blue-500/40 px-2 py-0.5 rounded text-blue-300">
                      John (Mark 3:17)
                    </span>
                    <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-300">
                      Verses: {state.verses}
                    </span>
                  </div>
                </div>

                {/* Hand of Cards */}
                <div className="bg-[#0a0f24] border border-slate-800 rounded-3xl p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-xs font-serif font-black text-amber-300">
                      ✋ SCRIPTURE CARDS DECK
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      TAP CARD TO SELECT • SPACE TO PLAY
                    </span>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
                    {BATTLE_CARDS.map((c) => {
                      const isSelected = selectedCardId === c.id;
                      const isCrownDisabled = c.id === 'crown' && state.crownUsed;

                      return (
                        <div
                          key={c.id}
                          onClick={() => !isCrownDisabled && handleSelectCard(c.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                            c.isLegendary
                              ? 'bg-gradient-to-br from-amber-950/80 via-yellow-950/60 to-purple-950/80 border-amber-400'
                              : 'bg-white text-slate-950 border-slate-200 hover:border-cyan-400'
                          } ${
                            isSelected 
                              ? 'ring-4 ring-cyan-400 scale-[1.02] shadow-[0_0_20px_rgba(0,229,255,0.6)] !border-cyan-300' 
                              : ''
                          } ${
                            isCrownDisabled ? 'opacity-40 cursor-not-allowed' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {c.image && (
                              <img 
                                src={c.image} 
                                alt={c.name} 
                                className="w-11 h-16 rounded-lg object-contain bg-[#05070F] border border-amber-400/80 shrink-0 shadow-sm" 
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1 mb-1">
                                <b className={`text-xs font-serif font-black leading-tight truncate ${c.isLegendary ? 'text-amber-300' : 'text-slate-900'}`}>
                                  {c.name}
                                </b>
                                <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded shrink-0 ${
                                  c.isLegendary ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'
                                }`}>
                                  {c.cost} ⚡
                                </span>
                              </div>

                              <p className={`text-[11px] italic mb-1 leading-snug line-clamp-2 ${c.isLegendary ? 'text-amber-100' : 'text-slate-700'}`}>
                                &ldquo;{c.txt}&rdquo;
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 pt-1.5 border-t border-slate-300/40 flex items-center justify-between text-[10px] font-mono">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`font-bold ${c.isLegendary ? 'text-cyan-300' : 'text-cyan-700'}`}>
                                {c.dmg} DMG
                              </span>
                              {state.combo > 1 && (
                                <span className="text-[9px] font-black text-amber-300 bg-amber-950/90 px-1 py-0.2 rounded border border-amber-500/50 shadow-sm animate-pulse">
                                  ➔ {Math.round(c.dmg * (1.0 + Math.min(2.0, (state.combo - 1) * 0.25)))}
                                </span>
                              )}
                            </div>
                            <span className={c.isLegendary ? 'text-amber-200' : 'text-slate-500'}>
                              {c.sound.toUpperCase()} FX
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Battle Controls Row */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800">
                    <button
                      onClick={handlePlayCard}
                      disabled={!selectedCardId}
                      className="py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 disabled:opacity-40 text-black font-black text-xs sm:text-sm rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.4)] transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Zap size={16} />
                      <span>
                        PLAY SELECTED
                        {selectedCardId && (
                          <span className="ml-1 opacity-90 font-mono text-[11px]">
                            ({Math.round((BATTLE_CARDS.find(c => c.id === selectedCardId)?.dmg || 0) * (1.0 + Math.min(2.0, Math.max(0, state.combo - 1) * 0.25)))} DMG)
                          </span>
                        )}
                      </span>
                    </button>

                    <button
                      onClick={handleDefend}
                      className="py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-black font-black text-xs sm:text-sm rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.3)] transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Shield size={16} />
                      <span>DEFEND (+2 ⚡)</span>
                    </button>
                  </div>

                  {/* v10.6 Boss Rush & Rewarded Ad Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={handleBossRush}
                      className="py-2.5 px-3 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-400/60 text-amber-300 font-black text-xs rounded-xl transition cursor-pointer"
                    >
                      🏆 BOSS RUSH ({state.bossRushProgress || 0}/3) → +500 &amp; GOLD PACK
                    </button>

                    <button
                      onClick={handleWatchAd}
                      disabled={adCooldownSec > 0}
                      className="py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl transition cursor-pointer"
                    >
                      {adCooldownSec > 0
                        ? `⏳ AD COOLDOWN (${adCooldownSec}s)`
                        : '📺 WATCH AD → +50 FRAGMENTS'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN: PRAY FOR PREY
        ======================================================== */}
        {state.screen === 'pray' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider">
              🙏 PRAY FOR PREY
            </h1>
            <p className="text-xs text-cyan-300 font-mono mb-4">
              Consecrate the fellowship • Reveal the shadows • Hunt for Faith Fragments
            </p>

            {/* AI Prophetic Devotional & Voice Narrator Card */}
            <div className="mb-4">
              <AIDevotionalCard 
                chapter={state.chapter} 
                onOpenVoiceSettings={() => setShowVoiceModal(true)}
              />
            </div>

            <div className="bg-[#0f1738] border-2 border-purple-500/70 rounded-3xl p-5 shadow-lg space-y-4 mb-4 text-center">
              {/* Real Gloom Trooper Photo Prey Card */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#140b2b] border-2 border-purple-400/80 rounded-2xl p-3.5 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-purple-400 shadow-md shrink-0 bg-black relative">
                  <img 
                    src={GLOOM_TROOPER_IMG} 
                    alt="Gloom Trooper - Prey Target" 
                    className="w-full h-full object-cover object-top" 
                  />
                  <div className="absolute top-1 left-1 bg-red-950/90 border border-red-500 text-red-200 text-[8px] font-mono px-1 rounded">
                    PREY TARGET
                  </div>
                </div>

                <div className="text-left flex-1 space-y-1">
                  <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider block">
                    SHADOW SYNDICATE • PREY
                  </span>
                  <h3 className="text-lg font-serif font-black text-white leading-tight">
                    GLOOM TROOPER
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Dark Hearts • Obsidian Battle Plate • Screaming Skull Staff • Ready for Holy Cleansing
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1 font-mono text-[10px]">
                    <span className="bg-purple-950 text-purple-200 border border-purple-500/50 px-2 py-0.5 rounded">
                      HP 1,800
                    </span>
                    <span className="bg-slate-900 text-cyan-300 border border-cyan-500/50 px-2 py-0.5 rounded">
                      SHIELD 300
                    </span>
                    <span className="bg-amber-950 text-amber-300 border border-amber-500/50 px-2 py-0.5 rounded">
                      💎 25 - 100 FRAGS
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-around">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">YOUR FRAGMENTS</span>
                  <span className="text-lg font-mono font-black text-amber-300">💎 {state.fragments}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">FAITH CAPACITY</span>
                  <span className="text-lg font-mono font-black text-cyan-300">{state.faith}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Offer up prayers to illuminate hidden Gloom Troopers lurking in the sectors. 
                Each Hunt cleanses shadow, with a <b>10% chance to encounter Golden Prey</b> for 100 Fragments!
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={handlePray}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-black text-sm rounded-xl shadow transition cursor-pointer"
                >
                  🙏 PRAY — +50 Fragments & Reveal Prey
                </button>

                <button
                  onClick={handleHunt}
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-black font-black text-sm rounded-xl shadow transition cursor-pointer"
                >
                  🏹 QUICK HUNT PREY — Cleanse Gloom Trooper
                </button>

                <button
                  onClick={() => startBattle(0)}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 text-white font-black text-sm rounded-xl shadow transition cursor-pointer"
                >
                  ⚔️ BATTLE GLOOM TROOPER IN ARENA
                </button>
              </div>

              <div className="p-3 bg-[#080d22] rounded-xl border border-slate-800 text-xs font-mono text-cyan-200">
                {state.log || 'Pray to reveal prey in the shadow corridors...'}
              </div>
            </div>

            <button
              onClick={() => goToScreen('battle')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              ← RETURN TO BATTLE
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN: SHOP (DEMO)
        ======================================================== */}
        {state.screen === 'shop' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider">
              🛒 FAITH COMMISSARY & SHOP
            </h1>
            <p className="text-xs text-cyan-300 font-mono mb-4">
              Equip divine armaments and expand your Fellowship treasury (Demo mode)
            </p>

            <div className="space-y-3 mb-4">
              {/* Light Pass */}
              <div className="bg-[#0f1738] border border-amber-400/60 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-black text-amber-300 text-sm">LIGHT PASS — 30 DAYS</span>
                    <span className="text-[10px] font-mono bg-amber-400 text-black font-bold px-1.5 py-0.2 rounded">$4.99</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    +50% Fragments on all hunts, daily scripture verse card, Neon Cathedral suit
                  </p>
                </div>
                <button
                  onClick={() => handleShopPurchase('Light Pass', 50)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-xl transition cursor-pointer whitespace-nowrap shadow"
                >
                  BUY (DEMO)
                </button>
              </div>

              {/* Miracle Bundle */}
              <div className="bg-[#131135] border border-purple-400/60 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-black text-purple-300 text-sm">MIRACLE BUNDLE (SAVE 62%)</span>
                    <span className="text-[10px] font-mono bg-purple-400 text-black font-bold px-1.5 py-0.2 rounded">$7.99</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Light Pass + Hunter Blessing + 1,000 Fragments + Golden Pack
                  </p>
                </div>
                <button
                  onClick={() => handleShopPurchase('Miracle Bundle', 200)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 text-white font-black text-xs rounded-xl transition cursor-pointer whitespace-nowrap shadow"
                >
                  BUY (DEMO)
                </button>
              </div>

              {/* 1000 Fragments */}
              <div className="bg-[#0e1635] border border-cyan-400/60 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-black text-cyan-300 text-sm">1,000 FAITH FRAGMENTS</span>
                    <span className="text-[10px] font-mono bg-cyan-400 text-black font-bold px-1.5 py-0.2 rounded">$0.99</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Instant injection of sacred currency for card upgrades
                  </p>
                </div>
                <button
                  onClick={() => handleShopPurchase('1000 Fragments', 100)}
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs rounded-xl transition cursor-pointer whitespace-nowrap shadow"
                >
                  BUY (DEMO)
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between mb-4">
              <span className="text-xs text-slate-400">Current Faith Fragments:</span>
              <span className="font-mono font-black text-amber-300">💎 {state.fragments}</span>
            </div>

            <button
              onClick={() => goToScreen('battle')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              ← RETURN TO BATTLE
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN: VICTORY
        ======================================================== */}
        {state.screen === 'victory' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            <div className="inline-block bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              TRIUMPH ACHIEVED • IN LUMINE VERITAS
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-black text-amber-300 tracking-wider mb-1">
              🏆 VICTORY!
            </h1>
            <div className="text-sm font-mono text-cyan-300 tracking-widest uppercase mb-4">
              MAY JESUS REIGN • COLOR RESTORED
            </div>

            <div className="bg-[#0f1738] border-2 border-amber-400 rounded-3xl p-5 shadow-[0_0_35px_rgba(255,215,0,0.3)] mb-4 space-y-4">
              <SamanthaCrownedPortrait size="md" />

              <div className="bg-slate-950/80 p-3 rounded-2xl border border-amber-500/30">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                  FINAL FAITH SCORE
                </span>
                <span className="text-3xl sm:text-4xl font-mono font-black text-amber-400">
                  {currentScore.toLocaleString()} PTS
                </span>
                <span className="text-[10px] text-cyan-300 font-mono block mt-1">
                  Formula: (Valuation × Momentum) + (Security × 25) + (Verses × 500)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#121c45] p-2.5 rounded-xl border border-slate-700 flex justify-between">
                  <span className="text-slate-400">Valuation</span>
                  <span className="font-mono font-bold text-amber-300">{state.valuation}</span>
                </div>
                <div className="bg-[#121c45] p-2.5 rounded-xl border border-slate-700 flex justify-between">
                  <span className="text-slate-400">Security</span>
                  <span className="font-mono font-bold text-cyan-300">{state.security}</span>
                </div>
                <div className="bg-[#121c45] p-2.5 rounded-xl border border-slate-700 flex justify-between">
                  <span className="text-slate-400">Verses Played</span>
                  <span className="font-mono font-bold text-slate-200">{state.verses}</span>
                </div>
                <div className="bg-[#121c45] p-2.5 rounded-xl border border-slate-700 flex justify-between">
                  <span className="text-slate-400">Fragments</span>
                  <span className="font-mono font-bold text-amber-300">💎 {state.fragments}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => goToScreen('upgrades')}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-black text-sm rounded-2xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>⬆️</span>
                <span>SPEND FRAGMENTS IN UPGRADES</span>
              </button>

              <button
                onClick={() => goToScreen('nodes')}
                className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-black font-black text-xs rounded-2xl shadow transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🗺️</span>
                <span>RETURN TO CAMPAIGN NODES</span>
              </button>

              <button
                onClick={() => goToScreen('board')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy size={14} />
                <span>GLOBAL BOARD & RECORDS</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Real-Time Dodge Timing Bar Modal */}
      {isDodging && (
        <DodgeBar
          incomingDamage={pendingEnemyDamage}
          onDodgeComplete={handleDodgeComplete}
        />
      )}

      {/* Quick-Time Verse Reflex Challenge Modal */}
      {showQte && (
        <QuickTimeVerse
          onSuccess={() => {
            const card = BATTLE_CARDS.find(c => c.id === selectedCardId);
            if (card) executeCardPlay(card, true);
          }}
          onExpire={() => {
            const card = BATTLE_CARDS.find(c => c.id === selectedCardId);
            if (card) executeCardPlay(card, false);
          }}
        />
      )}

      {/* Sound Test Modal */}
      {showSoundTest && (
        <SoundTestModal
          onClose={() => setShowSoundTest(false)}
          soundEnabled={state.sound}
          onToggleSound={toggleSound}
          volume={state.vol}
          onVolumeChange={setVolume}
        />
      )}

      {/* Voice Narration & Persona Changer Modal */}
      <VoiceSettingsModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        narrateVerses={narrateVerses}
        onToggleNarrateVerses={setNarrateVerses}
      />

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal
          entries={state.leaderboard}
          currentScore={currentScore}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Daily Streak Modal */}
      {showDailyStreak && (
        <DailyStreakModal
          streak={state.dailyStreak}
          lastClaimDate={state.lastClaimDate}
          onClaim={handleClaimStreak}
          onClose={() => setShowDailyStreak(false)}
        />
      )}

      {/* Missions & Achievements Modal */}
      {showMissions && (
        <MissionsModal
          missions={state.missions}
          achievements={state.achievements}
          onClaimMission={handleClaimMission}
          onClose={() => setShowMissions(false)}
        />
      )}

      {/* Settings & Privacy Modal */}
      {showSettings && (
        <SettingsModal
          state={state}
          onImportState={(newState) => setState(newState)}
          onDeleteAllData={handleDeleteAllData}
          onClose={() => setShowSettings(false)}
          initialTab={settingsInitialTab}
          onOpenVoiceSettings={() => setShowVoiceModal(true)}
        />
      )}

      {/* Official Artwork Gallery Lightbox Modal */}
      {showArtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-5 animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#080d22] border-2 border-amber-400 rounded-3xl p-4 sm:p-6 shadow-[0_0_40px_rgba(255,215,0,0.4)] max-h-[94vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest block">
                  VANN FAMILY VENTURES • OFFICIAL CHARACTER ARTWORK
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-black text-amber-300">
                  {showArtModal === 'icon' 
                    ? 'CHRISTFIRE APP ICON — SAMANTHA & BIG BEASTIE' 
                    : 'SAMANTHA THE WARDEN — CROWNED QUEEN OF LIGHT'}
                </h3>
              </div>
              <button 
                onClick={() => setShowArtModal(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Art Switcher Tabs */}
            <div className="flex gap-2 mb-3 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => { soundEngine.click(); setShowArtModal('icon'); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  showArtModal === 'icon' 
                    ? 'bg-amber-400 text-black shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>👑🧔🏾‍♂️ APP ICON (SAMANTHA & PETER)</span>
              </button>
              <button
                onClick={() => { soundEngine.click(); setShowArtModal('samantha'); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  showArtModal === 'samantha' 
                    ? 'bg-amber-400 text-black shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>👑 SAMANTHA CROWNED (FULL HERO)</span>
              </button>
            </div>

            {/* Artwork Display Container */}
            <div className="overflow-y-auto flex-1 flex flex-col items-center justify-center p-2 text-center">
              {showArtModal === 'icon' ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-3 border-amber-400 shadow-[0_0_35px_rgba(255,215,0,0.5)] mb-3 bg-black">
                    <img
                      src={OFFICIAL_APP_ICON}
                      alt="ChristFire Official App Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-[#0f1738] p-3 rounded-2xl border border-amber-500/30 max-w-lg text-left text-xs text-slate-300 leading-relaxed">
                    <p className="font-serif font-black text-amber-300 text-sm mb-1 text-center">
                      IN LUMINE VERITAS • MAY JESUS REIGN
                    </p>
                    <p className="mb-1.5">
                      <b>Samantha Crowned:</b> Queen of Light wearing the VannDiamond Armored Crown of Light, white & gold armor with glowing cyan seams, holding holographic shield (<b>Judges 5:21</b>).
                    </p>
                    <p>
                      <b>Big Beastie / Peter:</b> Black fedora with radiant blue cyber halo, dreadlocks, salt-and-grey beard, <i>CHRIS FIRE</i> and <i>JESUS SAVES</i> tactical marks, holding the royal VannDiamond sceptre (<b>Philippians 4:13</b>).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-full max-w-xs h-72 sm:h-96 rounded-3xl overflow-hidden border-3 border-amber-400 shadow-[0_0_35px_rgba(255,215,0,0.5)] mb-3 bg-black">
                    <img
                      src={SAMANTHA_CROWNED_HERO}
                      alt="Samantha Crowned Full Artwork"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="bg-[#0f1738] p-3 rounded-2xl border border-cyan-500/30 max-w-lg text-left text-xs text-slate-300 leading-relaxed">
                    <p className="font-serif font-black text-amber-300 text-sm mb-1 text-center">
                      SAMANTHA THE WARDEN — CROWNED
                    </p>
                    <p className="italic text-center text-cyan-200 mb-1">
                      &ldquo;March on, my soul, with might!&rdquo; — Judges 5:21
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Crowned at the central Beacon following Big Beastie shattering the skyscraper beam. 
                      Armed with the VannDiamond Armored Crown of Light, covenant sleeve tattoo, and impenetrable holographic crystal aegis.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-[10px] text-slate-400 font-mono">
                © 2026 Vann Family Ventures LLC
              </span>
              <button
                onClick={() => setShowArtModal(null)}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-xl transition cursor-pointer shadow"
              >
                RETURN TO GAME
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Legal & Compliance Footer on Every Screen */}
      <Footer 
        onOpenPrivacy={() => { setSettingsInitialTab('privacy'); setShowSettings(true); }}
        onOpenSettings={() => { setSettingsInitialTab('settings'); setShowSettings(true); }}
      />
    </div>
  );
}
