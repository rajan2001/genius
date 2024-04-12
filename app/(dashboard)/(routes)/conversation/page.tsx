"use client";

import Heading from "@/components/heading";
import { TreePine } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { formSchema } from "./constants";
import { useEffect, useState } from "react";

import Loader from "@/components/loader";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Empty from "@/components/empty";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InformationCard from "@/components/InformationCard";

const ConversationPage = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [crops, setCrops] = useState([]);
  const [info, setInfo] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      city: "",
    },
  });

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

  const handleSearch = async () => {
    await fetch(`http://localhost:3001/cities/crops/info?crop=Rice&city=RAMGARH`)
      .then((res) => res.json())
      .then((res) => setInfo(res));
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
        <div className="grid grid-cols-3 grid-rows-2 border-stone-200 rounded border-2 p-6 gap-4">
          <Select onValueChange={(e) => handleState(e)}>
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

          <Select
            onValueChange={(e) => handleCity(e)}
            disabled={cities.length === 0}>
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

          <Select disabled={crops.length === 0}>
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
          <div className=" col-start-1 col-span-full">
            <Button
              className="w-full"
              disabled={crops.length === 0}
              onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {/* {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted h-full">
              <Loader />
            </div>
          )}
           (
            <div>
              <Empty label="No conversation started" />
            </div>
          ) */}
          <div className="flex flex-col gap-y-4">
            <InformationCard info={info} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
