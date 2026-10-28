# Harshvardhan Sinha portfolio

Recruiter-first, single-page portfolio built with the Next.js App Router, TypeScript, and SCSS. Profile facts live in `content/profile.ts`; the main page and text-first recruiter brief use the same source data.

## Run locally

```sh
npm install
npm run dev
```

## Edit your information

Update `content/profile.ts` to change the summary, roles, experience, education, skills, achievement, strengths, or contact information. Add your GitHub URL where marked. Confirm dates and role availability before publishing. The current LinkedIn link came from your message. Replace the temporary site domain before publishing; metadata intentionally does not claim a canonical domain yet, and the sitemap is empty until a real domain is set.

The resume download is `public/resume.pdf`. The art assets are in `public/images/`. Keep image descriptions in `app/page.tsx` accurate if assets change.

## Content and routes

- `/`: visual portfolio with summary, role fit, experience, skills, achievement, chess, education, and contact.
- `/brief`: semantic, text-first recruiter view.
- `/brief.md` and `/ai-profile.md`: Markdown profile copies.
- `/llms.txt`: site and profile links for text-oriented readers.

## Accessibility and motion

The pages render on the server and remain readable without JavaScript. They use semantic headings and landmarks, visible keyboard focus, a skip link, image alt text, and a reduced-motion stylesheet. GSAP owns the hero text entrance, scroll reveals, percentile counters, and pointer parallax. Lenis smooths wheel scrolling from the GSAP ticker and is disabled for reduced-motion users. The role matcher uses Motion for React state transitions. The GSAP/Lenis runtime is dynamically imported after first paint/idle so its code does not block the initial render.

## Performance

No Lighthouse or bundle measurements have been recorded in this environment. Do not publish a performance score until measured against the deployed build. The initial route avoids third-party font requests, video, and WebGL. Images use Next Image optimization and are stored as WebP. Revisit measured mobile performance after deployment.
