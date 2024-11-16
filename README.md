# zoofpay

Easily create payment requests for Cardano
[zoofpay.com](https://zoofpay.com/)

## Contributing

Contributions are always welcome.
Feel free to create an issue or pull request.

### Development

##### Install dependencies

1. Clone repository:

```bash
git clone git@github.com:sempruijs/zoofpay.git
```
Make sure you install [npm]()https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or install the required dependencies with Nix:

```bash
nix develop
```

Then go to the site folder and install with npm:

```bash
cd site
npm install
npm install @meshsdk/core @meshsdk/react
```

Then, run the dev enviourment with:

```bash
npm run dev
```

Or build the project with

```bash
npx next build
```

I hope this will be a nix flake someday.

## License

Apapche 2.0

## Disclaimer

This is not financial advice. I'm not responsable for any asset losses. Do your own research.


