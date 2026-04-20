/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  AlertTriangle, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Users, 
  Clock, 
  X,
  CreditCard,
  Target,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = ({ scrolled, onBuyClick }: { scrolled: boolean; onBuyClick: () => void }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/90 backdrop-blur-md py-3 shadow-lg border-b border-white/10' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center font-bold text-white">6</div>
          <span className="text-white font-bold text-lg hidden sm:block tracking-tight">MindsetMastery</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-gray-300 hover:text-brand transition-colors text-sm font-medium">Problem</a>
          <a href="#benefits" className="text-gray-300 hover:text-brand transition-colors text-sm font-medium">Outcomes</a>
          <a href="#about" className="text-gray-300 hover:text-brand transition-colors text-sm font-medium">Author</a>
          <a href="#pricing" className="text-gray-300 hover:text-brand transition-colors text-sm font-medium">Pricing</a>
        </div>

        <button 
          onClick={onBuyClick}
          className={`${
            scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          } transition-all duration-300 bg-brand hover:bg-brand-hover text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg border-b-4 border-black/20 transform active:translate-y-px active:border-b-0`}
        >
          Secure Your Copy
        </button>
      </div>
    </nav>
  );
};

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-semibold text-white">{title}</span>
        {isOpen ? <ChevronUp className="text-brand" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-400 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const savedEndTime = localStorage.getItem('ebook_timer_endtime');
    let endTime: number;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime);
    } else {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('ebook_timer_endtime', endTime.toString());
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;

      if (distance < 0) {
        // Reset timer if finished
        const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('ebook_timer_endtime', newEndTime.toString());
        endTime = newEndTime;
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center py-4">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center">
          <div className="bg-navy-light text-brand text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-lg border border-white/5">
            {value.toString().padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{key}</span>
        </div>
      ))}
    </div>
  );
};

const SocialProofNotification = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState("");
  
  const names = ["John", "Sarah", "Michael", "Emma", "David", "Jessica", "Robert", "Sophie"];
  const cities = ["NYC", "London", "Sydney", "Berlin", "Toronto", "Paris", "Austin", "Dubai"];

  useEffect(() => {
    const showNotification = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setNotification(`${name} from ${city} just purchased!`);
      setShow(true);
      
      setTimeout(() => setShow(false), 5000);
    };

    const interval = setInterval(showNotification, 15000);
    setTimeout(showNotification, 5000); // Initial one

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-6 left-6 z-[60] bg-white text-navy px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-100"
        >
          <div className="bg-brand/10 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-brand" />
          </div>
          <div>
            <p className="text-xs font-semibold">{notification}</p>
            <p className="text-[10px] text-gray-500">2 minutes ago</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ExitIntentPopup = ({ isOpen, onClose, onClaim }: { isOpen: boolean; onClose: () => void; onClaim: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-navy w-full max-w-md p-8 rounded-3xl border border-brand/30 shadow-2xl text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
            
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full" />
              <AlertTriangle className="w-16 h-16 text-brand mx-auto relative z-10" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2 italic">WAIT! DON'T LEAVE YET</h2>
            <p className="text-gray-400 mb-6">
              Get an extra <span className="text-brand font-bold">$10 OFF</span> right now. 
              Secure your wealth-building secrets for just $17!
            </p>
            
            <button 
              onClick={onClaim}
              className="w-full bg-brand hover:bg-brand-hover text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand/20 transition-all transform hover:scale-105 active:scale-95"
            >
              Claim My $10 Discount
            </button>
            
            <p className="mt-4 text-[10px] text-gray-500 uppercase tracking-widest">Only available for the next 10 minutes</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main Application ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExit) {
        setShowExitPopup(true);
        setHasShownExit(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownExit]);

  const scrollToPricing = () => {
    const pricing = document.getElementById('pricing');
    pricing?.scrollIntoView({ behavior: 'smooth' });
    setShowExitPopup(false);
  };

  return (
    <div className="min-h-screen bg-navy font-sans text-gray-300 selection:bg-brand selection:text-white">
      <Navbar scrolled={scrolled} onBuyClick={scrollToPricing} />
      
      {/* 1. Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-brand/20">
              <Star className="w-3 h-3 fill-brand" /> New Release 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Rewire Your Brain for <span className="text-brand">Massive Wealth</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              Stop surviving and start thriving. "The 6-Figure Mindset" is the definitive manual for breaking the cycles of mediocrity and building a legacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button 
                onClick={scrollToPricing}
                className="w-full sm:w-auto bg-brand hover:bg-brand-hover text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-brand/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 border-b-4 border-black/20"
              >
                Get Full Access Now <ArrowRight />
              </button>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-xs text-gray-500 font-medium">Join 12,482+ Successful Readers</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="ebook-mockup">
              <div className="ebook-spine"></div>
              <div className="ebook-cover">
                <div>
                  <div className="flex justify-between items-start">
                    <Award className="w-8 h-8" />
                    <span className="text-[10px] font-bold uppercase opacity-80 tracking-widest">Bestseller</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-2 leading-none uppercase italic">The 6-Figure<br/>Mindset</h2>
                  <p className="text-xs font-medium opacity-90">How to rewire your brain for wealth and success.</p>
                </div>
                <div className="flex justify-between items-end border-t border-white/20 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest">Alex Monroe</p>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Target size={20} />
                  </div>
                </div>
              </div>
              <div className="ebook-pages"></div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 2. Problem Section */}
      <section id="problem" className="py-24 bg-navy-light/50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brand uppercase tracking-[0.2em] mb-4">The Real Obstacle</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Most People Stay <span className="italic underline decoration-brand decoration-4 underline-offset-8">Broken</span></h3>
            <p className="text-gray-400 text-lg">It's not lack of resources, it's the invisible wall in your mind built by years of societal conditioning.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock className="text-brand" />, title: "The Time Paradox", text: "Trading hours for dollars is a recipe for stagnation. Discover why 'hard work' Is a trap without the right mental leverage." },
              { icon: <Target className="text-brand" />, title: "Fear of Failure", text: "Your brain is hardwired for safety, not success. We'll show you how to flip the switch on risk aversion." },
              { icon: <Users className="text-brand" />, title: "Comparison Fatigue", text: "Social media sets a false bar. Learn to compete with the version of yourself that's holding you back." }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-navy p-8 rounded-3xl border border-white/5 hover:border-brand/30 transition-all group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{card.title}</h4>
                <p className="text-gray-400 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Outcomes Section */}
      <section id="benefits" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full -translate-x-20" />
            <motion.img 
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.9, opacity: 0 }}
              src="https://picsum.photos/seed/vision/800/800" 
              alt="Success Vision" 
              className="rounded-3xl shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700 aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand p-6 rounded-2xl shadow-xl z-20">
              <p className="text-4xl font-black text-white">10X</p>
              <p className="text-xs font-bold uppercase tracking-widest text-black/60">Productivity Boost</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">Master the Psychology of the <span className="text-accent underline decoration-2 underline-offset-8">Top 1%</span></h2>
            <div className="space-y-6">
              {[
                "Identify and crush deep-seated limiting beliefs about money.",
                "Develop an 'Investor Intuition' that spots opportunities instantly.",
                "Build a morning routine used by billionaire CEOs for focus.",
                "Master high-stakes negotiation through cognitive dominance.",
                "Learn the science of delayed gratification for exponential returns."
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: 20, opacity: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 bg-brand/20 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-brand" />
                  </div>
                  <p className="text-lg text-gray-300 font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={scrollToPricing}
              className="mt-12 bg-white text-navy px-8 py-4 rounded-2xl font-black text-lg hover:bg-brand hover:text-white transition-all shadow-xl flex items-center gap-3"
            >
              Start Your Transformation <Zap size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. About Author */}
      <section id="about" className="py-24 bg-navy-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="glass-morphism rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-64 h-64 flex-shrink-0 relative">
              <div className="absolute inset-0 border-2 border-brand rounded-3xl rotate-6" />
              <img 
                src="https://picsum.photos/seed/author/400/400" 
                alt="Alex Monroe" 
                className="w-full h-full object-cover rounded-3xl relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div>
              <h2 className="text-xs font-bold text-brand uppercase tracking-[0.2em] mb-4">The Architect</h2>
              <h3 className="text-4xl font-bold text-white mb-6">Meet Alex Monroe</h3>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed italic">
                "I went from $0 in debt and panic attacks to building three 7-figure businesses by simply changing how I processed reality."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-white/5 rounded-lg"><BookOpen size={18} className="text-brand" /></div>
                  <span className="font-semibold">Author of 4 Bestsellers</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-white/5 rounded-lg"><Users size={18} className="text-brand" /></div>
                  <span className="font-semibold">Fortune 500 Consultant</span>
                </div>
              </div>
              <p className="text-gray-500 max-w-2xl leading-relaxed">
                Alex has spent over a decade studying the intersection of neuroscience and financial behavioral patterns. He doesn't teach theory; he teaches battle-tested systems for reality manipulation and wealth creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Chapter Preview */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold text-white mb-12">Inside the <span className="text-brand">6-Figure</span> Blueprint</h2>
          <div className="bg-navy-light/40 rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl">
            {[
              { title: "Chapter 1: The Bio-Hacked Foundation", content: "Learn how to optimize your brain's neuroplasticity specifically for pattern recognition in the stock market and business opportunities. Includes 3 specific breathing techniques for decision-making." },
              { title: "Chapter 2: The Scarcity Virus", content: "How to identify 'poverty echoes' in your speech and thoughts. We replace them with a calculated abundance framework that attracts partners and capital subconsciously." },
              { title: "Chapter 3: Cognitive Leverage", content: "Stop the hustle. Learn the 20% of mental activities that yield 80% of your financial results. Introduction to the 'Mental Compounding' equation." },
              { title: "Chapter 4: The Pressure Vault", content: "How to stay cold-blooded during financial crises. Master the physiological responses that allow you to act when everyone else is paralyzed by fear." },
              { title: "Chapter 5: Perpetual Momentum", content: "Building automated systems that defend your mindset even when you're tired, sick, or distracted. The 5-minute 'Reset' protocol." }
            ].map((chapter, i) => (
              <AccordionItem 
                key={i} 
                title={`0${i + 1}. ${chapter.title}`} 
                isOpen={activeChapter === i}
                onClick={() => setActiveChapter(activeChapter === i ? null : i)}
              >
                {chapter.content}
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-brand overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap mb-16"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-6xl md:text-9xl font-black text-black/10 uppercase italic mx-8">
              Success Stories • Success Stories •
            </span>
          ))}
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 relative z-10">
          {[
            { name: "Julian Thorne", role: "Real Estate Mogul", text: "This isn't another motivational book. It's a technical manual for your mind. My portfolio doubled in 8 months after applying Chapter 4." },
            { name: "Elena Rossi", role: "SaaS Founder", text: "The negotiation tactics alone are worth 100x the price. I closed a $1.2M seed round using the cognitive dominance protocols." },
            { name: "Marcus Chen", role: "Venture Capitalist", text: "I've read a thousand self-help books. This is the only one that actually addresses the neurobiology of financial risk. Transformed my life." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-2xl transform md:hover:-translate-y-4 transition-transform">
              <div className="flex text-brand mb-6">
                {[...Array(5)].map((_, s) => <Star key={s} size={20} fill="currentColor" />)}
              </div>
              <p className="text-lg text-navy font-medium italic mb-8 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt={item.name} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-bold text-navy">{item.name}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[150px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Start Your <span className="text-brand">Dynasty</span> Today</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">This is a one-time investment in your most valuable asset: Your Brain. No subscriptions. No hidden fees.</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-navy-light rounded-[40px] border-2 border-brand shadow-2xl p-8 md:p-14 overflow-hidden relative"
            >
              <div className="absolute top-8 right-8 rotate-12">
                <div className="bg-brand text-white px-6 py-2 rounded-full font-black shadow-lg">72% OFF</div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-bold text-white mb-2">6-Figure Mastery Pack</h4>
                  <p className="text-gray-500 text-sm">Digital PDF + Audio Book + Worksheet</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 line-through text-2xl font-bold">$97.00</p>
                  <p className="text-6xl font-black text-brand">$27.00</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-12">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">What's included:</p>
                {[
                  "Digital High-Resolution PDF (Chapter 1-12)",
                  "Bonus: The 'Limitless' Morning Protocol",
                  "Bonus: Wealth Habit Tracker Tool",
                  "Bonus: Exclusive Interview with Alex Monroe",
                  "Lifetime Access to Future Updates",
                  "30-Day 'No Questions' Money-Back Guarantee"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-brand w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center border-t border-white/5 pt-10">
                <p className="text-xs font-bold text-yellow-500 uppercase tracking-[0.2em] mb-2 flex items-center justify-center gap-2">
                  <Clock size={16} /> Opportunity Closes In:
                </p>
                <CountdownTimer />
                
                <button className="w-full bg-brand hover:bg-brand-hover text-white py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-brand/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4 mb-6 border-b-8 border-black/20 mt-6">
                  Get Immediate Access <ArrowRight size={28} />
                </button>
                
                <div className="flex items-center justify-center gap-6 opacity-40">
                  <CreditCard size={24} />
                  <ShieldCheck size={24} />
                  <Target size={24} />
                </div>
                <p className="mt-6 text-[10px] text-gray-600 uppercase font-black tracking-widest">Only 47 copies left at this special price</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 bg-navy-light/10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: "Is this for beginners or experts?", a: "Both. The neurobiological principles apply whether you are making your first $1,000 or your ninth $1,000,000. It's about fundamental brain rewiring." },
              { q: "How long until I see results?", a: "Most users report significant shifts in mental clarity within 48 hours. Financial results typically follow within 30-90 days of consistent protocol application." },
              { q: "Is it a recurring subscription?", a: "Absolutely not. It's a one-time purchase of $27. You own it forever, including all future updates to the digital assets." },
              { q: "What format is the ebook in?", a: "You'll receive a high-resolution, interactive PDF that works on all devices (mobile, tablet, desktop) and an MP3 version of the audio book." },
              { q: "Do you offer refunds?", a: "Yes. If you don't feel more powerful and focused within 30 days, just email us for a full refund. We only want your money if we've provided massive value." }
            ].map((faq, i) => (
              <AccordionItem 
                key={i} 
                title={faq.q} 
                isOpen={activeFaq === i}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                {faq.a}
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="py-16 bg-navy-light border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center font-bold text-white text-sm">6</div>
                <span className="text-white font-bold text-lg tracking-tight">MindsetMastery</span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
                Empowering individuals to break the cycles of social conditioning and achieve true financial sovereignty through neuro-rewiring.
              </p>
            </div>
            <div>
              <p className="text-white font-bold mb-6">Resources</p>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-brand transition-colors">Affiliate Program</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Bulk Orders</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Support Center</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-6">Legal</p>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-brand transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Income Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
            <p>&copy; 2024 Mindset Mastery Publishing. All Rights Reserved.</p>
            <div className="flex gap-8">
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-brand" /> Secure Checkout</span>
              <span className="flex items-center gap-2"><Award size={14} className="text-brand" /> Satisfaction Guaranteed</span>
            </div>
          </div>
          
          <div className="mt-8 text-[10px] text-gray-600 text-center uppercase tracking-widest px-4">
            Disclaimer: The results mentioned above are not typical. Success requires discipline, effort, and application. This is not a get-rich-quick scheme.
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <SocialProofNotification />
      <ExitIntentPopup 
        isOpen={showExitPopup} 
        onClose={() => setShowExitPopup(false)} 
        onClaim={scrollToPricing} 
      />
    </div>
  );
}
