import { ResolverService } from "@tsed/graphql";
import { PageDetails } from "../schemas/PageDetails";
import { Query, Arg } from "type-graphql";
import { WebService } from "../services/WebService";

@ResolverService(PageDetails)
export class WebResolver {
    @Query(returns => PageDetails)
    async getPageDetails(
        @Arg('url')
        url: string
    ): Promise<Partial<PageDetails>> {
        const webService = new WebService(url)
        return await webService.getAllDetails()
    }
}