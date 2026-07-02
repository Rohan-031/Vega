import re


class ScriptParser:

    def parse(self, script: str):

        paragraphs = [
            p.strip()
            for p in re.split(r"\n\s*\n", script)
            if p.strip()
        ]

        scenes = []

        for index, paragraph in enumerate(paragraphs):

            scenes.append({
                "id": index + 1,
                "text": paragraph
            })

        return scenes