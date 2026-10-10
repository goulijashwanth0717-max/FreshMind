import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Signup(){
  const nav = useNavigate()
  const [form,setForm]=useState({name:'',email:'',mobile:'',password:'',confirm:''})
  const handleCreate = async () => {
    if(!form.name||!form.email||!form.password) return alert('Fill all')
    if(form.password!==form.confirm) return alert('Passwords no match')
    try{ await fetch('http://localhost:8000/api/auth/signup', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)}) }catch(e){}
    const users = JSON.parse(localStorage.getItem('fm_users')||'[]')
    users.push({...form, store_id:`FM${String(users.length+2).padStart(4, '0')}`, login_count:0})
    localStorage.setItem('fm_users', JSON.stringify(users))
    alert('Account created! Now login')
    nav('/login')
  }
  return (
    <div className="min-h-screen bg-[#0D121D] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-[#151E2F] p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <input className="w-full p-3 mt-4 rounded bg-black/50" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="w-full p-3 mt-3 rounded bg-black/50" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="w-full p-3 mt-3 rounded bg-black/50" placeholder="Mobile" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/>
        <input className="w-full p-3 mt-3 rounded bg-black/50" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <input className="w-full p-3 mt-3 rounded bg-black/50" type="password" placeholder="Confirm Password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})}/>
        <button onClick={handleCreate} className="w-full mt-4 bg-emerald-400 text-black p-3 rounded font-bold">Create Account</button>
      </div>
    </div>
  )
}
