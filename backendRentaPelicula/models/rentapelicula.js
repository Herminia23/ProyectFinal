const modelsrenta = {
    queryExitsPelicula: `SELECT NombrePelicula FROM Peliculas WHERE NombrePelicula = ?`,
    queryExitsPeliID: `SELECT ID FROM Peliculas WHERE NombrePelicula = ?`,
    queryAGPelicula: `INSERT INTO Peliculas (NombrePelicula, Activo) VALUES (?, ?)`,
    queryEDPelicula: `UPDATE Peliculas SET NombrePelicula = ?, Activo = ? WHERE ID = ?`,
    queryMTPeliculas: `SELECT * FROM Peliculas`,
    queryINPelicula: `UPDATE Peliculas SET Activo = 'N' WHERE ID = ?`,
    queryExitsRenta: `SELECT NombrePelicula FROM Cliente c JOIN Peliculas p ON c.IDP = p.ID WHERE NombrePelicula = ?`,
    queryExitRenta: `SELECT Nombre FROM Cliente WHERE Nombre = ?`,
    queryAGRenta: `INSERT INTO Cliente (IDP, Nombre, Apellido, FechaInicio, FechaFin, Costo, Entregado, Activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    queryEDRenta: `UPDATE Cliente SET Nombre = ?, Apellido = ?, FechaInicio = ?, FechaFin = ?, Costo = ?, Entregado = ?, Activo = ? WHERE ID = ?`,
    queryMTRentas: `SELECT * FROM Cliente`,
    queryINRenta: `UPDATE Cliente SET Activo = 'N' WHERE ID = ?`
}

module.exports = modelsrenta