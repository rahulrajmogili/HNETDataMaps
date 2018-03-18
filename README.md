# HNETDataMaps (old integrated version)

This was the development branch for the original version.

It has been split up into 2 branches, one for the client and one for the server part.



## Getting started


Run: `meteor npm install`


## Testing in local development environment

`MONGO_URL=mongodb://localhost:27017/DataMaps meteor`

For debugging with node inspector run `MONGO_URL=mongodb://localhost:27017/DataMaps meteor debug` and open the app in Chrome with the port listed once the app has started.

## Deployment with PM2

* change into the working directory and run `meteor build ..` - this will generate a *.tar .gz file
* move the file to the install location and extract it (you will end up with a `bundle` directory
* `cd bundle/programs/server/` and `npm install`
* generate a configuration file for PM2 (see example [gist](https://gist.github.com/fcbee3b520b4fdf97552.git)) outside of bundle
* run `pm2 start [your_pm2_conf_file] --node-args="--max_old_space_size=6144"`
