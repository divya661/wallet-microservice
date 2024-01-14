docker-compose build
docker-compose up

Remember to handle database migrations to create the necessary tables in your MySQL database. You can use Sequelize CLI for this purpose:

bash
Copy code
npx sequelize-cli db:migrate
This example assumes you have Sequelize CLI installed (npm install -g sequelize-cli).

You can use environment variables to specify the environment in which your application is running. The config package will automatically load the appropriate configuration file based on the NODE_ENV environment variable.
 If NODE_ENV is not set, it will default to development.
 
For example, in your development environment:
export NODE_ENV=development

In your production environment:
export NODE_ENV=production

npm install --save-dev sequelize-cli
sequelize --version
sequelize init
sudo npx sequelize-cli model:generate --name Wallet --attributes balance:float,name:string
npx sequelize-cli model:generate --name Transaction --attributes walletId:integer,amount:float,description:string,type:string,balance:float
npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name demo-wallet
npx sequelize-cli db:seed:all
