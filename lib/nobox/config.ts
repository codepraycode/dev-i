import { Config, getFunctions, getRowedSchemaCreator } from "nobox-client";
import { getKeyGroupSchemaCreator } from "nobox-client/lib/create-schema/create-key-group-schema";



const endpoint = process.env.NOBOX_API || process.env.NEXT_PUBLIC_NOBOX_API || "https://api.nobox.cloud"
const project = process.env.NOBOX_PROJECT || process.env.NEXT_PUBLIC_NOBOX_PROJECT
const token = process.env.NOBOX_TOKEN || process.env.NEXT_PUBLIC_NOBOX_TOKEN

if (!project) {
    throw new Error("NOBOX_PROJECT is not provided")
}

if (!token) {
    throw new Error("NOBOX_TOKEN is not provided")
}


export const config: Config = {
    endpoint,
    project,//"hey",
    token //"mauan_39amydpd4l2m179mnl7os5jnv4hvzdiu1_"
};

export const nobox_api = `${config.endpoint}/${config.project}`
export const nobox_token = `Bearer ${config.token}`

export const createSchema = getRowedSchemaCreator(config);
export const createKeyValue = getKeyGroupSchemaCreator(config);
export const Nobox = getFunctions(config);
