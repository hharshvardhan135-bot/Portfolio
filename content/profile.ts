export const profile = {
  name: "Harshvardhan Sinha",
  location: "Delhi, India",
  email: "hharshvardhan135@gmail.com",
  phone: "7982733196",
  linkedin: "https://www.linkedin.com/in/harshvardhan-sinha-6b153b373",
  leetcode: "https://leetcode.com/u/deluluCode",
  siteUrl: "", // TODO(harsh): add the portfolio's deployed URL before publishing.
  github: "", // TODO(harsh): add GitHub profile URL
  summary:
    "Final-year Computer Science student and Software Developer Intern building a foundation in backend and full-stack development. I bring a practical mindset, a willingness to learn, and experience contributing alongside a professional engineering team.",
  roles: ["Software Engineer", "Backend Developer", "Full-stack Developer"],
  availability: "Open to internship and entry-level roles",
  experience: {
    title: "Software Developer Intern",
    company: "Sri Aurobindo Society",
    team: "IT Department",
    dates: "Aug 2026 – Present",
    points: [
      "Collaborate with experienced software professionals on real-world projects and assigned development tasks.",
      "Identify, debug, and resolve issues encountered during development.",
      "Build hands-on understanding of the software lifecycle, from planning and development to maintenance and improvement.",
      "Work with teammates on technical tasks in a professional IT environment.",
    ],
  },
  education: [
    { degree: "B.Tech, Computer Science and Engineering", school: "Maharshi Dayanand University (MDU), Rohtak", dates: "2023 – 2027", note: "4th year" },
    { degree: "Class 12", school: "St. Columbus School", dates: "2022 – 2023", note: "" },
  ],
  achievement: {
    title: "Certificate of Merit",
    event: "Naukri Campus Young Turks 2026",
    date: "19 October 2026",
    issuer: "Naukri Campus · Presented by HCLTech",
    percentile: "93.73",
    detail: "93.73 percentile, placing in the top 6.27% of participants.",
    certificateId: "6acf4b8b96ebe313e740e6f3",
  },
  skills: {
    Languages: ["Java", "JavaScript"],
    Frontend: ["HTML", "CSS", "React.js"],
    Backend: ["Node.js", "Express.js", "REST APIs"],
    Databases: ["MySQL", "MongoDB"],
    Tools: ["Git", "GitHub", "Postman"],
    "CS foundations": ["OOP", "DBMS", "System Design", "Data Structures & Algorithms"],
    AI_Tools : ["Codex","OpenAI","Antigravity","Claude"]
  },
  strengths: ["Problem solving", "Team collaboration", "Adaptability", "Communication", "Strategic thinking"],
  interests: ["Chess", "Travel"],
} as const;
