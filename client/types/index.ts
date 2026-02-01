export interface User {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    token?: string;
}

export interface Deal {
    _id: string;
    partnerName: string;
    title: string;
    description: string;
    category: 'Cloud' | 'Marketing' | 'Analytics' | 'Productivity' | 'Design' | 'Other';
    benefit: string;
    accessLevel: 'public' | 'restricted';
    logoUrl: string;
    createdAt: string;
}

export interface Claim {
    _id: string;
    user: string;
    deal: Deal;
    status: 'pending' | 'approved' | 'rejected';
    claimedAt: string;
}
