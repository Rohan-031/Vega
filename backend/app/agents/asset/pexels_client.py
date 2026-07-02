import requests


class PexelsClient:

    BASE_URL = "https://api.pexels.com/videos/search"

    def __init__(self, api_key):

        self.headers = {
            "Authorization": api_key
        }

    ####################################################
    # Search Videos
    ####################################################

    def search_video(self, query, per_page=5):

        response = requests.get(
            self.BASE_URL,
            headers=self.headers,
            params={
                "query": query,
                "per_page": per_page
            }
        )

        response.raise_for_status()

        return response.json()["videos"]

    ####################################################
    # Best Video
    ####################################################

    def get_best_video(self, videos):

        if not videos:
            return None

        return videos[0]

    ####################################################
    # Download
    ####################################################

    def download_video(self, video, save_path):

        url = video["video_files"][0]["link"]

        response = requests.get(url, stream=True)

        response.raise_for_status()

        with open(save_path, "wb") as f:

            for chunk in response.iter_content(8192):

                f.write(chunk)