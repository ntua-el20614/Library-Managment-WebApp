from flask import Flask, render_template, request, flash, redirect, url_for, abort
from flask_mysqldb import MySQL
from frontend import app, db  # initially created by __init__.py, need to be used here
import requests

@app.route("/")
def index():
    return render_template("landing.html", pageTitle="Login Page")



@app.route("/SignUpHandlers")
def signup_handler():
    return render_template("/signuppages/signuphandlers.html", pageTitle="Sign up Handler")

@app.route("/SignUpTeachers")
def signup_teacher():
    return render_template("/signuppages/signupteachers.html", pageTitle="Sign up Teacher")

@app.route("/SignUpStudents")
def signup_student():
    return render_template("/signuppages/signupstudents.html", pageTitle="Sign up Student")

@app.route("/wait_for_approval")
def wait_for_approval():
    return render_template("/signuppages/wait_for_approval.html", pageTitle="Wait up")



@app.route("/adduser/<username>/<password>/<user_name>/<birthday>/<email>",methods=["POST"])
def signup_user_to_db(username,password,user_name,birthday,email):
    url = request.args.get('http://localhost:3305/adduser/{}/{}/{}/{}/{}'.format(username,password,user_name,birthday,email)) 
    if url:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for unsuccessful status codes (4xx or 5xx)
            return render_template("/signuppages/wait_for_approval.html", pageTitle="Come back soon")# Return the content of the response
        except requests.exceptions.RequestException as e:
            return f"An error occurred: {e}"
    else:
        return "Please provide a valid URL."




@app.route("/student")
def page_for_student():
    return render_template("/student.html", pageTitle="Home Page")

@app.route("/teacher")
def page_for_teacher():
    return render_template("/teacher.html", pageTitle="Home Page")

@app.route("/handler")
def page_for_handler():
    return render_template("/handler.html", pageTitle="Home Page")

@app.route("/mastoras")
def page_for_mastoras():
    return render_template("/mastoras.html", pageTitle="Home Page")











#Users moves
####################################################################################~
@app.route("/rents")
def show_rents():
    return render_template("/rent/rents.html", pageTitle="My rents")

@app.route("/books")
def show_books():
    return render_template("/books.html", pageTitle="My books")

@app.route("/reservations")
def show_reservations():
    return render_template("/reserve/reservations.html", pageTitle="My rents")

@app.route("/student/reserve_a_book")
def reserve_a_book_student():
    return render_template("/reserve/reserve_a_book1.html", pageTitle="My rents")

@app.route("/teacher/reserve_a_book")
def reserve_a_book_teacher():
    return render_template("/reserve/reserve_a_book2.html", pageTitle="My rents")


@app.route("/review_a_book")
def review_a_book():
    return render_template("/review_a_book.html", pageTitle="Reviews")

@app.route("/review")
def reviews_of_a_book():
    return render_template("/review.html", pageTitle="Reviews")
####################################################################################~












#~Handler moves
####################################################################################~
@app.route("/avg_likert")
def average_likert():
    return render_template("/queries/avglikert.html", pageTitle="Average Likert")

@app.route("/addbook")
def add_book():
    return render_template("/addbook.html", pageTitle="Add Book")

@app.route("/delayed")
def delayed_returns():
    return render_template("/queries/delayed.html", pageTitle="Delayed Returns")

@app.route("/handler/books")
def see_all_books():
    return render_template("/handlerbooks.html", pageTitle="All Books")

@app.route("/approve/students")
def approve_students():
    return render_template("/approves/approvestudents.html", pageTitle="Approve Students")

@app.route("/approve/teachers")
def approve_teachers():
    return render_template("/approves/approveteachers.html", pageTitle="Approve Teachers")

@app.route("/approve/handlers")
def approve_handlers():
    return render_template("/approves/approvehandlers.html", pageTitle="Approve Handlers")

@app.route("/rent_a_book")
def rent_a_book():
    return render_template("/rent/rent_a_book.html", pageTitle="My rents")

@app.route("/approve/reviews")
def approve_reviews():
    return render_template("/approves/approvereviews.html", pageTitle="Approve Reviews")

@app.route("/approve/rents")
def approve_rents():
    return render_template("/approves/approverents.html", pageTitle="Approve Rents")

@app.route("/approve/reservations")
def approve_reservations():
    return render_template("/approves/approvereservations.html", pageTitle="Approve Rents")

@app.route("/approve/returns")
def approve_returns():
    return render_template("/approves/approvereturns.html", pageTitle="Approve Returns")

@app.route("/dduser")
def delete_or_deactivate():
    return render_template("/approves/deletedeactivate.html", pageTitle="Delete/Deactivate")
####################################################################################~











#~Mastoras moves
####################################################################################~
@app.route("/queries/all_rents")
def all_rents():
    return render_template("/queries/all_rents.html", pageTitle="All Rents")

@app.route("/queries/category")
def categories():
    return render_template("/queries/category.html", pageTitle="Categories")

@app.route("/queries/youngs")
def youngs():
    return render_template("/queries/youngs.html", pageTitle="Young Teachers")

@app.route("/queries/authors_no_rents")
def authors_no_rents():
    return render_template("/queries/authors_no_rents.html", pageTitle="Authors no Rents")

@app.route("/queries/handlers_more_20")
def handlers_more_20():
    return render_template("/queries/handlers_more_20.html", pageTitle="Handlers more 20")

@app.route("/queries/top_cat_comb")
def top_cat_comb():
    return render_template("/queries/top_cat_comb.html", pageTitle="Top Categ Comb")

@app.route("/queries/authors_5_less")
def authors_5_less():
    return render_template("/queries/authors_5_less.html", pageTitle="Authors 5 less")

@app.route("/add_new_school")
def add_new_school():
    return render_template("/addschool.html", pageTitle="Add School")
####################################################################################~