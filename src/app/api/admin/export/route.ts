import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { format } = await request.json();
    
    // Get user from token
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const username = decoded.split(':')[0];

    if (username !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Fetch all active jobs
    const jobs = await db.job.findMany({
      where: { isActive: true },
      include: {
        applications: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        bookmarks: true,
        reviews: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format data based on requested format
    let csvContent = '';
    let filename = '';

    if (format === 'jobs') {
      // Jobs CSV
      csvContent = 'ID,Title,Company,Location,Type,Salary,Category,Created At,Active\n';
      csvContent += jobs.map(job => 
        `${job.id},"${job.title}","${job.company}","${job.location}","${job.type}","${job.salary || ''}","${job.category}","${job.createdAt}",${job.isActive}`
      ).join('\n');

      filename = `jobs_export_${new Date().toISOString().split('T')[0]}.csv`;
    } else if (format === 'applications') {
      // Applications CSV
      const allApplications = jobs.flatMap(job => job.applications);
      csvContent = 'Application ID,Job Title,Company,Applicant Name,Applicant Email,Status,Cover Letter,Resume URL,Applied At\n';
      csvContent += allApplications.map(app => 
        `${app.id},"${app.job.title}","${app.job.company}","${app.user.name || 'Anonymous'}","${app.user.email}","${app.status}","${app.coverLetter || ''}","${app.resumeUrl || ''}","${app.createdAt}"`
      ).join('\n');

      filename = `applications_export_${new Date().toISOString().split('T')[0]}.csv`;
    } else if (format === 'users') {
      // Users CSV
      const allUsers = jobs.flatMap(job => job.applications.map(app => app.user));
      const uniqueUsers = allUsers.filter((user, index, self) =>
        index === allUsers.findIndex(u => u.email === user.email)
      );
      
      csvContent = 'Name,Email,Phone,Created At\n';
      csvContent += uniqueUsers.map(user => 
        `${user.name || ''},"${user.email}","${user.phone || ''}","${user.createdAt}"`
      ).join('\n');

      filename = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    }

    const response = new NextResponse(csvContent);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    
    return response;
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}