const publicIp = require('public-ip'),
	CloudFlareAPI = require('cloudflare4'),
	api = new CloudFlareAPI({
		email: process.env.EMAIL,
		key: process.env.API_KEY
	}),
	minutes = process.env.UPDATE_TIME,
	the_interval = minutes * 60 * 1000;
const fs = require('fs');

function findRecord(records, type) {
	let found;
	records.some((record) => {
		if (record.type === type.toUpperCase()) {
			found = record;
			return true;
		}
	});
	return found;
}

function updateRecord() {
	publicIp.v4().then(ip => {
		api.zoneGetAll({
			name: process.env.ZONE
		}).then(function (zone) {
			api.zoneDNSRecordGetAll(zone[0].id, {
				name: process.env.RECORD
			}).then(function (records) {
				const record = findRecord(records, 'A');
				if (!record) {
					console.log('record not found');
					return;
				}
				if (record.content.trim() === ('' + ip).trim()) {
					console.log('same ip, do not update');
					return;
				}
				api.zoneDNSRecordUpdate(zone[0].id, record.id, {
					type: 'A',
					content: ip
				}).then(function (result) {
					console.log(result);
				})
			})
		});
	});
}

setInterval(updateRecord, the_interval);
updateRecord();
