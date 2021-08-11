// layouts/Main.tsx
import * as React from "react";

import Footer from "./Footer";
import Header from "./Header";

import Head from "next/head";

type Props = {
  title?: string;
  wrapperClass?: string;
  mainClass?: string;
};

const MainLayout: React.FunctionComponent<Props> = ({
  children,
  title = "Main",
  wrapperClass = "h-full min-h-screen flex flex-col bg-gray-100 overflow-y-auto justify-between",
  mainClass = "py-10 max-w-7xl mx-auto h-full",
}) => (
  <div className="h-screen">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={wrapperClass}>
      <Header />
      <div className={mainClass}>{children}</div>
      <Footer />
    </div>
  </div>
);

export default MainLayout;
