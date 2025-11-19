'use client';

import { useState } from 'react';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  Heart,
  Award,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Building,
  Briefcase // <--- PERBAIKAN: Icon ini ditambahkan
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function About() {
  const [stats] = useState([
    { label: 'Lowongan Aktif', value: '500+', icon: Briefcase },
    { label: 'Perusahaan Partner', value: '200+', icon: Building },
    { label: 'Pencari Kerja', value: '50,000+', icon: Users },
    { label: 'Tingkat Keberhasilan', value: '95%', icon: TrendingUp },
  ]);

  const values = [
    {
      icon: Shield,
      title: 'Kepercayaan',
      description: 'Kami memastikan setiap lowongan terverifikasi dan aman untuk pencari kerja.'
    },
    {
      icon: Target,
      title: 'Fokus pada Tujuan',
      description: 'Menghubungkan talenta yang tepat dengan kesempatan karir yang sesuai.'
    },
    {
      icon: Lightbulb,
      title: 'Inovasi',
      description: 'Terus berinovasi untuk memberikan pengalaman terbaik dalam pencarian kerja.'
    },
    {
      icon: Heart,
      title: 'Peduli',
      description: 'Mendukung perjalanan karir setiap individu dengan perhatian penuh.'
    },
  ];

  const features = [
    {
      title: 'Smart Matching',
      description: 'AI-powered recommendation system yang menemukan lowongan paling cocok untuk Anda.',
      icon: BarChart3,
    },
    {
      title: 'Easy Apply',
      description: 'Proses lamar yang simpel dengan satu klik untuk multiple applications.',
      icon: CheckCircle,
    },
    {
      title: 'Real-time Updates',
      description: 'Notifikasi instan untuk setiap update status lamaran Anda.',
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Pegawe</h1>
            </Link>
            <Link href="/">
              <Button variant="outline">Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <Award className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Platform #1 di Indonesia</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Menghubungkan
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
              Talenta dengan Kesempatan
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Pegawe adalah platform lowongan kerja terkemuka di Indonesia yang menghubungkan 
            profesional berbakat dengan perusahaan terbaik. Kami percaya bahwa setiap individu 
            layak mendapatkan kesempatan karir yang tepat.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Misi Kami
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Mempermudah proses pencarian dan rekrutmen kerja di Indonesia melalui teknologi 
                yang inovatif dan user experience yang excellent.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Kami berkomitmen untuk menciptakan ekosistem kerja yang lebih transparan, efisien, 
                dan inklusif bagi semua pihak - pencari kerja, perusahaan, dan komunitas.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Mengurangi pengangguran di Indonesia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Meningkatkan kualitas matching talenta</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Mendukung pertumbuhan karir profesional</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">50,000+</h3>
                <p className="text-gray-600 text-sm">Pencari Kerja Aktif</p>
              </Card>
              
              <Card className="border-0 shadow-lg bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">200+</h3>
                <p className="text-gray-600 text-sm">Perusahaan Partner</p>
              </Card>
              
              <Card className="border-0 shadow-lg bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">95%</h3>
                <p className="text-gray-600 text-sm">Tingkat Keberhasilan</p>
              </Card>
              
              <Card className="border-0 shadow-lg bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">30+</h3>
                <p className="text-gray-600 text-sm">Kota Tercover</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg text-gray-600">Prinsip yang memandu setiap langkah kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Pegawe?</h2>
            <p className="text-lg text-gray-600">Fitur unggulan yang membedakan kami dari yang lain</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Siap Memulai Perjalanan Karir Anda?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Bergabunglah dengan ribuan profesional yang telah menemukan pekerjaan impian mereka melalui Pegawe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl"
              >
                Cari Lowongan Sekarang
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all duration-200"
              >
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Kami</h2>
            <p className="text-lg text-gray-600">Orang-orang hebat di balik kesuksesan Pegawe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'John Doe', role: 'CEO & Founder', description: 'Visioner dengan 15+ tahun experience di tech industry' },
              { name: 'Jane Smith', role: 'CTO', description: 'Tech lead yang passionate tentang user experience' },
              { name: 'Bob Johnson', role: 'Head of Operations', description: 'Expert dalam scaling dan operational excellence' },
              { name: 'Alice Brown', role: 'Head of People', description: 'HR professional dengan fokus pada talent development' },
            ].map((member, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white rounded-xl p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
