import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Course, Lead, LeadStatus } from '../types';
import { generateCourseSyllabus } from '../services/geminiService';
import { 
  Plus, Trash2, Edit2, Wand2, Loader2, 
  LayoutDashboard, Users, Trophy, FileText, Settings, BookOpen,
  Search, X, User as UserIcon, Clock, CalendarOff,
  PhoneCall, Volume2, CheckCircle2, ChevronRight
} from 'lucide-react';

const IVR_TEMPLATES = [
  { id: 'welcome', label: 'Course Welcome', duration: '0:45', script: 'Hi, welcome to NK Stock Solutions...' },
  { id: 'payment', label: 'Payment Reminder', duration: '0:30', script: 'Hello, this is a gentle reminder...' },
  { id: 'webinar', label: 'Webinar Invite', duration: '1:00', script: 'Join our exclusive webinar tomorrow...' },
];

const Admin = () => {
  const { courses, leads, sales, user, addCourse, deleteCourse, updateCourse, addLead, updateLeadStatus, deleteLead } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'sales' | 'reports' | 'settings' | 'courses'>('dashboard');
  
  const isAgent = user?.role === 'agent';
  const displayLeads = isAgent ? leads.filter(l => l.owner === user?.username) : leads;
  const displayLeadsIds = new Set(displayLeads.map(l => l.id));
  const displaySales = sales.filter(s => displayLeadsIds.has(s.leadId));

  const totalLeads = displayLeads.length;
  const closedWon = displayLeads.filter(l => l.status === 'Closed Won').length;
  const followUp = displayLeads.filter(l => l.status === 'Follow Up').length;
  const freeTrial = displayLeads.filter(l => l.status === 'Free Trial').length;
  
  const today = new Date().toISOString().split('T')[0];
  const calculateSalesSum = (data: any[]) => data.reduce((acc, curr) => acc + curr.amount, 0);
  const todaySales = calculateSalesSum(displaySales.filter(s => s.date === today));
  const allTimeSales = calculateSalesSum(displaySales);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({ owner: user?.username || 'Admin', status: 'New', source: 'Manual' });

  const filteredLeads = displayLeads.filter(lead => 
    lead.phone.includes(searchTerm) || lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [ivrLead, setIvrLead] = useState<Lead | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');

  const handleOpenIVR = (lead: Lead) => {
    setIvrLead(lead);
    setCallStatus('idle');
  };

  const handleInitiateCall = () => {
    setIsCalling(true);
    setCallStatus('calling');
    setTimeout(() => {
      setCallStatus('connected');
      setTimeout(() => {
        setCallStatus('completed');
        setIsCalling(false);
        setTimeout(() => setIvrLead(null), 1500);
      }, 3000);
    }, 2000);
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLead.name && newLead.phone) {
      addLead({
        id: Math.random().toString(36).substr(2, 9),
        name: newLead.name,
        phone: newLead.phone,
        email: newLead.email || '',
        owner: user?.username || 'Admin',
        status: newLead.status as LeadStatus || 'New',
        source: newLead.source || 'Manual',
        state: newLead.state || 'Unknown',
        date: new Date().toISOString().split('T')[0],
      });
      setIsLeadModalOpen(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col md:flex-row">
        {/* Sidebar - Refined */}
        <div className="md:w-72 bg-primary flex-shrink-0 z-10 p-6 flex flex-col h-screen sticky top-0">
          <div className="mb-12">
            <h2 className="text-2xl font-black text-white tracking-tighter">PULSE<span className="text-secondary">.</span></h2>
            <div className="mt-6 flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/5">
               <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold">
                 {user?.name.charAt(0)}
               </div>
               <div>
                  <p className="text-sm font-bold text-white">{user?.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{user?.role}</p>
               </div>
            </div>
          </div>
          
          <nav className="space-y-2 flex-grow">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Performance', roles: ['admin', 'agent'] },
              { id: 'leads', icon: Users, label: 'Lead Desk', roles: ['admin', 'agent'] },
              { id: 'sales', icon: Trophy, label: 'Revenue', roles: ['admin', 'agent'] },
              { id: 'courses', icon: BookOpen, label: 'Academy', roles: ['admin'] },
              { id: 'settings', icon: Settings, label: 'Config', roles: ['admin'] },
            ].filter(item => item.roles.includes(user?.role || 'agent')).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center w-full px-5 py-3.5 text-sm font-bold rounded-2xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-secondary text-primary shadow-xl shadow-secondary/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-surface p-6 md:p-12">
          
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in space-y-10">
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black text-primary">Overview</h1>
                  <p className="text-slate-500 font-medium">Tracking performance for {user?.name}</p>
                </div>
                <div className="bg-white p-2 rounded-2xl border border-slate-200 flex items-center space-x-2">
                   <span className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">Status: Live</span>
                   <div className="h-2 w-2 rounded-full bg-secondary animate-pulse mr-2"></div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Pipeline', val: totalLeads, color: 'text-indigo-600' },
                  { label: 'Conversions', val: closedWon, color: 'text-emerald-600' },
                  { label: 'Followups', val: followUp, color: 'text-cyan-600' },
                  { label: 'Free Trial', val: freeTrial, color: 'text-blue-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{s.label}</div>
                    <div className={`text-5xl font-black ${s.color}`}>{s.val}</div>
                  </div>
                ))}
              </div>

              <div className="bg-primary rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-10">
                 <div className="space-y-2">
                    <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Gross Revenue</h3>
                    <div className="text-6xl font-black">₹{allTimeSales.toLocaleString()}</div>
                 </div>
                 <div className="h-px md:h-20 w-full md:w-px bg-white/10"></div>
                 <div className="space-y-2">
                    <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Today's Target</h3>
                    <div className="text-6xl font-black text-secondary">₹{todaySales.toLocaleString()}</div>
                 </div>
                 <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all">
                    View Sales Report
                 </button>
              </div>
            </div>
          )}

          {/* Table Sections (Leads/Sales) would follow same clean aesthetic */}
          {activeTab === 'leads' && (
             <div className="animate-fade-in space-y-8">
                <div className="flex justify-between items-center">
                   <h2 className="text-3xl font-black text-primary">Lead Desk</h2>
                   <button onClick={() => setIsLeadModalOpen(true)} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold flex items-center hover:bg-secondary hover:text-primary transition-all shadow-xl">
                      <Plus className="mr-2 h-5 w-5" /> Quick Lead
                   </button>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                   <div className="p-6 border-b border-slate-100 flex items-center bg-slate-50/50">
                      <Search className="text-slate-400 h-5 w-5 mr-4" />
                      <input 
                        type="text" 
                        placeholder="Search lead identity or phone..." 
                        className="bg-transparent outline-none w-full font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                   </div>
                   <table className="w-full text-left">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <tr>
                          <th className="px-8 py-5">Identity</th>
                          <th className="px-8 py-5">Lifecycle</th>
                          <th className="px-8 py-5">Contact</th>
                          <th className="px-8 py-5 text-right">Engagement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map(l => (
                          <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-8 py-6">
                                <p className="font-bold text-primary">{l.name}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{l.source}</p>
                             </td>
                             <td className="px-8 py-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  l.status === 'Closed Won' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                   {l.status}
                                </span>
                             </td>
                             <td className="px-8 py-6 font-bold text-slate-600">{l.phone}</td>
                             <td className="px-8 py-6 text-right">
                                <button onClick={() => handleOpenIVR(l)} className="h-10 w-10 bg-secondary/10 text-secondary rounded-xl inline-flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                   <PhoneCall className="h-5 w-5" />
                                </button>
                             </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Modern Lead Modal */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-md p-4">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-12 shadow-2xl animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => setIsLeadModalOpen(false)} className="text-slate-300 hover:text-primary transition-colors"><X className="h-8 w-8" /></button>
              </div>
              <h3 className="text-3xl font-black text-primary mb-8">New Inquiry</h3>
              <form onSubmit={handleAddLead} className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Full Name</label>
                    <input required type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold focus:ring-2 ring-secondary transition-all" value={newLead.name || ''} onChange={e => setNewLead({...newLead, name: e.target.value})} />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Direct Phone</label>
                    <input required type="tel" className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold focus:ring-2 ring-secondary transition-all" value={newLead.phone || ''} onChange={e => setNewLead({...newLead, phone: e.target.value})} />
                 </div>
                 <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all">Register Lead</button>
              </form>
           </div>
        </div>
      )}

      {/* IVR Interface */}
      {ivrLead && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-md p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
               <div className="bg-slate-900 p-10 text-white">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-4">IVR Connect</h3>
                  <div className="text-4xl font-black">{ivrLead.name}</div>
                  <div className="text-slate-500 font-mono mt-2 tracking-tighter">{ivrLead.phone}</div>
               </div>
               
               <div className="p-10 text-center">
                  {callStatus === 'idle' ? (
                      <button onClick={handleInitiateCall} className="w-full bg-secondary text-primary py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-secondary/20 hover:scale-105 transition-all">
                        Initiate Outbound Call
                      </button>
                  ) : (
                      <div className="space-y-6">
                         <div className="h-24 w-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <Volume2 className="h-10 w-10" />
                         </div>
                         <h3 className="text-2xl font-black text-primary capitalize">{callStatus}...</h3>
                         <div className="flex justify-center space-x-2">
                            <span className="h-2 w-2 rounded-full bg-secondary animate-bounce delay-100"></span>
                            <span className="h-2 w-2 rounded-full bg-secondary animate-bounce delay-200"></span>
                            <span className="h-2 w-2 rounded-full bg-secondary animate-bounce delay-300"></span>
                         </div>
                      </div>
                  )}
               </div>
            </div>
         </div>
      )}
    </Layout>
  );
};

export default Admin;