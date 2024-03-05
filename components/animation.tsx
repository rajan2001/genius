import { Player } from '@lottiefiles/react-lottie-player';

const Animation = ()=>{
return(
    <Player
      autoplay
      speed={1.5}
      loop
      src="./farmer.json"
      style={{
        height: "auto",
        width: "85%",
      }}
    />
)
}

export default Animation