import { type ClientSchema, a, defineData, PredicateBuilder, PredicateFunctions } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
    })
    .authorization([
      a.allow.owner({ operations: [a.operations.create(), a.operations.read(), a.operations.update(), a.operations.delete()]] }),
      a.allow.public().to(['read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

// Utility function to fetch todos with a given filter
export const fetchTodos = async (filter?: PredicateFunctions<Schema, 'Todo'>): Promise<Schema['Todo'][]> => {
  const client = generateClient<Schema>();
  const queryBuilder = client.models.Todo.query;
  const predicate = filter ? queryBuilder.where(filter) : undefined;
  const { data } = await queryBuilder.get({ predicate });
  return data;
};

// Utility function to generate a Data client for CRUDL requests
export const generateClient = <T extends ClientSchema>(schema: T): T['API'] => {
  return (window as any).Amplify.DataStore(schema);
};
