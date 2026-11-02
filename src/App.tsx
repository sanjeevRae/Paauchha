import { useEffect, useMemo, useState } from 'react'

type Page = 'home' | 'about' | 'services' | 'portfolio' | 'packages' | 'contact'

const images = {
  hero: 'https://images.unsplash.com/photo-1708606811579-23b18fc48007?auto=format&fit=crop&w=2200&q=90',
  intro: 'https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?auto=format&fit=crop&w=1400&q=85',
  stage: 'https://images.unsplash.com/photo-1746739802678-93c777b6dfe6?auto=format&fit=crop&w=1400&q=85',
  table: 'https://images.unsplash.com/photo-1665607438186-7755c7f4dd30?auto=format&fit=crop&w=1400&q=85',
  traditional: 'https://images.unsplash.com/photo-1766763845190-b55806d83bb0?auto=format&fit=crop&w=1400&q=85',
  ring: 'https://images.unsplash.com/photo-1766763845041-a5c2bd49a3df?auto=format&fit=crop&w=1400&q=85',
  couple: 'https://images.unsplash.com/photo-1766763845325-1eb7488553ec?auto=format&fit=crop&w=1400&q=85',
  floral: 'https://images.unsplash.com/photo-1749309610872-af16692c5ca7?auto=format&fit=crop&w=1400&q=85',
  lights: 'https://images.unsplash.com/photo-1746044159204-1c0dc41802ea?auto=format&fit=crop&w=1400&q=85',
  ceremony: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1600&q=85',
  gala: 'https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?auto=format&fit=crop&w=1400&q=85',
  modern: 'https://images.unsplash.com/photo-1557136743-49acf41a781c?auto=format&fit=crop&w=1400&q=85',
  green: 'https://images.unsplash.com/photo-1785336872765-3e157524b736?auto=format&fit=crop&w=1600&q=85',
  reception: 'https://images.unsplash.com/photo-1780901049024-8e504f6024a8?auto=format&fit=crop&w=1600&q=85',
}

const services = [
  { title: 'Wedding Decoration', desc: 'Immersive settings that turn your wedding story into a world of its own.', image: images.hero },
  { title: 'Engagement & Reception', desc: 'Refined stages, florals, and intimate details for your beautiful beginning.', image: images.stage },
  { title: 'Birthday Celebrations', desc: 'Artful, joyful environments designed around the guest of honour.', image: images.floral },
  { title: 'Corporate Events', desc: 'Polished brand experiences that feel memorable, elevated, and purposeful.', image: images.gala },
  { title: 'Traditional Events', desc: 'Culturally rooted celebrations styled with care and contemporary elegance.', image: images.traditional },
  { title: 'Custom Event Styling', desc: 'A fully bespoke concept created from your vision, venue, and personality.', image: images.green },
]

const projects = [
  { id: 1, name: 'Royal Wedding Celebration', category: 'Weddings', location: 'Kathmandu', image: images.hero, tall: true },
  { id: 2, name: 'An Evening in Bloom', category: 'Engagements', location: 'Lalitpur', image: images.stage },
  { id: 3, name: 'The Marigold Vows', category: 'Traditional Events', location: 'Bhaktapur', image: images.traditional },
  { id: 4, name: 'Champagne Garden', category: 'Weddings', location: 'Kathmandu', image: images.table },
  { id: 5, name: 'Midnight Gala', category: 'Corporate Events', location: 'Soaltee, Kathmandu', image: images.gala, tall: true },
  { id: 6, name: 'A Golden Beginning', category: 'Engagements', location: 'Kathmandu', image: images.ring },
  { id: 7, name: 'Forest of Light', category: 'Birthdays', location: 'Godavari', image: images.green },
  { id: 8, name: 'Heritage Romance', category: 'Traditional Events', location: 'Patan', image: images.couple, tall: true },
]

const packages = [
  { name: 'Essential', for: 'Intimate celebrations', desc: 'Thoughtful styling for smaller, meaningful gatherings.', items: ['Concept direction', 'Signature backdrop', 'Welcome styling', 'Basic florals', 'On-site setup'] },
  { name: 'Classic', for: 'Engagements & receptions', desc: 'A complete visual story with polished, cohesive details.', items: ['Custom moodboard', 'Premium stage design', 'Guest table styling', 'Floral installations', 'Lighting coordination'], featured: true },
  { name: 'Premium', for: 'Weddings & grand events', desc: 'A highly immersive environment, curated from entrance to stage.', items: ['Bespoke event concept', 'Venue-wide styling', 'Luxury florals', 'Custom structures', 'Dedicated design lead'] },
  { name: 'Custom', for: 'One-of-a-kind visions', desc: 'No template. No limits. A celebration designed entirely around you.', items: ['Tailored scope', 'Multi-event styling', 'Destination planning', 'Custom fabrication', 'Full creative direction'] },
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z" />,
    spark: <><path d="m12 3-1.4 4.2a5 5 0 0 1-3.2 3.2L3 12l4.4 1.6a5 5 0 0 1 3.2 3.2L12 21l1.4-4.2a5 5 0 0 1 3.2-3.2L21 12l-4.4-1.6a5 5 0 0 1-3.2-3.2L12 3Z" /></>,
    flower: <><circle cx="12" cy="12" r="2" /><path d="M12 10c-4-1-4-7 0-7s4 6 0 7ZM14 12c1-4 7-4 7 0s-6 4-7 0ZM12 14c4 1 4 7 0 7s-4-6 0-7ZM10 12c-1 4-7 4-7 0s6-4 7 0Z" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" />,
    map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    quote: <path d="M10 11H6a4 4 0 0 0-4 4v5h8v-9Zm12 0h-4a4 4 0 0 0-4 4v5h8v-9Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" /></>,
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`logo ${light ? 'logo-light' : ''}`}><span className="logo-mark">P</span><span><b>Paauchha</b><small>DECOR & EVENTS</small></span></div>
}

function Button({ children, variant = 'primary', onClick, href }: { children: React.ReactNode; variant?: 'primary' | 'light' | 'outline'; onClick?: () => void; href?: string }) {
  const className = `button button-${variant}`
  if (href) return <a className={className} href={href}>{children}<Icon name="arrow" size={17} /></a>
  return <button className={className} onClick={onClick}>{children}<Icon name="arrow" size={17} /></button>
}

function navigate(page: Page, anchor?: string) {
  window.location.hash = page === 'home' ? '#/' : `#/${page}`
  window.setTimeout(() => anchor ? document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  const transparent = page === 'home' && !scrolled && !open
  return <header className={`header ${transparent ? 'header-transparent' : ''}`}>
    <button className="logo-button" onClick={() => navigate('home')} aria-label="Go home"><Logo light={transparent} /></button>
    <nav className="desktop-nav">
      {(['home', 'about', 'services', 'portfolio', 'packages', 'contact'] as Page[]).map(item =>
        <button key={item} className={page === item ? 'active' : ''} onClick={() => navigate(item)}>{item === 'about' ? 'About Us' : item}</button>
      )}
    </nav>
    <div className="nav-action"><Button variant={transparent ? 'light' : 'primary'} onClick={() => navigate('contact')}>Plan Your Event</Button></div>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name={open ? 'close' : 'menu'} size={26} /></button>
    {open && <div className="mobile-menu">
      {(['home', 'about', 'services', 'portfolio', 'packages', 'contact'] as Page[]).map(item =>
        <button key={item} onClick={() => { setOpen(false); navigate(item) }}>{item === 'about' ? 'About Us' : item}</button>
      )}
      <Button onClick={() => { setOpen(false); navigate('contact') }}>Plan Your Event</Button>
    </div>}
  </header>
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</div>
}

function SectionHeading({ eyebrow, title, intro, align = 'left' }: { eyebrow: string; title: string; intro?: string; align?: 'left' | 'center' }) {
  return <div className={`section-heading ${align === 'center' ? 'center' : ''}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2>{title}</h2>
    {intro && <p>{intro}</p>}
  </div>
}

function PortfolioGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Weddings', 'Engagements', 'Birthdays', 'Corporate Events', 'Traditional Events']
  const visible = useMemo(() => projects.filter(project => filter === 'All' || project.category === filter).slice(0, limit), [filter, limit])
  return <>
    <div className="filters">{categories.map(category => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div>
    <div className="portfolio-grid">{visible.map(project =>
      <article className={`project-card ${project.tall ? 'project-tall' : ''}`} key={project.id} onClick={() => window.location.hash = `#/portfolio/${project.id}`}>
        <img src={project.image} alt={`${project.name} event`} />
        <div className="project-shade" />
        <div className="project-meta"><small>{project.category} · {project.location}</small><h3>{project.name}</h3></div>
        <span className="view-project">View Project <Icon name="arrow" size={18} /></span>
      </article>
    )}</div>
  </>
}

function HomePage() {
  return <main>
    <section className="hero" style={{ backgroundImage: `url(${images.hero})` }}>
      <div className="hero-overlay" />
      <div className="hero-content reveal">
        <Eyebrow light>Kathmandu · Nepal</Eyebrow>
        <h1>Turning Moments Into <em>Beautiful Memories</em></h1>
        <p>Premium wedding and event decoration designed to make every celebration unforgettable.</p>
        <div className="hero-buttons"><Button variant="light" onClick={() => navigate('portfolio')}>Explore Our Work</Button><Button variant="outline" onClick={() => navigate('contact')}>Book a Consultation</Button></div>
      </div>
      <div className="scroll-cue"><span>Scroll to discover</span><i /></div>
      <div className="hero-side">Weddings · Events · Celebrations</div>
    </section>

    <section className="section intro-section">
      <div className="intro-visual">
        <img src={images.intro} alt="Elegant wedding reception styling" />
        <div className="floating-note"><Icon name="flower" size={28} /><span>Designed with heart<br />Styled with purpose</span></div>
      </div>
      <div className="intro-copy">
        <SectionHeading eyebrow="Our story" title="Every Celebration Deserves Something Extraordinary" />
        <p className="lead">At Paauchha Decor, we believe celebrations should feel as beautiful as the memories they hold.</p>
        <p>From intimate ceremonies to grand wedding evenings, our Kathmandu-based team blends thoughtful design, cultural detail, and modern artistry to create spaces that feel unmistakably yours.</p>
        <div className="stats">
          <div><strong>100<span>+</span></strong><small>Events Designed</small></div>
          <div><strong>50<span>+</span></strong><small>Happy Clients</small></div>
          <div><strong>KT<span>M</span></strong><small>Kathmandu Based</small></div>
          <div><strong>100<span>%</span></strong><small>Custom Styling</small></div>
        </div>
        <button className="text-link" onClick={() => navigate('about')}>Discover our story <Icon name="arrow" size={18} /></button>
      </div>
    </section>

    <section className="section services-section">
      <div className="section-top"><SectionHeading eyebrow="What we create" title="Our Services" intro="Every detail, thoughtfully composed. Every celebration, uniquely yours." /><span className="script-note">Made for your moment</span></div>
      <div className="services-grid">{services.map((service, index) =>
        <article className={`service-card service-${index + 1}`} key={service.title}>
          <img src={service.image} alt={service.title} />
          <div className="service-overlay" />
          <span className="service-number">0{index + 1}</span>
          <div className="service-content"><h3>{service.title}</h3><p>{service.desc}</p><button onClick={() => navigate('services')}>Discover <Icon name="arrow" size={18} /></button></div>
        </article>
      )}</div>
    </section>

    <section className="section portfolio-section">
      <SectionHeading eyebrow="Selected celebrations" title="Stories We’ve Designed" intro="Explore some of our favourite celebrations, each made personal through detail and imagination." align="center" />
      <PortfolioGrid limit={6} />
      <div className="center-action"><Button onClick={() => navigate('portfolio')}>View Full Portfolio</Button></div>
    </section>

    <section className="feature-project">
      <div className="feature-image"><img src={images.ceremony} alt="Traditional luxury wedding ceremony" /><span>Featured Story</span></div>
      <div className="feature-copy">
        <Eyebrow>Case study · Wedding</Eyebrow>
        <h2>An Evening<br /><em>of Elegance</em></h2>
        <div className="project-facts"><span><small>Event Type</small>Wedding</span><span><small>Location</small>Kathmandu</span><span><small>Style</small>Luxury Traditional</span></div>
        <p>Layers of ivory, wine, and warm gold transformed this celebration into an intimate world of light and flowers—rooted in tradition, yet entirely modern.</p>
        <button className="text-link light-link" onClick={() => window.location.hash = '#/portfolio/1'}>View full project <Icon name="arrow" size={18} /></button>
      </div>
    </section>

    <WhyUs />
    <Testimonials />

    <section className="section social-section">
      <div className="social-heading"><SectionHeading eyebrow="@paauchhadecor" title="Follow Our Latest Celebrations" /><Button variant="primary">Follow Paauchha Decor</Button></div>
      <div className="social-grid">{[images.stage, images.ring, images.floral, images.traditional, images.table].map((image, index) => <div key={image} className={`social-image social-${index + 1}`}><img src={image} alt="Recent Paauchha Decor celebration" /><span><Icon name="instagram" /></span></div>)}</div>
    </section>
    <FinalCta />
  </main>
}

function WhyUs() {
  const features = [
    ['spark', 'Creative & Custom Designs', 'Concepts shaped around your story, never copied from a template.'],
    ['heart', 'Personalized Experience', 'A warm, collaborative process from first conversation to final reveal.'],
    ['flower', 'Premium Materials', 'Refined florals, fabrics, structures, and finishes selected with care.'],
    ['check', 'Attention to Detail', 'We obsess over the small touches that make the whole experience feel special.'],
  ]
  return <section className="section why-section">
    <div className="why-intro"><SectionHeading eyebrow="The Paauchha promise" title="Why Celebrate With Us?" /><p>We combine creative instinct with thoughtful planning, so the experience feels effortless and the result feels extraordinary.</p></div>
    <div className="why-grid">{features.map(([icon, title, text], index) => <div className="why-item" key={title}><span className="why-num">0{index + 1}</span><div className="why-icon"><Icon name={icon} size={25} /></div><h3>{title}</h3><p>{text}</p></div>)}</div>
  </section>
}

function Testimonials() {
  const reviews = [
    { quote: 'Paauchha Decor transformed our wedding venue into something beyond our imagination. Every corner felt magical and deeply personal.', name: 'Anisha & Rohan', event: 'Wedding · Kathmandu', image: images.couple },
    { quote: 'They understood our vision instantly. The entire experience was calm, thoughtful, and the final setup was absolutely breathtaking.', name: 'Sanjana Shrestha', event: 'Engagement · Lalitpur', image: images.ring },
    { quote: 'From the first sketch to event day, every detail was handled with such creativity and care. Our guests are still talking about it.', name: 'Nima Lama', event: 'Anniversary · Kathmandu', image: images.traditional },
  ]
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % reviews.length)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [reviews.length])
  return <section className="testimonials-section">
    <div className="testimonial-image"><img src={images.reception} alt="Elegant decorated celebration venue" /></div>
    <div className="testimonial-content">
      <SectionHeading eyebrow="Kind words" title="Loved by Our Clients" />
      <div className="testimonial-slide" key={active}>
        <div className="quote-icon"><Icon name="quote" size={32} /></div>
        <blockquote>“{reviews[active].quote}”</blockquote>
        <div className="client"><img src={reviews[active].image} alt={reviews[active].name} /><span><strong>{reviews[active].name}</strong><small>{reviews[active].event}</small></span></div>
      </div>
      <div className="testimonial-nav">{reviews.map((_, index) => <button aria-label={`Show testimonial ${index + 1}`} className={active === index ? 'active' : ''} onClick={() => setActive(index)} key={index} />)}</div>
    </div>
  </section>
}

function FinalCta() {
  return <section className="final-cta" style={{ backgroundImage: `url(${images.lights})` }}><div className="final-overlay" /><div className="final-content"><Eyebrow light>Your celebration starts here</Eyebrow><h2>Let’s Create Something<br /><em>Beautiful Together</em></h2><p>Tell us about your celebration, and let’s bring your vision to life.</p><div><Button variant="light" onClick={() => navigate('contact')}>Book Your Event</Button><Button variant="outline" onClick={() => navigate('contact')}>Contact Us</Button></div></div></section>
}

function PageHero({ eyebrow, title, subtitle, image = images.hero }: { eyebrow: string; title: string; subtitle: string; image?: string }) {
  return <section className="page-hero" style={{ backgroundImage: `url(${image})` }}><div className="hero-overlay" /><div><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{subtitle}</p></div></section>
}

function PortfolioPage() {
  return <main><PageHero eyebrow="Selected work · 2022—2025" title="Our Portfolio" subtitle="Explore the moments we’ve had the privilege to design." image={images.stage} /><section className="section portfolio-page"><SectionHeading eyebrow="A collection of moments" title="Celebrations, Beautifully Told" intro="Each event begins with a feeling. We translate it into colour, texture, light, and atmosphere." align="center" /><PortfolioGrid /></section><FinalCta /></main>
}

function ProjectDetail({ id }: { id: number }) {
  const project = projects.find(item => item.id === id) || projects[0]
  return <main>
    <section className="project-hero" style={{ backgroundImage: `url(${project.image})` }}><div className="hero-overlay" /><div><button className="back-link" onClick={() => navigate('portfolio')}>← Back to portfolio</button><Eyebrow light>{project.category} · {project.location}</Eyebrow><h1>{project.name}</h1></div></section>
    <section className="section project-story">
      <div><SectionHeading eyebrow="The story" title="A Celebration Written in Detail" /></div>
      <div><p className="lead">A layered expression of romance, tradition, and modern luxury—designed to feel timeless from the very first arrival.</p><p>For this celebration, our team created a visual journey through sculptural florals, glowing candlelight, and heritage-inspired details. Every element was considered in relation to the venue, the rituals, and the couple’s personal story.</p></div>
      <div className="project-facts dark"><span><small>Event Type</small>{project.category}</span><span><small>Location</small>{project.location}</span><span><small>Design Style</small>Luxury Editorial</span></div>
    </section>
    <section className="project-gallery"><img src={project.image} alt={project.name} /><img src={images.table} alt="Reception details" /><img src={images.floral} alt="Floral event details" /><img src={images.ceremony} alt="Wedding ceremony" /></section>
    <section className="section related"><SectionHeading eyebrow="Continue exploring" title="Related Stories" /><div className="related-grid">{projects.filter(item => item.id !== project.id).slice(0, 3).map(item => <article onClick={() => window.location.hash = `#/portfolio/${item.id}`} key={item.id}><img src={item.image} alt={item.name} /><small>{item.category}</small><h3>{item.name}</h3></article>)}</div></section>
    <FinalCta />
  </main>
}

function ServicesPage() {
  return <main><PageHero eyebrow="What we do" title="Our Services" subtitle="Artful event styling, created with intention from first idea to final detail." image={images.green} />
    <section className="section services-page-intro"><SectionHeading eyebrow="Designed around you" title="Not Just Decoration. An Entire Feeling." /><p>We create considered event environments that express your story. Every service is tailored to your occasion, your venue, and the way you want your guests to feel.</p></section>
    <section className="service-list">{services.map((service, index) => <article className="service-row" key={service.title}>
      <div className="service-row-image"><img src={service.image} alt={service.title} /><span>0{index + 1}</span></div>
      <div className="service-row-content"><Eyebrow>Paauchha service</Eyebrow><h2>{service.title}</h2><p>{service.desc} Our team develops a complete visual direction and thoughtfully brings every layer together.</p><h4>What’s included</h4><ul><li><Icon name="check" />Creative concept & moodboard</li><li><Icon name="check" />Venue styling & installation</li><li><Icon name="check" />Florals, lighting & décor details</li><li><Icon name="check" />Event-day styling team</li></ul><Button onClick={() => navigate('contact')}>Enquire About This Service</Button></div>
    </article>)}</section><FinalCta /></main>
}

function AboutPage() {
  return <main><PageHero eyebrow="The heart behind Paauchha" title="Our Story" subtitle="Creating beautiful celebrations, one story at a time." image={images.couple} />
    <section className="section about-story"><div><SectionHeading eyebrow="How it began" title="Born From a Love for Meaningful Gatherings" /><p className="lead">Paauchha means guest—a word that sits at the heart of how we celebrate in Nepal.</p><p>We began with a simple belief: when people gather for life’s most meaningful moments, the setting should make them feel welcomed, moved, and remembered. What started as a passion for transforming family celebrations has grown into a creative studio trusted across Kathmandu.</p><p>Today, we bring together floral artistry, spatial design, cultural understanding, and meticulous planning to create celebrations that feel both elevated and deeply personal.</p></div><div className="about-collage"><img src={images.floral} alt="Floral styling details" /><img src={images.traditional} alt="Traditional Nepali celebration" /><span>Since<br /><strong>2019</strong></span></div></section>
    <section className="values-section"><SectionHeading eyebrow="What guides us" title="Design With Meaning" align="center" /><div className="values-grid"><div><span>01</span><h3>Our Mission</h3><p>To turn every celebration into an immersive, personal experience through thoughtful design and heartfelt service.</p></div><div><span>02</span><h3>Our Vision</h3><p>To redefine event styling in Nepal by pairing world-class creative standards with the warmth of Nepali hospitality.</p></div><div><span>03</span><h3>Our Promise</h3><p>To listen deeply, create honestly, and care for every detail as if the celebration were our own.</p></div></div></section>
    <section className="process-section section"><div className="process-image"><img src={images.stage} alt="Paauchha Decor creative work" /></div><div><SectionHeading eyebrow="Our creative process" title="From First Thought to Final Reveal" /><ol><li><span>01</span><div><h3>Listen & Discover</h3><p>We learn your story, style, priorities, and dreams for the day.</p></div></li><li><span>02</span><div><h3>Imagine & Design</h3><p>We build a visual world through concepts, palettes, materials, and details.</p></div></li><li><span>03</span><div><h3>Create & Refine</h3><p>Our team crafts and coordinates every element with precision.</p></div></li><li><span>04</span><div><h3>Style & Celebrate</h3><p>We bring it all to life, so you can be fully present in the moment.</p></div></li></ol></div></section><WhyUs /><FinalCta /></main>
}

function PackagesPage() {
  return <main><PageHero eyebrow="Thoughtfully curated" title="Our Packages" subtitle="Beautiful starting points, made personal for your celebration." image={images.table} />
    <section className="section package-intro"><SectionHeading eyebrow="Choose your experience" title="A Foundation for Something Beautiful" intro="Every event is unique, so our packages are designed as flexible starting points. We’ll tailor the details after learning your story." align="center" />
      <div className="packages-grid">{packages.map((pkg, index) => <article className={`package-card ${pkg.featured ? 'featured' : ''}`} key={pkg.name}>{pkg.featured && <span className="popular">Most Loved</span>}<span className="package-num">0{index + 1}</span><h3>{pkg.name}</h3><small>BEST FOR · {pkg.for.toUpperCase()}</small><p>{pkg.desc}</p><div className="package-price">Contact us <em>for pricing</em></div><ul>{pkg.items.map(item => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul><Button variant={pkg.featured ? 'primary' : 'outline'} onClick={() => navigate('contact')}>Enquire Now</Button></article>)}</div>
    </section>
    <section className="custom-banner"><div><Eyebrow light>Need something different?</Eyebrow><h2>Your vision doesn’t need to fit inside a package.</h2></div><p>Tell us what you’re dreaming of. We’ll create a custom experience around your venue, guest count, style, and priorities.</p><Button variant="light" onClick={() => navigate('contact')}>Create a Custom Package</Button></section>
    <FinalCta /></main>
}

function ContactPage() {
  const [sent, setSent] = useState(false)
  return <main><PageHero eyebrow="Begin your celebration" title="Let’s Talk" subtitle="Tell us your vision. We’ll help make it memorable." image={images.lights} />
    <section className="section contact-layout">
      <div className="contact-copy"><SectionHeading eyebrow="Plan your event" title="Something Beautiful Starts Here" /><p>Share a few details about your celebration. Our team will get back to you within 1–2 business days to begin shaping your event.</p>
        <div className="contact-cards"><a href="tel:+9779700068148"><Icon name="phone" size={24} /><span><small>Call or email us</small>+977-9700068148<br />paauchhadecor@gmail.com</span></a><a href="https://maps.google.com/?q=Sahayoginagar+Koteshwor+Kathmandu+Nepal" target="_blank" rel="noreferrer"><Icon name="map" size={24} /><span><small>Visit us</small>Sahayoginagar, Koteshwor<br />Kathmandu, Nepal</span></a></div>
        <a className="whatsapp-card" href="https://wa.me/9779700068148" target="_blank" rel="noreferrer"><span>Prefer a quick conversation?</span><strong>Chat with us on WhatsApp <Icon name="arrow" size={17} /></strong></a>
      </div>
      <form className="contact-form" onSubmit={event => { event.preventDefault(); setSent(true) }}>
        {sent ? <div className="form-success"><div><Icon name="check" size={32} /></div><h3>Thank you for sharing your vision.</h3><p>Your enquiry is ready. We’ll be in touch soon to begin the conversation.</p><Button onClick={() => setSent(false)}>Send Another Enquiry</Button></div> : <>
          <div className="form-heading"><span>Event Enquiry</span><small>All fields marked * are required</small></div>
          <div className="form-grid"><label>Full Name *<input required placeholder="Your full name" /></label><label>Phone Number *<input required type="tel" placeholder="+977" /></label><label>Email Address<input type="email" placeholder="you@email.com" /></label><label>Event Type *<select required defaultValue=""><option value="" disabled>Select event type</option><option>Wedding</option><option>Engagement & Reception</option><option>Birthday</option><option>Corporate Event</option><option>Traditional Event</option><option>Other</option></select></label><label>Event Date<input type="date" /></label><label>Event Location<input placeholder="Venue or city" /></label><label className="full">Estimated Budget<select defaultValue=""><option value="" disabled>Select a range</option><option>Under NPR 1 Lakh</option><option>NPR 1–3 Lakh</option><option>NPR 3–5 Lakh</option><option>NPR 5 Lakh+</option><option>Not sure yet</option></select></label><label className="full">Tell Us About Your Event *<textarea required rows={5} placeholder="Share your vision, guest count, style, and anything else you'd like us to know..." /></label></div>
          <Button>Send Event Enquiry</Button>
        </>}
      </form>
    </section>
    <a className="map-block" href="https://maps.google.com/?q=Sahayoginagar+Koteshwor+Kathmandu+Nepal" target="_blank" rel="noreferrer"><div className="map-pattern" /><div><Icon name="map" size={30} /><span><small>Our studio</small><strong>Sahayoginagar, Koteshwor</strong>Kathmandu, Nepal</span><span className="map-arrow"><Icon name="arrow" /></span></div></a>
  </main>
}

function Footer() {
  return <footer>
    <div className="footer-main"><div className="footer-brand"><Logo light /><p>Creating meaningful spaces for life’s most beautiful celebrations.</p><div className="social-links"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">ig</a><a href="#" aria-label="TikTok">tk</a><a href="https://wa.me/9779700068148" aria-label="WhatsApp">wa</a></div></div>
      <div className="footer-links"><div><h4>Explore</h4>{(['home', 'about', 'services', 'portfolio', 'packages', 'contact'] as Page[]).map(item => <button onClick={() => navigate(item)} key={item}>{item === 'about' ? 'About Us' : item}</button>)}</div><div><h4>Services</h4><button onClick={() => navigate('services')}>Wedding Decoration</button><button onClick={() => navigate('services')}>Engagements</button><button onClick={() => navigate('services')}>Corporate Events</button><button onClick={() => navigate('services')}>Custom Styling</button></div></div>
      <div className="footer-contact"><h4>Let’s create together</h4><a href="tel:+9779700068148">+977-9700068148</a><a href="mailto:paauchhadecor@gmail.com">paauchhadecor@gmail.com</a><p>Sahayoginagar, Koteshwor<br />Kathmandu, Nepal</p><button onClick={() => navigate('contact')}>Start a conversation <Icon name="arrow" size={18} /></button></div>
    </div>
    <div className="footer-bottom"><span>© 2025 Paauchha Decor. All rights reserved.</span><span>Made with care in Kathmandu.</span></div>
  </footer>
}

function MobileCta() {
  return <div className="mobile-cta"><a href="https://wa.me/9779700068148">WhatsApp Us</a><button onClick={() => navigate('contact')}>Book Now</button></div>
}

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/')
  useEffect(() => {
    const handler = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [route])
  const match = route.match(/^#\/portfolio\/(\d+)/)
  const page = (match ? 'portfolio' : route.replace('#/', '').split('/')[0] || 'home') as Page
  let content: React.ReactNode
  if (match) content = <ProjectDetail id={Number(match[1])} />
  else if (page === 'portfolio') content = <PortfolioPage />
  else if (page === 'services') content = <ServicesPage />
  else if (page === 'about') content = <AboutPage />
  else if (page === 'packages') content = <PackagesPage />
  else if (page === 'contact') content = <ContactPage />
  else content = <HomePage />
  return <><Header page={page} />{content}<Footer /><MobileCta /></>
}

export default App
