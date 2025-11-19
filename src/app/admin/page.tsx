'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sun, Moon, Bell, Settings, User, LogOut, Menu, Search, 
  Filter, Plus, Download, Mail, Users, Briefcase, FileText, 
  BarChart3, Calendar, ChevronDown, Eye, EyeOff, Edit, Trash2, 
  CheckCircle, AlertCircle, TrendingUp, Activity, PieChart, X, 
  Save, Building, MapPin 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// --- INTERFACES ---
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements?: string;
  benefits?: string;
  email?: string;
  applyUrl?: string;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Application {
  id: string;
  status: string;
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
  job: Job;
  user: { name?: string; email: string; };
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: string;
}

// --- MAIN COMPONENT ---
export default function AdminDashboard() {
  const isAuthenticated = true; 
  const router = useRouter();
  
  const logout = () => {
    router.push('/admin/login');
  };

  // --- STATE ---
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  
  const [jobsLoading, setJobsLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const initialFormState = {
    title: '', company: '', location: '', type: 'full-time', salary: '', 
    description: '', requirements: '', benefits: '', email: '', 
    applyUrl: '', category: 'technology', imageUrl: '', isActive: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'technology', label: 'Teknologi' },
    { value: 'design', label: 'Desain' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'finance', label: 'Keuangan' },
    { value: 'hr', label: 'SDM' },
    { value: 'operations', label: 'Operasional' },
  ];

  const jobTypes = [
    { value: 'all', label: 'Semua Tipe' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Kontrak' },
    { value: 'remote', label: 'Remote' },
  ];

  // --- EFFECTS ---
  useEffect(() => {
    if (!isAuthenticated) router.push('/admin/login');
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
      fetchApplications();
      fetchUsers();
      fetchNotifications();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedCategory, selectedType, selectedLocation]);

  // --- API CALLS ---
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
      setJobsLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobsLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const mockApplications: Application[] = [{
        id: '1', status: 'pending', coverLetter: 'Tertarik...', resumeUrl: '#',
        createdAt: '2024-01-15T10:00:00Z',
        job: {
          id: '1', title: 'Frontend Dev', company: 'TechCorp', location: 'JKT',
          type: 'full-time', category: 'technology', isActive: true,
          createdAt: '2024-01-10', updatedAt: '2024-01-10', description: ''
        },
        user: { name: 'Budi', email: 'budi@test.com' }
      }];
      setApplications(mockApplications);
      setApplicationsLoading(false);
    } catch (error) {
      console.error(error);
      setApplicationsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const mockUsers: UserData[] = [{
        id: '1', email: 'user@test.com', name: 'User 1', phone: '081',
        createdAt: '2024-01-01'
      }];
      setUsers(mockUsers);
      setUsersLoading(false);
    } catch (error) {
      console.error(error);
      setUsersLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) setNotifications(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  // --- LOGIC ---
  const filterJobs = () => {
    let filtered = Array.isArray(jobs) ? jobs : [];
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') filtered = filtered.filter(j => j.category === selectedCategory);
    if (selectedType !== 'all') filtered = filtered.filter(j => j.type === selectedType);
    if (selectedLocation) filtered = filtered.filter(j => j.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    setFilteredJobs(filtered);
  };

  const resetForm = () => setFormData(initialFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingJob ? `/api/jobs/${editingJob.id}` : '/api/jobs';
      const method = editingJob ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchJobs();
        setShowForm(false);
        setEditingJob(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title, company: job.company, location: job.location,
      type: job.type, salary: job.salary || '', description: job.description,
      requirements: job.requirements || '', benefits: job.benefits || '',
      email: job.email || '', applyUrl: job.applyUrl || '',
      category: job.category, imageUrl: job.imageUrl || '', isActive: job.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus lowongan ini?')) {
      try {
        const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
        if (response.ok) await fetchJobs();
      } catch (error) { console.error(error); }
    }
  };

  const toggleJobStatus = async (job: Job) => {
    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !job.isActive }),
      });
      if (response.ok) await fetchJobs();
    } catch (error) {
      console.error('Error toggling:', error);
    }
  }; 

  // --- RENDER START ---
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex transition-colors duration-300`}>
      
      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
        <div className={`h-16 flex items-center justify-between px-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {sidebarOpen ? (
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Panel</span>
          ) : (
            <span className="mx-auto text-xl font-bold">AP</span>
          )}
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          <Button variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} className={`w-full justify-start ${!sidebarOpen ? 'px-2' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <BarChart3 className="h-5 w-5" /> {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Button>
          <Button variant={activeTab === 'jobs' ? 'secondary' : 'ghost'} className={`w-full justify-start ${!sidebarOpen ? 'px-2' : ''}`} onClick={() => setActiveTab('jobs')}>
            <Briefcase className="h-5 w-5" /> {sidebarOpen && <span className="ml-3">Lowongan</span>}
          </Button>
          <Button variant={activeTab === 'applications' ? 'secondary' : 'ghost'} className={`w-full justify-start ${!sidebarOpen ? 'px-2' : ''}`} onClick={() => setActiveTab('applications')}>
            <FileText className="h-5 w-5" /> {sidebarOpen && <span className="ml-3">Aplikasi</span>}
          </Button>
          <Button variant={activeTab === 'users' ? 'secondary' : 'ghost'} className={`w-full justify-start ${!sidebarOpen ? 'px-2' : ''}`} onClick={() => setActiveTab('users')}>
            <Users className="h-5 w-5" /> {sidebarOpen && <span className="ml-3">Pengguna</span>}
          </Button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button variant="ghost" onClick={logout} className="w-full justify-start text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5" /> {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* CONTENT */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <header className={`sticky top-0 z-20 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'jobs' ? 'Manajemen Lowongan' : activeTab === 'applications' ? 'Aplikasi' : 'Pengguna'}
            </h2>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'dashboard' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                 <CardContent className="p-6 flex justify-between items-center">
                   <div><p className="text-sm font-medium text-gray-500">Total Lowongan</p><p className="text-3xl font-bold">{jobs.length}</p></div>
                   <Briefcase className="h-8 w-8 text-blue-500" />
                 </CardContent>
               </Card>
               <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                 <CardContent className="p-6 flex justify-between items-center">
                   <div><p className="text-sm font-medium text-gray-500">Total Aplikasi</p><p className="text-3xl font-bold">{applications.length}</p></div>
                   <FileText className="h-8 w-8 text-green-500" />
                 </CardContent>
               </Card>
               <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                 <CardContent className="p-6 flex justify-between items-center">
                   <div><p className="text-sm font-medium text-gray-500">User Terdaftar</p><p className="text-3xl font-bold">{users.length}</p></div>
                   <Users className="h-8 w-8 text-purple-500" />
                 </CardContent>
               </Card>
             </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <Input placeholder="Cari..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={darkMode ? 'bg-gray-700' : ''} />
                <Button onClick={() => { resetForm(); setEditingJob(null); setShowForm(true); }}><Plus className="mr-2 h-4 w-4"/> Tambah</Button>
              </div>
              <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Judul</th>
                        <th className="p-4 text-left">Perusahaan</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobs.map(job => (
                        <tr key={job.id} className="border-b">
                          <td className="p-4">{job.title}</td>
                          <td className="p-4">{job.company}</td>
                          <td className="p-4"><Badge variant={job.isActive ? 'default' : 'destructive'}>{job.isActive ? 'Aktif' : 'Non'}</Badge></td>
                          <td className="p-4 flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(job)}><Edit className="h-4 w-4"/></Button>
                            <Button variant="ghost" size="sm" onClick={() => toggleJobStatus(job)}>{job.isActive ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)}><Trash2 className="h-4 w-4 text-red-500"/></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>

        {/* MODAL FORM - VERSI LENGKAP (Email, Salary, dll ada) */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6`}>
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingJob ? 'Edit' : 'Tambah'} Lowongan</h2>
                <Button variant="ghost" onClick={() => setShowForm(false)}><X/></Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Judul Pekerjaan</Label>
                    <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Perusahaan</Label>
                    <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Lokasi</Label>
                    <Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Gaji</Label>
                    <Input value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} placeholder="Contoh: 10 Juta" />
                  </div>
                  <div>
                    <Label>Email Pelamar</Label>
                    <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="hrd@company.com" />
                  </div>
                  <div>
                    <Label>Link Apply (Opsional)</Label>
                    <Input value={formData.applyUrl} onChange={e => setFormData({...formData, applyUrl: e.target.value})} />
                  </div>
                  <div>
                    <Label>Tipe</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {jobTypes.filter(t => t.value !== 'all').map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </div>
                   <div>
                    <Label>Kategori</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {categories.filter(c => c.value !== 'all').map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Link Gambar (Unsplash)</Label>
                    <Input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                  </div>
                </div>
                
                <div>
                    <Label>Deskripsi Pekerjaan</Label>
                    <Textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                </div>
                <div>
                    <Label>Persyaratan (Requirements)</Label>
                    <Textarea rows={3} value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} />
                </div>
                <div>
                    <Label>Benefit</Label>
                    <Textarea rows={2} value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch id="active" checked={formData.isActive} onCheckedChange={c => setFormData({...formData, isActive: c})} />
                    <Label htmlFor="active">Lowongan Aktif</Label>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
                  <Button type="submit">Simpan</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}