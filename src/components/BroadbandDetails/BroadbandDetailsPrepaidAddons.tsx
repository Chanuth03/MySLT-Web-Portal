
import { DataBalance } from "../../types/types";
import BroadbandDetailsPrepaidTemplate from "./BroadbandDetailsPrepaidTemplate";

interface BroadbandDetalisPrepaidAddonsProps {
  dataBalance: DataBalance[];
}

const BroadbandDetailsPrepaidAddons = ({
  dataBalance,
}: BroadbandDetalisPrepaidAddonsProps) => {
  return (
    <>
        <BroadbandDetailsPrepaidTemplate dataBalance={dataBalance} isMain={false}/>
    </>
  );
};

export default BroadbandDetailsPrepaidAddons;
