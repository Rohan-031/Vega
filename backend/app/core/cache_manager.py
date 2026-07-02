class CacheManager:

    #####################################################
    # Exists
    #####################################################

    def exists(self, project, filename):

        return (project / filename).exists()

    #####################################################
    # JSON
    #####################################################

    def json(
        self,
        project_manager,
        project,
        filename
    ):

        return project_manager.load_json(
            project,
            filename
        )

    #####################################################
    # TEXT
    #####################################################

    def text(
        self,
        project_manager,
        project,
        filename
    ):

        return project_manager.load_text(
            project,
            filename
        )















# from pathlib import Path


# class CacheManager:

#     def exists(self, project_path, filename):

#         return (project_path / filename).exists()

#     def json(self, project_manager, project_path, filename):

#         return project_manager.load_json(
#             project_path,
#             filename
#         )

#     def text(self, project_manager, project_path, filename):

#         return project_manager.load_text(
#             project_path,
#             filename
#         )