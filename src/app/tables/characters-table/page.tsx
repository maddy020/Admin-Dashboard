import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import TableThree from "@/components/Tables/CharacterTable";
import Add from "@/components/Modal/Add";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = async () => {
  const modelData = await getServerData();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Characters" />
      <Add item={null} Data={modelData} />
      <div className="flex flex-col gap-10">
        <TableThree modelData={modelData} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

async function getServerData() {
  const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.get(`${Base_Url}/admin/models`, {
    withCredentials: true,
  });
  const serverData = res.data;
  return serverData;
}
