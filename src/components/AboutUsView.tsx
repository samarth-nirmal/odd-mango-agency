import React, { useState } from 'react';
import { motion } from 'motion/react';
import { STUDIO_ABOUT, TEAM_MEMBERS, STUDIO_CONTACT } from '../data/agencyData';
import { TeamMember, ViewType } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Award, 
  Sparkles, 
  Film, 
  Layers, 
  Camera, 
  Mail, 
  Phone, 
  Instagram, 
  Youtube, 
  ArrowUpRight, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Flame,
  UserCheck
} from 'lucide-react';

interface AboutUsViewProps {
  onSelectView: (view: ViewType) => void;
  onOpenContact: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onSelectView, onOpenContact }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember>(TEAM_MEMBERS[0]);
  const [logoError, setLogoError] = useState(false);

  const founder = TEAM_MEMBERS.find((m) => m.isFounder) || TEAM_MEMBERS[0];

  return (
    <div id="about-us-view" className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. HERO BRAND CARD WITH COMPANY LOGO */}
      <section className="bg-[#FFDE99] border-3 border-black rounded-2xl p-5 sm:p-10 shadow-brutal-xl relative overflow-hidden">
        {/* Background decorative watermark */}
        <div className="absolute right-4 -bottom-6 font-syne font-black text-8xl sm:text-9xl text-black/[0.04] pointer-events-none select-none">
          ODD MANGO
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left: Company Logo Asset Display */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <div className="bg-white border-3 border-black rounded-2xl p-4 sm:p-6 shadow-brutal w-full max-w-md flex flex-col items-center justify-center min-h-[160px] group transition-transform hover:-translate-y-1">
              {!logoError ? (
                <img
                  src="/company/logo.svg"
                  alt="Odd Mango Media Official Company Logo"
                  className="w-full max-h-24 sm:max-h-28 object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                />
              ) : (
                /* High-fidelity vector fallback if image is loading */
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF4400] border-2 border-black flex items-center justify-center font-syne font-black text-2xl text-white shadow-brutal-sm">
                    OM
                  </div>
                  <div>
                    <span className="font-mono-custom text-xs font-bold text-[#FF4400] block">
                      奇妙なマンゴー // STUDIO
                    </span>
                    <span className="font-syne text-2xl sm:text-3xl font-black text-black block tracking-tight">
                      ODD MANGO
                    </span>
                  </div>
                </div>
              )}

              <div className="w-full mt-3 pt-3 border-t-2 border-neutral-200 flex items-center justify-between text-[10px] font-mono-custom text-neutral-500">
                <span className="font-bold text-black">OFFICIAL REGISTERED TRADEMARK</span>
                <span className="text-[#FF4400] font-extrabold">EST. 2026</span>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-black text-white rounded-lg font-mono-custom text-[11px] font-bold border border-black shadow-brutal-sm">
                FOUNDER: {STUDIO_ABOUT.founder.toUpperCase()}
              </span>
              <span className="px-3 py-1 bg-white text-black rounded-lg font-mono-custom text-[11px] font-bold border-2 border-black shadow-brutal-sm">
                HQ: PUNE, INDIA
              </span>
            </div>
          </div>

          {/* Right: Studio Mission & Story */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4400] text-white border-2 border-black rounded-lg font-mono-custom text-xs font-bold shadow-brutal-sm">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>THE ODD MANGO MANIFESTO</span>
            </div>

            <h1 className="font-syne text-2xl sm:text-4xl lg:text-5xl font-black text-black leading-[1.08] tracking-tight">
              DEFIANT CULTURE. CINEMATIC DISCIPLINE. ZERO MEDIOCRITY.
            </h1>

            <p className="font-sans-custom text-sm sm:text-base text-neutral-800 font-medium leading-relaxed">
              {STUDIO_ABOUT.mission}
            </p>

            {/* Key Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {STUDIO_ABOUT.stats.map((st) => (
                <div key={st.label} className="bg-white border-2 border-black rounded-xl p-3 shadow-brutal-sm text-center">
                  <div className="font-syne text-xl sm:text-2xl font-black text-black">
                    {st.value}
                  </div>
                  <div className="font-mono-custom text-[9px] sm:text-[10px] font-bold text-neutral-600 uppercase mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER SPOTLIGHT: OMKAR JANVEKAR */}
      <section className="bg-white border-3 border-black rounded-2xl p-5 sm:p-10 shadow-brutal-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b-2 border-black mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FF4400] text-white rounded-xl border-2 border-black shadow-brutal-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono-custom text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                LEADERSHIP & DIRECTION
              </span>
              <h2 className="font-syne text-2xl sm:text-3xl font-black text-black">
                FOUNDER SPOTLIGHT
              </h2>
            </div>
          </div>

          <span className="font-mono-custom text-xs bg-neutral-100 border-2 border-black px-3 py-1.5 rounded-xl font-bold self-start sm:self-auto text-black">
            EXECUTIVE PRODUCER // ODD MANGO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          {/* Founder Portrait with Brutalist Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl border-3 border-black overflow-hidden shadow-brutal group bg-neutral-900 aspect-square max-w-md mx-auto">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <span className="font-mono-custom text-[10px] sm:text-xs font-extrabold text-[#FFDE99] tracking-wider uppercase">
                  {founder.badge}
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-black text-white leading-none mt-1">
                  {founder.name}
                </span>
                <span className="font-sans-custom text-xs text-neutral-300 mt-1">
                  {founder.role}
                </span>
              </div>
            </div>

            {/* Founder Direct Connect Strip */}
            <div className="bg-[#FFDE99] border-2 border-black rounded-xl p-3.5 shadow-brutal-sm space-y-2 font-mono-custom text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-black uppercase text-[10px]">DIRECT FOUNDER INQUIRY</span>
                <span className="text-[#FF4400] font-extrabold">CONFIDENTIAL</span>
              </div>
              <div className="flex items-center gap-2 text-black">
                <Mail className="w-3.5 h-3.5 text-[#FF4400] shrink-0" />
                <a href={`mailto:${STUDIO_CONTACT.email}`} className="font-bold underline truncate">
                  {STUDIO_CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-black">
                <Phone className="w-3.5 h-3.5 text-[#00D084] shrink-0" />
                <a href={`tel:${STUDIO_CONTACT.phone1.tel}`} className="font-bold underline">
                  {STUDIO_CONTACT.phone1.display}
                </a>
                <span className="text-neutral-500">/</span>
                <a href={`tel:${STUDIO_CONTACT.phone2.tel}`} className="font-bold underline">
                  {STUDIO_CONTACT.phone2.display}
                </a>
              </div>
            </div>
          </div>

          {/* Founder Bio, Philosophy & Disciplines */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quote Block */}
            <div className="p-4 sm:p-6 bg-neutral-50 border-2 border-black rounded-2xl shadow-brutal-sm relative">
              <span className="font-syne text-5xl text-[#FF4400] leading-none absolute -top-3 left-4 select-none opacity-40">
                “
              </span>
              <p className="font-syne text-base sm:text-xl font-bold text-black leading-snug pt-2">
                We didn't build Odd Mango to make safe, predictable advertising that vanishes into the algorithmic feed. We engineer culture-defining visual identities and cinema films that remain unforgettable five years from now.
              </p>
              <div className="mt-3 text-right">
                <span className="font-mono-custom text-xs font-black text-black">
                  — OMKAR JANVEKAR, FOUNDER
                </span>
              </div>
            </div>

            {/* In-depth bio */}
            <div className="space-y-3 font-sans-custom text-neutral-800 text-sm sm:text-base leading-relaxed">
              <p>
                {founder.bio}
              </p>
              <p>
                From curating high-stakes commercial sets with ARRI and Sony FX6 camera systems to orchestrating multi-million rupee luxury architectural walkthroughs (such as the sold-out Yoo One Signature Wing), Omkar personally oversees every commission’s creative integrity and delivery velocity.
              </p>
            </div>

            {/* Core Disciplines Pills */}
            <div className="space-y-2 pt-2">
              <span className="font-mono-custom text-xs font-bold text-black block tracking-wide">
                EXECUTIVE EXPERTISE & CREATIVE FOCUS:
              </span>
              <div className="flex flex-wrap gap-2">
                {founder.disciplines.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1.5 bg-neutral-100 text-black border-2 border-black rounded-lg font-mono-custom text-xs font-bold shadow-brutal-sm"
                  >
                    ✓ {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => { soundFx.playSuccess(); onOpenContact(); }}
                className="px-6 py-3 bg-[#FF4400] text-white rounded-xl font-mono-custom font-extrabold text-xs sm:text-sm border-2 border-black hover:bg-black transition-colors shadow-brutal cursor-pointer flex items-center gap-2"
              >
                <span>COMMISSION PROJECT WITH OMKAR</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={STUDIO_CONTACT.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-black text-white rounded-xl font-mono-custom font-bold text-xs sm:text-sm border-2 border-black hover:bg-[#FFDE99] hover:text-black transition-colors shadow-brutal-sm cursor-pointer flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-[#FFDE99]" />
                <span>FOLLOW @ODDMANGO.IN</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDIO TEAM & MULTIDISCIPLINARY UNITS */}
      <section className="bg-[#0e0e0e] border-3 border-neutral-800 text-white rounded-2xl p-5 sm:p-10 shadow-brutal-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-[#00D084] font-mono-custom text-xs font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>THE COLLECTIVE UNIT</span>
            </div>
            <h2 className="font-syne text-2xl sm:text-4xl font-black text-white">
              CORE TEAM & SPECIALIZED LABS
            </h2>
          </div>

          <span className="font-mono-custom text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            100% IN-HOUSE CRAFTSMANSHIP
          </span>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TEAM_MEMBERS.map((member) => {
            const isSelected = selectedMember.id === member.id;
            return (
              <div
                key={member.id}
                onClick={() => {
                  soundFx.playClick(460);
                  setSelectedMember(member);
                }}
                className={`bg-neutral-900 border-2 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#FF4400] ring-2 ring-[#FF4400]/40 shadow-brutal-sm bg-neutral-800/80 scale-[1.02]'
                    : 'border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-neutral-700 bg-neutral-800">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-black/80 text-[#FFDE99] border border-white/10 rounded font-mono-custom text-[9px] font-bold">
                        {member.isFounder ? 'FOUNDER' : 'LEAD UNIT'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono-custom text-[10px] text-[#FF4400] font-bold block">
                      {member.badge}
                    </span>
                    <h3 className="font-syne text-xl font-bold text-white leading-tight mt-0.5">
                      {member.name}
                    </h3>
                    <p className="font-sans-custom text-xs text-neutral-400 mt-1">
                      {member.role}
                    </p>
                  </div>

                  <p className="font-sans-custom text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800">
                  <div className="flex flex-wrap gap-1">
                    {member.disciplines.slice(0, 2).map((disc) => (
                      <span
                        key={disc}
                        className="px-2 py-0.5 bg-black/60 text-neutral-300 rounded font-mono-custom text-[9px] border border-neutral-800"
                      >
                        {disc}
                      </span>
                    ))}
                    {member.disciplines.length > 2 && (
                      <span className="px-1.5 py-0.5 text-neutral-500 font-mono-custom text-[9px]">
                        +{member.disciplines.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Member Detail Modal / Inspector */}
        <div className="p-4 sm:p-6 bg-neutral-900 border-2 border-neutral-700 rounded-2xl space-y-3 font-mono-custom text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-neutral-400">
            <span className="text-[#FFDE99] font-bold">
              ACTIVE INSPECTOR: {selectedMember.name.toUpperCase()} // {selectedMember.role.toUpperCase()}
            </span>
            <span>PUNE HQ SOUNDSTAGE UNIT</span>
          </div>
          <p className="text-neutral-300 font-sans-custom text-sm leading-relaxed">
            {selectedMember.bio}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {selectedMember.disciplines.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 bg-black text-[#00D084] border border-[#00D084]/30 rounded font-mono-custom text-[11px]"
              >
                ● {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THREE PILLARS OF ODD MANGO ADVANTAGE */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {STUDIO_ABOUT.pillars.map((pillar, idx) => (
          <div
            key={pillar.title}
            className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-brutal flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="font-mono-custom text-xs font-black text-[#FF4400]">
                0{idx + 1} // DISCIPLINE
              </span>
              <h3 className="font-syne text-xl font-black text-black">
                {pillar.title}
              </h3>
              <p className="font-sans-custom text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-neutral-200 flex items-center justify-between font-mono-custom text-[11px] text-neutral-600">
              <span>STANDARDS</span>
              <span className="font-bold text-black">STRICT SLA</span>
            </div>
          </div>
        ))}
      </section>

      {/* 5. FINAL INVITATION STRIP */}
      <section className="bg-black text-white border-3 border-black rounded-2xl p-6 sm:p-10 shadow-brutal-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="font-mono-custom text-xs font-bold text-[#FF4400] tracking-wider uppercase">
            COMMISSIONING CYCLE 2026
          </span>
          <h3 className="font-syne text-2xl sm:text-3xl font-black text-white">
            READY TO COLLABORATE DIRECTLY WITH OMKAR & OUR CAMERA CREW?
          </h3>
          <p className="font-sans-custom text-xs sm:text-sm text-neutral-400">
            Submit your parameters through our intake console or connect directly via phone or WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => { soundFx.playSuccess(); onOpenContact(); }}
            className="px-6 py-3.5 bg-[#FF4400] text-white rounded-xl font-mono-custom font-extrabold text-xs sm:text-sm hover:bg-white hover:text-black transition-colors shadow-brutal cursor-pointer flex items-center justify-center gap-2"
          >
            <span>TRANSMIT BRIEF</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${STUDIO_CONTACT.phone1.tel}`}
            className="px-5 py-3.5 bg-neutral-900 border-2 border-neutral-700 text-white rounded-xl font-mono-custom font-bold text-xs sm:text-sm hover:border-white transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#00D084]" />
            <span>CALL {STUDIO_CONTACT.phone1.display}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
