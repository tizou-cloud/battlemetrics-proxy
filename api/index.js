export default async function handler(req, res) {
  const search = req.query.search;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU1YTA0MjIzM2U4ZTI4YTgiLCJpYXQiOjE3NDQwNDYzNjAsIm5iZiI6MTc0NDA0NjM2MCwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoxMDE1NDk1In0.UZHq5KbHgXycv2nN2ogSvuUXTwHEU0lBVVNrUlCmkVU";

  if (!search) {
    return res.status(400).json({ error: "Paramètre ?search= requis" });
  }

  try {
    const response = await fetch(`https://api.battlemetrics.com/players?filter[search]=${encodeURIComponent(search)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: "Erreur BattleMetrics", details: errorData });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
}
