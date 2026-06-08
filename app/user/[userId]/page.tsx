"use client";

import DeleteUserButton from "@/components/DeleteUserButton";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex-1 flex bg-red-50 flex-col">
      <ContentContainer>
        <DeleteUserButton></DeleteUserButton>
      </ContentContainer>
    </div>
  );
}
