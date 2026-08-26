import { useState } from "react";
import "@/App.css";
import { ArrowUpRight, BarChart3, Check, ChevronRight, CircleDot, Clock3, Compass, Gauge, Menu, ShieldCheck, Sparkles, X, Zap } from "lucide-react";

const tools = [
  { number: "01", name: "Incident Priority", kicker: "ITSM / OPERATIONS", description: "Turn noisy incident signals into a confident severity call in seconds.", icon: Gauge, accent: "mint", url: "https://meetulista.gumroad.com/l/it-incident-priority-calculator" },
  { number: "02", name: "Salary Benchmarker", kicker: "COMPENSATION / STRATEGY", description: "See the market clearly before the next offer, review, or board conversation.", icon: BarChart3, accent: "blue", url: "https://meetulista.gumroad.com/l/it-leadership-salary-benchmarker" },
  { number: "03", name: "Change Readiness", kicker: "RISK / GOVERNANCE", description: "Pressure-test a release before it becomes tomorrow’s incident report.", icon: ShieldCheck, accent: "peach", url: "https://meetulista.gumroad.com/l/it-change-readiness-checker" },
  { number: "04", name: "Service Health Map", kicker: "CORE TOOL / OPERATIONS", description: "Map the services that matter most and keep attention on the real bottlenecks.", icon: Compass, accent: "blue", internal: true },
  { number: "05", name: "Rota & Capacity", kicker: "CORE TOOL / PLANNING", description: "Balance team capacity with the work that cannot afford to slip.", icon: Clock3, accent: "mint", internal: true },
  { number: "06", name: "Decision Log", kicker: "CORE TOOL / LEADERSHIP", description: "Capture the why behind high-stakes decisions while the context is fresh.", icon: CircleDot, accent: "peach", internal: true },
];

function ToolModal({ tool, onClose }) {
  if (!tool) return null;
  return <div className="modal-backdrop" role="dialog" aria-modal="true" data-testid="tool-launch-modal">
    <div className="modal-card">
      <button className="icon-button modal-close" onClick={onClose} aria-label="Close tool" data-testid="close-tool-modal"><X size={18} /></button>
      <div className="modal-eyebrow">SECURE TOOL LAUNCH / {tool.number}</div>
      <h2>{tool.name}</h2>
      <p>Launching your workspace inside IT Tool Land. Your checkout and access flow stays in this window.</p>
      {tool.internal ? <div className="workspace-preview" style={{height:"calc(100% - 155px)", border:"1px solid var(--line)", borderRadius:9, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, background:"radial-gradient(circle at 50% 30%, rgba(184,237,191,.14), transparent 40%), #0b0e13", color:"var(--mint)", textAlign:"center"}} data-testid="internal-tool-preview"><Sparkles size={28} /><strong>{tool.name} workspace</strong><span>This focused workspace is ready for your next decision.</span><button className="primary-button" onClick={onClose} data-testid="close-workspace-button">Back to toolkit <ChevronRight size={15} /></button></div> : <><iframe title={tool.name} src={tool.url} className="gumroad-frame" data-testid="gumroad-tool-frame" /><a href={tool.url} className="text-link" target="_blank" rel="noreferrer" data-testid="open-gumroad-fallback">Open in a new tab <ArrowUpRight size={15} /></a></>}
    </div>
  </div>;
}

const Home = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollToTools = () => document.getElementById("toolkit")?.scrollIntoView({ behavior: "smooth" });

  return <main className="site-shell" data-testid="it-tool-land-page">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <nav className="nav-wrap" data-testid="site-navigation">
      <a href="#top" className="brand" data-testid="brand-link"><span className="brand-mark"><Zap size={17} fill="currentColor" /></span><span>IT TOOL <b>LAND</b></span></a>
      <div className={`nav-links ${menuOpen ? "is-open" : ""}`}><a href="#toolkit" data-testid="nav-toolkit-link">Toolkit</a><a href="#method" data-testid="nav-method-link">The method</a><a href="#about" data-testid="nav-about-link">About</a></div>
      <button className="nav-cta" onClick={scrollToTools} data-testid="nav-explore-button">Explore toolkit <ChevronRight size={16} /></button>
      <button className="menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-button"><Menu size={20} /></button>
    </nav>

    <section className="hero container" id="top" data-testid="hero-section">
      <div className="hero-copy reveal"><div className="eyebrow"><span className="live-dot" /> THE OPERATING SYSTEM FOR BETTER IT DECISIONS</div><h1 data-testid="hero-heading">Make the call.<br /><em>Move with clarity.</em></h1><p className="hero-lede" data-testid="hero-description">A sharp, focused toolkit for the people who keep technology moving. Less noise. Better decisions. Noticeably calmer days.</p><div className="hero-actions"><button className="primary-button" onClick={scrollToTools} data-testid="hero-explore-button">Explore the toolkit <ArrowUpRight size={17} /></button><a className="quiet-link" href="#method" data-testid="hero-method-link">See how it works <ChevronRight size={16} /></a></div><div className="hero-proof"><span><Check size={14} /> Built for IT leaders</span><span><Check size={14} /> No busywork</span></div></div>
      <div className="hero-visual reveal delay-one" data-testid="hero-visual"><div className="visual-grid" /><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="signal-card"><div className="signal-top"><span>DECISION SIGNAL</span><span className="signal-live"><span className="live-dot" /> LIVE</span></div><div className="signal-value">84<span>%</span></div><div className="signal-label">Operational confidence</div><div className="signal-line"><span /><span /><span /><span /><span /><span /><span /></div><div className="signal-footer"><span>THIS WEEK</span><b>+18.4%</b></div></div><div className="floating-chip chip-top"><Sparkles size={14} /> Clearer by design</div><div className="floating-chip chip-bottom">01 — 06 <span>TOOLS READY</span></div></div>
    </section>

    <section className="stats container" data-testid="stats-section"><div><b>06</b><span>focused tools</span></div><div><b>01</b><span>calmer operating rhythm</span></div><div><b>∞</b><span>better decisions ahead</span></div><div className="stats-note">Designed for the moments<br />that matter most.</div></section>

    <section className="toolkit container" id="toolkit" data-testid="toolkit-section"><div className="section-heading"><div><div className="eyebrow">THE TOOLKIT / 01—06</div><h2>Everything you need<br /><span>to see the signal.</span></h2></div><p>Six precise instruments for the work behind the work — from the first alert to the final sign-off.</p></div><div className="tool-grid">{tools.map(tool => { const Icon = tool.icon; return <article className={`tool-card ${tool.accent}`} key={tool.number} data-testid={`tool-card-${tool.number}`}><div className="card-head"><span className="tool-number">{tool.number}</span><div className="tool-icon"><Icon size={19} /></div></div><div><div className="card-kicker">{tool.kicker}</div><h3>{tool.name}</h3><p>{tool.description}</p></div><button className="card-link" onClick={() => setActiveTool(tool)} data-testid={`launch-tool-${tool.number}`}>{tool.internal ? "Open workspace" : "Launch tool"}<ArrowUpRight size={16} /></button></article>; })}</div></section>

    <section className="method container" id="method" data-testid="method-section"><div className="method-panel"><div><div className="eyebrow">A BETTER RHYTHM</div><h2>Clarity is a<br /><em>competitive edge.</em></h2></div><div className="method-steps"><div><b>01</b><span><strong>Spot the signal</strong><small>Cut through the noise with a focused starting point.</small></span></div><div><b>02</b><span><strong>Make the call</strong><small>Use a simple framework that holds up under pressure.</small></span></div><div><b>03</b><span><strong>Keep moving</strong><small>Turn good judgment into momentum for your team.</small></span></div></div></div></section>
    <footer className="footer container" id="about" data-testid="site-footer"><a href="#top" className="brand" data-testid="footer-brand-link"><span className="brand-mark"><Zap size={17} fill="currentColor" /></span><span>IT TOOL <b>LAND</b></span></a><span>Tools for the people behind the systems.</span><span>© 2025 IT Tool Land</span></footer>
    <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
  </main>;
};

function App() {
  return <Home />;
}

export default App;
