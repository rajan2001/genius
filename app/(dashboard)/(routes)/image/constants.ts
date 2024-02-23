import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(2).max(50),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photos",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  },
];

export const resolutionOptions = [
  {
    value: "256*256",
    label: "256*256",
  },
  {
    value: "512*512",
    label: "512*512",
  },
  {
    value: "1024*1024",
    label: "1024*1024",
  },
];
