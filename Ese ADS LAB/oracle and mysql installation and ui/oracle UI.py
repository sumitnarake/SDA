import cx_Oracle
from tkinter import *
expression = ""

con = cx_Oracle.connect(
    user="system",
    password="S@n22052002",
    dsn="localhost:1521/XEPDB1"
    # "SYSTEM/1234@XEPDB1"
)

cur = con.cursor()
cur = con.cursor()


root=Tk()
root.geometry('500x450')
root.title("Course registration system")


def add_course(): # new window definition
    def add_query():
        global root
        stat="INSERT INTO books(course_name,course_id) VALUES ('"+E1.get()+"','"+E2.get()+"')"
        cur.execute(stat)
        con.commit()
        add.config(state=NORMAL)
        update.config(state=NORMAL)
        show.config(state=NORMAL)
        delete.config(state=NORMAL)
        newwin.destroy()
    newwin = Toplevel(root)
    newwin.geometry('500x450')
    add.config(state=DISABLED)
    newwin.title("Add New Course")
    L1 = Label(newwin, text=" COURSE NAME ")
    L1.place(x=10,y=50)
    E1 = Entry(newwin, bd=5)
    E1.place(x=100,y=50)
    L2 = Label(newwin, text=" COURSE ID ")
    L2.place(x=10,y=100)
    E2 = Entry(newwin, bd=5)
    E2.place(x=100,y=100)
    sub=Button(newwin,text="Submit",command=add_query)
    sub.place(x=120,y=200)

def update_data(): # new window definition
    def UPDD():
        global root
        stat="UPDATE books SET course_name = '"+ E1.get() +"' WHERE course_id ='"+E2.get()+"'"
        con.commit()
        cur.execute(stat)
        con.commit()
        add.config(state=NORMAL)
        newwin.destroy()

    newwin = Toplevel(root)
    newwin.geometry('400x350')
    newwin.title("Add New COURSE")
    add.config(state=NORMAL)

    L1 = Label(newwin, text="COURSE Name")
    L1.place(x=10,y=50)
    E1 = Entry(newwin, bd=5)
    E1.place(x=100,y=50)

    L2 = Label(newwin, text="COURSE ID")
    L2.place(x=10,y=100)
    E2 = Entry(newwin, bd=5)
    E2.place(x=100,y=100)


    sub=Button(newwin,text="Update",command=UPDD)
    sub.place(x=120,y=200)


def del_data():
    def delete():
        global root
        stat="DELETE FROM books WHERE course_id='"+E1.get()+"'"

        cur.execute(stat)
        con.commit()
        add.config(state=NORMAL)
        newwin.destroy()

    newwin=Toplevel(root)
    newwin.geometry('400x350')
    newwin.title("Delete COURSE")
    add.config(state=NORMAL)
    L1 = Label(newwin, text="course_ic")
    L1.place(x=10, y=50)
    E1 = Entry(newwin,bd=5)
    E1.place(x=100, y=50)
    sub = Button(newwin, text="Delete Entry", command=delete)
    sub.place(x=120, y=200)


def display():
    newwin=Toplevel(root)
    newwin.geometry('400x350')
    newwin.title("COURSE Details")
    stat="SELECT * FROM books"
    cur.execute(stat)
    L1=Label(newwin,text="course_name")
    L1.grid(row=0,column=0)
    L2 = Label(newwin, text="course_id")
    L2.grid(row=0, column=1)
    
    i=1
    for row in cur:
        L1 = Label(newwin, text=row[0])
        L1.grid(row=i, column=0)
        L2 = Label(newwin, text=row[1])
        L2.grid(row=i, column=1)
        i+=1


add= Button(root,text='Add New COURSE',command=add_course)
delete= Button(root,text='Delete COURSE Entry',command=del_data)
update= Button(root,text='Update COURSE Info',command=update_data)
show= Button(root,text='Show COURSE Details',command=display)
add.place(x=50,y=50)
delete.place(x=50,y=100)
update.place(x=200,y=50)
show.place(x=200,y=100)

root.mainloop()