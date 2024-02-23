import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"


function BotAvatar() {
  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={'/logo.png'} className="p-1"/>
      </Avatar>
    </div>
  )
}

export default BotAvatar
