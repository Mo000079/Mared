export interface IProduct {
    id?:number,
    vendorId?:number,
    name?:string,
    price?: number,
    description?:string,
    quantity?:number,
    brandName?: string,
    earnedPoint?:number,
    isAvialable?:boolean,
    shopId?:number,
    shopName?:string,
    subCategoryID?:number,
    subCategoryName?:string,
    categoryID?: number,
    categoryName?:string,
    imagesUrl?:Array<string>,
  colorSize?: Map<string, string>
  rate?:number
}
