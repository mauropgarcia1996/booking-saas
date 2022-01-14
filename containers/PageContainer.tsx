import Head from "next/head";

/**
 * Renders the page layout
 * @param children elements of the page
 * @returns PageContainer Component
 */
const PageContainer = ({ children }: any) => {
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

export default PageContainer;
