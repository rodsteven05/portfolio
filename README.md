# Rodsteven Labad — Personal CV & Portfolio

A responsive personal CV website presenting Rodsteven Labad's profile, skills, education, academic experience, and web and mobile projects. Adapted from an earlier portfolio activity.

- **Student:** Rodsteven Labad
- **Program:** Bachelor of Science in Information Technology (BSIT)
- **School:** Davao del Norte State College
- **Study period:** 2023–2027
- **Location:** Panabo City, Davao del Norte, Philippines
- **Repository:** https://github.com/rodsteven05/portfolio
- **Live Vercel website:** Pending verification and final deployment. Add the actual production URL before submission.

## Technologies

HTML5, CSS3, vanilla JavaScript, and inline SVG icons. Inter is loaded through Google Fonts with system-font fallbacks. No package installation, build process, backend, or environment variables are required.

## Features

- Personal profile, basic information, and career objective
- Education, academic experience, and grouped technical/professional skills
- Five projects with screenshots, descriptions, and technologies
- Email, phone, GitHub, and LinkedIn links
- Responsive navigation with keyboard support and Escape dismissal
- Light/dark themes with saved preferences when storage is available
- Skip-to-content link, focus indicators, and section offsets
- Scroll animations respecting reduced-motion preferences
- Content and navigation available without JavaScript

## Project structure

```text
portfolio/
├── index.html    # CV content, sections, and inline icons
├── styles.css    # Themes, layout, responsive rules, and animations
├── script.js     # Theme, menu, navigation, and reveal behavior
├── images/       # Profile photo and five project screenshots
└── README.md
```

## Local preview

Open `index.html` directly in a browser, or run a local server from the repository folder if Python is installed:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Stop the server with Ctrl+C. Google Fonts requires internet access; system fonts are used when unavailable.

## How the code works

`index.html` contains all CV information. CSS variables define both themes, and flexible grids adapt the cards to available space. Mobile navigation uses a 900px breakpoint.

`script.js` initializes on DOM ready. Theme selection uses a saved preference or the system color scheme and continues working if storage is blocked. Menu state updates the button's accessible label and expanded state; the closed mobile menu is inert. A scroll handler scheduled with `requestAnimationFrame` updates the active navigation link. `IntersectionObserver` reveals individual cards once. Reduced-motion users and browsers without observer support retain visible content.

## Development history

The existing history preserves separate stages:

1. Initial portfolio activity.
2. Organize portfolio content for a personal CV.
3. Improve layout and responsive presentation.
4. Improve navigation accessibility and animation reliability.

Commit documentation and final content corrections separately after review. Preserve meaningful history instead of squashing the activity into one final commit.

## Verification performed

Local headless Microsoft Edge checks during development covered:

- Stage 2: image loading and horizontal overflow at 320, 375, 768, 900, 1024, and 1440px in both themes; desktop and mobile screenshots inspected.
- Stage 3: keyboard navigation, Escape, outside-click dismissal, focus transfer, anchor positioning, active links, desktop resizing, and saved themes.
- Stage 3: blocked storage, missing observer support, reduced motion, and navigation/content without JavaScript.
- Stage 3: individual card reveals at 320px and changing reduced-motion preference during a visit.
- JavaScript syntax and Git diff whitespace checks.

These are local checks, not proof of production deployment, physical-device testing, external profile ownership, or a full accessibility audit. Repeat layout checks after final content changes and test the deployed production URL before submission.

## Content to finalize

- The school and study period are confirmed. An explicit current year level has not been supplied; do not infer it from the dates.
- The display name is Rodsteven Labad. The `roadsteven` spelling in email and platform identifiers is intentional. Verify external links before submission.
- Confirm all skill claims, project names, descriptions, and screenshots are accurate.
- Add project repository URLs and live demos where available; do not invent destinations.
- Add the verified production Vercel URL above after deployment.

## Deployment and submission checklist

Deployment is pending owner finalization. For this static site, import the repository into Vercel using the **Other** framework preset, repository root, and no build command. If an output-directory override is needed, use `.`. Reuse an existing Vercel project if already connected.

- [x] Add confirmed school, study period, location, and name spelling.
- [ ] Review remaining public content and confirm current year level if required by the grader.
- [ ] Confirm GitHub CLI uses `rodsteven05` and Git author identity is correct.
- [ ] Review and commit documentation/content changes separately.
- [ ] Push the intended source to the production branch (`main`).
- [ ] Deploy only after the owner is ready.
- [ ] Open the production website while signed out and verify public access.
- [ ] Check navigation, themes, animations, contact/profile links, and images on desktop and mobile.
- [ ] Confirm the repository is accessible to the grader.
- [ ] Record the real production Vercel URL in this README and commit that update.
- [ ] Submit the Vercel URL and GitHub repository URL in the LMS.

GitHub authentication and Git commit identity are separate. Switch with `gh auth switch --hostname github.com --user rodsteven05`, then verify with `gh api user --jq .login`. If authentication fails, use `gh auth login --hostname github.com --git-protocol https --web` and authorize the intended account. Configure Git authentication with `gh auth setup-git --hostname github.com`. Review `git config user.name` and `git config user.email` independently; use repository-local settings if changes are needed.
