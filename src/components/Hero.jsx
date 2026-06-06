import { useState, useEffect, useRef } from 'react';
import {
  FiGithub, FiLinkedin, FiMail, FiTerminal, FiInstagram,
  FiArrowUpRight, FiCode, FiX, FiMinus, FiMaximize2,
} from 'react-icons/fi';

const MONO = "'SF Mono','Fira Code','Cascadia Code','Consolas',monospace";
const ROLES = ['Full Stack Developer', 'MERN Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];

const BOOT = [
  { type: 'dim',    text: '# Portfolio Terminal v2.0  —  type help' },
  { type: 'blank' },
  { type: 'cmd',    text: 'whoami' },
  { type: 'green',  text: 'santosh-seelaboina' },
  { type: 'blank' },
  { type: 'cmd',    text: 'cat about.json' },
  { type: 'brace',  text: '{' },
  { type: 'kv',     k: '"name"',     v: '"Santosh Seelaboina"',           comma: true },
  { type: 'kv',     k: '"role"',     v: '"Full Stack Developer"',         comma: true },
  { type: 'kv',     k: '"stack"',    v: '["React","Node.js","MongoDB"]',  comma: false },
  { type: 'brace',  text: '}' },
  { type: 'blank' },
  { type: 'cmd',    text: 'git log --oneline -3' },
  { type: 'commit', hash: 'a3f9c12', msg: 'feat: JAITRA 2026 sports platform' },
  { type: 'commit', hash: '7e2b841', msg: 'feat: Task AI — RAG productivity app' },
  { type: 'commit', hash: '1d4a530', msg: 'feat: CSD & CSIT department website' },
  { type: 'blank' },
  { type: 'cmd',    text: "echo \"Let's build something great.\"" },
  { type: 'green',  text: "Let's build something great." },
];

const CMDS = {
  help: [
    { type: 'head', text: 'Available commands' },
    { type: 'row',  k: 'about',    v: 'Who is Santosh?' },
    { type: 'row',  k: 'skills',   v: 'Full tech stack' },
    { type: 'row',  k: 'projects', v: 'Go to projects section' },
    { type: 'row',  k: 'contact',  v: 'Contact details' },
    { type: 'row',  k: 'resume',   v: 'Open resume PDF' },
    { type: 'row',  k: 'clear',    v: 'Clear terminal' },
  ],
  about: [
    { type: 'head',  text: 'About' },
    { type: 'row',   k: 'Name',     v: 'Santosh Seelaboina' },
    { type: 'row',   k: 'Role',     v: 'Full Stack Developer | MERN Stack' },
    { type: 'row',   k: 'College',  v: 'SRKR Engineering College, Bhimavaram' },
    { type: 'row',   k: 'Location', v: 'Andhra Pradesh, India' },
    { type: 'row',   k: 'Email',    v: 'santoshkumar90101s@gmail.com' },
    { type: 'row',   k: 'Phone',    v: '+91 8639081207' },
    { type: 'green', text: 'Passionate about building scalable, user-centric applications.' },
  ],
  skills: [
    { type: 'head',  text: 'Tech Stack' },
    { type: 'row',   k: 'Frontend',  v: 'React · Next.js · Tailwind · JavaScript · HTML' },
    { type: 'row',   k: 'Backend',   v: 'Node.js · Express · Nest.js · REST API · PHP' },
    { type: 'row',   k: 'Database',  v: 'MongoDB · MySQL · Prisma' },
    { type: 'row',   k: 'Languages', v: 'C · Java · Python · JavaScript' },
    { type: 'row',   k: 'Tools',     v: 'Git · Docker · Postman · n8n · RAG · Pinecone' },
    { type: 'row',   k: 'Deploy',    v: 'Vercel · Netlify · Render · GitHub Pages' },
  ],
  projects: [
    { type: 'green', text: '→ Navigating to projects...' },
    { type: '__nav', id: 'projects' },
  ],
  contact: [
    { type: 'head',  text: 'Contact' },
    { type: 'row',   k: 'Email',   v: 'santoshkumar90101s@gmail.com' },
    { type: 'row',   k: 'Phone',   v: '+91 8639081207' },
    { type: 'row',   k: 'GitHub',  v: 'github.com/ssantoshhhhh' },
    { type: 'row',   k: 'LinkedIn',v: 'linkedin.com/in/santosh-seelaboina-56b5492b8' },
    { type: 'green', text: '→ Navigating to contact section...' },
    { type: '__nav', id: 'contact' },
  ],
  resume: [
    { type: 'green', text: '→ Opening resume...' },
    { type: '__open', url: '/resume.pdf' },
  ],
  clear: [{ type: '__clear' }],
};

const BOOT_DELAY = { cmd: 260, green: 80, dim: 50, blank: 45, brace: 50, kv: 65, commit: 70 };

function Line({ line }) {
  if (line.type === 'blank')  return <div style={{ height: 8 }} />;
  if (line.type === 'brace')  return <div style={{ fontFamily: MONO, fontSize: 14, color: '#6b7280' }}>{line.text}</div>;
  if (line.type === 'dim')    return <div style={{ fontFamily: MONO, fontSize: 13, color: '#374151', fontStyle: 'italic' }}>{line.text}</div>;
  if (line.type === 'head')   return (
    <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: '#e2e8f0', margin: '4px 0 6px', borderBottom: '1px solid #1f2937', paddingBottom: 4 }}>
      // {line.text}
    </div>
  );
  if (line.type === 'green') return <div style={{ fontFamily: MONO, fontSize: 14, color: '#4ade80', paddingLeft: 2 }}>{line.text}</div>;
  if (line.type === 'error') return (
    <div style={{ fontFamily: MONO, fontSize: 14, color: '#f87171' }}>
      zsh: command not found: <strong>{line.cmd}</strong>{'  '}→ type <span style={{ color: '#4ade80' }}>help</span>
    </div>
  );
  if (line.type === 'kv') return (
    <div style={{ fontFamily: MONO, fontSize: 14, paddingLeft: 16, marginBottom: 2, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      <span style={{ color: '#7dd3fc' }}>{line.k}</span>
      <span style={{ color: '#4b5563' }}>:</span>
      <span style={{ color: line.highlight ? '#4ade80' : '#fca5a5' }}>{line.v}{line.comma ? ',' : ''}</span>
    </div>
  );
  if (line.type === 'commit') return (
    <div style={{ fontFamily: MONO, fontSize: 14, display: 'flex', gap: 12, paddingLeft: 2 }}>
      <span style={{ color: '#fbbf24', fontWeight: 700, flexShrink: 0 }}>{line.hash}</span>
      <span style={{ color: '#94a3b8' }}>{line.msg}</span>
    </div>
  );
  if (line.type === 'row') return (
    <div style={{ fontFamily: MONO, fontSize: 14, display: 'flex', paddingLeft: 2, marginBottom: 3 }}>
      <span style={{ color: '#60a5fa', minWidth: 96, flexShrink: 0 }}>{line.k}</span>
      <span style={{ color: '#4b5563', marginRight: 6 }}>:</span>
      <span style={{ color: '#e2e8f0' }}>{line.v}</span>
    </div>
  );
  return null;
}

function Prompt() {
  return (
    <span style={{ fontFamily: MONO, fontSize: 14, flexShrink: 0, userSelect: 'none', whiteSpace: 'nowrap' }}>
      <span style={{ color: '#60a5fa', fontWeight: 700 }}>santosh</span>
      <span style={{ color: '#374151' }}>@</span>
      <span style={{ color: '#c084fc', fontWeight: 700 }}>portfolio</span>
      <span style={{ color: '#374151' }}>:</span>
      <span style={{ color: '#fbbf24' }}>~</span>
      <span style={{ color: '#6b7280' }}> % </span>
    </span>
  );
}

function TL({ bg, bgH, Icon }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 13, height: 13, borderRadius: '50%',
        background: h ? bgH : bg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: '0.5px solid rgba(0,0,0,0.25)',
        cursor: 'default',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      {h && <Icon size={7} color="rgba(0,0,0,0.5)" strokeWidth={3} />}
    </span>
  );
}

export default function Hero() {
  /* typewriter */
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);
  const [charIdx,   setCharIdx]   = useState(0);

  useEffect(() => {
    const cur = ROLES[roleIdx];
    let t;
    if (!deleting && charIdx <= cur.length) {
      t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx)); setCharIdx(c => c + 1); }, 72);
    } else if (!deleting) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx >= 0) {
      t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx)); setCharIdx(c => c - 1); }, 36);
    } else {
      setDeleting(false); setCharIdx(0); setRoleIdx(r => (r + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  /* terminal boot */
  const [bootIdx,  setBootIdx]  = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [history,  setHistory]  = useState([]);
  const [input,    setInput]    = useState('');
  const [iHist,    setIHist]    = useState([]);
  const [iPtr,     setIPtr]     = useState(-1);
  const bodyRef  = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [bootIdx, history]);

  useEffect(() => {
    if (bootDone) return;
    if (bootIdx >= BOOT.length) { setBootDone(true); return; }
    const t = setTimeout(() => setBootIdx(i => i + 1), BOOT_DELAY[BOOT[bootIdx].type] ?? 70);
    return () => clearTimeout(t);
  }, [bootIdx, bootDone]);

  const focusInput = () => inputRef.current?.focus();

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    setIHist(h => [raw, ...h]);
    setIPtr(-1);
    const echo = { type: '__echo', text: raw };
    if (!cmd) { setHistory(h => [...h, echo, { type: 'blank' }]); return; }
    if (cmd === 'clear') { setHistory([]); return; }
    const result = CMDS[cmd];
    if (!result) { setHistory(h => [...h, echo, { type: 'error', cmd: raw }, { type: 'blank' }]); return; }
    const lines = result.filter(l => !l.type.startsWith('__'));
    setHistory(h => [...h, echo, ...lines, { type: 'blank' }]);
    result.forEach(l => {
      if (l.type === '__nav')  setTimeout(() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }), 300);
      if (l.type === '__open') setTimeout(() => window.open(l.url, '_blank'), 300);
    });
  };

  const onKey = (e) => {
    if (e.key === 'Enter') { run(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(iPtr + 1, iHist.length - 1);
      setIPtr(n); setInput(iHist[n] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = Math.max(iPtr - 1, -1);
      setIPtr(n); setInput(n === -1 ? '' : iHist[n]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = Object.keys(CMDS).find(k => k.startsWith(input.toLowerCase()));
      if (m) setInput(m);
    }
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)',
        backgroundSize: '26px 26px',
      }} />
      {/* Green glow */}
      <div style={{
        position: 'absolute', right: -120, top: '10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="rsp-hero-inner" style={{
        maxWidth: 1240, margin: '0 auto', padding: '88px 28px 48px',
        width: '100%', position: 'relative', zIndex: 1,
      }}>
        <div className="rsp-hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 56, alignItems: 'center',
        }}>

        {/* ══ LEFT — intro with page-load stagger animations ══ */}
        <div>
          {/* Comment */}
          <p className="hero-in hero-in-2" style={{ fontFamily: MONO, fontSize: 13, color: '#9ca3af', marginBottom: 10, letterSpacing: 1 }}>
            // Hello World, I'm
          </p>

          {/* Name */}
          <h1 className="hero-in hero-in-3" style={{
            fontFamily: MONO, fontSize: 'clamp(36px,4.5vw,58px)',
            fontWeight: 700, color: '#000', lineHeight: 1.08, marginBottom: 6, letterSpacing: '-1px',
          }}>
            Santosh
          </h1>
          <h1 className="hero-in hero-in-3" style={{
            fontFamily: MONO, fontSize: 'clamp(36px,4.5vw,58px)',
            fontWeight: 700, color: '#16a34a', lineHeight: 1.08, marginBottom: 20, letterSpacing: '-1px',
          }}>
            Seelaboina
          </h1>

          {/* Typewriter */}
          <div className="hero-in hero-in-4" style={{ display: 'flex', alignItems: 'center', marginBottom: 24, minHeight: 32 }}>
            <span style={{ fontFamily: MONO, fontSize: 16, color: '#6b7280' }}>$ role=&quot;</span>
            <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: '#16a34a' }}>{displayed}</span>
            <span className="cursor-blink" style={{ fontFamily: MONO, color: '#16a34a', fontSize: 18, fontWeight: 700 }}>|</span>
            <span style={{ fontFamily: MONO, fontSize: 16, color: '#6b7280' }}>&quot;</span>
          </div>

          {/* Bio */}
          <p className="hero-in hero-in-4" style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#4b5563',
            lineHeight: 1.85, maxWidth: 440, marginBottom: 32,
          }}>
            Passionate developer building beautiful, scalable, user-centric experiences with the{' '}
            <span style={{ color: '#16a34a', fontWeight: 600, fontFamily: MONO }}>MERN stack</span>,
            UI/UX design, and system architecture.
          </p>

          {/* CTAs */}
          <div className="hero-in hero-in-5" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 24px', background: '#16a34a', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                borderRadius: 3, textDecoration: 'none', border: '1.5px solid #16a34a',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.borderColor = '#15803d'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.borderColor = '#16a34a'; }}
            >
              Check Resume <FiArrowUpRight size={14} />
            </a>
            <button
              className="btn-press"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 24px', background: 'transparent', color: '#000',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                borderRadius: 3, border: '1.5px solid #000', cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; }}
            >
              <FiCode size={14} /> View Projects
            </button>
          </div>

          {/* Social */}
          <div className="hero-in hero-in-5" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: MONO, fontSize: 10, color: '#9ca3af', letterSpacing: 1.5, textTransform: 'uppercase' }}>connect</span>
            {[
              { Icon: FiGithub,    href: 'https://github.com/ssantoshhhhh',                             label: 'GitHub' },
              { Icon: FiLinkedin,  href: 'https://www.linkedin.com/in/santosh-seelaboina-56b5492b8/',   label: 'LinkedIn' },
              { Icon: FiInstagram, href: 'https://instagram.com/ssantoshhhhh',                          label: 'Instagram' },
              { Icon: FiMail,      href: 'mailto:santoshkumar90101s@gmail.com',                         label: 'Email' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="btn-press"
                style={{
                  width: 36, height: 36, borderRadius: 3,
                  border: '1.5px solid #e5e7eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#374151', textDecoration: 'none',
                  transition: 'border-color 0.22s, color 0.22s, background 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; e.currentTarget.style.background = '#f0fdf4'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent'; }}
              >
                <s.Icon size={16} />
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="hero-in hero-in-6" style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            {[{ val: '10+', label: 'Projects' }, { val: '2+', label: 'Yrs Exp.' }, { val: '15+', label: 'Technologies' }].map(s => (
              <div
                key={s.label}
                className="card-lift"
                style={{
                  border: '1.5px solid #e5e7eb', borderRadius: 4,
                  padding: '10px 18px', textAlign: 'center', background: '#fff',
                }}
              >
                <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 700, color: '#16a34a', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: '#6b7280', marginTop: 4, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT — terminal with entrance animation ══ */}
        <div className="terminal-in" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            onClick={focusInput}
            style={{
              borderRadius: 10, overflow: 'hidden', cursor: 'text',
              boxShadow: '0 24px 64px rgba(0,0,0,0.16), 0 4px 20px rgba(0,0,0,0.10)',
              border: '1px solid #1a1a1a',
            }}
          >
            {/* Title bar */}
            <div style={{
              background: 'linear-gradient(180deg, #2d2d2d 0%, #242424 100%)',
              padding: '10px 16px', display: 'flex', alignItems: 'center',
              borderBottom: '1px solid #111', position: 'relative', userSelect: 'none',
            }}>
              <div style={{ display: 'flex', gap: 8, zIndex: 1 }}>
                <TL bg="#ff5f57" bgH="#ff3b30" Icon={FiX} />
                <TL bg="#febc2e" bgH="#e6a800" Icon={FiMinus} />
                <TL bg="#28c840" bgH="#25b038" Icon={FiMaximize2} />
              </div>
              <div style={{
                position: 'absolute', left: 0, right: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 7, pointerEvents: 'none',
              }}>
                <FiTerminal size={12} color="#6b7280" />
                <span style={{ fontFamily: MONO, fontSize: 12, color: '#9ca3af', letterSpacing: 0.3 }}>
                  santosh — zsh — portfolio
                </span>
              </div>
            </div>

            {/* Tab bar */}
            <div style={{
              background: '#1e1e1e', borderBottom: '1px solid #111',
              padding: '0 14px', display: 'flex', alignItems: 'flex-end', gap: 2,
            }}>
              <div style={{
                background: '#141414', padding: '5px 18px',
                borderRadius: '4px 4px 0 0', borderTop: '2px solid #16a34a',
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: MONO, fontSize: 11, color: '#d4d4d4',
              }}>
                <FiTerminal size={10} color="#16a34a" />
                portfolio.sh
              </div>
              <div style={{ padding: '5px 14px', borderRadius: '4px 4px 0 0', fontFamily: MONO, fontSize: 11, color: '#333', cursor: 'default' }}>
                + new
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5, paddingRight: 4 }}>
              </div>
            </div>

            {/* Body — solid dark background, terminal untouched */}
            <div
              ref={bodyRef}
              style={{
                background: '#141414',
                padding: '18px 22px',
                height: 400,
                overflowY: 'auto',
                fontFamily: MONO, fontSize: 14, lineHeight: 1.75, letterSpacing: 0.15,
              }}
            >
              <div style={{ color: '#374151', fontSize: 11, marginBottom: 14 }}>
                Last login: Sat Jun 6 12:00:00 2026 on ttys001
              </div>

              {/* Boot lines */}
              {BOOT.slice(0, bootIdx).map((line, i) =>
                line.type === 'cmd'
                  ? (
                    <div key={`b${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 2, marginBottom: 2 }}>
                      <Prompt /><span style={{ fontFamily: MONO, fontSize: 14, color: '#f8f8f2', fontWeight: 500 }}>{line.text}</span>
                    </div>
                  )
                  : <Line key={`b${i}`} line={line} />
              )}

              {/* History */}
              {history.map((line, i) =>
                line.type === '__echo'
                  ? (
                    <div key={`h${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 2, marginBottom: 2 }}>
                      <Prompt /><span style={{ fontFamily: MONO, fontSize: 14, color: '#f8f8f2', fontWeight: 500 }}>{line.text}</span>
                    </div>
                  )
                  : <Line key={`h${i}`} line={line} />
              )}

              {/* Live input */}
              {bootDone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
                  <Prompt />
                  <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>
                    <span style={{ fontFamily: MONO, fontSize: 14, color: '#f8f8f2', whiteSpace: 'pre' }}>{input}</span>
                    <span className="cursor-blink" style={{ color: '#4ade80', fontSize: 15, fontWeight: 700, lineHeight: 1, marginLeft: 1 }}>▋</span>
                    <input
                      ref={inputRef}
                      autoFocus
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={onKey}
                      spellCheck={false}
                      autoComplete="off"
                      style={{
                        position: 'absolute', inset: 0, opacity: 0,
                        background: 'transparent', border: 'none', outline: 'none',
                        fontFamily: MONO, fontSize: 14, width: '100%', cursor: 'text',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Boot cursor */}
              {!bootDone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
                  <Prompt />
                  <span className="cursor-blink" style={{ color: '#4ade80', fontSize: 15, fontWeight: 700 }}>▋</span>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div style={{ background: '#16a34a', height: 24, display: 'flex', alignItems: 'stretch', userSelect: 'none', fontSize: 11, fontFamily: MONO }}>
              <span style={{ background: '#15803d', color: '#fff', fontWeight: 700, padding: '0 14px', display: 'flex', alignItems: 'center', letterSpacing: 0.8, borderRight: '1px solid rgba(255,255,255,0.2)' }}>NORMAL</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', padding: '0 12px', display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(255,255,255,0.2)' }}>portfolio.sh</span>
              <div style={{ flex: 1 }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', padding: '0 12px', display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>UTF-8</span>
              <span style={{ color: '#fff', fontWeight: 700, padding: '0 14px', display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>zsh</span>
            </div>
          </div>

          {/* Hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FiTerminal size={11} color="#9ca3af" />
            <span style={{ fontFamily: MONO, fontSize: 11, color: '#9ca3af' }}>
              Type{' '}
              <span
                style={{ color: '#16a34a', fontWeight: 700, cursor: 'pointer', borderBottom: '1px dotted #16a34a' }}
                onClick={() => { run('help'); setTimeout(focusInput, 40); }}
              >help</span>
              {' '}· Tab autocomplete · ↑↓ history
            </span>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
