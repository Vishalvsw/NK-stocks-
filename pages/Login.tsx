import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';
import { Lock, User, TrendingUp, ArrowRight } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid identity credentials');
    }
  };

  return (
    <Layout>
      <div className="bg-surface min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 w-full max-w-lg overflow-hidden border border-slate-100">
          <div className="bg-primary p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="bg-secondary w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-secondary/20 relative z-10">
               <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl font-black text-white relative z-10">Access Portal</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-4 relative z-10">Enterprise Security Active</p>
          </div>
          
          <div className="p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center border border-red-100 animate-shake">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">User Identity</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <input
                    type="text"
                    required
                    className="block w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 ring-secondary transition-all"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <input
                    type="password"
                    required
                    className="block w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 ring-secondary transition-all"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-5 px-6 rounded-2xl text-sm font-black uppercase tracking-widest text-primary bg-secondary hover:bg-primary hover:text-white transition-all shadow-xl shadow-secondary/10"
              >
                Establish Session <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
            
            <div className="mt-12 text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Internal Sandbox Access</p>
              <p className="text-xs text-slate-500 font-medium">
                Admin: <span className="text-primary font-bold">admin / admin123</span><br/>
                Agent: <span className="text-primary font-bold">agent / agent123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;