# Multi-Page Portfolio Website

This portfolio website has been converted to a **multi-page architecture** with ultra-fast page transitions.

## 📁 Site Structure

- **index.html** - Home page with hero section and quick links
- **about.html** - About Me page with personal background
- **experience.html** - Professional experience timeline
- **blog.html** - Medium blog integration (if enabled)
- **projects.html** - GitHub projects showcase (if enabled)
- **contact.html** - Contact information and links
- **styles.css** - All styling with transition effects
- **app.js** - JavaScript with page routing and transitions
- **config.js** - Site configuration (edit this to customize)
- **sw.js** - Service worker for ultra-fast caching

## ⚡ Performance Features

### 1. **Instant Page Transitions**
- Smooth 150ms fade transitions between pages
- No jarring page reloads

### 2. **Link Prefetching**
- Pages are prefetched on hover
- Nearly instant navigation when clicking

### 3. **Service Worker Caching**
- All pages cached after first visit
- Offline-capable
- Updates automatically when files change

### 4. **Optimized Loading**
- CSS/JS loaded once and reused across pages
- Minimal bandwidth usage after initial load
- Browser caching enabled

## 🚀 Speed Optimizations

1. **Prefetch Links in HTML**
   - Each page includes `<link rel="prefetch">` for likely next pages
   - Browser loads pages in background before user clicks

2. **Dynamic Prefetching**
   - JavaScript prefetches pages when user hovers over links
   - Predictive loading based on user behavior

3. **Service Worker**
   - Caches all HTML, CSS, and JS files
   - Serves from cache first, network second
   - Sub-50ms page load times after first visit

## 🎨 Navigation

- Active page is highlighted in navigation
- Mobile-responsive menu
- Consistent header/footer across all pages

## 📝 Configuration

Edit `config.js` to customize:
- Personal information
- Feature toggles (show/hide blog, projects, resume)
- Google Analytics
- Medium username
- GitHub username

## 🛠️ Local Testing

1. Open `index.html` in a browser
2. Navigate between pages to see instant transitions
3. Check browser DevTools → Network to see cached resources
4. Service worker requires HTTPS or localhost to function

## 🌐 Deployment

When deploying to GitHub Pages or any static host:
1. All files must be in the root directory
2. Service worker will activate automatically
3. HTTPS is required for service worker

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Service workers supported in all modern browsers
- Graceful degradation for older browsers

## 💡 Benefits Over Single-Page

- **Better SEO** - Each page has unique URL and title
- **Faster Initial Load** - Only loads content needed for current page
- **Better Browser History** - Back/forward buttons work naturally
- **Shareable URLs** - Can link directly to specific sections
- **Improved Performance** - Cached pages load instantly
