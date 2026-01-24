
# News Scraper Skill

This skill is designed to update the `data/newsData.ts` file with the latest tutorials, news, and resources related to Claude Code, Agentic AI, and UI/UX skills.

## Overview

The news scraper manually or automatically fetches trending content to keep the "News & Resources" section of UIXskills fresh and SEO-optimized.

## Workflow

1.  **Search**: Use the `WebSearch` tool to find recent and high-authority articles.
    *   Primary Keywords: "UI skills agent", "AI coding agent", "Agentic UI generation", "Generative UI", "Frontend AI agent".
    *   Secondary Keywords: "Claude Code", "React UI automation", "Future of frontend development 2026".
2.  **Filter**: Select the top 30 relevant and high-quality items.
    *   Prioritize: Technical deep dives, product launches, research papers, and tutorials.
3.  **Verify**: **CRITICAL STEP**. Before adding any item, you must verify the URL is accessible.
    *   Use `WebFetch` or `Bash` (curl -I) to check that the link does not return a 404 error.
    *   Discard any links that are broken or require a login wall that prevents reading the summary.
4.  **Format**: Structure the data to match the `NewsItem` interface, **including Chinese translations**.
    ```typescript
    export interface NewsItem {
        id: string; // Unique ID (e.g., UUID or hash)
        title: string;
        description: string; // Concise summary
        content: string; // Detailed summary for detail view
        title_zh: string; // Chinese title
        description_zh: string; // Chinese description
        content_zh: string; // Chinese detailed summary
        url: string;
        source: string; // e.g., "Anthropic", "YouTube", "Medium"
        date: string; // YYYY-MM-DD
        views?: number; // Estimated views/popularity
        tags?: string[]; // e.g., ['Tutorial', 'Official']
    }
    ```

## Update & Retention Policy (Pagination Rule)

To maintain a rich history of content while keeping the site fresh:

1.  **Prepend New Items**: When adding new news items (e.g., a batch of 10), always **prepend** them to the beginning of the `initialNewsData` array.
2.  **Shift Old Items**: Existing items should **not** be deleted. They will naturally shift down the index and appear on subsequent pages (Page 2, Page 3, etc.) due to the pagination logic.
3.  **Retention Limit**: Maintain a maximum of **100 items** in the file to prevent it from becoming too large. If the array exceeds 100 items, remove the oldest items from the end.
4.  **Idempotency**: Ensure that identical URLs are not added as duplicates. Check existing URLs before prepending.

## Commands

To trigger a manual update, ask Claude:
> "Run the news scraper to update the news page."

## SEO Strategy

*   **Keywords**: Ensure titles and descriptions contain relevant keywords for search engines.
*   **Freshness**: Regular updates signal to search engines that the site is active.
*   **Authority**: Linking to high-authority domains improves the site's "neighborhood" in search algorithms.
*   **Localization**: Providing Chinese translations significantly expands the audience reach.
