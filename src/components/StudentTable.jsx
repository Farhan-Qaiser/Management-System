import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import UpdateStudent from './UpdateStudent';
import { useState } from 'react'


export default function StudentTable({students , setStudents}) {

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)

    //update
    function handleUpdate(studentId) {
      const student = students.find(s=>s.id === studentId)
      setCurrentStudent(student)
      setEditDialogOpen(true)
    }
    async function handleSaveStudent() {
      const studentDoc = doc(db,"Students", currentStudent.id)
      await updateDoc(studentDoc,{
        name: currentStudent.name,
        age: currentStudent.age
      })
      setStudents(students.map((student)=>student.id === currentStudent.id ? currentStudent : student))
      handleClose()
    }



    //delete
    async function handleDelete(studentId) {
        const studentDocument = doc(db, 'Students',studentId)
        await deleteDoc(studentDocument)
        setStudents(students.filter((student)=>student.id !== studentId))
    }
    
    //Close dialog function
    function handleClose() {
      setCurrentStudent(null)
      setEditDialogOpen(false)
    }
    // handle change in dialog value
    function handleChange(event) {
      const {name , value} = event.target
      setCurrentStudent((prev)=>({
        ...prev,
        [name]: value
      }))
    }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  align="center">Student's Roll No #</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {student.rollNo}
              </TableCell>
              <TableCell align="center">{student.name}</TableCell>
              <TableCell align="center">{student.age}</TableCell>
              <TableCell align="center"><EditIcon style={{color:'#007bff', marginRight:10 ,cursor:"pointer"}} onClick={()=>handleUpdate(student.id)}/>
                <DeleteIcon style={{cursor:"pointer",color:"crimson",marginLeft:10}} onClick={()=>handleDelete(student.id)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <UpdateStudent
     currentStudent={currentStudent}
     editDialogOpen={editDialogOpen}
     handleChange={handleChange}
     handleSaveStudent={handleSaveStudent}
     handleClose={handleClose}
     />
     
    </>
  );
}
