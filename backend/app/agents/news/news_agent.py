import feedparser


class NewsAgent:

    def run(
        self,
        project_manager,
        cache_manager,
        project,
        topic
    ):

        # Check Cache
        if cache_manager.exists(project, "news.json"):
            return cache_manager.json(
                project_manager,
                project,
                "news.json"
            )

        # Fetch News
        url = (
            f"https://news.google.com/rss/search?"
            f"q={topic}&hl=en-IN&gl=IN&ceid=IN:en"
        )

        feed = feedparser.parse(url)

        news = []

        for item in feed.entries[:10]:

            news.append({
                "title": item.title,
                "published": item.published,
                "link": item.link
            })

        # Save Cache
        project_manager.save_json(
            project,
            "news.json",
            news
        )

        return news





# import feedparser


# class NewsAgent:

#     def fetch_news(self, query):

#         url = f"https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN&ceid=IN:en"

#         feed = feedparser.parse(url)

#         news = []

#         for item in feed.entries[:10]:
#             news.append({
#                 "title": item.title,
#                 "link": item.link,
#                 "published": item.published
#             })

#         return news