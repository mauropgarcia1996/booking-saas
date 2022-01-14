import { Button, TextInput } from "@mantine/core";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import SimpleTable from "../components/SimpleTable";
import PageContainer from "../containers/PageContainer";
import { supabase } from "../db/supabase";

const Home: NextPage = ({ data }: any) => {
  return (
    <PageContainer>
     <h1>Home!</h1>
    </PageContainer>
  );
};

export default Home;
