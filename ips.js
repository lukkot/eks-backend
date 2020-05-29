var os = require('os');
var ifaces = os.networkInterfaces();

exports.getIps = function() {
    var ips = '';
    
    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;

      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          console.log(ifname + ':' + alias, iface.address);
          ips += ifname + ':' + alias + ' - ' + iface.address + '<br />';
        } else {
          // this interface has only one ipv4 adress
          console.log(ifname, iface.address);
          ips += ifname + ' - ' + iface.address + '<br />';
        }
        ++alias;
      });
    });
    
    return ips;
}
