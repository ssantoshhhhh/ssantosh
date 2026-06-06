import { useState } from 'react';
import {
  FiMonitor, FiAward, FiZap, FiCpu, FiShoppingCart, FiMessageSquare,
  FiClock, FiMap, FiCheckSquare, FiGrid, FiCode,
  FiExternalLink, FiCheck, FiLoader, FiGithub,
} from 'react-icons/fi';
import Reveal from './Reveal';

const PROJECTS = [
  {
    title: 'CSD & CSIT Department Website',
    cat: 'Web Apps', period: 'Jan 2026', status: 'live',
    Icon: FiMonitor,
    desc: 'Official customized webpage for the CSD & CSIT engineering departments at SRKR. Responsive layouts, comprehensive academic information, and modern UI.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
    live: 'http://csd-csit.page.gd/',
    github: null,
  },
  {
    title: 'JAITRA 2026 – Sports Carnival',
    cat: 'Web Apps', period: 'Jan 2026', status: 'live',
    Icon: FiAward,
    desc: 'Official event management and live tracking platform for a state-wide engineering sports festival. Live scoreboards, coordinator directory, real-time visitor tracking.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    live: 'https://jaithra2026.in/',
    github: null,
  },
  {
    title: 'CSS Loaders Web App',
    cat: 'Web Apps', period: 'July 2025', status: 'live',
    Icon: FiZap,
    desc: 'A collection of beautiful and customizable CSS loading animations. Pure CSS and JavaScript, various animation styles, easy integration for any web project.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://css-loaders-liard.vercel.app/',
    github: 'https://github.com/ssantoshhhhh/css-loaders',
  },
  {
    title: 'Task AI – Productivity Platform',
    cat: 'Web Apps', period: 'Jan 2026', status: 'live',
    Icon: FiCpu,
    desc: 'A next-generation AI-driven productivity platform. AI Smart Planning, Flow State Focus tools, and RAG-integrated task chats for high-performers.',
    tags: ['React', 'Node.js', 'RAG', 'Pinecone', 'MongoDB'],
    live: 'https://taskai-chi.vercel.app/',
    github: null,
  },
  {
    title: 'Campus E-commerce Market Place',
    cat: 'Web Apps', period: 'In Dev', status: 'dev',
    Icon: FiShoppingCart,
    desc: 'Full-featured e-commerce with MERN stack, user authentication, product management, shopping cart, payment integration, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    live: null,
    github: 'https://github.com/ssantoshhhhh/cc-pvt',
  },
  {
    title: 'Flick Chatting Application',
    cat: 'Web Apps', period: 'In Dev', status: 'dev',
    Icon: FiMessageSquare,
    desc: 'Real-time chat app with React, Node.js, and Socket.io. Instant messaging, user authentication, online status indicators, and message history.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    live: null,
    github: 'https://github.com/ssantoshhhhh/flick-chat',
  },
  {
    title: 'Desktop Clock App',
    cat: 'Desktop Apps', period: 'Jun 2025', status: 'dev',
    Icon: FiClock,
    desc: 'Desktop clock app with timer, alarm and stopwatch functionality. Built with Electron.js providing a clean and intuitive desktop UI.',
    tags: ['Electron.js', 'JavaScript', 'CSS'],
    live: null,
    github: 'https://github.com/ssantoshhhhh/desktop-clock',
  },
  {
    title: 'Incredible India – Tourist Places',
    cat: 'Web Apps', period: 'Apr 2025', status: 'dev',
    Icon: FiMap,
    desc: 'Web project showcasing tourist destinations across India with interactive features and detailed state-wise information.',
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    live: null,
    github: 'https://github.com/ssantoshhhhh/fsd-final',
  },
  {
    title: 'To-Do List',
    cat: 'Web Apps', period: 'Aug 2024', status: 'live',
    Icon: FiCheckSquare,
    desc: 'Task management app built with the MERN stack. Add, edit, and delete tasks with full persistent storage using MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    live: 'https://project-x-4cj1.onrender.com/',
    github: 'https://github.com/ssantoshhhhh/todorepo',
  },
  {
    title: 'Tic Tac Toe Game',
    cat: 'Web Apps', period: 'Oct 2024', status: 'live',
    Icon: FiGrid,
    desc: 'Classic 2-player Tic Tac Toe. Responsive design, smooth animations, and accurate win detection logic.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://tictactoe-r7sw.onrender.com/',
    github: 'https://github.com/ssantoshhhhh/tictactoe',
  },
  {
    title: 'Tic Tac Toe – Python',
    cat: 'Others', period: 'Jun 2025', status: 'dev',
    Icon: FiCode,
    desc: 'Text-based 2-Player Tic Tac Toe in Python with console interface, perfect for learning programming fundamentals.',
    tags: ['Python'],
    live: null,
    github: 'https://github.com/ssantoshhhhh/python_tictactoe',
  },
];

const FILTERS = ['All', 'Web Apps', 'Desktop Apps', 'Others'];

/* ── Project card with slide-up overlay on hover ─────────────── */
function ProjectCard({ p }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = p;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1.5px solid ${hovered ? '#16a34a' : '#e5e7eb'}`,
        borderRadius: 6,
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        /* macOS spring lift */
        transform: hovered ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(22,163,74,0.10)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.38s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.22s ease',
      }}
    >
      {/* Card header */}
      <div style={{
        background: hovered ? '#f0fdf4' : '#f9fafb',
        borderBottom: `1px solid ${hovered ? '#bbf7d0' : '#f3f4f6'}`,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          {/* Icon box */}
          <div style={{
            width: 32, height: 32, borderRadius: 4,
            border: `1.5px solid ${hovered ? '#16a34a' : '#e5e7eb'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hovered ? '#16a34a' : '#6b7280',
            background: '#fff',
            transition: 'border-color 0.25s, color 0.25s, transform 0.36s cubic-bezier(0.34,1.56,0.64,1)',
            transform: hovered ? 'rotate(-8deg) scale(1.12)' : 'rotate(0) scale(1)',
          }}>
            <Icon size={15} />
          </div>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#9ca3af' }}>{p.cat}</span>
        </div>

        <span style={{
          fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99,
          background: p.status === 'dev' ? '#fefce8' : '#f0fdf4',
          color: p.status === 'dev' ? '#a16207' : '#15803d',
          border: `1px solid ${p.status === 'dev' ? '#fde68a' : '#bbf7d0'}`,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          {p.status === 'dev' ? <><FiLoader size={9} /> In Dev</> : <><FiCheck size={9} /> Live</>}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: 13, fontWeight: 700,
          color: hovered ? '#15803d' : '#000',
          marginBottom: 8, lineHeight: 1.4,
          transition: 'color 0.25s ease',
        }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.75, marginBottom: 12, flex: 1 }}>
          {p.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {p.tags.map(t => (
            <span
              key={t}
              style={{
                fontSize: 10, fontFamily: 'monospace',
                padding: '2px 8px',
                border: `1px solid ${hovered ? '#bbf7d0' : '#e5e7eb'}`,
                borderRadius: 2,
                color: hovered ? '#15803d' : '#6b7280',
                background: hovered ? '#f0fdf4' : 'transparent',
                transition: 'all 0.25s ease',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${hovered ? '#dcfce7' : '#f3f4f6'}`,
          paddingTop: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 8,
          transition: 'border-color 0.25s ease',
        }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#9ca3af', flexShrink: 0 }}>{p.period}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* GitHub link */}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                title="GitHub"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 26, height: 26, borderRadius: 3,
                  border: `1px solid ${hovered ? '#bbf7d0' : '#e5e7eb'}`,
                  color: hovered ? '#16a34a' : '#9ca3af',
                  textDecoration: 'none',
                  transition: 'all 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = hovered ? '#bbf7d0' : '#e5e7eb'; e.currentTarget.style.color = hovered ? '#16a34a' : '#9ca3af'; }}
              >
                <FiGithub size={12} />
              </a>
            )}
            {/* Live link */}
            {p.live ? (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  fontSize: 11, fontWeight: 700, color: '#16a34a',
                  display: 'flex', alignItems: 'center', gap: 3,
                  textDecoration: 'none',
                  opacity: hovered ? 1 : 0.5,
                  transform: hovered ? 'translateX(0)' : 'translateX(-3px)',
                  transition: 'opacity 0.3s ease, transform 0.36s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              >
                View Live
                <FiExternalLink size={10} style={{ transform: hovered ? 'translate(2px,-2px)' : 'translate(0,0)', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }} />
              </a>
            ) : (
              <span style={{
                fontSize: 11, fontWeight: 600, color: '#9ca3af',
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                In Dev
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom green accent bar — slides in on hover */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 3,
        background: '#16a34a',
        borderRadius: '0 0 6px 6px',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left center',
        transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function Projects() {
  const [filter, setFilter] = useState('All');

  const shown    = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  const countFor = f => f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.cat === f).length;

  return (
    <section
      id="projects"
      style={{ padding: '96px 0', backgroundColor: '#fafafa', fontFamily: 'Poppins, sans-serif' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <Reveal>
          <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>// what I've built</p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#000', marginBottom: 12 }}>
            My <span style={{ color: '#16a34a' }}>Projects</span>
          </h2>
          <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 480, lineHeight: 1.7, marginBottom: 6 }}>
            Showcasing skills and creativity across web apps, desktop apps, and more.
          </p>
          <div style={{ width: 48, height: 4, background: '#16a34a', borderRadius: 99, marginBottom: 36 }} />
        </Reveal>

        {/* Filter buttons */}
        <Reveal delay={0.08}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {FILTERS.map(f => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="btn-press"
                  style={{
                    padding: '8px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    border: `1.5px solid ${active ? '#000' : '#e5e7eb'}`,
                    background: active ? '#000' : '#fff',
                    color: active ? '#fff' : '#374151',
                    borderRadius: 3,
                    transition: 'all 0.22s cubic-bezier(0.25,0.46,0.45,0.94)',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {f}
                  <span style={{ marginLeft: 6, fontSize: 11, fontFamily: 'monospace', color: active ? '#4ade80' : '#16a34a' }}>
                    {countFor(f)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 20 }}>
          {shown.map((p, i) => (
            <Reveal key={`${filter}-${i}`} delay={i * 0.05} threshold={0.06}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
