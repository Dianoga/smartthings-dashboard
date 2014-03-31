<!DOCTYPE html>
<html ng-app="Dashboard">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>SmartThings Dashboard</title>
	<link rel='stylesheet' href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'/>
	<link rel='stylesheet' href='css/font.css'/>
	<link rel='stylesheet' href='css/style.css'/>
</head>
<body>
	<div class='container' ng-controller="DashCtrl">
		<h1>SmartThings Dashboard</h1>

		<div class='row'>
			<div class='device col-md-3' ng-repeat="d in devices">
				<div class='panel panel-default'>
					<div class='panel-heading'>
						<div class='attrs'>
						<span class='battery' ng-if='d.battery'>{{d.battery}} <i class='icon-battery-full'></i></span>
							<span class='rssi' ng-if='d.rssi'>{{d.rssi}} <i class='icon-signal'></i></span>
						</div>
						<h2 class='panel-title'>{{d.name}}</h2>
					</div>
					<div class='panel-body'>
						<div class='thermostat' ng-if='d.capabilities.indexOf("Thermostat") != -1'>
							<div class='col-md-6'>
								<div class='temperature' style='background-color: {{d.temperatureBgColor}}; color: {{d.temperatureTextColor}};'>
									<span>{{d.temperature}}°</span>
								</div>
							</div>
							<div class='col-md-6'>
								<div class='target' ng-if="d.thermostatMode != 'off'">
									<span class='heat' ng-if="d.thermostatMode == 'heat' || d.thermostatMode == 'emergency heat'"><i class="icon-fire"></i> {{d.heatingSetpoint}}°</span>
									<span class='cool' ng-if="d.thermostatMode == 'cool'"><i class="icon-snowflake"></i> {{d.coolingSetpoint}}°</span>
								</div>
								<div class='fan' ng-if="d.thermostatFanMode != 'off'">
									<span><i class='icon-air'></i> {{d.thermostatFanMode}}</span>
								</div>
							</div>
						</div>
						<div class='col-md-6' ng-if='d.capabilities.indexOf("Temperature Measurement") != -1' ng-class="{ 'col-md-offset-3': d.capabilities.length == 1 }">
							<div class='temperature'  style='background-color: {{d.temperatureBgColor}}; color: {{d.temperatureTextColor}};'>
								<span>{{d.temperature}}°</span>
							</div>
						</div>
					</div>
					<ul class='list-group debug'>
						<li class='list-group-item title'>Device Attributes</li>
						<li class='list-group-item' ng-repeat="(key, value) in d">{{key}}: {{value}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/chroma-js/0.5.2/chroma.min.js"></script>
	<script src='//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js'></script>

	<script src="https://cdn.goinstant.net/v1/platform.min.js"></script>
	<script src="https://cdn.goinstant.net/integrations/goangular/latest/goangular.min.js"></script>
	<script src='app.js'></script>
</body>
</html>
