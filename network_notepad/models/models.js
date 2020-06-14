module.exports = function (db, cb) {
  db.define('vlans', {
    id: { type: 'serial', key: true },
    name: { type: 'text', size: 35, unique: true },
    network_ip: { type: 'text', size: 20 },
    network_prefix: { type: 'text', size: 2 },
    start_ip: { type: 'text', size: 20 },
    end_ip: { type: 'text', size: 20 },
    broadcast_ip: { type: 'text', size: 20 },
    network_mask: { type: 'text', size: 20 },
    description: { type: 'text', size: 100 }
  }, {
    methods: {
      getID: function () {
        return this.id;
      },
      getName: function () {
        return this.name;
      },
      getNetworkIP: function () {
        return this.network_ip;
      },
      getNetworkPrefix: function () {
        return this.network_prefix;
      },
      getNetworkStartIP: function () {
        return this.start_ip;
      },
      getNetworkEndIP: function () {
        return this.end_ip;
      },
      getNetworkBroadcastIP: function () {
        return this.broadcast_ip;
      },
      getNetworkMask: function () {
        return this.network_mask;
      },
      getDescription: function () {
        return this.description;
      }
    }
  });
  db.define('ip_addresses', {
    id: { type: 'serial', key: true },
    network_id: { type: 'integer' },
    ip_address: { type: 'text', size: 20 },
    is_used: { type: 'boolean' },
    device_name: { type: 'text', size: 50 },
    comment: { type: 'text', size: 100 },
    last_edited: { type: 'date', time: true },
    inside_net_id: { type: 'integer' },
    assigned_place: { type: 'text', size: 20 },
    mac_address: { type: 'text', size: 20 },
  }, {
    methods: {
      getID: function () {
        return this.id;
      },
      getNetworkID: function () {
        return this.network_id;
      },
      getIpAddress: function () {
        return this.ip_address;
      },
      getIsUsed: function () {
        return this.is_used;
      },
      getDeviceName: function () {
        return this.device_name;
      },
      getComment: function () {
        return this.comment;
      },
      getLastEdited: function () {
        return this.last_edited;
      },
      getInsideNetID: function () {
        return this.inside_net_id;
      },
      getAssignedPlace: function () {
        return this.assigned_place;
      },
      getMacAddress: function () {
        return this.mac_address;
      }
    }
  });
  return cb();
};
