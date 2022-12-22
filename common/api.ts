import { makeApi } from "@zodios/core";
import { z } from "zod";

const userApi = makeApi(
  [
    {
        method: "get",
        path: "/",
        alias: "", 
        description: "Home Page",
        response: z.object({ ok: z.date() }),
    },
    {
    method: "get",
    path: "/practitioners",
    alias: "getPractitioners", 
    description: "Get Practitioners",
    response: z.array(
        z.object({
            phoneNumber: z.string().length(11),
            website: z.string(),
            languages: z.string(),
            modality: z.string(),
            businessLocation: z.string(),
            businessName: z.string(),
            minAgeServed: z.number(),
            email: z.string().email(),
            fullName: z.string()
        })),
    },
]);

export default userApi;