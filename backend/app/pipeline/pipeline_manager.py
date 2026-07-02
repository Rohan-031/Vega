import os

from app.agents.trend.trend_agent import TrendAgent
from app.agents.news.news_agent import NewsAgent
from app.agents.research.research_agent import ResearchAgent
from app.agents.script.script_agent import ScriptAgent
from app.agents.voice.voice_agent import VoiceAgent
# from app.agents.subtitle.subtitle_agent import SubtitleAgent
from app.agents.storyboard.storyboard_agent import StoryboardAgent
from app.agents.asset.asset_agent import AssetAgent
from app.composer.composer import Composer
from app.core.project_manager import ProjectManager
from app.core.cache_manager import CacheManager


class PipelineManager:

    def __init__(self):

        self.project_manager = ProjectManager()
        self.cache_manager = CacheManager()

        self.trend_agent = TrendAgent()

        self.news_agent = NewsAgent()

        self.research_agent = ResearchAgent(
            os.getenv("GEMINI_API_KEY")
        )

        self.script_agent = ScriptAgent(
            os.getenv("GEMINI_API_KEY")
        )

        self.voice_agent = VoiceAgent()
        # self.subtitle_agent = SubtitleAgent()
        self.storyboard_agent = StoryboardAgent(
            os.getenv("GEMINI_API_KEY")
        )

        self.asset_agent = AssetAgent(
            os.getenv("PEXELS_API_KEY")
        )

        self.composer = Composer()
    ###############################################################
    # DEBUG
    ###############################################################

    def get_trends(self):

        project = self.project_manager.get_or_create_project("daily-trends")

        trends = self.trend_agent.run(
            self.project_manager,
            self.cache_manager,
            project
        )

        return {
            "status": "success",
            "count": len(trends),
            "trends": trends
        }

    def get_news(self, topic):

        project = self.project_manager.get_or_create_project(topic)

        news = self.news_agent.run(
            self.project_manager,
            self.cache_manager,
            project,
            topic
        )

        return {
            "status": "success",
            "project": project.name,
            "news": news
        }

    ###############################################################
    # COMPLETE PIPELINE
    ###############################################################

    def run(self, topic):

        project = self.project_manager.get_or_create_project(topic)

        # Trend
        self.trend_agent.run(
            self.project_manager,
            self.cache_manager,
            project
        )

        # News
        news = self.news_agent.run(
            self.project_manager,
            self.cache_manager,
            project,
            topic
        )

        # Research
        research = self.research_agent.run(
            self.project_manager,
            self.cache_manager,
            project,
            topic,
            news
        )

        # Script
        self.script_agent.run(
            self.project_manager,
            self.cache_manager,
            project,
            research
        )

        # Voice
        self.voice_agent.run(
            self.project_manager,
            self.cache_manager,
            project
        )

        self.storyboard_agent.run(
            self.project_manager,
            self.cache_manager,
            project
        )
        
        self.asset_agent.run(
            self.project_manager,
            self.cache_manager,
            project
        )
        
        self.composer.run(
            self.project_manager,
            self.cache_manager,
            project
        )
        return {
            "status": "success",
            "project": project.name,
            "message": "Pipeline completed successfully."
        }

















# import os

# from app.agents.trend.trend_agent import TrendAgent
# from app.agents.news.news_agent import NewsAgent
# from app.agents.research.research_agent import ResearchAgent
# from app.agents.script.script_agent import ScriptAgent
# from app.core.project_manager import ProjectManager


# class PipelineManager:

#     def __init__(self):

#         self.project_manager = ProjectManager()

#         self.trend_agent = TrendAgent()
#         self.news_agent = NewsAgent()
#         self.research_agent = ResearchAgent(
#             os.getenv("GEMINI_API_KEY")
#         )
#         self.script_agent = ScriptAgent(
#             os.getenv("GEMINI_API_KEY")
#         )

#     def get_trends(self):

#         trends = self.trend_agent.fetch_trends()

#         return {
#             "status": "success",
#             "count": len(trends),
#             "trends": trends
#         }

#     def get_news(self, topic):

#         news = self.news_agent.fetch_news(topic)

#         return {
#             "status": "success",
#             "news": news
#         }

#     def get_research(self, topic):

#         project = self.project_manager.create_project(topic)

#         news = self.news_agent.fetch_news(topic)

#         self.project_manager.save_json(
#             project,
#             "news.json",
#             news
#         )

#         research = self.research_agent.research(
#             topic,
#             news
#         )

#         self.project_manager.save_text(
#             project,
#             "research.md",
#             research
#         )

#         return {
#             "status": "success",
#             "project": project.name,
#             "research": research
#         }

#     def get_script(self, topic):

#         project = self.project_manager.create_project(topic)

#         news = self.news_agent.fetch_news(topic)

#         research = self.research_agent.research(
#             topic,
#             news
#         )

#         script = self.script_agent.generate(
#             research
#         )

#         self.project_manager.save_text(
#             project,
#             "script.txt",
#             script
#         )

#         return {
#             "status": "success",
#             "project": project.name,
#             "script": script
#         }