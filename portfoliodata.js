const portfolioData = {
    // SYSTEM QUOTES (TV Shows)
    quotes: {
        "boot": { text: "Hello, Friend. System initialized.", source: "Mr. Robot" },
        "projects": { text: "I am the one who knocks.", source: "Breaking Bad" },
        "experience": { text: "Chaos is a ladder.", source: "Game of Thrones" },
        "skills": { text: "Go beyond! Plus Ultra!", source: "My Hero Academia" },
        "contact": { text: "If you don't fight, you can't win.", source: "Attack on Titan" }
    },
    // PROJECTS
    projects: [
        {
            title: "Autonomous HR Agent",
            status: "DEPLOYED",
            desc: "A cognitive agent using Tool Calling to automate HR workflows. It executes tasks autonomously.",
            tags: ["LangChain", "OpenAI", "Azure"]
        },
        {
            title: "Integrated GST Suite",
            status: "PROD",
            desc: "High-precision financial tool for mass tax filing. 99.1% code purity.",
            tags: ["Python", ".NET", "SQL"]
        },
        {
            title: "RAG Knowledge Engine",
            status: "BETA",
            desc: "Ingesting thousands of documents for instant semantic retrieval.",
            tags: ["Vector DB", "Embeddings", "FastAPI"]
        },
        {
            title: "Resume Parser Bot",
            status: "V1.0",
            desc: "NLP pipeline to extract entities and match candidates with precision.",
            tags: ["Spacy", "ML", "Python"]
        }
    ],
    // EXPERIENCE
    experience: [
        {
            role: "Senior Executive",
            company: "Walker Chandiok & Co",
            date: "2024 - Present",
            desc: "Leading the realm of AI forensic tools. Securing the perimeter."
        },
        {
            role: "Analyst",
            company: "KPMG India",
            date: "2022 - 2024",
            desc: "The origin story. Built the GST suite and pioneered internal GenAI chatbots."
        }
    ],
    // SKILLS
    skills: {
        "NEURAL_NETWORKS": ["OpenAI API", "LangChain", "LlamaIndex", "Vector DBs"],
        "BACKEND_CORE": ["Python", "Django", "FastAPI", "Microservices"],
        "INFRASTRUCTURE": ["Azure AI", "Docker", "Kubernetes", "CI/CD"]
    }
};