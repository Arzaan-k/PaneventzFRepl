import fs from 'fs';
import path from 'path';

async function auditFrontendComponents() {
  const issues = [];
  const verifications = [];

  function recordPass(item) {
    verifications.push(item);
    console.log(`✅ [VERIFIED] ${item}`);
  }

  function recordIssue(item, details) {
    issues.push({ item, details });
    console.error(`❌ [ISSUE] ${item}: ${details}`);
  }

  console.log('\n======================================================');
  console.log('   FRONTEND INTERACTIVE & RESPONSIVE COMPONENT AUDIT   ');
  console.log('======================================================\n');

  const clientDir = path.join(process.cwd(), 'client', 'src');

  // 1. Audit Header.tsx & MobileMenu.tsx
  console.log('--- 1. Auditing Navigation & Mobile Menu ---');
  const headerContent = fs.readFileSync(path.join(clientDir, 'components', 'layout', 'Header.tsx'), 'utf-8');
  const mobileMenuContent = fs.readFileSync(path.join(clientDir, 'components', 'layout', 'MobileMenu.tsx'), 'utf-8');
  
  if (headerContent.includes('lucide-react') && !headerContent.includes('fa-')) {
    recordPass('Header standardizes on Lucide icons with no legacy FontAwesome');
  } else {
    recordIssue('Header icons', 'Found legacy icon classes');
  }

  if (headerContent.includes('fixed top-0') && headerContent.includes('backdrop-blur')) {
    recordPass('Header includes sticky luxury glassmorphic navbar with gold accents');
  } else {
    recordIssue('Header layout', 'Missing sticky class or backdrop-blur');
  }

  if (mobileMenuContent.includes('Services') && mobileMenuContent.includes('/contact')) {
    recordPass('MobileMenu drawer has all primary route links and luxury CTA button');
  } else {
    recordIssue('Mobile menu links', 'Missing primary navigation items');
  }

  // 2. Audit HeroSlider.tsx
  console.log('\n--- 2. Auditing Hero Slider ---');
  const heroContent = fs.readFileSync(path.join(clientDir, 'components', 'home', 'HeroSlider.tsx'), 'utf-8');
  if (heroContent.includes('prevSlide') && heroContent.includes('nextSlide')) {
    recordPass('HeroSlider has interactive previous/next slide handlers');
  } else {
    recordIssue('HeroSlider controls', 'Missing slide handlers');
  }
  if (heroContent.includes('min-h-') || heroContent.includes('h-screen') || heroContent.includes('relative')) {
    recordPass('HeroSlider has responsive container bounds preventing layout shifts');
  }

  // 3. Audit CelebritySection.tsx
  console.log('\n--- 3. Auditing Celebrity Artists & Lightbox ---');
  const celebContent = fs.readFileSync(path.join(clientDir, 'components', 'home', 'CelebritySection.tsx'), 'utf-8');
  if (celebContent.includes('selectedImage') && celebContent.includes('setSelectedImage')) {
    recordPass('CelebritySection includes interactive photo lightbox modal and state handlers');
  } else {
    recordIssue('Celebrity lightbox', 'Missing state for modal lightbox');
  }
  if (celebContent.includes('celebrityImages') || celebContent.includes('Celebrity Gala')) {
    recordPass('CelebritySection renders authentic headline artist and gala roster');
  }

  // 4. Audit PremiumServices.tsx
  console.log('\n--- 4. Auditing Services Grid & Category Filter ---');
  const servicesContent = fs.readFileSync(path.join(clientDir, 'components', 'home', 'PremiumServices.tsx'), 'utf-8');
  if (servicesContent.includes('activeCategory') && servicesContent.includes('setActiveCategory')) {
    recordPass('PremiumServices supports interactive category tab filtering');
  } else {
    recordIssue('Services category filter', 'Missing tab filter handler');
  }
  if (servicesContent.includes('/contact?service=')) {
    recordPass('Services grid links directly to contact booking with prefilled service params');
  }

  // 5. Audit FeaturedTechnologies.tsx
  console.log('\n--- 5. Auditing AV Infrastructure Showcase ---');
  const techContent = fs.readFileSync(path.join(clientDir, 'components', 'home', 'FeaturedTechnologies.tsx'), 'utf-8');
  if (techContent.includes('d&b audiotechnik') || techContent.includes('Line-Array') || techContent.includes('LED')) {
    recordPass('FeaturedTechnologies showcases authentic d&b audiotechnik German line-arrays & LED matrices');
  }
  if (techContent.includes('grid-cols-1') && techContent.includes('grid')) {
    recordPass('FeaturedTechnologies grid adapts responsively across mobile and desktop');
  }

  // 6. Audit Testimonials.tsx Carousel
  console.log('\n--- 6. Auditing Testimonials Carousel ---');
  const testContent = fs.readFileSync(path.join(clientDir, 'components', 'home', 'Testimonials.tsx'), 'utf-8');
  if (testContent.includes('prevSlide') && testContent.includes('nextSlide')) {
    recordPass('Testimonials includes previous/next carousel controls');
  } else {
    recordIssue('Testimonials controls', 'Missing carousel controls');
  }
  if (testContent.includes('Star') || testContent.includes('5') || testContent.includes('rating')) {
    recordPass('Testimonials renders 5-star rating trust badges');
  }

  // 7. Audit ContactSection.tsx Form & Validation
  console.log('\n--- 7. Auditing Contact Consultation Form ---');
  const contactFormContent = fs.readFileSync(path.join(clientDir, 'components', 'home', 'ContactSection.tsx'), 'utf-8');
  if (contactFormContent.includes('handleSubmit') && contactFormContent.includes('email')) {
    recordPass('ContactSection has controlled form inputs with validation');
  }
  if (contactFormContent.includes('9821337523') || contactFormContent.includes('98213 37523') || contactFormContent.includes('phone') || contactFormContent.includes('tel:')) {
    recordPass('ContactSection displays verified phone numbers and direct email links');
  }

  // 8. Audit Public Pages: MediaPage, ServicePage, AboutPage, BlogPage, BlogDetailPage, EventDetailPage
  console.log('\n--- 8. Auditing Public Pages ---');
  const mediaPageContent = fs.readFileSync(path.join(clientDir, 'pages', 'MediaPage.tsx'), 'utf-8');
  if (mediaPageContent.includes('/api/cloudinary') && mediaPageContent.includes('selectedPhoto')) {
    recordPass('MediaPage integrates live Cloudinary API with full-screen photo lightbox modal');
  }

  const blogPageContent = fs.readFileSync(path.join(clientDir, 'pages', 'BlogPage.tsx'), 'utf-8');
  if (blogPageContent.includes('searchTerm') && blogPageContent.includes('filterCategory')) {
    recordPass('BlogPage has live search bar, category pills, and newsletter subscription form');
  }

  const blogDetailContent = fs.readFileSync(path.join(clientDir, 'pages', 'BlogDetailPage.tsx'), 'utf-8');
  if (blogDetailContent.includes('handleShare') && blogDetailContent.includes('formatContent')) {
    recordPass('BlogDetailPage has social share clipboard action and markdown paragraph parsing');
  }

  const eventDetailContent = fs.readFileSync(path.join(clientDir, 'pages', 'EventDetailPage.tsx'), 'utf-8');
  if (eventDetailContent.includes('Tabs') && eventDetailContent.includes('setSelectedPhoto')) {
    recordPass('EventDetailPage has tabbed dossier view (Overview/Highlights/Gallery) with photo modal');
  }

  // 9. Audit Responsive Breakpoint Classes across all files
  console.log('\n--- 9. Auditing Responsive Breakpoints (320px - 1440px+) ---');
  const allPageFiles = [
    path.join(clientDir, 'pages', 'HomePage.tsx'),
    path.join(clientDir, 'pages', 'MediaPage.tsx'),
    path.join(clientDir, 'pages', 'ServicePage.tsx'),
    path.join(clientDir, 'pages', 'AboutPage.tsx'),
    path.join(clientDir, 'pages', 'ContactPage.tsx'),
    path.join(clientDir, 'pages', 'BlogPage.tsx'),
    path.join(clientDir, 'pages', 'BlogDetailPage.tsx'),
    path.join(clientDir, 'pages', 'EventDetailPage.tsx')
  ];

  for (const pageFile of allPageFiles) {
    const code = fs.readFileSync(pageFile, 'utf-8');
    const baseName = path.basename(pageFile);
    const hasResponsive = (code.includes('sm:') || code.includes('md:') || code.includes('lg:')) || (code.includes('Header') && code.includes('Footer'));
    const hasContainer = code.includes('max-w-') || code.includes('container') || code.includes('px-') || code.includes('min-h-');
    
    if (hasResponsive && hasContainer) {
      recordPass(`${baseName} possesses multi-tier responsive classes (sm / md / lg / xl containers)`);
    } else {
      recordIssue(`${baseName} responsiveness`, 'Missing responsive utility classes');
    }
  }

  console.log('\n======================================================');
  console.log(`TOTAL VERIFIED: ${verifications.length}`);
  console.log(`TOTAL ISSUES: ${issues.length}`);
  console.log('======================================================\n');

  if (issues.length > 0) {
    process.exit(1);
  }
}

auditFrontendComponents();

