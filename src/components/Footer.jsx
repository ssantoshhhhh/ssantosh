import { FiGithub, FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi';
import Reveal from './Reveal';

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1.5px solid #f3f4f6', padding: '40px 0 28px', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Reveal threshold={0.05}>

        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#16a34a', fontWeight: 800, fontSize: 17 }}>{'>'}</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#000' }}>
              santosh<span style={{ color: '#16a34a' }}>.</span>dev
            </span>
            <span className="cursor-blink" style={{ color: '#16a34a', fontWeight: 800, fontSize: 17, marginLeft: 1 }}>_</span>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {['Home', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map(n => (
              <button
                key={n}
                onClick={() => scrollTo(n.toLowerCase())}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#6b7280', padding: '3px 10px', fontFamily: 'Poppins, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#16a34a'}
                onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
              >{n}</button>
            ))}
          </nav>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { Icon: FiGithub,    title: 'GitHub',    href: 'https://github.com/ssantoshhhhh' },
              { Icon: FiLinkedin,  title: 'LinkedIn',  href: 'https://www.linkedin.com/in/santosh-seelaboina-56b5492b8/' },
              { Icon: FiInstagram, title: 'Instagram', href: 'https://instagram.com/ssantoshhhhh' },
              { Icon: FiMail,      title: 'Email',     href: 'mailto:santoshkumar90101s@gmail.com' },
            ].map(s => (
              <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title}
                style={{ width: 32, height: 32, border: '1.5px solid #e5e7eb', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; }}
              ><s.Icon size={14} /></a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #f3f4f6', marginBottom: 18 }} />

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>
            © {year} <span style={{ color: '#000', fontWeight: 600 }}>Santosh Seelaboina</span>. All rights reserved.
          </p>
          <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#9ca3af' }}>
            Built with <span style={{ color: '#16a34a' }}>React</span> + <span style={{ color: '#16a34a' }}>Tailwind CSS</span>
          </p>
        </div>
        </Reveal>
      </div>
    </footer>
  );
}
