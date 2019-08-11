import { ServerLoader, ServerSettings, $log } from "@tsed/common";
import { IGraphQLSettings } from "@tsed/graphql";
const rootDir = __dirname;

@ServerSettings({
    rootDir,
    httpPort: 80,
    httpsPort: 443,
    acceptMimes: ["application/json"],
    componentsScan: [
        "${rootDir}/services/**/*.ts",
        "${rootDir}/resolvers/**/*.ts"
    ],
    graphql: {
        'server1': {
            path: '/graphql',
            buildSchemaOptions: {
                resolvers: [
                    '${rootDir}/resolvers/**/*.ts'
                ]
            },
            serverConfig: {
                formatError: error => {
                    $log.error(error);
                    return error;
                }
            }
        } as IGraphQLSettings
    }
})
export class Server extends ServerLoader {

}