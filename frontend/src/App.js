import { useEffect, useRef } from "react";
import "@/App.css";
import { Activity, ArrowUpRight, BarChart3, Briefcase, ClipboardCheck, Gauge, ShieldCheck } from "lucide-react";

const tools = [
  { id: "change-readiness", name: "Change Readiness Checker", icon: ShieldCheck, url: "https://meetulista.gumroad.com/l/it-change-readiness-checker" },
  { id: "salary-benchmarker", name: "Salary Benchmarker", icon: BarChart3, url: "https://meetulista.gumroad.com/l/it-leadership-salary-benchmarker" },
  { id: "incident-priority", name: "Incident Priority Calculator", icon: Gauge, url: "https://meetulista.gumroad.com/l/it-incident-priority-calculator" },
  { id: "job-tracker", name: "Job Search Tracker", icon: Briefcase, url: "https://meetulista.gumroad.com/l/it-leadership-job-tracker" },
  { id: "servicenow-health", name: "ServiceNow Health", icon: Activity, url: "https://meetulista.gumroad.com/l/servicenow-itsm-health" },
  { id: "cmdb-audit", name: "CMDB Health Audit", icon: ClipboardCheck, url: "https://meetulista.gumroad.com/l/cmdb-audit-tool" },
];

const RippleCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const SCALE = 3;
    let W = 0, H = 0, buf1, buf2, img, raf, rowTop, rowBot;
    const TOP = [206, 227, 241];
    const BOT = [166, 197, 222];

    const resize = () => {
      W = Math.ceil(window.innerWidth / SCALE);
      H = Math.ceil(window.innerHeight / SCALE);
      canvas.width = W; canvas.height = H;
      buf1 = new Float32Array(W * H);
      buf2 = new Float32Array(W * H);
      img = ctx.createImageData(W, H);
      rowTop = new Float32Array(H * 3);
      rowBot = new Float32Array(H * 3);
      for (let y = 0; y < H; y++) {
        const t = y / H;
        for (let c = 0; c < 3; c++) rowTop[y * 3 + c] = TOP[c] + (BOT[c] - TOP[c]) * t;
      }
    };

    const drop = (x, y, s) => {
      const bx = Math.floor(x / SCALE), by = Math.floor(y / SCALE);
      for (let j = -2; j <= 2; j++) {
        for (let i = -2; i <= 2; i++) {
          const xi = bx + i, yj = by + j;
          if (xi > 0 && xi < W - 1 && yj > 0 && yj < H - 1) buf1[yj * W + xi] += s;
        }
      }
    };

    const step = () => {
      for (let y = 1; y < H - 1; y++) {
        const row = y * W;
        for (let x = 1; x < W - 1; x++) {
          const i = row + x;
          buf2[i] = ((buf1[i - 1] + buf1[i + 1] + buf1[i - W] + buf1[i + W]) * 0.5 - buf2[i]) * 0.982;
        }
      }
      const t = buf1; buf1 = buf2; buf2 = t;
      const d = img.data;
      for (let y = 0; y < H; y++) {
        const row = y * W, rb = y * 3;
        for (let x = 0; x < W; x++) {
          const i = row + x, p = i * 4;
          const sh = buf1[i] * 0.9;
          d[p] = Math.max(0, Math.min(255, rowTop[rb] + sh));
          d[p + 1] = Math.max(0, Math.min(255, rowTop[rb + 1] + sh));
          d[p + 2] = Math.max(0, Math.min(255, rowTop[rb + 2] + sh * 0.6));
          d[p + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(step);
    };

    let last = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last > 28) { drop(e.clientX, e.clientY, 240); last = now; }
    };
    const ambient = setInterval(() => {
      drop(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 150);
    }, 1500);

    resize(); step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(ambient);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="ripple" aria-hidden="true" />;
};

const Home = () => {
  useEffect(() => {
    const root = document.documentElement;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      root.style.setProperty("--px", cx.toFixed(4));
      root.style.setProperty("--py", cy.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <main className="stage" data-testid="it-tool-landing-page">
      <RippleCanvas />

      <header className="topbar" data-testid="site-navigation">
        <span className="brand" data-testid="brand-link">IT TOOL LAND</span>
        <span className="topbar-meta">$29 each · Instant delivery</span>
      </header>

      <div className="headline" data-testid="hero-section">
        <div className="overline" data-testid="hero-overline">Built on 12 years of IT operations</div>
        <h1 className="hero-title" data-testid="hero-heading">
          <span className="accent">Six</span> tools.<br />Zero noise.
        </h1>
      </div>

      <div className="cards" data-testid="toolkit-section">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div className={`par par-${i + 1}`} style={{ "--d": `${16 + (i % 3) * 9}px` }} key={tool.id}>
              <div className={`float f-${(i % 3) + 1}`}>
                <div className="pcard" data-testid={`tool-card-${tool.id}`}>
                  <div className="pcard-icon"><Icon size={17} strokeWidth={2.2} /></div>
                  <span className="pcard-name">{tool.name}</span>
                  <a
                    className="pcard-buy"
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Buy ${tool.name} on Gumroad`}
                    data-testid={`buy-${tool.id}`}
                  >
                    $29 <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="foot" data-testid="site-footer">
        <span>© 2026 Meet Ulista</span>
        <span>No login · Nothing stored</span>
      </footer>
    </main>
  );
};

export default function App() {
  return <Home />;
}
