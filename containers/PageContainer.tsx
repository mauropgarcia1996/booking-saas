import Head from "next/head";
import React from "react";

/**
 * Renders the page layout
 * @param children elements of the page
 * @returns PageContainer Component
 */
const PageContainer = ({ children }: Page) => {
  return (
    <div style={{height: "100%"}}>
      <Head>
        <title>Booking Dashboard</title>
        <meta name="description" content="A Booking SaaS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

interface Page {
  children: React.ReactNode
}

export default PageContainer;
