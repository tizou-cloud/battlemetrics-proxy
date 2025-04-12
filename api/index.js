export default async function handler(req, res) {
  const search = req.query.search;

  if (!search) {
    return res.status(400).json({ error: "Aucun paramètre de recherche fourni." });
  }

  try {
    const response = await fetch(`https://api.battlemetrics.com/players?filter[search]=${encodeURIComponent(search)}&filter[game]=rust&page[size]=1`);

    if (!response.ok) {
      throw new Error("Erreur BattleMetrics");
    }

    const data = await response.json();

    if (!data.data.length) {
      return res.status(404).json({ error: "Aucun joueur trouvé." });
    }

    const player = data.data[0];

    res.status(200).json({
      id: player.id,
      name: player.attributes.name,
      online: player.attributes.online,
      createdAt: player.attributes.createdAt,
      updatedAt: player.attributes.updatedAt
    });

  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
