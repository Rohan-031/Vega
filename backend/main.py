from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.pipeline.pipeline_manager import PipelineManager

load_dotenv()

app = FastAPI(
    title="Vega TrendTube",
    version="1.0.0"
)

# Allow frontend (Next.js) to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pipeline = PipelineManager()


@app.get("/")
def home():
    return {
        "message": "Vega Backend Running"
    }


###########################################################
# DEBUG ENDPOINTS
###########################################################

@app.get("/api/trends")
def get_trends():

    return pipeline.get_trends()


@app.get("/api/news")
def get_news(topic: str):

    return pipeline.get_news(topic)


###########################################################
# MAIN PIPELINE
###########################################################

@app.get("/api/pipeline/run")
def run_pipeline(topic: str):

    return pipeline.run(topic)















# from fastapi import FastAPI

# from app.agents.trend.trend_agent import TrendAgent
# from app.core.project_manager import ProjectManager
# from app.agents.news.news_agent import NewsAgent
# from app.agents.research.research_agent import ResearchAgent
# from app.agents.script.script_agent import ScriptAgent
# from dotenv import load_dotenv
# import os

# load_dotenv()


# app = FastAPI(
#     title="Vega TrendTube",
#     version="1.0.0"
# )

# trend_agent = TrendAgent()
# news_agent = NewsAgent()
# research_agent = ResearchAgent(os.getenv("GEMINI_API_KEY"))
# script_agent = ScriptAgent(os.getenv("GEMINI_API_KEY"))
# project_manager = ProjectManager()

# @app.get("/")
# def home():
#     return {
#         "message": "Vega Backend Running"
#     }


# @app.get("/api/trends")
# def get_trends():

#     trends = trend_agent.fetch_trends()

#     return {
#         "status": "success",
#         "count": len(trends),
#         "trends": trends
#     }

# # newss
# @app.get("/api/news")
# def get_news(query: str):

#     news = news_agent.fetch_news(query)

#     return {
#         "status": "success",
#         "news": news
#     }

# @app.get("/api/research")
# def research(topic: str):

#     project = project_manager.create_project(topic)
#     news = news_agent.fetch_news(topic)
#     project_manager.save_json(project, "news.json", news)
#     result = research_agent.research(topic, news)
#     project_manager.save_text(project, "research.md", research)
#     return {
#         "status": "success",
#         "project": project.name,
#         "research": result
#     }


# @app.get("/api/script")
# def generate_script(topic: str):

#     news = news_agent.fetch_news(topic)

#     research = research_agent.research(topic, news)

#     script = script_agent.generate(research)

#     return {
#         "status": "success",
#         "script": script
#     }


