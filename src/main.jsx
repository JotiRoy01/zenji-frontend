import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import './styles/global.css';

const productArt = {
  flame: { accent: '#d6ff46', label: 'BLAZE', sigil: '炎', pattern: 'flame' },
  blood: { accent: '#ff4b62', label: 'CRIMSON', sigil: '血', pattern: 'slash' },
  bushido: { accent: '#d8d4cc', label: 'BUSHIDO', sigil: '侍', pattern: 'grid' },
  domain: { accent: '#a98cff', label: 'DOMAIN', sigil: '界', pattern: 'orbit' },
  free: { accent: '#71d7ff', label: 'FREE SOUL', sigil: '魂', pattern: 'wave' },
  limitless: { accent: '#f5f1e9', label: 'LIMITLESS', sigil: '無', pattern: 'circle' },
  paradise: { accent: '#9df58b', label: 'PARADISE', sigil: '楽', pattern: 'leaf' },
  warrior: { accent: '#ffd24d', label: 'WARRIOR', sigil: '戦', pattern: 'slash' },
  water: { accent: '#66a7ff', label: 'WATER', sigil: '水', pattern: 'wave' },
  sun: { accent: '#ff8b4a', label: 'WILL OF SUN', sigil: '陽', pattern: 'sun' },
};

const products = [
  { id: 1, name: 'Blue Flame Tee', code: 'ORI-001', category: 'THE ORIGIN', price: 40, sale: 34, type: 'flame', tags: ['front', 'back', 'on model'] },
  { id: 2, name: 'Demon Blood Tee', code: 'ORI-002', category: 'THE ORIGIN', price: 40, sale: 34, type: 'blood', tags: ['front', 'on model'] },
  { id: 3, name: 'Bushido Tee', code: 'ORI-003', category: 'THE ORIGIN', price: 40, sale: 34, type: 'bushido', tags: ['front', 'back'] },
  { id: 4, name: 'Domain Expansion Tee', code: 'ORI-004', category: 'THE ORIGIN', price: 40, sale: 34, type: 'domain', tags: ['front', 'back', 'on model'] },
  { id: 5, name: 'Free Soul Tee', code: 'ARC-001', category: 'ARCHIVE', price: 42, type: 'free', tags: ['front', 'on model'] },
  { id: 6, name: 'Limitless Tee', code: 'ARC-002', category: 'ARCHIVE', price: 42, type: 'limitless', tags: ['front', 'back'] },
  { id: 7, name: 'Paradise Spirit Tee', code: 'ARC-003', category: 'ARCHIVE', price: 42, type: 'paradise', tags: ['front', 'on model'] },
  { id: 8, name: 'Warrior Spirit Tee', code: 'ARC-004', category: 'ARCHIVE', price: 42, type: 'warrior', tags: ['front', 'back', 'on model'] },
  { id: 9, name: 'Water Breathing Tee', code: 'ARC-005', category: 'ARCHIVE', price: 42, type: 'water', tags: ['front', 'on model'] },
  { id: 10, name: 'Will Of The Sun Tee', code: 'ARC-006', category: 'ARCHIVE', price: 42, type: 'sun', tags: ['front', 'back'] },
];

const editorialImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
];

const productImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85',
];

function formatMoney(value) {
  return `A$${value.toFixed(2)}`;
}

function getRoute() {
  const raw = window.location.hash.replace('#', '') || '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

function App() {
  const [route, setRoute] = useState(getRoute());
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickProduct, setQuickProduct] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const safeSubtotal = cart.reduce((sum, item) => sum + item.qty * (item.product.sale ?? item.product.price), 0);

  const toggleWishlist = (product) => {
    setWishlist((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]);
  };

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { product, qty: 1, size: 'M' }];
    });
    setQuickProduct(null);
    setBagOpen(true);
    setToast(`${product.name} added to bag`);
  };

  const updateQty = (id, delta) => {
    setCart((current) => current.map((item) => item.product.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  };

  const page = useMemo(() => {
    if (route === '/collection') return <CollectionPage products={products} onQuick={setQuickProduct} wishlist={wishlist} onWish={toggleWishlist} />;
    if (route === '/lookbook') return <LookbookPage products={products} />;
    if (route === '/drop') return <DropPage products={products} onQuick={setQuickProduct} wishlist={wishlist} onWish={toggleWishlist} onJoin={() => setToast('TRANSMISSION RECEIVED')} />;
    if (route === '/story') return <StoryPage />;
    return <HomePage products={products} onQuick={setQuickProduct} wishlist={wishlist} onWish={toggleWishlist} />;
  }, [route, wishlist]);

  return (
    <div className="app-shell">
      <AnnouncementBar />
      <Navbar route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} searchOpen={searchOpen} setSearchOpen={setSearchOpen} itemCount={itemCount} setBagOpen={setBagOpen} />
      {page}
      <Footer />
      {quickProduct && <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} onAdd={addToCart} />}
      {bagOpen && <CartDrawer cart={cart} subtotal={safeSubtotal} updateQty={updateQty} onClose={() => setBagOpen(false)} />}
      {searchOpen && <SearchOverlay products={products} onClose={() => setSearchOpen(false)} onQuick={setQuickProduct} />}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

function AnnouncementBar() {
  return (
    <div className="announcement" aria-label="Brand announcements">
      <div className="announcement-track">
        <span>THE ORIGIN // DROP 001</span><span className="announcement-dot">✦</span>
        <span>FREE SHIPPING OVER A$100</span><span className="announcement-dot">✦</span>
        <span>LIMITED PIECES // NO RESTOCKS</span><span className="announcement-dot">✦</span>
        <span>THE ORIGIN // DROP 001</span><span className="announcement-dot">✦</span>
        <span>FREE SHIPPING OVER A$100</span><span className="announcement-dot">✦</span>
        <span>LIMITED PIECES // NO RESTOCKS</span><span className="announcement-dot">✦</span>
      </div>
    </div>
  );
}

function Navbar({ route, menuOpen, setMenuOpen, setSearchOpen, itemCount, setBagOpen }) {
  const links = [['/', 'Home'], ['/collection', 'Collection'], ['/drop', 'Drop'], ['/lookbook', 'Lookbook'], ['/story', 'Story']];
  return (
    <>
      <header className="nav">
        <a href="#/" className="brand-mark" aria-label="ZENJI home">ZENJI<span>®</span></a>
        <nav className="nav-links">
          {links.slice(1).map(([href, label]) => <a key={href} className={route === href ? 'active' : ''} href={`#${href}`}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn desktop-only" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={18} /></button>
          <button className="bag-btn" onClick={() => setBagOpen(true)} aria-label="Open bag"><ShoppingBag size={18} /><span>{itemCount}</span></button>
          <button className="icon-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>
      {menuOpen && <div className="mobile-menu">
        <div className="mobile-menu-top">NAVIGATION <span>001</span></div>
        <nav>{links.map(([href, label], i) => <a key={href} href={`#${href}`}><span>0{i + 1}</span>{label}<ArrowUpRightMaybe /></a>)}</nav>
        <div className="mobile-menu-meta"><span>FOR THE UNCOMPROMISING.</span><span>ZENJI / EST. 2024</span></div>
      </div>}
    </>
  );
}

function ArrowUpRightMaybe() {
  return <span className="menu-arrow"><ArrowRight size={18} /></span>;
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <div className="hero-image"></div>
        <div className="hero-grid"></div>
        <div className="hero-noise"></div>
      </div>
      <div className="hero-ui top-left"><span>SYS / 001</span><span>東京 // SYDNEY</span></div>
      <div className="hero-ui top-right"><Sparkles size={14} /> ORIGINAL STREETWEAR</div>
      <div className="hero-content">
        <div className="eyebrow"><span className="eyebrow-line"></span> THE ORIGIN — DROP 001</div>
        <h1><span>WEAR</span><span>YOUR</span><span>STORY<span className="hero-punc">.</span></span></h1>
        <div className="hero-bottom">
          <p>Anime-inspired streetwear for the ones who write their own path.</p>
          <a className="button button-primary" href="#/collection">SHOP THE DROP <ArrowDownRight size={16} /></a>
        </div>
      </div>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} /></div>
      <div className="hero-counter">01 <span>/</span> 04</div>
    </section>
  );
}

function SectionHeading({ kicker, title, description, action, href = '#/collection' }) {
  return (
    <div className="section-heading">
      <div><div className="eyebrow"><span className="eyebrow-line"></span>{kicker}</div><h2>{title}</h2></div>
      <div className="section-heading-side">{description && <p>{description}</p>}{action && <a className="text-link" href={href}>{action}<ArrowRight size={15} /></a>}</div>
    </div>
  );
}

function ProductCard({ product, onQuick, wishlist, onWish, index = 0 }) {
  const art = productArt[product.type];
  return (
    <article className="product-card reveal" style={{ '--delay': `${index * 70}ms`, '--accent': art.accent }}>
      <div className="product-visual">
        <div className="product-photo" style={{ backgroundImage: `url(${productImages[index % productImages.length]})` }}></div>
        <div className={`product-art product-art-${art.pattern}`}>
          <span className="art-label">{art.label}</span><span className="art-sigil">{art.sigil}</span><span className="art-code">{product.code}</span>
        </div>
        {product.sale && <span className="badge badge-sale">SALE</span>}
        <span className="badge badge-code">{String(index + 1).padStart(2, '0')}</span>
        <button className={`wish-btn ${wishlist.includes(product.id) ? 'is-wished' : ''}`} onClick={() => onWish(product)} aria-label={`Wishlist ${product.name}`}><Heart size={17} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button>
        <button className="quick-btn" onClick={() => onQuick(product)}><Eye size={14} /> QUICK VIEW</button>
      </div>
      <div className="product-meta">
        <div><span className="product-name">{product.name}</span><span className="product-category">{product.category}</span></div>
        <div className="product-price">{product.sale ? <><del>{formatMoney(product.price)}</del><strong>{formatMoney(product.sale)}</strong></> : <strong>{formatMoney(product.price)}</strong>}</div>
      </div>
    </article>
  );
}

function HomePage({ products, onQuick, wishlist, onWish }) {
  return (
    <main>
      <Hero />
      <section className="origin section-pad">
        <SectionHeading kicker="THE ORIGIN // 001" title={<>BUILT FROM<br /><em>THE SOURCE.</em></>} description="Five original graphics. Heavyweight cotton. Built to outlast the trend cycle." action="EXPLORE THE COLLECTION" />
        <div className="origin-layout">
          <div className="editorial-card editorial-main">
            <img src={editorialImages[1]} alt="Streetwear editorial portrait" />
            <div className="editorial-overlay"><span>01 / ORIGIN</span><span>THE FIRST CHAPTER</span></div>
          </div>
          <div className="origin-copy">
            <div className="origin-stat"><span>240</span><span>GSM HEAVYWEIGHT<br />COTTON</span></div>
            <p>ZENJI is a visual language for people who don't need permission to be themselves. Japanese craft, anime mythology and contemporary streetwear meet in every drop.</p>
            <div className="origin-list"><span>01 — ORIGINAL ARTWORK</span><span>02 — OVERSIZED FIT</span><span>03 — LIMITED RUNS</span></div>
            <a href="#/story" className="text-link">READ THE STORY <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="products-section section-pad section-dark">
        <SectionHeading kicker="LATEST_DROPS" title={<>THE<br /><em>ARCHIVE.</em></>} description="Pieces from the current transmission. Explore the full archive before they disappear." action="VIEW ALL PIECES" />
        <div className="product-grid">{products.slice(0, 4).map((product, i) => <ProductCard key={product.id} product={product} onQuick={onQuick} wishlist={wishlist} onWish={onWish} index={i} />)}</div>
      </section>

      <section className="manifesto">
        <div className="manifesto-bg"></div>
        <div className="manifesto-inner">
          <div className="eyebrow"><span className="eyebrow-line"></span> MANIFESTO_001</div>
          <div className="manifesto-word">FOR THE<br /><span>UNCOMPROMISING.</span></div>
          <div className="manifesto-bottom"><p>We make uniform for the self-directed.<br />No permission. No compromise. No restock.</p><a className="button button-outline" href="#/story">ENTER THE WORLD <ArrowDownRight size={16} /></a></div>
        </div>
      </section>

      <section className="lookbook-teaser section-pad">
        <SectionHeading kicker="VISUAL_ARCHIVE" title={<>SEE IT<br /><em>IN MOTION.</em></>} description="Front, back, on-model. A closer look at The Origin." action="OPEN LOOKBOOK" href="#/lookbook" />
        <div className="lookbook-grid">
          {editorialImages.slice(2, 6).map((src, i) => <a key={src} href="#/lookbook" className={`lookbook-tile tile-${i + 1}`}><img src={src} alt={`ZENJI lookbook ${i + 1}`} /><span>{['FRONT', 'ON MODEL', 'BACK', 'DETAIL'][i]} ↗</span></a>)}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

function CollectionPage({ products, onQuick, wishlist, onWish }) {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? products : products.filter((p) => p.category === filter);
  return <main className="page-wrap">
    <section className="page-hero compact"><div className="page-hero-grid"></div><div className="page-hero-copy"><div className="eyebrow"><span className="eyebrow-line"></span> COLLECTION // 001</div><h1>THE<br /><em>ORIGIN.</em></h1><p>The first transmission. Ten graphics built around Japanese mythology, movement and the energy of the new generation.</p></div><div className="page-index">ARCHIVE <span>001—010</span></div></section>
    <section className="section-pad collection-content"><div className="collection-controls"><span>{filtered.length} PIECES</span><div className="filter-pills">{['ALL', 'THE ORIGIN', 'ARCHIVE'].map((f) => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div><button className="sort-btn">SORT BY <ChevronDown size={15} /></button></div><div className="product-grid product-grid-3">{filtered.map((product, i) => <ProductCard key={product.id} product={product} onQuick={onQuick} wishlist={wishlist} onWish={onWish} index={i} />)}</div></section>
  </main>;
}

function LookbookPage({ products }) {
  const [filter, setFilter] = useState('ALL');
  const all = products.flatMap((product, i) => product.tags.slice(0, 2).map((tag, j) => ({ product, tag, image: editorialImages[(i + j + 1) % editorialImages.length], idx: i * 2 + j })));
  const filtered = filter === 'ALL' ? all : all.filter((item) => item.tag.toUpperCase() === filter);
  return <main className="page-wrap"><section className="page-hero compact lookbook-hero"><div className="page-hero-copy"><div className="eyebrow"><span className="eyebrow-line"></span> VISUAL_ARCHIVE</div><h1>LOOK<br /><em>BOOK.</em></h1><p>Product studies and field notes from The Origin. Nothing staged. Everything intentional.</p></div></section><section className="section-pad"><div className="collection-controls"><span>ARCHIVE / {String(filtered.length).padStart(2, '0')}</span><div className="filter-pills">{['ALL', 'FRONT', 'BACK', 'ON MODEL'].map((f) => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div></div><div className="lookbook-masonry">{filtered.map((item) => <figure key={`${item.product.id}-${item.tag}`} className={`lookbook-large item-${item.idx % 4}`}><img src={item.image} alt={`${item.product.name} ${item.tag}`} /><figcaption><span>{item.tag}</span><strong>{item.product.name}</strong></figcaption></figure>)}</div></section></main>;
}

function DropPage({ products, onQuick, wishlist, onWish, onJoin }) {
  return <main className="page-wrap"><DropHero onJoin={onJoin} /><section className="section-pad"><SectionHeading kicker="DROP_001 // THE ORIGIN" title={<>THE PIECES<br /><em>LANDING NOW.</em></>} description="A limited transmission of 10 original graphics. Once they're gone, they're archived." action="SHOP COLLECTION" /><div className="product-grid product-grid-3">{products.slice(0, 6).map((p, i) => <ProductCard key={p.id} product={p} onQuick={onQuick} wishlist={wishlist} onWish={onWish} index={i} />)}</div></section></main>;
}

function DropHero({ onJoin }) {
  const target = new Date('2026-10-01T00:00:00+10:00').getTime();
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => { const t = setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000); return () => clearInterval(t); }, []);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const mins = Math.floor((remaining / 60000) % 60);
  const secs = Math.floor((remaining / 1000) % 60);
  return <section className="drop-hero"><div className="drop-hero-image"></div><div className="drop-overlay"></div><div className="drop-copy"><div className="eyebrow"><span className="eyebrow-line"></span> INCOMING TRANSMISSION</div><h1>AWAKENING<br /><em>IS COMING.</em></h1><p>THE ORIGIN // DROP 001</p><div className="countdown">{[[days, 'DAYS'], [hours, 'HOURS'], [mins, 'MIN'], [secs, 'SEC']].map(([num, label]) => <div key={label}><strong>{String(num).padStart(2, '0')}</strong><span>{label}</span></div>)}</div><button className="button button-primary" onClick={onJoin}>JOIN THE WAITLIST <ArrowRight size={16} /></button></div><div className="drop-meta"><span>01 / THE ORIGIN</span><span>AUSTRALIA // GLOBAL</span></div></section>;
}

function StoryPage() {
  return <main className="page-wrap story-page"><section className="story-intro section-pad"><div className="eyebrow"><span className="eyebrow-line"></span> THE STORY // 001</div><h1>BUILT FOR<br /><em>THE PATH.</em></h1><p className="story-lede">ZENJI started with one idea: take the energy of anime, the discipline of Japanese craft and the attitude of modern streetwear — then make something that feels like yours.</p></section><section className="story-visual"><img src={editorialImages[0]} alt="ZENJI editorial" /><div className="story-stamp">力<br /><small>AWAKENING</small></div></section><section className="section-pad story-columns"><div><span className="eyebrow">01 // ORIGIN</span><h2>WE DON'T DRESS<br /><em>FOR THE CROWD.</em></h2></div><div className="story-text"><p>We believe clothing should be a signal. A quiet piece of evidence that says you know who you are and where you're going.</p><p>Every ZENJI release is designed as a small world: graphic language, silhouette, texture, and a story that rewards a second look.</p><a href="#/collection" className="button button-primary">SHOP THE WORLD <ArrowDownRight size={16} /></a></div></section><section className="story-marquee"><div>DISCIPLINE <span>✦</span> MOVEMENT <span>✦</span> IDENTITY <span>✦</span> DISCIPLINE <span>✦</span> MOVEMENT <span>✦</span> IDENTITY</div></section></main>;
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim()) setDone(true); };
  return <section className="newsletter section-pad"><div className="newsletter-inner"><div><div className="eyebrow"><span className="eyebrow-line"></span> TRANSMISSION</div><h2>ENTER THE<br /><em>FREQUENCY.</em></h2></div><div className="newsletter-form-wrap"><p>Early access, drop signals and nothing else.</p>{done ? <div className="success-state"><Check size={17} /> YOU'RE IN. WATCH THE SIGNAL.</div> : <form onSubmit={submit}><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="YOUR EMAIL ADDRESS" /><button type="submit"><ArrowRight size={18} /></button></form>}</div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="footer-top"><a className="brand-mark brand-footer" href="#/">ZENJI<span>®</span></a><div className="footer-manifesto">WEAR WHAT<br /><em>YOU BELIEVE.</em></div><div className="footer-links"><div><span>EXPLORE</span><a href="#/collection">Collection</a><a href="#/drop">Drop</a><a href="#/lookbook">Lookbook</a><a href="#/story">Our Story</a></div><div><span>FOLLOW</span><a href="#/">Instagram</a><a href="#/">TikTok</a><a href="#/">Pinterest</a></div></div></div><div className="footer-bottom"><span>© 2026 ZENJI STUDIO</span><span>MADE IN THE NOW.</span><span>ALL RIGHTS RESERVED</span></div></footer>;
}

function QuickView({ product, onClose, onAdd }) {
  const art = productArt[product.type];
  const [size, setSize] = useState('M');
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="quick-modal" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={20} /></button><div className="quick-image"><div className="product-photo" style={{ backgroundImage: `url(${productImages[(product.id - 1) % productImages.length]})` }}></div><div className={`product-art product-art-${art.pattern}`}><span className="art-label">{art.label}</span><span className="art-sigil">{art.sigil}</span><span className="art-code">{product.code}</span></div></div><div className="quick-info"><div className="eyebrow"><span className="eyebrow-line"></span> {product.category}</div><h2>{product.name}</h2><div className="quick-price">{product.sale ? <><del>{formatMoney(product.price)}</del><strong>{formatMoney(product.sale)}</strong></> : formatMoney(product.price)}</div><p>Heavyweight oversized silhouette. Original graphic system. Designed as a limited-run piece.</p><div className="size-block"><div className="size-label"><span>SELECT SIZE</span><span>MODEL WEARS M</span></div><div className="sizes">{['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => <button key={s} className={size === s ? 'active' : ''} onClick={() => setSize(s)}>{s}</button>)}</div></div><button className="button button-primary full" onClick={() => onAdd(product)}>ADD TO BAG <ArrowRight size={16} /></button><div className="quick-note"><span><ShieldCheck size={15} /> SECURE CHECKOUT</span><span><Zap size={15} /> LIMITED RUN</span></div></div></div></div>;
}

function CartDrawer({ cart, subtotal, updateQty, onClose }) {
  return <div className="drawer-backdrop" onMouseDown={onClose}><aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}><div className="drawer-head"><span>YOUR BAG // {cart.reduce((sum, i) => sum + i.qty, 0)}</span><button onClick={onClose}><X size={20} /></button></div>{cart.length === 0 ? <div className="empty-state"><Bag size={40} strokeWidth={1} /><h3>NOTHING HERE YET.</h3><a href="#/collection" onClick={onClose} className="text-link">SHOP THE DROP <ArrowRight size={15} /></a></div> : <><div className="drawer-items">{cart.map(({ product, qty }) => <div className="drawer-item" key={product.id}><div className="drawer-thumb" style={{ backgroundImage: `url(${productImages[(product.id - 1) % productImages.length]})` }}></div><div className="drawer-item-main"><strong>{product.name}</strong><span>{formatMoney(product.sale ?? product.price)}</span><div className="qty"><button onClick={() => updateQty(product.id, -1)}><Minus size={12} /></button><span>{qty}</span><button onClick={() => updateQty(product.id, 1)}><Plus size={12} /></button></div></div></div>)}</div><div className="drawer-total"><div><span>SUBTOTAL</span><strong>{formatMoney(subtotal)}</strong></div><p>Shipping calculated at checkout.</p><button className="button button-primary full">CHECKOUT <ArrowRight size={16} /></button></div></>}</aside></div>;
}

function SearchOverlay({ products, onClose, onQuick }) {
  const [query, setQuery] = useState('');
  const result = products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  return <div className="search-overlay"><div className="search-box"><div className="search-head"><span>SEARCH // ZENJI</span><button onClick={onClose}><X size={20} /></button></div><div className="search-input"><Search size={20} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="TRY 'BLAZE' OR 'ORIGIN'" /></div><div className="search-results">{result.map((p) => <button key={p.id} onClick={() => { onQuick(p); onClose(); }}><span>{p.code}</span><strong>{p.name}</strong><ArrowRight size={15} /></button>)}{result.length === 0 && <div className="empty-search">NO SIGNAL FOUND.</div>}</div></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
