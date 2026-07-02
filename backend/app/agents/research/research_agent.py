from google import genai


class ResearchAgent:

    def __init__(self, api_key):

        self.client = genai.Client(api_key=api_key)

    def run(
        self,
        project_manager,
        cache_manager,
        project,
        topic,
        news
    ):

        # Check Cache
        if cache_manager.exists(project, "research.md"):
            return cache_manager.text(
                project_manager,
                project,
                "research.md"
            )

        # Prompt
        prompt = f"""
You are an expert researcher.

Topic:
{topic}

News:
{news}

Explain in detail.

Include:

1. What happened
2. Why it matters
3. Background
4. Timeline
5. Key Facts
6. Future Impact

Return clean markdown.
"""

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        research = response.text

        # Save Cache
        project_manager.save_text(
            project,
            "research.md",
            research
        )

        return research










# from google import genai


# class ResearchAgent:

#     def __init__(self, api_key):
#         self.client = genai.Client(api_key=api_key)

#     def research(self, topic, news):

#         prompt = f"""
#         Topic:
#         {topic}

#         News:
#         {news}

#         Explain this topic in detail.
#         Include:
#         - What happened
#         - Why it matters
#         - Background
#         - Key facts
#         """

#         response = self.client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )

#         return response.text