
const portfolioData = {
    hero: {
        name: "Hemant Sharma",
        title: "Analyst", // Or your preferred title
        taglinePhrases: [
            'Building robust backend solutions',
            'Creating AI-powered applications',
            'Developing with Python & Django',
            'Transforming ideas into code',
            'Solving complex problems with ML'
            // Add or change your typing phrases here
        ]
    },
    about: {
        description: [
            "Hemant Sharma is a skilled Python Developer with 2.8 years of experience in backend development, API creation, and machine learning integration. Skilled in Agile methodologies, Django, and OpenAI integration, deploying solutions in cloud and on-premises environments.",
            "His role at KPMG covers multiple service lines, including Tax, HR, and Forensic."
            // Add more paragraphs for your about section here
        ],
        stats: [
            { number: "3.2+", label: "Years Experience" }
            // Add other stats if you like, e.g., { number: "XX+", label: "Completed Projects" }
        ]
        // You could also add an imageUrl here for the about photo if you don't use the icon
        // imageUrl: "path/to/your/photo.jpg"
    },
    skills: {
        programmingLanguages: [
            "Python", "JavaScript", "HTML", "CSS", "Pandas", "Numpy", "Matplotlib", "PyTorch", "OpenCV"
            // Add/remove programming languages and libraries here
        ],
        backendFrameworks: [
            "Django", "Flask", "FastAPI", "RESTful APIs"
            // Add/remove backend frameworks and concepts here
        ],
        databases: [
            "MongoDB", "MySQL", "MS SQL"
            // Add/remove databases here
        ],
        machineLearning: [
            "Scikit-learn", "PyTorch", "OpenCV", "OpenAI Integration", "NLP"
            // Add/remove ML skills here
        ],
        cloudDevOps: [
            "Azure", "OpenAI (Azure)", "AI Search (Azure)", "API Management (Azure)", "App Services (Azure)", "Azure Fundamentals", "Redis Cache (Azure)", "Git", "TFS", "Azure DevOps"
            // Add/remove cloud and DevOps skills here
        ]
        // You can add more skill categories here if needed
    },
    projects: [
        {
            title: "KBOT-AI (AI-Assistant Tool)",
            tags: ["Python", "Azure OpenAI", ".NET", "Microsoft Teams"],
            description: "The AI chatbot assistant, developed using Azure OpenAI and various technologies, enhances user interactions by providing friendly responses to HR inquiries from policies, leave applications and holiday information. Integrates with Microsoft Teams for easy access, utilizing advanced AI to deliver accurate responses. This tool helps companies streamline HR processes and improve employee experience.",
            demoLink: "#", // Replace # with your demo URL if available
            codeLink: "#"  // Replace # with your code repository URL if available
        },
        {
            title: "KPMG Integrated GST Suite",
            tags: ["Python", "Azure", ".NET"],
            description: "A tool that streamlines the filing of GST returns, e-invoices, and e-way bills for businesses. Contributed to the GSTR-1 and GSTR-2 modules by developing data validation and reconciliation processes. Deployed on Azure using Containers and Function Apps, the project automates file processing with Python and features a .NET front end, significantly reducing the time and effort required for GST compliance.",
            demoLink: "#", // Replace # with your demo URL if available
            codeLink: "#"  // Replace # with your code repository URL if available
        },
        {
            title: "Resume Parsing",
            tags: ["Machine Learning", "AI", "Python"],
            description: "Assists recruiters in efficiently evaluating job applicants by leveraging machine learning and AI to compare resumes with job descriptions, calculating match percentages based on a weighted matrix. This systematic approach organizes resumes and ensures accuracy, saving time and allowing hiring managers to focus on the most qualified candidates.",
            demoLink: "#", // Replace # with your demo URL if available
            codeLink: "#"  // Replace # with your code repository URL if available
        }
        // Add more project objects here
    ],
    experience: [
        {
            date: "01/2022 - Present",
            title: "Analyst",
            company: "KPMG India",
            descriptionPoints: [
                "Working on real time Machine Learning and Software Development project, related to TAX and Forensic.",
                "Along with that also get know the knowledge of azure cloud fundamentals and Devoops."
                // Add more bullet points for this job experience
            ]
        }
        // Add more job experience objects here
    ],
    education: [
        {
            degree: "Bachelor of Technology, Computer Science",
            institution: "Punjabi University",
            date: "", // Add date if needed, e.g., "2016 - 2020"
            description: "" // Add description if needed
        }
        // Add more education objects here
    ],
    certifications: [ // Listed separately for clarity, will be combined in timeline
        {
            title: "Machine Learning from Stanford (Coursera)",
            date: "" // Add date if needed
        },
        {
            title: "Python (Basic), SQL (Basic), 5 star in Python (HackerRank)",
            date: "" // Add date if needed
        },
        {
            title: "Python for Everybody (Coursera)",
            date: "" // Add date if needed
        }
        // Add more certification objects here
    ],
    contact: {
        email: "hemant.shar.3004@gmail.com", // Your email
        phone: "8968104968", // Your phone number
        location: "Noida", // Your location
        socialLinks: [
            { iconClass: "fab fa-linkedin", url: "https://www.linkedin.com/in/hemuush/" }, // Your LinkedIn URL
            { iconClass: "fab fa-github", url: "https://github.com/hemuush" } // Your GitHub URL
            // Add more social links here, e.g., { iconClass: "fab fa-twitter", url: "your-twitter-url" }
        ]
    },
    footer: {
        name: "Hemant Sharma",
        year: "2025" // Update the year as needed
    }
};