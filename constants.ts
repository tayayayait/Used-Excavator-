import { Equipment, EquipmentStatus, EquipmentType } from './types';

// Utility to format currency in Korean style (e.g., 3,500만 원)
export const formatKoreanCurrency = (price: number): string => {
    if (price >= 100000000) {
        const uk = Math.floor(price / 100000000);
        const remainder = Math.floor((price % 100000000) / 10000);
        return remainder > 0 
            ? `${uk}억 ${remainder.toLocaleString()}만` 
            : `${uk}억`;
    } else {
        return `${(price / 10000).toLocaleString()}만`;
    }
};

export const MOCK_EQUIPMENT: Equipment[] = [
    {
        id: '1',
        title: 'Doosan DX140W-5 Clean Condition',
        type: EquipmentType.Excavator,
        manufacturer: 'Doosan',
        modelName: 'DX140W-5',
        weightClass: '06W',
        year: 2019,
        hourMeter: 4500,
        price: 65000000,
        location: 'Gyeonggi-do, Hwaseong',
        description: 'Well maintained Doosan 06W excavator. Engine oil recently changed. Includes rotating clamp.',
        sellerContact: '010-1234-5678',
        sellerName: 'Kim Heavy Industries',
        images: [
            'https://picsum.photos/800/600?random=1',
            'https://picsum.photos/800/600?random=2',
            'https://picsum.photos/800/600?random=3'
        ],
        tags: ['Rotating Clamp', 'Rear Camera'],
        status: EquipmentStatus.Active,
        createdAt: '2023-10-15T10:00:00Z'
    },
    {
        id: '2',
        title: 'Volvo EC60E Mini Excavator',
        type: EquipmentType.Excavator,
        manufacturer: 'Volvo',
        modelName: 'EC60E',
        weightClass: '02LC',
        year: 2021,
        hourMeter: 1200,
        price: 42000000,
        location: 'Gyeongsangbuk-do, Daegu',
        description: 'Almost new condition. Mainly used for landscaping. Tracks are at 90%.',
        sellerContact: '010-9876-5432',
        sellerName: 'Daegu Machinery',
        images: [
            'https://picsum.photos/800/600?random=4',
            'https://picsum.photos/800/600?random=5'
        ],
        tags: ['Rubber Tracks', 'Quick Coupler'],
        status: EquipmentStatus.Active,
        createdAt: '2023-10-18T14:30:00Z'
    },
    {
        id: '3',
        title: 'Hyundai HW145 Wheel Excavator',
        type: EquipmentType.Excavator,
        manufacturer: 'Hyundai',
        modelName: 'HW145',
        weightClass: '06W',
        year: 2017,
        hourMeter: 8200,
        price: 55000000,
        location: 'Chungcheongnam-do, Cheonan',
        description: 'Ready to work. Hydraulic pump serviced last month. Price negotiable.',
        sellerContact: '010-5555-5555',
        sellerName: 'Cheonan Equipment',
        images: [
            'https://picsum.photos/800/600?random=6'
        ],
        tags: ['Breaker Line'],
        status: EquipmentStatus.Reserved,
        createdAt: '2023-10-10T09:00:00Z'
    },
    {
        id: '4',
        title: 'CAT 320 GC Heavy Duty',
        type: EquipmentType.Excavator,
        manufacturer: 'CAT',
        modelName: '320 GC',
        weightClass: '10LC',
        year: 2020,
        hourMeter: 3500,
        price: 110000000,
        location: 'Busan',
        description: 'Powerful machine for heavy construction. Fuel efficient.',
        sellerContact: '010-1111-2222',
        sellerName: 'Busan Port Logistics',
        images: [
            'https://picsum.photos/800/600?random=7',
            'https://picsum.photos/800/600?random=8'
        ],
        tags: ['Bucket Set', 'GPS'],
        status: EquipmentStatus.Active,
        createdAt: '2023-10-20T11:20:00Z'
    },
    {
        id: '5',
        title: 'Doosan D30S-5 Forklift',
        type: EquipmentType.Forklift,
        manufacturer: 'Doosan',
        modelName: 'D30S-5',
        weightClass: '3 Ton',
        year: 2015,
        hourMeter: 6000,
        price: 15000000,
        location: 'Incheon',
        description: 'Diesel forklift. Good running condition. Tires replaced recently.',
        sellerContact: '010-3333-4444',
        sellerName: 'Incheon Warehouse',
        images: [
            'https://picsum.photos/800/600?random=9'
        ],
        tags: ['Side Shift'],
        status: EquipmentStatus.Sold,
        createdAt: '2023-09-01T10:00:00Z'
    },
    {
        id: '6',
        title: 'Kubota U17 Mini',
        type: EquipmentType.Excavator,
        manufacturer: 'Kubota',
        modelName: 'U17',
        weightClass: '017',
        year: 2022,
        hourMeter: 500,
        price: 28000000,
        location: 'Seoul',
        description: 'Compact size, perfect for narrow urban spaces. Like new.',
        sellerContact: '010-7777-8888',
        sellerName: 'Urban Construction',
        images: [
            'https://picsum.photos/800/600?random=10'
        ],
        tags: ['Variable Width Track'],
        status: EquipmentStatus.Active,
        createdAt: '2023-10-21T16:45:00Z'
    }
];