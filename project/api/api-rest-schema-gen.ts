import { generateApi } from 'swagger-typescript-api';
import * as path from 'path';
// import dotenv from 'dotenv';

(async () => {
  // dotenv.config();

  await generateApi({
    name: 'typing.ts',
    output: path.resolve(process.cwd(), './src/generated'),
    url: 'http://localhost:8000/docs-api-json',
    httpClientType: 'axios',
    generateClient: true,
    generateResponses: true,
    unwrapResponseData: true,
    sortTypes: true,
  });
})();
