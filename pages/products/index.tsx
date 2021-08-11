// pages/products/index.tsx
import * as React from "react";
import { NextPage, GetStaticProps } from "next";
import { LatestProductsDocument } from "types/graphql";
import { ProductList } from "types/types";
import gqlClient from "@utils/gqlClient";

import MainLayout from "@layout/Main";
import { Link } from "components";

interface ProductsPageProps {
  products: ProductList;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await gqlClient.query({
    query: LatestProductsDocument,
  });
  return {
    props: {
      products: data!.products,
    },
  };
};

const ProductsPage: NextPage<ProductsPageProps> = (
  props: ProductsPageProps
) => {
  const { products } = props;

  return (
    <MainLayout title="Landing Page">
      <div className="grid grid-cols-4 gap-4">
        {(products?.edges || []).map(
          ({ node: { id, name, thumbnail } }, index) => (
            <Link
              className="bg-white cursor-pointer"
              key={index}
              href={`/products/${id}`}
            >
              <img src={thumbnail?.url} alt={thumbnail?.alt || ""} />
              <div className="p-2 border-gray-100 border-t">
                <p className="block text-lg text-gray-900 truncate">{name}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
