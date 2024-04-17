export interface IOrder {
    id: number,
    userId: string,
    userName: string,
    userEmail: string,
    userPhoneNo: number,
    totalPrice: number,
    date: Date,
    location: string,
    paymentStatus: any,
    totalEarnedPoints: number,
    isPayedByPoints: boolean,
    orderDetailsModel: Array<IOrderDetails>,
}
export interface IOrderDetails {
    id: number,
    productId: number,
    price: number,
    productName: string,
    earnedPoints: number,
    orderImgUrl: string,
}
export enum PaymentStatus {
    Completed = 1,
    Pending = 2,
    Canceled = 3
}