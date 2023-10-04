
import { z } from "zod";
const clientCreateSchema = z.object({
  body: z
    .object({
      clientName: z
        .string({
          required_error: "Client Name is required.",
        })
        .max(50)
        .min(5),
    })
});



export { clientCreateSchema };
