from flask import Blueprint

bp = Blueprint("auth", __name__, template_folder="templates", static_url_path="/")

from app.auth import routes