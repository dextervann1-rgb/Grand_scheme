import React, { useState } from 'react';
import { Card } from '../types';
import { Package, Sparkles, Check, Plus, ShoppingBag } from 'lucide-react';

interface MarketplaceViewProps {
  fragments: number;
  inventory: Card[];
  onBuyPack: () => void;
  onToggleEquip: (cardId: string) => void;
  packResult: string | null;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  fragments,
  inventory,
  onBuyPack,
  onToggleEquip,
  packResult,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl text-center">
        <h2 className="text-xl font-black text-amber-400 m-0">🛒 FELLOWSHIP MARKETPLACE</h2>
        <p className="text-xs text-slate-300 mt-1">
          Available Balance: <b className="text-cyan-300 text-sm font-black">💎 {fragments} Fragments</b>
        </p>
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
                <span className="text-slate-300">⚔️ Epic Tier</span>
                <span className="font-bold text-blue-400">60% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="text-slate-300">🔥 Biblical Tier</span>
                <span className="font-bold text-purple-400">30% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-amber-500/30">
                <span className="text-amber-300 font-bold">👑 Covenant Tier (incl. Samantha 8%)</span>
                <span className="font-bold text-amber-400">8% Drop Rate</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0A0F22] rounded-lg border border-red-500/30">
                <span className="text-red-400 font-bold">🃏 Secret LOWKEY / ABADDON</span>
                <span className="font-bold text-red-400">2% Secret Drop</span>
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
              BUY & OPEN PACK (100 💎)
            </button>

            {packResult && (
              <div className="mt-3 p-3 bg-[#0A0F22] border border-amber-400/50 rounded-xl text-xs text-amber-300 font-bold animate-fadeIn">
                {packResult}
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Inventory */}
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

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {inventory.map((card) => {
                const isCovenant = card.tier === 'Covenant' || card.name.includes('Samantha') || card.name.includes('LOWKEY') || card.name.includes('ABADDON');
                const isBiblical = card.tier === 'Biblical';
                const borderColor = isCovenant ? 'border-amber-400' : isBiblical ? 'border-purple-400' : 'border-blue-500/50';
                const tagColor = isCovenant ? 'bg-amber-400 text-slate-950' : isBiblical ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white';

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
                      <p className="text-[11px] text-slate-400 mt-0.5">
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

          <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 mt-3">
            Cards marked <b>EQUIPPED</b> will be directly drawn into your hand during battle.
          </p>
        </div>
      </div>
    </div>
  );
};
