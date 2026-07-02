# from google import genai
# from dotenv import load_dotenv
# import os

# load_dotenv()

# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# response = client.models.generate_content(
#     model="gemini-2.5-flash",
#     contents="Say Hello"
# )

# print(response.text)




import feedparser

RSS_URL = "https://trends.google.com/trending/rss?geo=IN"

feed = feedparser.parse(RSS_URL)

trends = []

for item in feed.entries:
    trends.append({
        "title": item.title,
        "published": item.published,
        "link": item.link
    })

print("\nTrending Topics:\n")

for i, trend in enumerate(trends, start=1):
    print(f"{i}. {trend['title']}")
    print(f"   Published : {trend['published']}")
    print(f"   Link      : {trend['link']}")
    print("-" * 60)