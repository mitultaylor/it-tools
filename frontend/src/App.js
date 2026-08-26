import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, BarChart3, Briefcase, ClipboardCheck, Gauge, ShieldCheck } from "lucide-react";

const tools = [
  { id: "change-readiness", number: "01", name: "Change Readiness Checker", description: "Pressure-test a release before it becomes tomorrow's incident report.", icon: ShieldCheck, url: "https://meetulista.gumroad.com/l/it-change-readiness-checker" },
  { id: "salary-benchmarker", number: "02", name: "IT Leadership Salary Benchmarker", description: "See the market clearly before the next offer, review, or board conversation.", icon: BarChart3, url: "https://meetulista.gumroad.com/l/it-leadership-salary-benchmarker" },
  { id: "incident-priority", number: "03", name: "IT Incident Priority Calculator", description: "Turn noisy incident signals into a confident severity call in seconds.", icon: Gauge, url: "https://meetulista.gumroad.com/l/it-incident-priority-calculator" },
  { id: "job-tracker", number: "04", name: "IT Leadership Job Search Tracker", description: "Track every Director and VP IT application across the US, India, and Dubai.", icon: Briefcase, url: "https://meetulista.gumroad.com/l/it-leadership-job-tracker" },
  { id: "servicenow-health", number: "05", name: "ServiceNow Health Tool", description: "Score how your ServiceNow instance is actually running — maturity, governance, performance.", icon: Activity, url: "https://meetulista.gumroad.com/l/servicenow-itsm-health" },
  { id: "cmdb-audit", number: "06", name: "CMDB Health Audit Tool", description: "Score your CMDB across completeness, correctness, and compliance before the next audit lands.", icon: ClipboardCheck, url: "https://meetulista.gumroad.com/l/cmdb-audit-tool" },
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
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return (
    <main className="site" data-testid="it-tool-landing-page">
      <div className="grain" aria-hidden="true" />
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />

      <nav className="nav" data-testid="site-navigation">
        <a href="#top" className="brand" data-testid="brand-link">IT TOOL <span>LAND</span></a>
        <a href="#tools" className="nav-btn" data-testid="nav-view-toolkit">View Toolkit <ArrowUpRight size={14} /></a>
      </nav>

      <section className="hero container" id="top" data-testid="hero-section">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <div className="overline" data-testid="hero-overline">Six browser tools · One calm workflow</div>
          <h1 className="hero-title" data-testid="hero-heading">
            Decide faster.<br />
            <span className="cyan-line">Ship safer.</span>
          </h1>
          <p className="hero-lede" data-testid="hero-description">
            Precision instruments for IT leaders — audit your CMDB, score your ServiceNow instance,
            price your next role, and call every incident with confidence.
          </p>
          <div className="hero-trust" data-testid="hero-trust">
            <span>Built on 12 years of IT operations</span>
            <span>No login</span>
            <span>Instant delivery</span>
          </div>
        </motion.div>
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="card-head">
                  <div className="card-icon"><Icon size={18} /></div>
                  <span className="card-price" data-testid={`price-${tool.id}`}>$29<em>one-time</em></span>
                </div>
                <div className="card-body">
                  <span className="card-num">{tool.number}</span>
                  <h3 className="card-title">{tool.name}</h3>
                  <p className="card-desc">{tool.description}</p>
                </div>
                <a
                  className="card-buy"
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Buy ${tool.name} on Gumroad`}
                  data-testid={`buy-${tool.id}`}
                >
                  Get tool <ArrowUpRight size={14} />
                </a>
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
