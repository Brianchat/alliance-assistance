import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export function GET({ request, url }) {
  const upgradeHeader = request.headers.get('Upgrade');
    if (!upgradeHeader || upgradeHeader !== 'websocket') {
      return new Response('Expected Upgrade: websocket', { status: 426 });
    }
  
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);
  
    server.accept();
    server.addEventListener('message', event => {
      console.log(event.data);
      server.send(`Received: ${event.data}`)
    });
    server.send('CONTACT');
  
    return new Response(null, {
      status: 101,
      webSocket: client,
    });
}