*This is a submission for the [Auth0 for AI Agents Challenge](https://dev.to/challenges/auth0-2025-10-08)*

## What I Built
I build an AI agent named **Snape** that can supervise your GitHub account seamlessly.

Just enter `List my repositories` and the Snape will summarize your all GitHub repositories

## Demo
Live demo: [Agent Snape](https://agentsnape.vercel.app)

#### Here's some screenshots:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/znkmjqpqick4dotpcvve.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oft8mavzhthg018p48wr.png)

## How I Used Auth0 for AI Agents
- **Authentication and session management**: I used Auth0's login and logout functionalities to manage users identification. And also `getSession` function and `useUser` hook for session management.
- **Secure AI on user's behalf**: I used Auth0's token vault to get users GitHub token

```tsx
const github = new Octokit({ auth: token });

const { data } = await github.request("GET /user/repos", {
  visibility: "all",
});
```

Snape has a check-point protected by *auth0*. It can't do anything without Auth0 permission given by *Auth0 token vault*.

## Lessons Learned and Takeaways
By doing this project *I have learn the importance of securing AI agent* and *how [Auth0](https://auth0.com/ai/)'s features simplify the overall process*.

### Takeaways

1. Manage which APIs the agent can use on the user's behalf.
2. Limit agent's knowledge.

## Tech stack I used during the project
- Next.js 15
- Vercels AI-SDK
- Auth0 for AI agents
- HuggingFace free inference provider
- Github's Octokit SDK
