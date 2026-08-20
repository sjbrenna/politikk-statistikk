import OverviewCaseList from "@/components/cases/OverviewCaseList";
import ContentCard from "@/components/pageLayout/ContentCard";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PartyLogos from "@/components/PartyLogos";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { config } from "./config";

export default function Home() {
  return (
    <ContentContainer mode="half" className="mt-4">
      <ContentCard
        header={
          <div className="pl-4 wrap-break-word">
            Partier representert på Stortinget
          </div>
        }
      >
        <PartyLogos />
      </ContentCard>
      <ContentCard
        header={
          <div className="pl-4 wrap-break-word flex flex-row justify-between items-center flex-wrap">
            <p>Nyeste saker</p>
            <Link
              href={"/saker"}
              className="text-xs infoLink flex flex-row items-center"
            >
              <p>Se alle saker</p>
              <ArrowRight size={20} />
            </Link>
          </div>
        }
      >
        <OverviewCaseList cutoff={config.homepageCases} />
      </ContentCard>
    </ContentContainer>
  );
}
