const InformationCard = ({ info }: any) => {
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
          <div className=" grid grid-cols-3 text-center  gap-10 mt-4 pb-4 border-b-2">
            <span>{info.Season}</span>
            <span className="text-justify">{info.cropInfo}</span>
            <span>{info.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationCard;
