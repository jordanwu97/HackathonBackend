
	     // Load the Visualization API and the corechart package.
	     google.charts.load('current', {'packages':['corechart']});

	      // Set a callback to run when the Google Visualization API is loaded.


	      // Callback that creates and populates a data table,
	      // instantiates the pie chart, passes in the data and
	      // draws it.
	      var arr = null;
	      var name = "";
	      var humidity = [];
	      var temperature = [];
	      var soil = [];

	     var url = /*'http://hackathonbackend-dev.us-east-1.elasticbeanstalk.com*/'/iot';
	      var data = null;
	      $(document).ready(function() {
		      $.getJSON(url, function(json_data){
		      	data = json_data;;
		      	console.log(data);
		      	for(var i = 0; i < data.length; i++){
			      	var obj = data[i];
			      	var date =
			      	humidity.push([new Date(obj.time.year, obj.time.month, obj.time.day, obj.time.hour, obj.time.minute, obj.time.second), obj.humidity]);
			      	temperature.push([new Date(obj.time.year, obj.time.month, obj.time.day, obj.time.hour, obj.time.minute, obj.time.second), obj.temperature]);
			      	soil.push([new Date(obj.time.year, obj.time.month, obj.time.day, obj.time.hour, obj.time.minute, obj.time.second), obj.soil]);
			      }
		      	google.charts.setOnLoadCallback(drawChart);
		      });
	      });

	      //generating arrays of time data vs various sensor data


	      //iterates through json and retrieves sensor/time data


	      //determines which chart to display
	      function showDiv(select){
			   if(select ==0){
			    	arr = humidity;
			    	name = 'Humidity (Grams/Meters^3)';
			    	google.charts.setOnLoadCallback(drawChart);
			   }
			   else if(select ==1){
			    	arr = soil;
			    	name = 'Soil (Grams/Meters^3)';
			    	google.charts.setOnLoadCallback(drawChart);
			   }
			   else{
			   		arr = temperature;
			   		name = 'Temperature (Fahrenheit)';
			   		google.charts.setOnLoadCallback(drawChart);
			   }
			}


	      	function drawChart() {
	      		if(arr == null){
	      			arr = humidity;
	      			name = "Humidity (Grams/Meters^3)"
	      		}
		        // Create the data table.
		        var data = new google.visualization.DataTable();
		        data.addColumn('date', 'Time');
		        data.addColumn('number', name);
		        data.addRows(arr);

		        // Set chart options
		        var options = {'title':name,
		                       'width':1000,
		                       'height':600,
		                       hAxis: {
					            format: 'M/d/yy',
					            gridlines: {count: Math.min()}
					          }
		          			};

		        // Instantiate and draw our chart, passing in some options.
		        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		        chart.draw(data, options);
	      	}
