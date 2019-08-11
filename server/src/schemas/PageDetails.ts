import { ObjectType, Field } from "type-graphql";
import { LinkDetails } from "./LinkDetails";

@ObjectType()
export class PageDetails {
    @Field(type => String)
    title: string

    @Field(type => String, { nullable: true })
    doctype?: string

    @Field(type => [LinkDetails])
    links: LinkDetails[]

    @Field(type => Number, { nullable: true })
    internalLinks(): number {
        return this.links.filter(link => link.internal).length
    }

    @Field(type => Number, { nullable: true })
    externalLinks(): number {
        return this.links.filter(link => !link.internal).length
    }
    
    @Field(type => String, { nullable: true })
    htmlVersion(): string {
        if (!this.doctype) {
            return 'Quirks mode (no DOCTYPE found)'
        } else if (/4.01|4.00/.test(this.doctype)) {
            return 'HTML4'
        } else if (this.doctype.toLocaleLowerCase() === '<!DOCTYPE html>'.toLocaleLowerCase() || this.doctype.toLocaleLowerCase() === '<DOCTYPE html>') {
            return 'HTML5'
        } else {
            return 'Could not determine html version'
        }
    }
}