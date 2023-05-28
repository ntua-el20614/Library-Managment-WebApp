from flask import Flask, render_template, request, flash, redirect, url_for, abort
from flask_mysqldb import MySQL
from . import app, db  # initially created by __init__.py, need to be used here
from .forms import *


@app.route("/")
def index():
    return render_template("landing.html", pageTitle="Landing Page")


