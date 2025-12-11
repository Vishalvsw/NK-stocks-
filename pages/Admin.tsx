import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { generateCourseSyllabus } from '../services/geminiService';
import { Plus, Trash2, Edit2, Wand2, Loader2, BookOpen, Users } from 'lucide-react';

const Admin = () => {
  const { courses, addCourse, deleteCourse, updateCourse } = useApp();
  const [activeTab, setActiveTab] = useState<'courses' | 'students'>('courses');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: 'Beginner',
    curriculum: [],
    instructor: 'Rajesh Kumar' // Default
  });

  const handleOpenModal = (course?: Course) => {
    if (course) {
      setFormData(course);
    } else {
      setFormData({
        title: '',
        description: '',
        price: 0,
        originalPrice: 0,
        category: 'Beginner',
        curriculum: [],
        instructor: 'Rajesh Kumar'
      });
    }
    setIsModalOpen(true);
  };

  const handleGenerateSyllabus = async () => {
    if (!formData.title) {
        alert("Please enter a course title first");
        return;
    }
    setIsGenerating(true);
    try {
        const syllabus = await generateCourseSyllabus(formData.title);
        setFormData(prev => ({ ...prev, curriculum: syllabus }));
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      updateCourse(formData as Course);
    } else {
      addCourse({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        image: 'https://picsum.photos/800/600',
        rating: 0,
        students: 0,
        features: ['Certificate', 'Lifetime Access']
      } as Course);
    }
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen">
        <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <div className="flex space-x-6 mt-6">
                    <button 
                        onClick={() => setActiveTab('courses')}
                        className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${activeTab === 'courses' ? 'border-secondary text-secondary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Manage Courses
                    </button>
                    <button 
                        onClick={() => setActiveTab('students')}
                        className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${activeTab === 'students' ? 'border-secondary text-secondary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Students & Payments
                    </button>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            {activeTab === 'courses' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">All Courses ({courses.length})</h2>
                        <button onClick={() => handleOpenModal()} className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors">
                            <Plus className="h-4 w-4 mr-2" /> Add New Course
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Course Name</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Students</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {courses.map(course => (
                                        <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 bg-slate-200 rounded-lg mr-3 overflow-hidden">
                                                        <img src={course.image} alt="" className="h-full w-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-800">{course.title}</div>
                                                        <div className="text-xs text-gray-500">{course.curriculum.length} Modules</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">₹{course.price}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-semibold">{course.category}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{course.students}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleOpenModal(course)} className="text-blue-600 hover:text-blue-800 mr-3"><Edit2 className="h-4 w-4" /></button>
                                                <button onClick={() => deleteCourse(course.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'students' && (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Student Database</h3>
                    <p className="text-gray-500 mb-6">View registered students and payment history.</p>
                    <div className="inline-block bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg text-sm border border-yellow-200">
                        Demo Mode: Real student data is hidden for privacy.
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-xl w-full max-w-2xl my-8 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{formData.id ? 'Edit Course' : 'Create New Course'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                            <input 
                                required
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="e.g. Advanced Option Greeks"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input 
                                    required
                                    type="number" 
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                                <input 
                                    required
                                    type="number" 
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none"
                                    value={formData.originalPrice}
                                    onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select 
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Technical Analysis">Technical Analysis</option>
                                <option value="Options">Options</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea 
                                required
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Curriculum Syllabus</label>
                                <button 
                                    type="button"
                                    onClick={handleGenerateSyllabus}
                                    disabled={isGenerating || !formData.title}
                                    className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center hover:bg-purple-200 disabled:opacity-50"
                                >
                                    {isGenerating ? <Loader2 className="h-3 w-3 animate-spin mr-1"/> : <Wand2 className="h-3 w-3 mr-1"/>}
                                    Auto-Generate with AI
                                </button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {formData.curriculum && formData.curriculum.length > 0 ? (
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {formData.curriculum.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center text-gray-400 text-sm py-4">
                                        No syllabus added yet. Click "Auto-Generate" or add manually.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-green-700 font-medium">
                            {formData.id ? 'Save Changes' : 'Create Course'}
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