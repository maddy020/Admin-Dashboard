"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { tokenrequest } from "@/types/tokenrequest";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import TokenTable from "@/components/Tables/Token";

const TokenRequestPage = () => {
  const [requests, setRequests] = useState<Array<tokenrequest>>([]);
  useEffect(() => {
    const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
    async function getRequests() {
      const res = await axios.get(`${Base_Url}/admin/tokenRequests`, {
        withCredentials: true,
      });
      setRequests(res.data);
      console.log(res.data);
    }
    getRequests();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Requested Tokens" />
      <div className="flex flex-col gap-10">
        <TokenTable requests={requests} setRequests={setRequests} />
      </div>
    </DefaultLayout>
  );
};

export default TokenRequestPage;
