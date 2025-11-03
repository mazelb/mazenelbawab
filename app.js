// ========================================
// MAIN APPLICATION
// ========================================

// ========================================
// PAGE DETECTION & ROUTING
// ========================================
const CURRENT_PAGE = getCurrentPage();

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    
    if (!page || page === 'index.html') return 'home';
    return page.replace('.html', '');
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect
    document.body.style.opacity = '1';
    
    initializeGoogleAnalytics();
    initializePersonalInfo();
    initializeFeatures();
    initializePageTransitions();
    registerServiceWorker();
    
    // Page-specific initialization
    if (CURRENT_PAGE === 'blog') {
        fetchMediumPosts();
    }
    
    if (CURRENT_PAGE === 'projects') {
        fetchGitHubRepos();
    }
});

// ========================================
// SERVICE WORKER REGISTRATION
// ========================================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker: Registered successfully');
                })
                .catch((error) => {
                    console.log('Service Worker: Registration failed', error);
                });
        });
    }
}

// ========================================
// GOOGLE ANALYTICS INITIALIZATION
// ========================================
function initializeGoogleAnalytics() {
    // Check if analytics is configured and enabled
    if (!CONFIG.analytics || !CONFIG.analytics.measurementId || 
        CONFIG.analytics.measurementId === 'G-XXXXXXXXXX' || 
        CONFIG.analytics.measurementId === '') {
        console.log('Google Analytics: Not configured or disabled');
        return;
    }

    const measurementId = CONFIG.analytics.measurementId;
    
    // Create and inject the Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    
    const script2 = document.createElement('script');
    script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
            'send_page_view': true,
            'anonymize_ip': true
        });
    `;
    
    // Insert scripts into the head
    const scriptPlaceholder = document.getElementById('google-analytics-script');
    if (scriptPlaceholder) {
        scriptPlaceholder.parentNode.insertBefore(script1, scriptPlaceholder);
        scriptPlaceholder.parentNode.insertBefore(script2, scriptPlaceholder);
        console.log('Google Analytics: Initialized with ID', measurementId);
    }
}

// ========================================
// PERSONAL INFO INITIALIZATION
// ========================================
function initializePersonalInfo() {
    // Hero section (only on home page)
    const heroName = document.getElementById('hero-name');
    const heroTagline = document.getElementById('hero-tagline');
    const heroLinkedin = document.getElementById('hero-linkedin');
    
    if (heroName) heroName.textContent = CONFIG.personal.name;
    if (heroTagline) heroTagline.textContent = CONFIG.personal.tagline;
    if (heroLinkedin) heroLinkedin.href = `https://linkedin.com/in/${CONFIG.personal.linkedin}`;
    
    // About section
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        CONFIG.about.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutContent.appendChild(p);
        });
    }
    
    // Contact section
    const contactEmail = document.getElementById('contact-email');
    const contactEmailText = document.getElementById('contact-email-text');
    const contactLinkedin = document.getElementById('contact-linkedin');
    const contactGithub = document.getElementById('contact-github');
    const contactPhone = document.getElementById('contact-phone');
    const contactPhoneText = document.getElementById('contact-phone-text');
    
    if (contactEmail) contactEmail.href = `mailto:${CONFIG.personal.email}`;
    if (contactEmailText) contactEmailText.textContent = CONFIG.personal.email;
    if (contactLinkedin) contactLinkedin.href = `https://linkedin.com/in/${CONFIG.personal.linkedin}`;
    if (contactGithub) contactGithub.href = `https://github.com/${CONFIG.personal.github}`;
    if (contactPhone) contactPhone.href = `tel:${CONFIG.personal.phone}`;
    if (contactPhoneText) contactPhoneText.textContent = CONFIG.personal.phone;
    
    // Footer
    const currentYear = document.getElementById('current-year');
    const footerName = document.getElementById('footer-name');
    const footerLocation = document.getElementById('footer-location');
    
    if (currentYear) currentYear.textContent = new Date().getFullYear();
    if (footerName) footerName.textContent = CONFIG.personal.name;
    if (footerLocation) footerLocation.textContent = CONFIG.personal.location;
}

// ========================================
// FEATURE TOGGLES
// ========================================
function initializeFeatures() {
    // Show/hide blog nav item
    const navBlog = document.getElementById('nav-blog');
    if (navBlog && CONFIG.features.showBlog) {
        navBlog.classList.remove('hidden');
    }
    
    // Show/hide projects nav item
    const navProjects = document.getElementById('nav-projects');
    if (navProjects && CONFIG.features.showProjects) {
        navProjects.classList.remove('hidden');
    }
    
    // Show/hide resume download
    if (CONFIG.features.showResume && CONFIG.resume && CONFIG.resume.filename) {
        const resumeFilename = CONFIG.resume.filename;
        const resumeLabel = CONFIG.resume.label || 'Download Resume';
        
        // Navigation link
        const navResume = document.getElementById('nav-resume');
        const navResumeLink = document.getElementById('nav-resume-link');
        if (navResume && navResumeLink) {
            navResumeLink.href = resumeFilename;
            navResumeLink.textContent = '📄 Resume';
            navResume.classList.remove('hidden');
        }
        
        // Hero button (home page only)
        const heroResume = document.getElementById('hero-resume');
        if (heroResume) {
            heroResume.href = resumeFilename;
            heroResume.classList.remove('hidden');
        }
        
        // Contact section link
        const contactResume = document.getElementById('contact-resume');
        const contactResumeText = document.getElementById('contact-resume-text');
        if (contactResume && contactResumeText) {
            contactResume.href = resumeFilename;
            contactResumeText.textContent = resumeLabel;
            contactResume.classList.remove('hidden');
        }
    }
}

// ========================================
// PAGE TRANSITIONS
// ========================================
function initializePageTransitions() {
    // Add smooth transitions for all internal links
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page links
            if (href && !this.target && !href.startsWith('http')) {
                e.preventDefault();
                
                // Fade out
                document.body.style.opacity = '0';
                
                // Navigate after fade
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            }
        });
    });
    
    // Prefetch pages on hover for instant loading
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('http')) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        });
    });
}

// ========================================
// MOBILE MENU
// ========================================
function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-menu').classList.remove('active');
    });
});

// ========================================
// MEDIUM BLOG INTEGRATION
// ========================================
async function fetchMediumPosts() {
    const loading = document.getElementById('blog-loading');
    const error = document.getElementById('blog-error');
    const empty = document.getElementById('blog-empty');
    const grid = document.getElementById('blog-grid');
    
    try {
        // Using RSS2JSON service to fetch Medium posts
        const rssUrl = `https://medium.com/feed/${CONFIG.medium.username}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        loading.classList.add('hidden');
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            const posts = data.items.slice(0, CONFIG.medium.maxPosts);
            renderBlogPosts(posts, grid);
        } else {
            empty.classList.remove('hidden');
        }
    } catch (err) {
        console.error('Error fetching Medium posts:', err);
        loading.classList.add('hidden');
        error.textContent = 'Unable to load blog posts. Please try again later.';
        error.classList.remove('hidden');
    }
}

function renderBlogPosts(posts, container) {
    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        // Extract excerpt (strip HTML and limit length)
        const excerpt = stripHtml(post.description).substring(0, 150) + '...';
        
        // Format date
        const date = new Date(post.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        card.innerHTML = `
            <div class="blog-card-content">
                <h3><a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a></h3>
                <div class="blog-meta">
                    <span>${date}</span>
                    ${post.categories && post.categories.length > 0 ? `<span> • ${post.categories[0]}</span>` : ''}
                </div>
                <p class="blog-excerpt">${excerpt}</p>
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="blog-link">
                    Read more →
                </a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// ========================================
// GITHUB PROJECTS INTEGRATION
// ========================================
async function fetchGitHubRepos() {
    const loading = document.getElementById('projects-loading');
    const error = document.getElementById('projects-error');
    const empty = document.getElementById('projects-empty');
    const grid = document.getElementById('projects-grid');
    
    try {
        const url = `https://api.github.com/users/${CONFIG.github.username}/repos?sort=${CONFIG.github.sortBy}&per_page=100`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('GitHub API request failed');
        }
        
        const repos = await response.json();
        
        loading.classList.add('hidden');
        
        // Filter and sort repos
        let filteredRepos = repos;
        
        if (CONFIG.github.excludeForked) {
            filteredRepos = filteredRepos.filter(repo => !repo.fork);
        }
        
        // Take top repos
        filteredRepos = filteredRepos.slice(0, CONFIG.github.maxRepos);
        
        if (filteredRepos.length > 0) {
            renderProjects(filteredRepos, grid);
        } else {
            empty.classList.remove('hidden');
        }
    } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        loading.classList.add('hidden');
        error.textContent = 'Unable to load projects. Please try again later.';
        error.classList.remove('hidden');
    }
}

function renderProjects(repos, container) {
    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const description = repo.description || 'No description available';
        const language = repo.language || 'Unknown';
        const languageColor = getLanguageColor(language);
        
        card.innerHTML = `
            <div class="project-header">
                <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
            </div>
            <div class="project-stats">
                <span class="project-stat">⭐ ${repo.stargazers_count}</span>
                <span class="project-stat">🔀 ${repo.forks_count}</span>
            </div>
            <p class="project-description">${description}</p>
            <div class="project-footer">
                <div class="project-language">
                    <span class="language-dot" style="background-color: ${languageColor};"></span>
                    <span>${language}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                    View →
                </a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Language color mapping (based on GitHub's color scheme)
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C': '#555555',
        'C#': '#178600',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Dart': '#00B4AB',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Shell': '#89e051',
        'Objective-C': '#438eff',
        'Scala': '#c22d40',
        'Lua': '#000080',
        'Vue': '#41b883',
        'React': '#61dafb'
    };
    
    return colors[language] || '#8e8e8e';
}
