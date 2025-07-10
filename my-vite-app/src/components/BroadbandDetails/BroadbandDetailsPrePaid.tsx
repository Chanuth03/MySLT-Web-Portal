import { DataBalance } from "../../types/types";
import BroadbandDetailsPrepaidTemplate from "./BroadbandDetailsPrepaidTemplate";

interface BroadbandDetailsPrePaidProps {
  dataBalance: DataBalance[];
}


const BroadbandDetailsPrePaid = ({
  dataBalance,
}: BroadbandDetailsPrePaidProps) => {
  return (
        <BroadbandDetailsPrepaidTemplate dataBalance={dataBalance} isMain={true}/>
      
  );
};

export default BroadbandDetailsPrePaid;
