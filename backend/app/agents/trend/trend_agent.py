import feedparser

RSS_URL = "https://trends.google.com/trending/rss?geo=IN"


class TrendAgent:

    def run(self, project_manager, cache_manager, project):

        # Check Cache
        if cache_manager.exists(project, "trend.json"):
            return cache_manager.json(
                project_manager,
                project,
                "trend.json"
            )

        # Fetch Trends
        feed = feedparser.parse(RSS_URL)

        trends = []

        for item in feed.entries:
            # item.link is the RSS channel link (same for all items).
            # The real per-article URL is in ht_news_item_url.
            article_link = (
                getattr(item, "ht_news_item_url", None)
                or getattr(item, "link", "#")
                or "#"
            )

            trends.append({
                "title": item.title,
                "published": getattr(item, "published", ""),
                "link": article_link,
                "traffic": getattr(item, "ht_approx_traffic", ""),
                "picture": getattr(item, "ht_picture", ""),
                "news_title": getattr(item, "ht_news_item_title", ""),
                "news_source": getattr(item, "ht_news_item_source", ""),
            })

        # Save Cache
        project_manager.save_json(
            project,
            "trend.json",
            trends
        )

        return trends













# import feedparser

# RSS_URL = "https://trends.google.com/trending/rss?geo=IN"


# class TrendAgent:

#     def fetch_trends(self):

#         feed = feedparser.parse(RSS_URL)

#         trends = []

#         for item in feed.entries:

#             trends.append({
#                 "title": item.title,
#                 "published": item.published,
#                 "link": item.link
#             })

#         return trends



