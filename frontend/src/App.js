import { useEffect, useRef } from "react";
import "@/App.css";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowUpRight, BarChart3, Briefcase, ClipboardCheck, Gauge, ShieldCheck } from "lucide-react";

const tools = [
  { id: "change-readiness", number: "01", name: "Change Readiness Checker", description: "Pressure-test a release before it becomes tomorrow's incident report.", icon: ShieldCheck, url: "https://meetulista.gumroad.com/l/it-change-readiness-checker" },
  { id: "salary-benchmarker", number: "02", name: "IT Leadership Salary Benchmarker", description: "See the market clearly before the next offer, review, or board conversation.", icon: BarChart3, url: "https://meetulista.gumroad.com/l/it-leadership-salary-benchmarker" },
  { id: "incident-priority", number: "03", name: "IT Incident Priority Calculator", description: "Turn noisy incident signals into a confident severity call in seconds.", icon: Gauge, url: "https://meetulista.gumroad.com/l/it-incident-priority-calculator" },
  { id: "job-tracker", number: "04", name: "IT Leadership Job Search Tracker", description: "Track every Director and VP IT application across the US, India, and Dubai.", icon: Briefcase, url: "https://meetulista.gumroad.com/l/it-leadership-job-tracker" },
  { id: "servicenow-health", number: "05", name: "ServiceNow Health Tool", description: "Score how your ServiceNow instance is actually running — maturity, governance, performance.", icon: Activity, url: "https://meetulista.gumroad.com/l/servicenow-itsm-health" },
  { id: "cmdb-audit", number: "06", name: "CMDB Health Audit Tool", description: "Score your CMDB across completeness, correctness, and compliance before the next audit lands.", icon: ClipboardCheck, url: "https://meetulista.gumroad.com/l/cmdb-audit-tool" },
];

const ParticleField = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf;
    let pts = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w; canvas.height = h;
      const n = Math.min(90, Math.floor((w * h) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 130 && d > 0.01) { p.x += (dx / d) * 0.9; p.y += (dy / d) * 0.9; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 245, 255, 0.5)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.14 * (1 - d / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize(); tick();
    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", onMove);
    canvas.parentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="particles" aria-hidden="true" />;
};

const TiltCard = ({ tool, index }) => {
  const ref = useRef(null);
  const Icon = tool.icon;
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${(-py * 9).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(px * 11).toFixed(2)}deg`);
    ref.current.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    ref.current.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };
  return (
    <motion.div
      className="card-shell"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <article
        ref={ref}
        className="card"
        data-testid={`tool-card-${tool.id}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="card-shine" aria-hidden="true" />
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
      </article>
    </motion.div>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 550], [1, 0]);
  const headY = useTransform(scrollY, [300, 1100], [60, -30]);

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

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <main className="site" data-testid="it-tool-landing-page">
      <nav className="nav" data-testid="site-navigation">
        <a href="#top" className="brand" data-testid="brand-link">IT TOOL <span>LAND</span></a>
        <a href="#tools" className="nav-btn" data-testid="nav-view-toolkit">View Toolkit <ArrowUpRight size={14} /></a>
      </nav>

      <section className="hero container" id="top" data-testid="hero-section">
        <ParticleField />
        <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="overline float-a" data-testid="hero-overline" {...fadeUp(0)}>
            Six browser tools · One calm workflow
          </motion.div>
          <motion.h1 className="hero-title" data-testid="hero-heading" {...fadeUp(0.12)}>
            Decide faster.<br />
            <span className="cyan-line">Ship safer.</span>
          </motion.h1>
          <motion.p className="hero-lede" data-testid="hero-description" {...fadeUp(0.24)}>
            Precision instruments for IT leaders — audit your CMDB, score your ServiceNow instance,
            price your next role, and call every incident with confidence.
          </motion.p>
          <motion.div className="hero-trust" data-testid="hero-trust" {...fadeUp(0.36)}>
            <span className="float-b">Built on 12 years of IT operations</span>
            <span className="float-c">No login</span>
            <span className="float-a">Instant delivery</span>
          </motion.div>
        </motion.div>
        <div className="orb orb-a float-b" aria-hidden="true" />
        <div className="orb orb-b float-c" aria-hidden="true" />
      </section>

      <section className="toolkit container" id="tools" data-testid="toolkit-section">
        <motion.div className="toolkit-head" style={{ y: headY }}>
          <div className="overline">The toolkit / 01—06</div>
          <h2 data-testid="toolkit-heading">Every tool earns its place.</h2>
        </motion.div>
        <div className="grid">
          {tools.map((tool, i) => <TiltCard tool={tool} index={i} key={tool.id} />)}
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
