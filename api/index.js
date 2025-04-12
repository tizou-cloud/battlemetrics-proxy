export default async function handler(req, res) {
  const search = req.query.search;
  const url = `https://api.battlemetrics.com/players?filter[search]=${search}&filter[game]=rust`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU1YTA0MjIzM2U4ZTI4YTgiLCJpYXQiOjE3NDQwNDYzNjAsIm5iZiI6MTc0NDA0NjM2MCwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoxMDE1NDk1In0.UZHq5KbHgXycv2nN2ogSvuUXTwHEU0lBVVNrUlCmkVU"
      }
    });

    const result = await response.text(); // <-- log brut
    console.log("BattleMetrics response:", result);

    if (!response.ok) {
      throw new Error(result);
    }

    const data = JSON.parse(result);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
}
