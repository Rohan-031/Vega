import json
from google import genai


class StoryboardAgent:

    def __init__(self, api_key):

        self.client = genai.Client(api_key=api_key)

    ########################################################
    # Generate Storyboard
    ########################################################

    def run(
        self,
        project_manager,
        cache_manager,
        project
    ):

        print("\n========== Storyboard Agent ==========")

        # Cache
        if cache_manager.exists(project, "storyboard/storyboard.json"):

            return project_manager.load_json(
                project,
                "storyboard/storyboard.json"
            )

        # Load Script
        script = project_manager.load_text(
            project,
            "script.txt"
        )

        if not script:
            raise Exception("script.txt not found")

        ####################################################
        # Prompt
        ####################################################

        prompt = f"""
You are an award-winning YouTube Shorts Director.

Your job is to convert the narration into a professional storyboard.

The target audience is 18-35 years old.

Niche:
Technology
AI
Business
Startups
Breaking News

Rules:

Return ONLY valid JSON.

No markdown.

No explanations.

No extra text.

The storyboard should maximize viewer retention.

Scene Rules

• Each scene should last 2-5 seconds.
• Every scene should have only ONE visual idea.
• Every scene should feel dynamic.
• Think like MrWhoseTheBoss, Johnny Harris, Cleo Abram, and modern tech news creators.
• Visuals must be searchable on Pexels.
• Prefer stock footage over graphics.
• Avoid generic visuals.

JSON Format

{{
    "video_title": "",
    "video_style": "Fast-paced Tech News Shorts",
    "estimated_duration": 60,
    "scenes": [

        {{
            "scene": 1,

            "voice": "",

            "duration": 3,

            "visual_prompt": "",

            "keywords": [],

            "asset_type": "video",

            "transition": "cut",

            "caption": ""
        }}

    ]
}}

Narration

{script}
"""

        ####################################################
        # Gemini
        ####################################################

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        # storyboard = json.loads(response.text)
        response_text = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        storyboard = json.loads(response_text)
        ####################################################
        # Save
        ####################################################

        project_manager.save_json(
            project,
            "storyboard/storyboard.json",
            storyboard
        )

        metadata = project_manager.load_json(
            project,
            "metadata.json"
        )

        metadata["status"] = "storyboard_completed"

        project_manager.save_json(
            project,
            "metadata.json",
            metadata
        )

        print("Storyboard generation completed.")

        return storyboard