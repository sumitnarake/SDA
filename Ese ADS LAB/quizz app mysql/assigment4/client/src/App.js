import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from './components/Navbar';
import Home from './components/Home';
import StudentForm from "./components/StudentForm";
import LoginStudent from "./components/LoginStudent";
import TeacherForm from "./components/TeacherForm";
import LoginTeacher from "./components/LoginTeacher";
import QuizForm from "./components/QuizForm";
import Result from "./components/Result";
import DisplayQue from "./components/DisplayQue";
import DispQuizAttempt from "./components/DispQuizAttempt";
import ViewResult from "./components/ViewResult";
import ProtectedStudentRoute from "./components/protected/ProtectedStudentRoute";
import ProtectedTeacherRoute from "./components/protected/ProtectedTeacherRoute";
import AttemptedStudents from "./components/AttemptedStudents";

function App() {
  return (
    <>
    <Router>
        <Navbar />

        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/register/student" element={<StudentForm />}/>
          <Route exact path="/register/teacher" element={<TeacherForm />}/>
          <Route exact path="/login/student" element={<LoginStudent />}/>
          <Route exact path="/login/teacher" element={<LoginTeacher />}/>
          {/* Teacher Protected Routes */}
          <Route exact path="/quiz/create" element={<ProtectedTeacherRoute>
                                                      <QuizForm />
                                                    </ProtectedTeacherRoute>}/>
          <Route exact path="/quiz/view" element={<ProtectedTeacherRoute>
                                                    <DispQuizAttempt />
                                                  </ProtectedTeacherRoute>}/>
          <Route exact path="/quiz/details" element={<ProtectedTeacherRoute>
                                                    <AttemptedStudents />
                                                  </ProtectedTeacherRoute>}/>
          <Route exact path="/result/view/:qid" element={<ProtectedTeacherRoute>
                                                          <ViewResult />
                                                         </ProtectedTeacherRoute>}/>
          {/* Student Protected Routes */}
          <Route exact path="/quiz/attempt" element={<ProtectedStudentRoute>
                                                        <DisplayQue />
                                                     </ProtectedStudentRoute>} />
          <Route exact path="/quiz/result" element={ <ProtectedStudentRoute>
                                                        <Result />
                                                      </ProtectedStudentRoute>}/>
          {/* Error 404 */}
          <Route exact path="*" element={<h2 className="text-center text-danger mt-4">Error 404 - Page Not Found!</h2>}/>
        </Routes>

        </div>
      </Router>
    
    </>
  );
}

export default App;
