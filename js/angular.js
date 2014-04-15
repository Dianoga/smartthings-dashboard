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

				removeCapability(key, "Battery");
				removeCapability(key, "Indicator");
				removeCapability(key, "Polling");
				removeCapability(key, "Sensor");
				removeCapability(key, "Actuator");
				removeCapability(key, "Refresh");
				removeCapability(key, "Signal Strength");
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
			// var scale = chroma.scale(['navy', 'royalblue', 'skyblue', 'springgreen', 'gold', 'orange', 'orangered', 'firebrick']).mode('hsv').domain([0, 100]).out('hex');
			var bgColor = '#153591';
			var tempScale = {
				44: '#1e9cbb',
				59: '#90d2a7',
				74: '#44b621',
				84: '#f1d801',
				95: '#d04e00',
				100: '#bc2323'
			};
			angular.forEach(tempScale, function(value, tKey) {
				if (temp > parseFloat(tKey)) {
					bgColor = value;
				}
			});

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

		var removeCapability = function(key, cap) {
			if ($scope.devices[key].capabilities != undefined) {
				var cI = $scope.devices[key].capabilities.indexOf(cap);
				if (cI != -1) {
					$scope.devices[key].capabilities.splice(cI, 1);
				}
			}
		}
	});