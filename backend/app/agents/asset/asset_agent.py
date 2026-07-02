import json

from .pexels_client import PexelsClient


class AssetAgent:

    def __init__(self, api_key):

        self.pexels = PexelsClient(api_key)

    ####################################################
    # Asset Downloader
    ####################################################

    def run(
        self,
        project_manager,
        cache_manager,
        project
    ):

        print("\n========== Asset Agent ==========")

        storyboard = project_manager.load_json(
            project,
            "storyboard/storyboard.json"
        )

        if not storyboard:
            raise Exception("storyboard.json not found")

        asset_dir = project / "assets"

        asset_dir.mkdir(
            parents=True,
            exist_ok=True
        )

        for scene in storyboard["scenes"]:

            save_path = asset_dir / f"scene_{scene['scene']:02}_asset.mp4"

            ####################################################
            # Skip if already downloaded
            ####################################################

            if save_path.exists():

                print(
                    f"Skipping Scene {scene['scene']:02} (Already Downloaded)"
                )

                continue

            query = " ".join(scene["keywords"])

            print(f"Downloading Scene {scene['scene']:02} : {query}")

            videos = self.pexels.search_video(query)

            best = self.pexels.get_best_video(videos)

            if not best:

                print(
                    f"No suitable asset found for Scene {scene['scene']:02}"
                )

                continue

            self.pexels.download_video(
                best,
                save_path
            )

        ####################################################
        # Update Metadata
        ####################################################

        metadata = project_manager.load_json(
            project,
            "metadata.json"
        )

        metadata["status"] = "assets_completed"

        project_manager.save_json(
            project,
            "metadata.json",
            metadata
        )

        print("Assets downloaded successfully.")

        return True









# import json

# from .pexels_client import PexelsClient


# class AssetAgent:

#     def __init__(self, api_key):

#         self.pexels = PexelsClient(api_key)

#     ####################################################
#     # Asset Downloader
#     ####################################################

#     def run(
#         self,
#         project_manager,
#         cache_manager,
#         project
#     ):

#         print("\n========== Asset Agent ==========")

#         storyboard = project_manager.load_json(
#             project,
#             "storyboard/storyboard.json"
#         )

#         if not storyboard:
#             raise Exception("storyboard.json not found")

#         asset_dir = project / "assets"

#         asset_dir.mkdir(
#             parents=True,
#             exist_ok=True
#         )

#         for scene in storyboard["scenes"]:

#             query = " ".join(scene["keywords"])

#             print(f"Downloading : {query}")

#             videos = self.pexels.search_video(query)

#             best = self.pexels.get_best_video(videos)

#             if not best:
#                 continue

#             save_path = asset_dir / f"scene_{scene['scene']:02}_asset.mp4"

#             self.pexels.download_video(
#                 best,
#                 save_path
#             )

#         metadata = project_manager.load_json(
#             project,
#             "metadata.json"
#         )

#         metadata["status"] = "assets_completed"

#         project_manager.save_json(
#             project,
#             "metadata.json",
#             metadata
#         )

#         print("Assets downloaded.")

#         return True