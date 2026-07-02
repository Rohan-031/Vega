from faster_whisper import WhisperModel


class SubtitleAgent:

    def __init__(self, model_name="small"):

        self.model_name = model_name
        self.model = None

    def load_model(self):

        if self.model is None:

            print("Loading Whisper model...")

            self.model = WhisperModel(
                self.model_name,
                device="cpu",
                compute_type="int8"
            )

            print("Whisper model loaded.")

    def run(
        self,
        project_manager,
        cache_manager,
        project
    ):

        print("\n========== Subtitle Agent ==========")

        self.load_model()

        audio_file = project / "voice" / "narration.mp3"

        if not audio_file.exists():
            raise Exception("Narration not found.")

        subtitle_dir = project / "subtitles"
        subtitle_dir.mkdir(parents=True, exist_ok=True)

        subtitle_file = subtitle_dir / "narration.srt"

        segments, info = self.model.transcribe(
            str(audio_file),
            beam_size=5
        )

        with open(subtitle_file, "w", encoding="utf-8") as f:

            for i, segment in enumerate(segments, start=1):

                f.write(f"{i}\n")
                f.write(
                    f"{self.format_time(segment.start)} --> {self.format_time(segment.end)}\n"
                )
                f.write(segment.text.strip() + "\n\n")

        metadata = project_manager.load_json(
            project,
            "metadata.json"
        )

        metadata["status"] = "subtitle_completed"

        project_manager.save_json(
            project,
            "metadata.json",
            metadata
        )

        print("Subtitle generation completed.")

        return str(subtitle_file)

    def format_time(self, seconds):

        ms = int((seconds % 1) * 1000)

        h = int(seconds // 3600)

        m = int((seconds % 3600) // 60)

        s = int(seconds % 60)

        return f"{h:02}:{m:02}:{s:02},{ms:03}"