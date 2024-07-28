import StudentTable from "./StudentTable"

const StudentList = ({students,setStudents}) => {




  return (
    <>
      <h1 className='student-list-title'>Students List</h1>
      <StudentTable students = {students} setStudents={setStudents}/>
    </>
  )
}

export default StudentList
