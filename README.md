# ca-manage-client

## how to start local development

1. npm install
2. STAGE=local
3. npm run dev (or npm run dev-min for minified version)

open https://localhost

## how to start local development remotely

1. contact wobeng@yblew.com to create an account 
2. cd working directory
3. /usr/local/bin/ang

open your personal url

## how to build for env_name

1. npm install
2. STAGE=local
3. npm run build

`npm run build` uses `npm run prod` and `npm run seo` commands under the hood

- `STAGE` environment variable is used to point to config file in /src/stages/env_name.json
- `PROXY_API` env variable is used with `npm run dev`  to proxy back-end endpoints to relative API_URL so you don't have to deal with CORS.
**default** is https://dev-api-manage.caseactive.net

## Developers notes

Added babel and ES6, so app could be refactored. Also added ng-annotate so explicit annotations could be removed.

Beware: angular-gettext translations directive have issues working with html-escaped characters starting with ampersand like 
         
         &#34; &#39;