export type DeskProduct = {
  id: string;
  name: string;
  brandId: string | null;
  brandName: string | null;
  categoryId: string | null;
  categoryName: string | null;
  collectionId: string | null;
  collectionName: string | null;
  description: string;
  shortDescription: string;
  price: number;
  availability: string;
  stockQuantity: number;
  lowStockThreshold: number;
  trackStock: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  publishStatus: string;
  metaTitle: string | null;
  metaDescription: string | null;
  images: { url: string; alt: string }[];
};

export type DeskOption = { id: string; name: string; kind?: string; description?: string; isVisible?: boolean; logoUrl?: string | null };
export type DeskCollection = DeskOption & { brandId: string | null; description: string; heroImageUrl: string | null; publishStatus: string; isVisible: boolean };
