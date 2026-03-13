# MailPlanned OS AI - Product Context

## Product Overview
MailPlanned OS AI is a unified AI platform designed as a comprehensive operating system for content creators, marketers, and ecommerce sellers. It allows users to generate content, run marketing campaigns, and create marketplace listings from a single, centralized dashboard.

## Platform Purpose
The goal is to eliminate tool fatigue by combining state-of-the-art AI content generation, email marketing, ecommerce listing generation, and cross-module automation into one seamless workspace. This is a robust, production-ready SaaS capable of supporting thousands of users.

## Target Users
- **Content Creators:** YouTubers, TikTokers, Influencers needing fast, viral content generation and repurposing.
- **Marketers:** Growth marketers and agencies running email sequences and social media campaigns.
- **Ecommerce Sellers:** Shopify, Etsy, Amazon, and eBay sellers who need optimized product listings and SEO support.

## System Modules
1. **Creator Tools:** AI hooks, scripts, captions, video clip extraction, and content repurposing.
2. **Marketing & Campaign Tools:** Campaign builder, content planner, and "MailPlanned" native email marketing system.
3. **Marketplace Tools:** AI listing generator, image-to-listing generation, SEO analysis, and competitor tracking.
4. **Automation System:** A visual workflow builder connecting triggers and actions across all modules.

## Feature Explanations
### Creator Tools
- **AI Hook Generator:** Creates high-converting, platform-specific hooks with AI scoring.
- **AI Script/Caption Generator:** Generates short/long-form scripts and platform-ready captions with hashtags and CTAs.
- **AI Clip Generator:** Extracts viral moments from long videos and auto-generates captions.
- **Content Repurposer:** Transforms a single piece of content (e.g., long video) into threads, posts, and blogs.
- **Supported Platforms:** TikTok, YouTube Shorts, Instagram, Twitter, LinkedIn.

### Marketing Tools
- **Campaign Builder & Planner:** Visual calendar and campaign setup for attaching and scheduling content.
- **MailPlanned Email System:** Full ESP capabilities including templates, limits, audiences/lists, segmentation, sequences, and analytics (open/click rates).

### Marketplace Tools
- **AI Listing Generator:** SEO-optimized titles, bullets, tags, based on keywords or product images.
- **SEO & Competitor Analyzer:** Compares listings against top competitors for better rankings and gives improvement recommendations.
- **Supported Platforms:** Shopify, Etsy, Amazon, eBay.

### Automation System
- **Builder:** Drag-and-drop Trigger -> Action nodes (e.g., New content generated -> Format content -> Schedule social post -> Send email campaign -> Publish marketplace listing).
- **Components:** Triggers, Actions, Conditions, Schedules, Webhooks.

### Content Library
- Centralized asset management with version control, folders, tags, export formats, content history, and search for future reuse.

### Analytics System
- **Creator Analytics:** Engagement and content performance.
- **Campaign Analytics:** Open rates, click rates, conversions.
- **Marketplace Analytics:** Listing performance, keyword ranking.
- **Automation Analytics:** Workflow execution and logs.

### Admin, Team & Billing
- **Roles:** Owner, Admin, Editor, Viewer (RBAC permission system).
- **Credits:** Subscription-based AI credits and feature gating. Used for generation and automation.
- **Plans:** Free, Starter, Pro, Agency. Include credit limits, team member limits, and integrations.
- **Admin Dashboard:** Global user monitoring, AI usage tracking, subscription management, integration management, and platform analytics.
- **Notifications:** Alerts for completed automations, finished campaigns, AI generation, and published listings.

## AI Tools Explanation
The platform utilizes specialized AI prompt templates tailored explicitly for:
- Hook, script, and caption generation.
- Product listing descriptions.
- Campaign copy.

## Workflows
**Example Flow:**
1. Generate social content via Creator Tools.
2. Store in Content Library.
3. Add to Campaign Builder.
4. Schedule Campaign.
5. Send email via MailPlanned.

## Naming Conventions
- Database tables: `snake_case` (e.g., `ai_requests`, `marketplace_listings`).
- APIs: RESTful Node.js + Next.js patterns.
- React Components: `PascalCase`.
- System acronyms: `MPOS` (MailPlanned OS).
