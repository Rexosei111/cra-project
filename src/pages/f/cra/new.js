import ConsultantLayout from "@/components/Desktop/consultantLayout";
import React from "react";

export default function NewCraPage() {
  return <div>NewCraPage</div>;
}

NewCraPage.getLayout = (page) => {
  return <ConsultantLayout title="Nouveau CRA">{page}</ConsultantLayout>;
};
