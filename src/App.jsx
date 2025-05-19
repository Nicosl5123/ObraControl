// App principal en React para control de actividades en obra con calificación por estrellas, historial y ranking
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function ObraControlApp() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [nuevoTrabajador, setNuevoTrabajador] = useState("");
  const [actividades, setActividades] = useState({});
  const [historialVisible, setHistorialVisible] = useState(null);
  const [mostrarRanking, setMostrarRanking] = useState(false);

  const agregarTrabajador = () => {
    if (nuevoTrabajador.trim() !== "") {
      setTrabajadores([...trabajadores, nuevoTrabajador]);
      setActividades({ ...actividades, [nuevoTrabajador]: [] });
      setNuevoTrabajador("");
    }
  };

  const agregarActividad = (nombre, descripcion) => {
    setActividades({
      ...actividades,
      [nombre]: [...actividades[nombre], { descripcion, calificacion: 0, fecha: new Date().toLocaleDateString() }],
    });
  };

  const calificarActividad = (nombre, index, calificacion) => {
    const nuevasActividades = [...actividades[nombre]];
    nuevasActividades[index].calificacion = calificacion;
    setActividades({ ...actividades, [nombre]: nuevasActividades });
  };

  const promedioCalificaciones = (nombre) => {
    const actividadesTrabajador = actividades[nombre];
    if (!actividadesTrabajador || actividadesTrabajador.length === 0) return 0;
    const suma = actividadesTrabajador.reduce((acc, act) => acc + act.calificacion, 0);
    return (suma / actividadesTrabajador.length).toFixed(1);
  };

  const ranking = trabajadores
    .map((t) => ({ nombre: t, promedio: parseFloat(promedioCalificaciones(t)) }))
    .sort((a, b) => b.promedio - a.promedio);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ObraControl - Seguimiento de Actividades</h1>

      <div className="flex space-x-2">
        <Input
          placeholder="Nombre del trabajador"
          value={nuevoTrabajador}
          onChange={(e) => setNuevoTrabajador(e.target.value)}
        />
        <Button onClick={agregarTrabajador}>Agregar</Button>
        <Button variant="outline" onClick={() => setMostrarRanking(!mostrarRanking)}>
          {mostrarRanking ? "Ocultar Ranking" : "Ver Ranking"}
        </Button>
      </div>

      {mostrarRanking && (
        <Card className="bg-yellow-50 border border-yellow-200">
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Ranking de Trabajadores</h2>
            {ranking.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{index + 1}. {item.nombre}</span>
                <span>⭐ {item.promedio}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {trabajadores.map((trabajador, idx) => (
        <Card key={idx} className="bg-white shadow-md">
          <CardContent className="space-y-2">
            <h2 className="text-xl font-semibold">{trabajador}</h2>
            <p className="text-sm text-gray-600">Rendimiento promedio: ⭐ {promedioCalificaciones(trabajador)}</p>
            <Button variant="outline" onClick={() => setHistorialVisible(historialVisible === trabajador ? null : trabajador)}>
              {historialVisible === trabajador ? "Ocultar historial" : "Ver historial"}
            </Button>
            {historialVisible === trabajador && (
              <div className="space-y-1 bg-gray-50 p-2 rounded-md border">
                {actividades[trabajador]?.map((act, i) => (
                  <div key={i} className="flex flex-col border-b pb-1">
                    <span className="font-medium">{act.descripcion}</span>
                    <span className="text-sm text-gray-500">Fecha: {act.fecha}</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={18}
                          fill={act.calificacion >= n ? "#facc15" : "none"}
                          stroke="#facc15"
                          onClick={() => calificarActividad(trabajador, i, n)}
                          className="cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <AgregarActividad nombre={trabajador} onAgregar={agregarActividad} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AgregarActividad({ nombre, onAgregar }) {
  const [descripcion, setDescripcion] = useState("");

  const handleAdd = () => {
    if (descripcion.trim() !== "") {
      onAgregar(nombre, descripcion);
      setDescripcion("");
    }
  };

  return (
    <div className="flex space-x-2">
      <Textarea
        placeholder="Descripción de la actividad"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <Button onClick={handleAdd}>Añadir</Button>
    </div>
  );
}
