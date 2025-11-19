'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Mail, 
  ExternalLink, 
  ArrowLeft,
  Building,
  Users,
  Share2,
  Heart,
  Calendar,
  Shield,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  requirements?: string;
  benefits?: string;
  email?: string;
  applyUrl?: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchJob();
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setJob(data);
      } else {
        console.error('Job not found');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job:', error);
      setLoading(false);
    }
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

  const handleApply = () => {
    if (job?.email) {
      window.location.href = `mailto:${job.email}?subject=Lamaran Pekerjaan - ${job.title}&body=Hormat ${job.company},%0D%0A%0D%0ASaya tertarik dengan lowongan pekerjaan ${job.title} yang ditawarkan. Berikut adalah data diri saya:%0D%0A%0D%0ANama:%0D%0ANo. Telepon:%0D%0AEmail:%0D%0A%0D%0ATerima kasih atas perhatian Anda.%0D%0A%0D%0ASalam,`;
    } else if (job?.applyUrl) {
      window.open(job.applyUrl, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `${job?.title} di ${job?.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would typically save to backend/localStorage
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="text-gray-600">Memuat detail lowongan...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Lowongan tidak ditemukan</h1>
            <p className="text-gray-600 mb-6">Maaf, lowongan yang Anda cari tidak tersedia atau telah dihapus.</p>
            <Button onClick={() => router.push('/')} className="bg-gray-900 hover:bg-gray-800">
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-gray-900 to-gray-700 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">P</span>
                </div>
                <span className="font-bold text-gray-900">Pegawe</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={`flex items-center ${isSaved ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
              >
                <Heart className={`h-4 w-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
                Simpan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Bagikan
              </Button>
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header Card */}
              <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 relative">
                  {job.imageUrl ? (
                    <img
                      src={job.imageUrl}
                      alt={job.company}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 mb-3">
                      {getCategoryLabel(job.category)}
                    </Badge>
                    <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                    <p className="text-xl text-white/90">{job.company}</p>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Lokasi</p>
                        <p className="font-medium text-gray-900">{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tipe Pekerjaan</p>
                        <p className="font-medium text-gray-900">{getTypeLabel(job.type)}</p>
                      </div>
                    </div>
                    
                    {job.salary && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rentang Gaji</p>
                          <p className="font-medium text-gray-900">{job.salary}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Diposting</p>
                        <p className="font-medium text-gray-900">
                          {new Date(job.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description Card */}
              <Card className="border-0 shadow-xl bg-white rounded-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    </div>
                    Deskripsi Pekerjaan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements Card */}
              {job.requirements && (
                <Card className="border-0 shadow-xl bg-white rounded-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      Persyaratan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.requirements}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits Card */}
              {job.benefits && (
                <Card className="border-0 shadow-xl bg-white rounded-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-purple-600" />
                      </div>
                      Keuntungan & Benefit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.benefits}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="border-0 shadow-xl bg-white rounded-2xl sticky top-24">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Lamar Pekerjaan Ini
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleApply}
                    className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                    size="lg"
                  >
                    {job.email ? (
                      <>
                        <Mail className="h-5 w-5 mr-2" />
                        Lamar via Email
                      </>
                    ) : job.applyUrl ? (
                      <>
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Lamar di Website
                      </>
                    ) : (
                      'Hubungi Perusahaan'
                    )}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    {job.email && (
                      <p>Email: <span className="font-medium">{job.email}</span></p>
                    )}
                    {job.applyUrl && (
                      <p className="mt-1">Link akan membuka tab baru</p>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        <span>Aman & Terpercaya</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>1000+ Pelamar</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info Card */}
              <Card className="border-0 shadow-xl bg-white rounded-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Informasi Perusahaan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Perusahaan</p>
                        <p className="font-medium text-gray-900">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Lokasi</p>
                        <p className="font-medium text-gray-900">{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tipe</p>
                        <p className="font-medium text-gray-900">{getTypeLabel(job.type)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-xl bg-white rounded-2xl">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={handleSave}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current text-red-600' : ''}`} />
                      {isSaved ? 'Ditersimpan' : 'Simpan Lowongan'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Bagikan Lowongan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lowongan Serupa</h2>
            <p className="text-gray-600">Temukan kesempatan lain yang mungkin Anda sukai</p>
          </div>
          
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">Lowongan serupa akan segera tersedia</p>
              <Button onClick={() => router.push('/')} className="bg-gray-900 hover:bg-gray-800">
                Lihat Semua Lowongan
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}