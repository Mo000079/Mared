export interface IproductVM {
  Id: number;
  VendorId?: string;
  Name: string;
  Price: number;
  Description: string;
  SubCategoryId: number;
  Quantity: number;
  BrandName: string;
  EarnedPoint: number;
  Weight?: number;
  KeepImages?: boolean;
  ShopId: number;
  imagesUrl?: Array<string>
}
