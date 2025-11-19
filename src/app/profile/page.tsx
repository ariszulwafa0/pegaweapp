'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { User, Mail, Phone, Briefcase, BookOpen, Award, LogOut, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Profile() {
  const { isAuthenticated, user, loading, login, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skills: '',
    experience: '',
    education: '',
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        skills: user.skills || '',
        experience: user.experience || '',
        education: user.education || '',
      });
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(loginForm.email, loginForm.name, loginForm.phone);
    if (result.success) {
      setShowLogin(false);
      setLoginForm({ email: '', name: '', phone: '' });
    } else {
      alert(result.error);
    }
  };

  const handleSaveProfile = async () => {
    // Here you would typically update the user profile
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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

        {/* Login Section */}
        <div className="max-w-md mx-auto mt-20 p-6">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Masuk ke Akun Anda
              </CardTitle>
              <p className="text-gray-600">
                Login untuk mengakses profile dan melamar pekerjaan
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="email@example.com"
                    required
                    className="h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={loginForm.phone}
                    onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                    placeholder="+62 812-3456-7890"
                    className="h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gray-900 hover:bg-gray-800"
                >
                  Masuk
                </Button>
              </form>
              <div className="text-center mt-6">
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  ← Kembali ke Beranda
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              <Link href="/bookmarks">
                <Button variant="outline">Bookmark Saya</Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-gray-900">
                  <AvatarFallback className="text-2xl text-white">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user?.name || 'User'}
                </h2>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                {user?.phone && (
                  <div className="flex items-center justify-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.phone}
                  </div>
                )}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-around text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">0</div>
                      <div className="text-sm text-gray-600">Lamaran</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">0</div>
                      <div className="text-sm text-gray-600">Bookmark</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informasi Pribadi
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} className="bg-gray-900 hover:bg-gray-800">
                        <Save className="h-4 w-4 mr-2" />
                        Simpan
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Batal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="text-gray-700">{user?.email}</span>
                    </div>
                    {user?.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-gray-400" />
                        <span className="text-gray-700">{user.phone}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Informasi Profesional
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skills">Keahlian</Label>
                      <Textarea
                        id="skills"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="JavaScript, React, Node.js, dll."
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Pengalaman</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="Deskripsi pengalaman kerja Anda"
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="education">Pendidikan</Label>
                      <Textarea
                        id="education"
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                        placeholder="Riwayat pendidikan Anda"
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user?.skills && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Keahlian</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.split(',').map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {user?.experience && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Pengalaman</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">{user.experience}</p>
                      </div>
                    )}
                    {user?.education && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Pendidikan</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">{user.education}</p>
                      </div>
                    )}
                    {!user?.skills && !user?.experience && !user?.education && (
                      <p className="text-gray-500 text-center py-8">
                        Belum ada informasi profesional. Klik tombol edit untuk menambahkan.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/bookmarks">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Lihat Bookmark
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Riwayat Lamaran
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}