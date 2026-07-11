app.get('/api/puntos', (req, res) => {
    const query = `
        SELECT id, nombre_finca, latitud, longitud, variedad, estado_salud 
        FROM puntos_monitoreo
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener puntos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});
app.get('/api/bioproductos', (req, res) => {
    const sql = "SELECT * FROM bioproductos";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});