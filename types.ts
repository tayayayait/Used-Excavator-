export enum EquipmentType {
    Excavator = 'Excavator',
    Forklift = 'Forklift',
    Loader = 'Loader',
    Bulldozer = 'Bulldozer'
}

export enum EquipmentStatus {
    Active = 'active',
    Sold = 'sold',
    Reserved = 'reserved'
}

export interface Equipment {
    id: string;
    title: string;
    type: EquipmentType;
    manufacturer: string;
    modelName: string;
    weightClass: string; // e.g. "06W", "02LC"
    year: number;
    hourMeter: number;
    price: number;
    location: string;
    description: string;
    sellerContact: string;
    sellerName: string;
    images: string[];
    tags: string[];
    status: EquipmentStatus;
    createdAt: string;
}

export interface FilterState {
    searchTerm: string;
    type: string;
    manufacturer: string;
    minPrice: number | '';
    maxPrice: number | '';
    minYear: number | '';
    maxYear: number | '';
}

export const MANUFACTURES = ['All', 'Doosan', 'Volvo', 'Hyundai', 'CAT', 'Kubota'];
export const WEIGHT_CLASSES = ['All', '02 (Mini)', '06 (Standard)', '10 (Large)', '14+ (Heavy)'];
export const TYPES = ['All', ...Object.values(EquipmentType)];
