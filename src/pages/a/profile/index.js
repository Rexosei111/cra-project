import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import React, { useContext } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import useToken from "@/hooks/token";
import AgencyProfileForm from "@/components/Desktop/AgencyProfileForm";

export default function AgencyProfilePage() {
  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Organization");
  const [token, setToken] = useToken("token", null);
  const { data, error, isLoading } = useSWR(
    () => "/api/organizations/" + token?.me?.organization?.id,
    fetcher
  );
  console.log(data);
  return (
    <div>
      <AgencyProfileForm initialValues={data} />
    </div>
  );
}

AgencyProfilePage.getLayout = (page) => {
  return <AgencyLayout title="Organization">{page}</AgencyLayout>;
};
