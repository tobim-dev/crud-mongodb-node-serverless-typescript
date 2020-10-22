import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createConnection from "../shared/mongoose";
import {LifeAreaSnapshot, LifeAreaSnapshotSchema} from "../models/lifeAreaSnapshot.model";

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    const { db } = await createConnection();
    const { userId } = req.params;

    const LifeAreaSnapshots = db.model<LifeAreaSnapshot>(
        "LifeAreaSnapshots",
        LifeAreaSnapshotSchema
    );
    const body = await LifeAreaSnapshots.find({ userId: userId }).exec();

    context.res = {
        status: 200,
        body,
    };
};

export default httpTrigger;
