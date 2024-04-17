import { IOfferDetails } from "./IOfferDetails";

export interface IOffer {
    id:number,
  title: string,
  categoryName:string,
    description:string,
    code:string,
    discount:number,
    limit:number,
    startDate: Date,
    expirationDate:Date,
    vendorId:string,
    totalQuantity:number,
    totalPrice:number,
    earnedPoints:number,
  mainImageUrl: string,
  vendorName: string,
  vendorImg: string,
  shopName: string,
  shopLocation:string,
    offerDetailsViews:Array<IOfferDetails>
}
