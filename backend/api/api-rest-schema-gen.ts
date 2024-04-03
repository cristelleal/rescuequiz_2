import { generateApi } from 'swagger-typescript-api';
import dotenv from 'dotenv';

(async () => {
  dotenv.config();

  await generateApi({
    name: 'typing.ts',
    output: './src/api',
    url: 'http://localhost:8000/api-docs-json',
    httpClientType: 'axios',
    generateClient: true,
    generateResponses: true,
    unwrapResponseData: true,
    sortTypes: true,
  });
})();
