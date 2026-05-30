# CEDP Website — WordPress Admin Panel Architecture
## Complete CMS Specification for Full Frontend Control

> Handoff document for the WordPress build phase. The current Lovable
> prototype implements a small subset of this spec (Team Members, Job
> Listings, Legislative Wins) against Lovable Cloud to demonstrate that
> content is CMS-managed rather than hardcoded. The full WordPress build
> should follow the structure below.

---

## 1. CUSTOM POST TYPES (CPTs)

### 1.1 Programs (`cedp_program`)
**Frontend:** Our Work page — program tiles, model steps
**Admin fields (ACF):**
- Program Name (text)
- Short Description (textarea, 150 char limit)
- Full Description (WYSIWYG)
- Program Icon (image upload, 120×120)
- Cover Image (image upload, 800×600 min)
- Program Category (taxonomy: `program_category` — Housing, Legal, Financial, Community)
- Audience Tags (taxonomy: `audience_type` — Tenants, Homeowners, Consumers, Everyone)
- Stats Label (text, e.g. "Families served")
- Stats Value (text, e.g. "12,400+")
- CTA Label (text, e.g. "Get Help With This")
- CTA Link (URL)
- Sort Order (number)
- Is Featured (true/false toggle)
- Status (Active / Archived)

### 1.2 Team Members (`cedp_team`)
**Frontend:** Team page — grid tiles, profile lightbox; CED Law page — attorney tiles
**Admin fields (ACF):** Full Name, First Name Display, Job Title, Department (taxonomy), Photo, Bio, LinkedIn URL, Email, Is Leadership, Leadership Role, Is CED Law Attorney, Sort Order, Status (Active / Alumni / Board).

### 1.3 Job Listings (`cedp_job`)
**Frontend:** Careers page — job listing grid with filter
**Admin fields (ACF):** Job Title, Department (taxonomy), Location, Employment Type, BambooHR Job ID, BambooHR Apply URL, Short Description, Is Featured, Posted Date, Closing Date, Status.

### 1.4 Legislative Wins (`cedp_legislation`)
Bill Number, Bill Title (plain language), Session Year, Short Description, Full Description, Key Provisions (repeater), Sponsors, Signing Date, Bill Text URL, Fact Sheet PDF, Photos (gallery), Featured Photo, Is Spotlight, Sort Order, Status.

### 1.5 News & Press (`cedp_press`)
Headline, Publication Name, Publication Logo, Article URL, Cover Image, Excerpt, Topic, Publication Date, Is Featured, Status.

### 1.6 Research Publications (`cedp_research`)
Title, Publication Type, Source Organization, Publication URL, Cover Image, Short Description, Topic, Publication Date, Is Featured, Status.

### 1.7 FAQ Items (`cedp_faq`)
Question, Answer, Page Assignment, Sort Order, Status.

### 1.8 Practice Areas (`cedp_practice`)
Practice Area Name, Description, Stats Label/Value, CTA Label/Link, Sort Order, Status.

---

## 2. THEME OPTIONS (ACF Options Pages)

- **Global Settings** — Org info, brand assets, social, donate, top bar, analytics.
- **Homepage** — Hero, impact stats, mission, press marquee, accordion.
- **Get Help** — Crisis info, fraud banner, triage categories, mobile flow, intake fields.
- **CED Law** — Hero, eligibility checker steps, result screens, track record.
- **Careers** — Hero, snap counter, why CEDP cards, benefits, culture, application process, job alerts.
- **Legislative Wins** — Hero copy + stats.
- **News & Press** — Newsletter, press resources, media contact.
- **About** — Origin story, co-founders, values, timeline.
- **Research** — Research partners.

Every text field has an `_es` counterpart for bilingual content.

---

## 3. CUSTOM TAXONOMIES

| Taxonomy | Slug | Used By |
|---|---|---|
| Department | `department` | Team Members |
| Program Category | `program_category` | Programs |
| Audience Type | `audience_type` | Programs |
| Job Department | `job_department` | Job Listings |
| Legislative Year | `legislative_year` | Legislative Wins |
| Press Topic | `press_topic` | News & Press |
| Research Topic | `research_topic` | Research |

---

## 4. MENUS, ROLES, MEDIA, INTEGRATIONS, BILINGUAL, ADMIN UX, SECURITY

See sections 4–11 of the original handoff brief for full detail on
menus, user roles & permissions, media sizes, BambooHR / GA4 / CRM /
Substack / WPML integrations, bilingual content workflow, admin
dashboard customization, content workflow, and WordPress hardening
practices.

---

## What the Lovable prototype implements today

Three sections are wired to Lovable Cloud as a proof of CMS-managed
content. Edits in `/admin/*` reflect immediately on the public pages.

| Section | Table | Public page | Admin page |
|---|---|---|---|
| Team Members | `team_members` | `/team` | `/admin/team` |
| Job Listings | `job_listings` | `/careers` | `/admin/jobs` |
| Legislative Wins | `legislative_wins` | `/legislative-wins` | `/admin/legislation` |

The `/admin/*` routes are password-gated (prototype only). The remaining
sections in this spec are still hardcoded HTML and are intended to be
rebuilt in WordPress per this document.