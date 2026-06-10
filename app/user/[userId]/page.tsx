"use client";

import DeleteUserButton from "@/components/DeleteUserButton";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex-1 flex flex-col items-center bg-red-50">
      <ContentContainer>
        <PageTitle title="TEST" />
        <DeleteUserButton></DeleteUserButton>
      </ContentContainer>
    </div>
  );
}
