'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Send, 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  category: string;
}

interface Application {
  id: string;
  status: string;
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
  job: Job;
}

export default function ApplyJob() {
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeUrl: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get job from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('jobId');
    
    if (jobId) {
      fetchJob(jobId);
    }
    fetchApplications();
  }, []);

  const fetchJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setJob(data);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: job.id,
          coverLetter: formData.coverLetter,
          resumeUrl: formData.resumeUrl,
        }),
      });

      if (response.ok) {
        setMessage('Application submitted successfully!');
        setFormData({ coverLetter: '', resumeUrl: '' });
        await fetchApplications();
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to submit application');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'reviewed':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Review';
      case 'reviewed':
        return 'Sedang Direview';
      case 'accepted':
        return 'Diterima';
      case 'rejected':
        return 'Ditolak';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Diperlukan</h2>
          <p className="text-gray-600 mb-6">Silakan login untuk melamar pekerjaan</p>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Form */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Lamar Pekerjaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {job ? (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                ) : (
                  <Alert className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Pilih lowongan dari <Link href="/" className="text-blue-600 hover:underline">halaman utama</Link> untuk melamar
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Ceritakan mengapa Anda cocok untuk posisi ini..."
                      rows={6}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="resumeUrl">URL CV/Resume</Label>
                    <Input
                      id="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                      placeholder="https://drive.google.com/your-cv"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload CV Anda ke Google Drive atau layanan cloud lainnya, lalu masukkan URL-nya
                    </p>
                  </div>

                  {message && (
                    <Alert className={message.includes('success') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={!job || submitting}
                    className="w-full bg-gray-900 hover:bg-gray-800"
                  >
                    {submitting ? 'Mengirim...' : 'Kirim Lamaran'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Application History */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Riwayat Lamaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Memuat riwayat...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Belum ada riwayat lamaran</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{application.job.title}</h4>
                            <p className="text-sm text-gray-600">{application.job.company}</p>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            <div className="flex items-center">
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{getStatusLabel(application.status)}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Dilamar pada {new Date(application.createdAt).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}