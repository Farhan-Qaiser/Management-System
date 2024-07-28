import "./App.css"
import CreateStudents from "./components/CreateStudents"
import StudebtList from "./components/StudentList"
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from './firebaseConfig'



const App = () => {

  const [students, setStudents] = useState([])
  const studentCollection = collection(db , 'Students')

  const getStudent = async()=>{
    try {
      const studentSnapshot = await getDocs(studentCollection)
      const studentList = studentSnapshot.docs.map(doc =>(
          {
          id: doc.id,
          ...doc.data()
  
          })
  )
      setStudents(studentList)
  }
     catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStudent()
  }, [])
  


  return (
    <div className="app-container">
      <h1 className="app-title">Student Management System</h1>
      <CreateStudents  getStudent = {getStudent}/>
      <StudebtList students={students} setStudents={setStudents} getStudent={getStudent}/>
    </div>
  )
}

export default App
