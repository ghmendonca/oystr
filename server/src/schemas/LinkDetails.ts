import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LinkDetails {
    @Field(returns => String, {nullable: true})
    url?: string

    @Field(returns => String)
    text: string

    @Field(returns => Boolean)
    internal: boolean
}