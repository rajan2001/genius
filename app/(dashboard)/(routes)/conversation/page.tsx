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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

const Crops = [
  "Cotton",
  "Jute",
  "Oilseeds",
  "Sugarcane",
  "Tobacco",
  "Rice",
  "Wheat",
  "Millets",
  "Maize",
  "Pulses",
  "Tea",
  "Coffee",
  "Rubber",
];

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
      await fetch(
        "https://countriesnow.space/api/v0.1/countries/states/q?country=India"
      )
        .then((res) => res.json())
        .then((res) => setStates(res.data.states));
    };

    StateData();
  }, []);

  const handleChange = async (e: any) => {
    await fetch(
      `https://countriesnow.space/api/v0.1/countries/state/cities/q?country=India&state=${e}`
    )
      .then((res) => res.json())
      .then((res) => setCities(res.data));
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
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 grid grid-cols-12 grid-rows-2 gap-2 focus-whithin:shadow-sm ">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-4">
                    <FormControl className="m-0 p-0">
                      <Select onValueChange={(e) => handleChange(e)}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-4 w-full h-full">
                    <FormControl className="m-0 p-0">
                      <Select
                        disabled={cities.length === 0}
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city: any) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="farming"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-4 w-full h-full">
                    <FormControl className="m-0 p-0">
                      <Select
                        disabled={cities.length === 0}
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Crops" />
                        </SelectTrigger>
                        <SelectContent>
                          {Crops.map((crop) => (
                            <SelectItem value={crop} key={crop}>
                              {crop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="col-span-12 ">
                Generate
              </Button>
            </form>
          </Form>
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
