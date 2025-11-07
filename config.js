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
        showBlog: false,        // Toggle Medium blog section
        showProjects: true,    // Toggle GitHub projects subsection within Highlights
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
        maxRepos: 6,                 // Number of repos to display
        sortBy: "stars",           // Options: 'updated', 'stars', 'created'
        excludeForked: true          // Hide forked repositories
    },

    // ========================================
    // HOME PAGE CONTENT
    // ========================================
    home: {
        heroIntro: "Whether launching one of Ubisoft's largest titles, scaling global payment systems at Brex, or creating the world's first 3D motion-capture garment at Heddoko, I've always connected engineering excellence with human impact.",
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
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&auto=format&sat=-100",
                description: "Led 100+ engineers across Montreal, Kyiv, Winnipeg, and Toronto for Ubisoft's Rainbow Six, creating shared purpose across studios."
            },
            {
                title: "Fintech Infrastructure",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format&sat=-100",
                description: "Built and scaled Brex's global card platform moving billions securely across borders, reducing costs and opening new revenue streams."
            },
            {
                title: "Startup Innovation",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&auto=format&sat=-100",
                description: "Founded Heddoko, creating smart garments with 3D motion capture featured at CES 2016 and NFL's First & Future program."
            }
        ],
        recognitions: [
            {
                title: "Motion Capture Garment Patent",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&auto=format&sat=-100",
                category: "Patent",
                year: "2017",
                description: "Patent for innovative 3D motion capture system integrated into wearable garments.",
                link: "https://patents.google.com/patent/WO2017088068A1/un"
            },
            {
                title: "NFL 1st & Future Finalist",
                image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=300&fit=crop&auto=format&sat=-100",
                category: "Recognition",
                year: "2016",
                description: "TechCrunch & NFL First and Future finalist for athlete health and performance technology innovation.",
                link: "https://www.youtube.com/watch?v=TfFeJpMySok&t=2s&ab_channel=TechCrunch"
            },
            {
                title: "Wearable Technology Innovation World Cup Finalist",
                image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop&auto=format&sat=-100",
                category: "Award",
                year: "2015",
                description: "Recognized as a Wearable Technologies Hero of the Year for innovation in wearable technology.",
                link: "https://wt-obk.wearable-technologies.com/2015/01/meet-the-wt-wearable-technologies-heroes-of-the-year/"
            },
            {
                title: "Techstars Boston Alumni",
                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&auto=format&sat=-100",
                category: "Recognition",
                year: "2015",
                description: "Graduated from Techstars Boston accelerator program, Spring 2015 cohort.",
                link: "https://www.youtube.com/watch?v=XVWeY7Acp_Q&ab_channel=BostInno"
            },
            {
                title: "DICOM Tags Management Patent",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&auto=format&sat=-100",
                category: "Patent",
                year: "2007",
                description: "Method for increasing flexibility of DICOM tags management in application-specific integration.",
                link: "http://www.google.ch/patents/US20070041647"
            },
            {
                title: "OMIRAD: Optical-MRI Coregistration Platform",
                image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop&auto=format&sat=-100",
                category: "Research",
                year: "2007",
                description: "Standardized platform for coregistration of nonconcurrent diffuse optical and magnetic resonance imaging.",
                link: "https://www.spiedigitallibrary.org/journals/journal-of-biomedical-optics/volume-12/issue-5/051902/Standardized-platform-for-coregistration-of-nonconcurrent-diffuse-optical-and-magnetic/10.1117/1.2798630.full?SSO=1"
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
                description: "Leading 100+ global engineers across Montreal, Kyiv, Winnipeg, and Toronto for Rainbow Six. Driving cross-studio collaboration, reorganizing engineering org for better execution, and championing AI integration to boost developer productivity."
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
                description: "Founded and led ML-driven development of real-time motion analytics wearables. Secured $1.5M seed funding, grew team to 20+ people. Techstars Boston 2015 alumni, featured in TechCrunch, CES 2016, and NFL's First & Future program."
            },
            {
                title: "Software Engineering Consultant",
                company: "Various Clients",
                period: "2012 - 2014",
                description: "Led diverse software engineering projects across healthcare, sports analytics, wearables, and web development. Built cloud-based 3D medical imaging visualization (Intrinsic Medical Imaging - C++/OpenGL), motion recognition web interfaces (SportsLogIQ - JavaScript/Node.js), Neptune Pine smartwatch OS (Mobilogie - Android/Java), video surveillance integration (Genetec - C++/C#), and interactive promotional websites (BAM Strategy - HTML5/CSS3). Demonstrated versatility across platforms and technology stacks."
            },
            {
                title: "Software Engineer - Gaming",
                company: "Ubisoft & Behaviour Interactive",
                period: "2007 - 2012",
                description: "Pioneered Kinect game engine development at Ubisoft, leading team of 12 engineers. Released \"Your Shape Fitness 2012,\" \"Michael Jackson the Experience,\" and \"Just Dance Kinect\" for Xbox 360. At Behaviour Interactive, shipped Iron Man game (Marvel's first Iron Man movie tie-in) and My Sims Racing for Xbox, PSP, and Wii. Advanced C++ game development across multiple platforms."
            },
            {
                title: "Software Engineer - Healthcare & Medical Imaging",
                company: "Siemens Corporate Research & Cynovad",
                period: "2006 - 2007",
                description: "Built OMIRAD software for volumetric visualization of breast cancer based on multiple medical imaging techniques at Siemens (received DICOM tags management patent). Developed UI for 3D dental CAD/CAM software and mesh generation algorithms for 3D printing of dental implants at Cynovad. Advanced C++ development with medical imaging standards and digital dentistry systems."
            }
        ]
    }
};
