# Playwith CLI

This command-line tool allows you to create scripts within a project that can having all the contexts and packages of the nodejs app or module

## Installation

```sh
> npm i -g playwith-cli
```


## Usage

### init
In order to use playwith in your project you first have to initialize it in the root directory of your project.

You can do that my running the command below

```sh
> playwith init
```

This creates a `.playground` folder in your repository and this is where you will create your scripts


### Run file
After creating your script inside `.playground`, you can now run it by calling playwith like so:

```sh
> playwith test1.js
```

Note that `test-file.js` is found in the `.playground` directory


## Todo

- [  ] Add .playground folder to .gitignore during initialization
