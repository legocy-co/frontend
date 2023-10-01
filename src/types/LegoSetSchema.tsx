import { z } from 'zod';
import {LegoSeriesSchema} from "./LegoSeriesSchema";

const LegoSetSchema = z.object({
    id: z.number(),
    name: z.string(),
    number: z.number(),
    n_pieces: z.number(),
    series: LegoSeriesSchema,
});

type LegoSetType = z.infer<typeof LegoSetSchema>;

export {LegoSetSchema,  type LegoSetType};