import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding 10 additional sample sites...');
  
  const additionalSites = [
    {
      name: 'Emerald City Logistics',
      location: 'Dist 1, Ho Chi Minh City',
      managerName: 'Le Van Nam',
      latitude: 10.7769,
      longitude: 106.7009,
      geofenceRadius: 600
    },
    {
      name: 'Skyline Tech Park',
      location: 'Cau Giay, Hanoi',
      managerName: 'Nguyen Thi Mai',
      latitude: 21.0285,
      longitude: 105.8542,
      geofenceRadius: 450
    },
    {
      name: 'Blue Harbor Terminal',
      location: 'Da Nang Port, Da Nang',
      managerName: 'Tran Minh Hoang',
      latitude: 16.0544,
      longitude: 108.2022,
      geofenceRadius: 1000
    },
    {
      name: 'Golden Valley Factory',
      location: 'Binh Duong Industrial Zone',
      managerName: 'Pham Quoc Anh',
      latitude: 10.9808,
      longitude: 106.6518,
      geofenceRadius: 800
    },
    {
      name: 'Silver Peak Data Center',
      location: 'Hoa Lac Hi-Tech Park',
      managerName: 'Hoang Kim Lien',
      latitude: 21.0123,
      longitude: 105.5245,
      geofenceRadius: 300
    },
    {
      name: 'Sunrise Retail Hub',
      location: 'Can Tho Center',
      managerName: 'Vo Thanh Tung',
      latitude: 10.0452,
      longitude: 105.7469,
      geofenceRadius: 500
    },
    {
      name: 'Crimson Leaf Warehouse',
      location: 'Long An Logistics Park',
      managerName: 'Doan Van Hau',
      latitude: 10.6983,
      longitude: 106.5055,
      geofenceRadius: 1200
    },
    {
      name: 'Azure R&D Lab',
      location: 'Thu Duc City, HCMC',
      managerName: 'Bui Phuong Thao',
      latitude: 10.8231,
      longitude: 106.6297,
      geofenceRadius: 200
    },
    {
      name: 'Opal Operations Base',
      location: 'Vinh City, Nghe An',
      managerName: 'Ngo Duc Manh',
      latitude: 18.6735,
      longitude: 105.6813,
      geofenceRadius: 700
    },
    {
      name: 'Titanium Steel Works',
      location: 'Hai Phong Industrial Hub',
      managerName: 'Vu Van Quyet',
      latitude: 20.8449,
      longitude: 106.6881,
      geofenceRadius: 1500
    }
  ];

  for (const site of additionalSites) {
    await prisma.site.create({
      data: site
    });
  }

  console.log(`Successfully seeded 10 additional sites.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
