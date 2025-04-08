---
title: Provider API Examples
description: IOmeter Provider API Examples
---
# Provider API Examples

In the following we provide some simple examples on how to interact with the provider API. The main two aspects are quering and subscribing to the GrapQL API.

## Query
To query the API, we recommend utilizing a GraphQL library such as [gql](https://github.com/graphql-python/gql) for Python. In the example below, we demonstrate a basic query to retrieve the provider ID and name. This serves as an introductory example to familiarize you with interacting with a GraphQL API.

```python
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Initialize transport with headers for authorization
transport = AIOHTTPTransport(
    url="https://provider-api.prod.iometer.cloud/v1/query",
    headers={
        "Authorization": "Basic ADD YOUR TOKEN HERE"
    }
)

# Create client
client = Client(transport=transport, fetch_schema_from_transport=True)

# Define query
query = gql("""
query Provider {
  provider {
    id
    name
  }
}
""")

# Execute the query
result = client.execute(query)
print(result)
```

If you want to get fancy you can use something like [Ariadne Code Generator](https://github.com/mirumee/ariadne-codegen/) to generate a fully typed Python client for quering the GraphQL API. For that you need the schema, which you can get by [introspection](https://graphql.org/learn/introspection/). For that you can use the [gql-cli](https://gql.readthedocs.io/en/stable/usage/validation.html) of the gql python package.

## Subscriptions
Subscriptions use the [WebSocket Protocol](https://gql.readthedocs.io/en/latest/transports/websockets.html). It is important to specify the WebSocket protocol indicator (*wss*) in the URL to establish a connection. In the example below, we demonstrate subscribing to all readings from the past 24 hours. The time frame for the readings can be customized using the *startTime* parameter. For additional details, please refer to the API documentation.

```python
import asyncio
import json
import os
from datetime import datetime, timedelta, timezone

from gql import Client, gql
from gql.transport.websockets import WebsocketsTransport

async def main():

    # Initialize transport with headers for authorization
    transport = WebsocketsTransport(
        url="wss://provider-api.prod.iometer.cloud/v1/query",
        init_payload={"Authorization": "Basic ADD YOUR TOKEN HERE"},
    )
    
    # Define subscription
    subscription_query = gql("""
    subscription Readings($startTime: DateTime) {
      readings(startTime: $startTime) {
        meter {
          id
          number
        }
        installation {
          id
          externalId
        }
        time
        receiveTime
        values {
          obisCode
          value
          unit
        }
      }
    }
    """)

    # Define the time range for data (last 24 hours)
    now = datetime.now(timezone.utc)
    time_24h_ago = now - timedelta(hours=24)
    rfc3339_timestamp = time_24h_ago.strftime("%Y-%m-%dT%H:%M:%SZ")
    params = {"startTime": rfc3339_timestamp}
    
    # Connect and start subscription
    async with Client(transport=transport, fetch_schema_from_transport=True) as session:
        async for result in session.subscribe(
            subscription_query, variable_values=params
        ):
            if result and "readings" in result:
                reading = result["readings"]
                
                # Print the received data
                print("\n=== New Reading Received ===")
                print(f"Meter: {reading['meter']['number']}")
                print(f"Installation: {reading['installation']['externalId']}")
                print(f"Time: {reading['time']}")
                print(f"Receive Time: {reading['receiveTime']}")
                print("Values:")
                for value in reading["values"]:
                    print(f"  • {value['obisCode']}: {value['value']} {value.get('unit', '')}")

if __name__ == "__main__":
    # Run the async function
    asyncio.run(main())
```