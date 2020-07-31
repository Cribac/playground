### thera2stain

[NodeJs](https://nodejs.org/en/) command line script for [Eve Online](https://www.eveonline.com/) to check if there is a Thera connection to Stain.

- Checks [Eve Scout](https://www.eve-scout.com) every four hours.
- Sends an email if a connection was found. ([Mailcatcher](https://mailcatcher.me/) used during development and testing)

#### Dependencies

- [Axios](https://github.com/axios/axios)
- [node-cron](https://github.com/kelektiv/node-cron)
- [Nodemailer](https://nodemailer.com/about/)
