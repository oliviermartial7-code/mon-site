import { neon } from '@netlify/neon';
const sql = neon();

export default async function handler(req, res) {

  // LIRE toutes les publications
  if (req.method === 'GET') {
    try {
      const data = await sql`
        SELECT * FROM publications 
        ORDER BY created_at DESC
      `;
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // AJOUTER une publication
  else if (req.method === 'POST') {
    try {
      const { titre, type_pub, date_pub, fichier, description } = JSON.parse(req.body);
      const data = await sql`
        INSERT INTO publications (titre, type_pub, date_pub, fichier, description)
        VALUES (${titre}, ${type_pub}, ${date_pub}, ${fichier}, ${description})
        RETURNING *
      `;
      res.json({ success: true, data: data[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // SUPPRIMER une publication
  else if (req.method === 'DELETE') {
    try {
      const { id } = JSON.parse(req.body);
      await sql`DELETE FROM publications WHERE id = ${id}`;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
```

---

Message de validation :
```
Fonction publications
