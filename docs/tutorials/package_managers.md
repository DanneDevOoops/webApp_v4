# Package Managers
To install the required packages for the application we will need a package manager. There are 
several package managers available for JavaScript, but the most popular are `npm` and `yarn`. In 
this tutorial, we will use `yarn`. Make sure you have `LTS version 20.19.0 of Node.js` 
installed on your machine before you proceed as the project requires it.

First `node packaget manager` aka `npm` comes with `Node.js` and thats totally fine to use, there 
is no need to move forward with installing `yarn` if you are comfortable with `npm` and like to 
skip this part. However, if thats your intention then you must locate and remove the `yarn.lock` 
file from the `project root directory` to later be replaced with `package-lock.json` file upon 
running the `npm install` command.

## Node Package Manager (NPM)

![NPM logotype](https://drive.google.com/file/d/1cxCA_3ctT6vem6IyzF2aPmtfn02WgwSf/view?usp=share_link)

Place yourself at the `project root directory` and run the following command to install all
dependencies using `npm` instead of `yarn`:

```sh
rm -rf yarn.lock && npm install
```
or install all dependencies including the development specific ones with:
```sh
rm -rf yarn.lock && npm install --save-dev
```

## Yarn

![Yarn logotype](https://drive.google.com/file/d/1cqubQ_kExwJSkG6x0W43ZfrTc3iqAMuQ/view?usp=share_link)

If you prefer to use `yarn` and do not have it installed, there are two ways to install it. 
Alternative one would be that you use `npm` to install `yarn` globally. This will place yarn in 
you global `node_modules` directory and you can use it from anywhere in your system. Remember 
there are caveats to this approach but most likely you might never run into them. This is a good 
approach and the easiest of ways to install `yarn`.

With this command you will install `yarn` globally using `npm`:
```sh
npm install --global yarn
```

Then install the application dependencies using `yarn`:
```sh
yarn install
```
or install all dependencies including the development specific ones with:
```sh
yarn install --dev
```

The yarn run command is.
```shell
yarn run <package.json script here>
```

Make sure to read through the help command for a full list of commands and options available.
```sh
yarn --help
```

## Bun
![Bun logotype](https://drive.google.com/file/d/1cbHq5teCLcn8N8N-t8gCioMph6CxmioX/view?usp=share_link)  

The `bun` package manager is a simple package manager for JavaScript that is written in `zig`. 
This is last years new kid on the block as of the time of writing this tutorial. It is a very 
fast package manager and is very easy to use. It is also considered a full drop-in replacement for
both `node.js` and `npm (or yarn)` as it leverage a different runtime environment. It uses the 
`JavaScriptCore` runtime witch is different from the famous `Google V8` runtime used by `node.
js`. This package manager is great but it is slightly different then the standard once we all 
love/hate. Personal preference, this is my new favourite package manager for all things JS/TS so 
try it if it makes you curious. ;)

To install `bun` you can use the following command:
```sh
curl -fsSL https://bun.sh/install | bash
```

-**Note:** `bun` have sevral other capabilities that are not covered in this tutorial. As an 
example `bun` includes a `API` much like the `express.js` and other features as well.  
Check it out at the [official bun website](https://bun.sh).

Now you need to add a small configuration to the file `eas.json`. This is for `EAS` build 
processes to know what version of `bun` you have installed and to use it. Detailed description 
[here](https://docs.expo.dev/guides/using-bun/#use-bun-for-eas-builds). First we must know the  
version of `bun` you have installed. In case you do not know from the installation you  can do  
this by running the following command:
```sh
bun --version
```

Now add the version of `bun` you have installed to the `eas.json` file:
```json
{
  "build": {
    "development": {
      "bun": "<the version of bun you have installed like ex. '1.0.0' or '1.0.1'>"
    }
  }
}
```

Due to a few differences in the way `bun` works compared to `npm` and `yarn` you might have to 
checkout the `bun` documentation on the topic of [`trusted dependencies`](https://docs.expo.
dev/guides/using-bun/#trusted-dependencies) to make sure you can build you application without 
any issues. This may or may not be an issue due to what packages the application is using.

Install the application dependencies using `bun`:
```sh
bun install
```
or install all dependencies including the development specific ones with:
```sh
bun install --dev
```

As with all other package managers you have the basic run command.
```sh
bun run <package.json script here>
```

Make sure to read through the help command for a full list of commands and options available.
```sh
bun --help
```

> ---
> ✅ **Done:**  
> By now you should have installed the required packages for the application using one of the
> package managers mentioned above or another that you may prefer even better then these options.
> ---
