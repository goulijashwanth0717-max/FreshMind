import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  ArrowRight, 
  Sparkles, 
  CloudSun, 
  BarChart3, 
  BrainCircuit, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  Trash2, 
  DollarSign, 
  PackageCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Flame,
  Layers,
  Zap,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import FloatingGroceries3D from './FloatingGroceries3D';

export default function LandingPage({ onLaunchDashboard, onNavigateTab, totalUsers = 3 }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(1);

  // Parallax tracking
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const normX = (e.clientX / innerWidth - 0.5) * 2;
    const normY = -(e.clientY / innerHeight - 0.5) * 2;
    mouseRef.current = { x: normX, y: normY };
    setMousePos({ x: normX, y: normY });
  };

  const scrollToHowItWorks = () => {
    const elem = document.getElementById('how-it-works');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#0D121D] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden"
    >
      {/* Background Subtle Grid + Ambient Glow Lighting */}
      <div className="fixed inset-0 bg-grid-subtle pointer-events-none opacity-40 z-0" />
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 -right-40 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-1/3 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 3D WebGL Floating Groceries Canvas (Milk carton, Banana bunch, Bread loaf) */}
      <FloatingGroceries3D mousePosition={mouseRef} />

      {/* Parallax Depth Overlay Elements */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 transition-transform duration-700 ease-out hidden lg:block"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${-mousePos.y * 12}px, 0)`
        }}
      >
        {/* Floating Spatial Tag: Milk Carton */}
        <div 
          className="absolute top-[28%] left-[8%] animate-float-1"
          style={{ transform: `translate3d(${mousePos.x * 15}px, ${-mousePos.y * 15}px, 0)` }}
        >
          <div className="vision-glass px-3.5 py-2 rounded-2xl flex items-center space-x-2.5 backdrop-blur-2xl shadow-2xl border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-200">500ml Whole Milk</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
              -35% Expiry Today
            </span>
          </div>
        </div>

        {/* Floating Spatial Tag: Banana Bunch */}
        <div 
          className="absolute top-[24%] right-[9%] animate-float-2"
          style={{ transform: `translate3d(${mousePos.x * -18}px, ${-mousePos.y * -18}px, 0)` }}
        >
          <div className="vision-glass px-3.5 py-2 rounded-2xl flex items-center space-x-2.5 backdrop-blur-2xl shadow-2xl border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="font-semibold text-slate-200">Robusta Banana Bunch</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
              Stage 5 Ripe
            </span>
          </div>
        </div>

        {/* Floating Spatial Tag: Artisan Bread */}
        <div 
          className="absolute bottom-[28%] left-[12%] animate-float-3"
          style={{ transform: `translate3d(${mousePos.x * 20}px, ${-mousePos.y * 20}px, 0)` }}
        >
          <div className="vision-glass px-3.5 py-2 rounded-2xl flex items-center space-x-2.5 backdrop-blur-2xl shadow-2xl border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="font-semibold text-slate-200">Artisan Sourdough Loaf</span>
            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
              Bake 06:00 AM
            </span>
          </div>
        </div>
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* FreshMind logo with 3D leaf mint gradient left */}
        <div 
          onClick={onLaunchDashboard}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30 border border-emerald-300/40 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Leaf className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0D121D]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                FreshMind
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-wider">
                AI POC
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Zero-Waste Grocery AI</p>
          </div>
        </div>

        {/* Buttons: Product, Agents, Simulation, Login (green 3D), Get Started */}
        <nav className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={scrollToHowItWorks}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
          >
            Product
          </button>
          
          <button
            onClick={() => onNavigateTab ? onNavigateTab('agent-ensemble') : onLaunchDashboard()}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
          >
            Agents
          </button>

          <button
            onClick={() => onNavigateTab ? onNavigateTab('simulation') : onLaunchDashboard()}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
          >
            Simulation
          </button>

          {/* Login (green 3D button) */}
          <Link
            to="/login"
            className="btn-3d-primary px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer no-underline"
          >
            <span>Login</span>
          </Link>

          {/* Get Started button */}
          <Link
            to="/signup"
            className="btn-glass-secondary px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white flex items-center space-x-1 cursor-pointer no-underline"
          >
            <span>Get Started</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </nav>
      </header>

      {/* HERO SECTION - FULL SCREEN CENTERED */}
      <section className="relative z-20 min-h-[calc(100vh-92px)] flex flex-col items-center justify-center px-6 py-12 text-center max-w-6xl mx-auto">
        
        {/* Center Badge: "AI POC - Live in 4 Hyderabad Stores" + "Joined by {totalUsers} planners" */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full vision-glass border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-2xl shadow-[0_0_24px_rgba(16,185,129,0.18)] hover:scale-105 transition-transform duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-sm shadow-emerald-400/80"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-300">
              AI POC — Live in 4 Hyderabad Stores
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline-block border-l border-emerald-500/20 pl-2">
              Banjara Hills · Hitec City · Jubilee Hills · Gachibowli
            </span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full vision-glass border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Joined by <strong className="text-white font-mono">{totalUsers}</strong> planners</span>
          </div>
        </div>

        {/* Big headline 3D extruded: "Stop Waste. Save Margin. With Agentic AI." with gradient white to mint */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-6 max-w-5xl text-3d-headline select-none">
          <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Stop Waste.{' '}
          </span>
          <span className="bg-gradient-to-b from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
            Save Margin.{' '}
          </span>
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-[#10B981] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(16,185,129,0.4)]">
            With Agentic AI.
          </span>
        </h1>

        {/* Subtext: "5 AI agents orchestrate demand, freshness, weather 38°C, and price elasticity to cut waste by 59% - from 22% to 9%." */}
        <p className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10 tracking-tight">
          <span className="text-white font-semibold">5 AI agents</span> orchestrate demand, freshness,{' '}
          <span className="inline-flex items-center text-amber-300 font-semibold px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 mx-1">
            <Flame className="w-4 h-4 mr-1 text-amber-400 inline" /> weather 38°C
          </span>
          , and price elasticity to cut waste by{' '}
          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            59%
          </span>{' '}
          — from <span className="line-through text-rose-400/80">22%</span> to{' '}
          <span className="text-emerald-300 font-bold">9%</span>.
        </p>

        {/* Two CTA buttons: 3D primary "Launch Dashboard →" green glowing with heavy shadow, secondary glass "View Simulation" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 w-full max-w-md sm:max-w-none">
          {/* Primary CTA */}
          <button
            onClick={onLaunchDashboard}
            className="w-full sm:w-auto btn-3d-primary px-8 py-4 rounded-2xl text-base font-extrabold text-slate-950 flex items-center justify-center space-x-3 cursor-pointer group tracking-tight"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => onNavigateTab ? onNavigateTab('simulation') : onLaunchDashboard()}
            className="w-full sm:w-auto btn-glass-secondary px-8 py-4 rounded-2xl text-base font-semibold text-slate-100 flex items-center justify-center space-x-2.5 cursor-pointer group"
          >
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>View Simulation</span>
          </button>
        </div>

        {/* BELOW: 3 KPI FLOATING 3D GLASS CARDS - same style as dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl text-left">
          
          {/* Card 1: 164.5kg Waste Prevented */}
          <div className="vision-glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Waste Prevented
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                <Trash2 className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-1.5 relative z-10">
              <div className="text-3xl font-black text-white tracking-tight">
                164.5kg
              </div>
              <div className="flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full border shadow-sm bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+18.4%</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium relative z-10">
              Organic waste diverted from landfills across Hyderabad stores
            </p>
          </div>

          {/* Card 2: $2,570 Margin Saved */}
          <div className="vision-glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Margin Saved
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm bg-amber-500/15 text-amber-400 border-amber-500/30">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-1.5 relative z-10">
              <div className="text-3xl font-black text-white tracking-tight">
                $2,570
              </div>
              <div className="flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full border shadow-sm bg-amber-500/15 text-amber-400 border-amber-500/30">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+$380 today</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium relative z-10">
              Dynamic markdowns recover margin vs 100% dump loss
            </p>
          </div>

          {/* Card 3: 34 Stockouts Avoided */}
          <div className="vision-glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Stockouts Avoided
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm bg-cyan-500/15 text-cyan-400 border-cyan-500/30">
                <PackageCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-1.5 relative z-10">
              <div className="text-3xl font-black text-white tracking-tight">
                34 SKUs
              </div>
              <div className="flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full border shadow-sm bg-cyan-500/15 text-cyan-400 border-cyan-500/30">
                <span>99.1% service</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium relative z-10">
              Automated safety stock and multi-store replenishment
            </p>
          </div>

        </div>

      </section>

      {/* MIDDLE: HOW IT WORKS - 3 STEPS AS 3D CONNECTED CARDS */}
      <section id="how-it-works" className="relative z-20 py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Agentic Orchestration Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            How FreshMind Works in Real Time
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Three interconnected stages transforming ambient store signals into automated zero-waste logistics.
          </p>
        </div>

        {/* 3 Connected 3D Cards with Glowing Flow Connector */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Glowing Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] -translate-y-8 h-1 glow-connector rounded-full pointer-events-none z-0" />

          {/* STEP 1: SENSE */}
          <div 
            onMouseEnter={() => setActiveStep(1)}
            className={`relative vision-glass-card rounded-3xl p-8 z-10 transition-all duration-300 cursor-pointer ${
              activeStep === 1 
                ? 'border-emerald-500/50 shadow-[0_20px_60px_rgba(16,185,129,0.25)] -translate-y-2' 
                : 'hover:-translate-y-1'
            }`}
          >
            {/* Step badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Step 01
              </span>
              <span className="text-xs font-medium text-slate-400">Continuous Stream</span>
            </div>

            {/* 3D Icon Container: Cloud + Chart */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-emerald-500/30 blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <CloudSun className="w-9 h-9 text-sky-400 drop-shadow-[0_4px_10px_rgba(56,189,248,0.5)]" />
                  <BarChart3 className="w-5 h-5 text-emerald-400 absolute -bottom-1 -right-2 drop-shadow-[0_2px_6px_rgba(16,185,129,0.5)]" />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white text-center mb-2 tracking-tight">
              1. Sense
            </h3>
            <p className="text-xs font-semibold text-emerald-400 text-center mb-4 uppercase tracking-wider">
              Weather Agent + Demand Agent
            </p>
            <p className="text-sm text-slate-300 leading-relaxed text-center mb-6">
              Ingests live 38°C Hyderabad heatwave sensors, batch sell-by timestamps, POS register scan velocity, and local store footfall patterns every 15 minutes.
            </p>

            {/* Sub-signals checklist */}
            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>38°C Hyderabad thermal spike monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Shelf life degradation calculus</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-time POS checkout velocity</span>
              </div>
            </div>
          </div>

          {/* STEP 2: DECIDE */}
          <div 
            onMouseEnter={() => setActiveStep(2)}
            className={`relative vision-glass-card rounded-3xl p-8 z-10 transition-all duration-300 cursor-pointer ${
              activeStep === 2 
                ? 'border-teal-400/50 shadow-[0_20px_60px_rgba(20,184,166,0.25)] -translate-y-2' 
                : 'hover:-translate-y-1'
            }`}
          >
            {/* Step badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-teal-400 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                Step 02
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                <span>92% Confidence</span>
              </span>
            </div>

            {/* 3D Icon Container: Brain */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-indigo-500/30 blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-teal-300 drop-shadow-[0_4px_12px_rgba(45,212,191,0.6)]" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-white text-center mb-2 tracking-tight">
              2. Decide
            </h3>
            <p className="text-xs font-semibold text-teal-400 text-center mb-4 uppercase tracking-wider">
              Orchestrator 92% Confidence
            </p>
            <p className="text-sm text-slate-300 leading-relaxed text-center mb-6">
              Freshness & Pricing agents negotiate elasticity curves. Orchestrator computes whether to markdown 20-50% or initiate cross-store redistribution before decay occurs.
            </p>

            {/* Sub-signals checklist */}
            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Price elasticity curve optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Multi-agent consensus validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero-hallucination HITL safeguard</span>
              </div>
            </div>
          </div>

          {/* STEP 3: ACT */}
          <div 
            onMouseEnter={() => setActiveStep(3)}
            className={`relative vision-glass-card rounded-3xl p-8 z-10 transition-all duration-300 cursor-pointer ${
              activeStep === 3 
                ? 'border-cyan-400/50 shadow-[0_20px_60px_rgba(6,182,212,0.25)] -translate-y-2' 
                : 'hover:-translate-y-1'
            }`}
          >
            {/* Step badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Step 03
              </span>
              <span className="text-xs font-medium text-slate-400">Zero Latency Sync</span>
            </div>

            {/* 3D Icon Container: Truck */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/30 blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl flex items-center justify-center">
                <Truck className="w-10 h-10 text-cyan-300 drop-shadow-[0_4px_12px_rgba(6,182,212,0.6)]" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-white text-center mb-2 tracking-tight">
              3. Act
            </h3>
            <p className="text-xs font-semibold text-cyan-400 text-center mb-4 uppercase tracking-wider">
              Markdown / Transfer / Replenish
            </p>
            <p className="text-sm text-slate-300 leading-relaxed text-center mb-6">
              Instantly syncs dynamic markdown barcodes to Electronic Shelf Labels (ESL) and sends automated dispatch orders to ERP, WMS, and checkout registers.
            </p>

            {/* Sub-signals checklist */}
            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Electronic Shelf Label (ESL) push</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Cross-store cold-chain transfer orders</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>ERP & POS pricing ledger synchronization</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={onLaunchDashboard}
            className="btn-3d-primary inline-flex items-center space-x-3 px-8 py-4 rounded-2xl text-slate-950 font-bold text-sm tracking-tight cursor-pointer"
          >
            <span>Experience Live Grocery Orchestration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* FOOTER: MINIMAL, © FreshMind */}
      <footer className="relative z-20 border-t border-slate-800/80 bg-[#0A0E17]/90 backdrop-blur-xl py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs text-slate-400">
              <span className="font-bold text-white">© FreshMind</span> — Zero-Waste Grocery Agentic AI.
              <span className="hidden sm:inline text-slate-500 ml-2">All rights reserved.</span>
            </div>
          </div>

          {/* Operational Status */}
          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All 5 AI Agents Operational · Hyderabad Production Cluster</span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center space-x-5 text-xs text-slate-400">
            <Link to="/login" className="hover:text-emerald-400 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-emerald-400 transition-colors">
              Create Account
            </Link>
            <button 
              onClick={onLaunchDashboard}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigateTab ? onNavigateTab('simulation') : onLaunchDashboard()}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Simulation
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">v2.4 POC</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
