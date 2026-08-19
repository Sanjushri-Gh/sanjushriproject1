export async function GET() {
  const content = `# Sanjushri Project

> Information about the Sanjushri Project website.

## Main Pages

- [Home](https://YOUR-DOMAIN.com/)
- [About](https://YOUR-DOMAIN.com/about)
- [Contact](https://YOUR-DOMAIN.com/contact)

## About

This website contains information about the Sanjushri Project.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}