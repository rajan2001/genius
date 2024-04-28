import { useState } from "react";
import SeedDealer from "./ui/seedDealer";


const InformationCard = ({ info }: any) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="mt-6 rounded-md border-2 p-6">
      <span className=" text-lg bg-green-800 text-white py-2 px-4 rounded-md ">
        District Information
      </span>
      <div className="mt-4">{info[0].DistrictInfo.EcologicalZone}</div>
      <div className="mt-4">
        <span className=" text-lg bg-green-800 text-white py-2 px-4 rounded-md  ">
          Coordinates
        </span>
        <div className="mt-4">{info[0].DistrictInfo.Coordinates}</div>
      </div>

      <div className="mt-8 border ">
        <div className=" grid grid-cols-3  text-center gap-10 border h-10 items-center font-bold text-white bg-green-800 ">
          <span>Season</span>
          <span>Crop Information</span>
          <span>Month</span>
        </div>

        {info[0].CardInfo.map((info: any) => (
          <div className=" grid grid-cols-3 text-center  gap-10 mt-4 pb-4 border-b-2" key={info.Season}>
            <span>{info.Season}</span>
            <span className="text-justify">{info.cropInfo}</span>
            <span>{info.month}</span>
          </div>
        ))}
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="text-lg bg-green-800 text-white py-2 px-4 rounded-md mt-6 text-center cursor-pointer"
      >
        Seed Dealer
      </div>

      {toggle
        ? info[0].SeedInfo.map((seedinfo: any) => (
            <div key={seedinfo.block} className="mt-4">
              <button className=" text-xl font-semibold text-green-800">
                Block :- {seedinfo.block}
              </button>

              {
                <SeedDealer
                  DealerandAddress={seedinfo.DealerandAddress}
                  seedinfo={seedinfo}
                />
              }
            </div>
          ))
        : null}
    </div>
  );
};

export default InformationCard;