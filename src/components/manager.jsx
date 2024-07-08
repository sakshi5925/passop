import React from 'react'
import { useRef,useState ,useEffect } from 'react';


import { ToastContainer, toast } from 'react-toastify';
import{v4 as uuidv4} from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const ref=useRef();
  const passwordRef=useRef();
  const [form, setForm] = useState({site:"",username:"",password:""})
   const [passwordArray, setPasswordArray] = useState([])
   useEffect(() => {
    let passwords=localStorage.getItem("passwords");
    
    if(passwords){
      setPasswordArray(JSON.parse(passwords));
    }
    else{
      setPasswordArray([]);
    }
   
     
   }, []);
   const copyText=(text)=>{
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     
      })
  navigator.clipboard.writeText(text);
   }
   
const showPassword=()=>{
 passwordRef.current.type="text";
 if(ref.current.src.includes("icons/eyecross.svg")){
 ref.current.src="icons/eye.svg";
 passwordRef.current.type="password";
}
else{
  ref.current.src="icons/eyecross.svg"
  passwordRef.current.type="text";
}
}
const savePassword=()=>{
  if(form.site.length >3 && form.username.length >3 && form.password.length >3){
  const updatedPasswordArray = [...passwordArray, {...form,id:uuidv4()}];
  setPasswordArray(updatedPasswordArray);
  localStorage.setItem("passwords",JSON.stringify(updatedPasswordArray));
  setForm({site:"",username:"",password:""})
  toast('Password saved ', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
   
    })
  }
  else{
    toast('Error Password not saved... ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     
      })
  } 
}

const deletePassword=(id)=>{
  let con=confirm("Do you really want to delete this password? ")
  if(con){
  const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
  setPasswordArray(updatedPasswordArray);
  localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));}
   toast('Password Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     
      })
}
const editPassword=(id)=>{
   console.log("Editing password with id",id)
   setForm(passwordArray.filter(i=>i.id===id)[0])
   const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
   setPasswordArray(updatedPasswordArray);
   

}

const handleChange=(e)=>{
   setForm({...form,[e.target.name]:e.target.value })
}

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition="Bounce"
/>

<ToastContainer />
    <div className="absolute top-0 -z-10 h-full w-full bg-green-50"></div>
    <div className="md:mycontainer p-3   min-h-[88.2vh]">
      <h1 className='text-4xl font-bold text-center  '> <span className='text-green-500'>&lt;</span>
        Pass
        <span className='text-green-500'>OP/&gt;</span></h1>
      <p className='text-green-900 text-lg text-center w-full'>Your own Password Manager</p>
     <div className=' flex flex-col p-4 text-black gap-8 items-center'>
     <input value={form.site}  onChange={handleChange}   placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site"/>
     <div className='flex flex-col  md:flex-row w-full justify-between gap-8'>
     <input value={form.username} onChange={handleChange}   placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username"/>
     <div className='relative'>
     <input ref={passwordRef} value={form.password}  onChange={handleChange}  placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password"/>
     <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword} >
        <img ref={ref} className='p-1' width="26px" src="icons/eye.svg" alt="eye" />
     </span>
     </div>
     </div>

     <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border border-green-900'>
     <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover">
</lord-icon>
      Save</button>
     </div>
      <div className="password">
        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
        {passwordArray.length===0 && <div>No passwords to show</div>}
        {passwordArray.length!=0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
  <thead className=' bg-green-800 text-white'>
    <tr>
      <th className='py-2'>Site</th>
      <th className='py-2'>Username</th>
      <th className='py-2'>Password</th>
      <th className='py-2'>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-green-100'>
    
     {passwordArray.map((item,index)=>{
       return  <tr key={index}>
       <td className='  border border-white  py-2 text-center '>
        <div className='flex items-center justify-center' >
        <a href={item.site}target='_blank' rel='noopener noreferrer'>{item.site}</a>
       <div className='cursor-pointer py-2 px-2 '  onClick={()=>{copyText(item.site)}}>
       <img width="20px" src="icons/copy.svg" alt="" /></div>
       </div>
       </td>
       <td className='  border border-white  py-2 text-center '>
       <div className='flex items-center justify-center' >
        <span>{item.username}</span>
       <div className='cursor-pointer py-2 px-2 ' onClick={()=>{copyText(item.username)}}>
       <img width="20px" src="icons/copy.svg" alt="" /></div></div>
       </td>
       <td className='  border border-white  py-2 text-center '>
        <div className='flex items-center justify-center ' >
        <span>{item.password}</span>
       <div className='cursor-pointer py-2 px-2 ' onClick={()=>{copyText(item.password)}}>
       <img width="20px" src="icons/copy.svg" alt="" /></div>
       </div>
       </td>
       <td className=' border border-white  py-2 text-center'>
        <div className='flex items-center justify-center gap-2 ' >
        <span className='cursor-pointer' onClick={()=>{editPassword(item.id)}}>
          <img width="25px" src="icons/edit.svg" alt="" />
        </span>
        <span className='cursor-pointer'onClick={()=>{deletePassword(item.id)}}>
          <img width="25px" src="icons/delete.svg" alt="" />
        </span>
        </div>
       </td>
     </tr>
     })}
    
   
  
  </tbody>
</table>}
       
      </div> 
     </div>

  

    </>
  )
}

export default Manager
