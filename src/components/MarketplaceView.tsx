import React from 'react';
import { Card } from '../types';
import { Package, ShoppingBag, CreditCard, Tv } from 'lucide-react';

interface MarketplaceViewProps {
  fragments: number;
  inventory: Card[];
  onBuyPack: () => void;
  onToggleEquip: (cardId: string) => void;
  packResult: string | null;
  onBuyBilling: (product: 'starter_crown_bundle' | 'fragments_1000' | 'light_pass', price: number) => void;
  billingMsg: string | null;
  onWatchAd: () => void;
  adMsg: string | null;
  adCooldownSec: number;
  onOpenSettings: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  fragments,
  inventory,
  onBuyPack,
  onToggleEquip,
  packResult,
  onBuyBilling,
  billingMsg,
  onWatchAd,
  adMsg,
  adCooldownSec,
  onOpenSettings,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-6">
      {/* Top Banner */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl text-center">
        <h2 className="text-xl font-black text-amber-400 m-0">
          🛒 MARKETPLACE — Fragments Only, No Crypto/NFT
        </h2>
        <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
          <p className="text-xs text-slate-300 m-0">
            Balance: <b className="text-cyan-300 text-sm font-black">💎 {fragments} Fragments</b>
          </p>
          <button
            onClick={onOpenSettings}
            className="px-3 py-1 bg-[#1a2340] hover:bg-[#232f54] border border-slate-600 text-slate-200 font-bold text-[11px] rounded-lg cursor-pointer transition"
          >
            ⚙️ Billing &amp; Save Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Covenant Pack */}
        <div className="bg-[#11182E] border-2 border-amber-400/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-black text-amber-300 m-0 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                📦 COVENANT PACK
              </h3>
              <span className="text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full">
                100 💎
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Open to pull rare scriptures, covenant champions, and secret ascended entities:
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="text-slate-300">⚔️ Epic Tier (Conqueror Blade)</span>
                <span className="font-bold text-blue-400">34% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="text-slate-300">🔥 Biblical Tier (Psalm 91 Shield)</span>
                <span className="font-bold text-purple-400">38% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-amber-500/30">
                <span className="text-amber-300 font-bold">👑 Samantha Crowned Ascension</span>
                <span className="font-bold text-amber-400">8% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-cyan-500/30">
                <span className="text-cyan-300 font-bold">⚡ John Thunder Ascension</span>
                <span className="font-bold text-cyan-400">8% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-orange-500/30">
                <span className="text-orange-400 font-bold">⛓️ Silas Unchained Ascension</span>
                <span className="font-bold text-orange-400">8% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-red-500/30">
                <span className="text-red-400 font-bold">🃏 Secret LOWKEY / ABADDON</span>
                <span className="font-bold text-red-400">2% + 2% Secret</span>
              </div>
              <div className="flex justify-between p-2 bg-purple-950/30 rounded-lg border border-purple-600/40">
                <span className="text-purple-300 font-bold">👻 Phantasm Redeemed (Mythic)</span>
                <span className="font-bold text-amber-300 text-[11px]">NOT in Packs • Beat Ch2 to Unlock</span>
              </div>
              <div className="flex justify-between p-2 bg-red-950/30 rounded-lg border border-red-600/40">
                <span className="text-red-300 font-bold">👹 Overlord Redeemed (Mythic)</span>
                <span className="font-bold text-amber-300 text-[11px]">NOT in Packs • Beat Ch3 to Unlock</span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={onBuyPack}
              disabled={fragments < 100}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 disabled:opacity-40 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BUY &amp; OPEN PACK (100 💎)</span>
            </button>

            {packResult && (
              <div className="mt-3 p-3 bg-[#0A0F22] border border-amber-400/50 rounded-xl text-xs text-amber-300 font-bold animate-fadeIn">
                {packResult}
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Play Billing — Starter + Fragments */}
        <div className="bg-[#11182E] border-2 border-cyan-500/70 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-cyan-300 m-0 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                💰 PLAY BILLING — Starter + Fragments
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black px-2 py-0.5 rounded-full">
                AAB READY
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed m-0">
              In Preview: Simulates purchase immediately. In Google Play AAB: Calls native Google Play Billing (`ChristFireBilling` bridge).
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => onBuyBilling('starter_crown_bundle', 4.99)}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer transition active:scale-[0.99]"
              >
                👑 STARTER CROWN BUNDLE — $4.99 (+500 💎 + Crown Perk)
              </button>

              <button
                onClick={() => onBuyBilling('fragments_1000', 4.99)}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer transition active:scale-[0.99]"
              >
                💎 1000 FRAGMENTS — $4.99
              </button>

              <button
                onClick={() => onBuyBilling('light_pass', 4.99)}
                className="w-full py-3 px-4 bg-[#1a2340] hover:bg-[#232f54] border border-amber-400/50 text-amber-300 font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer transition"
              >
                🎫 LIGHT PASS — $4.99/mo (+250 💎 + Bonus Drops)
              </button>
            </div>
          </div>

          {billingMsg && (
            <div className="p-3 bg-[#0A0F22] border border-amber-400/60 rounded-xl text-xs text-amber-300 font-bold leading-relaxed">
              {billingMsg}
            </div>
          )}
        </div>

        {/* Card 3: Inventory */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-black text-white m-0 flex items-center gap-2">
                <span>🎒</span> INVENTORY ({inventory.length} Cards)
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">
                {inventory.filter(c => c.equipped).length} Equipped
              </span>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {inventory.map((card) => {
                const isPhantasm = card.id === 'phantasm_asc' || card.name.includes('Phantasm');
                const isOverlord = card.id === 'overlord_asc' || card.name.includes('Overlord');
                const isSilas = card.id === 'silas_asc' || card.name.includes('Silas');
                const isJohn = card.id === 'john_asc' || card.name.includes('John');
                const isCovenant = card.tier === 'Covenant' || card.name.includes('Samantha') || card.name.includes('LOWKEY') || card.name.includes('ABADDON') || isJohn || isSilas;
                const isBiblical = card.tier === 'Biblical';
                const borderColor = isPhantasm ? 'border-purple-500' : isOverlord ? 'border-red-600' : isSilas ? 'border-orange-500' : isJohn ? 'border-cyan-400' : isCovenant ? 'border-amber-400' : isBiblical ? 'border-purple-400' : 'border-blue-500/50';
                const tagColor = isPhantasm ? 'bg-purple-600 text-white' : isOverlord ? 'bg-red-600 text-white' : isSilas ? 'bg-orange-500 text-slate-950' : isJohn ? 'bg-cyan-400 text-slate-950' : isCovenant ? 'bg-amber-400 text-slate-950' : isBiblical ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white';

                return (
                  <div
                    key={card.id}
                    className={`bg-[#0A0F22] border ${borderColor} rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-xs text-white truncate m-0">{card.name}</p>
                        <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${tagColor} flex-shrink-0`}>
                          {card.tier || 'Epic'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 m-0">
                        <span className="text-amber-300 font-bold">{card.dmg} DMG</span> • {card.scripture || card.name}
                      </p>
                    </div>

                    <button
                      onClick={() => onToggleEquip(card.id)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
                        card.equipped
                          ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow'
                          : 'bg-[#1a2340] border border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      {card.equipped ? 'EQUIPPED' : 'EQUIP'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 mt-3 m-0">
            Cards marked <b>EQUIPPED</b> are drawn into your hand during battle.
          </p>
        </div>

        {/* Card 4: Rewarded Ads */}
        <div className="bg-[#11182E] border-2 border-emerald-500/70 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-emerald-400 m-0 flex items-center gap-2">
                <Tv className="w-5 h-5" />
                📺 REWARDED ADS
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black px-2 py-0.5 rounded-full">
                +50 💎 / 30s
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed m-0">
              Watch an optional short rewarded ad → earn <b className="text-emerald-300">+50 Faith Fragments</b>. Zero forced ads, and no ads ever interrupt battle. AdMob hook ready for native AAB.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={onWatchAd}
              disabled={adCooldownSec > 0}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow cursor-pointer transition"
            >
              <Tv className="w-4 h-4" />
              <span>
                {adCooldownSec > 0
                  ? `⏳ AD COOLDOWN (${adCooldownSec}s)`
                  : '📺 WATCH AD → +50 FRAGMENTS'}
              </span>
            </button>

            {adMsg && (
              <div className="p-2.5 bg-[#0A0F22] border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold">
                {adMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
