// ========================================
// CONFIGURATION FILE
// Edit this file to customize your website
// ========================================

const CONFIG = {
    // ========================================
    // PERSONAL INFORMATION
    // ========================================
    personal: {
        name: "Mazen Elbawab",
        title: "Engineering Director",
        tagline: "Building & Scaling Innovative Products Across Fintech, Gaming & Wearable Tech",
        location: "Montreal, Quebec, Canada",
        email: "mazen.elbawab@gmail.com",
        phone: "+1-514-992-3126",
        linkedin: "mazenelbawab",  // Just the username
        github: "mazelb"            // Just the username
    },

    // ========================================
    // FEATURE TOGGLES
    // Set to true/false to show/hide sections
    // ========================================
    features: {
        showBlog: true,        // Toggle Medium blog section
        showProjects: true,    // Toggle GitHub projects section
        showResume: true       // Toggle resume download option
    },

    // ========================================
    // RESUME/CV
    // Place your PDF resume file in the same folder as index.html
    // ========================================
    resume: {
        filename: "resume_2026.pdf",  // Name of your PDF file
        label: "Download Resume" // Button text
    },

    // ========================================
    // GOOGLE ANALYTICS
    // Get your Measurement ID from https://analytics.google.com
    // Format: G-XXXXXXXXXX
    // Set to null or empty string to disable analytics
    // ========================================
    analytics: {
        measurementId: "G-XXXXXXXXXX"  // Replace with your Google Analytics Measurement ID
    },

    // ========================================
    // CONTACT FORM (FORMSPREE)
    // Sign up at https://formspree.io to get your form endpoint
    // IMPORTANT: Store your Formspree ID as Base64 encoded for basic obfuscation
    // To encode: btoa('your_form_id') in browser console or use online tool
    // ========================================
    contactForm: {
        formspreeId: "bXl6YnFqcno="  // Base64 encoded form ID (decodes to: myzbqjrz)
    },

    // ========================================
    // MEDIUM BLOG INTEGRATION
    // ========================================
    medium: {
        username: "@mazenelbawab",  // Your Medium username (include @)
        maxPosts: 3                  // Number of posts to display
    },

    // ========================================
    // GITHUB PROJECTS INTEGRATION
    // ========================================
    github: {
        username: "mazelb",          // Your GitHub username
        maxRepos: 3,                 // Number of repos to display
        sortBy: "updated",           // Options: 'updated', 'stars', 'created'
        excludeForked: true          // Hide forked repositories
    },

    // ========================================
    // ABOUT SECTION
    // Each string is a separate paragraph
    // ========================================
    about: [
        "With 18 years in software engineering and 12+ years in leadership, I'm an Engineering Director known for building and scaling innovative products across diverse industries. I specialize in architecting complex systems, leading high-impact teams, and driving strategic initiatives that merge technology and vision.",
        
        "My journey has taken me from pioneering Kinect game development at Ubisoft, to founding Heddoko—a wearable tech startup that created the world's first 3D motion-capture garment—to building global payment infrastructure at Brex. Throughout, I've led teams ranging from 12 to over 100 engineers across multiple continents.",
        
        "I believe in lifelong learning, adapting quickly to new challenges, and taking full ownership of every project from vision to execution. Based in Montreal, I'm a single father who balances my passion for innovation with woodworking, cooking, and staying active."
    ]
};
