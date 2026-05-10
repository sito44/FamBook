// server.js
const port = 3000;
const server = Bun.serve({
  port: port,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    if (path === "/") path = "/index.html";
    
    const file = Bun.file(`./dist${path}`);
    
    // Serve index.html if the file doesn't exist (Single Page App routing)
    if (file.size === 0) {
      return new Response(Bun.file("./dist/index.html"));
    }
    
    return new Response(file);
  },
});

console.log(`🚀 Bun is serving at http://localhost:${port}`);
