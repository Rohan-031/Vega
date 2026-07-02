from moviepy import (
    VideoFileClip,
    AudioFileClip,
    CompositeAudioClip,
    concatenate_videoclips,
    concatenate_audioclips
)


class Composer:

    def run(
        self,
        project_manager,
        cache_manager,
        project
    ):

        print("\n========== Video Composer ==========")

        storyboard = project_manager.load_json(
            project,
            "storyboard/storyboard.json"
        )

        if not storyboard:
            raise Exception("storyboard.json not found")

        clips = []

        asset_dir = project / "assets"

        ###################################################
        # Load Every Scene
        ###################################################

        for scene in storyboard["scenes"]:

            video = asset_dir / f"scene_{scene['scene']:02}_asset.mp4"

            if not video.exists():
                continue

            clip = VideoFileClip(str(video))

            duration = scene["duration"]

            if clip.duration > duration:

                clip = clip.subclipped(0, duration)

            clip = clip.resized(height=1920)

            if clip.w > 1080:

                x = (clip.w - 1080) / 2

                clip = clip.cropped(
                    x1=x,
                    width=1080
                )

            clips.append(clip)

        ###################################################
        # Merge Videos
        ###################################################

        final_video = concatenate_videoclips(
            clips,
            method="compose"
        )

        ###################################################
        # Audio
        ###################################################

        # Narration
        narration = AudioFileClip(
            str(project / "voice" / "narration.mp3")
        )

        # Background Music
        music = AudioFileClip(
            "assets/music/tech.mp3"
        )

        # Match music duration with narration
        if music.duration > narration.duration:

            music = music.subclipped(
                0,
                narration.duration
            )

        else:

            loops = int(
                narration.duration / music.duration
            ) + 1

            music = concatenate_audioclips(
                [music] * loops
            )

            music = music.subclipped(
                0,
                narration.duration
            )

        # Lower music volume
        music = music.with_volume_scaled(0.10)

        # Mix narration + music
        final_audio = CompositeAudioClip(
            [
                music,
                narration
            ]
        )

        final_video = final_video.with_audio(
            final_audio
        )

        ###################################################
        # Export
        ###################################################

        output = project / "output"

        output.mkdir(
            parents=True,
            exist_ok=True
        )

        output_file = output / "final_video.mp4"

        final_video.write_videofile(

            str(output_file),

            fps=30,

            codec="libx264",

            audio_codec="aac"

        )

        ###################################################
        # Metadata
        ###################################################

        metadata = project_manager.load_json(
            project,
            "metadata.json"
        )

        metadata["status"] = "completed"

        project_manager.save_json(
            project,
            "metadata.json",
            metadata
        )

        print("Video generation completed.")

        return str(output_file)