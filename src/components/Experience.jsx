import { useState } from 'react';
import { FiBriefcase, FiGlobe, FiZap, FiAward, FiBookOpen, FiChevronRight } from 'react-icons/fi';
import Reveal from './Reveal';

const EXP = [
  { type: 'work', Icon: FiBriefcase, title: 'SDE Intern', org: 'bluconn', period: 'Jan 2026 – Present', status: 'active', desc: 'Working as a Software Development Engineer Intern at bluconn, contributing to product development and software engineering projects.', tags: [] },
  { type: 'work', Icon: FiGlobe, title: 'Web Developer Intern', org: "Bhimavaram Online's Lunch Box", period: 'Oct 2024 – Apr 2025', status: 'done', desc: 'Worked as a Full Stack Developer Intern. Built and maintained web applications handling menu management, orders, and customer-facing features.', tags: ['PHP', 'MySQL', 'Full Stack', 'HTML', 'CSS'] },
  { type: 'hackathon', Icon: FiZap, title: 'MERN Stack Hackathon', org: '24hr Hackathon', period: 'Apr 2024', status: 'done', desc: '5-Day Bootcamp followed by a 24-hour hackathon. Built a full-stack application under time pressure with a team.', tags: ['React JS', 'Node JS', 'MongoDB', 'Tailwind CSS'] },
  { type: 'hackathon', Icon: FiAward, title: 'Vedic Vision Hackathon', org: 'Bootcamp + Hackathon', period: 'Aug 2026', status: 'done', desc: 'Participated in a 15-day Bootcamp and 24-hour hackathon. Built a fully functional Fitness Tracker App.', tags: ['React JS', 'Node JS', 'MongoDB', 'Chakra UI'] },
  { type: 'course', Icon: FiBookOpen, title: 'Web Development Course', org: 'AICTE IDEALs', period: 'Apr 2024', status: 'done', desc: 'Completed a short-term Web Development Course provided by AICTE IDEALs covering fundamentals to modern tooling.', tags: ['HTML5', 'CSS3', 'JavaScript', 'Git & GitHub'] },
];

export default function Experience() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="experience" style={{ padding: '96px 0', backgroundColor: '#fafafa', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <Reveal>
          <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>// my journey</p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#000', marginBottom: 12 }}>
            Work <span style={{ color: '#16a34a' }}>Experience</span>
          </h2>
          <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 480, lineHeight: 1.7, marginBottom: 6 }}>
            My professional journey and the experiences that shaped my career.
          </p>
          <div style={{ width: 48, height: 4, background: '#16a34a', borderRadius: 99, marginBottom: 48 }} />
        </Reveal>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 26, top: 0, bottom: 0, width: 1, background: '#e5e7eb' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {EXP.map((exp, i) => {
              const isOpen = expanded === i;
              const { Icon } = exp;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
                    {/* Node */}
                    <div
                      className={exp.status === 'active' ? 'pulse-green' : ''}
                      style={{
                        flexShrink: 0, width: 52, height: 52, borderRadius: 4, zIndex: 1,
                        border: `2px solid ${exp.status === 'active' ? '#16a34a' : '#e5e7eb'}`,
                        background: exp.status === 'active' ? '#16a34a' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: exp.status === 'active' ? '#fff' : '#6b7280',
                        transition: 'border-color 0.3s, background 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Card */}
                    <div style={{
                      flex: 1,
                      border: `1.5px solid ${isOpen ? '#16a34a' : '#e5e7eb'}`,
                      borderRadius: 4, background: '#fff', overflow: 'hidden',
                      boxShadow: isOpen ? '0 4px 20px rgba(22,163,74,0.08)' : 'none',
                      transition: 'border-color 0.25s, box-shadow 0.25s',
                      marginBottom: 2,
                    }}>
                      <div
                        onClick={() => setExpanded(isOpen ? null : i)}
                        style={{ padding: '15px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 2 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#000', margin: 0 }}>{exp.title}</h3>
                            {exp.status === 'active' && (
                              <span style={{ fontSize: 10, fontWeight: 700, background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: 99, border: '1px solid #bbf7d0' }}>● Current</span>
                            )}
                          </div>
                          <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, margin: 0 }}>{exp.org}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#6b7280', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '3px 10px', borderRadius: 2 }}>
                            {exp.period}
                          </span>
                          <FiChevronRight size={16} color="#9ca3af" style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }} />
                        </div>
                      </div>

                      {/* Animated accordion body */}
                      <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
                        <div style={{ padding: '0 18px 16px', borderTop: '1px solid #f3f4f6' }}>
                          <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.75, margin: '12px 0 10px' }}>{exp.desc}</p>
                          {exp.tags.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {exp.tags.map(t => (
                                <span key={t} style={{ fontSize: 11, fontFamily: 'monospace', padding: '3px 10px', border: '1px solid #e5e7eb', borderRadius: 2, color: '#374151' }}>{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
