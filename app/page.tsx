"use client";

import { ArrowDownRight, ArrowUpRight, Heart, Menu, Play, Sparkles, X } from "lucide-react";
import { useState } from "react";

const programs = [
  { number: "01", title: "Learning that lasts", text: "After-school learning, digital access, and mentoring so every child can choose their own future.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85" },
  { number: "02", title: "Health, close to home", text: "Preventive health care and nutrition support designed with women, families, and frontline workers.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85" },
  { number: "03", title: "Women build momentum", text: "Skills, savings circles, and enterprise support that turn capability into lasting independence.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85" }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <main>
    <header className="header">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark"><i></i><i></i><i></i></span><span>Aarunya<br/>Foundation</span></a>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <a href="#about" onClick={closeMenu}>About us</a><a href="#work" onClick={closeMenu}>Our work</a><a href="#stories" onClick={closeMenu}>Stories</a><a href="#contact" onClick={closeMenu}>Contact</a>
        <button className="donate small" onClick={() => { closeMenu(); setModalOpen(true); }}>Donate <ArrowUpRight size={15}/></button>
      </nav>
      <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <button className="donate desktop" onClick={() => setModalOpen(true)}>Donate <ArrowUpRight size={15}/></button>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy"><p className="eyebrow">ROOTED IN POSSIBILITY</p><h1>Every future<br/>deserves a <em>beginning.</em></h1><p className="intro">We work alongside communities in India to create the conditions where children learn, women lead, and families thrive.</p><a className="text-link" href="#work">Explore our work <ArrowDownRight size={18}/></a></div>
      <div className="hero-visual"><img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=90" alt="Children smiling together outdoors"/><div className="impact-stamp"><span>Since 2025</span><strong>Small steps.<br/>Shared futures.</strong></div></div>
      <div className="hero-note"><span className="line"></span><p>We believe meaningful change is built with people, not for them.</p></div>
    </section>

    <section className="statement" id="about"><div><p className="eyebrow">OUR PURPOSE</p><h2>Turning care into <em>everyday opportunity.</em></h2></div><p className="statement-text">Aarunya means the first light of day. We are a people-first foundation creating practical, locally led pathways to education, better health, and economic confidence.</p></section>

    <section className="feature" id="stories"><div className="feature-image"><img src="https://images.unsplash.com/photo-1489493585363-d694e3e0daf3?auto=format&fit=crop&w=1200&q=85" alt="Young student learning in a classroom"/><button className="play" aria-label="Play our story" onClick={() => setModalOpen(true)}><Play fill="currentColor" size={19}/></button></div><div className="feature-copy"><p className="eyebrow">ONE STORY, MANY RIPPLE EFFECTS</p><blockquote>When a girl is heard, her whole community begins to listen.</blockquote><p>Our learning circles bring together students, parents, and mentors - building the confidence to stay in school and shape what comes next.</p><a className="text-link" href="#work">Meet our programs <ArrowDownRight size={18}/></a></div></section>

    <section className="programs" id="work"><div className="section-head"><div><p className="eyebrow">WHAT WE DO</p><h2>Local action.<br/><em>Lasting change.</em></h2></div><p>We focus on the moments that can shift a life forward - and stay accountable to the people who know their communities best.</p></div><div className="program-grid">{programs.map((program) => <article className="program-card" key={program.number}><img src={program.image} alt=""/><div className="program-content"><span>{program.number}</span><h3>{program.title}</h3><p>{program.text}</p><button aria-label={`Learn about ${program.title}`} onClick={() => setModalOpen(true)}><ArrowUpRight size={19}/></button></div></article>)}</div></section>

    <section className="numbers"><div><strong>12,400<span>+</span></strong><p>children learning</p></div><div><strong>36</strong><p>community partners</p></div><div><strong>8,900<span>+</span></strong><p>women supported</p></div><div><strong>7</strong><p>districts reached</p></div></section>

    <section className="founder"><div className="founder-photo"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=850&q=85" alt="Sanjushri Ghatol, founder of Aarunya Foundation"/></div><div className="founder-copy"><p className="eyebrow">A NOTE FROM OUR FOUNDER</p><h2>Change starts when we choose to <em>show up.</em></h2><p>Aarunya began with a simple belief: the most durable answers already exist inside communities. Our role is to listen deeply, build trust, and make sure ambition has the tools to grow.</p><div className="signature"><strong>Sanjushri Ghatol</strong><span>Founder, Aarunya Foundation</span></div></div></section>

    <section className="cta" id="contact"><div className="cta-image"><img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1100&q=85" alt="Community volunteers working together"/></div><div className="cta-copy"><Sparkles size={26}/><p className="eyebrow">BUILD THE NEXT BEGINNING</p><h2>Your support<br/>can go <em>further.</em></h2><p>Join a community of people who believe every child and every woman deserves the room to flourish.</p><button className="donate light" onClick={() => setModalOpen(true)}>Give today <Heart size={16}/></button></div></section>

    <footer><a className="brand" href="#home"><span className="brand-mark"><i></i><i></i><i></i></span><span>Aarunya<br/>Foundation</span></a><div><a href="mailto:sanjushri@aarunyafoundation.org">sanjushri@aarunyafoundation.org</a><p>India · Working with purpose</p></div><div className="footer-meta"><p className="copyright">© 2025 Aarunya Foundation</p><div className="legal-links"><a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=8fdb28a0-8491-4a33-9a63-92f5b6f118ef" target="_blank" rel="noreferrer">Privacy Policy</a><a href="https://wellbeingintl.org/cookie-policy/" target="_blank" rel="noreferrer">Cookie Policy</a><a href="https://wellbeingintl.org/disclaimer/" target="_blank" rel="noreferrer">Disclaimer</a><a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=fdec8e54-d3ac-4678-86cc-07fab0c531e1" target="_blank" rel="noreferrer">Terms of Use</a></div></div></footer>

    {modalOpen && <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close"><X/></button><span className="brand-mark"><i></i><i></i><i></i></span><h2>Thank you for caring.</h2><p>We are preparing our secure giving page. To get involved today, please write to Sanjushri and our team will be in touch.</p><a href="mailto:sanjushri@aarunyafoundation.org" className="donate">Email the foundation <ArrowUpRight size={16}/></a></div></div>}
  </main>;
}
