const fse = require('fs-extra');
const path = require('path');
const destFolder = './docs';

// 复制打包生成的文件
fse.copy('./demos', destFolder+'/demos', {filter: filterFunc}, err => {
	if (err) {
		console.log('err: ' + err);
		return;
	}
	console.log('copy demos files success!');
});

fse.copy('./dist', destFolder+'/dist', {filter: filterFunc}, err => {
	if (err) {
		console.log('err: ' + err);
		return;
	}
	console.log('copy dist files success!');
});

function filterFunc(src, dest) {
	console.log('copy: ' + src);
	return true;
}

console.log('destination: ' + path.resolve(destFolder));
