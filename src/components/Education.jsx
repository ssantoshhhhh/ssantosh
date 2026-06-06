import { useState } from 'react';
import { FiBookOpen, FiBook, FiHome } from 'react-icons/fi';
import Reveal from './Reveal';

const EDU = [
  {
    level: 'B.Tech', Icon: FiBookOpen, status: 'pursuing',
    degree: 'B.Tech in Computer Science and Information Technology',
    institution: 'SRKR Engineering College, Bhimavaram',
    period: '2023 – 2027',
    desc: 'Pursuing Under Graduation in CSIT with focus on core CS fundamentals and software development.',
    subjects: ['DBMS', 'C', 'Data Structures', 'Adv. Data Structures', 'Java', 'MySQL'],
    score: null,
  },
  {
    level: '12th', Icon: FiBook, status: 'completed',
    degree: 'Intermediate (MPC)',
    institution: 'Aditya Junior College, Narasapur',
    period: '2021 – 2023',
    desc: 'Completed Intermediate with a focus on Mathematics, Physics, and Chemistry.',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    score: '84.9%',
  },
  {
    level: '10th', Icon: FiHome, status: 'completed',
    degree: 'SSC – Xth Standard',
    institution: 'Pratibha E.M High School',
    period: '2020 – 2021',
    desc: 'Completed Xth Standard with outstanding academic performance.',
    subjects: [],
    score: '9.7 / 10 CGPA',
  },
];

function EduCard({ e }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = e;

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
        height: '100%',
        position: 'relative',
        transform: hovered ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(22,163,74,0.08)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.38s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.22s ease',
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 4,
        background: e.status === 'pursuing' ? '#16a34a' : (hovered ? '#16a34a' : '#e5e7eb'),
        transition: 'background 0.35s ease',
        flexShrink: 0,
      }} />

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Icon + badge row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 6,
            border: `1.5px solid ${hovered ? '#16a34a' : '#e5e7eb'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hovered ? '#16a34a' : '#6b7280',
            background: hovered ? '#f0fdf4' : '#fff',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            transform: hovered ? 'rotate(-8deg) scale(1.1)' : 'rotate(0) scale(1)',
          }}>
            <Icon size={22} />
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{
              display: 'inline-block', fontSize: 10, fontFamily: 'monospace',
              fontWeight: 700, padding: '3px 10px',
              border: `1px solid ${hovered ? '#bbf7d0' : '#e5e7eb'}`,
              borderRadius: 3, color: hovered ? '#15803d' : '#6b7280',
              background: hovered ? '#f0fdf4' : 'transparent',
              marginBottom: 6,
              transition: 'all 0.25s ease',
            }}>
              {e.level}
            </span>
            <br />
            {e.status === 'pursuing'
              ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#16a34a', fontWeight: 600 }}>
                  <span className="pulse-green" style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                  Pursuing
                </span>
              : <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500 }}>Completed</span>
            }
          </div>
        </div>

        {/* Text */}
        <h3 style={{
          fontSize: 13, fontWeight: 700, lineHeight: 1.4, marginBottom: 4,
          color: hovered ? '#15803d' : '#000',
          transition: 'color 0.25s ease',
        }}>
          {e.degree}
        </h3>
        <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, marginBottom: 10 }}>{e.institution}</p>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.75, marginBottom: 12, flex: 1 }}>{e.desc}</p>

        {/* Score */}
        {e.score && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px',
            background: hovered ? '#f0fdf4' : '#f9fafb',
            border: `1px solid ${hovered ? '#bbf7d0' : '#f3f4f6'}`,
            borderRadius: 4, marginBottom: 12,
            transition: 'all 0.25s ease',
          }}>
            <span style={{ fontSize: 11, color: '#6b7280' }}>Score:</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#16a34a' }}>{e.score}</span>
          </div>
        )}

        {/* Subjects */}
        {e.subjects.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
            {e.subjects.map(s => (
              <span key={s} style={{
                fontSize: 10, fontFamily: 'monospace', padding: '2px 8px',
                border: `1px solid ${hovered ? '#bbf7d0' : '#e5e7eb'}`,
                borderRadius: 2,
                color: hovered ? '#15803d' : '#6b7280',
                background: hovered ? '#f0fdf4' : 'transparent',
                transition: 'all 0.25s ease',
              }}>
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Period footer */}
        <div style={{ borderTop: `1px solid ${hovered ? '#dcfce7' : '#f3f4f6'}`, paddingTop: 10, transition: 'border-color 0.25s ease' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#9ca3af' }}>{e.period}</span>
        </div>
      </div>

      {/* Bottom green accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 3, background: '#16a34a',
        borderRadius: '0 0 6px 6px',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left center',
        transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" style={{ padding: '96px 0', backgroundColor: '#ffffff', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <Reveal>
          <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>// my background</p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#000', marginBottom: 12 }}>
            My <span style={{ color: '#16a34a' }}>Education</span>
          </h2>
          <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 480, lineHeight: 1.7, marginBottom: 6 }}>
            Educational background and continuous learning journey.
          </p>
          <div style={{ width: 48, height: 4, background: '#16a34a', borderRadius: 99, marginBottom: 48 }} />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {EDU.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <EduCard e={e} />
            </Reveal>
          ))}
        </div>

        {/* Continuous learning strip */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: 28, border: '1.5px solid #16a34a', borderRadius: 6, padding: '24px 28px', background: '#fff', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>// always learning</p>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#000', marginBottom: 4 }}>Continuous Learning</h3>
              <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>Self-taught in modern web tech, AI/ML tools, and system design.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['MERN Stack', 'Docker', 'n8n', 'RAG', 'Prisma', 'Nest.js', 'System Design'].map(t => (
                <span key={t} className="btn-press"
                  style={{ fontSize: 11, fontFamily: 'monospace', padding: '4px 12px', border: '1.5px solid #16a34a', borderRadius: 2, color: '#16a34a', transition: 'background 0.2s, color 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; }}
                >{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
