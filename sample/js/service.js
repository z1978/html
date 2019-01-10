var strURI = 'getData.json';
			var objQueryParams ={params:{}};
			objQueryParams.params.keyword = "";
			$scope.errorResults010 = {};
			try
			{
				objQueryParams.params.keyword = $scope.search010.keyword;
			}
			catch(e)
			{
			}
			$http.get(strURI,objQueryParams)
			    .success
				(
					function(data, status, headers, config)
					{
						if('OK' == data.header.status)
						{
							$scope.searchresults010 = data.body;
						}
						else if('NG-VALIDATION' == data.header.status)
						{
							$scope.errorResults010 = data.body;
						}
						else if('NG-NOLOGIN' == data.header.status)
						{
							showSessionLostDialog($modal);
						}
						else
						{
							alert(data.body);
						}
					}
				)
				.error
				(
					function(data, status, headers, config)
					{
						alert("Error!!");
						alert(data);
					}
				);