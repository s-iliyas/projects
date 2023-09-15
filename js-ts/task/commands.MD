# COMMANDS

## Start postgres in ubuntu and bash

```bash
sudo systemctl start postgresql.service
sudo -i -u postgres psql
```

## Sequilize related

- Creates models and migration folders.

```bash
npx sequelize-cli init
```

- Change config.json file to config.js in config folder and assign that object to module.exports.

- Add following data to .sequelizerc file in root dir.

```bash
const path = require('path');
module.exports = {
    "config": path.resolve('./config', 'config.js'),
    "models-path": path.resolve('./models'),
    "migrations-path": path.resolve('./migrations'),
    "seeders-path": path.resolve('./seeders')
}
```

- Change file name(config.json ---> config.js) in index.js of models folder.

- Add NODE_ENV key name with value as ("development"|"production"|"test") to .env file.

- To Create Model.

```bash
npx sequelize-cli model:generate --name <model-name> --attributes firstName:string,lastName:string,email:string..............(extra-fields)
```

- To migrate.

```bash
npx sequelize-cli db:migrate
```

- To create empty migration file.

```bash
npx sequelize-cli migration:generate --name <file-name>
```
