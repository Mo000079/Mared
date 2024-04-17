export interface ISubCategory
{
    Id:number;
    Name:string;
    Img:string;
    CategoryId:number;
    CategoryName:string; 
    ProductsId:Array<number>;
    ProductsName:Array<string>;
}