"use client";

import Heading from "@/components/heading";
import { MessageSquare, TreePine } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { formSchema } from "./constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Empty from "@/components/empty";
import { cn } from "@/lib/utils";
import UseAvatar from "@/components/use-avatar";
import BotAvatar from "@/components/bot-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [crops, setCrops] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      city: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: `what type of seeds are required for farming ${values.farming} in ${values.city} explain in Hindi`,
      };

      const response = await axios.post("/api/conversation", {
        messages: userMessage,
      });

      setMessages((current) => [response.data, userMessage, ...current]);

      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  useEffect(() => {
    const StateData = async () => {
      await fetch("http://localhost:3001/states")
        .then((res) => res.json())
        .then((res) => setStates(res));
    };

    StateData();
  }, []);

  const handleState = async (e: any) => {
    await fetch(`http://localhost:3001/states/cities?name=${e}`)
      .then((res) => res.json())
      .then((res) => setCities(res));

      
  };

  const handleCity = async (e: any) => {
    await fetch(`http://localhost:3001/cities/crops?name=${e}`)
      .then((res) => res.json())
      .then((res) => setCrops(res));
  };

  return (
    <div>
      <Heading
        title="Seeds Selection"
        description="Our most advanced seeds selection model"
        icon={TreePine}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-3 border-stone-200 rounded border-2 p-6 gap-4">
          <Select onValueChange={(e) => handleState(e)} >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state: any) => (
                <SelectItem key={state.name} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(e) => handleCity(e)} disabled={cities.length === 0}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city: any) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select disabled={crops.length === 0} >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Crops" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop: any) => (
                <SelectItem key={crop.name} value={crop.name}>
                  {crop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted h-full">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No conversation started" />
            </div>
          )}
          <div className="flex flex-col gap-y-4">
            {messages.map((message: any) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}>
                {message.role === "user" ? <UseAvatar /> : <BotAvatar />}
                <Markdown
                  className="overflow-hidden text-lg leading-7"
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 p-4 rounded-lg bg-black/10">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-4" {...props} />
                    ),
                  }}>
                  {message.content || ""}
                </Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
