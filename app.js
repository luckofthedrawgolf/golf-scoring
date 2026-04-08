<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Golf Tracker</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<h1>Live Golf Group Tracker</h1>
<h2>Best ball scoring for up to 3 teams.</h2>

<button onclick="createRound()">Create round</button>

<div id="roundSection" style="display:none;">
  <h3>Round Code: <span id="roundCode"></span></h3>

  <div id="teams"></div>

  <button onclick="addScore()">Add Score</button>
</div>

<script src="app.js"></script>
</body>
</html>
