'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, Building, Users, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    fetchJobs();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedCategory, selectedType, selectedLocation]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      
      // PERBAIKAN 1: Cek apakah data benar-benar Array sebelum disimpan
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('Data dari API bukan array:', data);
        setJobs([]); // Set kosong jika error
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]); // Set kosong jika fetch gagal total
      setLoading(false);
    }
  };

  const filterJobs = () => {
    // Pastikan jobs adalah array sebelum di-filter
    let filtered = Array.isArray(jobs) ? jobs : [];

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    if (selectedLocation) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Kontrak',
      'remote': 'Remote',
    };
    return typeMap[type] || type;
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'technology': 'Teknologi',
      'design': 'Desain',
      'marketing': 'Marketing',
      'sales': 'Sales',
      'finance': 'Keuangan',
      'hr': 'SDM',
      'operations': 'Operasional',
    };
    return categoryMap[category] || category;
  };

  // PERBAIKAN 2: Pastikan jobs aman sebelum di-slice
  const featuredJobs = Array.isArray(jobs) ? jobs.slice(0, 6) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Pegawe</h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#jobs" className="text-gray-600 hover:text-gray-900 transition-colors">Lowongan</a>
              <a href="#categories" className="text-gray-600 hover:text-gray-900 transition-colors">Kategori</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">Tentang</a>
            </nav>

            <Link 
              href="/admin/login"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-transparent to-gray-900/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Platform Lowongan Kerja Terpercaya</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Temukan Karir
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Impian Anda
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Jembatan antara talenta berbakat dan perusahaan terkemuka. 
              Wujudkan karir yang Anda inginkan dengan ribuan kesempatan menanti.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {jobs.length > 0 ? jobs.length : '0'}
                </div>
                <div className="text-sm text-gray-600">Lowongan Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {new Set(jobs.map(job => job.company)).size > 0 ? new Set(jobs.map(job => job.company)).size : '0'}
                </div>
                <div className="text-sm text-gray-600">Perusahaan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Kandidat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
                <div className="text-sm text-gray-600">Tingkat Keberhasilan</div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Cari Lowongan Pekerjaan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari posisi atau perusahaan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-gray-200 focus:border-gray-900 focus:ring-gray-900 rounded-lg"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-gray-900 focus:ring-gray-900 rounded-lg">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-gray-900 focus:ring-gray-900 rounded-lg">
                    <SelectValue placeholder="Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  onClick={filterJobs}
                  className="h-12 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Cari
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {featuredJobs.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lowongan Terbaru</h2>
              <p className="text-lg text-gray-600">Peluang karir terbaik untuk Anda</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => (
                <Link key={job.id} href={`/job/${job.id}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-1">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
                      {job.imageUrl ? (
                        <img
                          src={job.imageUrl}
                          alt={job.company}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white">
                          {getCategoryLabel(job.category)}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-700 font-medium">{job.company}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {job.location}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                          {getTypeLabel(job.type)}
                        </div>
                        
                        {job.salary && (
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            {job.salary}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(job.createdAt).toLocaleDateString('id-ID')}
                        </div>
                        <div className="text-gray-900 font-medium text-sm group-hover:text-gray-700 transition-colors">
                          Lihat Detail →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="#jobs">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg">
                  Lihat Semua Lowongan
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* All Jobs Section */}
      <section id="jobs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Semua Lowongan</h2>
            <p className="text-lg text-gray-600">Temukan kesempatan yang sesuai dengan keahlian Anda</p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="text-gray-600">Memuat lowongan...</span>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
                <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Link key={job.id} href={`/job/${job.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-700 font-medium">{job.company}</p>
                        </div>
                        {job.imageUrl && (
                          <img
                            src={job.imageUrl}
                            alt={job.company}
                            className="w-12 h-12 rounded-lg object-cover ml-3"
                          />
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {job.location}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                          {getTypeLabel(job.type)}
                        </div>
                        
                        {job.salary && (
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            {job.salary}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryLabel(job.category)}
                        </Badge>
                        <div className="text-gray-900 font-medium text-sm group-hover:text-gray-700 transition-colors">
                          Detail →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategori Populer</h2>
            <p className="text-lg text-gray-600">Jelajahi berbagai bidang karir</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.filter(c => c.value !== 'all').map((category) => {
              const count = jobs.filter(job => job.category === category.value).length;
              const icons: { [key: string]: JSX.Element } = {
                'technology': <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Briefcase className="h-4 w-4 text-blue-600" /></div>,
                'design': <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"><Sparkles className="h-4 w-4 text-purple-600" /></div>,
                'marketing': <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"><TrendingUp className="h-4 w-4 text-green-600" /></div>,
                'sales': <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center"><Users className="h-4 w-4 text-orange-600" /></div>,
                'finance': <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center"><DollarSign className="h-4 w-4 text-yellow-600" /></div>,
                'hr': <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center"><Users className="h-4 w-4 text-pink-600" /></div>,
                'operations': <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center"><Building className="h-4 w-4 text-indigo-600" /></div>,
              };

              return (
                <button
                  key={category.value}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-3">
                    {icons[category.value] || <Building className="h-8 w-8 text-gray-400" />}
                    <span className="text-2xl font-bold text-gray-900">{count}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Lowongan tersedia</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Siap Memulai Karir Baru?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Bergabunglah dengan ribuan profesional yang telah menemukan pekerjaan impian mereka melalui Pegawe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl"
              onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Cari Lowongan Sekarang
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all duration-200"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pegawe</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Platform lowongan pekerjaan terpercaya yang menghubungkan talenta berbakat dengan perusahaan terkemuka di Indonesia.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <span className="text-gray-600 font-semibold text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <span className="text-gray-600 font-semibold text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <span className="text-gray-600 font-semibold text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Karir</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              © 2024 Pegawe. All rights reserved. Made with ❤️ in Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}