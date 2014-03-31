angular
	.module('Dashboard', ['goangular'])
	.config(function($goConnectionProvider) {
		$goConnectionProvider.$set('https://goinstant.net/Dianoga/smartthings-dashboard');
	})
	.controller('DashCtrl', function($scope, $goKey) {
		$scope.devices = $goKey('devices', 'Test').$sync();

		$scope.devices.$on('ready', function() {
			angular.forEach($scope.devices, function(value, key) {
				if (value.temperature != undefined) {
					setColorTemps(key, value.temperature);
				}
			});
		});

		$scope.devices.$on('set', {
			bubble: true
		}, function(value, context) {
			if (context.key.indexOf('temperature') != -1) {
				var key = context.key.split('/')[2];
				setColorTemps(key, value);
			}
		});

		var setColorTemps = function(key, temp) {
			var scale = chroma.scale(['#08519c', '#c6dbef', '#ffffb2', '#bd0026']).mode('hsv').domain([0, 100]).out('hex');
			var bgColor = scale(temp);
			var textColor = chroma(bgColor).luminance() > 0.5 ? chroma(bgColor).darken(50).hex() : chroma(bgColor).brighten(50).hex();
			$scope.devices[key].temperatureTextColor = textColor;
			$scope.devices[key].temperatureBgColor = bgColor;
		};
	});