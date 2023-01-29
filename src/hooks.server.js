import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private"

const authentication = SvelteKitAuth({
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })
  ],
  pages: {
    // signIn: '/signin',
    signOut: '/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
})

async function authorization({ event, resolve }) {
  // Protect any routes under /authenticated
  if (event.url.pathname.startsWith('/authenticated')) {
 const session = await event.locals.getSession();
      if (!session) {
          throw redirect(303, '/auth');
      }
  }

  // If the request is still here, just proceed as normally
  const result = await resolve(event, {
      transformPageChunk: ({ html }) => html
  });
  return result;
}

const db = (async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/db')) {
    const url = event.url.href.replace(event.url.origin + '/db', 'https://2e6d495a-848e-430a-8731-2e5d6a8d14cc-bluemix.cloudantnosqldb.appdomain.cloud/enque');
    const credentials = Buffer.from("brian:password").toString('base64')
    const headers = { 
      "Authorization" : `Basic ${credentials}`,
      'Content-Type': 'application/json'
    }

    console.log(JSON.stringify(event));
    const opts = {
      ...event,
      headers : headers,
      method: event.request.query.get("_method").toUpperCase(),
      url
    }
    console.log(JSON.stringify(opts));
    const fetchObj = await fetch(
        url,
        opts
    );
    const result = await fetchObj.json();
    console.log(JSON.stringify(result));
    return new Response(JSON.stringify(result));
  }
 
  return await resolve(event);
});

export const handle = sequence(db, authentication, authorization);
