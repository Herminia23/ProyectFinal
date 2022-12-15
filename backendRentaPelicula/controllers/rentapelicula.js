const { request, response } = require("express");
const pool = require("../db/connection");
const modelsrenta = require("../models/rentapelicula");

const AgregarPelicula = async (req = request, res = response) => {
    const {NombrePelicula, Activo} = req.body

    if(!NombrePelicula || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [peliculaExist] = await conn.query(modelsrenta.queryExitsPelicula, [NombrePelicula], (error) => {if(error) throw error})
        
        if(peliculaExist){
            res.status(404).json({msg: `Pelicula '${NombrePelicula}' ya está Registrado.`})
            return
        }
        register = await conn.query(modelsrenta.queryAGPelicula, [NombrePelicula, Activo])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo añadir la pelicula con nombre: ${NombrePelicula}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente la pelicula ${NombrePelicula}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const EditarPelicula = async (req = request, res = response) => {
    const {ID, NombrePelicula, Activo} = req.body

    if(!ID || !NombrePelicula || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [peliculaExits] = await conn.query(modelsrenta.queryExitsPelicula, [NombrePelicula], (error) => {if(error) throw error})
        
        if(!peliculaExits){
            res.status(404).json({msg: `la Pelicula no está registrado.`})
            return
        }
        register = await conn.query(modelsrenta.queryEDPelicula, [NombrePelicula, Activo, ID])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo actualizar la pelicula.`})
            return
        }
        res.json({msg:`Se Actualizó satisfactoriamente la pelicula.`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const MostrarPelicula = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection()

        const peliculaExits = await conn.query(modelsrenta.queryMTPeliculas, (error) => {if(error) throw error})

        if(!peliculaExits){
            res.status(404).json({msg: `Ningúna Pelicula Registrado.`})
            return
        }
        res.json({peliculaExits})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const InabilitarPelicula = async (req = request, res = response) => {
    const {ID} = req.params

    if(!ID){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()

        const result = await conn.query(modelsrenta.queryINPelicula,[ID], (error) => {if(error) throw error})
        
        if (result.affectedRows === 0) {
            res.status(404).json({msg: `No exite pelicula registrados con el ID ${ID}`})
            return
        }

        res.json({msg:`Se eliminó satisfactoriamente la pelicula con ID ${ID}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const AgregarRenta = async (req = request, res = response) => {
    const {NombrePelicula, Nombre, Apellido, FechaInicio, FechaFin, Costo, Entregado, Activo} = req.body

    if(!NombrePelicula || !Nombre || !Apellido || !FechaInicio || !FechaFin || !Costo || !Entregado || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn, ID;
    try {
        conn = await pool.getConnection()

        const [peliculaExist] = await conn.query(modelsrenta.queryExitsRenta, [NombrePelicula], (error) => {if(error) throw error})
        
        if(peliculaExist){
            res.status(404).json({msg: `La renta de pelicula de '${NombrePelicula}' ya está Registrado.`})
            return
        }
        const [idpeli] = await conn.query(modelsrenta.queryExitsPeliID,[NombrePelicula])
        for (const key in idpeli) {
            ID = idpeli[key]
        }
        register = await conn.query(modelsrenta.queryAGRenta, [ID, Nombre, Apellido, FechaInicio, FechaFin, Costo, Entregado, Activo])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo registrar la renta con nombre: ${NombrePelicula}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el registro de la pelicula ${NombrePelicula}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const EditarRenta = async (req = request, res = response) => {
    const {ID, Nombre, Apellido, FechaInicio, FechaFin, Costo, Entregado, Activo} = req.body

    if(!ID || !Nombre || !Apellido || !FechaInicio || !FechaFin || !Costo || !Entregado || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [rentaExits] = await conn.query(modelsrenta.queryExitRenta, [Nombre], (error) => {if(error) throw error})
        
        if(!rentaExits){
            res.status(404).json({msg: `No Existe ningun registro.`})
            return
        }
        register = await conn.query(modelsrenta.queryEDRenta, [Nombre, Apellido, FechaInicio, FechaFin, Costo, Entregado, Activo, ID])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo actualizar el registro.`})
            return
        }
        res.json({msg:`Se Actualizó satisfactoriamente el registro.`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const MostrarRenta = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection()

        const rentaExits = await conn.query(modelsrenta.queryMTRentas, (error) => {if(error) throw error})

        if(!rentaExits){
            res.status(404).json({msg: `Ninguna Renta Registrada.`})
            return
        }
        res.json({rentaExits})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const InabilitarRenta = async (req = request, res = response) => {
    const {ID} = req.params

    if(!ID){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()

        const result = await conn.query(modelsrenta.queryINRenta,[ID], (error) => {if(error) throw error})
        
        if (result.affectedRows === 0) {
            res.status(404).json({msg: `No exite renta registrados con el ID ${ID}`})
            return
        }

        res.json({msg:`Se eliminó satisfactoriamente la renta con ID ${ID}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
module.exports = {AgregarPelicula, EditarPelicula, MostrarPelicula, InabilitarPelicula, AgregarRenta, EditarRenta, MostrarRenta, InabilitarRenta}