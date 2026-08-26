import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, BarChart3, Briefcase, ChevronDown, ClipboardCheck, Gauge, ShieldCheck } from "lucide-react";

const tools = [
  { id: "change-readiness", number: "01", name: "Change Readiness Checker", kicker: "Risk / Governance", description: "Pressure-test a release before it becomes tomorrow's incident report.", icon: ShieldCheck, accent: "#F59E0B", darkText: true, url: "https://meetulista.gumroad.com/l/it-change-readiness-checker" },
  { id: "salary-benchmarker", number: "02", name: "IT Leadership Salary Benchmarker", kicker: "Compensation / Strategy", description: "See the market clearly before the next offer, review, or board conversation.", icon: BarChart3, accent: "#10B981", darkText: true, url: "https://meetulista.gumroad.com/l/it-leadership-salary-benchmarker" },
  { id: "incident-priority", number: "03", name: "IT Incident Priority Calculator", kicker: "ITSM / Operations", description: "Turn noisy incident signals into a confident severity call in seconds.", icon: Gauge, accent: "#F43F5E", darkText: false, url: "https://meetulista.gumroad.com/l/it-incident-priority-calculator" },
  { id: "job-tracker", number: "04", name: "IT Leadership Job Search Tracker", kicker: "Career / Tracking", description: "Track every Director and VP IT application across the US, India, and Dubai.", icon: Briefcase, accent: "#8B5CF6", darkText: false, url: "https://meetulista.gumroad.com/l/it-leadership-job-tracker" },
  { id: "servicenow-health", number: "05", name: "ServiceNow Health Tool", kicker: "Health Score / ITSM", description: "Score how your ServiceNow instance is actually running — maturity, governance, performance.", icon: Activity, accent: "#06B6D4", darkText: true, url: "https://meetulista.gumroad.com/l/servicenow-itsm-health" },
  { id: "cmdb-audit", number: "06", name: "CMDB Health Audit Tool", kicker: "Audit / CMDB", description: "Score your CMDB across completeness, correctness, and compliance before the next audit lands.", icon: ClipboardCheck, accent: "#84CC16", darkText: true, url: "https://meetulista.gumroad.com/l/cmdb-audit-tool" },
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
        if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -72 }); }
      });
    });
    window.Gumroad?.init?.();
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return (
    <main className="site" data-testid="it-tool-landing-page">
      <div className="grain" aria-hidden="true" />
      <div className="spotlight spotlight-a" aria-hidden="true" />
      <div className="spotlight spotlight-b" aria-hidden="true" />

      <nav className="nav" data-testid="site-navigation">
        <a href="#top" className="brand" data-testid="brand-link">IT TOOL <span>LAND</span></a>
        <a href="#tools" className="nav-link" data-testid="nav-tools-link">View tools <ArrowUpRight size={14} /></a>
      </nav>

      <section className="hero container" id="top" data-testid="hero-section">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <div className="overline" data-testid="hero-overline">Built on 12 years of IT operations</div>
          <h1 className="hero-title" data-testid="hero-heading">
            Six instruments.<br />
            <span className="muted-line">Zero noise.</span>
          </h1>
          <p className="hero-lede" data-testid="hero-description">
            Precision browser tools for IT leaders — audit your CMDB, score your ServiceNow instance,
            price your next role, and call every incident with confidence. No login. Nothing stored. Pay once.
          </p>
          <a href="#tools" className="hero-cta" data-testid="hero-explore-button">
            Browse the toolkit <ArrowUpRight size={16} />
          </a>
        </motion.div>
        <a href="#tools" className="scroll-hint" data-testid="scroll-hint" aria-label="Scroll to tools">
          <span>Scroll</span>
          <ChevronDown size={15} className="scroll-hint-icon" />
        </a>
      </section>

      <section className="toolkit container" id="tools" data-testid="toolkit-section">
        <div className="toolkit-head">
          <div className="overline">The toolkit / 01—06</div>
          <h2 data-testid="toolkit-heading">Every tool earns its place.</h2>
        </div>
        <div className="grid">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.article
                className="card"
                key={tool.id}
                data-testid={`tool-card-${tool.id}`}
                style={{ "--accent": tool.accent }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="card-glow" aria-hidden="true" />
                <div className="card-top">
                  <div className="card-icon"><Icon size={18} /></div>
                  <span className="card-num">{tool.number}</span>
                </div>
                <div className="card-kicker">{tool.kicker}</div>
                <h3 className="card-title">{tool.name}</h3>
                <p className="card-desc">{tool.description}</p>
                <div className="card-foot">
                  <span className="card-price" data-testid={`price-${tool.id}`}>$29 <em>one-time</em></span>
                  <a
                    className={`card-buy ${tool.darkText ? "dark-text" : ""}`}
                    href={tool.url}
                    data-testid={`buy-${tool.id}`}
                  >
                    Get tool <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <footer className="footer container" data-testid="site-footer">
        <span className="footer-brand">IT TOOL LAND</span>
        <span>Tools for the people behind the systems.</span>
        <span>© 2026 Meet Ulista</span>
      </footer>
    </main>
  );
};

export default function App() {
  return <Home />;
}
