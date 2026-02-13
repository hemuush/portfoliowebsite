const portfolioData = {
    hero: {
        name: "Hemant Sharma",
        title: "AI Architect & Backend Lead",
        taglinePhrases: [
            "Initializing Neural Networks...",
            "Deploying Autonomous Agents...",
            "Fine-Tuning RAG Pipelines...",
            "Hello, Friend." // Mr. Robot reference
        ]
    },
    system_protocols: [ // QUOTES DATABASE
        { id: "MR_ROBOT_01", text: "Control is an illusion.", source: "Mr. Robot" },
        { id: "GOT_LADDER", text: "Chaos isn't a pit. Chaos is a ladder.", source: "Game of Thrones" },
        { id: "BB_Knock", text: "I am the one who knocks.", source: "Breaking Bad" },
        { id: "AOT_FIGHT", text: "If you don't fight, you can't win.", source: "Attack on Titan" },
        { id: "DARK_LOOP", text: "The beginning is the end and the end is the beginning.", source: "Dark" }
    ],
    about: {
        description: [
            "<strong>\"No more half measures.\"</strong> (Breaking Bad). I don't just write scripts; I build robust, scalable <strong>cognitive architectures</strong>.",
            "From pure backend logic to <strong>Agentic AI</strong>, I engineer systems that think. I specialize in <strong>OpenAI</strong> integrations, <strong>Vector Search</strong>, and making LLMs do real work."
        ],
        stats: [
            { number: "3.5+", label: "Years Exp" },
            { number: "PROD", label: "Env Level" },
            { number: "99.9%", label: "Uptime" }
        ]
    },
    skills: {
        "Core_Intelligence": [ "Python", "LangChain", "OpenAI API", "LlamaIndex", "FastAPI" ],
        "Memory_Systems": [ "Pinecone", "Weaviate", "PostgreSQL", "Redis" ],
        "Infrastructure": [ "Azure AI", "Docker", "Kubernetes", "CI/CD Pipelines" ]
    },
    projects: [
        {
            title: "Autonomous HR Agent",
            type: "Agentic Workflow",
            tags: ["LangChain", "Tool Calling", "Azure"],
            description: "An autonomous agent using <strong>Tool Calling</strong> to handle HR operations. <em>\"Science is magic that works.\"</em>",
        },
        {
            title: "RAG Knowledge Engine",
            type: "Knowledge Pipeline",
            tags: ["Embeddings", "Vector DB", "Search"],
            description: "Ingests thousands of documents for instant retrieval. <em>\"The past affects the future.\"</em> (Dark)",
        },
        {
            title: "Resume Parsing Bot",
            type: "NLP System",
            tags: ["Spacy", "Cosine Similarity", "Python"],
            description: "Extracts entities and matches candidates with precision.",
        }
    ],
    experience: [
        {
            date: "Present",
            title: "Senior Executive",
            company: "Walker Chandiok Co & LLP",
            description: "Leading AI forensic tools. <em>\"Power is power.\"</em>"
        },
        {
            date: "2022-2024",
            title: "Analyst",
            company: "KPMG India",
            description: "Built the Integrated GST Suite and Internal Chatbots."
        }
    ],
    contact: {
        email: "hemant.shar.3004@gmail.com",
        socialLinks: [
            { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/hemuush/" },
            { icon: "fab fa-github", url: "https://github.com/hemuush" }
        ],
        footer: { name: "Hemant Sharma", year: "2025" }
    }
};