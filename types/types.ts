import { Product, PageInfo, Scalars } from "./graphql";

export type ProductsNode = {
  node: Product;
  cursor: PageInfo;
};

export type ProductList = {
  edges: [ProductsNode];
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type CheckoutFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  zip: string;
};
