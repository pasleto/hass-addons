var express = require('express');
var router = express.Router();
var config = require('config');
var orm = require('orm');
var ping = require('ping');

router.use(express.json());

var dbOpts = {
  host: process.env.DATABASE_URL || config.database_url,
  database: process.env.DATABASE_NAME || config.database_name,
  user: process.env.DATABASE_USER || config.database_user,
  password: process.env.DATABASE_PASSWORD || config.database_password,
  protocol: 'mysql',
  port: process.env.DATABASE_PORT || config.database_port,
  query: {pool: false}
};

orm.connect(dbOpts, function (err, db) {
  if (err) return console.error('Connection error: ' + err);

  db.load('../models/models', function (err) {
    if (err) return console.error('Connection error: ' + err);

    var Vlans = db.models.vlans;
    var IpAddresses = db.models.ip_addresses;

    db.sync(function (err) {
      if (err) throw err;

      router.get('/', function (req, res) {
        res.send({app_name: 'Network Notepad', author: 'https://github.com/pasleto', timestamp: new Date().toLocaleString()});
      });

      router.get('/vlans/all', function (req, res) { // Return all Vlans ordered by ID
        Vlans.find({ }, function (err, network) {
          if (err) {
            res.status(500).send();
            return;
          }
          res.status(200).send(network);
        });
      });

      router.get('/vlans/ordered', function (req, res) { // Return all Vlans ordered by NAME
        Vlans.find({ }, 'name', function (err, network) {
          if (err) {
            res.status(500).send();
            return;
          }
          res.status(200).send(network);
        });
      });

      router.get('/vlans/:id', function (req, res) { // Return one Vlan by ID
        Vlans.find({ id: req.params.id }, function (err, network) {
          if (err) {
            res.status(500).send();
            return;
          }
          res.status(200).send(network[0]);
        });
      });

      router.post('/vlans/create', function (req, res) { // Post to create new Vlan
        Vlans.create({
          name: req.body.name,
          network_ip: req.body.networkIP,
          network_prefix: req.body.networkPrefix,
          start_ip: req.body.startIP,
          end_ip: req.body.endIP,
          broadcast_ip: req.body.broadcastIP,
          network_mask: req.body.networkMask,
          description: req.body.description
        }, function (err) {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              res.status(409).send();
              return;
            } else {
              res.status(500).send();
              return;
            }
          }
          Vlans.find({ name: req.body.name }, function (err, network) {
            if (err) {
              res.status(500).send();
              return;
            }
            let newNetworkIP = `${network[0].getID()}`;
            res.status(200).send(newNetworkIP);
          });
        });
      });

      router.post('/vlans/delete', function (req, res) { // Delete Network and IP Addresses by Network ID
        Vlans.find({ id: req.body.id }).remove(function (err) {
          if (err) {
            console.log(err);
            res.status(500).send();
            return;
          }
          IpAddresses.find({ network_id: req.body.id }).remove(function (err) {
            if (err) {
              console.log(err);
              res.status(500).send();
              return;
            }
            res.status(200).send();
          });
        });
      });

      router.get('/ip/array/:id', function (req, res) { // Return all IP Addresses by Network_ID
        IpAddresses.find({ network_id: req.params.id }, function (err, ipAddresses) {
          if (err) {
            res.status(500).send();
            return;
          }
          res.status(200).send(ipAddresses);
        });
      });

      router.get('/ip/count/used/:id', function (req, res) { // Return count of used IP Addresses by Network_ID
        IpAddresses.find({ network_id: req.params.id, is_used: true }).count(function (err, ipAddresses) {
          if (err) {
            res.status(500).send();
            return;
          }
          res.status(200).send(`${ipAddresses}`);
        });
      });

      router.get('/ip/count/unused/:id', function (req, res) { // Return count of unused IP Addresses by Network_ID
        IpAddresses.find({ network_id: req.params.id, is_used: false }).count(function (err, ipAddresses) {
          if (err) {
            res.status(500).send();
            return;
          }
          res.status(200).send(`${ipAddresses}`);
        });
      });

      router.get('/ip/count/all/:id', function (req, res) { // Return count of all IP Addresses by Network_ID
        IpAddresses.find({ network_id: req.params.id }).count(function (err, ipAddresses) {
          if (err) {
            res.status(500).send();
            return;
          }
          res.status(200).send(`${ipAddresses}`);
        });
      });

      router.post('/ip/array/list', function (req, res) { // Post to return array of used / all IP Addresses by Network_ID based on req.body.usedOnly
        if (req.body.usedOnly) {
          IpAddresses.find({ network_id: req.body.id, is_used: true }, function (err, ipAddresses) {
            if (err) {
              res.status(500).send();
              return;
            }
            res.status(200).send(ipAddresses);
          });
        } else {
          IpAddresses.find({ network_id: req.body.id }, function (err, ipAddresses) {
            if (err) {
              res.status(500).send();
              return;
            }
            res.status(200).send(ipAddresses);
          });
        }
      });

      router.post('/ip/create', function (req, res) { // Post to create IP Addresses from incoming array
        let arr = req.body.ipArray;
        arr.forEach((ip, key, arr) => {
          IpAddresses.create({
            network_id: req.body.networkID,
            ip_address: ip,
            is_used: false,
            device_name: '',
            comment: '',
            last_edited: new Date(),
            inside_net_id: (key + 1),
            assigned_place: ''
          }, function (err) {
            if (err) {
              res.status(500).send();
              return;
            }
            if (Object.is(arr.length - 1, key)) {
              res.status(200).send();
            }
          });
        });
        res.status(200).send();
      });

      router.post('/device/add', function (req, res) { // Post to add device info to IP Address
        IpAddresses.get(req.body.id, function (err, IpAddr) {
          if (err) {
            res.status(500).send();
            return;
          }
          IpAddr.device_name = req.body.deviceName;
          IpAddr.is_used = true;
          IpAddr.comment = req.body.comment;
          IpAddr.last_edited = new Date();
          IpAddr.assigned_place = req.body.assignedPlace;
          IpAddr.save(function (err) {
            if (err) {
              res.status(500).send();
              return;
            }
            res.status(200).send();
          });
        });
      });

      router.post('/device/remove', function (req, res) { // Post to remove device info from IP Address
        IpAddresses.get(req.body.id, function (err, IpAddr) {
          if (err) {
            console.log(err);
            res.status(500).send();
            return;
          }
          IpAddr.device_name = '';
          IpAddr.is_used = false;
          IpAddr.comment = '';
          IpAddr.last_edited = new Date();
          IpAddr.assigned_place = '';
          IpAddr.save(function (err) {
            if (err) {
              console.log(err);
              res.status(500).send();
              return;
            }
            res.status(200).send();
          });
        });
      });

      router.post('/device/ping', function (req, res) { // Ping device by req.body.ip
        ping.sys.probe(req.body.ip, function (isAlive) {
          if (isAlive) {
            res.status(200).send({status: 'online'});
          } else {
            res.status(200).send({status: 'offline'});
          }
        });
      });
    });
  });
});

module.exports = router;
