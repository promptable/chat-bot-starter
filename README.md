Hello, World!

🙂 🌈


<img width="1342" alt="Screen Shot 2022-12-13 at 11 25 51 AM" src="https://user-images.githubusercontent.com/5430709/207388600-c59370c8-36e0-4c13-80e5-d355ebfbc07c.png">


## Join our discord!
If you have any questions post them here! This is still a WIP.
https://discord.gg/SYmACWTf6V


## Getting Started
For detailed instructions on setting up the project, check the 'Setup Guide' section. Make sure to fill out the .env file with necessary credentials. For details of each environment variable, refer to the 'Environment Variables' section.
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

## System Overview
This application consists of a frontend and a backend system. The frontend is built with Next.js and Tailwind CSS. It handles rendering of the interface that users interact with. The backend handles requests from the frontend and interacts with the database. It is built with Express.js.

## Architecture
The frontend and backend are separate entities. They communicate through APIs, with the backend offering RESTful APIs. The major API endpoints include '/api/projects' for projects-related functionalities, '/api/users' for handling user data, and '/api/auth' for authentication related tasks.

```
Below is a conversation between a knowledgable, helpful, and witty AI assistant and a user, who has some questions about a topic.
The AI assistant is able to answer the user's questions and provide additional information about the topic. The AI assistant is able to
keep the conversation focused on the topic and provide relevant information to the user. The closer the AI agent can get to
answering the user's questions, the more helpful the AI agent will be to the user.

CHAT HISTORY:
{{input}}
Assistant:
```

## Functionalities
The core features of this application include:
- User registration and login
- Project creation, update, and deletion
- Browsing existing projects
- Applying for projects
- Reviewing applications for project owners




## User Guides
We have several guides to help you make the most out of this project. They include how to setup your local development environment, how to deploy the application, and how to use the application as an intern, as a startup, or as a site administrator.

<!-- Removed content
## How do I deploy this?

## SMS Support with Twilio (Optional)

## GPT3 Example Integration

## TODOs/ Feature Requests

-->
```
twilio phone-numbers:update PHONE_NUMBER --sms-url https://RANDOM_STRING.ngrok.io/messages
```

You'll need the Twilio CLI installed. You'll need to "upgrade" to paid if you want to remove the Twilio branding from the SMS replies.

### Dependencies

Install the dependencies:

```bash
npm install
```

### Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Fill in your TWILIO and OPENAI Keys, and your personal PHONE_NUMBER.

### Compile the TypeScript to JavaScript

Compile the project:

```bash
npm run build
```

Note that this runs the TypeScript compiler, `tsc`, you could also run `npx tsc` to get the same output.

The TypeScript project will be compiled into the `dist` directory. You can also continuously compile the project as it changes with:

```bash
npm run watch
```

### Run the project

Start the web server with:

```bash
npm start
```

### Expose the local server with ngrok

To respond to an incoming webhook you will need a publicly available URL. [ngrok](https://ngrok.com) is a tool that can tunnel through from a public URL to your machine. Once you've [downloaded and installed ngrok](https://ngrok.com/download) you can run it like so:

```bash
ngrok http 3000
```

The ngrok terminal will show you a URL, like `https://RANDOM_STRING.ngrok.io`.

### Connect your phone number to your app

Using the ngrok URL from the last part, you can set up your Twilio phone number with your application. [Edit your phone number](https://www.twilio.com/console/phone-numbers/incoming) and in the Messaging section, next to when "A message comes in" enter your ngrok URL with the path `/messages`.

```
https://RANDOM_STRING.ngrok.io/messages
```

Save the phone number and you are ready. Send your number a message and receive a reply. Type "reset" to reset the chat thread history and bdeing again.

## GPT3 Example Integration

```ts
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Please reply to the chat below:\n",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
```

## TODOs/ Feature Requests

TODO: Add Voice Chats:
- https://www.twilio.com/docs/voice/twiml/say/text-speech
- https://www.twilio.com/blog/programmable-voice-javascript-quickstart-demo-node
