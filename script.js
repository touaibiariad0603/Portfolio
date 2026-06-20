const root = document.documentElement;
const header = document.querySelector('.site-header');
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const glow = document.querySelector('.cursor-glow');
const tiltCard = document.querySelector('.tilt-card');
const modal = document.querySelector('#case-modal');
const modalClose = document.querySelector('.modal-close');

const caseStudies = {
  dabarli: {
    kicker: 'Automotive commerce · Full-stack product',
    title: 'Dabarli',
    summary: 'A connected commerce system for discovering, diagnosing, purchasing, and managing automotive parts across a customer mobile app, an operations dashboard, and an Express API.',
    challenge: 'Automotive parts shopping is often fragmented: customers need confidence that a part is relevant, while operators need one place to control catalog data, orders, customers, media, and payment status.',
    approach: 'The product separates each audience into a focused surface while sharing one backend domain model. The mobile app makes discovery and checkout simple; the admin dashboard turns daily operations into clear workflows; the API handles identity, data, diagnostics, payments, and background events.',
    features: ['Product and category management', 'Cart, wishlist, reviews, and addresses', 'Order tracking and admin status updates', 'Diagnostic scans and recommendations', 'Stripe and SlickPay payment workflows', 'Clerk authentication and role protection'],
    tech: ['React Native', 'Expo', 'React', 'Express', 'MongoDB', 'Clerk', 'Cloudinary']
  },
  nadra: {
    kicker: 'Research technology · Arabic-first experience',
    title: 'Nadra ResearchLab',
    summary: 'A specialized academic workspace for organizing sports-science studies and converting pre/post measurements into clear statistical results, scientific interpretation, and exportable material.',
    challenge: 'Researchers often move between paper records, spreadsheets, manual formulas, and separate writing workflows. That creates avoidable errors and makes the path from measurement to a report difficult to follow.',
    approach: 'Nadra treats the research process as one guided product flow. Role-specific dashboards organize studies and participants, measurement screens preserve structure, and a built-in statistics layer produces understandable analysis and report-ready outputs.',
    features: ['Admin, researcher, teacher, and participant roles', 'Study and training-program management', 'Structured pre/post measurement entry', 'Mean, standard deviation, and paired t-tests', 'Significance and improvement interpretation', 'Charts and export-ready research outputs'],
    tech: ['Next.js', 'TypeScript', 'React', 'Recharts', 'Radix UI', 'Tailwind CSS']
  },
  novalign: {
    kicker: 'Digital healthcare · Multi-audience platform',
    title: 'Novalign',
    summary: 'A clear-aligner ecosystem serving patients, dentists, and administrators with tailored content, a provider network, partner onboarding, education, and secure approval workflows.',
    challenge: 'The platform needed to educate patients in Arabic, communicate clinically with practitioners in French, and support operational processes without making those very different journeys feel disconnected.',
    approach: 'A shared visual system holds the brand together while each audience gets its own hierarchy and language. Serverless APIs support applications, approvals, and directory data, with Clerk protecting administrative actions and MongoDB storing operational records.',
    features: ['Arabic patient education and treatment journey', 'French practitioner product and clinical content', 'Approved-doctor directory by location', 'Partner and masterclass application flows', 'Clerk-secured admin approval dashboard', 'MongoDB-backed serverless API endpoints'],
    tech: ['HTML', 'CSS', 'JavaScript', 'Clerk', 'MongoDB', 'Mongoose', 'Vercel']
  }
};

const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;
updateThemeLabel();

function updateThemeLabel() {
  const light = root.dataset.theme === 'light';
  themeToggle?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f5f5f0' : '#090b10');
}

themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  updateThemeLabel();
});

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
}

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileMenu.classList.toggle('open', !open);
  mobileMenu.setAttribute('aria-hidden', String(open));
});

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 18), { passive: true });

document.querySelectorAll('[data-delay]').forEach(el => el.style.setProperty('--delay', `${el.dataset.delay}ms`));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });

  document.querySelector('.hero-visual')?.addEventListener('pointermove', event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    tiltCard.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -7}deg) rotateZ(2deg)`;
  });
  document.querySelector('.hero-visual')?.addEventListener('pointerleave', () => tiltCard.style.transform = 'rotate(2deg)');
}

function openCaseStudy(key) {
  const data = caseStudies[key];
  if (!data || !modal) return;
  modal.querySelector('.modal-kicker').textContent = data.kicker;
  modal.querySelector('#modal-title').textContent = data.title;
  modal.querySelector('.modal-summary').textContent = data.summary;
  modal.querySelector('.modal-challenge').textContent = data.challenge;
  modal.querySelector('.modal-approach').textContent = data.approach;
  modal.querySelector('.modal-features ul').innerHTML = data.features.map(item => `<li>${item}</li>`).join('');
  modal.querySelector('.modal-tech').innerHTML = data.tech.map(item => `<span>${item}</span>`).join('');
  modal.showModal();
  document.body.classList.add('modal-open');
}

document.querySelectorAll('.case-study-trigger').forEach(button => button.addEventListener('click', () => openCaseStudy(button.dataset.project)));
modalClose?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', event => {
  const bounds = modal.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) modal.close();
});
modal?.addEventListener('close', () => document.body.classList.remove('modal-open'));

document.querySelector('#year').textContent = new Date().getFullYear();
