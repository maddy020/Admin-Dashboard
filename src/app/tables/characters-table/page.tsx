"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import TableThree from "@/components/Tables/CharacterTable";
import Add from "@/components/Modal/Add";
import { Metadata } from "next";
import { Model } from "@/types/model";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";

const TablesPage = () => {
  const [modelData, setModelData] = useState<Model[]>([]);

  useEffect(() => {
    async function getServerData() {
      const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await axios.get(`${Base_Url}/admin/models`, {
        withCredentials: true,
      });
      const serverData = res.data;
      setModelData(serverData);
    }
    getServerData();
  }, [modelData]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Characters" />
      <Add item={null} modelData={modelData} setModelData={setModelData} />
      <div className="flex flex-col gap-10">
        <TableThree modelData={modelData} setModelData={setModelData} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
