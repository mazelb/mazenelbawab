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
        title: "Engineering Leadership · Systems at Scale",
        tagline: "Building & Scaling Innovative Products",
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
        showProjects: true,    // Toggle Highlights/Projects section
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
    // HOME PAGE CONTENT
    // ========================================
    home: {
        heroIntro: "Whether launching one of Ubisoft's largest mobile titles, scaling global payment systems at Brex, or creating the world's first 3D motion-capture garment at Heddoko, I've always connected engineering excellence with human impact.",
        intro: [
            "Throughout my career, I've always been drawn to building what didn't exist before — teams, systems, and technologies that push the edge of what's possible while standing the test of time."
        ],
        stats: [
            { number: "100+", label: "Engineers led globally" },
            { number: "$MM+", label: "Cost savings / new revenue" },
            { number: "3", label: "Industries at scale" },
            { number: "18+", label: "Years building products" }
        ],
        highlights: [
            {
                title: "Enterprise Scale",
                icon: "🏢",
                description: "Led 100+ engineers across Montreal, Kyiv, Winnipeg, and Toronto for Ubisoft's Rainbow Six Mobile, creating shared purpose across studios."
            },
            {
                title: "Fintech Infrastructure",
                icon: "💳",
                description: "Built and scaled Brex's global card platform moving billions securely across borders, reducing costs and opening new revenue streams."
            },
            {
                title: "Startup Innovation",
                icon: "🚀",
                description: "Founded Heddoko, creating smart garments with 3D motion capture featured at CES 2016 and NFL's First & Future program."
            }
        ]
    },

    // ========================================
    // MY JOURNEY SECTION
    // Combines background story with professional experience
    // ========================================
    journey: {
        intro: [
            "I've spent 18+ years building and scaling products across gaming, fintech, and wearable tech — leading teams from 12 to 100+ engineers across multiple continents.",
            
            "What sets me apart is the ability to operate at both startup speed and enterprise scale, moving at the pace of innovation while maintaining the engineering rigor that builds reliability and trust."
        ],
        timeline: [
            {
                title: "Director of Engineering",
                company: "Ubisoft",
                period: "2024 - Present",
                description: "Leading 100+ global engineers across Montreal, Kyiv, Winnipeg, and Toronto for Rainbow Six Mobile. Driving cross-studio collaboration, reorganizing engineering org for better execution, and championing AI integration to boost developer productivity."
            },
            {
                title: "Senior Engineering Manager",
                company: "Brex",
                period: "2021 - 2024",
                description: "Led 20+ engineers scaling Brex's global card platform. Rebuilt card issuance infrastructure, reduced third-party dependencies, and managed key partnerships."
            },
            {
                title: "Senior Engineering Manager",
                company: "Ubisoft",
                period: "2017 - 2021",
                description: "Led 30+ cross-functional engineers for Rainbow Six Siege across multiple studios. Oversaw partnerships with Microsoft, Sony, and Audio Kinetic."
            },
            {
                title: "Founder & CTO",
                company: "Heddoko",
                period: "2012 - 2017",
                description: "Founded and led ML-driven development of real-time motion analytics wearables. Secured $1.5M seed funding, grew team to 20+ people. Techstars alumni, featured in TechCrunch, CES 2016, and NFL's First & Future program."
            },
            {
                title: "Senior Software Engineer",
                company: "Ubisoft",
                period: "2009 - 2012",
                description: "Pioneered Kinect game engine development, leading team of 12 engineers. Released \"Your Shape Fitness 2012,\" \"Michael Jackson the Experience,\" and \"Just Dance Kinect\" for Xbox 360."
            }
        ]
    }
};
