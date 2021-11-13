import { useEffect, useState } from "react";
import { getUsers, register } from "./apiCalls";
import './index.css'


function App() {
  const [users, setUsers] = useState([])
  const [isOpen, toggleOpen] = useState(false)
  const [user, setUser] = useState({name:'',email:'',mobile:'', password:''})

  const handleUsers = async()=>{
    const res = await getUsers()
    setUsers(prev=> prev=res)
  }

  const handleClose = ()=>{
    setUser({name:'',email:'',mobile:'', password:''})
    toggleOpen(!isOpen)
  }

  const handleCreate = async()=>{
    const {name, email, password, mobile} = user
    register(name, email, password, mobile)
    .then(data =>{
      handleUsers()
      handleClose()
    })
  }

  useEffect(()=>{
    handleUsers()
  },[])

  if(isOpen)
  {
    return (
      <div className='container'>
        <input type='text' value={user.name} placeholder='Enter your name' className="form-control"
          onChange={(e)=>{
            setUser((prev)=>({...prev, name:e.target.value}))
          }}
        />
        <input type='text' value={user.email} placeholder='Enter your email' className="form-control"
          onChange={(e)=>{
            setUser((prev)=>({...prev, email:e.target.value}))
          }}
        />
        <input type='text' value={user.mobile} placeholder='Enter your mobile number' className="form-control"
          onChange={(e)=>{
            setUser((prev)=>({...prev, mobile:e.target.value}))
          }}
        />
        <input type='text' value={user.password} placeholder='Enter your password' className="form-control"
          onChange={(e)=>{
            setUser((prev)=>({...prev, password:e.target.value}))
          }}
        />

          <button type="button" className="btn btn-primary" onClick={handleCreate}>
                Submit
          </button>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className='row'>
          <div>
              <button type="button" className="btn btn-primary" onClick={()=>{
                toggleOpen(!isOpen)
              }}>
                Register
              </button>
          </div>
          <h1>Users Data</h1>
          <table className='table'>
           <thead>
             <tr>
               <th>S.no</th>
               <th>Name</th>
               <th>Email</th>
               <th>Mobile</th>
             </tr>
           </thead>
            <tbody>
              {
                  users.map((ele, idx)=>{
                    return  <tr key={idx}>
                      <td>{idx+1}</td>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.mobile}</td>
                    </tr>
                  })
              }
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default App;
