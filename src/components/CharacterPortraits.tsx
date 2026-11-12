import React from 'react';

export const OFFICIAL_APP_ICON = '/assets/aistudio/893429077_2176797186264668_3990998231257042896_n_5b1de633.webp';
export const SAMANTHA_CROWNED_HERO = '/assets/aistudio/895545167_2153716315352863_7148848834334418785_n_8f0393a8.webp';

// Boss photos
export const BOSS_MALICE_IMG = '/assets/bosses/malice.jpg';
export const GLOOM_TROOPER_IMG = '/assets/bosses/gloom_trooper.jpg';
export const BOSS_PHANTASM_IMG = '/assets/bosses/phantasm.jpg';
export const BOSS_OVERLORD_IMG = '/assets/bosses/overlord.jpg';

// Nemesis Pair (CF-007) - Official User Artwork
export const LOWKEY_NEMESIS_IMG = '/assets/lowkey_nemesis_official.webp';
export const ABADDON_NEMESIS_IMG = '/assets/abaddon_nemesis_official.webp';

// Covenant & Mythic Ascension Official Artwork
export const PHANTASM_ASCENSION_IMG = '/assets/aistudio/905127461_1143359611401230_4237143131124309682_n_054cdbca.webp';
export const JOHN_THUNDER_IMG = '/assets/aistudio/905020104_1481740813828831_2778501178794237622_n_be91670e.webp';
export const SILAS_UNCHAINED_IMG = '/assets/aistudio/904935929_1080645728295501_3200949746795349510_n_f8535300.webp';
export const OVERLORD_REDEEMED_IMG = '/assets/aistudio/905896371_1342142107924944_2407678333126456020_n_35023ac1.webp';

/**
 * Official App Icon Badge featuring Samantha Crowned and Big Beastie / Peter
 */
export const AppIconBadge: React.FC<{ 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', 
  withGlow?: boolean,
  className?: string,
  onClick?: () => void
}> = ({ 
  size = 'md', 
  withGlow = true,
  className = '',
  onClick
}) => {
  const dim = size === 'xs' 
    ? 'w-8 h-8 rounded-lg' 
    : size === 'sm' 
    ? 'w-12 h-12 rounded-xl' 
    : size === 'md' 
    ? 'w-20 h-20 rounded-2xl' 
    : size === 'lg' 
    ? 'w-36 h-36 rounded-3xl' 
    : 'w-48 h-48 sm:w-60 sm:h-60 rounded-3xl';

  return (
    <div 
      onClick={onClick}
      className={`relative inline-block select-none ${className} ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''}`}
    >
      {withGlow && (
        <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-500/40 via-cyan-400/30 to-purple-600/40 blur-md pointer-events-none animate-pulse" />
      )}

      <div className={`relative ${dim} overflow-hidden border-2 border-amber-400/80 shadow-[0_0_25px_rgba(255,215,0,0.35)] bg-[#070b1a]`}>
        <img
          src={OFFICIAL_APP_ICON}
          alt="ChristFire App Icon - Samantha & Big Beastie"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
      </div>
    </div>
  );
};

/**
 * Real Crowned Samantha Photo Portrait
 * Real Photo with burgundy-red hair, tattooed arm, white + gold armor, VannDiamond Crown of Light, JUDGES 5:21
 */
export type HeroAnimationState = 'idle' | 'attack' | 'damage' | 'dodge' | 'crown';
export type BossAnimationState = 'idle' | 'attack' | 'damage';

/**
 * Real Crowned Samantha Photo Portrait
 * Real Photo with burgundy-red hair, tattooed arm, white + gold armor, VannDiamond Crown of Light, JUDGES 5:21
 * Includes keyframe CSS sprite animation system for attack, damage, dodge, crown, and idle
 */
export const SamanthaCrownedPortrait: React.FC<{ 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero', 
  animated?: boolean,
  showLabel?: boolean,
  animationState?: HeroAnimationState,
  floatingText?: string | null,
  onClick?: () => void
}> = ({ 
  size = 'md', 
  animated = true,
  showLabel = true,
  animationState = 'idle',
  floatingText = null,
  onClick
}) => {
  const dim = size === 'xs'
    ? 'w-14 h-16 rounded-xl'
    : size === 'sm' 
    ? 'w-24 h-32 rounded-2xl' 
    : size === 'md' 
    ? 'w-40 h-56 rounded-2xl' 
    : size === 'lg' 
    ? 'w-60 h-80 sm:w-72 sm:h-96 rounded-3xl' 
    : 'w-full max-w-sm h-96 sm:h-[480px] rounded-3xl';

  // Map animationState to CSS keyframe classes
  const animClass = 
    animationState === 'attack' ? 'sprite-hero-attack' :
    animationState === 'damage' ? 'sprite-hero-damage' :
    animationState === 'dodge' ? 'sprite-hero-dodge' :
    animationState === 'crown' ? 'sprite-hero-crown' :
    (animated && size !== 'xs' ? 'sprite-hero-idle' : '');

  return (
    <div 
      onClick={onClick}
      className={`relative mx-auto flex flex-col items-center justify-center select-none ${animClass} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Outer halo background glow */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500/30 via-cyan-400/25 to-purple-600/30 blur-lg ${animated ? 'animate-pulse' : ''}`} />

      {/* Floating Combat Text Overlay */}
      {floatingText && (
        <div className="absolute -top-7 left-1/2 z-50 pointer-events-none whitespace-nowrap">
          <span className="fx-combat-number inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-black shadow-lg bg-black/90 border border-amber-400 text-amber-300">
            {floatingText}
          </span>
        </div>
      )}

      {/* Attack Lunge Energy Radiance Aura */}
      {animationState === 'attack' && (
        <div className="absolute -inset-4 rounded-3xl bg-radial from-amber-400/50 via-cyan-400/30 to-transparent blur-md pointer-events-none z-10 animate-pulse" />
      )}

      {/* VannDiamond Crown Burst Divine Rays */}
      {animationState === 'crown' && (
        <div className="absolute -inset-8 rounded-full border-4 border-amber-300/80 bg-radial from-amber-300/40 via-yellow-400/20 to-transparent blur-lg pointer-events-none z-10 animate-ping" />
      )}

      {/* Damage Impact Sparks Vignette */}
      {animationState === 'damage' && (
        <div className="absolute inset-0 rounded-2xl bg-red-600/30 mix-blend-overlay pointer-events-none z-30 animate-pulse" />
      )}

      {/* Dodge Phase Cyan Ghost Trail */}
      {animationState === 'dodge' && (
        <div className="absolute -inset-2 rounded-3xl border-2 border-cyan-400/80 bg-cyan-500/10 blur-sm pointer-events-none z-10" />
      )}
      
      {/* Card container */}
      <div className={`relative ${dim} bg-[#080d1f] border-2 ${
        animationState === 'damage' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]' :
        animationState === 'crown' ? 'border-amber-300 shadow-[0_0_40px_rgba(255,215,0,0.8)]' :
        animationState === 'dodge' ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.7)]' :
        'border-amber-400/80 shadow-[0_0_30px_rgba(255,215,0,0.35)]'
      } overflow-hidden flex flex-col items-center justify-between p-1.5 transition-colors`}>
        {/* Divine light aura from top */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-radial from-amber-300/30 to-transparent blur-md pointer-events-none z-10" />

        <div className="w-full h-full relative overflow-hidden rounded-2xl">
          <img
            src={SAMANTHA_CROWNED_HERO}
            alt="Samantha Crowned - Real Photo"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            loading="eager"
          />
          {/* Subtle dark gradient overlay at bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f]/90 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Name plate banner */}
        {showLabel && size !== 'xs' && (
          <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md border border-amber-400/60 rounded-xl px-2.5 py-1.5 text-center flex items-center justify-between z-20 shadow-lg">
            <div className="text-left truncate">
              <span className="text-[11px] font-black text-amber-300 font-serif tracking-wider block leading-tight truncate">
                SAMANTHA CROWNED
              </span>
              <span className="text-[9px] font-mono text-cyan-300 tracking-wider">
                JUDGES 5:21 • QUEEN OF LIGHT
              </span>
            </div>
            <span className="text-[9px] font-mono font-black text-amber-400 bg-amber-950/80 border border-amber-500/50 px-1.5 py-0.5 rounded ml-1">
              WARDEN
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Big Beastie / Peter Portrait
 */
export const BigBeastiePortrait: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => {
  const dim = size === 'sm' ? 'w-24 h-28 rounded-2xl' : 'w-32 h-36 rounded-3xl';
  return (
    <div className={`relative ${dim} bg-[#090e22] border-2 border-cyan-400/70 shadow-[0_0_20px_rgba(0,229,255,0.35)] overflow-hidden flex flex-col items-center justify-center p-1.5 group select-none`}>
      <div className="w-full h-full relative overflow-hidden rounded-xl">
        <img
          src={OFFICIAL_APP_ICON}
          alt="Big Beastie / Peter"
          className="w-full h-full object-cover object-[78%_28%] scale-150 group-hover:scale-160 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
      </div>
      <div className="absolute bottom-1 w-[92%] bg-black/85 border border-cyan-400/60 rounded px-1.5 py-0.5 text-center z-10">
        <span className="text-[9px] font-black text-cyan-300 font-mono tracking-wider">PETER / BEASTIE</span>
      </div>
    </div>
  );
};

/**
 * Boss Real Photo Portrait Component
 * Uses exact photos:
 * - Chapter 1: Commander Malice
 * - Chapter 2: Phantasm
 * - Chapter 3: Overlord
 * - Prey: Gloom Trooper
 * Includes keyframe CSS sprite animations for damage shake and attack lunge
 */
export const BossPortrait: React.FC<{ 
  bossId: string, 
  shieldActive: boolean, 
  hpRatio: number,
  animationState?: BossAnimationState,
  floatingText?: string | null
}> = ({ 
  bossId, 
  shieldActive, 
  hpRatio,
  animationState = 'idle',
  floatingText = null
}) => {
  let photoSrc = BOSS_MALICE_IMG;
  let title = 'COMMANDER MALICE';

  if (bossId === 'phantasm') {
    photoSrc = BOSS_PHANTASM_IMG;
    title = 'PHANTASM';
  } else if (bossId === 'overlord') {
    photoSrc = BOSS_OVERLORD_IMG;
    title = 'THE OVERLORD';
  } else if (bossId === 'gloom_trooper') {
    photoSrc = GLOOM_TROOPER_IMG;
    title = 'GLOOM TROOPER';
  }

  const isMiracleReady = hpRatio <= 0.3;

  const animClass = 
    animationState === 'damage' ? 'sprite-boss-damage' :
    animationState === 'attack' ? 'sprite-boss-attack' : '';

  return (
    <div className={`relative w-44 h-60 sm:w-52 sm:h-72 rounded-3xl bg-[#12081f] border-2 ${
      animationState === 'damage' ? 'border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.7)]' :
      'border-purple-500/80 shadow-[0_0_35px_rgba(168,85,247,0.4)]'
    } overflow-hidden flex flex-col items-center justify-between p-1.5 select-none group ${animClass}`}>
      
      {/* Floating Combat Text Overlay */}
      {floatingText && (
        <div className="absolute top-4 left-1/2 z-50 pointer-events-none whitespace-nowrap">
          <span className="fx-combat-number inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-black shadow-xl bg-black/95 border-2 border-red-500 text-red-300">
            {floatingText}
          </span>
        </div>
      )}

      {/* Kinetic Slash FX when damaged */}
      {animationState === 'damage' && (
        <div className="absolute top-1/2 left-1/2 pointer-events-none z-30 fx-slash-swipe">
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-[1px] shadow-[0_0_20px_#FFD700]" />
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent blur-[0.5px] mt-0.5" />
        </div>
      )}

      {/* Gloom Shield pulse barrier */}
      {shieldActive && (
        <div className="absolute inset-0 border-4 border-purple-400 rounded-3xl animate-pulse pointer-events-none bg-purple-950/20 z-10 shadow-[inset_0_0_20px_#a855f7]" />
      )}

      {/* Real Boss Photo */}
      <div className="w-full h-full relative overflow-hidden rounded-2xl bg-black">
        <img
          src={photoSrc}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        {/* Shadow vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic Dark Heart Crack Overlay on Boss */}
        <div className="absolute top-2 right-2 z-20">
          <DarkHeartIcon hpRatio={hpRatio} size="sm" />
        </div>

        {/* Miracle Finisher Glow if HP <= 30% */}
        {isMiracleReady && (
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-transparent pointer-events-none animate-pulse" />
        )}
      </div>

      <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md border border-purple-500/60 rounded-xl px-2 py-1 text-center z-20 flex items-center justify-between">
        <span className="text-[10px] font-black text-purple-300 font-mono uppercase tracking-wider truncate">
          {title}
        </span>
        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
          shieldActive ? 'bg-purple-900/80 text-purple-200 border border-purple-500/40' : 'bg-red-950 text-red-300 border border-red-500'
        }`}>
          {shieldActive ? 'SHIELDED' : 'UNSHIELDED'}
        </span>
      </div>
    </div>
  );
};

/**
 * Dark Heart Crack Component
 * 100% pristine → 60% cracked → 30% shattered → 0% Miracle Finisher
 */
export const DarkHeartCrack: React.FC<{ 
  hpRatio: number, 
  hp: number, 
  maxHp: number 
}> = ({ hpRatio, hp, maxHp }) => {
  // Determine heart stage:
  // 100% to 60%: Pristine
  // 60% to 30%: Cracked
  // 30% to >0%: Shattered
  // <= 0%: Miracle Finisher
  let stageName = 'PRISTINE DARK HEART';
  let stageColor = 'text-purple-300 border-purple-500/50 bg-purple-950/60';
  let badgeColor = 'bg-purple-500/30 text-purple-200 border-purple-400';
  let stageDesc = 'Intact Gloom Core • Resilient Shadow Aegis';
  let icon = '❤️🔥';

  if (hpRatio <= 0) {
    stageName = '0% MIRACLE FINISHER';
    stageColor = 'text-amber-300 border-amber-400 bg-amber-950/80 shadow-[0_0_20px_#FFD700]';
    badgeColor = 'bg-amber-400 text-black font-black';
    stageDesc = 'TRIUMPH! Divine light shatters the core — May Jesus Reign!';
    icon = '👑✨';
  } else if (hpRatio <= 0.30) {
    stageName = '30% SHATTERED HEART';
    stageColor = 'text-rose-400 border-rose-500 bg-rose-950/80 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse';
    badgeColor = 'bg-rose-500 text-white font-black animate-bounce';
    stageDesc = 'CORE DESTABILIZED! Gloom leaking — Ready for Miracle Finisher!';
    icon = '💥💔';
  } else if (hpRatio <= 0.60) {
    stageName = '60% CRACKED HEART';
    stageColor = 'text-amber-300 border-amber-500/60 bg-amber-950/60';
    badgeColor = 'bg-amber-500/40 text-amber-200 border-amber-400';
    stageDesc = 'Fissures splitting open • Holy light penetrating armor!';
    icon = '💔⚡';
  }

  return (
    <div className={`p-2.5 rounded-2xl border transition-all ${stageColor}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <DarkHeartIcon hpRatio={hpRatio} size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif font-black tracking-wide text-white">
                {stageName}
              </span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${badgeColor}`}>
                {Math.round(hpRatio * 100)}% HP
              </span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">
              {stageDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Multi-stage Crack Progression Indicator Bar */}
      <div className="mt-2 pt-1.5 border-t border-slate-700/50 flex items-center justify-between text-[9px] font-mono">
        <span className={`px-1.5 py-0.5 rounded ${hpRatio > 0.60 ? 'text-purple-300 font-bold bg-purple-900/50' : 'text-slate-500'}`}>
          100% Pristine
        </span>
        <span className="text-slate-600">→</span>
        <span className={`px-1.5 py-0.5 rounded ${hpRatio <= 0.60 && hpRatio > 0.30 ? 'text-amber-300 font-bold bg-amber-900/50' : 'text-slate-500'}`}>
          60% Cracked
        </span>
        <span className="text-slate-600">→</span>
        <span className={`px-1.5 py-0.5 rounded ${hpRatio <= 0.30 && hpRatio > 0 ? 'text-rose-300 font-bold bg-rose-900/50 animate-pulse' : 'text-slate-500'}`}>
          30% Shattered
        </span>
        <span className="text-slate-600">→</span>
        <span className={`px-1.5 py-0.5 rounded ${hpRatio <= 0 ? 'text-amber-300 font-black bg-amber-400 text-black' : 'text-slate-500'}`}>
          0% Miracle Finisher
        </span>
      </div>
    </div>
  );
};

/**
 * Animated SVG Dark Heart Icon reflecting current crack stage
 */
export const DarkHeartIcon: React.FC<{ hpRatio: number, size?: 'sm' | 'md' | 'lg' }> = ({ 
  hpRatio, 
  size = 'md' 
}) => {
  const dim = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';

  return (
    <div className={`relative ${dim} flex items-center justify-center shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
        <defs>
          <radialGradient id="darkHeartGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={hpRatio <= 0 ? "#FFD700" : hpRatio <= 0.3 ? "#FF3B3B" : "#8B00FF"} />
            <stop offset="70%" stopColor={hpRatio <= 0 ? "#B8860B" : hpRatio <= 0.3 ? "#800020" : "#3B0764"} />
            <stop offset="100%" stopColor="#11052C" />
          </radialGradient>
        </defs>

        {/* Heart Base */}
        <path
          d="M 50 25 C 50 10 25 10 25 28 C 25 45 50 68 50 82 C 50 68 75 45 75 28 C 75 10 50 10 50 25 Z"
          fill="url(#darkHeartGrad)"
          stroke={hpRatio <= 0 ? "#FFD700" : hpRatio <= 0.3 ? "#FF4B4B" : "#C084FC"}
          strokeWidth="3"
          className={hpRatio <= 0.3 ? "animate-pulse" : ""}
        />

        {/* 60% Crack Fissures */}
        {hpRatio <= 0.60 && (
          <path
            d="M 50 20 L 46 36 L 54 48 L 48 62 L 52 75"
            stroke="#FFD700"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* 30% Deep Shatter Fracture Lines */}
        {hpRatio <= 0.30 && (
          <>
            <path
              d="M 32 30 L 46 36 L 40 50 L 54 48 L 68 40"
              stroke="#00E5FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 40 50 L 30 65"
              stroke="#FF3B3B"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 54 48 L 66 65"
              stroke="#FFD700"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}

        {/* 0% Miracle Finisher Divine Rays */}
        {hpRatio <= 0 && (
          <>
            <circle cx="50" cy="45" r="12" fill="#FFFFFF" opacity="0.9" />
            <line x1="50" y1="5" x2="50" y2="85" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="10" y1="45" x2="90" y2="45" stroke="#FFFFFF" strokeWidth="4" />
          </>
        )}
      </svg>
    </div>
  );
};

/**
 * LOWKEY Portrait (Dexter Vann Likeness Unchanged, Bull Horns with Gold Rays, No Halo, 4 Arms, VannDiamond Bling Wings, Feet of Bronze)
 */
export const LowkeyPortrait: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'full';
  aspect?: 'square' | 'portrait';
  className?: string;
  onClick?: () => void;
}> = ({ size = 'md', aspect = 'portrait', className = '', onClick }) => {
  const dim = size === 'sm' 
    ? 'w-14 h-16' 
    : size === 'md' 
    ? (aspect === 'portrait' ? 'w-32 h-48 sm:w-36 sm:h-56' : 'w-28 h-28 sm:w-36 sm:h-36')
    : size === 'lg' 
    ? (aspect === 'portrait' ? 'w-40 h-56 sm:w-44 sm:h-64' : 'w-40 h-40 sm:w-48 sm:h-48')
    : (aspect === 'portrait' ? 'w-52 h-72 sm:w-60 sm:h-80' : 'w-56 h-56 sm:w-64 sm:h-64');

  return (
    <div 
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none ${className} ${onClick ? 'cursor-pointer hover:scale-[1.03] active:scale-95 transition-transform' : ''}`}
    >
      <div className="relative">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-red-600/50 via-amber-400/40 to-yellow-500/50 blur-md pointer-events-none animate-pulse" />
        <div className={`relative ${dim} overflow-hidden rounded-2xl border-2 border-red-500/80 shadow-[0_0_25px_rgba(255,42,42,0.4)] bg-[#05070F] flex items-center justify-center p-1`}>
          <img
            src={LOWKEY_NEMESIS_IMG}
            alt="LOWKEY - Dexter Vann Likeness Unchanged"
            className="w-full h-full object-contain rounded-xl"
            loading="eager"
          />
        </div>
      </div>
      {size !== 'sm' && (
        <div className="mt-2 text-center">
          <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider block font-mono">
            🃏 LOWKEY • +1000 DMG
          </span>
          <span className="text-[9px] text-red-300 font-mono block">
            Dexter Likeness • Feet of Bronze
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * ABADDON Portrait (Andrew Likeness Unchanged, Ultra-Enhanced Firmament Blue Gaze, No Steam/No Fog, 15-Gem VannDiamond Crown, Swarming Locusts, Abba Key)
 */
export const AbaddonPortrait: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'full';
  aspect?: 'square' | 'portrait';
  className?: string;
  onClick?: () => void;
}> = ({ size = 'md', aspect = 'portrait', className = '', onClick }) => {
  const dim = size === 'sm' 
    ? 'w-14 h-16' 
    : size === 'md' 
    ? (aspect === 'portrait' ? 'w-32 h-48 sm:w-36 sm:h-56' : 'w-28 h-28 sm:w-36 sm:h-36')
    : size === 'lg' 
    ? (aspect === 'portrait' ? 'w-40 h-56 sm:w-44 sm:h-64' : 'w-40 h-40 sm:w-48 sm:h-48')
    : (aspect === 'portrait' ? 'w-52 h-72 sm:w-60 sm:h-80' : 'w-56 h-56 sm:w-64 sm:h-64');

  return (
    <div 
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none ${className} ${onClick ? 'cursor-pointer hover:scale-[1.03] active:scale-95 transition-transform' : ''}`}
    >
      <div className="relative">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-purple-600/50 via-cyan-400/40 to-indigo-500/50 blur-md pointer-events-none animate-pulse" />
        <div className={`relative ${dim} overflow-hidden rounded-2xl border-2 border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.4)] bg-[#05070F] flex items-center justify-center p-1`}>
          <img
            src={ABADDON_NEMESIS_IMG}
            alt="ABADDON - Andrew Likeness Unchanged"
            className="w-full h-full object-contain rounded-xl"
            loading="eager"
          />
        </div>
      </div>
      {size !== 'sm' && (
        <div className="mt-2 text-center">
          <span className="text-[11px] font-black text-purple-300 uppercase tracking-wider block font-mono">
            👑 ABADDON • +1000 DMG
          </span>
          <span className="text-[9px] text-cyan-300 font-mono block">
            Andrew Likeness • Revelation 9:1-11
          </span>
        </div>
      )}
    </div>
  );
};
