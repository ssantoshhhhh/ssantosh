import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiTerminal, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Reveal from './Reveal';

const MONO    = "'SF Mono','Fira Code','Cascadia Code','Consolas',monospace";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/contact';

/* ── Syntax token ──────────────────────────────────────────────── */
function T({ c, children }) {
  return <span style={{ color: c, fontFamily: MONO, fontSize: 13 }}>{children}</span>;
}

/* ── Live code preview ─────────────────────────────────────────── */
function CodePreview({ form, status }) {
  const { name, email, subject, message } = form;
  const filled = (v, ph) => v ? { val: `"${v}"`, live: true } : { val: `"${ph}"`, live: false };

  const n = filled(name,    'your_name');
  const e = filled(email,   'you@email.com');
  const s = filled(subject, 'your_subject');
  const m = filled(message.length > 44 ? message.slice(0, 44) + '…' : message, 'your_message...');

  const lines = [
    <><T c="#8b949e">{'// → fill the form, code updates live'}</T></>,
    null,
    <><T c="#ff7b72">const</T><T c="#e6edf3">{' msg '}</T><T c="#ff7b72">= {'{'}</T></>,
    <>&nbsp;&nbsp;<T c="#79c0ff">name</T><T c="#e6edf3">{'    : '}</T><T c={n.live ? '#a5d6ff' : '#484f58'}>{n.val}</T><T c="#e6edf3">,</T></>,
    <>&nbsp;&nbsp;<T c="#79c0ff">email</T><T c="#e6edf3">{'   : '}</T><T c={e.live ? '#a5d6ff' : '#484f58'}>{e.val}</T><T c="#e6edf3">,</T></>,
    <>&nbsp;&nbsp;<T c="#79c0ff">subject</T><T c="#e6edf3">{' : '}</T><T c={s.live ? '#a5d6ff' : '#484f58'}>{s.val}</T><T c="#e6edf3">,</T></>,
    <>&nbsp;&nbsp;<T c="#79c0ff">message</T><T c="#e6edf3">{': '}</T><T c={m.live ? '#a5d6ff' : '#484f58'}>{m.val}</T><T c="#e6edf3">,</T></>,
    <>&nbsp;&nbsp;<T c="#79c0ff">to</T><T c="#e6edf3">{'      : '}</T><T c="#a5d6ff">{"\"santoshkumar90101s@gmail.com\""}</T><T c="#e6edf3">,</T></>,
    <><T c="#ff7b72">{'};'}</T></>,
    null,
    <><T c="#d2a8ff">await</T><T c="#e6edf3">{' sendMail('}</T><T c="#ffa657">msg</T><T c="#e6edf3">{')'}</T><T c="#8b949e">{';  // nodemailer ✓'}</T></>,
    null,
    status === 'sent'
      ? <><T c="#3fb950">{'// ✓ Message delivered successfully!'}</T></>
      : status === 'sending'
      ? <><T c="#ffa657">{'// ⟳ Sending...'}</T></>
      : status === 'error'
      ? <><T c="#f85149">{'// ✗ Send failed — check console'}</T></>
      : <><T c="#8b949e">{'// status: waiting for input'}</T></>,
  ];

  return (
    <div style={{
      background: '#0d1117',
      padding: '18px 22px',
      fontFamily: MONO,
      fontSize: 13,
      lineHeight: 2,
      letterSpacing: 0.1,
      flex: 1,
      overflowX: 'auto',
      overflowY: 'auto',
    }}>
      {lines.map((line, i) =>
        line === null
          ? <div key={i} style={{ height: 8 }} />
          : (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ color: '#30363d', minWidth: 18, textAlign: 'right', userSelect: 'none', fontSize: 11, paddingTop: 2 }}>
                {i + 1}
              </span>
              <div style={{ flex: 1 }}>{line}</div>
            </div>
          )
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════════ */
export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [status,  setStatus]  = useState('idle');   // idle | sending | sent | error
  const [errMsg,  setErrMsg]  = useState('');
  const [focused, setFocused] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');
    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Gmail-style input styling
  const gmailInputStyle = field => ({
    width: '100%',
    padding: '8px 0',
    fontSize: 14,
    fontWeight: 400,
    border: 'none',
    borderBottom: `1px solid ${focused === field ? '#d3d3d3' : 'transparent'}`,
    outline: 'none',
    background: 'transparent',
    color: '#202124',
    fontFamily: 'Roboto, Arial, sans-serif',
    transition: 'border-color 0.2s',
    resize: 'none',
  });

  const gmailLabelStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: '#5f6368',
    fontFamily: 'Roboto, Arial, sans-serif',
    minWidth: 40,
    paddingRight: 12,
  };

  return (
    <section id="contact" style={{ padding: '96px 0', backgroundColor: '#fafafa', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <Reveal>
          <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
            // let's connect
          </p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#000', marginBottom: 12 }}>
            Get In <span style={{ color: '#16a34a' }}>Touch</span>
          </h2>
          <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 480, lineHeight: 1.7, marginBottom: 6 }}>
            Let's work together to bring your ideas to life. Always open to new opportunities.
          </p>
          <div style={{ width: 48, height: 4, background: '#16a34a', borderRadius: 99, marginBottom: 48 }} />
        </Reveal>

        {/* ── Top row: contact info cards ── */}
        <Reveal delay={0.05}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 36 }}>
            {[
              { Icon: FiMail,   label: 'Email',   value: 'santoshkumar90101s@gmail.com', href: 'mailto:santoshkumar90101s@gmail.com' },
              { Icon: FiPhone,  label: 'Phone',   value: '+91 8639081207',               href: 'tel:+918639081207' },
              { Icon: FiMapPin, label: 'Address', value: 'Bhimavaram, Andhra Pradesh',   href: null },
            ].map(item => (
              <div
                key={item.label}
                className="card-lift"
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: '1.5px solid #e5e7eb', borderRadius: 6, background: '#fff', transition: 'border-color 0.22s', cursor: item.href ? 'pointer' : 'default' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#16a34a'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
              >
                <div style={{ width: 38, height: 38, borderRadius: 4, border: '1.5px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', flexShrink: 0 }}>
                  <item.Icon size={16} />
                </div>
                <div>
                  <p style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} style={{ fontSize: 12, fontWeight: 600, color: '#000', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#16a34a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#000'}
                      >{item.value}</a>
                    : <p style={{ fontSize: 12, fontWeight: 600, color: '#000' }}>{item.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Main 2-col: form LEFT, code preview RIGHT ── */}
        <div className="contact-main-grid">

          {/* ── LEFT: Gmail-style Form ── */}
          <Reveal variant="left">
            <div style={{ 
              background: '#fff', 
              borderRadius: 8, 
              boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              maxWidth: 680,
            }}>
              {/* Gmail Header */}
              <div style={{ 
                background: '#404040', 
                color: '#fff', 
                padding: '12px 24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontFamily: 'Roboto, Arial, sans-serif',
              }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>New Message</span>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* To field */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px 24px', 
                  borderBottom: '1px solid #e5e5e5',
                  minHeight: 46,
                }}>
                  <label style={gmailLabelStyle}>To</label>
                  <input 
                    type="text" 
                    value="santoshkumar90101s@gmail.com"
                    disabled
                    style={{
                      ...gmailInputStyle('to'),
                      color: '#5f6368',
                      cursor: 'not-allowed',
                      borderBottom: 'none',
                    }}
                  />
                </div>

                {/* From (Name + Email combined) */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px 24px', 
                  borderBottom: '1px solid #e5e5e5',
                  minHeight: 46,
                }}>
                  <label style={gmailLabelStyle}>From</label>
                  <div style={{ display: 'flex', gap: 8, width: '100%', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange}
                      onFocus={() => setFocused('name')} 
                      onBlur={() => setFocused('')}
                      placeholder="Your name" 
                      required 
                      style={{
                        ...gmailInputStyle('name'),
                        flex: 1,
                        borderBottom: 'none',
                      }}
                    />
                    <span style={{ color: '#5f6368', fontSize: 14 }}>&lt;</span>
                    <input 
                      type="email" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange}
                      onFocus={() => setFocused('email')} 
                      onBlur={() => setFocused('')}
                      placeholder="your@email.com" 
                      required 
                      style={{
                        ...gmailInputStyle('email'),
                        flex: 2,
                        borderBottom: 'none',
                      }}
                    />
                    <span style={{ color: '#5f6368', fontSize: 14 }}>&gt;</span>
                  </div>
                </div>

                {/* Subject field */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px 24px', 
                  borderBottom: '1px solid #e5e5e5',
                  minHeight: 46,
                }}>
                  <label style={gmailLabelStyle}>Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={form.subject} 
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')} 
                    onBlur={() => setFocused('')}
                    placeholder="" 
                    required 
                    style={{
                      ...gmailInputStyle('subject'),
                      borderBottom: 'none',
                    }}
                  />
                </div>

                {/* Message body */}
                <div style={{ padding: '16px 24px', minHeight: 280 }}>
                  <textarea 
                    name="message" 
                    value={form.message} 
                    onChange={handleChange}
                    onFocus={() => setFocused('message')} 
                    onBlur={() => setFocused('')}
                    placeholder="Type your message here..."
                    required 
                    style={{
                      ...gmailInputStyle('message'),
                      minHeight: 240,
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                {/* Status messages */}
                {status === 'error' && (
                  <div style={{ 
                    margin: '0 24px 16px', 
                    padding: '12px 16px', 
                    background: '#fce8e6', 
                    border: '1px solid #f4c7c3', 
                    borderRadius: 4, 
                    fontSize: 13, 
                    color: '#c5221f',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <FiAlertCircle size={16} /> {errMsg}
                  </div>
                )}
                {status === 'sent' && (
                  <div style={{ 
                    margin: '0 24px 16px', 
                    padding: '12px 16px', 
                    background: '#e6f4ea', 
                    border: '1px solid #a8dab5', 
                    borderRadius: 4, 
                    fontSize: 13, 
                    color: '#137333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <FiCheckCircle size={16} /> Message sent successfully!
                  </div>
                )}

                {/* Footer with Send button */}
                <div style={{ 
                  padding: '12px 24px 16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                }}>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      padding: '8px 24px',
                      borderRadius: 4,
                      border: 'none',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      background: status === 'sent' ? '#188038' : '#1a73e8',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: 'Roboto, Arial, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      opacity: status === 'sending' ? 0.7 : 1,
                      transition: 'background 0.2s, box-shadow 0.2s',
                      boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
                    }}
                    onMouseEnter={e => {
                      if (status !== 'sending') {
                        e.currentTarget.style.background = status === 'sent' ? '#137333' : '#1765cc';
                        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)';
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = status === 'sent' ? '#188038' : '#1a73e8';
                      e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)';
                    }}
                  >
                    {status === 'sending' && (
                      <>
                        <span style={{ 
                          display:'inline-block', 
                          width:14, 
                          height:14, 
                          border:'2px solid rgba(255,255,255,0.3)', 
                          borderTopColor:'#fff', 
                          borderRadius:'50%', 
                          animation:'spin 0.7s linear infinite' 
                        }} />
                        Sending...
                      </>
                    )}
                    {status === 'sent' && (
                      <>
                        <FiCheckCircle size={16} />
                        Sent
                      </>
                    )}
                    {(status === 'idle' || status === 'error') && (
                      <>
                        Send
                        <FiSend size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>

          {/* ── RIGHT: Live code preview ── */}
          <Reveal variant="right">
            <div style={{ border: '1.5px solid #21262d', borderRadius: 6, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.18)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Dark header */}
              <div style={{ background: '#161b22', borderBottom: '1px solid #21262d', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                </div>
                <FiTerminal size={11} color="#8b949e" style={{ marginLeft: 4 }} />
                <span style={{ fontSize: 11, fontFamily: MONO, color: '#8b949e' }}>message.js</span>
              </div>
              <CodePreview form={form} status={status} />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 968px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
