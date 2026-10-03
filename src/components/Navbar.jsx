import { useState, useEffect, useCallback } from 'react';

const NAV = [
  { label: 'Home',       id: 'home'       },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Education',  id: 'education'  },
  { label: 'Contact',    id: 'contact'    },
];

const NAV_HEIGHT = 64;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  /* Scroll position + active section (rAF-throttled) */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
      let current = NAV[0].id;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && window.scrollY >= el.offsetTop - 160) current = n.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      ticking = false;
    };
  }, []);

  /* Close mobile menu when resizing up to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Close mobile menu on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const scrollTo = useCallback(id => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - (NAV_HEIGHT + 8);
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.07)' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s, background-color 0.3s',
        fontFamily: 'Poppins, sans-serif',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        height: NAV_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>

        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          aria-label="Go to home"
          className="btn-press"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0, flexShrink: 0 }}
        >
          <span style={{ color: '#16a34a', fontWeight: 800, fontSize: 18 }}>{'>'}</span>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#000', letterSpacing: '-0.3px' }}>
            santosh<span style={{ color: '#16a34a' }}>.</span>dev
          </span>
          <span className="cursor-blink" style={{ color: '#16a34a', fontWeight: 800, fontSize: 18, marginLeft: 1 }}>_</span>
        </button>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <ul style={{
            display: 'flex', alignItems: 'center', gap: 4,
            listStyle: 'none', margin: 0, padding: 0,
          }}>
            {NAV.map(n => {
              const isActive = activeId === n.id;
              return (
                <li key={n.id} style={{ listStyle: 'none' }}>
                  <button
                    onClick={() => scrollTo(n.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link-underline${isActive ? ' active' : ''}`}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 13, fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#16a34a' : '#374151',
                      fontFamily: 'Poppins, sans-serif',
                      whiteSpace: 'nowrap', lineHeight: 1,
                      padding: '8px 10px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#111'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#374151'; }}
                  >
                    {n.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <button
            onClick={() => window.open('/SantoshSeelaboina_Resume.pdf', '_blank', 'noopener,noreferrer')}
            className="btn-press"
            style={{
              background: '#16a34a', color: '#fff',
              border: '1.5px solid #16a34a', borderRadius: 6,
              padding: '9px 20px', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(22,163,74,0.28)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.borderColor = '#15803d'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.borderColor = '#16a34a'; }}
          >
            Resume
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="show-mobile btn-press"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{ background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 6, cursor: 'pointer', padding: 8, display: 'none' }}
        >
          <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', height: 2, background: '#111', borderRadius: 2, transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', height: 2, background: '#111', borderRadius: 2, transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', height: 2, background: '#111', borderRadius: 2, transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="menu-slide"
          style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '8px 16px 16px', boxShadow: '0 16px 32px rgba(0,0,0,0.08)' }}
        >
          {NAV.map(n => {
            const isActive = activeId === n.id;
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', textAlign: 'left',
                  background: isActive ? '#f0fdf4' : 'none',
                  border: 'none', borderRadius: 6, cursor: 'pointer',
                  padding: '12px 12px', fontSize: 14, fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#16a34a' : '#111',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: isActive ? '#16a34a' : '#d1d5db',
                }} />
                {n.label}
              </button>
            );
          })}
          <button
            onClick={() => window.open('/SantoshSeelaboina_Resume.pdf', '_blank', 'noopener,noreferrer')}
            className="btn-press"
            style={{
              display: 'block', width: '100%',
              marginTop: 8,
              background: '#16a34a', color: '#fff',
              border: '1.5px solid #16a34a', borderRadius: 6,
              padding: '12px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
            }}
          >
            Resume
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
