/**
 * Seed Script — Development only
 * Creates demo admin, demo users, sample items, and sample claims.
 *
 * Run: node seed.js
 * WARNING: This will clear existing items and claims before seeding.
 */

require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME   = 'lostfoundplus';

const CATEGORIES = [
  'Electronics', 'Accessories', 'Clothing', 'Bags', 'Books',
  'Keys', 'Documents', 'Wallet', 'Jewellery', 'Sports', 'Other',
];

async function seed() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  console.log('✅ Connected to MongoDB');

  // ── Clear existing seed data ───────────────────────────────────────────────
  await db.collection('items').deleteMany({});
  await db.collection('claims').deleteMany({});
  console.log('🗑️  Cleared items and claims');

  // ── Create Admin ───────────────────────────────────────────────────────────
  const adminEmail = 'admin@lostfound.dev';
  const existingAdmin = await db.collection('users').findOne({ email: adminEmail });

  let adminId;
  if (!existingAdmin) {
    const hashedPw = await bcrypt.hash('Admin@1234', 12);
    const result = await db.collection('users').insertOne({
      name:      'Platform Admin',
      email:     adminEmail,
      password:  hashedPw,
      role:      'admin',
      phone:     null,
      avatar:    null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    adminId = result.insertedId;
    console.log('👤 Admin created — admin@lostfound.dev / Admin@1234');
  } else {
    adminId = existingAdmin._id;
    console.log('👤 Admin already exists — skipping');
  }

  // ── Create Demo Users ──────────────────────────────────────────────────────
  const demoUsers = [
    { name: 'Alice Johnson', email: 'alice@example.com', phone: '+919876543210' },
    { name: 'Bob Smith',     email: 'bob@example.com',   phone: '+919876543211' },
    { name: 'Charlie Brown', email: 'charlie@example.com', phone: null },
  ];

  const userIds = [];
  for (const u of demoUsers) {
    const existing = await db.collection('users').findOne({ email: u.email });
    if (!existing) {
      const hashedPw = await bcrypt.hash('User@1234', 12);
      const result = await db.collection('users').insertOne({
        name:      u.name,
        email:     u.email,
        password:  hashedPw,
        role:      'user',
        phone:     u.phone,
        avatar:    null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      userIds.push(result.insertedId);
    } else {
      userIds.push(existing._id);
    }
  }
  console.log('👥 Demo users ready — password for all: User@1234');

  // ── Sample Items ───────────────────────────────────────────────────────────
  const now = new Date();

  const itemDocs = [
    // LOST items
    {
      title: 'Black Leather Wallet',
      type: 'lost', category: 'Wallet', status: 'approved',
      description: 'Black leather bifold wallet with student ID and cash inside. Has a small tear on the corner.',
      location: 'College Canteen', date: new Date('2026-09-22'),
      brand: 'Wildcraft', color: 'Black', image: '/demo-images/wallet.jpg',
      reportedBy: userIds[0], reporterName: 'Alice Johnson',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'Apple AirPods Pro',
      type: 'lost', category: 'Electronics', status: 'approved',
      description: 'White AirPods Pro with charging case. Case has a small scratch.',
      location: 'Library Reading Room', date: new Date('2026-09-21'),
      brand: 'Apple', color: 'White', image: '/demo-images/airpods.jpg',
      reportedBy: userIds[0], reporterName: 'Alice Johnson',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'Blue Backpack',
      type: 'lost', category: 'Bags', status: 'approved',
      description: 'Navy blue backpack with laptop compartment. Has a red keychain attached.',
      location: 'Main Block Classroom 201', date: new Date('2026-09-23'),
      brand: 'Wildcraft', color: 'Blue', image: '/demo-images/backpack.jpg',
      reportedBy: userIds[1], reporterName: 'Bob Smith',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'Student ID Card',
      type: 'lost', category: 'Documents', status: 'approved',
      description: 'College student ID card. Name: Rahul Sharma, Roll No: CS2024.',
      location: 'Sports Ground', date: new Date('2026-09-20'),
      brand: '', color: '', image: 'https://placehold.co/600x400/2a2a35/FFFFFF?text=Student+ID+Card',
      reportedBy: userIds[2], reporterName: 'Charlie Brown',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'Silver Wristwatch',
      type: 'lost', category: 'Accessories', status: 'approved',
      description: 'Silver analog wristwatch with a blue dial. Brand name on face.',
      location: 'College Gym', date: new Date('2026-09-19'),
      brand: 'Fastrack', color: 'Silver', image: '/demo-images/watch.jpg',
      reportedBy: userIds[1], reporterName: 'Bob Smith',
      createdAt: now, updatedAt: now,
    },

    // FOUND items
    {
      title: 'Black Leather Wallet Found',
      type: 'found', category: 'Wallet', status: 'approved',
      description: 'Found a black leather wallet near the canteen. Contains cards and cash. Handover to security.',
      location: 'College Canteen', date: new Date('2026-09-22'),
      brand: 'Wildcraft', color: 'Black', image: '/demo-images/wallet.jpg',
      reportedBy: userIds[2], reporterName: 'Charlie Brown',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'White Earbuds with Case',
      type: 'found', category: 'Electronics', status: 'approved',
      description: 'Found white wireless earbuds with charging case near the reading area.',
      location: 'Library', date: new Date('2026-09-21'),
      brand: 'Apple', color: 'White', image: '/demo-images/airpods.jpg',
      reportedBy: userIds[1], reporterName: 'Bob Smith',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'Navy Blue Bag',
      type: 'found', category: 'Bags', status: 'approved',
      description: 'Found a blue backpack on a bench outside classroom. Has a keychain.',
      location: 'Block B Corridor', date: new Date('2026-09-23'),
      brand: '', color: 'Blue', image: '/demo-images/backpack.jpg',
      reportedBy: userIds[0], reporterName: 'Alice Johnson',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'Set of Keys',
      type: 'found', category: 'Keys', status: 'approved',
      description: 'Found a set of 3 keys with a yellow keychain near the parking area.',
      location: 'Parking Lot', date: new Date('2026-09-22'),
      brand: '', color: 'Yellow', image: '/demo-images/keys.jpg',
      reportedBy: userIds[2], reporterName: 'Charlie Brown',
      createdAt: now, updatedAt: now,
    },
    {
      title: 'Engineering Drawing Textbook',
      type: 'found', category: 'Books', status: 'approved',
      description: 'Found an Engineering Drawing textbook in Classroom 301. Name written inside.',
      location: 'Classroom 301', date: new Date('2026-09-20'),
      brand: '', color: 'Green', image: '/demo-images/textbook.jpg',
      reportedBy: userIds[1], reporterName: 'Bob Smith',
      createdAt: now, updatedAt: now,
    },
    // Pending item (not yet admin-approved)
    {
      title: 'Red Bicycle Helmet',
      type: 'lost', category: 'Sports', status: 'pending',
      description: 'Red cycling helmet, size L. Lost near the cycle stand.',
      location: 'Cycle Stand Gate 2', date: new Date('2026-09-24'),
      brand: 'Nivia', color: 'Red', image: 'https://placehold.co/600x400/2a2a35/FFFFFF?text=Red+Helmet',
      reportedBy: userIds[0], reporterName: 'Alice Johnson',
      createdAt: now, updatedAt: now,
    },
  ];

  const insertedItems = await db.collection('items').insertMany(itemDocs);
  const itemIds = Object.values(insertedItems.insertedIds);
  console.log(`📦 ${itemIds.length} sample items inserted`);

  // ── Sample Claims ──────────────────────────────────────────────────────────
  // Alice claims the wallet found by Charlie (item index 5)
  const foundWalletId = itemIds[5];
  const claimDoc = {
    itemId:        foundWalletId,
    itemTitle:     'Black Leather Wallet Found',
    claimantId:    userIds[0],
    claimantName:  'Alice Johnson',
    claimantEmail: 'alice@example.com',
    reason:        'This is my wallet. It has my student ID card with my name Alice Johnson.',
    proof:         'I can describe all the contents of the wallet accurately.',
    status:        'pending',
    reviewedBy:    null,
    reviewedAt:    null,
    createdAt:     now,
    updatedAt:     now,
  };

  await db.collection('claims').insertOne(claimDoc);

  // Update that found item to 'claimed'
  await db.collection('items').updateOne(
    { _id: foundWalletId },
    { $set: { status: 'claimed', updatedAt: now } }
  );

  console.log('📋 1 sample claim inserted');

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log('\n════════════════════════════════════════');
  console.log('✅  SEED COMPLETE — Demo credentials:');
  console.log('────────────────────────────────────────');
  console.log('Admin:  admin@lostfound.dev  /  Admin@1234');
  console.log('User 1: alice@example.com    /  User@1234');
  console.log('User 2: bob@example.com      /  User@1234');
  console.log('User 3: charlie@example.com  /  User@1234');
  console.log('════════════════════════════════════════\n');

  await client.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
