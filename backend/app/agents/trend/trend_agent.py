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

            trends.append({
                "title": item.title,
                "published": item.published,
                "link": item.link
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



