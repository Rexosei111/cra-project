import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import ConsultantMissionForm from "@/components/Desktop/consultantMissions";
import EditConsultantForm from "@/components/Desktop/editConsultantForm";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import { useRouter } from "next/router";

export default function EditConsultantPage({ title }) {
  const { setTopBarTitle } = useContext(LayoutContext);
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    () => (router.isReady ? `/api/consultants/${router.query.id}` : null),
    fetcher
  );
  useEffect(() => {
    if (data !== "undefined") {
      setTopBarTitle(data && `${data?.firstName} ${data?.lastName}`);
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <EditConsultantForm initialValues={data && data} />
      <ConsultantMissionForm consultant={data && data} />
    </>
  );
}
EditConsultantPage.getInitialProps = async (context) => {
  return {
    title: "Edit consultant",
  };
};
EditConsultantPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
