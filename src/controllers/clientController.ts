import { prisma } from "../prismaClient";
import { Request, Response } from "express";

// export default {
//   createClient: async (req: Request, res: Response) => {
//     const { clientName } = req.body ?? {};
//     const client = await prisma.clientProject.create({
//       data: {
//         clientName: clientName
//       },
//     });
//     res.json(client);
//   }
// };
