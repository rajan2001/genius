const SeedDealer = ({ DealerandAddress }: any) => {
    return (
      <div className="mt-4 border ">
        <div className=" grid grid-cols-2  text-center gap-10 border h-10 items-center font-bold text-white bg-green-800 ">
          <span>Dealer</span>
          <span>Address</span>
        </div>
        {DealerandAddress.map((info: any) => (
          <div className=" grid grid-cols-2 text-center  gap-10 mt-4 pb-4 border-b-2" key={info.name}>
            <div>
              <span >{info.name}</span>
            </div>
            <span>{info.address}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default SeedDealer;