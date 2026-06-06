import { useState, useEffect, useRef, useCallback } from 'react';

const NAV = [
  { label: 'Home',       id: 'home'       },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Education',  id: 'education'  },
  { label: 'Contact',    id: 'contact'    },
];

const BASE_FONT   = 13;   // px — resting font size
const MAX_FONT    = 19;   // px — max font size at cursor
const SPREAD      = 100;  // px — Gaussian radius of influence

function gaussian(dist, spread) {
  return Math.exp(-(dist * dist) / (2 * spread * spread));
}

/* Each nav item listens to the shared hoverX and computes its own size */
function DockItem({ label, isActive, onClick, hoverX, itemRef }) {
  const [fontSize, setFontSize] = useState(BASE_FONT);

  useEffect(() => {
    if (hoverX === null || !itemRef.current) {
      setFontSize(BASE_FONT);
      return;
    }
    const rect = itemRef.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(hoverX - center);
    const t = gaussian(dist, SPREAD);
    setFontSize(BASE_FONT + (MAX_FONT - BASE_FONT) * t);
  }, [hoverX, itemRef]);

  const isHovered = hoverX !== null && itemRef.current
    ? gaussian(Math.abs(hoverX - (itemRef.current.getBoundingClientRect().left + itemRef.current.getBoundingClientRect().width / 2)), SPREAD) > 0.3
    : false;

  return (
    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}>
      <button
        ref={itemRef}
        onClick={onClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          /* Use padding + fontSize so layout actually expands */
          fontSize: `${fontSize}px`,
          padding: `6px ${4 + (fontSize - BASE_FONT) * 0.3}px`,
          fontWeight: isActive || fontSize > BASE_FONT + 1 ? 600 : 500,
          color: isActive ? '#16a34a' : (fontSize > BASE_FONT + 2 ? '#16a34a' : '#111'),
          fontFamily: 'Poppins, sans-serif',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          position: 'relative',
          /* smooth transition: fast when approaching, spring-settle on leave */
          transition: hoverX !== null
            ? 'font-size 0.08s ease-out, padding 0.08s ease-out, color 0.15s ease'
            : 'font-size 0.4s cubic-bezier(0.34,1.56,0.64,1), padding 0.4s cubic-bezier(0.34,1.56,0.64,1), color 0.2s ease',
        }}
      >
        {label}
        {/* Active dot */}
        <span style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isActive ? 4 : 0,
          height: 4,
          borderRadius: '50%',
          background: '#16a34a',
          display: 'block',
          transition: 'width 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }} />
      </button>
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [hoverX,   setHoverX]   = useState(null);

  const itemRefs = useRef(NAV.map(() => ({ current: null })));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveId(NAV[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = useCallback(e => setHoverX(e.clientX), []);
  const handleMouseLeave = useCallback(() => setHoverX(null), []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderBottom: scrolled ? '1.5px solid #16a34a' : '1.5px solid transparent',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.07)' : 'none',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      fontFamily: 'Poppins, sans-serif',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0, flexShrink: 0 }}
        >
          <span style={{ color: '#16a34a', fontWeight: 800, fontSize: 18 }}>{'>'}</span>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#000', letterSpacing: '-0.3px' }}>
            santosh<span style={{ color: '#16a34a' }}>.</span>dev
          </span>
          <span className="cursor-blink" style={{ color: '#16a34a', fontWeight: 800, fontSize: 18, marginLeft: 1 }}>_</span>
        </button>

        {/* Desktop dock nav */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <ul
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              display: 'flex',
              alignItems: 'center',
              /* no gap here — padding on each item provides spacing that expands with font */
              gap: 0,
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {NAV.map((n, i) => {
              if (!itemRefs.current[i]) itemRefs.current[i] = { current: null };
              return (
                <DockItem
                  key={n.id}
                  label={n.label}
                  id={n.id}
                  isActive={activeId === n.id}
                  onClick={() => scrollTo(n.id)}
                  hoverX={hoverX}
                  itemRef={itemRefs.current[i]}
                />
              );
            })}
          </ul>

        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="show-mobile"
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'none' }}
        >
          <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', height: 2, background: '#000', borderRadius: 2, transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', height: 2, background: '#000', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', height: 2, background: '#000', borderRadius: 2, transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="menu-slide" style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '16px 24px 20px' }}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '11px 0', fontSize: 14, fontWeight: 500,
                color: activeId === n.id ? '#16a34a' : '#111',
                borderBottom: '1px solid #f5f5f5',
                fontFamily: 'Poppins, sans-serif',
                transition: 'color 0.2s',
              }}
            >
              <span style={{ color: '#16a34a', marginRight: 8, fontWeight: 700 }}>›</span>
              {n.label}
            </button>
          ))}
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
