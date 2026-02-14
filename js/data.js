const PortfolioData = {
    pageTitle: "Hemant Sharma | Python Developer",

    hero: {
        name: "Hemant Sharma",
        role: "> PYTHON DEVELOPER // AI & CLOUD",
        // Short, punchy lines—use array for multi-line display, or single string
        bio: [
            "I build AI that ships.",
            "GenAI · Azure · Python · MCP.",
            "Let's connect →"
        ],
        imageUrl: "Hemant Sharma.jpg",
        imageAlt: "Hemant Sharma",
        badgeStatus: "ONLINE"
    },

    stats: [
        { value: "3.4+", label: "YRS EXP", icon: "calendar" },
        { value: "4", label: "PROJECTS", icon: "folder-git-2" }
    ],

    contact: {
        location: "Noida, India",
        links: [
            { type: "github", url: "https://github.com/hemuush", icon: "github" },
            { type: "linkedin", url: "https://www.linkedin.com/in/hemuush/", icon: "linkedin" },
            { type: "mail", url: "mailto:hemant.shar.3004@gmail.com", icon: "mail" }
        ]
    },

    sections: {
        logs: "SYSTEM_LOGS",
        trajectory: "TRAJECTORY",
        metrics: "METRICS",
        skills: "NEURAL_ARSENAL",
        projects: "ACTIVE_MISSIONS"
    },

    quotes: [
        { text: "Hello, Friend. System initialized.", source: "Mr. Robot" },
        { text: "I am the one who knocks.", source: "Breaking Bad" },
        { text: "Chaos is a ladder.", source: "Game of Thrones" },
        { text: "Go beyond! Plus Ultra!", source: "My Hero Academia" },
        { text: "If you don't fight, you can't win.", source: "Attack on Titan" }
    ],

    projects: [
        {
            title: "ConnectCEOBot",
            status: "10/2025 – 12/2025",
            desc: "AI chatbot built on Azure AI Foundry that simulates interactive conversations with the company's CEO. Uses CosmosDB for scalable storage and an automated data refresh pipeline. Integrated a custom-trained CEO voice for realistic voice interactions. Designed for leadership communication, demos, and high-value executive workflows.",
            tags: ["Azure AI Foundry", "CosmosDB", "Voice AI"]
        },
        {
            title: "KBOT-AI",
            status: "AI-Assistant Tool",
            desc: "AI HR assistant built using Python, .NET, and Azure OpenAI. Provides responses for HR policies, leave queries, and holiday information. Integrated with Microsoft Teams for seamless access. Helps organizations automate HR support and enhance employee experience.",
            tags: ["Python", ".NET", "Azure OpenAI", "Teams"]
        },
        {
            title: "BackcheckAI",
            status: "08/2025 – 11/2025",
            desc: "AI-powered data summarization and risk-assessment tool that collects information from multiple sources, analyzes the data, and classifies content based on potential risk indicators. Automates data extraction, summarization, sentiment analysis, and risk tagging to support faster decision-making and reduce manual review efforts.",
            tags: ["NLP", "Risk Analysis", "Python"]
        },
        {
            title: "Expense Automation",
            status: "PROD",
            desc: "OCR-based Expense Automation System for invoice data extraction. Built as a cloud-ready solution to optimize manual financial workflows and improve automation efficiency.",
            tags: ["OCR", "Automation", "Azure"]
        }
    ],

    experience: [
        {
            role: "Senior Executive",
            company: "Walker Chandiok & Co LLP (Grant Thornton India)",
            date: "12/2024 – Present",
            desc: "Worked on solutions such as Expense Automation System with OCR for invoice data extraction, BackgroundCheckAI, and ConnectCEOBot. Built cloud-ready solutions using Azure AI Foundry and contributed to AI/ML model development and deployment. Developed AI agents using MCP, implemented advanced web scraping, and built intelligent workflows in Copilot Studio to improve automation efficiency. Focused on optimizing manual processes, improving performance, and delivering scalable business applications."
        },
        {
            role: "Analyst",
            company: "KPMG India",
            date: "01/2022 – 11/2024",
            desc: "Worked on real-time Machine Learning and Software Development projects related to Tax and Forensic services. Gained hands-on experience in Azure cloud fundamentals and DevOps practices. Contributed to backend development, data processing pipelines, and automation modules."
        }
    ],

    skills: {
        PYTHON: ["Pandas", "NumPy", "OpenAI", "Matplotlib", "Django", "Sci-kit Learn", "PyTorch", "OpenCV", "Langchain"],
        AI_AUTOMATION: ["GenAI solutions", "AI agents", "MCP framework", "OpenAI integration", "Prompting", "Copilot Studio", "OCR", "Web scraping"],
        CLOUD_DEVOPS: ["Azure AI Foundry", "Azure OpenAI", "AI Search", "API Management", "App Services", "CosmosDB", "Redis Cache", "Azure Fundamentals", "Git", "TFS"],
        DATABASE: ["MongoDB", "MySQL", "MS SQL"],
        DEVELOPMENT: ["Middleware development", "Debugging", "Bug fixing", "Production support", "Agile methodology", "API lifecycle management"]
    }
};
