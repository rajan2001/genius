import * as z from 'zod'

 export const formSchema = z.object({
  state: z.string(),
  city:z.string(),
  farming:z.string()
})