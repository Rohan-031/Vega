from pathlib import Path
from datetime import datetime
import json


class ProjectManager:

    def __init__(self):

        self.base_path = Path("storage/projects")
        self.base_path.mkdir(parents=True, exist_ok=True)

    #####################################################
    # Create or Reuse Project
    #####################################################

    def get_or_create_project(self, topic):

        # Check if project already exists
        for project in self.base_path.iterdir():

            metadata_file = project / "metadata.json"

            if not metadata_file.exists():
                continue

            with open(metadata_file, "r", encoding="utf-8") as f:
                metadata = json.load(f)

            if metadata["topic"].lower() == topic.lower():
                return project

        # Create new project
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        safe_topic = (
            topic.lower()
            .strip()
            .replace(" ", "-")
            .replace("/", "-")
            .replace("\\", "-")
        )

        project = self.base_path / f"{timestamp}_{safe_topic}"
        project.mkdir(parents=True, exist_ok=True)

        self.save_json(
            project,
            "metadata.json",
            {
                "topic": topic,
                "created_at": timestamp,
                "status": "created"
            }
        )

        return project

    #####################################################
    # JSON
    #####################################################

    def save_json(self, project, filename, data):

        file = project / filename
        file.parent.mkdir(parents=True, exist_ok=True)

        with open(
            file,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                data,
                f,
                indent=4,
                ensure_ascii=False
            )

    def load_json(self, project, filename):

        file = project / filename

        if not file.exists():
            return None

        with open(
            file,
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)

    #####################################################
    # TEXT
    #####################################################

    def save_text(self, project, filename, text):

        file = project / filename
        file.parent.mkdir(parents=True, exist_ok=True)

        with open(
            file,
            "w",
            encoding="utf-8"
        ) as f:

            f.write(text)

    def load_text(self, project, filename):

        file = project / filename

        if not file.exists():
            return None

        return file.read_text(encoding="utf-8")

    #####################################################
    # BINARY FILES
    #####################################################

    def save_binary(self, project, filename, data: bytes):

        file = project / filename
        file.parent.mkdir(parents=True, exist_ok=True)

        with open(file, "wb") as f:
            f.write(data)

    def load_binary(self, project, filename):

        file = project / filename

        if not file.exists():
            return None

        with open(file, "rb") as f:
            return f.read()











# from pathlib import Path
# from datetime import datetime
# import json


# class ProjectManager:

#     def __init__(self):
#         self.base_path = Path("storage/projects")
#         self.base_path.mkdir(parents=True, exist_ok=True)

#     def create_project(self, topic):

#         timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

#         safe_topic = (
#             topic.lower()
#             .replace(" ", "-")
#             .replace("/", "-")
#         )

#         project_path = self.base_path / f"{timestamp}_{safe_topic}"

#         project_path.mkdir(parents=True, exist_ok=True)

#         return project_path

#     def save_json(self, project_path, filename, data):

#         with open(project_path / filename, "w", encoding="utf-8") as f:
#             json.dump(data, f, indent=4, ensure_ascii=False)

#     def load_json(self, project_path, filename):

#         file = project_path / filename

#         if not file.exists():
#             return None

#         with open(file, "r", encoding="utf-8") as f:
#             return json.load(f)

#     def save_text(self, project_path, filename, text):

#         with open(project_path / filename, "w", encoding="utf-8") as f:
#             f.write(text)

#     def load_text(self, project_path, filename):

#         file = project_path / filename

#         if not file.exists():
#             return None

#         return file.read_text(encoding="utf-8")