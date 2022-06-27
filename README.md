# Migrating from a legacy codebase
EverestEngineering Internal Workshop to deal with legacy code using the [Golden Master](https://en.wikipedia.org/wiki/Mastering_(audio)) Testing strategy.

> Mastering, a form of audio post production, is the process of preparing and transferring recorded audio from a source containing the final mix to a data storage device (the master), the source from which all copies will be produced (via methods such as pressing, duplication or replication).

This is a "starter template" repo with Jest, Prettier and Babel configured ready to go.
There's also setup for trying out the "Golden Master" strategy:

```shell
git clone https://github.com/FaizuddinEverest/the-league.git
git remote remove origin
npm i
npm run snap
npm test
```

You can snap (or generate) a new "golden master" with:
```shell
npm run snap
```

To run tests against the golden master:
```shell
npm test
```

### Random data with seeding
This repo uses [@faker-js/faker](https://fakerjs.dev/) to seed random data.

For more, visit [https://everest.engineering](https://everest.engineering).
