const InformationCard = ({ info }: any) => {
  console.log(info)
  return (
    <div className="mt-6 rounded-md border-2 p-6">
      <span className=" text-lg bg-purple-800 text-white py-2 px-4 rounded-full ">
        District Information
      </span>
      <div className="mt-4">
        In this district, the Agro Ecological Sub Region (ICAR) is designated as
        Moderately To Gently Sloping Chattisgarh-Mahanadi Basin, falling under
        the Hot Moist/Dry Subhumid Transitional eco sub-region (11.0). It is
        also categorized within the Agro-Climatic Zone (Planning Commission) as
        the Eastern Plateau And Hills Region (VII), and under the Agro Climatic
        Zone (NARP) it belongs to the Central and North Eastern Plateau Zone
        (BI-4)
      </div>
      <div className="mt-4">
        <span className=" text-lg bg-purple-800 text-white py-2 px-4 rounded-full ">
          Coordinates
        </span>
        <div className="mt-4">
          The district headquarters is situated at a latitude of 23.35°N and a
          longitude of 85.33°E, with an altitude of 2140 feet.
        </div>
      </div>

      <div className="mt-8 border ">
        <div className=" grid grid-cols-3 text-center gap-10 border h-10 items-center font-bold text-purple-800 ">
          <span>Season</span>
          <span>Crop Information</span>
          <span>Month</span>
        </div>
        <div className=" grid grid-cols-3 gap-10 text-center mt-4">
          <span>Kharif- Rainfed</span>
          <span>
            Rice is extensively cultivated during the Kharif season under
            rainfed conditions in Ramgarh District. Farmers rely on the natural
            rainfall pattern for irrigation, with sowing typically commencing
            with the onset of monsoon rains, usually between June and July. The
            crop matures by October to November, with harvests following
            thereafter. The rainfed cultivation of rice involves adapting to
            local agro-climatic conditions and traditional agronomic practices
            to optimize yields.
          </span>
          <span>4 th week of June - 4 th week of July</span>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
