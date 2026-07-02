import edge_tts


class EdgeTTSEngine:

    def __init__(
        self,
        voice="en-US-AndrewNeural",
        rate="+5%",
        pitch="+0Hz",
    ):
        self.voice = voice
        self.rate = rate
        self.pitch = pitch

    async def generate(self, text: str, audio_file, subtitle_file):

        communicate = edge_tts.Communicate(
            text=text,
            voice=self.voice,
            rate=self.rate,
            pitch=self.pitch,
        )

        submaker = edge_tts.SubMaker()

        word_boundary_count = 0

        with open(audio_file, "wb") as audio:

            async for chunk in communicate.stream():

                print(chunk["type"])

                if chunk["type"] == "audio":
                    audio.write(chunk["data"])

                elif chunk["type"] == "WordBoundary":
                    word_boundary_count += 1
                    print(chunk)
                    submaker.feed(chunk)

        print(f"\nWordBoundary Events: {word_boundary_count}\n")

        srt = submaker.get_srt()

        print(f"SRT Length: {len(srt)}")

        with open(subtitle_file, "w", encoding="utf-8") as f:
            f.write(srt)




# import edge_tts


# class EdgeTTSEngine:

#     def __init__(
#         self,
#         voice="en-US-AndrewNeural",
#         rate="+5%",
#         pitch="+0Hz",
#     ):
#         self.voice = voice
#         self.rate = rate
#         self.pitch = pitch

#     async def generate(self, text: str, audio_file, subtitle_file):

#         communicate = edge_tts.Communicate(
#             text=text,
#             voice=self.voice,
#             rate=self.rate,
#             pitch=self.pitch,
#         )

#         submaker = edge_tts.SubMaker()

#         with open(audio_file, "wb") as audio:

#             async for chunk in communicate.stream():

#                 if chunk["type"] == "audio":
#                     audio.write(chunk["data"])

#                 elif chunk["type"] == "WordBoundary":
#                     submaker.feed(chunk)

#         with open(subtitle_file, "w", encoding="utf-8") as f:
#             f.write(submaker.get_srt())

