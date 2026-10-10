import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const nav = useNavigate()
  const [form,setForm] = useState({name:'Ananya Reddy', email:'ananya@freshmind.ai', mobile:'+91 98765 43210', password:'demo123'})
  const [loading,setLoading] = useState(false)
  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
      if(res.ok){ const d=await res.json(); localStorage.setItem('fm_current', JSON.stringify(d.user)); nav('/dashboard'); return; }
    } catch(e){ console.log('Backend down, using local fallback') }
    // FALLBACK - Works even if backend is down - THIS IS YOUR DEMO SAVER
    const demoUsers = JSON.parse(localStorage.getItem('fm_users')||'[]')
    const allUsers = [...demoUsers, {name:'Ananya Reddy', email:'ananya@freshmind.ai', mobile:'+91 98765 43210', password:'demo123', store_id:'FM0001'}]
    const found = allUsers.find(u=>u.email===form.email && u.password===form.password)
    if(found){ localStorage.setItem('fm_current', JSON.stringify(found)); nav('/dashboard'); }
    else { alert('Use Demo: ananya@freshmind.ai / demo123'); }
    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-[#0D121D] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-[#151E2F] p-6 rounded-xl">
        <h1 className="text-2xl font-bold">FreshMind - Login</h1>
        <p className="text-xs text-gray-400 mb-4">Demo: ananya@freshmind.ai / demo123</p>
        <input className="w-full p-3 mb-3 rounded bg-black/50" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="w-full p-3 mb-3 rounded bg-black/50" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button onClick={handleLogin} disabled={loading} className="w-full bg-emerald-400 text-black p-3 rounded font-bold">{loading?'Loading...':'Login to Dashboard'}</button>
        <p className="mt-3 text-center text-sm"><a href="/signup" className="text-emerald-400">Create account</a></p>
      </div>
    </div>
  )
}
