import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink, HttpLinkHandler } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { HttpHeaders } from '@angular/common/http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';




@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                const handler: HttpLinkHandler = httpLink.create({
                    uri: 'https://ramu420.herokuapp.com/v1alpha1/graphql',
                    get headers() {
                        const authToken = (JSON.parse(localStorage.getItem('auth')) || {}).idToken;
                        return new HttpHeaders({ 'Authorization': 'Bearer ' + authToken });
                    }
                });

                const WS_URL = `wss://ramu420.herokuapp.com/v1alpha1/graphql`;

                const wsLink = new WebSocketLink(
                    new SubscriptionClient(WS_URL, {
                        reconnect: true,
                        timeout: 9000,
                        connectionParams: {
                            get headers() {
                                const authToken = (JSON.parse(localStorage.getItem('auth')) || {}).idToken;
                                return {
                                    'Authorization': 'Bearer ' + authToken,
                                }
                            }
                        }
                    })
                );

                const link = split(
                    // split based on operation type
                    ({ query }) => {
                        const { kind, operation } = getMainDefinition(query);
                        return kind === 'OperationDefinition' && operation === 'subscription';
                    },
                    wsLink,
                    handler,
                );
                return {
                    cache: new InMemoryCache(),
                    link: link,
                };
            },
            deps: [HttpLink]
        },
    ],
})
export class GraphQLModule { }
