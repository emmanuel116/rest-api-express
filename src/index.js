import app from './app'
import config from './config'
import chalk from 'chalk'

app.listen(
  config.port,
  console.log(
    chalk.bgWhite.black(
      ` Server on port ${config.port} ::: Powerade by ZadrielDev `
    )
  )
)
