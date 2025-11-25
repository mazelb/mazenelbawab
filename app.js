// ========================================
// MAIN APPLICATION
// ========================================

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize security module FIRST
    ContactSecurity.init({
        formId: 'contact-form'
    });
    
    initializeTheme();
    initializeGoogleAnalytics();
    initializePersonalInfo();
    initializeSecureContactInfo();  // NEW: Secure contact initialization
    initializeFeatures();
    initializeTabs();
    initializeSecureContactForm();  // NEW: Secure form initialization
    
    // Load blog and projects data (but don't show until tab is activated)
    if (CONFIG.features.showBlog) {
        fetchMediumPosts();
    }
    
    if (CONFIG.features.showProjects) {
        fetchGitHubRepos();
    }
});

// ========================================
// THEME / DARK MODE
// ========================================
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    
    // Default to dark mode if no preference is saved
    if (savedTheme === 'dark' || !savedTheme) {
        htmlElement.classList.add('dark');
    }
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.toggle('dark');
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Optional: Add a subtle animation effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
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
// (Contact info moved to initializeSecureContactInfo)
// ========================================
function initializePersonalInfo() {
    // Hero section (only on home page)
    const heroName = document.getElementById('hero-name');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroIntro = document.getElementById('hero-intro');
    const heroLinkedin = document.getElementById('hero-linkedin');
    
    if (heroName) heroName.textContent = CONFIG.personal.name;
    if (heroSubtitle) heroSubtitle.textContent = CONFIG.personal.title;
    if (heroIntro && CONFIG.home && CONFIG.home.heroIntro) {
        heroIntro.textContent = CONFIG.home.heroIntro;
    }
    if (heroLinkedin) heroLinkedin.href = `https://linkedin.com/in/${CONFIG.personal.linkedin}`;
    
    // Home page content (intro, stats, highlights)
    const homeIntroContent = document.getElementById('home-intro-content');
    if (homeIntroContent && CONFIG.home && CONFIG.home.intro) {
        homeIntroContent.innerHTML = CONFIG.home.intro
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('');
    }
    
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid && CONFIG.home && CONFIG.home.stats) {
        statsGrid.innerHTML = CONFIG.home.stats
            .map((stat, index) => `
                <a href="#" data-tab="journey" class="stat-card tab-link" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="stat-number">${stat.number}</div>
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-arrow">→</div>
                </a>
            `).join('');
    }
    
    const highlightsGrid = document.getElementById('highlights-grid');
    if (highlightsGrid && CONFIG.home && CONFIG.home.highlights) {
        highlightsGrid.innerHTML = CONFIG.home.highlights
            .map((highlight, index) => `
                <a href="#" data-tab="projects" class="highlight-card tab-link" data-aos="fade-up" data-aos-delay="${index * 100 + 100}">
                    <div class="highlight-image-container">
                        <img src="${highlight.image}" alt="${highlight.title}" class="highlight-image" />
                    </div>
                    <h3>${highlight.title}</h3>
                    <p>${highlight.description}</p>
                    <div class="highlight-arrow">→</div>
                </a>
            `).join('');
    }
    
    // Recognitions section (Patents, Rewards & Recognitions)
    const recognitionsGrid = document.getElementById('recognitions-grid');
    if (recognitionsGrid && CONFIG.home && CONFIG.home.recognitions) {
        recognitionsGrid.innerHTML = CONFIG.home.recognitions
            .map((recognition, index) => {
                const cardContent = `
                    <div class="recognition-image-container">
                        <img src="${recognition.image}" alt="${recognition.title}" class="recognition-image" />
                    </div>
                    <div class="recognition-content">
                        <div class="recognition-header">
                            <span class="recognition-category">${recognition.category}</span>
                            <span class="recognition-year">${recognition.year}</span>
                        </div>
                        <h3>${recognition.title}</h3>
                        <p>${recognition.description}</p>
                        ${recognition.link ? '<span class="recognition-link-indicator">View Details →</span>' : ''}
                    </div>
                `;
                
                if (recognition.link) {
                    return `<a href="${recognition.link}" target="_blank" rel="noopener noreferrer" class="recognition-card recognition-card-link" data-aos="fade-up" data-aos-delay="${index * 100}">${cardContent}</a>`;
                } else {
                    return `<div class="recognition-card" data-aos="fade-up" data-aos-delay="${index * 100}">${cardContent}</div>`;
                }
            }).join('');
    }
    
    // Journey section (combines about intro + experience timeline)
    const journeyIntro = document.getElementById('journey-intro');
    const journeyTimeline = document.getElementById('journey-timeline');
    
    if (journeyIntro && CONFIG.journey && CONFIG.journey.intro) {
        journeyIntro.innerHTML = CONFIG.journey.intro
            .map((paragraph, index) => `<p data-aos="fade-up" data-aos-delay="${index * 100 + 100}" data-aos-duration="700">${paragraph}</p>`)
            .join('');
    }
    
    if (journeyTimeline && CONFIG.journey && CONFIG.journey.timeline) {
        journeyTimeline.innerHTML = CONFIG.journey.timeline
            .map((item, index) => {
                // Alternate between left and right animations
                const animation = index % 2 === 0 ? 'fade-right' : 'fade-left';
                const delay = index * 150; // Stagger animations as user scrolls
                
                return `
                <div class="timeline-item" data-aos="${animation}" data-aos-delay="${delay}" data-aos-duration="800" data-aos-once="false">
                    <div class="timeline-marker" data-aos="zoom-in" data-aos-delay="${delay + 200}" data-aos-duration="600"></div>
                    <div class="timeline-content">
                        <h3 data-aos="fade-up" data-aos-delay="${delay + 100}">${item.title}</h3>
                        <p class="timeline-company" data-aos="fade-up" data-aos-delay="${delay + 200}">${item.company}</p>
                        <p class="timeline-period" data-aos="fade-up" data-aos-delay="${delay + 250}">${item.period}</p>
                        <p data-aos="fade-up" data-aos-delay="${delay + 300}">${item.description}</p>
                    </div>
                </div>
            `}).join('');
    }
    
    // About section (legacy - keeping for backwards compatibility with multi-page if needed)
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        // Use journey intro if available, otherwise fall back to old about array
        const aboutText = (CONFIG.journey && CONFIG.journey.intro) ? CONFIG.journey.intro : CONFIG.about;
        if (aboutText) {
            aboutContent.innerHTML = aboutText
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }
    }
    
    // Footer
    const currentYear = document.getElementById('current-year');
    const footerName = document.getElementById('footer-name');
    const footerLocation = document.getElementById('footer-location');
    
    if (currentYear) currentYear.textContent = new Date().getFullYear();
    if (footerName) footerName.textContent = CONFIG.personal.name;
    if (footerLocation) footerLocation.textContent = CONFIG.personal.location;
}

// ========================================
// SECURE CONTACT INFO INITIALIZATION
// Uses ContactSecurity module for obfuscation
// ========================================
function initializeSecureContactInfo() {
    // Email setup with security
    const contactEmail = document.getElementById('contact-email');
    const contactEmailText = document.getElementById('contact-email-text');
    
    if (contactEmail && CONFIG.personal.emailEncoded) {
        ContactSecurity.setupEmailLink(
            contactEmail, 
            CONFIG.personal.emailEncoded,
            contactEmailText
        );
        
        // Add security indicator class
        contactEmail.classList.add('secure-contact-link');
        contactEmail.setAttribute('data-security', 'pending');
        
        // Update security status when verified
        const checkVerification = setInterval(() => {
            if (ContactSecurity.isVerified()) {
                contactEmail.setAttribute('data-security', 'verified');
                clearInterval(checkVerification);
            }
        }, 1000);
    } else if (contactEmail && CONFIG.personal.email) {
        // Fallback to old method if emailEncoded not configured
        console.warn('Using legacy email config. Consider upgrading to emailEncoded for better security.');
        const emailParts = CONFIG.personal.email.split('@');
        if (emailParts.length === 2) {
            contactEmail.setAttribute('data-user', btoa(emailParts[0]));
            contactEmail.setAttribute('data-domain', btoa(emailParts[1]));
            contactEmail.addEventListener('click', function(e) {
                e.preventDefault();
                const user = atob(this.getAttribute('data-user'));
                const domain = atob(this.getAttribute('data-domain'));
                window.location.href = `mailto:${user}@${domain}`;
            });
            if (contactEmailText) {
                contactEmailText.textContent = CONFIG.personal.email;
            }
        }
    }
    
    // Phone setup with security
    const contactPhone = document.getElementById('contact-phone');
    const contactPhoneText = document.getElementById('contact-phone-text');
    
    if (contactPhone && CONFIG.personal.phoneEncoded) {
        ContactSecurity.setupPhoneLink(
            contactPhone,
            CONFIG.personal.phoneEncoded,
            contactPhoneText
        );
        
        contactPhone.classList.add('secure-contact-link');
        contactPhone.setAttribute('data-security', 'pending');
        
        const checkPhoneVerification = setInterval(() => {
            if (ContactSecurity.isVerified()) {
                contactPhone.setAttribute('data-security', 'verified');
                clearInterval(checkPhoneVerification);
            }
        }, 1000);
    } else if (contactPhone && CONFIG.personal.phone) {
        // Fallback to old method if phoneEncoded not configured
        console.warn('Using legacy phone config. Consider upgrading to phoneEncoded for better security.');
        contactPhone.setAttribute('data-phone', btoa(CONFIG.personal.phone));
        contactPhone.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = atob(this.getAttribute('data-phone'));
            window.location.href = `tel:${phone}`;
        });
        if (contactPhoneText) {
            contactPhoneText.textContent = CONFIG.personal.phone;
        }
    }
    
    // LinkedIn and GitHub (less sensitive)
    const contactLinkedin = document.getElementById('contact-linkedin');
    const contactGithub = document.getElementById('contact-github');
    
    if (contactLinkedin) contactLinkedin.href = `https://linkedin.com/in/${CONFIG.personal.linkedin}`;
    if (contactGithub) contactGithub.href = `https://github.com/${CONFIG.personal.github}`;
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
    
    // Always show projects/highlights nav item (contains recognitions + optional GitHub projects)
    const navProjects = document.getElementById('nav-projects');
    if (navProjects) {
        navProjects.classList.remove('hidden');
    }
    
    // Show/hide GitHub projects subsection in Highlights
    const githubProjectsSection = document.getElementById('github-projects-section');
    if (githubProjectsSection && !CONFIG.features.showProjects) {
        githubProjectsSection.style.display = 'none';
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
            navResumeLink.target = '_blank';
            navResume.classList.remove('hidden');
        }
        
        // Hero button (home page only)
        const heroResume = document.getElementById('hero-resume');
        if (heroResume) {
            heroResume.href = resumeFilename;
            heroResume.target = '_blank';
            heroResume.classList.remove('hidden');
        }
        
        // Quick link card on home page
        const heroResumeCard = document.getElementById('hero-resume-card');
        if (heroResumeCard) {
            heroResumeCard.href = resumeFilename;
            heroResumeCard.target = '_blank';
            heroResumeCard.classList.remove('hidden');
        }
        
        // Contact section link
        const contactResume = document.getElementById('contact-resume');
        const contactResumeText = document.getElementById('contact-resume-text');
        if (contactResume && contactResumeText) {
            contactResume.href = resumeFilename;
            contactResume.target = '_blank';
            contactResumeText.textContent = resumeLabel;
            contactResume.classList.remove('hidden');
        }
    }
}

// ========================================
// TAB SYSTEM
// ========================================
function initializeTabs() {
    // Get all tab links
    const tabLinks = document.querySelectorAll('.tab-link');
    
    // Add click event to each tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            if (tabName) {
                switchTab(tabName);
            }
        });
    });
    
    // Check URL hash for initial tab
    const hash = window.location.hash.substring(1);
    if (hash) {
        switchTab(hash);
    }
}

function switchTab(tabName) {
    // Hide all tab contents
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab links
    const allLinks = document.querySelectorAll('.tab-link');
    allLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Update URL hash without scrolling
        history.replaceState(null, null, `#${tabName}`);
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Dispatch custom event for AOS refresh
        document.dispatchEvent(new CustomEvent('tabChanged'));
    }
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
// SECURE CONTACT FORM
// Enhanced with honeypots, timing checks, and interaction verification
// ========================================
function initializeSecureContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Decode and set form action
    if (CONFIG.contactForm && CONFIG.contactForm.formspreeId) {
        try {
            const formId = atob(CONFIG.contactForm.formspreeId);
            form.action = `https://formspree.io/f/${formId}`;
        } catch(e) {
            console.error('Invalid form configuration');
            return;
        }
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Add security status indicator
    const securityStatus = document.createElement('div');
    securityStatus.className = 'form-security-status pending';
    securityStatus.innerHTML = '<span>Verifying you\'re human...</span>';
    
    if (submitBtn) {
        submitBtn.parentNode.insertBefore(securityStatus, submitBtn.nextSibling);
    }
    
    // Update status when verified
    const updateStatus = setInterval(() => {
        if (ContactSecurity.isVerified()) {
            securityStatus.className = 'form-security-status verified';
            securityStatus.innerHTML = '<span>Ready to send</span>';
            clearInterval(updateStatus);
        }
    }, 500);
    
    // Enhanced form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const statusDiv = document.getElementById('form-status');
        const originalBtnText = submitBtn.textContent;
        
        // Security check
        if (!ContactSecurity.isVerified()) {
            statusDiv.textContent = '⚠️ Please interact with the page (scroll, click) before sending.';
            statusDiv.className = 'form-status error';
            statusDiv.classList.remove('hidden');
            return;
        }
        
        // Check all honeypot fields
        const honeypots = ['_gotcha', 'website', 'phone_confirm', 'fax'];
        for (const hp of honeypots) {
            const field = form.querySelector(`[name="${hp}"]`);
            if (field && field.value !== '') {
                console.log('Bot detected via honeypot');
                // Fake success to confuse bot
                statusDiv.textContent = '✓ Message sent!';
                statusDiv.className = 'form-status success';
                statusDiv.classList.remove('hidden');
                return;
            }
        }
        
        // Check timing
        const timestampField = form.querySelector('[name="_timestamp"]');
        if (timestampField) {
            const elapsed = Date.now() - parseInt(timestampField.value);
            const minTime = (CONFIG.contactForm && CONFIG.contactForm.minFormFillTime) || 3000;
            if (elapsed < minTime) {
                console.log('Form submitted too quickly');
                statusDiv.textContent = '⚠️ Please take a moment to fill out the form.';
                statusDiv.className = 'form-status error';
                statusDiv.classList.remove('hidden');
                return;
            }
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusDiv.classList.add('hidden');
        
        try {
            const formData = new FormData(form);
            
            // Remove honeypot fields from submission
            honeypots.forEach(hp => formData.delete(hp));
            formData.delete('_timestamp');
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                statusDiv.textContent = '✓ Thank you! Your message has been sent successfully.';
                statusDiv.className = 'form-status success';
                statusDiv.classList.remove('hidden');
                form.reset();
                
                // Reset timestamp for next submission
                if (timestampField) {
                    timestampField.value = Date.now();
                }
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            statusDiv.textContent = '✗ Unable to send. Please try again or email directly.';
            statusDiv.className = 'form-status error';
            statusDiv.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

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
