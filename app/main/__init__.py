from flask import Blueprint

bp = Blueprint("main", __name__, template_folder="templates", static_folder="static", static_url_path="/")

from app.main import routes