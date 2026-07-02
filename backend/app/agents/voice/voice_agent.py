import asyncio
import re

from .edge_tts_engine import EdgeTTSEngine


class VoiceAgent:

    def __init__(self):

        self.engine = EdgeTTSEngine()

    ########################################################
    # Clean Script
    ########################################################

    def clean_script(self, text):

        text = re.sub(r"\*\*", "", text)
        text = re.sub(r"`", "", text)

        text = text.replace("&", "and")
        text = text.replace("%", " percent")

        text = re.sub(r"\s+", " ", text)

        return text.strip()

    ########################################################
    # Generate Voice
    ########################################################

    def run(
        self,
        project_manager,
        cache_manager,
        project,
    ):

        print("\n========== Voice Agent ==========")

        script = project_manager.load_text(
            project,
            "script.txt"
        )

        if not script:
            raise Exception("script.txt not found")

        cleaned_script = self.clean_script(script)

        audio_file = project / "voice" / "narration.mp3"
        subtitle_file = project / "voice" / "narration.srt"

        audio_file.parent.mkdir(
            parents=True,
            exist_ok=True
        )

        asyncio.run(

            self.engine.generate(

                cleaned_script,

                audio_file,

                subtitle_file,

            )

        )

        metadata = project_manager.load_json(
            project,
            "metadata.json"
        )

        metadata["status"] = "voice_completed"

        project_manager.save_json(
            project,
            "metadata.json",
            metadata
        )

        print("Voice generation completed.")

        return {
            "audio": str(audio_file),
            "subtitle": str(subtitle_file)
        }