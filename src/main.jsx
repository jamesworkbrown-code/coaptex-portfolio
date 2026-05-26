import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Code2,
  Mail,
  ShieldCheck,
  Quote,
  Star,
  Users,
} from 'lucide-react';
import './styles.css';

/* ─── data ──────────────────────────────────────────────────── */

const processSteps = [
  {
    eyebrow: 'Start with clarity',
    title: 'Partnership alignment',
    text: 'We clarify the collaboration structure, availability, communication expectations, and opportunity targets before starting.',
    icon: Users,
  },
  {
    eyebrow: 'Organized around your time',
    title: 'Interview scheduling support',
    text: 'We help organize remote opportunities, prepare discussions, and coordinate interviews around your free time.',
    icon: CalendarDays,
  },
  {
    eyebrow: 'Senior delivery team',
    title: 'Technical execution',
    text: 'After work is secured, our senior developers support backend, cloud, AI, frontend, debugging, maintenance, and delivery.',
    icon: Code2,
  },
  {
    eyebrow: 'Reliable ongoing support',
    title: 'Long-term operation',
    text: 'You focus on communication and relationships while our team keeps the technical workload moving reliably behind the scenes.',
    icon: ShieldCheck,
  },
];

const teamMembers = [
  {
    name: 'Daniel Chen',
    nationality: 'Chinese Developer',
    role: 'Backend & Cloud Architect',
    experience: '10+ years',
    specialty: 'Backend systems, cloud infrastructure, and API reliability',
    image: '/team/daniel-chen.jpg',
    summary: 'Leads backend architecture, cloud infrastructure, API design, and production reliability for complex client systems.',
    skills: ['Java', 'Spring Boot', 'Python', 'AWS', 'Kubernetes', 'Microservices'],
    details: [
      'Designed scalable backend services for high-traffic product platforms.',
      'Improved deployment reliability with containerized cloud workflows.',
      'Strong experience in API integration, security, and performance tuning.',
    ],
  },
  {
    name: 'Haruto Sato',
    nationality: 'Japanese Developer',
    role: 'Frontend & Product Engineer',
    experience: '8+ years',
    specialty: 'React product interfaces, dashboards, and design systems',
    image: '/team/haruto-sato.jpg',
    summary: 'Builds polished user interfaces, dashboards, admin panels, and customer-facing product experiences.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'UI Systems', 'Dashboards'],
    details: [
      'Created responsive interfaces for SaaS and business platforms.',
      'Built reusable component systems for faster product delivery.',
      'Focuses on clean UI, clear user flows, and maintainable frontend code.',
    ],
  },
  {
    name: 'Minh Nguyen',
    nationality: 'Vietnamese Developer',
    role: 'AI & Automation Engineer',
    experience: '7+ years',
    specialty: 'Python automation, AI-assisted tools, and data workflows',
    image: '/team/minh-nguyen.jpg',
    summary: 'Develops AI-assisted tools, automation workflows, data services, and backend integrations for modern operations.',
    skills: ['Python', 'FastAPI', 'LLM Integration', 'Automation', 'PostgreSQL', 'APIs'],
    details: [
      'Built automation pipelines that reduced repetitive operational work.',
      'Integrated AI features into backend and frontend products.',
      'Experienced with data handling, async services, and API orchestration.',
    ],
  },
  {
    name: 'Li Wei',
    nationality: 'Chinese Developer',
    role: 'Full Stack Delivery Engineer',
    experience: '9+ years',
    specialty: 'Full stack delivery, debugging, and long-term maintenance',
    image: '/team/li-wei.jpg',
    summary: 'Handles end-to-end feature delivery, production debugging, client-request implementation, and long-term product maintenance.',
    skills: ['Node.js', 'React', 'SQL', 'Docker', 'CI/CD', 'Debugging'],
    details: [
      'Delivered full stack features across frontend, backend, and database layers.',
      'Provides strong debugging support for urgent production and client issues.',
      'Maintains stable delivery across long-term partnership projects.',
    ],
  },
];

const testimonials = [
  {
    quote: 'I was confident handling client communication, but larger technical projects required deeper engineering support. Coaptex helped review requirements, prepare technical explanations, and support implementation after the project was secured.',
    name: 'Client-Facing Partner',
    company: 'Independent Consultant',
    result: 'Project acquisition support',
    details: ['Reviewed client requirements before commitment', 'Prepared clear technical talking points', 'Supported engineering delivery after approval'],
  },
  {
    quote: 'Before working with Coaptex, I usually avoided backend and cloud infrastructure projects. With their technical support, I could speak with clients more professionally while their engineers planned and executed the implementation.',
    name: 'Business Development Partner',
    company: 'Remote Service Consultant',
    result: 'Technical confidence support',
    details: ['Supported client technical conversations', 'Prepared implementation plans and delivery scope', 'Expanded the range of projects I could pursue'],
  },
  {
    quote: 'The partnership worked because responsibilities were clear from the beginning. I focused on communication, client relationships, and coordination, while their senior developers supported architecture, coding, debugging, and delivery.',
    name: 'Operations Partner',
    company: 'Digital Services Team',
    result: 'Shared delivery model',
    details: ['Partner handled client communication', 'Team supported technical execution', 'Maintained organized long-term collaboration'],
  },
  {
    quote: 'As a junior developer, I could not manage the full project alone. Coaptex helped me understand client requirements, set realistic timelines, and complete the technical work with senior-level guidance.',
    name: 'Junior Developer Partner',
    company: 'Freelance Web Projects',
    result: 'Senior technical support',
    details: ['Guided project understanding', 'Helped estimate delivery timelines', 'Improved implementation quality'],
  },
  {
    quote: 'I had access to client opportunities, but I needed a reliable technical team behind me. Coaptex supported proposal preparation, technical scoping, development, testing, and delivery so I could focus on communication and relationships.',
    name: 'Sales Partner',
    company: 'Software Project Consultant',
    result: 'Opportunity-to-delivery support',
    details: ['Supported proposal preparation', 'Handled technical scoping and planning', 'Created stronger client confidence'],
  },
  {
    quote: 'The biggest value was not feeling alone when discussing technical projects. Their team prepared me before client calls, explained risks clearly, and supported the actual development process once the project started.',
    name: 'Non-Technical Partner',
    company: 'Client Acquisition Partner',
    result: 'Technical backing for non-engineers',
    details: ['Prepared client-call talking points', 'Explained technical risks clearly', 'Provided delivery support after project start'],
  },
];

const processDotAngles = [-72, -24, 24, 72];

/* ─── scroll-reveal hook ────────────────────────────────────── */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─── ProcessSection ────────────────────────────────────────── */

function ProcessSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerRef, headerVisible] = useReveal(0.2);

  useEffect(() => {
    const updateActiveStep = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      const nextIndex = Math.min(processSteps.length - 1, Math.max(0, Math.round(progress * (processSteps.length - 1))));
      setActiveIndex(nextIndex);
    };
    updateActiveStep();
    window.addEventListener('scroll', updateActiveStep, { passive: true });
    window.addEventListener('resize', updateActiveStep);
    return () => {
      window.removeEventListener('scroll', updateActiveStep);
      window.removeEventListener('resize', updateActiveStep);
    };
  }, []);

  const activeStep = processSteps[activeIndex];
  const ActiveIcon = activeStep.icon;
  const activeAngle = processDotAngles[activeIndex];
  const progressWidth = `${((activeIndex + 1) / processSteps.length) * 100}%`;

  return (
    <section className="process-section" id="process" ref={sectionRef}>
      <div className="process-sticky">
        <div className="process-stage">
          <div className="process-orbit-wrap" aria-hidden="true">
            <div className="process-orbit outer" />
            <div className="process-orbit dashed" />
            <div className="process-orbit glow" />

            <span
              className="process-needle"
              style={{ transform: `translateY(-50%) rotate(${activeAngle}deg)` }}
            />
            <span className="process-needle-center" />

            {processSteps.map((step, index) => {
              const angle = processDotAngles[index];
              const radians = (angle * Math.PI) / 180;
              const radius = 320;
              const x = Math.cos(radians) * radius;
              const y = Math.sin(radians) * radius;
              const isActive = index === activeIndex;
              return (
                <span
                  className={`process-orbit-number${isActive ? ' active' : ''}`}
                  key={step.title}
                  style={{ transform: `translate(${x - 34}px, ${y - 34}px)` }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              );
            })}

            <div className="active-step-card">
              <span>Active step</span>
              <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
            </div>
          </div>

          <div className="process-content-panel" ref={headerRef}>
            <p className={`process-kicker reveal${headerVisible ? ' visible' : ''}`}>How the partnership works</p>
            <h2 className={`reveal reveal-delay-1${headerVisible ? ' visible' : ''}`}>One clear stage at a time.</h2>

            <article className="process-focus-card" key={activeStep.title}>
              <div className="process-focus-top">
                <div>
                  <span>{activeStep.eyebrow}</span>
                  <h3>{activeStep.title}</h3>
                </div>
                <div className="process-focus-icon">
                  <ActiveIcon size={36} />
                </div>
              </div>
              <p>{activeStep.text}</p>
              <div className="process-progress">
                <span style={{ width: progressWidth }} />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TeamSection ───────────────────────────────────────────── */

function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [animKey, setAnimKey] = useState(0);
  const [headerRef, headerVisible] = useReveal(0.2);
  const member = teamMembers[activeIndex];

  const navigate = useCallback((dir) => {
    setDirection(dir);
    setAnimKey((k) => k + 1);
    setActiveIndex((curr) =>
      dir === 'next'
        ? (curr + 1) % teamMembers.length
        : (curr - 1 + teamMembers.length) % teamMembers.length
    );
  }, []);

  return (
    <section className="team-section" id="team">
      <div className="section-shell">
        <div className="section-heading team-heading" ref={headerRef}>
          <p className={`reveal${headerVisible ? ' visible' : ''}`}>Our team</p>
          <h2 className={`reveal reveal-delay-1${headerVisible ? ' visible' : ''}`}>Meet the developers behind the delivery</h2>
        </div>

        <div className="team-showcase">
          <article
            className={`team-details team-slide-${direction}`}
            key={`details-${animKey}`}
          >
            <span className="team-count">{String(activeIndex + 1).padStart(2, '0')} / {String(teamMembers.length).padStart(2, '0')}</span>
            <p className="team-nationality">{member.nationality}</p>
            <h3>{member.name}</h3>
            <h4>{member.role}</h4>
            <p className="team-summary">{member.summary}</p>

            <div className="team-meta-grid">
              <div><span>Experience</span><strong>{member.experience}</strong></div>
              <div><span>Specialty</span><strong>{member.specialty}</strong></div>
            </div>

            <div className="team-skills">
              {member.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="team-detail-list">
              {member.details.map((item) => (
                <p key={item}><CheckCircle2 size={17} />{item}</p>
              ))}
            </div>
          </article>

          <div className="team-photo-panel">
            <div className="team-photo-frame" key={`photo-${animKey}`}>
              <img src={member.image} alt={`${member.name}, ${member.role}`} />
              <div className="team-photo-caption">
                <span>{member.nationality}</span>
                <strong>{member.role}</strong>
              </div>
            </div>

            <div className="team-controls">
              <div className="team-dots">
                {teamMembers.map((person, index) => (
                  <button
                    key={person.name}
                    className={index === activeIndex ? 'active' : ''}
                    onClick={() => {
                      setDirection(index > activeIndex ? 'next' : 'prev');
                      setAnimKey((k) => k + 1);
                      setActiveIndex(index);
                    }}
                    aria-label={`Show ${person.name}`}
                  />
                ))}
              </div>

              <div className="team-arrows">
                <button onClick={() => navigate('prev')} aria-label="Previous team member"><ArrowLeft size={18} /></button>
                <button onClick={() => navigate('next')} aria-label="Next team member"><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PartnerTestimonials ───────────────────────────────────── */

function PartnerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [animKey, setAnimKey] = useState(0);
  const [headerRef, headerVisible] = useReveal(0.2);
  const testimonial = testimonials[activeIndex];

  const navigate = useCallback((dir) => {
    setDirection(dir);
    setAnimKey((k) => k + 1);
    setActiveIndex((curr) =>
      dir === 'next'
        ? (curr + 1) % testimonials.length
        : (curr - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  return (
    <section className="testimonial-section" id="testimonials">
      <div className="testimonial-bg-grid" />
      <div className="testimonial-glow one" />
      <div className="testimonial-glow two" />

      <div className="section-shell testimonial-shell">
        <div className="testimonial-copy" ref={headerRef}>
          <p className={`testimonial-kicker reveal${headerVisible ? ' visible' : ''}`}>Partner testimonial</p>
          <h2 className={`reveal reveal-delay-1${headerVisible ? ' visible' : ''}`}>What partners consistently value during long-term technical collaboration</h2>
          <p className={`reveal reveal-delay-2${headerVisible ? ' visible' : ''}`}>
            These examples highlight what serious partners usually care about most: communication, delivery discipline, production awareness, technical ownership, and reliable long-term execution.
          </p>

          <div className={`testimonial-dots reveal reveal-delay-3${headerVisible ? ' visible' : ''}`}>
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                className={index === activeIndex ? 'active' : ''}
                onClick={() => {
                  setDirection(index > activeIndex ? 'next' : 'prev');
                  setAnimKey((k) => k + 1);
                  setActiveIndex(index);
                }}
                aria-label={`Show testimonial from ${item.name}`}
              />
            ))}
          </div>
        </div>

        <div className="testimonial-slider" aria-live="polite">
          <div className="testimonial-card-back one" />
          <div className="testimonial-card-back two" />

          <article
            className={`testimonial-card testimonial-slide-${direction}`}
            key={`tcard-${animKey}`}
          >
            <div className="testimonial-card-top">
              <div className="quote-icon"><Quote size={30} /></div>
              <div className="stars" aria-label="Five star collaboration rating">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={18} fill="currentColor" />
                ))}
              </div>
            </div>

            <p className="testimonial-quote">"{testimonial.quote}"</p>

            <div className="testimonial-result">
              <span>Measured outcome</span>
              <strong>{testimonial.result}</strong>
            </div>

            <div className="testimonial-detail-list">
              {testimonial.details.map((detail) => (
                <p key={detail}><CheckCircle2 size={17} />{detail}</p>
              ))}
            </div>

            <div className="testimonial-footer">
              <div>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.company}</p>
              </div>
              <div className="testimonial-arrows">
                <button onClick={() => navigate('prev')} aria-label="Previous testimonial"><ArrowLeft size={18} /></button>
                <button onClick={() => navigate('next')} aria-label="Next testimonial"><ArrowRight size={18} /></button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ─── ContactForm ───────────────────────────────────────────── */

// ⚠️  Replace YOUR_FORM_ID with the 8-character ID from formspree.io
const FORMSPREE_ID = 'xlgvwjrb';

const emptyFields = { name: '', email: '', subject: '', message: '' };

function ContactForm({ contactVisible }) {
  const [fields, setFields] = useState(emptyFields);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState(''); // spam trap — must stay empty

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Honeypot check — bots fill this, humans don't
    if (honeypot) {
      setStatus('success'); // silently discard
      setFields(emptyFields);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'New Coaptex partnership inquiry',
          _replyto: fields.email,   // reply-to = sender's address so bounces are visible
          _gotcha: honeypot,        // Formspree's native honeypot field
          ...fields,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFields(emptyFields);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data?.errors?.map((e) => e.message).join(', ') || 'Something went wrong. Please try again.';
        setErrorMsg(msg);
        setStatus('error');
      }
    } catch {
      setErrorMsg('Could not send — check your internet connection and try again.');
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  if (status === 'success') {
    return (
      <div className={`contact-form contact-success reveal reveal-delay-1${contactVisible ? ' visible' : ''}`}>
        <div className="contact-success-icon">
          <CheckCircle2 size={38} />
        </div>
        <h3>Message sent</h3>
        <p>Thanks for reaching out. We typically respond within 24 hours.</p>
        <button className="contact-reset-btn" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className={`contact-form reveal reveal-delay-1${contactVisible ? ' visible' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="contact-form-row">
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={fields.name}
            onChange={handleChange}
            required
            disabled={sending}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={handleChange}
            required
            disabled={sending}
          />
        </label>
      </div>

      <label>
        <span>Subject</span>
        <input
          name="subject"
          type="text"
          placeholder="Partnership inquiry"
          value={fields.subject}
          onChange={handleChange}
          required
          disabled={sending}
        />
      </label>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          placeholder="Tell us what you need help with, your timeline, and how you prefer to communicate."
          value={fields.message}
          onChange={handleChange}
          required
          disabled={sending}
        />
      </label>

      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="_gotcha"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="contact-honeypot"
      />

      {status === 'error' && (
        <p className="contact-form-error" role="alert">{errorMsg}</p>
      )}

      <button type="submit" disabled={sending} className={sending ? 'sending' : ''}>
        {sending ? (
          <>
            <span className="contact-spinner" />
            Sending…
          </>
        ) : (
          <>Send Message <Mail size={16} /></>
        )}
      </button>
    </form>
  );
}

/* ─── App ───────────────────────────────────────────────────── */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // header shrink on scroll
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // hero reveal refs
  const [heroRef, heroVisible] = useReveal(0.01);
  const [contactRef, contactVisible] = useReveal(0.1);

  return (
    <>
      <header className={`site-header${headerScrolled ? ' scrolled' : ''}`}>
        <a href="#home" className="brand">
          <span className="brand-mark">C</span>
          <span>Coaptex</span>
        </a>

        <nav>
          <a href="#process">Process</a>
          <a href="#team">Team</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="small-button">Contact Us</a>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </header>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#process" onClick={closeMenu}>Process</a>
        <a href="#team" onClick={closeMenu}>Team</a>
        <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
        <a href="#contact" className="mobile-nav-cta" onClick={closeMenu}>Contact Us</a>
      </nav>

      <main>
        <section className="hero dark-hero" id="home" ref={heroRef}>
          <div className="hero-bg-blur" />
          <div className="hero-dark-overlay" />
          <div className="hero-noise" />

          <div className="hero-inner">
            <div className="hero-left">
              <p className={`eyebrow hero-reveal hero-reveal-1${heroVisible ? ' visible' : ''}`}>Built for serious partnerships</p>
              <h1 className={`hero-reveal hero-reveal-2${heroVisible ? ' visible' : ''}`}>Transparent technical execution for serious partnerships</h1>
              <p className={`hero-subtitle hero-reveal hero-reveal-3${heroVisible ? ' visible' : ''}`}>
                Senior engineers building reliable backend, cloud, AI, and product systems.
              </p>
              <div className={`hero-actions hero-reveal hero-reveal-4${heroVisible ? ' visible' : ''}`}>
                <a href="#contact" className="primary-button dark-primary">
                  Start Partnership <ArrowRight size={16} />
                </a>
                <a href="#process" className="secondary-link dark-link">
                  View Collaboration Model
                </a>
              </div>
            </div>

            <div className={`hero-visual hero-reveal hero-reveal-3${heroVisible ? ' visible' : ''}`} aria-hidden="true">
              <div className="portrait-frame">
                <img src="/hero-founder.png" alt="" />
              </div>
            </div>

            <div className={`hero-right hero-reveal hero-reveal-4${heroVisible ? ' visible' : ''}`}>
              <div className="snapshot-card dark-snapshot">
                <span className="snapshot-label">Operational snapshot</span>
                <h3>Built for trust</h3>
                <div className="snapshot-list dark-snapshot-list">
                  <div><strong>15+</strong><span>Years of combined engineering experience</span></div>
                  <div><strong>4</strong><span>Core disciplines: backend, cloud, AI, frontend</span></div>
                  <div><strong>24h</strong><span>Typical response expectation</span></div>
                  <div><strong>100%</strong><span>Built for transparent technical collaboration</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />
        <TeamSection />
        <PartnerTestimonials />
      </main>

      <footer className="footer contact-footer" id="contact">
        <div className="contact-shell" ref={contactRef}>
          <div className={`contact-copy reveal${contactVisible ? ' visible' : ''}`}>
            <p className="contact-kicker">Contact</p>
            <h2>Send us a message</h2>
            <p>
              Share your goals, availability, and the type of technical support you need. Your message will be sent directly to our team.
            </p>
            <div className="contact-email-card">
              <span>Email</span>
              <a href="mailto:danieldean1004@gmail.com">danieldean1004@gmail.com</a>
              <small>Typical response within 24 hours.</small>
            </div>
          </div>

          <ContactForm contactVisible={contactVisible} />
        </div>

        <div className="contact-bottom">
          <span>© 2026 Coaptex. Remote-first technical collaboration.</span>
          <div>
            <a href="#team">Team</a>
            <a href="#testimonials">Testimonials</a>
            <a href="mailto:danieldean1004@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
