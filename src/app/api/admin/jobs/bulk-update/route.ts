import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { jobIds, category, type, location, isActive } = await request.json();
    
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

    // Build where clause
    let whereClause: any = {};
    
    if (jobIds && jobIds.length > 0) {
      whereClause.id = { in: jobIds };
    } else {
      if (category && category !== 'all') {
        whereClause.category = category;
      }
      if (type && type !== 'all') {
        whereClause.type = type;
      }
      if (location) {
        whereClause.location = { contains: location, mode: 'insensitive' };
      }
      if (isActive !== undefined) {
        whereClause.isActive = isActive;
      }
    }

    // Update jobs
    const result = await db.job.updateMany({
      where: whereClause,
      data: {
        ...(isActive !== undefined && { isActive }),
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        title: 'Bulk Update Jobs',
        message: `Successfully updated ${result.count} jobs`,
        type: 'success',
      },
    });

    return NextResponse.json({ 
      success: true,
      updatedCount: result.count,
      message: `Successfully updated ${result.count} jobs`
    });
  } catch (error) {
    console.error('Error bulk updating jobs:', error);
    return NextResponse.json(
      { error: 'Failed to update jobs' },
      { status: 500 }
    );
  }
}