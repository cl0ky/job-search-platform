import 'dotenv/config'
import { prisma } from './prisma/client.js'

const jobs = [
  {
    "title": "Fullstack Developer",
    "company": "Tech Nusantara",
    "location": "Jakarta",
    "salaryMin": 8000000,
    "salaryMax": 15000000,
    "description": "Develop and maintain fullstack web applications using React and Node.js.",
    "tags": ["react", "nodejs", "fullstack"]
  },
  {
    "title": "Backend Engineer",
    "company": "Digital Solusi",
    "location": "Bandung",
    "salaryMin": 7000000,
    "salaryMax": 12000000,
    "description": "Build scalable APIs using Golang and PostgreSQL.",
    "tags": ["golang", "api", "postgres"]
  },
  {
    "title": "Frontend Developer",
    "company": "Startup XYZ",
    "location": "Remote",
    "salaryMin": 6000000,
    "salaryMax": 10000000,
    "description": "Create responsive UI using React and Tailwind.",
    "tags": ["react", "frontend", "tailwind"]
  },
  {
    "title": "DevOps Engineer",
    "company": "Cloud Indo",
    "location": "Jakarta",
    "salaryMin": 9000000,
    "salaryMax": 16000000,
    "description": "Manage CI/CD pipelines and cloud infrastructure.",
    "tags": ["docker", "kubernetes", "aws"]
  },
  {
    "title": "QA Engineer",
    "company": "Test Corp",
    "location": "Jakarta",
    "salaryMin": 5000000,
    "salaryMax": 9000000,
    "description": "Perform manual and automated testing.",
    "tags": ["testing", "qa"]
  },
  {
    "title": "Mobile Developer",
    "company": "App Kreatif",
    "location": "Yogyakarta",
    "salaryMin": 7000000,
    "salaryMax": 11000000,
    "description": "Build mobile apps using Flutter.",
    "tags": ["flutter", "mobile"]
  },
  {
    "title": "UI/UX Designer",
    "company": "Creative Studio",
    "location": "Surabaya",
    "salaryMin": 5000000,
    "salaryMax": 8000000,
    "description": "Design user interfaces and experiences.",
    "tags": ["figma", "design"]
  },
  {
    "title": "Data Analyst",
    "company": "Insight Data",
    "location": "Jakarta",
    "salaryMin": 7000000,
    "salaryMax": 12000000,
    "description": "Analyze data and create dashboards.",
    "tags": ["sql", "data", "analytics"]
  },
  {
    "title": "System Administrator",
    "company": "Infra Tech",
    "location": "Bandung",
    "salaryMin": 6000000,
    "salaryMax": 10000000,
    "description": "Maintain server and network infrastructure.",
    "tags": ["linux", "network"]
  },
  {
    "title": "Machine Learning Engineer",
    "company": "AI Labs",
    "location": "Jakarta",
    "salaryMin": 10000000,
    "salaryMax": 20000000,
    "description": "Develop ML models and pipelines.",
    "tags": ["python", "ml", "ai"]
  },

  {
    "title": "Backend Developer",
    "company": "E-Commerce Indo",
    "location": "Jakarta",
    "description": "Develop backend services with Node.js.",
    "tags": ["nodejs", "backend"]
  },
  {
    "title": "Frontend Engineer",
    "company": "Web Kreatif",
    "location": "Bandung",
    "description": "Develop UI using Vue.js.",
    "tags": ["vue", "frontend"]
  },
  {
    "title": "Security Engineer",
    "company": "Cyber Secure",
    "location": "Jakarta",
    "salaryMin": 9000000,
    "salaryMax": 17000000,
    "description": "Ensure application security.",
    "tags": ["security", "pentest"]
  },
  {
    "title": "Game Developer",
    "company": "Game Studio",
    "location": "Bandung",
    "salaryMin": 7000000,
    "salaryMax": 13000000,
    "description": "Develop games using Unity.",
    "tags": ["unity", "game"]
  },
  {
    "title": "Product Manager",
    "company": "Tech Startup",
    "location": "Jakarta",
    "salaryMin": 12000000,
    "salaryMax": 25000000,
    "description": "Manage product lifecycle.",
    "tags": ["product", "management"]
  },
  {
    "title": "Business Analyst",
    "company": "Consulting Indo",
    "location": "Jakarta",
    "salaryMin": 8000000,
    "salaryMax": 15000000,
    "description": "Analyze business requirements.",
    "tags": ["business", "analysis"]
  },
  {
    "title": "Cloud Engineer",
    "company": "Cloudify",
    "location": "Remote",
    "salaryMin": 10000000,
    "salaryMax": 18000000,
    "description": "Manage cloud infrastructure.",
    "tags": ["aws", "cloud"]
  },
  {
    "title": "Software Engineer",
    "company": "Global Tech",
    "location": "Jakarta",
    "salaryMin": 9000000,
    "salaryMax": 14000000,
    "description": "Develop scalable applications.",
    "tags": ["java", "spring"]
  },
  {
    "title": "Intern Developer",
    "company": "Startup Baru",
    "location": "Bandung",
    "salaryMin": 2000000,
    "salaryMax": 3000000,
    "description": "Assist development team.",
    "tags": ["intern", "developer"]
  },
  {
    "title": "Technical Writer",
    "company": "Docs Indo",
    "location": "Remote",
    "description": "Write technical documentation.",
    "tags": ["writing", "docs"]
  }
]

async function seed() {
  console.log('Seeding database...')
  await prisma.job.deleteMany()

  for (const job of jobs) {
    await prisma.job.create({ data: job })
  }

  console.log(`Seeded ${jobs.length} jobs successfully.`)
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
