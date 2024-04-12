import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/UserTable";
import axios from "axios";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Item } from "@/types/Item";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = async () => {
  const serverData: Array<Item> = await getServerData();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col gap-10">
        <TableThree userData={serverData} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

async function getServerData() {
  const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.get(`${Base_Url}/admin/users`, {
    withCredentials: true,
  });
  const serverData = res.data;
  return serverData;
}
