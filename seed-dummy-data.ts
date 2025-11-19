import { db } from '@/lib/db';

async function seedDummyData() {
  try {
    console.log('🌱 Seeding dummy data...');

    // Clear existing data
    await db.notification.deleteMany();
    await db.review.deleteMany();
    await db.bookmark.deleteMany();
    await db.application.deleteMany();
    await db.user.deleteMany();
    await db.job.deleteMany();

    // Create users
    const users = await Promise.all([
      db.user.create({
        data: {
          email: 'john.doe@example.com',
          name: 'John Doe',
          phone: '+62 812-3456-7890',
          skills: '["JavaScript", "React", "Node.js", "TypeScript"]',
          experience: '3 years as Frontend Developer at TechCorp',
          education: 'Bachelor of Computer Science, University of Indonesia',
        },
      }),
      db.user.create({
        data: {
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          phone: '+62 813-5678-9012',
          skills: '["UI/UX Design", "Figma", "Adobe XD", "Prototyping"]',
          experience: '2 years as UI/UX Designer at Creative Studio',
          education: 'Bachelor of Design, Bandung Institute of Technology',
        },
      }),
      db.user.create({
        data: {
          email: 'bob.johnson@example.com',
          name: 'Bob Johnson',
          phone: '+62 814-7890-1234',
          skills: '["Python", "Django", "PostgreSQL", "AWS"]',
          experience: '4 years as Backend Developer at StartupTech',
          education: 'Master of Computer Science, ITB',
        },
      }),
    ]);

    // Create jobs
    const jobs = await Promise.all([
      db.job.create({
        data: {
          title: 'Senior Frontend Developer',
          company: 'TechCorp Indonesia',
          location: 'Jakarta Selatan',
          type: 'full-time',
          salary: 'Rp 20.000.000 - 30.000.000',
          description: 'We are looking for an experienced Senior Frontend Developer to join our growing team. You will be responsible for developing and implementing user interfaces using React.js and modern web technologies.',
          requirements: '• 5+ years of experience in frontend development\n• Expert in React.js, Next.js, and TypeScript\n• Strong understanding of responsive design principles\n• Experience with state management (Redux, Zustand)\n• Proficient in Tailwind CSS and modern CSS',
          benefits: '• Competitive salary and performance bonuses\n• Health insurance for you and your family\n• Flexible working hours and remote work options\n• Professional development budget\n• Annual team building events',
          email: 'careers@techcorp.id',
          category: 'technology',
          imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          isActive: true,
        },
      }),
      db.job.create({
        data: {
          title: 'Product Designer',
          company: 'Creative Studio',
          location: 'Bandung',
          type: 'full-time',
          salary: 'Rp 15.000.000 - 22.000.000',
          description: 'Join our design team to create amazing user experiences for digital products. You will work closely with product managers and developers to bring ideas to life.',
          requirements: '• 3+ years of experience in product design\n• Proficient in Figma, Sketch, or Adobe XD\n• Strong portfolio demonstrating your design process\n• Understanding of user research and usability testing\n• Experience with design systems',
          benefits: '• Creative work environment\n• Latest design tools and equipment\n• Health and wellness benefits\n• Flexible vacation policy\n• Learning and development opportunities',
          email: 'jobs@creativestudio.id',
          category: 'design',
          imageUrl: 'https://images.unsplash.com/photo-1559028006-44a36f1157a1?w=400&h=300&fit=crop',
          isActive: true,
        },
      }),
      db.job.create({
        data: {
          title: 'Digital Marketing Manager',
          company: 'Growth Agency',
          location: 'Jakarta Pusat',
          type: 'full-time',
          salary: 'Rp 18.000.000 - 25.000.000',
          description: 'Lead our digital marketing efforts and help our clients achieve their business goals through innovative marketing strategies.',
          requirements: '• 5+ years in digital marketing\n• Experience with Google Ads, Facebook Ads, SEO/SEM\n• Strong analytical and data-driven mindset\n• Leadership experience\n• Excellent communication skills',
          benefits: '• Performance-based bonuses\n• Professional certifications support\n• Health insurance\n• Remote work flexibility\n• Team building activities',
          email: 'hr@growthagency.com',
          category: 'marketing',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          isActive: true,
        },
      }),
      db.job.create({
        data: {
          title: 'Full Stack Developer',
          company: 'StartupTech',
          location: 'Yogyakarta',
          type: 'remote',
          salary: 'Rp 25.000.000 - 35.000.000',
          description: 'Join our remote team to build innovative web applications. You will work on both frontend and backend development.',
          requirements: '• 4+ years of full stack development\n• Proficient in Node.js, React, and databases\n• Experience with cloud services (AWS/GCP)\n• Self-motivated and disciplined\n• Good communication skills',
          benefits: '• 100% remote work\n• Flexible working hours\n• Equipment allowance\n• Annual retreats\n• Stock options',
          applyUrl: 'https://startuptech.com/careers/fullstack',
          category: 'technology',
          imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
          isActive: true,
        },
      }),
    ]);

    // Create applications
    await Promise.all([
      db.application.create({
        data: {
          jobId: jobs[0].id,
          userId: users[0].id,
          status: 'pending',
          coverLetter: 'I am very interested in this Senior Frontend Developer position. With my 5 years of experience in React development, I believe I would be a great addition to your team.',
          resumeUrl: 'https://drive.google.com/file/d/1234567890',
        },
      }),
      db.application.create({
        data: {
          jobId: jobs[1].id,
          userId: users[1].id,
          status: 'reviewed',
          coverLetter: 'As a passionate designer with 3 years of experience, I am excited about the opportunity to work with your creative team.',
          resumeUrl: 'https://drive.google.com/file/d/0987654321',
        },
      }),
      db.application.create({
        data: {
          jobId: jobs[2].id,
          userId: users[2].id,
          status: 'accepted',
          coverLetter: 'My experience in digital marketing and leadership skills make me an ideal candidate for this position.',
          resumeUrl: 'https://drive.google.com/file/d/1122334455',
        },
      }),
    ]);

    // Create bookmarks
    await Promise.all([
      db.bookmark.create({
        data: {
          jobId: jobs[0].id,
          userId: users[0].id,
        },
      }),
      db.bookmark.create({
        data: {
          jobId: jobs[1].id,
          userId: users[1].id,
        },
      }),
      db.bookmark.create({
        data: {
          jobId: jobs[2].id,
          userId: users[2].id,
        },
      }),
    ]);

    // Create reviews
    await Promise.all([
      db.review.create({
        data: {
          jobId: jobs[0].id,
          userId: users[0].id,
          rating: 5,
          comment: 'Great company with excellent work culture and opportunities for growth.',
        },
      }),
      db.review.create({
        data: {
          jobId: jobs[1].id,
          userId: users[1].id,
          rating: 4,
          comment: 'Creative environment and supportive team. Highly recommended!',
        },
      }),
      db.review.create({
        data: {
          jobId: jobs[2].id,
          userId: users[2].id,
          rating: 4,
          comment: 'Good marketing strategies and professional team.',
        },
      }),
    ]);

    // Create notifications
    await Promise.all([
      db.notification.create({
        data: {
          title: 'New Job Application',
          message: `${users[0].name} has applied for Senior Frontend Developer position`,
          type: 'info',
          isRead: false,
        },
      }),
      db.notification.create({
        data: {
          title: 'Application Status Update',
          message: `${users[1].name}\'s application for Product Designer has been reviewed`,
          type: 'success',
          isRead: false,
        },
      }),
      db.notification.create({
        data: {
          title: 'New User Registration',
          message: `${users[2].name} has registered on the platform`,
          type: 'info',
          isRead: true,
        },
      }),
      db.notification.create({
        data: {
          title: 'System Alert',
          message: 'Database backup completed successfully',
          type: 'success',
          isRead: true,
        },
      }),
    ]);

    console.log('✅ Dummy data seeded successfully!');
    console.log(`📊 Created ${users.length} users`);
    console.log(`💼 Created ${jobs.length} jobs`);
    console.log(`📄 Created ${3} applications`);
    console.log(`🔖 Created ${3} bookmarks`);
    console.log(`⭐ Created ${3} reviews`);
    console.log(`🔔 Created ${4} notifications`);

  } catch (error) {
    console.error('❌ Error seeding dummy data:', error);
  }
}

seedDummyData();