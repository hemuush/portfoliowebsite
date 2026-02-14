const portfolioData = {
    // SYSTEM QUOTES (Retaining your Anime Theme)
    quotes: {
        "boot": { text: "Hello, Friend. System initialized.", source: "Mr. Robot" },
        "projects": { text: "I am the one who knocks.", source: "Breaking Bad" },
        "experience": { text: "Chaos is a ladder.", source: "Game of Thrones" },
        "skills": { text: "Go beyond! Plus Ultra!", source: "My Hero Academia" },
        "contact": { text: "If you don't fight, you can't win.", source: "Attack on Titan" }
    },

    // PROJECTS (Synced with Resume)
    projects: [
        {
            title: "ConnectCEOBot",
            status: "LIVE",
            desc: "AI chatbot on Azure AI Foundry simulating CEO interactions. Features custom voice cloning and CosmosDB auto-refresh pipelines.",
            tags: ["Azure AI Foundry", "CosmosDB", "Voice AI"]
        },
        {
            title: "KBOT-AI (HR Assistant)",
            status: "DEPLOYED",
            desc: "GenAI HR assistant integrated with MS Teams. Automates policy queries, leave requests, and holiday info.",
            tags: ["Python", ".NET", "Azure OpenAI", "MS Teams"]
        },
        {
            title: "BackcheckAI",
            status: "V1.0",
            desc: "Risk-assessment tool automating data extraction, sentiment analysis, and risk tagging for background checks.",
            tags: ["NLP", "Risk Analysis", "Python"]
        },
        {
            title: "Expense Automation",
            status: "PROD",
            desc: "OCR-based system for invoice data extraction, optimizing manual financial workflows.",
            tags: ["OCR", "Automation", "Finance Ops"]
        }
    ],

    // EXPERIENCE (Synced with Resume)
    experience: [
        {
            role: "Senior Executive",
            company: "Walker Chandiok & Co LLP",
            date: "12/2024 - Present",
            desc: "Building GenAI agents using MCP framework and Copilot Studio. Delivered scalable solutions like ConnectCEOBot and Expense Automation."
        },
        {
            role: "Analyst",
            company: "KPMG India",
            date: "01/2022 - 11/2024",
            desc: "Contributed to Tax & Forensic real-time ML projects. Focused on Azure Cloud DevOps, middleware development, and API lifecycle management."
        }
    ],

    // SKILLS (Synced with Resume)
    skills: {
        "AI_&_GEN_AI": ["Azure AI Foundry", "OpenAI", "LangChain", "Copilot Studio", "MCP Framework"],
        "BACKEND_CORE": ["Python", "FastAPI", "Django", ".NET", "REST APIs"],
        "CLOUD_&_DEVOPS": ["Azure Functions", "CosmosDB", "Docker", "Git/TFS", "CI/CD"],
        "DATA_SCIENCE": ["Pandas", "NumPy", "PyTorch", "OpenCV", "Scikit-Learn"]
    }
};