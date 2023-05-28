from flask import Flask, render_template, request, flash, redirect, url_for, abort
from flask_mysqldb import MySQL
from . import app, db  # initially created by __init__.py, need to be used here
from .forms import *


@app.route("/")
def index():
    return render_template("landing.html", pageTitle="Login Page")



@app.route("/signuppages/signuphandlers.html")
def signup_handler():
    return render_template("/signuppages/signuphandlers.html", pageTitle="Sign up Handler")

@app.route("/signuppages/signupteachers.html")
def signup_teacher():
    return render_template("/signuppages/signupteachers.html", pageTitle="Sign up Teacher")

@app.route("/signuppages/signupstudents.html")
def signup_student():
    return render_template("/signuppages/signupstudents.html", pageTitle="Sign up Student")
