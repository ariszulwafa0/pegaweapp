import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { type, recipients, subject, message } = await request.json();
    
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

    let emails = [];
    
    if (type === 'all') {
      // Get all users
      const applications = await db.application.findMany({
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });
      
      emails = [...new Set(applications.map(app => app.user.email))];
    } else if (type === 'applicants') {
      // Get only applicants
      const applications = await db.application.findMany({
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });
      
      emails = applications.map(app => app.user.email);
    } else if (type === 'custom') {
      emails = recipients;
    }

    // Create notification
    await db.notification.create({
      data: {
        title: 'Email Notification Sent',
        message: `Email sent to ${emails.length} recipients`,
        type: 'success',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Email sent successfully to ${emails.length} recipients`,
      count: emails.length,
    });
  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send email notification' },
      { status: 500 }
    );
  }
}