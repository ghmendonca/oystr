import { LinkDetails } from "./LinkDetails";

export interface PageDetails {
    title: string

    doctype?: string

    links: LinkDetails[]

    internalLinks?: number

    externalLinks?: number

    htmlVersion?: string
}