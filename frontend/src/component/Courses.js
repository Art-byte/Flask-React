import React, {useState, useEffect} from 'react'

const API = process.env.REACT_APP_FLASK_API


export const Courses =()=>{

    const [courseName, setCourseName] = useState('')
    const [instructor, setInstructor] = useState('')
    const [level, setLevel] = useState('')

    const [edit, setEdit] = useState(false)
    const [id, setId] = useState(false)


    const [courses, setCourses] = useState([])


    const handelSubmit = async(e) =>{
        e.preventDefault()

        if(!edit){
            const response = await fetch(API + '/courses',{
                method: 'POST',
                headers:{'Content-type': 'application/json'},
                body: JSON.stringify({
                    courseName,
                    instructor,
                    level
                })
            })
            const data = await response.json();
            console.log(data)
        }else{
            const res = await fetch(API + '/courses/' + id, {
                method: 'PUT',
                headers:{'Content-type': 'application/json'},
                body: JSON.stringify({
                    courseName,
                    instructor,
                    level
                })

            })
            const data = await res.json()
            setEdit(false)
            setId('')
        }

        await getCourses()
        setCourseName('')
        setInstructor('')
        setLevel('')
    }



    const getCourses = async() =>{
        const response = await fetch(API + '/courses')
        const data = await response.json()
        setCourses(data)
    }

   const deleteCourse= async(id)=>{
       const res = window.confirm('Are you sure you want to delete it? ')
       if(res){
        const response = await fetch(API + '/courses/' + id, {
            method:'DELETE'
        })
        await response.json()
        await getCourses() 
       }
  }

   const updateCourse = async(id) =>{
       const response = await fetch(API + '/courses/' + id)
       const data = await response.json()
       
       setEdit(true)
       setId(id)

       setCourseName(data.courseName)
       setInstructor(data.instructor)
       setLevel(data.level)
      }

    useEffect(()=>{
        getCourses()
    },[])





    return(
      
    <div className="row">
        <div className="col-md-4">
            <form onSubmit={handelSubmit} className="card card-body">
                <div className="form-group">
                    <input 
                    type="text"
                    onChange={e =>setCourseName(e.target.value)}
                    value={courseName}
                    className="form-control"
                    placeholder = "Course Name"
                    autoFocus
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text"
                    onChange={e => setInstructor(e.target.value)}
                    value={instructor}
                    className="form-control"
                    placeholder = "Instructor Name"
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text"
                    onChange={e => setLevel(e.target.value)}
                    value={level}
                    className="form-control"
                    placeholder = "Level"
                    />
                </div>
                <button className="btn btn-primary btn-block">
                {edit?'Update':'Add'}
                </button>
            </form>
        </div>
        <div className="col md-8">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                courses.map(course =>(
                    <tr key={course._id}>
                        <td>{course.courseName}</td>
                        <td>{course.instructor}</td>
                        <td>{course.level}</td>
                        <td>
                            <button 
                            className="btn btn-secondary btn-sm btn-block"
                            onClick={e => updateCourse(course._id)}
                            >Update
                            </button>
                        </td>
                        <td>
                            <button 
                            className="btn btn-danger btn-sm btn-block"
                            onClick={() => deleteCourse(course._id)}
                            >Delete
                            </button>
                        </td>

                    </tr>
                ))
            }
                </tbody>
            </table>
        </div>
    </div>




    )
}