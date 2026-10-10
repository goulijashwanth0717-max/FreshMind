from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, bcrypt
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Try Supabase, but don't crash if missing
try:
    from supabase import create_client
    url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
    key = os.getenv("SUPABASE_ANON_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY") or os.getenv("SUPABASE_KEY")
    supabase = create_client(url, key) if url and key else None
    print("✅ Supabase Connected" if supabase else "⚠️ No Supabase keys, using memory")
except Exception as e:
    supabase = None
    print(f"⚠️ Supabase import failed: {e}, using memory")

MEMORY_USERS = [{"name":"Ananya Reddy","email":"ananya@freshmind.ai","mobile":"+91 98765 43210","password":"demo123","store_id":"FM0001","login_count":5}]

class SignupReq(BaseModel):
    name: str; email: str; mobile: str; password: str
class LoginReq(BaseModel):
    email: str; password: str; name: str = ""; mobile: str = ""

@app.get("/")
def root(): return {"status":"ok", "database":"supabase_connected" if supabase else "memory_mode", "users": len(MEMORY_USERS)}

@app.post("/api/auth/signup")
def signup(r: SignupReq):
    global MEMORY_USERS
    # Save in memory always
    MEMORY_USERS.append({"name":r.name,"email":r.email,"mobile":r.mobile,"password":r.password,"store_id":f"FM{len(MEMORY_USERS):04d}","login_count":0})
    # Try Supabase if available
    if supabase:
        try:
            hashed = bcrypt.hashpw(r.password.encode(), bcrypt.gensalt()).decode()
            supabase.table("fm_users").insert({"name":r.name,"email":r.email,"mobile":r.mobile,"password_hash":hashed,"store_id":f"FM{len(MEMORY_USERS):04d}","login_count":0}).execute()
        except Exception as e: print(f"Supabase insert failed: {e}")
    return {"message":"Created"}

@app.post("/api/auth/login")
def login(r: LoginReq):
    # Try Supabase first
    if supabase:
        try:
            res = supabase.table("fm_users").select("*").eq("email", r.email).execute()
            if res.data:
                u = res.data[0]
                if bcrypt.checkpw(r.password.encode(), u["password_hash"].encode()):
                    return {"user": u}
        except: pass
    # Fallback to memory
    for u in MEMORY_USERS:
        if u["email"]==r.email and u["password"]==r.password:
            return {"user": u}
    raise HTTPException(401, "Invalid credentials. Use demo: ananya@freshmind.ai / demo123")

@app.get("/api/users")
def users():
    if supabase:
        try:
            res = supabase.table("fm_users").select("*").execute()
            return {"users": res.data, "total": len(res.data)}
        except: pass
    return {"users": MEMORY_USERS, "total": len(MEMORY_USERS)}

@app.get("/api/stats")
def stats():
    return {"total_users": len(MEMORY_USERS), "source":"live"}
