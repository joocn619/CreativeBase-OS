# CreativeBase OS — Master Implementation Blueprint

Project: CreativeBase OS
Type: Multi-Tenant AI SaaS Platform
Stack: Next.js 14 (App Router), Supabase, OpenAI, Redis, BullMQ, Stripe
Reference Architecture: contentpilot-ai

---

# 1. Full SaaS System Architecture

CreativeBase OS follows a **layered modular architecture** inspired by the contentpilot-ai reference codebase, but modernized with Supabase (replacing Firebase), shadcn/ui components, and a multi-tenant team system.

```
┌──────────────────────────────────────────────────────┐
│                    CLIENT LAYER                      │
│  Next.js App Router + React + TailwindCSS + shadcn   │
│  Framer Motion animations + Dark/Light Mode          │
├──────────────────────────────────────────────────────┤
│                  MIDDLEWARE LAYER                     │
│  Route protection + Auth token validation            │
│  Rate limiting (Upstash Redis) + Input validation    │
├──────────────────────────────────────────────────────┤
│                   API LAYER                          │
│  Next.js API Routes (RESTful)                        │
│  Server Actions for CRUD operations                  │
├──────────────────────────────────────────────────────┤
│                 SERVICE LAYER                        │
│  AI Service (OpenAI) + Credit Service                │
│  Campaign Service + Automation Service               │
├──────────────────────────────────────────────────────┤
│                 DATABASE LAYER                       │
│  Supabase PostgreSQL + Supabase Auth + Storage       │
├──────────────────────────────────────────────────────┤
│                 WORKER LAYER                         │
│  Redis + BullMQ (Background jobs, automations)       │
├──────────────────────────────────────────────────────┤
│               EXTERNAL INTEGRATIONS                  │
│  Stripe + Shopify + Etsy + Amazon + eBay APIs        │
│  Twitter + LinkedIn + Instagram + YouTube APIs       │
└──────────────────────────────────────────────────────┘
```

---

# 2. Module Breakdown

The platform consists of **8 major modules** and supporting systems:

| # | Module | Phase | Status |
|---|--------|-------|--------|
| 1 | Authentication & RBAC | Phase 1 | Functional |
| 2 | Dashboard Shell & Navigation | Phase 1 | Functional |
| 3 | Creator Tools (Hook/Script/Caption/Repurposer) | Phase 1 | Functional |
| 4 | Content Library | Phase 1 | Functional |
| 5 | Marketing & Campaign Tools | Phase 1 UI / Phase 2 Backend | UI → Functional |
| 6 | Marketplace Tools | Phase 1 UI / Phase 2 Backend | UI → Functional |
| 7 | Automation System | Phase 1 UI / Phase 2 Backend | UI → Functional |
| 8 | Admin Dashboard & Analytics | Phase 2 | Functional |

Supporting systems:
- AI Credit System (Phase 1)
- Stripe Billing (Phase 1 setup / Phase 2 activation)
- Notification System (Phase 2)

---

# 3. Dashboard Structure

Inspired by the contentpilot-ai `DashboardLayout.tsx` and `Sidebar.tsx` pattern, but upgraded for multi-module navigation.

**Sidebar Navigation:**
```
📊  Home Dashboard
─────────────────
🎨  Creator Tools
    ├─ Hook Generator
    ├─ Script Generator
    ├─ Caption Generator
    └─ Content Repurposer
📧  Marketing Tools
    ├─ Campaign Builder
    ├─ Content Planner
    └─ Email Campaigns
🛒  Marketplace Tools
    ├─ Listing Generator
    ├─ SEO Analyzer
    └─ Competitor Analysis
⚡  Automation
    └─ Workflow Builder
─────────────────
📁  Content Library
📈  Analytics
👥  Team
⚙️  Settings
```

**Top Bar:**
- Current page title + badge (matching contentpilot-ai pattern)
- AI Credits indicator with low-credit warning
- Notification bell
- User dropdown (profile, billing, logout)

**Layout Pattern:**
- `ProtectedRoute` wrapper → `DashboardLayout` wrapper → Page content
- Collapsible sidebar with `sidebarCollapsed` state
- Background gradient effects (dark mode default)
- `max-w-7xl` centered content area

---

# 4. GitHub Repository Structure

Based on the contentpilot-ai project structure but improved for the new platform's scale:

```text
creativebase-os/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/              # Protected dashboard route group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Home Dashboard
│   │   │   ├── creator/
│   │   │   │   ├── hooks/
│   │   │   │   │   └── page.tsx      # AI Hook Generator
│   │   │   │   ├── scripts/
│   │   │   │   │   └── page.tsx      # AI Script Generator
│   │   │   │   ├── captions/
│   │   │   │   │   └── page.tsx      # AI Caption Generator
│   │   │   │   └── repurpose/
│   │   │   │       └── page.tsx      # Content Repurposer
│   │   │   ├── marketing/
│   │   │   │   ├── campaigns/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── planner/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── email/
│   │   │   │       └── page.tsx
│   │   │   ├── marketplace/
│   │   │   │   ├── listings/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── seo/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── competitor/
│   │   │   │       └── page.tsx
│   │   │   ├── automation/
│   │   │   │   └── page.tsx
│   │   │   ├── library/
│   │   │   │   └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── team/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # ProtectedRoute + DashboardLayout
│   │   │
│   │   ├── (admin)/                  # Admin route group
│   │   │   ├── admin/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   └── [...supabase]/
│   │   │   │       └── route.ts
│   │   │   ├── ai/
│   │   │   │   ├── hooks/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── scripts/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── captions/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── repurpose/
│   │   │   │   │   └── route.ts
│   │   │   │   └── listings/
│   │   │   │       └── route.ts
│   │   │   ├── campaigns/
│   │   │   │   └── route.ts
│   │   │   ├── library/
│   │   │   │   └── route.ts
│   │   │   ├── credits/
│   │   │   │   └── route.ts
│   │   │   ├── team/
│   │   │   │   └── route.ts
│   │   │   ├── stripe-webhook/
│   │   │   │   └── route.ts
│   │   │   └── automation/
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx                # Root layout (providers)
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── shared/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── GlassCard.tsx
│   │   ├── creator/
│   │   │   ├── HookGenerator.tsx
│   │   │   ├── ScriptGenerator.tsx
│   │   │   ├── CaptionGenerator.tsx
│   │   │   └── ContentRepurposer.tsx
│   │   ├── marketing/
│   │   │   ├── CampaignBuilder.tsx
│   │   │   ├── ContentPlanner.tsx
│   │   │   └── EmailEditor.tsx
│   │   ├── marketplace/
│   │   │   ├── ListingGenerator.tsx
│   │   │   ├── SEOAnalyzer.tsx
│   │   │   └── CompetitorView.tsx
│   │   ├── automation/
│   │   │   ├── WorkflowCanvas.tsx
│   │   │   ├── TriggerNode.tsx
│   │   │   └── ActionNode.tsx
│   │   ├── library/
│   │   │   ├── ContentGrid.tsx
│   │   │   ├── ContentList.tsx
│   │   │   └── FolderTree.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsCards.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   └── UserDropdown.tsx
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── dialog.tsx
│   │       ├── toast.tsx
│   │       ├── drawer.tsx
│   │       ├── skeleton.tsx
│   │       └── ...
│   │
│   ├── context/
│   │   ├── AuthContext.tsx            # Supabase Auth provider
│   │   ├── ThemeContext.tsx           # Dark/Light mode
│   │   └── TeamContext.tsx            # Active team/project
│   │
│   ├── hooks/
│   │   ├── useCredits.ts
│   │   ├── useTeam.ts
│   │   ├── useLibrary.ts
│   │   └── useAutomation.ts
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser Supabase client
│   │   │   ├── server.ts             # Server Supabase client
│   │   │   ├── admin.ts              # Service-role client
│   │   │   └── types.ts              # Generated DB types
│   │   ├── ai/
│   │   │   ├── client.ts             # AI provider abstraction
│   │   │   └── prompts/
│   │   │       ├── hooks.ts
│   │   │       ├── scripts.ts
│   │   │       ├── captions.ts
│   │   │       ├── repurpose.ts
│   │   │       ├── listings.ts
│   │   │       └── campaigns.ts
│   │   ├── stripe/
│   │   │   ├── client.ts
│   │   │   └── plans.ts
│   │   ├── credits/
│   │   │   └── creditSystem.ts
│   │   ├── security/
│   │   │   ├── rateLimit.ts
│   │   │   └── validation.ts
│   │   └── utils.ts
│   │
│   └── types/
│       ├── database.ts
│       ├── content.ts
│       ├── campaigns.ts
│       ├── automation.ts
│       └── marketplace.ts
│
├── worker/                           # Standalone BullMQ worker
│   ├── index.ts
│   ├── jobs/
│   │   ├── emailJob.ts
│   │   ├── automationJob.ts
│   │   └── listingJob.ts
│   └── package.json
│
├── public/
│   ├── logo.svg
│   └── og-image.png
│
├── docs/
│   ├── PRODUCT_OVERVIEW.md
│   ├── PRODUCT_CONTEXT.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── PHASE_1_TRACKER.md
│   ├── PHASE_2_TRACKER.md
│   └── MASTER_IMPLEMENTATION.md
│
├── middleware.ts                      # API auth + rate limiting
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
└── .gitignore
```

---

# 5. Folder Architecture Rationale

Key improvements over the contentpilot-ai reference:

| Area | contentpilot-ai | CreativeBase OS | Why |
|------|-----------------|-----------------|-----|
| Source code | Root-level `app/`, `components/` | All under `src/` | Cleaner project root |
| Route groups | `(dashboard)`, `(marketing)` | `(auth)`, `(dashboard)`, `(admin)` | Clearer role separation |
| Components | Feature folders at root | Grouped by module (`creator/`, `marketing/`, etc.) | Better scalability |
| Auth | Firebase (context-based) | Supabase Auth (context + middleware) | Simpler, integrated |
| AI prompts | `lib/prompts/*.ts` | `lib/ai/prompts/*.ts` | Namespaced under AI |
| Database | Firebase Firestore | Supabase PostgreSQL | Relational, typed |

---

# 6. Database Schema Plan

All tables live in Supabase PostgreSQL with Row Level Security (RLS) enabled.

```sql
-- Core Identity
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'owner',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_id UUID REFERENCES users(id),
    stripe_customer_id TEXT,
    subscription_plan TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'editor',
    invited_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(team_id, user_id)
);

-- Projects & Content
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    type TEXT NOT NULL,              -- 'hook' | 'script' | 'caption' | 'repurposed'
    title TEXT,
    data JSONB NOT NULL,
    folder_id UUID,
    tags TEXT[],
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE folders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    parent_id UUID REFERENCES folders(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Marketing
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'draft',     -- 'draft' | 'scheduled' | 'active' | 'completed'
    schedule_at TIMESTAMPTZ,
    content_ids UUID[],
    settings JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    subject TEXT,
    body_html TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE audiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    subscribers JSONB,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Marketplace
CREATE TABLE marketplace_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,          -- 'shopify' | 'amazon' | 'etsy' | 'ebay'
    title TEXT,
    data JSONB NOT NULL,
    seo_score INTEGER,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Automation
CREATE TABLE automation_workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    trigger_type TEXT,
    nodes JSONB NOT NULL,
    edges JSONB,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES automation_workflows(id) ON DELETE CASCADE,
    status TEXT,                     -- 'running' | 'success' | 'failed'
    step_details JSONB,
    executed_at TIMESTAMPTZ DEFAULT now()
);

-- AI & Billing
CREATE TABLE ai_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    feature TEXT NOT NULL,
    credits_used INTEGER NOT NULL,
    input_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT,
    plan TEXT DEFAULT 'free',
    credit_limit INTEGER DEFAULT 50,
    credits_used INTEGER DEFAULT 0,
    period_start TIMESTAMPTZ,
    period_end TIMESTAMPTZ,
    status TEXT DEFAULT 'active'
);

-- System
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL,       -- 'content' | 'campaign' | 'listing' | 'workflow'
    target_id UUID,
    metrics JSONB,
    recorded_at TIMESTAMPTZ DEFAULT now()
);
```

---

# 7. API Architecture

Following the contentpilot-ai pattern: each API route is a separate folder under `app/api/`.

| Endpoint | Method | Purpose | Phase |
|----------|--------|---------|-------|
| `/api/auth/[...supabase]` | ALL | Supabase Auth callbacks | 1 |
| `/api/ai/hooks` | POST | Generate AI hooks | 1 |
| `/api/ai/scripts` | POST | Generate AI scripts | 1 |
| `/api/ai/captions` | POST | Generate AI captions | 1 |
| `/api/ai/repurpose` | POST | Repurpose content | 1 |
| `/api/ai/listings` | POST | Generate marketplace listings | 2 |
| `/api/library` | GET/POST/DELETE | Content library CRUD | 1 |
| `/api/credits` | GET | Get current credit balance | 1 |
| `/api/campaigns` | GET/POST/PUT | Campaign CRUD | 2 |
| `/api/campaigns/send` | POST | Trigger email send | 2 |
| `/api/team` | GET/POST/DELETE | Team member management | 1 |
| `/api/automation` | GET/POST/PUT | Workflow CRUD | 2 |
| `/api/automation/execute` | POST | Trigger workflow execution | 2 |
| `/api/stripe-webhook` | POST | Stripe payment events | 1 |
| `/api/admin/users` | GET | Admin user list | 2 |
| `/api/admin/analytics` | GET | Platform analytics | 2 |

**Middleware Protection:**
- All `/api/*` routes require Bearer token (Supabase JWT)
- Exception: `/api/stripe-webhook` (public, signature verified)
- Rate limiting via Upstash Redis (matching contentpilot-ai's `@upstash/ratelimit`)

---

# 8. AI Services Structure

Inspired by contentpilot-ai's `aiClient.ts` multi-provider failover pattern:

```
lib/ai/
├── client.ts              # Main AI abstraction (OpenAI primary, future fallback support)
└── prompts/
    ├── hooks.ts           # System + user prompts for hook generation
    ├── scripts.ts         # Prompts for short/long-form scripts
    ├── captions.ts        # Prompts for captions + hashtags + CTAs
    ├── repurpose.ts       # Prompts for content repurposing
    ├── listings.ts        # Prompts for marketplace product listings
    └── campaigns.ts       # Prompts for campaign copy generation
```

**AI Client Pattern:**
- Primary: OpenAI API (`gpt-4o-mini`)
- All responses forced to JSON via `response_format: { type: "json_object" }`
- Each AI call logs to `ai_requests` table and deducts credits
- Credit check happens BEFORE the AI call

**Prompt Template Pattern (from contentpilot-ai):**
Each prompt file exports:
- `systemPrompt`: The AI's role and expected output format
- `buildUserPrompt(input)`: Constructs the user message from form data

---

# 9. Automation Engine Architecture

```
┌─────────────────────────────── FRONTEND ────────────────────────────────┐
│  React Flow Canvas → User designs Trigger → Condition → Action flows   │
│  Save as JSON (nodes + edges) to automation_workflows table            │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────── API ─────────────────────────────────────┐
│  POST /api/automation/execute                                          │
│  Parses workflow JSON → Creates BullMQ jobs in sequence                │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────── WORKER ──────────────────────────────────┐
│  worker/index.ts                                                       │
│  Consumes Redis queue → Executes jobs step by step                     │
│  Logs each step to automation_logs table                               │
│                                                                        │
│  Job Types:                                                            │
│  ├─ emailJob.ts      → Send email via Resend/SendGrid                  │
│  ├─ automationJob.ts → Execute AI generation or data formatting        │
│  └─ listingJob.ts    → Publish listing to marketplace API              │
└────────────────────────────────────────────────────────────────────────┘
```

**Trigger Types:**
- `content.created` — When new content is saved to library
- `campaign.scheduled` — When a campaign reaches its schedule time
- `listing.created` — When a new listing is generated
- `webhook.received` — External webhook trigger

**Action Types:**
- Generate AI content
- Format content for platform
- Schedule social post
- Send email campaign
- Publish marketplace listing

---

# 10. Phase-Based Implementation Roadmap

## Phase 1 — Core Platform (55% | $700)

```
Week 1: Foundation
├── Initialize Next.js 14 + TailwindCSS + shadcn/ui
├── Configure Supabase (DB + Auth + Storage)
├── Build DashboardLayout + Sidebar + Topbar
├── Implement dark/light mode + Framer Motion transitions
└── Deploy staging to Vercel

Week 2: Auth & Core Systems
├── Supabase Auth flows (login/signup/reset)
├── ProtectedRoute component
├── Middleware for API auth
├── Team/Project system + RBAC
└── AI Credit system + Stripe setup

Week 3: Creator Tools
├── AI Hook Generator (UI + API + OpenAI)
├── AI Script Generator (UI + API + OpenAI)
├── AI Caption Generator (UI + API + OpenAI)
├── Content Repurposer (UI + API + OpenAI)
└── Results view with copy/save actions

Week 4: Content Library & Shell Pages
├── Content Library (Grid/List, folders, search, tags)
├── Save-to-library integration from Creator Tools
├── Marketing Tools UI shell (Coming Soon)
├── Marketplace Tools UI shell (Coming Soon)
├── Automation UI shell (Coming Soon)
├── Analytics placeholder page
├── Team & Settings placeholder pages
└── Command Palette (Cmd+K)

Week 5: Testing & Polish
├── Test auth flows end-to-end
├── Test all Creator Tools
├── Test credit tracking
├── UI bug fixes + responsive audit
└── Deploy production to Vercel
```

## Phase 2 — Advanced Platform (45% | $600)

```
Week 6: Marketing Tools
├── Campaign Builder (create, attach content, schedule)
├── Content Planner (calendar view)
├── Email template builder
├── Audience management + segmentation
└── Email sequence automation

Week 7: Marketplace Tools
├── AI Listing Generator (multi-platform prompts)
├── Image-to-listing (OpenAI Vision)
├── SEO Analyzer
├── Competitor Listing Analysis
└── Integration hooks for Shopify/Etsy/Amazon/eBay

Week 8: Automation Engine
├── Redis + BullMQ worker setup
├── React Flow workflow builder
├── Trigger/Action/Condition node system
├── Workflow execution engine
└── Automation logs UI

Week 9: Analytics & Admin
├── Creator analytics dashboard
├── Campaign analytics (open/click rates)
├── Marketplace analytics
├── Super Admin dashboard
└── Stripe billing portal + subscription enforcement

Week 10: Final Polish
├── Full QA pass (all modules)
├── Mobile responsiveness audit
├── Performance optimization
├── Third-party integration testing
└── Production deployment
```

---

# Summary

This master blueprint ensures CreativeBase OS is built as a **scalable, production-ready, multi-tenant AI SaaS** following proven architectural patterns from the contentpilot-ai reference codebase while modernizing the stack with Supabase, shadcn/ui, and a proper background job system. Every module, database table, API endpoint, and development milestone has been pre-planned to ensure zero ambiguity during implementation.
