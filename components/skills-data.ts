export type Skill = {
  name: string;
  category: string;
  mark: string;
  color: string;
  description: string;
};

// Kept to the technical skills listed on Harshvardhan's resume.
export const skills: Skill[] = [
  { name: "Java", category: "Programming languages", mark: "JAVA", color: "#f89820", description: "Object-oriented programming and application development." },
  { name: "JavaScript", category: "Programming languages", mark: "JS", color: "#f7df1e", description: "The language I use to build interactive web experiences." },
  { name: "React.js", category: "Frontend development", mark: "ATOM", color: "#61dafb", description: "Component-based user interface development." },
  { name: "HTML", category: "Frontend development", mark: "HTML5", color: "#e34f26", description: "Semantic structure for accessible web pages." },
  { name: "CSS", category: "Frontend development", mark: "CSS3", color: "#1572b6", description: "Responsive styling, layout, and visual presentation." },
  { name: "Node.js", category: "Backend development", mark: "NODE", color: "#83cd29", description: "JavaScript runtime for server-side development." },
  { name: "Express.js", category: "Backend development", mark: "EX", color: "#e8edf7", description: "A lightweight framework for APIs and web servers." },
  { name: "REST APIs", category: "Backend development", mark: "API", color: "#f3a65a", description: "Building and integrating HTTP APIs." },
  { name: "MySQL", category: "Databases", mark: "SQL", color: "#4479a1", description: "Relational data storage and querying." },
  { name: "MongoDB", category: "Databases", mark: "MONGO", color: "#47a248", description: "Document database fundamentals and data modeling." },
  { name: "Git", category: "Developer tools", mark: "GIT", color: "#f05032", description: "Version control for collaborative development." },
  { name: "GitHub", category: "Developer tools", mark: "GH", color: "#e6edf3", description: "Code hosting, collaboration, and project workflows." },
  { name: "Postman", category: "Developer tools", mark: "PM", color: "#ff6c37", description: "API testing and request exploration." },
  { name: "OOP", category: "Core computer science", mark: "OOP", color: "#a78bfa", description: "Object-oriented programming principles." },
  { name: "DBMS", category: "Core computer science", mark: "DB", color: "#a78bfa", description: "Database management system fundamentals." },
  { name: "System Design", category: "Core computer science", mark: "SYS", color: "#a78bfa", description: "Breaking down systems and their components." },
  { name: "Data Structures & Algorithms", category: "Core computer science", mark: "DSA", color: "#a78bfa", description: "Core data structures, algorithms, and problem solving." },
];
