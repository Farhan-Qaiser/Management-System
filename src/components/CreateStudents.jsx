import {useState} from 'react'
import { addDoc, collection } from 'firebase/firestore'
import {db} from '../firebaseConfig'

const CreateStudents = ({getStudent}) => {

  const [name, setName] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [age, setAge] = useState('')
  const [isCreatingStudent, setIsCreatingStudent] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            setIsCreatingStudent(true)
            await addDoc(collection(db, 'Students'),{
              rollNo: Number(rollNo),
              name: name,
              age: Number(age)
            })
            setRollNo('')
            setName('')
            setAge('')
            setIsCreatingStudent(false)
            await getStudent()
        } catch (error) {
            console.log("Error Creating User",error)
            setIsCreatingStudent(false)
        }
    }




  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>

        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Student Name' required/>
        <input type="number" value={age} onChange={(e)=>{setAge(e.target.value)}} placeholder='Enter Student Age'/>
        <input type="number" value={rollNo} onChange={(e)=>{setRollNo(e.target.value)}} placeholder='Enter Roll Number'/>
        <button type="submit">{isCreatingStudent ? 'Creating....' : 'Create Student'}</button>

      </form>
    </div>
  )
}

export default CreateStudents
