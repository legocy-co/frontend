import {LegoSetSchema, LegoSetType} from "../types/LegoSetSchema";
import {LegoSeriesSchema} from "../types/LegoSeriesSchema";


const GetLegoSetsList = async(): Promise<LegoSetType[]> => {
    const legoSetTest = LegoSetSchema.parse({
        "id": 1,
        "name": "Batmobile Tumbler",
        "number": 76240,
        "n_pieces": 2049,
        "series": LegoSeriesSchema.parse({
            "id": 1,
            "name": "DC Superheroes"
        })
    })
    return [legoSetTest]
};