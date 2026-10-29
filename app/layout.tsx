import type { Metadata } from "next";
import MotionLoader from "@/components/motion-loader";
import SiteEntry from "@/components/site-entry";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import "../styles/globals.scss";
import "../styles/motion.scss";
import "../styles/space-theme.scss";


export const metadata: Metadata = {
  title: "Harshvardhan Sinha — Software Developer",
  description:
    "Final-year Computer Science student and Software Developer Intern in Delhi, India. Open to software engineering, backend, and full-stack opportunities.",
  alternates: { types: { "text/markdown": "/ai-profile.md" } },
  openGraph: {
    type: "profile",
    title: "Harshvardhan Sinha — Software Developer",
    description:
      "A curious builder ready to contribute, learn, and grow with an engineering team.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@type": "Person",
    name: "Harshvardhan Sinha",
    jobTitle: "Software Developer Intern",
    email: "mailto:hharshvardhan135@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Maharshi Dayanand University",
    },
    worksFor: { "@type": "Organization", name: "Sri Aurobindo Society" },
    knowsAbout: [
      "Java",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "REST APIs",
      "MySQL",
      "MongoDB",
      "Data Structures and Algorithms",
    ],
    sameAs: [
      "https://www.linkedin.com/in/harshvardhan-sinha-6b153b373",
      "https://leetcode.com/u/deluluCode",
    ],
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        name: "Harshvardhan Sinha — Portfolio",
        description: "Professional portfolio and recruiter profile.",
      },
      {
        "@type": "ProfilePage",
        name: "Harshvardhan Sinha — Profile",
        mainEntity: { "@type": "Person", name: "Harshvardhan Sinha" },
      },
    ],
  };
  return (
    <html lang="en">
      <body>
        <SiteEntry>
          <div className="cosmos-meteors" aria-hidden="true">
            <span className="meteor meteor-one" />
            <span className="meteor meteor-two" />
            <span className="meteor meteor-three" />
            <span className="meteor meteor-four" />
          </div>
          <SmoothCursor />
          <MotionLoader>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            {children}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
          </MotionLoader>
        </SiteEntry>
      </body>
    </html>
  );
}
