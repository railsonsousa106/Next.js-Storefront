// pages/products/index.tsx
import React, { useState, useMemo, useCallback } from "react";
import * as _ from "lodash";
import { NextPage } from "next/types";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { ProductList } from "types/types";
import { Product } from "types/graphql";
import gqlClient from "@utils/gqlClient";
// @ts-ignore
import { useShoppingCart } from "use-shopping-cart";

import MainLayout from "@layout/Main";
import {
  GetAllProductPathsDocument,
  ProductDetailsDocument,
} from "types/graphql";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface AllAttributes {
  main: boolean;
  name: string;
  choices: string[];
  selected: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await gqlClient.query({
    query: GetAllProductPathsDocument,
  });
  const products = data!.products as ProductList;
  const paths = products!.edges.map(({ node: { id } }) => ({
    params: { id: id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params;
  const { data } = await gqlClient.query({
    query: ProductDetailsDocument,
    variables: {
      id: params.id,
    },
  });
  return {
    props: {
      product: data!.product,
    },
  };
};

const ProductItemPage: NextPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, defaultVariant, variants, productType } = product as Product;
  const { addItem } = useShoppingCart();
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

  const allAttributes = useMemo(() => {
    if (!variants || !variants.length || !variants[0]?.attributes?.length)
      return [];

    let attributes = variants[0]?.attributes.map(
      (atr) =>
        ({
          main: false,
          name: atr.attribute.name,
          choices: [],
          selected: "",
        } as AllAttributes)
    );

    for (let attribute of attributes) {
      for (let variant of variants) {
        let foundAttribute = variant?.attributes.find(
          (attr) => attr.attribute.name === attribute.name
        );
        if (!attribute.choices.includes(foundAttribute?.values?.[0]?.name!)) {
          attribute.choices.push(foundAttribute?.values?.[0]?.name!);
        }
      }
    }

    for (let i = 0; i < variants.length - 1; i++) {
      for (let j = i + 1; j < variants.length; j++) {
        if (
          variants[i]?.media?.length &&
          variants[j]?.media?.length &&
          variants[i]?.attributes?.length &&
          variants[j]?.attributes?.length
        ) {
          if (variants[i]?.media?.[0].url === variants[j]?.media?.[0].url) {
            for (let attributeIndex in variants[i]?.attributes!) {
              if (
                variants[i]?.attributes?.[attributeIndex].attribute?.name ===
                  variants[j]?.attributes?.[attributeIndex].attribute?.name &&
                variants[i]?.attributes?.[attributeIndex].values?.[0]?.name ===
                  variants[j]?.attributes?.[attributeIndex].values?.[0]?.name
              ) {
                let foundAttribute = attributes.find(
                  (item) =>
                    item.name ===
                    variants[i]?.attributes?.[attributeIndex].attribute?.name
                );
                if (foundAttribute) {
                  foundAttribute.main = true;
                }
              }
            }
          }
        }
      }
    }
    return attributes;
  }, [variants]);

  const allAttributesWithSelected = useMemo(() => {
    let attributes = [...allAttributes];
    for (let attribute of attributes) {
      let foundAttribute = selectedVariant?.attributes.find(
        (item) => item.attribute.name === attribute.name
      );
      if (foundAttribute)
        attribute.selected = foundAttribute.values?.[0]?.name || "";
    }
    return attributes;
  }, [allAttributes, selectedVariant]);

  const getVariantFromAttribute = useCallback(
    (name, value) => {
      let generatedAttribute = JSON.parse(
        JSON.stringify(allAttributesWithSelected)
      ) as AllAttributes[];
      let foundAttr = generatedAttribute.find((item) => item.name === name);
      if (foundAttr) foundAttr.selected = value;

      let found = variants?.find((variant) => {
        for (let attribute of generatedAttribute) {
          let foundAttribute = variant?.attributes.find(
            (atr) => atr.attribute.name === attribute.name
          );
          if (
            foundAttribute &&
            foundAttribute.values[0]?.name !== attribute.selected
          )
            return false;
        }
        return true;
      });
      return found;
    },
    [variants, allAttributesWithSelected]
  );

  const handleAddToCart = useCallback(() => {
    addItem({
      id: selectedVariant?.id || product.id,
      level: selectedVariant ? "variant" : "product",
      name: product.name,
      variant: selectedVariant,
      product: _.omit(product, ["variants"]),
      currency: selectedVariant?.pricing?.price?.currency,
      price: (selectedVariant?.pricing?.price?.net.amount || 0) * 100,
    });
  }, [product, selectedVariant, addItem]);

  console.log(allAttributesWithSelected);
  return (
    <MainLayout title="Product Details">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {selectedVariant?.media?.map((media, index) => (
              <img
                src={media?.url}
                alt={media?.alt || ""}
                key={index}
                width="100%"
              />
            ))}
          </div>
        </div>
        <div>
          <p className="block text-gray-900 truncate">{productType?.name}</p>
          <p className="block text-xl text-gray-900 font-bold truncate">
            {name}
          </p>
          <div className="flex justify-between mb-2">
            <p className="block text-gray-900 truncate">
              {selectedVariant?.name}
            </p>
            <p className="block text-gray-900 truncate">
              {selectedVariant?.pricing?.price?.net.amount}{" "}
              {selectedVariant?.pricing?.price?.currency}
            </p>
          </div>
          <div>
            {allAttributesWithSelected?.map((attribute, index) => (
              <div key={index} className="grid grid-cols-6 gap-2 mb-4">
                {attribute.choices.map((choice, choiceIndex) => {
                  let foundVariant = getVariantFromAttribute(
                    attribute.name,
                    choice
                  );
                  if (attribute.main) {
                    return (
                      <img
                        src={foundVariant?.media?.[0].url}
                        alt={foundVariant?.media?.[0].alt || ""}
                        width="100%"
                        key={choiceIndex}
                        className={
                          choice === attribute.selected
                            ? "col-span-2 border border-gray-900"
                            : "col-span-2 border border-transparent hover:border-gray-600 cursor-pointer"
                        }
                        onClick={() => setSelectedVariant(foundVariant)}
                      />
                    );
                  }
                  return (
                    <p
                      key={choiceIndex}
                      className={
                        choice === attribute.selected
                          ? "border border-gray-900 block text-gray-900 truncate cursor-pointer text-center"
                          : "block text-gray-900 truncate cursor-pointer text-center hover:bg-gray-300"
                      }
                      onClick={() => setSelectedVariant(foundVariant)}
                    >
                      {choice}
                    </p>
                  );
                })}
              </div>
            ))}
            <button
              className="w-full py-2 bg-black text-white rounded-3xl"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductItemPage;
