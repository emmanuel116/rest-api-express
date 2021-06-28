const app = require('./app')
const { config } = require('./config')
const chalk = require('chalk')

app.listen(
  config.port,
  console.log(
    chalk.bgWhite.black(
      ` Server on port ${config.port} ::: Powerade by ZadrielDev `
    )
  )
)
