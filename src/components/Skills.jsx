import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { FiMonitor, FiServer, FiCode, FiTool, FiCloud, FiGlobe } from 'react-icons/fi';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiHtml5, SiCss,
  SiBootstrap, SiMui, SiElectron,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPhp, SiNestjs,
  SiC, SiPython,
  SiGit, SiGithub, SiDocker, SiPostman, SiPrisma, SiN8N,
  SiVercel, SiNetlify, SiRender, SiGithubpages,
} from 'react-icons/si';
import Reveal from './Reveal';

/* ── Brand colours ─────────────────────────────────────────────── */
const BRAND = {
  'React Js': '#61dafb',    'Next Js': '#000',       'Tailwind CSS': '#38bdf8',
  'JavaScript': '#f7df1e',  'HTML': '#e34f26',        'CSS': '#1572b6',
  'Bootstrap': '#7952b3',   'Material UI': '#007fff', 'Electron Js': '#47848f',
  'Node Js': '#339933',     'Express Js': '#555',     'REST API': '#16a34a',
  'MongoDB': '#47a248',     'MySQL': '#4479a1',        'PHP': '#777bb4',
  'Nest Js': '#e0234e',     'C': '#a8b9cc',            'Python': '#3776ab',
  'Git': '#f05032',         'GitHub': '#333',          'Docker': '#2496ed',
  'Postman': '#ff6c37',     'Thunder Client': '#16a34a', 'RAG': '#16a34a',
  'Pinecone': '#16a34a',    'n8n': '#ea4b71',           'Prisma': '#5a67d8',
  'Vercel': '#000',         'Netlify': '#00c7b7',       'Render': '#46e3b7',
  'GitHub Pages': '#333',   'Infinity Free': '#16a34a',
};

/* ── Icon map ──────────────────────────────────────────────────── */
const ICON_MAP = {
  'React Js': SiReact,       'Next Js': SiNextdotjs,    'Tailwind CSS': SiTailwindcss,
  'JavaScript': SiJavascript,'HTML': SiHtml5,            'CSS': SiCss,
  'Bootstrap': SiBootstrap,  'Material UI': SiMui,       'Electron Js': SiElectron,
  'Node Js': SiNodedotjs,    'Express Js': SiExpress,    'MongoDB': SiMongodb,
  'MySQL': SiMysql,          'PHP': SiPhp,               'Nest Js': SiNestjs,
  'C': SiC,                  'Python': SiPython,
  'Git': SiGit,              'GitHub': SiGithub,         'Docker': SiDocker,
  'Postman': SiPostman,      'Prisma': SiPrisma,         'n8n': SiN8N,
  'Vercel': SiVercel,        'Netlify': SiNetlify,       'Render': SiRender,
  'GitHub Pages': SiGithubpages,
};

/* ── Categories ────────────────────────────────────────────────── */
const CATS = [
  { id: 'frontend',   label: 'Frontend',   Icon: FiMonitor, file: 'ui/frontend.skills',
    skills: ['React Js','Next Js','Tailwind CSS','JavaScript','HTML','CSS','Bootstrap','Material UI','Electron Js'] },
  { id: 'backend',    label: 'Backend',    Icon: FiServer,  file: 'api/backend.skills',
    skills: ['Node Js','Express Js','REST API','MongoDB','MySQL','PHP','Nest Js'] },
  { id: 'languages',  label: 'Languages',  Icon: FiCode,    file: 'lang/languages.skills',
    skills: ['C','Python','JavaScript'] },
  { id: 'others',     label: 'Others',     Icon: FiTool,    file: 'tools/others.skills',
    skills: ['Git','GitHub','Docker','Postman','Prisma','n8n','RAG','Pinecone','Thunder Client'] },
  { id: 'deployment', label: 'Deployment', Icon: FiCloud,   file: 'deploy/deployment.skills',
    skills: ['Vercel','Netlify','Render','GitHub Pages','Infinity Free'] },
];

/* ── Dock constants ────────────────────────────────────────────── */
const BASE_SIZE   = 52;
const MAGNIFY     = 88;
const DISTANCE    = 160;
/* Smooth spring — low stiffness + high damping = buttery */
const SPRING_CFG  = { mass: 0.15, stiffness: 120, damping: 18 };

/* ── Single dock item ──────────────────────────────────────────── */
function DockItem({ name, mouseX }) {
  const ref       = useRef(null);
  const isHovered = useMotionValue(0);
  const IconComp  = ICON_MAP[name] || FiGlobe;
  const color     = BRAND[name]    || '#16a34a';

  /* distance from cursor to this icon's centre */
  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { left: 0, width: BASE_SIZE };
    return val - rect.left - rect.width / 2;
  });

  /* smooth spring-driven size */
  const rawSize = useTransform(
    mouseDistance,
    [-DISTANCE, 0, DISTANCE],
    [BASE_SIZE, MAGNIFY, BASE_SIZE],
  );
  const size = useSpring(rawSize, SPRING_CFG);

  const [showLabel, setShowLabel] = useState(false);
  useEffect(() => isHovered.on('change', v => setShowLabel(v === 1)), [isHovered]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

      {/* Tooltip */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '50%', x: '-50%',
              background: '#111',
              color: '#fff',
              fontSize: 11, fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              padding: '4px 10px',
              borderRadius: 6,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 30,
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            }}
          >
            {name}
            <div style={{
              position: 'absolute', top: '100%', left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #111',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon box — grows from bottom centre */}
      <motion.div
        ref={ref}
        style={{
          width: size,
          height: size,
          transformOrigin: 'bottom center',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          willChange: 'width, height',
          flexShrink: 0,
          border: '1.5px solid #e5e7eb',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
        animate={{
          borderColor: showLabel ? color : '#e5e7eb',
          background: showLabel ? `${color}12` : '#fff',
          boxShadow: showLabel ? `0 8px 28px ${color}40` : '0 1px 3px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.22 }}
        onHoverStart={() => isHovered.set(1)}
        onHoverEnd={() => isHovered.set(0)}
      >
        <motion.div
          animate={{ scale: showLabel ? 1.08 : 1 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
        >
          <IconComp
            size={Math.round(BASE_SIZE * 0.42)}
            style={{
              color: showLabel ? color : '#9ca3af',
              transition: 'color 0.2s ease',
              display: 'block',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Dot */}
      <motion.div
        animate={{ backgroundColor: showLabel ? color : '#d1d5db', scale: showLabel ? 1.3 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ width: 4, height: 4, borderRadius: '50%', marginTop: 6, flexShrink: 0 }}
      />
    </div>
  );
}

/* ── Dock row — single horizontal row, items align to bottom ─── */
function DockRow({ skills }) {
  const mouseX    = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* panel height expands smoothly to give icons room to grow upward */
  const targetH = useTransform(isHovered, [0, 1], [BASE_SIZE + 30, MAGNIFY + 54]);
  const height  = useSpring(targetH, SPRING_CFG);

  /* On mobile: plain wrapping grid, no dock physics */
  if (isMobile) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gap: 12,
        padding: '16px 8px',
      }}>
        {skills.map(name => {
          const IconComp = ICON_MAP[name] || FiGlobe;
          const color    = BRAND[name]    || '#16a34a';
          return (
            <div key={name} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <div style={{
                width: BASE_SIZE, height: BASE_SIZE,
                borderRadius: 14, border: '1.5px solid #e5e7eb',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <IconComp size={22} style={{ color: '#9ca3af' }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280', textAlign: 'center', fontFamily: 'Poppins, sans-serif', lineHeight: 1.2 }}>
                {name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      style={{ height, overflow: 'visible', display: 'flex', alignItems: 'flex-end' }}
      onMouseMove={e => { isHovered.set(1); mouseX.set(e.clientX); }}
      onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        rowGap: 10,
        columnGap: 8,
        padding: '8px 8px 6px',
        overflow: 'visible',
        width: '100%',
      }}>
        {skills.map(name => (
          <DockItem key={name} name={name} mouseX={mouseX} />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [active,   setActive]   = useState('frontend');
  const [visible,  setVisible]  = useState(false);
  const [panelKey, setPanelKey] = useState(0);
  const sectionRef = useRef(null);
  const cat = CATS.find(c => c.id === active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleTab = (id) => {
    setVisible(false);
    setActive(id);
    setPanelKey(k => k + 1);
    setTimeout(() => setVisible(true), 60);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ padding: '96px 0', backgroundColor: '#ffffff', fontFamily: 'Poppins, sans-serif' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <Reveal>
          <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
            // what I know
          </p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#000', marginBottom: 12 }}>
            Technical <span style={{ color: '#16a34a' }}>Skills</span>
          </h2>
          <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 480, lineHeight: 1.7, marginBottom: 6 }}>
            Skills I've been building across the full stack.
          </p>
          <div style={{ width: 48, height: 4, background: '#16a34a', borderRadius: 99, marginBottom: 40 }} />
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={0.08}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {CATS.map(c => (
              <button
                key={c.id}
                onClick={() => handleTab(c.id)}
                className="btn-press"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: active === c.id ? '1.5px solid #16a34a' : '1.5px solid #e5e7eb',
                  background: active === c.id ? '#16a34a' : '#fff',
                  color: active === c.id ? '#fff' : '#374151',
                  borderRadius: 3,
                  transition: 'background 0.22s, border-color 0.22s, color 0.22s',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <c.Icon size={13} />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Panel */}
        <Reveal delay={0.12}>
          <div style={{ border: '1.5px solid #e5e7eb', borderRadius: 6, overflow: 'visible' }}>
            {/* Terminal header */}
            <div style={{
              background: '#f9fafb', borderBottom: '1px solid #e5e7eb',
              padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12,
              borderRadius: '6px 6px 0 0',
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ef4444', '#eab308', '#22c55e'].map(c => (
                  <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'inline-block' }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{cat.file}</span>
            </div>

            <div
              key={panelKey}
              style={{ padding: '0 16px 16px', overflow: 'visible', position: 'relative' }}
            >
              <DockRow skills={cat.skills} />
            </div>
          </div>
        </Reveal>

        {/* Tag cloud */}
        <Reveal delay={0.18}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 36 }}>
            {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'JavaScript', 'Python', 'Git', 'REST API', 'Docker', 'Next.js', 'MySQL'].map(t => (
              <span
                key={t}
                className="btn-press"
                style={{ fontSize: 11, fontFamily: 'monospace', padding: '4px 12px', border: '1px solid #e5e7eb', borderRadius: 2, color: '#6b7280', cursor: 'default', transition: 'all 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; e.currentTarget.style.background = '#f0fdf4'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'transparent'; }}
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
