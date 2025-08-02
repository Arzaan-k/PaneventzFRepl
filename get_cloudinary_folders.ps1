$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("878769551721862:0v3eRiejau1m-tdnK7xgoR1Cetc"))
$response = Invoke-RestMethod -Uri https://api.cloudinary.com/v1_1/dhxetyrkb/folders -Headers @{Authorization="Basic $($auth)"}
$response.folders | ForEach-Object { $_.name }