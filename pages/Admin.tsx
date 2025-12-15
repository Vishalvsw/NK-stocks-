import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Course, Lead, LeadStatus } from '../types';
import { generateCourseSyllabus } from '../services/geminiService';
import { 
  Plus, Trash2, Edit2, Wand2, Loader2, 
  LayoutDashboard, Users, Trophy, FileText, Settings, BookOpen,
  Search, X, RefreshCw, User as UserIcon, Clock, CalendarOff, Calendar,
  PhoneCall, Voicemail, CheckCircle2, Volume2
} from 'lucide-react';

// Mock IVR Templates
const IVR_TEMPLATES = [
  { id: 'welcome', label: 'Course Welcome', duration: '0:45', script: 'Hi, welcome to NK Stock Solutions. We are excited to start your journey...' },
  { id: 'payment', label: 'Payment Reminder', duration: '0:30', script: 'Hello, this is a gentle reminder regarding your pending course fee...' },
  { id: 'webinar', label: 'Webinar Invite', duration: '1:00', script: 'Join our exclusive market analysis webinar happening tomorrow at 10 AM...' },
  { id: 'followup', label: 'General Follow-up', duration: '0:20', script: 'Hi, just checking in to see if you had any questions about our courses...' },
];

const Admin = () => {
  const { courses, leads, sales, user, addCourse, deleteCourse, updateCourse, addLead, updateLeadStatus, deleteLead } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'sales' | 'reports' | 'settings' | 'courses'>('dashboard');
  
  // --- ROLE BASED DATA FILTERING ---
  const isAgent = user?.role === 'agent';
  
  // If Agent, only show leads assigned to them. If Admin, show all.
  const displayLeads = isAgent 
    ? leads.filter(l => l.owner === user?.username) 
    : leads;

  // Filter Sales based on the filtered leads
  const displayLeadsIds = new Set(displayLeads.map(l => l.id));
  const displaySales = sales.filter(s => displayLeadsIds.has(s.leadId));


  // --- Dashboard Logic ---
  const totalLeads = displayLeads.length;
  const closedWon = displayLeads.filter(l => l.status === 'Closed Won').length;
  const followUp = displayLeads.filter(l => l.status === 'Follow Up').length;
  const freeTrial = displayLeads.filter(l => l.status === 'Free Trial').length;
  const others = displayLeads.filter(l => ['New', 'Interested', 'Closed Lost', 'Others'].includes(l.status)).length;

  // --- Sales Calculation ---
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const calculateSalesSum = (salesData: typeof displaySales) => salesData.reduce((acc, curr) => acc + curr.amount, 0);

  const todaySales = calculateSalesSum(displaySales.filter(s => s.date === today));
  
  const thisMonthSales = calculateSalesSum(displaySales.filter(s => {
      const d = new Date(s.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }));

  const lastMonthSales = calculateSalesSum(displaySales.filter(s => {
      const d = new Date(s.date);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  }));

  const allTimeSales = calculateSalesSum(displaySales);


  // --- Leads Logic ---
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({ owner: user?.username || 'Admin', status: 'New', source: 'Manual' });

  const filteredLeads = displayLeads.filter(lead => {
    const matchesSearch = lead.phone.includes(searchTerm) || lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const followUpLeads = displayLeads.filter(l => l.status === 'Follow Up');
  const freeTrialLeads = displayLeads.filter(l => l.status === 'Free Trial');

  // --- IVR Logic ---
  const [ivrLead, setIvrLead] = useState<Lead | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(IVR_TEMPLATES[0].id);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');

  const handleOpenIVR = (lead: Lead) => {
    setIvrLead(lead);
    setCallStatus('idle');
    setSelectedTemplate(IVR_TEMPLATES[0].id);
  };

  const handleInitiateCall = () => {
    setIsCalling(true);
    setCallStatus('calling');
    
    // Simulate API delay for IVR Gateway
    setTimeout(() => {
      setCallStatus('connected');
      setTimeout(() => {
        setCallStatus('completed');
        setIsCalling(false);
        // Auto close after success
        setTimeout(() => setIvrLead(null), 1500);
      }, 3000); // 3 seconds connected state
    }, 2000); // 2 seconds calling state
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLead.name && newLead.phone) {
      addLead({
        id: Math.random().toString(36).substr(2, 9),
        name: newLead.name,
        phone: newLead.phone,
        email: newLead.email || '',
        owner: user?.username || 'Admin', // Assign to current user
        status: newLead.status as LeadStatus || 'New',
        source: newLead.source || 'Manual',
        state: newLead.state || 'Unknown',
        date: new Date().toISOString().split('T')[0],
        interestedIn: newLead.interestedIn,
        followUpDate: new Date().toISOString().split('T')[0]
      });
      setIsLeadModalOpen(false);
      setNewLead({ owner: user?.username || 'Admin', status: 'New', source: 'Manual' });
    }
  };

  // --- Sales Filter Logic ---
  const [salesFilter, setSalesFilter] = useState<'All' | 'Weekly' | 'Monthly' | 'Yearly'>('All');
  
  const getFilteredSales = () => {
    const now = new Date();
    return displaySales.filter(sale => {
        const saleDate = new Date(sale.date);
        
        if (salesFilter === 'All') return true;
        
        if (salesFilter === 'Weekly') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            return saleDate >= sevenDaysAgo;
        }
        
        if (salesFilter === 'Monthly') {
            return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
        }
        
        if (salesFilter === 'Yearly') {
            return saleDate.getFullYear() === now.getFullYear();
        }
        return true;
    });
  };

  const filteredSalesData = getFilteredSales();
  const filteredRevenue = filteredSalesData.reduce((acc, curr) => acc + curr.amount, 0);


  // --- Courses Logic (Existing) ---
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseFormData, setCourseFormData] = useState<Partial<Course>>({
    title: '', description: '', price: 0, originalPrice: 0, category: 'Beginner', curriculum: [], instructor: 'Rajesh Kumar'
  });

  const handleOpenCourseModal = (course?: Course) => {
    if (course) setCourseFormData(course);
    else setCourseFormData({ title: '', description: '', price: 0, originalPrice: 0, category: 'Beginner', curriculum: [], instructor: 'Rajesh Kumar' });
    setIsCourseModalOpen(true);
  };

  const handleGenerateSyllabus = async () => {
    if (!courseFormData.title) { alert("Please enter a course title first"); return; }
    setIsGenerating(true);
    try {
        const syllabus = await generateCourseSyllabus(courseFormData.title);
        setCourseFormData(prev => ({ ...prev, curriculum: syllabus }));
    } finally { setIsGenerating(false); }
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseFormData.id) updateCourse(courseFormData as Course);
    else addCourse({ ...courseFormData, id: Math.random().toString(36).substr(2, 9), image: 'https://picsum.photos/800/600', rating: 0, students: 0, features: ['Certificate', 'Lifetime Access'] } as Course);
    setIsCourseModalOpen(false);
  };

  return (
    <Layout>
      {/* Outer Wrapper for Background */}
      <div className="bg-slate-50 min-h-screen">
        {/* Constrained Centered Container */}
        <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col md:flex-row bg-white border-x border-gray-100 shadow-2xl overflow-hidden">
          
          {/* Sidebar / Topbar Navigation */}
          <div className="md:w-64 bg-white border-b md:border-r border-gray-200 flex-shrink-0 z-10">
            <div className="p-4 border-b border-gray-100 hidden md:block">
              <h2 className="text-xl font-bold text-slate-800">Market Pulse</h2>
              <div className="flex items-center mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                 <UserIcon className="h-3 w-3 mr-2 text-secondary" />
                 <div>
                    <p className="font-semibold text-gray-700">{user?.name}</p>
                    <p className="capitalize text-xs text-gray-400">{user?.role} Account</p>
                 </div>
              </div>
            </div>
            
            <nav className="p-2 space-y-1 overflow-x-auto flex md:block md:overflow-x-visible">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'leads', icon: Users, label: 'Leads' },
                { id: 'sales', icon: Trophy, label: 'Sales' },
                { id: 'reports', icon: FileText, label: 'Reports' },
                { id: 'courses', icon: BookOpen, label: 'Courses' },
                { id: 'settings', icon: Settings, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap md:whitespace-normal ${
                    activeTab === item.id 
                      ? 'bg-secondary/10 text-secondary' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50">
            
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="animate-fade-in space-y-8">
                
                {/* Row 1: Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-cyan-500 rounded-lg p-5 text-white shadow-lg shadow-cyan-500/10">
                    <h3 className="text-sm font-medium opacity-90">Total Leads</h3>
                    <div className="text-3xl font-bold mt-2">{totalLeads}</div>
                  </div>
                  <div className="bg-emerald-400 rounded-lg p-5 text-white shadow-lg shadow-emerald-400/10">
                    <h3 className="text-sm font-medium opacity-90">Closed Won</h3>
                    <div className="text-3xl font-bold mt-2">{closedWon}</div>
                  </div>
                   <div className="bg-cyan-400 rounded-lg p-5 text-white shadow-lg shadow-cyan-400/10">
                    <h3 className="text-sm font-medium opacity-90">Followup</h3>
                    <div className="text-3xl font-bold mt-2">{followUp}</div>
                  </div>
                  <div className="bg-blue-500 rounded-lg p-5 text-white shadow-lg shadow-blue-500/10">
                    <h3 className="text-sm font-medium opacity-90">Free Trial</h3>
                    <div className="text-3xl font-bold mt-2">{freeTrial}</div>
                  </div>
                  <div className="bg-fuchsia-400 rounded-lg p-5 text-white shadow-lg shadow-fuchsia-400/10">
                    <h3 className="text-sm font-medium opacity-90">Others</h3>
                    <div className="text-3xl font-bold mt-2">{others}</div>
                  </div>
                </div>

                {/* Row 2: Sales Section (Green Background) */}
                <div className="bg-green-400 rounded-xl p-6 shadow-sm">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Today's Sales</h3>
                        <div className="text-3xl font-bold text-slate-900">₹{todaySales.toLocaleString()}</div>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">This Month Sales</h3>
                        <div className="text-3xl font-bold text-slate-900">₹{thisMonthSales.toLocaleString()}</div>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Last Month Sales</h3>
                        <div className="text-3xl font-bold text-slate-900">₹{lastMonthSales.toLocaleString()}</div>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">All Time Sales</h3>
                        <div className="text-3xl font-bold text-slate-900">₹{allTimeSales.toLocaleString()}</div>
                      </div>
                   </div>
                </div>

                {/* Row 3: Tables (Follow UP & Free Trial) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {/* Follow UP Table */}
                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[300px]">
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="text-lg font-bold text-slate-800">Follow UP</h3>
                         <div className="relative">
                            <input type="date" className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:border-secondary" defaultValue={today} />
                         </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[500px]">
                          <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                              <th className="px-4 py-3 rounded-l-lg">Name</th>
                              <th className="px-4 py-3">Phone</th>
                              <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {followUpLeads.map(lead => (
                              <tr key={lead.id}>
                                <td className="px-4 py-3 font-medium">{lead.name}</td>
                                <td className="px-4 py-3 text-gray-500">{lead.phone}</td>
                                <td className="px-4 py-3 text-right">
                                  <button onClick={() => handleOpenIVR(lead)} className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors" title="Call Student">
                                      <PhoneCall className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {followUpLeads.length === 0 && (
                              <tr>
                                <td colSpan={3} className="py-12 text-center text-gray-400">
                                  <div className="flex flex-col items-center">
                                    <CalendarOff className="h-10 w-10 mb-2 opacity-20" />
                                    <span>No records</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                   </div>

                   {/* Free Trial Table */}
                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[300px]">
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="text-lg font-bold text-slate-800">Free Trial</h3>
                         <div className="relative">
                            <input type="date" className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:border-secondary" defaultValue={today} />
                         </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[500px]">
                          <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                              <th className="px-4 py-3 rounded-l-lg">Name</th>
                              <th className="px-4 py-3">Phone</th>
                              <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                          </thead>
                           <tbody className="divide-y divide-gray-50">
                            {freeTrialLeads.map(lead => (
                              <tr key={lead.id}>
                                <td className="px-4 py-3 font-medium">{lead.name}</td>
                                <td className="px-4 py-3 text-gray-500">{lead.phone}</td>
                                <td className="px-4 py-3 text-right">
                                  <button onClick={() => handleOpenIVR(lead)} className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors" title="Call Student">
                                      <PhoneCall className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {freeTrialLeads.length === 0 && (
                              <tr>
                                <td colSpan={3} className="py-12 text-center text-gray-400">
                                  <div className="flex flex-col items-center">
                                    <CalendarOff className="h-10 w-10 mb-2 opacity-20" />
                                    <span>No records</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                   </div>
                </div>

              </div>
            )}

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
              <div className="animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Lead Management</h2>
                  
                  {/* Filters */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 justify-between items-center">
                     <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <input 
                            type="text" 
                            placeholder="Search phone or name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 w-full md:w-64"
                          />
                        </div>
                        <select 
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-white"
                        >
                          <option value="All">All Statuses</option>
                          <option value="New">New</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Free Trial">Free Trial</option>
                          <option value="Interested">Interested</option>
                          <option value="Closed Won">Closed Won</option>
                          <option value="Closed Lost">Closed Lost</option>
                          <option value="Others">Others</option>
                        </select>
                     </div>
                     <div className="flex gap-2 w-full lg:w-auto justify-end">
                        <button onClick={() => setIsLeadModalOpen(true)} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 flex items-center">
                          <Plus className="h-4 w-4 mr-2" /> Quick Lead
                        </button>
                        <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700">
                          Export
                        </button>
                     </div>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[900px]">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                          <th className="px-6 py-4">Owner</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Phone</th>
                          <th className="px-6 py-4">Source</th>
                          <th className="px-6 py-4">State</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 text-gray-600">{lead.owner}</td>
                            <td className="px-6 py-4 font-medium text-slate-800">{lead.name}</td>
                            <td className="px-6 py-4">
                              <select 
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border-none outline-none cursor-pointer
                                  ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' : 
                                    lead.status === 'Closed Won' ? 'bg-green-100 text-green-700' :
                                    lead.status === 'Follow Up' ? 'bg-cyan-100 text-cyan-700' :
                                    lead.status === 'Free Trial' ? 'bg-blue-50 text-blue-600' :
                                    lead.status === 'Closed Lost' ? 'bg-red-100 text-red-700' :
                                    'bg-purple-100 text-purple-700'}`}
                              >
                                  <option value="New">New</option>
                                  <option value="Follow Up">Follow Up</option>
                                  <option value="Free Trial">Free Trial</option>
                                  <option value="Interested">Interested</option>
                                  <option value="Closed Won">Closed Won</option>
                                  <option value="Closed Lost">Closed Lost</option>
                                  <option value="Others">Others</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                            <td className="px-6 py-4 text-gray-600">{lead.source}</td>
                            <td className="px-6 py-4 text-gray-600">{lead.state}</td>
                            <td className="px-6 py-4 text-right">
                               <div className="flex items-center justify-end space-x-2">
                                  <button onClick={() => handleOpenIVR(lead)} className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors" title="IVR Call">
                                      <PhoneCall className="h-4 w-4" />
                                  </button>
                                  <button onClick={() => deleteLead(lead.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50" title="Delete">
                                      <Trash2 className="h-4 w-4" />
                                  </button>
                               </div>
                            </td>
                          </tr>
                        ))}
                        {filteredLeads.length === 0 && (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                               No leads found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SALES TAB */}
            {activeTab === 'sales' && (
               <div className="animate-fade-in">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                     <h2 className="text-2xl font-bold text-slate-800">Sales History</h2>
                     
                     <div className="flex items-center gap-4">
                         <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                             {['All', 'Weekly', 'Monthly', 'Yearly'].map((filter) => (
                                 <button
                                     key={filter}
                                     onClick={() => setSalesFilter(filter as any)}
                                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                         salesFilter === filter 
                                         ? 'bg-slate-900 text-white shadow-sm' 
                                         : 'text-gray-600 hover:bg-gray-100'
                                     }`}
                                 >
                                     {filter}
                                 </button>
                             ))}
                         </div>

                         <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold whitespace-nowrap">
                           Total Revenue: ₹{filteredRevenue.toLocaleString()}
                         </div>
                     </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                     <table className="w-full text-left min-w-[700px]">
                       <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                         <tr>
                           <th className="px-6 py-4">Date</th>
                           <th className="px-6 py-4">Customer</th>
                           <th className="px-6 py-4">Course / Product</th>
                           <th className="px-6 py-4">Amount</th>
                           <th className="px-6 py-4">Method</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100 text-sm">
                         {filteredSalesData.map((sale) => (
                           <tr key={sale.id}>
                             <td className="px-6 py-4 text-gray-600">{sale.date}</td>
                             <td className="px-6 py-4 font-medium">{sale.customerName}</td>
                             <td className="px-6 py-4 text-gray-600">{sale.courseTitle}</td>
                             <td className="px-6 py-4 font-bold text-green-600">₹{sale.amount.toLocaleString()}</td>
                             <td className="px-6 py-4 text-gray-600">
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">{sale.paymentMethod}</span>
                             </td>
                           </tr>
                         ))}
                         {filteredSalesData.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    No sales found for this period.
                                </td>
                            </tr>
                         )}
                       </tbody>
                     </table>
                  </div>
               </div>
            )}

            {/* REPORTS TAB - COMING SOON */}
            {activeTab === 'reports' && (
              <div className="animate-fade-in flex flex-col items-center justify-center h-full py-20">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md border border-gray-100">
                   <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="h-10 w-10" />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800 mb-2">Reports Coming Soon</h2>
                   <p className="text-gray-500 mb-6">
                     We are building advanced analytics, revenue charts, and detailed reporting tools to help you track your business growth.
                   </p>
                   <div className="flex items-center justify-center text-xs font-semibold text-secondary bg-secondary/10 py-2 px-4 rounded-full w-fit mx-auto">
                      <Clock className="h-3 w-3 mr-1" /> Estimated Arrival: Q2 2024
                   </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB - COMING SOON */}
            {activeTab === 'settings' && (
              <div className="animate-fade-in flex flex-col items-center justify-center h-full py-20">
                 <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md border border-gray-100">
                   <div className="w-20 h-20 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Settings className="h-10 w-10" />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800 mb-2">Settings Coming Soon</h2>
                   <p className="text-gray-500 mb-6">
                     Advanced configuration options, team management, and role-based access control settings will be available shortly.
                   </p>
                   <div className="flex items-center justify-center text-xs font-semibold text-secondary bg-secondary/10 py-2 px-4 rounded-full w-fit mx-auto">
                      <Clock className="h-3 w-3 mr-1" /> Estimated Arrival: Q2 2024
                   </div>
                </div>
              </div>
            )}

            {/* COURSES TAB (Moved from old Admin home) */}
            {activeTab === 'courses' && (
               <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Course Management</h2>
                      <button onClick={() => handleOpenCourseModal()} className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors">
                          <Plus className="h-4 w-4 mr-2" /> Add New Course
                      </button>
                  </div>
                  {/* Course List */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <table className="w-full text-left min-w-[700px]">
                          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                              <tr>
                                  <th className="px-6 py-4">Course Name</th>
                                  <th className="px-6 py-4">Price</th>
                                  <th className="px-6 py-4">Category</th>
                                  <th className="px-6 py-4">Students</th>
                                  <th className="px-6 py-4 text-right">Actions</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-sm">
                              {courses.map(course => (
                                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-slate-800">{course.title}</td>
                                      <td className="px-6 py-4 font-medium">₹{course.price}</td>
                                      <td className="px-6 py-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-semibold">{course.category}</span></td>
                                      <td className="px-6 py-4 text-gray-500">{course.students}</td>
                                      <td className="px-6 py-4 text-right">
                                          <button onClick={() => handleOpenCourseModal(course)} className="text-blue-600 hover:text-blue-800 mr-3"><Edit2 className="h-4 w-4" /></button>
                                          <button onClick={() => deleteCourse(course.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
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
      </div>

      {/* LEAD MODAL */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add Quick Lead</h3>
                <button onClick={() => setIsLeadModalOpen(false)}><X className="h-5 w-5 text-gray-400" /></button>
              </div>
              <form onSubmit={handleAddLead} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input required type="text" className="w-full border p-2 rounded-lg" value={newLead.name || ''} onChange={e => setNewLead({...newLead, name: e.target.value})} placeholder="e.g. John Doe" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input required type="tel" className="w-full border p-2 rounded-lg" value={newLead.phone || ''} onChange={e => setNewLead({...newLead, phone: e.target.value})} placeholder="10-digit number" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Source</label>
                    <select className="w-full border p-2 rounded-lg bg-white" value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})}>
                      <option>Manual</option>
                      <option>Website</option>
                      <option>Referral</option>
                      <option>Social Media</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={newLead.state || ''} onChange={e => setNewLead({...newLead, state: e.target.value})} placeholder="e.g. Maharashtra" />
                 </div>
                 <button type="submit" className="w-full bg-secondary text-white py-2 rounded-lg font-bold hover:bg-green-700">Add Lead</button>
              </form>
           </div>
        </div>
      )}

      {/* IVR MODAL */}
      {ivrLead && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-0 overflow-hidden shadow-2xl animate-fade-in">
               {/* Header */}
               <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
                  <div>
                      <h3 className="text-lg font-bold flex items-center"><PhoneCall className="h-5 w-5 mr-2 text-secondary" /> Initiate IVR Call</h3>
                      <p className="text-slate-400 text-sm mt-1">Calling: {ivrLead.name}</p>
                      <p className="text-secondary font-mono text-sm">{ivrLead.phone}</p>
                  </div>
                  <button onClick={() => !isCalling && setIvrLead(null)} className="text-gray-400 hover:text-white" disabled={isCalling}>
                      <X className="h-5 w-5" />
                  </button>
               </div>
               
               {/* Body */}
               <div className="p-6">
                  {callStatus === 'idle' ? (
                      <>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select IVR Message Template</label>
                            <div className="space-y-2">
                                {IVR_TEMPLATES.map(template => (
                                    <div 
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-secondary bg-green-50 ring-1 ring-secondary' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-sm text-slate-800">{template.label}</span>
                                            <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-100">{template.duration}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-1">{template.script}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button 
                            onClick={handleInitiateCall}
                            className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center"
                        >
                            <PhoneCall className="h-5 w-5 mr-2" /> Connect Call
                        </button>
                      </>
                  ) : (
                      <div className="text-center py-4">
                          {callStatus === 'calling' && (
                              <div className="flex flex-col items-center justify-center py-4">
                                  <div className="relative">
                                      <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                                      <div className="relative w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                                          <PhoneCall className="h-8 w-8 animate-pulse" />
                                      </div>
                                  </div>
                                  <h3 className="text-xl font-bold text-slate-800 mt-6">Calling...</h3>
                                  <p className="text-gray-500 text-sm mt-1">Connecting to Student...</p>
                              </div>
                          )}
                          {callStatus === 'connected' && (
                              <div className="flex flex-col items-center justify-center py-4">
                                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                                      <Volume2 className="h-8 w-8 animate-pulse" />
                                  </div>
                                  <h3 className="text-xl font-bold text-slate-800">Connected</h3>
                                  <p className="text-green-600 font-medium text-sm mt-1 animate-pulse">
                                      Playing: {IVR_TEMPLATES.find(t => t.id === selectedTemplate)?.label}
                                  </p>
                              </div>
                          )}
                          {callStatus === 'completed' && (
                              <div className="flex flex-col items-center justify-center py-4">
                                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                      <CheckCircle2 className="h-10 w-10" />
                                  </div>
                                  <h3 className="text-xl font-bold text-slate-800">Call Completed</h3>
                                  <p className="text-gray-500 text-sm mt-1">IVR sequence finished successfully.</p>
                              </div>
                          )}
                      </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* COURSE MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-xl w-full max-w-2xl my-8 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{courseFormData.id ? 'Edit Course' : 'Create New Course'}</h2>
                    <button onClick={() => setIsCourseModalOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                <form onSubmit={handleCourseSubmit} className="p-6 overflow-y-auto flex-grow">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                            <input required type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none" value={courseFormData.title} onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input required type="number" className="w-full border border-gray-300 rounded-lg p-2" value={courseFormData.price} onChange={(e) => setCourseFormData({...courseFormData, price: Number(e.target.value)})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                                <input required type="number" className="w-full border border-gray-300 rounded-lg p-2" value={courseFormData.originalPrice} onChange={(e) => setCourseFormData({...courseFormData, originalPrice: Number(e.target.value)})} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select className="w-full border border-gray-300 rounded-lg p-2" value={courseFormData.category} onChange={(e) => setCourseFormData({...courseFormData, category: e.target.value as any})}>
                                <option value="Beginner">Beginner</option>
                                <option value="Technical Analysis">Technical Analysis</option>
                                <option value="Options">Options</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea required rows={3} className="w-full border border-gray-300 rounded-lg p-2" value={courseFormData.description} onChange={(e) => setCourseFormData({...courseFormData, description: e.target.value})}></textarea>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Curriculum Syllabus</label>
                                <button type="button" onClick={handleGenerateSyllabus} disabled={isGenerating || !courseFormData.title} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center hover:bg-purple-200 disabled:opacity-50">
                                    {isGenerating ? <Loader2 className="h-3 w-3 animate-spin mr-1"/> : <Wand2 className="h-3 w-3 mr-1"/>} Auto-Generate with AI
                                </button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {courseFormData.curriculum && courseFormData.curriculum.length > 0 ? (
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {courseFormData.curriculum.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                ) : <div className="text-center text-gray-400 text-sm py-4">No syllabus added yet.</div>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                        <button type="button" onClick={() => setIsCourseModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-green-700 font-medium">
                            {courseFormData.id ? 'Save Changes' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </Layout>
  );
};

export default Admin;