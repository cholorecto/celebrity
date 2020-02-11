import { Meteor } from 'meteor/meteor';
import { Celebrities } from '../imports/api/celebrity';
import bodyParser from 'body-parser';

Meteor.startup(() => {
  // code to run on server at startup

   // Listen to incoming HTTP requests, can only be used on the server
   WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    return next();
  });

  // Listen to incoming HTTP requests, can only be used on the server
  WebApp.rawConnectHandlers.use("/public", function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });

  WebApp.connectHandlers.use('/fetch', (req,res,next) => {
    let resp = Celebrities.find().fetch()
    res.end(JSON.stringify(resp))
  })

  WebApp.connectHandlers.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true}))
  .use('/add', (req,res,next) => {

    if(req.method !== 'POST') {
      next()
    } else {
      const { body } = req
      
      res.end(Celebrities.insert({
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        contact_number: body.contact_number,
        address: body.address,
        gender: body.gender
      }))
    }
  })
});
