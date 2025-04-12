<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Recherche BattleMetrics</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #121212; color: white; }
    input, button { padding: 8px; margin: 5px; border-radius: 5px; border: none; }
    input { width: 250px; }
    .player-info { margin-top: 20px; }
    canvas { max-width: 600px; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>🔎 Recherche BattleMetrics</h1>
  <input id="search" type="text" placeholder="Pseudo ou ID...">
  <button onclick="searchPlayer()">Rechercher</button>

  <div class="player-info" id="results"></div>
  <canvas id="activityChart"></canvas>

  <script>
    async function searchPlayer() {
      const keyword = document.getElementById('search').value.trim();
      if (!keyword) return alert("Tape un pseudo ou un ID");

      const resBox = document.getElementById("results");
      resBox.innerHTML = "Chargement...";

      const proxy = "https://api.allorigins.win/raw?url=";

      try {
        const searchUrl = encodeURIComponent(`https://api.battlemetrics.com/players?filter[search]=${encodeURIComponent(keyword)}&filter[game]=rust&page[size]=1`);
        const resp = await fetch(`${proxy}${searchUrl}`);
        const data = await resp.json();

        if (!data.data.length) return resBox.innerHTML = "Aucun joueur trouvé.";

        const player = data.data[0];
        const id = player.id;
        const name = player.attributes.name;
        const online = player.attributes.online;

        const sessionUrl = encodeURIComponent(`https://api.battlemetrics.com/players/${id}/session-history?filter[game]=rust&page[size]=100`);
        const detailResp = await fetch(`${proxy}${sessionUrl}`);
        const sessionData = await detailResp.json();
        const sessions = sessionData.data;

        let lastServer = "?", totalTime = 0;
        const labels = [], values = [];

        sessions.forEach(s => {
          const server = s.relationships.server?.data?.id;
          const start = new Date(s.attributes.start);
          const stop = new Date(s.attributes.stop);
          const duration = (stop - start) / 1000 / 60;

          if (server) lastServer = server;
          totalTime += duration;

          labels.push(start.toLocaleDateString() + " " + start.toLocaleTimeString());
          values.push(duration);
        });

        resBox.innerHTML = `
          <h2>${name} (${online ? "<span style='color:lime'>En ligne</span>" : "<span style='color:gray'>Hors ligne</span>"})</h2>
          <p>⏱ Temps de jeu total : ${Math.round(totalTime)} minutes</p>
          <p>🖥️ Dernier serveur ID : ${lastServer}</p>
        `;

        new Chart(document.getElementById("activityChart"), {
          type: 'bar',
          data: {
            labels: labels.slice(-10),
            datasets: [{
              label: "Temps de session (min)",
              data: values.slice(-10),
              backgroundColor: "#4caf50"
            }]
          },
          options: {
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } }
          }
        });

      } catch (e) {
        resBox.innerHTML = "Erreur lors de la recherche.";
        console.error(e);
      }
    }
  </script>
</body>
</html>