import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/audio';
import { STUDIO_CONTACT } from '../data/agencyData';
import { Send, CheckCircle2, Copy, MapPin, Mail, Phone, ArrowUpRight, Clock, Instagram, Youtube } from 'lucide-react';

interface ContactFooterProps {
  prefilledScope?: string;
  prefilledPrice?: number;
  onReplayLoader?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ prefilledScope, prefilledPrice, onReplayLoader }) => {
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Branding & Identity', 'Cinema Commercial']);
  const [budgetRange, setBudgetRange] = useState('$15,000 - $40,000');
  const [launchWindow, setLaunchWindow] = useState('Q3 / Q4 2026');
  const [briefDetails, setBriefDetails] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; timestamp: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (prefilledScope) {
      setBriefDetails((prev) =>
        prev ? `${prev}\n\n[IMPORTED SCOPE ESTIMATE: $${prefilledPrice?.toLocaleString()}]: ${prefilledScope}` : `[IMPORTED SCOPE ESTIMATE: $${prefilledPrice?.toLocaleString()}]: ${prefilledScope}`
      );
    }
  }, [prefilledScope, prefilledPrice]);

  const serviceOptions = [
    'Branding & Identity',
    'Cinema Commercial',
    'Social Media Growth',
    'Experiential Event',
    '3D Motion & CGI',
    'Packaging Engineering',
  ];

  const toggleService = (svc: string) => {
    soundFx.playClick(480);
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !email) {
      soundFx.playThump();
      alert('Please provide your brand name and work email so our studio leads can reach you.');
      return;
    }
    soundFx.playSuccess();
    const ticketId = `OM-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      id: ticketId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const handleCopyTicket = () => {
    if (!submittedTicket) return;
    soundFx.playClick(600);
    const text = `ODD MANGO INTAKE TICKET #${submittedTicket.id}\nBrand: ${brandName}\nEmail: ${email}\nServices: ${selectedServices.join(', ')}\nBudget: ${budgetRange}\nLaunch: ${launchWindow}\nBrief: ${briefDetails || 'Discovery Session'}`;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    <footer id="contact-intake" className="mt-8 space-y-6">
      {/* The Signature Beige Neo-Brutalist Intake Box */}
      <div className="bg-[#FFDE99] border-3 border-black rounded-2xl p-4 sm:p-10 shadow-brutal-xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Manifesto & Studio Coordinates */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="font-syne text-2xl sm:text-5xl font-black text-black leading-[1.05] tracking-tight">
              READY TO LAUNCH YOUR BRAND INTO CULT STATUS?
            </h2>
            <p className="font-sans-custom text-xs sm:text-base text-neutral-800 font-medium leading-relaxed">
              We take on a limited roster of 12 full-scale commissions per calendar year to guarantee obsessive creative execution. Submit your parameters below to initiate discovery.
            </p>
          </div>

          {/* Rapid Response SLA */}
          <div className="p-3.5 sm:p-4 bg-white border-2 border-black rounded-xl space-y-1 shadow-brutal-sm font-mono-custom text-xs">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <Clock className="w-4 h-4 text-[#FF4400]" />
              <span>4-HOUR STUDIO SLA RESPONSE</span>
            </div>
            <p className="text-neutral-600 text-[11px] leading-relaxed">
              Every brief is reviewed directly by our Principal Creative Directors, never outsourced sales reps.
            </p>
          </div>

          {/* Physical Coordinates, Direct Lines & Official Socials */}
          <div className="space-y-4 pt-1 sm:pt-2 font-mono-custom text-xs">
            {/* Studio Location */}
            <div className="flex items-start gap-2 text-black">
              <MapPin className="w-4 h-4 text-[#FF4400] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">PUNE HQ & SOUNDSTAGE</span>
                <span className="text-neutral-700">{STUDIO_CONTACT.location}</span>
              </div>
            </div>

            {/* Direct Email */}
            <div className="flex items-center gap-2 text-neutral-900 bg-white/60 p-2.5 rounded-xl border border-black/10">
              <Mail className="w-4 h-4 text-[#FF4400] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-neutral-500 font-bold block">STUDIO INQUIRIES</span>
                <a
                  href={`mailto:${STUDIO_CONTACT.email}`}
                  className="font-bold hover:text-[#FF4400] underline truncate block"
                >
                  {STUDIO_CONTACT.email}
                </a>
              </div>
            </div>

            {/* Direct Phone Lines */}
            <div className="bg-white/60 p-2.5 rounded-xl border border-black/10 space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-900">
                <Phone className="w-4 h-4 text-[#00D084] shrink-0" />
                <span className="text-[10px] text-neutral-500 font-bold">DIRECT PRODUCTION PHONES</span>
              </div>
              <div className="flex items-center gap-3 pl-6 flex-wrap">
                <a
                  href={`tel:${STUDIO_CONTACT.phone1.tel}`}
                  className="font-bold hover:text-[#FF4400] underline flex items-center gap-1"
                >
                  <span>{STUDIO_CONTACT.phone1.display}</span>
                </a>
                <span className="text-neutral-400">•</span>
                <a
                  href={`tel:${STUDIO_CONTACT.phone2.tel}`}
                  className="font-bold hover:text-[#FF4400] underline flex items-center gap-1"
                >
                  <span>{STUDIO_CONTACT.phone2.display}</span>
                </a>
              </div>
            </div>

            {/* Official Social Channels */}
            <div className="pt-2 border-t-2 border-black/20 space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-700 block tracking-wider">
                OFFICIAL SOCIALS & CHANNELS
              </span>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                <a
                  href={STUDIO_CONTACT.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-black text-white rounded-xl font-bold hover:bg-[#FF4400] transition-colors shadow-sm group"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#FFDE99]" />
                    <span className="text-[11px]">{STUDIO_CONTACT.instagram.handle}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-neutral-400 group-hover:text-white" />
                </a>

                <a
                  href={STUDIO_CONTACT.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#FF0000] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-sm group"
                >
                  <div className="flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-white" />
                    <span className="text-[11px]">{STUDIO_CONTACT.youtube.handle}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-white/80 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Brief Form */}
        <div className="lg:col-span-7 bg-white border-3 border-black rounded-2xl p-4 sm:p-8 shadow-brutal overflow-hidden">
          <AnimatePresence mode="wait">
            {submittedTicket ? (
              <motion.div
                key="ticket-confirmation"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 space-y-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#00D084] border-2 border-black mx-auto flex items-center justify-center shadow-brutal">
                  <CheckCircle2 className="w-8 h-8 text-black" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono-custom text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    COMMISSION BRIEF REGISTERED
                  </span>
                  <h3 className="font-syne text-3xl font-black text-black">
                    TICKET {submittedTicket.id}
                  </h3>
                  <p className="font-sans-custom text-sm text-neutral-700 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-black">{brandName}</span>. Our studio leads have received your parameters and will respond at <span className="font-bold text-black">{email}</span> within 4 hours.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 border-2 border-black rounded-xl text-left max-w-md mx-auto font-mono-custom text-xs space-y-2">
                  <div className="flex justify-between text-neutral-500">
                    <span>TIMESTAMP:</span>
                    <span className="font-bold text-black">{submittedTicket.timestamp} IST</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>SERVICES:</span>
                    <span className="font-bold text-black">{selectedServices.join(', ') || 'Custom'}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>BUDGET:</span>
                    <span className="font-bold text-black">{budgetRange}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleCopyTicket}
                    className="px-5 py-2.5 bg-neutral-100 border-2 border-black rounded-xl font-mono-custom text-xs font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{isCopied ? 'COPIED TO CLIPBOARD!' : 'COPY BRIEF RECEIPT'}</span>
                  </button>

                  <button
                    onClick={() => setSubmittedTicket(null)}
                    className="px-5 py-2.5 bg-black text-white border-2 border-black rounded-xl font-mono-custom text-xs font-bold hover:bg-[#FF4400] transition-colors cursor-pointer"
                  >
                    SUBMIT ANOTHER BRIEF
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="intake-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-200">
                  <span className="font-mono-custom text-xs font-black text-black uppercase">
                    PROJECT INTAKE SPECIFICATION
                  </span>
                  <span className="font-mono-custom text-[11px] text-[#FF4400] font-bold">
                    *ALL INQUIRIES STRICTLY CONFIDENTIAL
                  </span>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono-custom text-xs font-bold text-black block">
                      BRAND / COMPANY NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arc’teryx or Studio Kura"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full p-3 border-2 border-black rounded-xl font-mono-custom text-xs bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-[#FF4400] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono-custom text-xs font-bold text-black block">
                      WORK EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@brand.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border-2 border-black rounded-xl font-mono-custom text-xs bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-[#FF4400] outline-none"
                    />
                  </div>
                </div>

                {/* Service Selection Pills */}
                <div className="space-y-2">
                  <label className="font-mono-custom text-xs font-bold text-black block">
                    CAPABILITIES REQUIRED (SELECT MULTIPLE)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((svc) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => toggleService(svc)}
                          className={`px-3 py-1.5 rounded-lg border-2 border-black font-mono-custom text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-black text-white shadow-brutal-sm scale-102'
                              : 'bg-neutral-100 text-neutral-800 hover:bg-[#FFDE99]'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget and Launch Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono-custom text-xs font-bold text-black block">
                      TARGET BUDGET RANGE
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => { soundFx.playClick(450); setBudgetRange(e.target.value); }}
                      className="w-full p-3 border-2 border-black rounded-xl font-mono-custom text-xs bg-neutral-50 focus:bg-white outline-none cursor-pointer"
                    >
                      <option value="$8,000 - $15,000">$8,000 - $15,000 (Sprint)</option>
                      <option value="$15,000 - $40,000">$15,000 - $40,000 (Standard)</option>
                      <option value="$40,000 - $85,000">$40,000 - $85,000 (Enterprise Hero)</option>
                      <option value="$85,000+">$85,000+ (Full Year Global Retainer)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono-custom text-xs font-bold text-black block">
                      TARGET LAUNCH WINDOW
                    </label>
                    <select
                      value={launchWindow}
                      onChange={(e) => { soundFx.playClick(450); setLaunchWindow(e.target.value); }}
                      className="w-full p-3 border-2 border-black rounded-xl font-mono-custom text-xs bg-neutral-50 focus:bg-white outline-none cursor-pointer"
                    >
                      <option value="Immediate Rush (< 4 Weeks)">Immediate Rush (&lt; 4 Weeks)</option>
                      <option value="Q3 / Q4 2026">Q3 / Q4 2026 (Standard Cycle)</option>
                      <option value="Q1 / Q2 2027">Q1 / Q2 2027 (Long-Horizon)</option>
                    </select>
                  </div>
                </div>

                {/* Brief details text */}
                <div className="space-y-1">
                  <label className="font-mono-custom text-xs font-bold text-black block">
                    PROJECT BRIEF & OBJECTIVES (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the project goals, audience, or link to existing brand decks..."
                    value={briefDetails}
                    onChange={(e) => setBriefDetails(e.target.value)}
                    className="w-full p-3 border-2 border-black rounded-xl font-mono-custom text-xs bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-[#FF4400] outline-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 px-4 bg-[#FF4400] text-white border-2 border-black rounded-xl font-mono-custom font-black text-xs sm:text-sm uppercase tracking-normal sm:tracking-wider hover:bg-black transition-colors shadow-brutal cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span className="xs:hidden">TRANSMIT BRIEF</span>
                  <span className="hidden xs:inline sm:hidden">TRANSMIT COMMISSION BRIEF</span>
                  <span className="hidden sm:inline">TRANSMIT BRIEF TO ODD MANGO LEADS</span>
                  <Send className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Direct Connect Strip */}
      <div className="bg-black text-white border-2 border-black rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 font-mono-custom text-xs shadow-brutal-sm">
        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
          <span className="text-[#FF4400] font-black">CONNECT DIRECT:</span>
          <a
            href={`mailto:${STUDIO_CONTACT.email}`}
            className="text-white hover:text-[#FFDE99] underline transition-colors"
          >
            {STUDIO_CONTACT.email}
          </a>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <a
            href={`tel:${STUDIO_CONTACT.phone1.tel}`}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {STUDIO_CONTACT.phone1.display}
          </a>
          <span className="text-neutral-600">/</span>
          <a
            href={`tel:${STUDIO_CONTACT.phone2.tel}`}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {STUDIO_CONTACT.phone2.display}
          </a>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={STUDIO_CONTACT.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#FFDE99] hover:text-white font-bold transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>{STUDIO_CONTACT.instagram.handle}</span>
          </a>
          <span className="text-neutral-600">•</span>
          <a
            href={STUDIO_CONTACT.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#FF4400] hover:text-white font-bold transition-colors"
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>{STUDIO_CONTACT.youtube.handle}</span>
          </a>
        </div>
      </div>

      {/* System Architecture Colophon */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 font-mono-custom text-[11px] sm:text-xs text-neutral-400 text-center sm:text-left pt-1">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
          <span>© 2026 ODD MANGO MEDIA STUDIO</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-neutral-500">PUNE HQ (IST) ⇄ TOKYO (JST)</span>
        </div>
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
          {onReplayLoader && (
            <>
              <button
                type="button"
                onClick={() => { soundFx.playClick(500); onReplayLoader(); }}
                className="text-neutral-400 hover:text-[#FF4400] transition-colors cursor-pointer"
                title="Preview intro loading screen and load bar"
              >
                [REPLAY LOADER]
              </button>
              <span className="text-neutral-600">•</span>
            </>
          )}
          <span className="text-[#FFDE99]">SYS ARCH VER 3.5 UNIFIED</span>
          <span className="text-neutral-600">•</span>
          <a
            href="#om-main-header"
            onClick={() => soundFx.playClick(650)}
            className="hover:text-white underline cursor-pointer font-bold text-white"
          >
            TOP ⇧
          </a>
        </div>
      </div>
    </footer>
  );
};
