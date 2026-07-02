from google import genai


class ScriptAgent:

    def __init__(self, api_key):

        self.client = genai.Client(api_key=api_key)

    def run(
        self,
        project_manager,
        cache_manager,
        project,
        research
    ):

        # Check Cache
        if cache_manager.exists(project, "script.txt"):
            return cache_manager.text(
                project_manager,
                project,
                "script.txt"
            )

        # Prompt
        prompt = f"""
You are an expert YouTube Shorts script writer.

Write a 45-60 second script.

Rules:

- Strong hook in first 3 seconds.
- Simple English.
- Conversational.
- Short sentences.
- No emojis.
- End with a CTA.

Research:

{research}
"""

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        script = response.text

        # Save Cache
        project_manager.save_text(
            project,
            "script.txt",
            script
        )

        return script















# from google import genai


# class ScriptAgent:

#     def __init__(self, api_key):
#         self.client = genai.Client(api_key=api_key)

#     def generate(self, research):

#         prompt = f"""
# You are an expert YouTube Shorts script writer.

# Create a 45-60 second script.

# Rules:
# - Hook in first 3 seconds.
# - Simple English.
# - Conversational.
# - No emojis.
# - End with a curiosity or CTA.

# Research:
# {research}
# """

#         response = self.client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )

#         return response.text