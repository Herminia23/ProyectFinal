const {Router} = require("express")
const { AgregarPelicula, AgregarRenta, EditarPelicula, EditarRenta, MostrarPelicula, MostrarRenta, InabilitarPelicula, InabilitarRenta } = require("../controllers/rentapelicula")
const {} = require("../controllers/rentapelicula")
const router = Router()

router.post("/agregarpelicula", AgregarPelicula)

router.post("/agregarrenta", AgregarRenta)

router.put("/editarpelicula", EditarPelicula)

router.put("/editarrenta", EditarRenta)

router.get("/mostrarpelicula", MostrarPelicula)

router.get("/mostrarrenta", MostrarRenta)

router.delete("/inabilitarpelicula/id/:ID", InabilitarPelicula)

router.delete("/inabilitarrenta/id/:ID", InabilitarRenta)

module.exports = router