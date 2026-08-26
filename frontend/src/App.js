import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, BarChart3, Briefcase, Check, ClipboardCheck, Gauge, ShieldCheck, Terminal } from "lucide-react";

const tools = [
  { number: "01", name: "CMDB Health Audit", kicker: "AUDIT / CMDB", description: "Score your CMDB across completeness, correctness, and compliance before the next audit lands.", icon: ClipboardCheck, url: "https://meetulista.gumroad.com/l/cmdb-audit-tool" },
  { number: "02", name: "ServiceNow ITSM Health", kicker: "HEALTH SCORE / ITSM", description: "Score how your ServiceNow instance is actually running — process maturity, governance, performance.", icon: Activity, url: "https://meetulista.gumroad.com/l/servicenow-itsm-health" },
  { number: "03", name: "IT Leadership Tracker", kicker: "JOB SEARCH / TRACKING", description: "Track every Director and VP IT application across the US, India, and Dubai in one purpose-built tool.", icon: Briefcase, url: "https://meetulista.gumroad.com/l/it-leadership-job-tracker" },
  { number: "04", name: "Incident Priority Calculator", kicker: "ITSM / OPERATIONS", description: "Turn noisy incident signals into a confident severity call in seconds.", icon: Gauge, url: "https://meetulista.gumroad.com/l/it-incident-priority-calculator" },
  { number: "05", name: "Salary Benchmarker", kicker: "COMPENSATION / STRATEGY", description: "See the market clearly before the next offer, review, or board conversation.", icon: BarChart3, url: "https://meetulista.gumroad.com/l/it-leadership-salary-benchmarker" },
  { number: "06", name: "Change Readiness Checker", kicker: "RISK / GOVERNANCE", description: "Pressure-test a release before it becomes tomorrow's incident report.", icon: ShieldCheck, url: "https://meetulista.gumroad.com/l/it-change-readiness-checker" },
];

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -80 }); }
      });
    });
    window.Gumroad?.init?.();
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return (
    <main className="site" data-testid="it-tool-landing-page">
      <nav className="nav" data-testid="site-navigation">
        <a href="#top" className="brand" data-testid="brand-link">
          <span className="brand-mark"><Terminal size={15} /></span>
          <span>IT TOOL LAND</span>
        </a>
        <div className="nav-right">
          <a href="#toolkit" className="nav-link" data-testid="nav-toolkit-link">Toolkit</a>
          <a href="#toolkit" className="nav-cta" data-testid="nav-explore-button">Explore tools <ArrowUpRight size={14} /></a>
        </div>
      </nav>

      <section className="hero container" id="top" data-testid="hero-section">
        <div className="hero-glow" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="eyebrow" data-testid="hero-eyebrow"><span className="pulse-dot" /> SIX BROWSER TOOLS · BUILT ON 12 YEARS OF IT OPERATIONS</div>
          <h1 className="hero-title" data-testid="hero-heading">Score. Fix. <span className="dim">Track.</span></h1>
          <p className="hero-lede" data-testid="hero-description">A precision toolkit for IT leaders and operators. No login. Nothing stored. Pay once, use forever.</p>
          <div className="hero-actions">
            <a href="#toolkit" className="btn-primary" data-testid="hero-explore-button">Explore the toolkit <ArrowUpRight size={16} /></a>
            <div className="hero-proof" data-testid="hero-proof">
              <span><Check size={13} /> Instant delivery</span>
              <span><Check size={13} /> One-time purchase</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="toolkit container" id="toolkit" data-testid="toolkit-section">
        <div className="toolkit-head">
          <div className="eyebrow">THE TOOLKIT / 01—06</div>
          <h2 data-testid="toolkit-heading">Every tool earns its place.</h2>
        </div>
        <div className="bento">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.article
                className="card"
                key={tool.number}
                data-testid={`tool-card-${tool.number}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="card-top">
                  <div className="card-icon"><Icon size={18} /></div>
                  <span className="card-num">{tool.number}</span>
                </div>
                <div className="card-kicker">{tool.kicker}</div>
                <h3 className="card-title">{tool.name}</h3>
                <p className="card-desc">{tool.description}</p>
                <div className="card-foot">
                  <a className="card-buy" href={tool.url} data-testid={`buy-tool-${tool.number}`}>
                    Get it <ArrowUpRight size={15} />
                  </a>
                  <span className="card-note">One-time</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <footer className="footer container" data-testid="site-footer">
        <span className="footer-brand"><Terminal size={13} /> IT TOOL LAND</span>
        <span>Tools for the people behind the systems.</span>
        <span>© 2026 Meet Ulista</span>
      </footer>
    </main>
  );
};

export default function App() {
  return <Home />;
}
