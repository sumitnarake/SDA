const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Connection to DB
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "2020BTECS00023",
    database: "assignment3",
});

// ************  Creation ---> /create  ************
// Student
app.post("/create/student", (req, res) => {
    const name = req.body.name;
    const dept_name = req.body.dept_name;
    const tot_cred = req.body.tot_cred;

    db.query(
        "INSERT INTO student (name_, dept_name, tot_cred) VALUES (?,?,?)", [name, dept_name, tot_cred],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Advisor
app.post("/create/advisor", (req, res) => {
    const sid = req.body.s_id;
    const iid = req.body.i_id;

    db.query(
        "INSERT INTO advisor (s_id, i_id) VALUES (?,?)", [sid, iid],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Instructor
app.post("/create/instructor", (req, res) => {
    const name = req.body.name;
    const dept_name = req.body.dept_name;
    const salary = req.body.salary;

    db.query(
        "INSERT INTO instructor (name_, dept_name, salary) VALUES (?,?,?)", [name, dept_name, salary],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Classroom
app.post("/create/classroom", (req, res) => {
    const building = req.body.building;
    const room_no = req.body.room_no;
    const capacity = req.body.capacity;

    db.query(
        "INSERT INTO classroom (building, room_number, capacity) VALUES (?,?,?)", [building, room_no, capacity],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Course
app.post("/create/course", (req, res) => {
    const course_id = req.body.course_id;
    const title = req.body.title;
    const dept_name = req.body.dept_name;
    const credits = req.body.credits;

    db.query(
        "INSERT INTO course (course_id, title, dept_name, credits) VALUES (?,?,?,?)", [course_id, title, dept_name, credits],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Department
app.post("/create/department", (req, res) => {
    const dept_name = req.body.dept_name;
    const building = req.body.building;
    const budget = req.body.budget;

    db.query(
        "INSERT INTO department (dept_name, building, budget) VALUES (?,?,?)", [dept_name, building, budget],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Prerequisite
app.post("/create/prereq", (req, res) => {
    const course_id = req.body.course_id;
    const prereq_id = req.body.prereq_id;

    db.query(
        "INSERT INTO prereq (course_id, prereq_id) VALUES (?,?)", [course_id, prereq_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Section
app.post("/create/section", (req, res) => {
    const course_id = req.body.course_id;
    const sec_id = req.body.sec_id;
    const semester = req.body.semester;
    const year = req.body.year;
    const building = req.body.building;
    const room_number = req.body.room_number;
    const time_slot_id = req.body.time_slot_id;

    db.query(
        "INSERT INTO section (course_id, sec_id, semester, year_, building, room_number, time_slot_id) VALUES (?,?,?,?,?,?,?)", [course_id, sec_id, semester, year, building, room_number, time_slot_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Takes
app.post("/create/takes", (req, res) => {
    const s_id = req.body.id;
    const course_id = req.body.course_id;
    const sec_id = req.body.sec_id;
    const semester = req.body.semester;
    const year = req.body.year;
    const grade = req.body.grade;

    db.query(
        "INSERT INTO takes (id, course_id, sec_id, semester, year_, grade) VALUES (?,?,?,?,?,?)", [s_id, course_id, sec_id, semester, year, grade],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Teaches
app.post("/create/teaches", (req, res) => {
    const i_id = req.body.id;
    const course_id = req.body.course_id;
    const sec_id = req.body.sec_id;
    const semester = req.body.semester;
    const year = req.body.year;

    db.query(
        "INSERT INTO teaches (id, course_id, sec_id, semester, year_) VALUES (?,?,?,?,?)", [i_id, course_id, sec_id, semester, year],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});

// Time Slot
app.post("/create/timeslot", (req, res) => {
    const time_slot_id = req.body.time_slot_id;
    const day = req.body.day;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    db.query(
        "INSERT INTO time_slot (time_slot_id, day_, start_time, end_time) VALUES (?,?,?,?)", [time_slot_id, day, start_time, end_time],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted successfully!")
            }
        }
    );
});


// ************  Getting data  ************
// Classroom
app.get("/classroom", (req, res) => {
    db.query("SELECT * FROM classroom", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Advisor
app.get("/advisor", (req, res) => {
    db.query("SELECT * FROM advisor", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Course
app.get("/course", (req, res) => {
    db.query("SELECT * FROM course", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Department
app.get("/department", (req, res) => {
    db.query("SELECT * FROM department", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Instructor
app.get("/instructor", (req, res) => {
    db.query("SELECT * FROM instructor", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Prerequisite
app.get("/prereq", (req, res) => {
    db.query("SELECT * FROM prereq", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Section
app.get("/section", (req, res) => {
    db.query("SELECT * FROM section", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Student
app.get("/student", (req, res) => {
    db.query("SELECT * FROM student", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Takes
app.get("/takes", (req, res) => {
    db.query("SELECT * FROM takes", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Teaches
app.get("/teaches", (req, res) => {
    db.query("SELECT * FROM teaches", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Time Slot
app.get("/timeslot", (req, res) => {
    db.query("SELECT * FROM time_slot", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


// ************  Updating data --> /update  ************
// Classroom
app.put("/update/classroom/:id", (req, res) => {
    const id = req.params.id;
    const building = req.body.building;
    const room_no = req.body.room_number;
    const capacity = req.body.capacity;

    db.query(
        "UPDATE classroom SET building=?, room_number=?, capacity=? WHERE room_number = ?", [building, room_no, capacity, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Advisor
app.put("/update/advisor/:id", (req, res) => {
    const id = req.params.id;
    const s_id = req.body.s_id;
    const i_id = req.body.i_id;

    db.query(
        "UPDATE advisor SET s_id=?, i_id=? WHERE s_id = ?", [s_id, i_id, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Course
app.put("/update/course/:id", (req, res) => {
    const id = req.params.id;
    const course_id = req.body.course_id;
    const title = req.body.title;
    const dept_name = req.body.dept_name;
    const credits = req.body.credits;

    db.query(
        "UPDATE course SET course_id=?, title=?, dept_name=?, credits=? WHERE course_id = ?", [course_id, title, dept_name, credits, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Department
app.put("/update/department/:id", (req, res) => {
    const id = req.params.id;
    const dept_name = req.body.dept_name;
    const building = req.body.building;
    const budget = req.body.budget;

    db.query(
        "UPDATE department SET dept_name=?, building=?, budget=? WHERE dept_name = ?", [dept_name, building, budget, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Instructor
app.put("/update/instructor/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const dept_name = req.body.dept_name;
    const salary = req.body.salary;

    db.query(
        "UPDATE instructor SET name_=?, dept_name=?, salary=? WHERE id = ?", [name, dept_name, salary, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Prerequisite
app.put("/update/prereq/:id", (req, res) => {
    const id = req.params.id;
    const course_id = req.body.course_id;
    const prereq_id = req.body.prereq_id;

    db.query(
        "UPDATE prereq SET course_id=?, prereq_id=? WHERE course_id = ?", [course_id, prereq_id, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Section
app.put("/update/section/:id", (req, res) => {
    const id = req.params.id;
    const course_id = req.body.course_id;
    const sec_id = req.body.sec_id;
    const semester = req.body.semester;
    const year = req.body.year;
    const building = req.body.building;
    const room_number = req.body.room_number;
    const time_slot_id = req.body.time_slot_id;

    db.query(
        "UPDATE section SET course_id=?, sec_id=?, semester=?, year_=?, building=?, room_number=?, time_slot_id=? WHERE sec_id = ?", [course_id, sec_id, semester, year, building, room_number, time_slot_id, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Student
app.put("/update/student/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const dept_name = req.body.dept_name;
    const tot_cred = req.body.tot_cred;

    db.query(
        "UPDATE student SET name_=?, dept_name=?, tot_cred=? WHERE id = ?", [name, dept_name, tot_cred, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Takes
app.put("/update/takes/:id", (req, res) => {
    const id = req.params.id;
    const s_id = req.body.id;
    const course_id = req.body.course_id;
    const sec_id = req.body.sec_id;
    const semester = req.body.semester;
    const year = req.body.year;
    const grade = req.body.grade;

    db.query(
        "UPDATE takes SET id=?, course_id=?, sec_id=?, semester=?, year_=?, grade=? WHERE id = ?", [s_id, course_id, sec_id, semester, year, grade, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Teaches
app.put("/update/teaches/:id", (req, res) => {
    const id = req.params.id;
    const i_id = req.body.id;
    const course_id = req.body.course_id;
    const sec_id = req.body.sec_id;
    const semester = req.body.semester;
    const year = req.body.year;

    db.query(
        "UPDATE takes SET id=?, course_id=?, sec_id=?, semester=?, year_=?, WHERE id = ?", [i_id, course_id, sec_id, semester, year, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// Time Slot
app.put("/update/timeslot/:id", (req, res) => {
    const id = req.params.id;
    const time_slot_id = req.body.time_slot_id;
    const day = req.body.day;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    db.query(
        "UPDATE time_slot SET time_slot_id=?, day_=?, start_time=?, end_time=? WHERE time_slot_id = ?", [time_slot_id, day, start_time, end_time, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


// ************  Deleting data ---> /delete  ************
// Classroom
app.delete("/delete/classroom/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM classroom WHERE room_number = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Advisor
app.delete("/delete/advisor/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM advisor WHERE s_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Course
app.delete("/delete/course/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM course WHERE course_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Department
app.delete("/delete/department/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM department WHERE dept_name = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Instructor
app.delete("/delete/instructor/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM instructor WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Prerequisite
app.delete("/delete/prereq/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM prereq WHERE course_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Section
app.delete("/delete/section/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM section WHERE sec_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Student
app.delete("/delete/student/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM student WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Takes
app.delete("/delete/takes/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM takes WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Teaches
app.delete("/delete/teaches/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM teaches WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Time Slot
app.delete("/delete/timeslot/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM time_slot WHERE time_slot_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Configuring server to listem on port 3001
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});