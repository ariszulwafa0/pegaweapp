'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Bookmark, ExternalLink, MapPin, Briefcase, DollarSign, Building, Heart } from 'lucide-react';
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
  category: string;
  imageUrl?: string;
  createdAt: string;
}

interface BookmarkItem {
  id: string;
  createdAt: string;
  job: Job;
}

export default function Bookmarks() {
  const { isAuthenticated, user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    }
  }, [isAuthenticated]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setLoading(false);
    }
  };

  const toggleBookmark = async (jobId: string) => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });

      if (response.ok) {
        await fetchBookmarks();
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Diperlukan</h2>
          <p className="text-gray-600 mb-6">Silakan login untuk melihat bookmark Anda</p>
          <Link href="/profile">
            <Button className="bg-gray-900 hover:bg-gray-800">
              Login
            </Button>
          </Link>
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
              <Link href="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Beranda</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookmark Saya</h1>
          <p className="text-gray-600">Lowongan pekerjaan yang Anda simpan</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat bookmark...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Belum Ada Bookmark</h2>
            <p className="text-gray-600 mb-6">Anda belum menyimpan lowongan pekerjaan apa pun</p>
            <Link href="/">
              <Button className="bg-gray-900 hover:bg-gray-800">
                Cari Lowongan
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 relative">
                  {bookmark.job.imageUrl ? (
                    <img
                      src={bookmark.job.imageUrl}
                      alt={bookmark.job.company}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(bookmark.job.id)}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white text-red-600"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {bookmark.job.title}
                      </h3>
                      <p className="text-gray-700 font-medium">{bookmark.job.company}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {bookmark.job.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                      {getTypeLabel(bookmark.job.type)}
                    </div>
                    
                    {bookmark.job.salary && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                        {bookmark.job.salary}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryLabel(bookmark.job.category)}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        Disimpan {new Date(bookmark.createdAt).toLocaleDateString('id-ID')}
                      </span>
                      <Link href={`/job/${bookmark.job.id}`}>
                        <Button size="sm" className="text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Lihat
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}