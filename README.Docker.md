# Building and running your application

Before, create a .env.local with the variables sent

When you're ready, start your application by running:
`docker build -t news-website .`
Then, run
`docker run -p 3000:3000 news-website`

Your application will be available at <http://localhost:3000>.

## References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
