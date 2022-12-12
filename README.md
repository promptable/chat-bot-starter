# ChatGPT Web App with React/Next.js
<img width="1507" alt="Screen Shot 2022-12-12 at 5 23 58 PM" src="https://user-images.githubusercontent.com/5430709/207168087-74e9e2dc-637d-4edd-80de-e10cc1d7a7d6.png">

## Getting started

1. Copy `.env.example` to `.env`
2. Add `OPEN_AI_KEY` to the `.env` file

```
OPENAI_API_KEY=<YOUR KEY HERE>
```

3. Generate and add NEXTAUTH_SECRET to `.env` file

```
# Next Auth
# You can generate the secret via 'openssl rand -base64 32' on Linux
NEXTAUTH_SECRET=
```

4. Install and run

```
yarn
yarn dev
```

## Deploy

Deploy to fly.io

1. Create fly account
2. Download fly cli `brew install flyctl`
3. Run Fly Launch `flyctl launch`
4. update fly.toml internal port to 3000
5. `fly secrets set --app gpt3-chat TWILIO_ACCOUNT_SID= TWILIO_AUTH_TOKEN= TWILIO_PHONE_NUMBER= OPENAI_API_KEY= etc...`
6. `fly deploy --local-only`

## T3 Stack

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
