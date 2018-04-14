const publicIp = require('public-ip');
const CloudFlareAPI = require('cloudflare');
const api = new CloudFlareAPI({
  email: process.env.EMAIL,
  key: process.env.API_KEY
});

function findRecord(records, type) {
  let found;
  records.some(record => {
    if (record.type.toUpperCase() === type.toUpperCase()) {
      found = record;
      return true;
    }
  });
  return found;
}

async function getZonesByNames(names) {
  const resp = await api.zones.browse();
  return resp.result.filter(zone => {
    return names.indexOf(zone.name) > -1;
  });
}

async function getZoneDNSRecords(zoneIDs) {
  const dns = [];
  for (const zoneId of zoneIDs) {
    const resp = await api.dnsRecords.browse(zoneId);
    dns.push(resp.result);
  }
  return dns;
}

function convertStringToArray(str) {
  console.log('string', str);
  if (!str) {
    return [];
  }
  return str.split(',').map(item => item.trim());
}

exports.updateRecord = async function updateRecord() {
  const ip = await publicIp.v4();
  console.log('current public ip is', ip);
  const zoneNames = convertStringToArray(process.env.ZONE);
  const zones = await getZonesByNames(zoneNames);
  console.log(`get ${zones.length} zones`);
  const zoneDNSRecords = await getZoneDNSRecords(zones.map(zone => zone.id));

  for (const dnsRecords of zoneDNSRecords) {
    console.log(`get ${dnsRecords.length} dns records`);
    for (const record of dnsRecords) {
      if (record.type !== 'A') {
        continue;
      }
      const ignored = convertStringToArray(process.env.IGNORED_DNS_NAME || '');
      if (ignored.indexOf(record.name) > -1) {
        console.log(`${record.name} is in ignored list`);
        continue;
      }
      if (!record) {
        console.log('record not found');
        continue;
      }
      if (record.content.trim() === ('' + ip).trim()) {
        console.log('same ip, do not update', record.name, ip);
        continue;
      }
      record.content = ip;
      const resp = await api.dnsRecords.edit(record.zone_id, record.id, record);
      console.log('update result', resp);
    }
  }
};
