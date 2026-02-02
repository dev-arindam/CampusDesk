import { useState } from "react";
<<<<<<< HEAD
import HomeScreen from "./student/HomeScreen";
import QuizScreen from "./student/QuizScreen";
import ResultScreen from "./student/ResultScreen";
import LoginScreen from "./login/LoginScreen";
import AdminDashboardScreen from "./admin/AdminDashboardScreen";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentProfile from "./student/StudentProfile";
import StudentAttendance from "./student/StudentAttendance";
import MySubjectScreen from "./student/MySubjectScreen";
import AssignmentScreen from "./student/AssignmentScreen";
import ChatScreen from "./student/ChatScreen";
=======
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";
import TeacherScreen from "./screens/TeacherScreen";
>>>>>>> 3b8d9c2d34860cdbc4cea375afb48e5d63c832a6

export default function App() {
const [user, setUser] = useState(null);

  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState("HTML");
  const [scores, setScores] = useState({
    HTML: 0,
    JAVASCRIPT: 0,
    REACT: 0,
    "C++": 0,
    PYTHON: 0
  });

  if (!user) {
    return <LoginScreen onLoginSuccess={setUser} />;
  }
<<<<<<< HEAD
  if (user.role_id === 2) {
    return <AdminDashboardScreen user={user} scores={scores}  onLogout={() => setUser(null)} />;
  }
  if (user.role_id === 1) {
    return <TeacherDashboard user={user} onLogout={() => setUser(null)} />;
=======
  if (user.role_id===2) {
    return <AdminScreen user={user} scores={scores} />;
  }
   if (user.role_id===1) {
    return <TeacherScreen user={user} />;
>>>>>>> 3b8d9c2d34860cdbc4cea375afb48e5d63c832a6
  }
  return (

    <>
      {screen === "home" && (
        <HomeScreen
         user={user}
          scores={scores}
          onStartQuiz={() => {
            setCategory("HTML");
            setScreen("quiz");
          }}
          onSelectCategory={(cat) => {
            setCategory(cat);
            setScreen("quiz");
          }}
<<<<<<< HEAD
          onOpenProfile={() => setScreen("profile")}
          onOpenAttendance={() => setScreen("attendance")}
          onOpenMySubject={() => setScreen("mySubject")}
          onOpenAssignment={() => setScreen("assignment")}
          onOpenChat={() => setScreen("chat")}
          onLogout={() => setUser(null)}
=======
          //  onOpenAdmin={() => setScreen("admin")}
>>>>>>> 3b8d9c2d34860cdbc4cea375afb48e5d63c832a6
        />
      )}
{screen === "mySubject" && (
  <MySubjectScreen onBack={() => setScreen("home")} />
)}
      {screen === "attendance" && (
  <StudentAttendance onBack={() => setScreen("home")}/>
)}
{screen === "assignment" && (
  <AssignmentScreen onBack={() => setScreen("home")} />
)}
{screen === "chat" && (
  <ChatScreen onBack={() => setScreen("home")} />
)}

<<<<<<< HEAD
      
=======
      {/* {screen === "admin" && (
  <AdminScreen
    user={user}                // ✅ pass user
    scores={scores}            // ✅ pass scores
    onStartQuiz={() => {       // optional, if you want play button inside student screen
      setCategory("HTML");
      setScreen("quiz");
    }}
    onSelectCategory={(cat) => {
      setCategory(cat);
      setScreen("quiz");
    }}
    onBack={() => setScreen("home")} // back function
  />
)} */}

>>>>>>> 3b8d9c2d34860cdbc4cea375afb48e5d63c832a6
      {screen === "quiz" && (
        <QuizScreen
        key={category}
          category={category}
          onFinish={(finalScore) => {
            setScores(prev => ({
              ...prev,
              [category]: finalScore
            }));
            setScreen("result");
          }}
          onQuit={() => setScreen("home")}
        />
      )}

      {screen === "profile" && (
  <StudentProfile
    user={user}
          onBack={() => setScreen("home")}
    
  />
)}

      {screen === "result" && (
        <ResultScreen
          score={scores[category]}
          category={category}
          onHome={() => setScreen("home")}
        />
      )}
    </>
  );
}
