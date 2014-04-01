angular
	.module('Dashboard', ['goangular'])
	.config(function($goConnectionProvider) {
		$goConnectionProvider.$set('https://goinstant.net/Dianoga/smartthings-dashboard');
	})
	.controller('DashCtrl', function($scope, $goKey) {
		$scope.devices = $goKey('devices', 'Test').$sync();

		$scope.devices.$on('ready', function() {
			angular.forEach($scope.devices, function(value, key) {
				if (value == undefined) {
					return;
				}

				if (value.temperature != undefined) {
					setColorTemps(key, value.temperature);
				}
				if (value.battery != undefined) {
					setBatteryLevel(key, value.battery);
				}
			});
		});

		$scope.devices.$on('set', {
			bubble: true
		}, function(value, context) {
			var key = context.key.split('/')[2];
			if (context.key.indexOf('temperature') != -1) {
				setColorTemps(key, value);
			} else if (context.key.indexOf('battery') != -1) {
				setBatteryLevel(key, value);
			}
		});

		$scope.devices.$on('error', {
			bubble: true
		}, function(err) {
			console.log(err);
		})

		var setColorTemps = function(key, temp) {
			var scale = chroma.scale(['#08519c', '#c6dbef', '#ffffb2', '#bd0026']).mode('hsv').domain([0, 100]).out('hex');
			var bgColor = scale(temp);
			var textColor = chroma(bgColor).luminance() > 0.5 ? chroma(bgColor).darken(50).hex() : chroma(bgColor).brighten(50).hex();
			$scope.devices[key].temperatureTextColor = textColor;
			$scope.devices[key].temperatureBgColor = bgColor;
		};

		var setBatteryLevel = function(key, level) {
			var icon = 'icon-battery-full';
			if (level <= 25) {
				icon = 'icon-battery-25';
			} else if (level <= 50) {
				icon = 'icon-battery-50';
			} else if (level <= 75) {
				icon = 'icon-battery-75';
			}
			$scope.devices[key].batteryIcon = icon;
		}
	});