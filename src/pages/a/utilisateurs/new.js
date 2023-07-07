import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import NewMangerForm from "@/components/Desktop/newManagerForm";
import React, { useContext } from "react";

export default function NewUserPage() {
  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Nouveau Utilisateur");
  return <NewMangerForm />;
}

NewUserPage.getLayout = (page) => {
  return <AgencyLayout title="Nouveau Utilisateur">{page}</AgencyLayout>;
};
