import { z } from 'zod';
import {LegoSetSchema} from "./LegoSetSchema";


const LegoSeriesSchema = z.object({
    id: z.number(),
    name: z.string(),
});


type LegoSeriesType = z.infer<typeof LegoSetSchema>;

export {LegoSeriesSchema, type LegoSeriesType};