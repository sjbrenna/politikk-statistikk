"use client";

import DeleteUserButton from "@/components/DeleteUserButton";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center bg-red-50">
      <ContentContainer>
        <PageTitle title="TEST" />
        <DeleteUserButton></DeleteUserButton>
      </ContentContainer>
    </div>
  );
}
