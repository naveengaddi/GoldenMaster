### EverestEngineering Internal Workshop
# The League - migrating from a legacy codebase

This is a "starter template" repo with Jest, Prettier and Babel configured ready to go.
There's also setup for trying out the "Golden Master" strategy.

```shell
git clone https://github.com/FaizuddinEverest/the-league.git
git remote remove origin
npm i
npm test
```

Also includes `babel-node`, so run the app (not for production) with:
```shell
npx babel-node game.js
```

You can also generate a new "golden master". Run:
```shell
npm run snap
```

To run the golden master tests:
```shell
npm test
```

Read more about Babel and Babel Node here: https://babeljs.io/docs/en/babel-node

For more, visit [https://everest.engineering](https://everest.engineering).
