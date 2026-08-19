"use client";

import { ArrowDownRight, ArrowUpRight, Heart, Mail, Menu, Play, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactForm from "./components/ContactForm";
import { supabase } from "../lib/supabase";
const programs = [
  { number: "01", title: "Learning that lasts", text: "After-school learning, digital access, and mentoring so every child can choose their own future.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85" },
  { number: "02", title: "Health, close to home", text: "Preventive health care and nutrition support designed with women, families, and frontline workers.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85" },
  { number: "03", title: "Women build momentum", text: "Skills, savings circles, and enterprise support that turn capability into lasting independence.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85" }
];

function Brand() {
  return <><span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i><b></b></span><span>Sanjushri<br/><strong>Foundation</strong></span></>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clothesModalOpen, setClothesModalOpen] = useState(false);
  const [booksModalOpen, setBooksModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [suppliesModalOpen, setSuppliesModalOpen] = useState(false);
  const [moneyModalOpen, setMoneyModalOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  useEffect(() => {
  if (!supabase) return;

  supabase.auth.getSession().then(({ data }) => {
    setUser(data.session?.user ?? null);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  const storyVideo = useRef<HTMLVideoElement>(null);
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  const { error } = await supabase!.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setError(error.message);
  } else {
    setAuthOpen(false);
    setEmail("");
    setPassword("");
  }

  setLoading(false);
};
  const closeMenu = () => setMenuOpen(false);
  const playStory = async () => {
    if (!storyVideo.current) return;
    try { await storyVideo.current.play(); setVideoPlaying(true); } catch { setModalOpen(true); }
  };

  return <main>
    <header className="header">
      <a className="brand" href="#home" onClick={closeMenu}><Brand /></a>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <a href="#about" onClick={closeMenu}>About us</a><a href="#work" onClick={closeMenu}>Our work</a><a href="#stories" onClick={closeMenu}>Stories</a><a href="#contact" onClick={closeMenu}>Contact</a>
        <button className="donate small" onClick={() => { closeMenu(); setModalOpen(true); }}>Donate <Heart size={15}/></button>
<a
  href={user ? "/admin/donations" : "#"}
  onClick={(e) => {
    closeMenu();

    if (!user) {
      e.preventDefault();
      setAuthOpen(true);
    }
  }}
>
  Admin
</a>      </nav>
      <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <div className="header-actions">
  {!user ? (
    <button
      className="auth-button"
      onClick={() => setAuthOpen(true)}
    >
      Sign In
    </button>
  ) : (
    <button
      className="auth-button"
      onClick={async () => {
        await supabase?.auth.signOut();
      }}
    >
      Logout
    </button>
  )}

  <button
    className="donate desktop"
    onClick={() => setModalOpen(true)}
  >
    Donate <Heart size={15}/>
  </button>
</div>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy"><p className="eyebrow">ROOTED IN POSSIBILITY</p><h1>Every future<br/>deserves a <em>beginning.</em></h1><p className="intro">We work alongside communities in India to create the conditions where children learn, women lead, and families thrive.</p><a className="text-link" href="#work">Explore our work <ArrowDownRight size={18}/></a></div>
      <div className="hero-visual"><img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=90" alt="Children smiling together outdoors"/><div className="impact-stamp"><span>Since 2026</span><strong>Small steps.<br/>Shared futures.</strong></div></div>
      <div className="hero-note"><span className="line"></span><p>We believe meaningful change is built with people, not for them.</p></div>
    </section>

    <section className="statement" id="about"><div><p className="eyebrow">OUR PURPOSE</p><h2>Turning care into <em>everyday opportunity.</em></h2></div><p className="statement-text">Sanjushri Foundation is a people-first organisation creating practical, locally led pathways to education, better health, and economic confidence.</p></section>

    <section className="feature" id="stories"><div className="feature-image"><video ref={storyVideo} poster="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85" controls={videoPlaying} playsInline preload="metadata" onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)}><source src="/community-story.mp4" type="video/mp4"/>Your browser does not support video playback.</video>{!videoPlaying && <button className="play" aria-label="Play our story" onClick={playStory}><Play fill="currentColor" size={19}/></button>}</div><div className="feature-copy"><p className="eyebrow">ONE STORY, MANY RIPPLE EFFECTS</p><blockquote>When a girl is heard, her whole community begins to listen.</blockquote><p>Our learning circles bring together students, parents, and mentors - building the confidence to stay in school and shape what comes next.</p><a className="text-link" href="#work">Meet our programs <ArrowDownRight size={18}/></a></div></section>

    <section className="programs" id="work"><div className="section-head"><div><p className="eyebrow">WHAT WE DO</p><h2>Local action.<br/><em>Lasting change.</em></h2></div><p>We focus on the moments that can shift a life forward - and stay accountable to the people who know their communities best.</p></div><div className="program-grid">{programs.map((program) => <article className="program-card" key={program.number}><img src={program.image} alt=""/><div className="program-content"><span>{program.number}</span><h3>{program.title}</h3><p>{program.text}</p><button aria-label={`Learn about ${program.title}`} onClick={() => setModalOpen(true)}><ArrowUpRight size={19}/></button></div></article>)}</div></section>

    <section className="numbers"><div><strong>12,400<span>+</span></strong><p>children learning</p></div><div><strong>36</strong><p>community partners</p></div><div><strong>8,900<span>+</span></strong><p>women supported</p></div><div><strong>7</strong><p>districts reached</p></div></section>

    <section className="founder"><div className="founder-photo"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=850&q=85" alt="Sanjushri Ghatol, founder of Sanjushri Foundation"/></div><div className="founder-copy"><p className="eyebrow">A NOTE FROM OUR FOUNDER</p><h2>Change starts when we choose to <em>show up.</em></h2><p>Sanjushri Foundation began with a simple belief: the most durable answers already exist inside communities. Our role is to listen deeply, build trust, and make sure ambition has the tools to grow.</p><div className="signature"><strong>Sanjushri Ghatol</strong><span>Founder, Sanjushri Foundation</span></div></div></section>

    <section className="cta" id="contact"><div className="cta-image"><img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1100&q=85" alt="Community volunteers working together"/></div><div className="cta-copy"><Sparkles size={26}/><p className="eyebrow">BUILD THE NEXT BEGINNING</p><h2>Your support<br/>can go <em>further.</em></h2><p>Join a community of people who believe every child and every woman deserves the room to flourish.</p><button className="donate light" onClick={() => setModalOpen(true)}>Donate today <Heart size={16}/></button></div></section>
<section className="contact-section" id="contact-form">
  <div className="contact-heading">
    <p className="eyebrow">GET IN TOUCH</p>

    <h2>
      We would love to <em>hear from you.</em>
    </h2>

    <p>
      Have a question, want to collaborate, or simply want to learn more
      about our work? Send us a message.
    </p>
  </div>

  <ContactForm />
</section>
    <footer><a className="brand" href="#home"><Brand /></a><div className="footer-contact"><a href="mailto:sanjushri@sanjushrifoundation.org"><Mail size={15}/> sanjushri@sanjushrifoundation.org</a><p>India · Working with purpose</p></div><div className="footer-meta"><p className="copyright">© 2026 Sanjushri Foundation</p><div className="legal-links"><a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=8fdb28a0-8491-4a33-9a63-92f5b6f118ef" target="_blank" rel="noreferrer">Privacy Policy</a><a href="https://wellbeingintl.org/cookie-policy/" target="_blank" rel="noreferrer">Cookie Policy</a><a href="https://wellbeingintl.org/disclaimer/" target="_blank" rel="noreferrer">Disclaimer</a><a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=fdec8e54-d3ac-4678-86cc-07fab0c531e1" target="_blank" rel="noreferrer">Terms of Use</a></div></div></footer>
{authOpen && (
  <div
    className="modal-backdrop"
    role="dialog"
    aria-modal="true"
  >
    <div className="modal">
      <button
        className="modal-close"
        onClick={() => setAuthOpen(false)}
        aria-label="Close"
      >
        <X />
      </button>

      <span className="modal-icon">
        <Heart fill="currentColor" size={24} />
      </span>

      <p className="eyebrow">WELCOME BACK</p>

      <h2>Sign in to your account.</h2>

      <p>
        Sign in to stay connected with Sanjushri Foundation.
      </p>

      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="donate"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  </div>
)}
    {modalOpen && (
  <div className="modal-backdrop" role="dialog" aria-modal="true">
    <div className="modal donation-modal">

      <button
        className="modal-close"
        onClick={() => setModalOpen(false)}
        aria-label="Close"
      >
        <X />
      </button>

      <span className="modal-icon">
        <Heart fill="currentColor" size={24} />
      </span>

      <p className="eyebrow">MAKE A DIFFERENCE</p>

      <h2>How would you like to help?</h2>

      <p>
        Every contribution matters. Choose the way you'd
        like to support children, women, and families.
      </p>

      <div className="donation-options">

        <button
  className="donation-option"
  onClick={() => {
    setModalOpen(false);
    setMoneyModalOpen(true);
  }}
  
>
  <span className="donation-emoji">💰</span>

  <div>
    <strong>Donate Money</strong>
    <small>Make a financial contribution</small>
  </div>

  <ArrowUpRight size={18} />
</button>

  
        <button
  className="donation-option"
  onClick={() => {
    setModalOpen(false);
    setClothesModalOpen(true);
  }}
>
  <span className="donation-emoji">👕</span>

  <div>
    <strong>Donate Clothes</strong>
    <small>Give clothes to families in need</small>
  </div>

  <ArrowUpRight size={18} />
</button>

        <button
  className="donation-option"
  onClick={() => {
    setModalOpen(false);
    setBooksModalOpen(true);
  }}
>
  <span className="donation-emoji">📚</span>

  <div>
    <strong>Donate Books</strong>
    <small>Help children access learning materials</small>
  </div>

  <ArrowUpRight size={18} />
</button>

        <button
  className="donation-option"
  onClick={() => {
    setModalOpen(false);
    setFoodModalOpen(true);
  }}
>
  <span className="donation-emoji">🍚</span>

  <div>
    <strong>Donate Food</strong>
    <small>Support families with food supplies</small>
  </div>

  <ArrowUpRight size={18} />
</button>

        <button
  className="donation-option"
  onClick={() => {
    setModalOpen(false);
    setSuppliesModalOpen(true);
  }}
>
  <span className="donation-emoji">🎒</span>

  <div>
    <strong>School Supplies</strong>
    <small>Donate bags, stationery, and supplies</small>
  </div>

  <ArrowUpRight size={18} />
</button>
        

      </div>

      <p className="donation-note">
        Thank you for supporting Sanjushri Foundation.
      </p>

    </div>
  </div>
)}
{moneyModalOpen && (
  <div
    className="modal-backdrop"
    role="dialog"
    aria-modal="true"
  >
    <div className="modal donation-modal">

      <button
        className="modal-close"
        onClick={() => setMoneyModalOpen(false)}
        aria-label="Close"
      >
        <X />
      </button>

      <span className="modal-icon">
        <Heart fill="currentColor" size={24} />
      </span>

      <p className="eyebrow">DONATE MONEY</p>

      <h2>Choose your payment method.</h2>

      <p>
        Thank you for supporting Sanjushri Foundation.
        Choose the payment method that works best for you.
      </p>

      <div className="donation-options">

        <button
  className="donation-option"
  onClick={() => {
    alert(
      "UPI donations are coming soon. We are preparing a secure way for you to donate."
    );
  }}
>
  <span className="donation-emoji">📱</span>

  <div>
    <strong>UPI</strong>
    <small>UPI donations coming soon</small>
  </div>

  <ArrowUpRight size={18} />
</button>

        <button
  className="donation-option"
  onClick={() => {
    alert(
      "Online payments are coming soon. We are preparing a secure payment system."
    );
  }}
>
  <span className="donation-emoji">💳</span>

  <div>
    <strong>Online Payment</strong>
    <small>Online payments coming soon</small>
  </div>

  <ArrowUpRight size={18} />
</button>

        <button
  className="donation-option"
  onClick={() => {
    alert(
      "Bank transfer details are coming soon. Please contact Sanjushri Foundation for more information."
    );
  }}
>
  <span className="donation-emoji">🏦</span>

  <div>
    <strong>Bank Transfer</strong>
    <small>Bank details coming soon</small>
  </div>

  <ArrowUpRight size={18} />
</button>

      </div>

      <p className="donation-note">
        Thank you for helping us build lasting change.
      </p>

    </div>
  </div>
)}
{clothesModalOpen && (
  <div
    className="modal-backdrop"
    role="dialog"
    aria-modal="true"
  >
    <div className="modal donation-modal">

      <button
        className="modal-close"
        onClick={() => setClothesModalOpen(false)}
        aria-label="Close"
      >
        <X />
      </button>

      <span className="modal-icon">
        👕
      </span>

      <p className="eyebrow">DONATE CLOTHES</p>

      <h2>Give clothes a second life.</h2>

      <p>
        Tell us about the clothes you'd like to donate.
        We'll contact you about the next steps.
      </p>

      <form className="auth-form">

        <input
          type="text"
          placeholder="Your name"
          required
        />

        <input
          type="tel"
          placeholder="Phone number"
          required
        />

        <input
          type="text"
          placeholder="City / Location"
          required
        />

        <input
          type="text"
          placeholder="What clothes are you donating?"
          required
        />

        <input
          type="text"
          placeholder="Approximate quantity"
          required
        />

        <button
  type="button"
  className="donate"
  onClick={async (e) => {
    const form = e.currentTarget.form;

    if (!form) return;

    const inputs = form.querySelectorAll<HTMLInputElement>("input");

    const { error } = await supabase!.from("donation_requests").insert({
      type: "clothes",
      name: inputs[0]?.value || "",
      phone: inputs[1]?.value || "",
      location: inputs[2]?.value || "",
      item: inputs[3]?.value || "",
      quantity: inputs[4]?.value || "",
    });

    if (error) {
      console.error(error);
      alert("Sorry, we could not submit your donation.");
      return;
    }

    alert("Thank you! Your clothes donation request has been received.");

    setClothesModalOpen(false);
  }}
>
  Submit Donation <ArrowUpRight size={16} />
</button>

      </form>

    </div>
  </div>
)}
{booksModalOpen && (
  <div
    className="modal-backdrop"
    role="dialog"
    aria-modal="true"
  >
    <div className="modal donation-modal">

      <button
        className="modal-close"
        onClick={() => setBooksModalOpen(false)}
        aria-label="Close"
      >
        <X />
      </button>

      <span className="modal-icon">
        📚
      </span>

      <p className="eyebrow">DONATE BOOKS</p>

      <h2>Help a child discover a book.</h2>

      <p>
        Tell us about the books you'd like to donate.
        We'll contact you about the next steps.
      </p>

      <form
  className="auth-form"
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase!.from("donation_requests").insert({
      type: "books",
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      location: String(formData.get("location") || ""),
      item: String(formData.get("item") || ""),
      quantity: String(formData.get("quantity") || ""),
    });

    if (error) {
      console.error(error);
      alert("Sorry, we could not submit your donation.");
      return;
    }

    alert("Thank you! Your book donation request has been received.");
    setBooksModalOpen(false);
  }}
>

        <input
  type="text"
  name="name"
  placeholder="Your name"
  required
/>

        <input
  type="tel"
  name="phone"
  placeholder="Phone number"
  required
/>

        <input
  type="text"
  name="location"
  placeholder="City / Location"
  required
/>

        <input
  type="text"
  name="item"
  placeholder="Type of books"
  required
/>

        <input
  type="text"
  name="quantity"
  placeholder="Approximate number of books"
  required
/>

        <button
  type="submit"
  className="donate"
>
  Submit Donation <ArrowUpRight size={16} />
</button>
      </form>

    </div>
  </div>
)}
{foodModalOpen && (
  <div
    className="modal-backdrop"
    role="dialog"
    aria-modal="true"
  >
    <div className="modal donation-modal">

      <button
        className="modal-close"
        onClick={() => setFoodModalOpen(false)}
        aria-label="Close"
      >
        <X />
      </button>

      <span className="modal-icon">
        🍚
      </span>

      <p className="eyebrow">DONATE FOOD</p>

      <h2>Help provide food to families.</h2>

      <p>
        Tell us about the food you'd like to donate.
        We'll contact you about the next steps.
      </p>

      <form className="auth-form">

        <input
          type="text"
          placeholder="Your name"
          required
        />

        <input
          type="tel"
          placeholder="Phone number"
          required
        />

        <input
          type="text"
          placeholder="City / Location"
          required
        />

        <input
          type="text"
          placeholder="Type of food"
          required
        />

        <input
          type="text"
          placeholder="Approximate quantity"
          required
        />

        <button
          type="button"
          className="donate"
          onClick={() => {
            window.location.href =
              "mailto:sanjushri@sanjushrifoundation.org?subject=Food%20Donation";
          }}
        >
          Submit Donation <ArrowUpRight size={16} />
        </button>

      </form>

    </div>
  </div>
)}
{suppliesModalOpen && (
  <div
    className="modal-backdrop"
    role="dialog"
    aria-modal="true"
  >
    <div className="modal donation-modal">

      <button
        className="modal-close"
        onClick={() => setSuppliesModalOpen(false)}
        aria-label="Close"
      >
        <X />
      </button>

      <span className="modal-icon">
        🎒
      </span>

      <p className="eyebrow">SCHOOL SUPPLIES</p>

      <h2>Help a child learn with confidence.</h2>

      <p>
        Tell us about the school supplies you'd like to
        donate. We'll contact you about the next steps.
      </p>

      <form className="auth-form">

        <input
          type="text"
          placeholder="Your name"
          required
        />

        <input
          type="tel"
          placeholder="Phone number"
          required
        />

        <input
          type="text"
          placeholder="City / Location"
          required
        />

        <input
          type="text"
          placeholder="What would you like to donate?"
          required
        />

        <input
          type="text"
          placeholder="Approximate quantity"
          required
        />

        <button
          type="button"
          className="donate"
          onClick={() => {
            window.location.href =
              "mailto:sanjushri@sanjushrifoundation.org?subject=School%20Supplies%20Donation";
          }}
        >
          Submit Donation <ArrowUpRight size={16} />
        </button>

      </form>

    </div>
  </div>
)}
  </main>;
}
