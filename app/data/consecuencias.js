window.DATA_CONSECUENCIAS = [
  {
    "id": 1,
    "nombre": "Valentía",
    "cara_visible": false,
    "descripcion_trasera": "Voltea esta carta para descubrir su efecto",
    "descripcion_frente": "Utiliza esta carta cuando desees para superar automáticamente un desafío que tenga el icono 👻 evitando realizar ningún lanzamiento de moneda. Devuelve esta carta al mazo de consecuencias después de usarla.",
    "icono_efecto": "👻",
    "tipo_efecto": "uso_manual",
    "efecto_texto": "Supera automáticamente un desafío con icono 👻"
  },
  {
    "id": 2,
    "nombre": "Mala fama",
    "cara_visible": false,
    "descripcion_trasera": "Cuando la carta de narración actual termine, guárdala bajo esta carta. Mantén esta carta boca abajo hasta que se te indique",
    "descripcion_frente": "El altercado que tuvísteis llegó a oídos de los personajes que encontrasteis en esta localización, por lo que fueron menos receptivos a vuestras peticiones. El próximo desafío en esta localización no podrá ser ayudado por una compañera en caso de tener un desenlace desfavorable. Tras el desafío o al abandonar la localización, devuelve esta carta a su mazo.",
    "icono_efecto": null,
    "tipo_efecto": "modificador_desafio"
  },
  {
    "id": 3,
    "nombre": "Miedo",
    "cara_visible": false,
    "descripcion_trasera": "Mantén esta carta boca abajo hasta que te enfrentes a un desafío con el icono 👻 o te lo indique una carta",
    "descripcion_frente": "Durante la narración actual, los desafíos se resolverán con un solo lanzamiento de moneda (sin ayuda de compañeros). Devuelve esta carta al mazo de consecuencias después de usarla.",
    "icono_efecto": "👻",
    "tipo_efecto": "restriccion_ayuda"
  },
  {
    "id": 4,
    "nombre": "Mareo",
    "cara_visible": false,
    "descripcion_trasera": "Voltea esta carta para descubrir su efecto",
    "descripcion_frente": "El jugador protagonista no participa en la historia mientras estéis en la localización actual. Solo narrará cómo se encontró indispuesto.\n\nDebe realizar un breve descanso en cuanto abandoneis la localización actual:\n🧠 Imagina una localización inédita donde descansar unos instantes.\n❓ ¿A dónde fuisteis para despejarte? ¿Qué hiciste allí? ¿Qué secreto tuyo guarda relación con ese sitio?\n🧑‍🤝‍🧑 ¿Cómo le ayudaste?\n\n(Colocar mientras junto a la localización actual y devolverla al mazo de consecuencias después de usarla.)",
    "icono_efecto": null,
    "tipo_efecto": "restriccion_protagonista"
  },
  {
    "id": 5,
    "nombre": "Amistad",
    "cara_visible": false,
    "descripcion_trasera": "Voltea esta carta para descubrir su efecto",
    "descripcion_frente": "Mientras esta carta esté en juego, los desafíos se resuelven con un solo lanzamiento de moneda (sin ayuda de compañeros). Cuando un desafío se resuelva de forma desfavorable, devuelve esta carta al mazo de consecuencias.",
    "icono_efecto": null,
    "tipo_efecto": "restriccion_ayuda",
    "nota": "Se obtiene automáticamente cuando un jugador ayuda a otro en un desafío."
  },
  {
    "id": 6,
    "nombre": "Tiempo perdido",
    "cara_visible": false,
    "descripcion_trasera": "Mantén esta carta boca abajo hasta que se te indique",
    "descripcion_frente": "Bernardo está herido y sangrando.",
    "icono_efecto": "🩸",
    "tipo_efecto": "herida",
    "asociado_a": "Personaje 5: Bernardo"
  },
  {
    "id": 7,
    "nombre": "Ayuda conseguida",
    "cara_visible": true,
    "descripcion_trasera": "Pon esta carta boca arriba mostrando su contenido",
    "descripcion_frente": "Colocar junto a Localización 4: Botica de Gádor. Cuando se active una carta de narración gracias al efecto de esta carta, devolved esta carta a su mazo.",
    "icono_efecto": "💊",
    "tipo_efecto": "desbloqueo_localizacion",
    "asociado_a": "Localización 4: Botica de Gádor"
  },
  {
    "id": 8,
    "nombre": "Acceso conseguido",
    "cara_visible": true,
    "descripcion_trasera": "Pon esta carta boca arriba mostrando su contenido",
    "descripcion_frente": "Colocar junto a Localización 4: Botica de Gádor. Cuando se active una carta de narración gracias al efecto de esta carta, devolved esta carta a su mazo.",
    "icono_efecto": "🗝️",
    "tipo_efecto": "desbloqueo_localizacion",
    "asociado_a": "Localización 4: Botica de Gádor"
  },
  {
    "id": 9,
    "nombre": "Herido",
    "cara_visible": false,
    "descripcion_trasera": "Mantén esta carta boca abajo hasta que se te indique",
    "descripcion_frente": "Durante la narración actual, los desafíos se resolverán con un solo lanzamiento de moneda (sin ayuda de compañeros).\n🧠 Si en el reto participan animales, la sangre de la herida los hace más agresivos.\n❓ ¿Cómo te dificultó estar herido el reto?\nSi la resolución del desafío es desfavorable obtenéis Consecuencia 10.",
    "icono_efecto": null,
    "tipo_efecto": "restriccion_ayuda_y_condicional"
  },
  {
    "id": 10,
    "nombre": "Habladurías",
    "cara_visible": false,
    "descripcion_trasera": "Mantén esta carta boca abajo hasta que se te indique",
    "descripcion_frente": "Lleváis un rato notando miradas y cuchicheos a vuestro paso. Tenéis la sensación de que detrás de las ventanas medio cerradas, se esconden miradas y que la gente está hablando de vosotros. Esta sensación debe condicionar vuestras narraciones y decisiones durante la localización actual. Devuelve esta carta al mazo de consecuencias cuando abandonéis dicha localización.",
    "icono_efecto": null,
    "tipo_efecto": "modificador_narracion"
  },
  {
    "id": 11,
    "nombre": "Escopeta cargada",
    "cara_visible": false,
    "descripcion_trasera": "Mantén esta carta boca abajo hasta que se te indique",
    "descripcion_frente": "Si Consecuencia 3 está en juego, descarta ambas cartas y devuelvelas a su mazo ignorando el resto de esta carta.\nDurante la narración en curso, si decides resolver el desafío al que te enfrentas con la escopeta, lo superas automáticamente evitando realizar ningún lanzamiento de moneda.\nDevuelve esta carta al mazo de consecuencias después de usarla.",
    "icono_efecto": null,
    "tipo_efecto": "uso_manual_automatico"
  },
  {
    "id": 12,
    "nombre": "Perdón",
    "cara_visible": false,
    "descripcion_trasera": "Mantén esta carta boca abajo hasta que se te indique",
    "descripcion_frente": "🧠 Tras descubrir que Bernardo está herido mortalmente, detrás vuestra escucháis una voz femenina.\n\"Lo siento, de verás que lo siento\"\nEs Agustina \"La curandera\".\n🏁 Si solo tenéis un Efecto 🩸 en juego, coged Narración 53.\nSi tenéis más de un Efecto 🩸 en juego, coged Narración 54.",
    "icono_efecto": null,
    "tipo_efecto": "desencadenante",
    "fin_condicional": {
      "un_efecto_sangre": { "tipo": "ir_narracion", "id": 53 },
      "mas_de_un_efecto_sangre": { "tipo": "ir_narracion", "id": 54 }
    }
  },
  {
    "id": 13,
    "nombre": "Venganza",
    "cara_visible": false,
    "descripcion_trasera": "Mantén esta carta boca abajo hasta que se te indique",
    "descripcion_frente": "🧠 Tras descubrir que Bernardo está herido mortalmente, os parece escuchar el eco de Agustina \"La curandera\" pidiendo perdón. Pero no veis a nadie.\n🏁 Si tenéis más de un Efecto 🩸 en juego obtenéis Consecuencia 15. En cualquier caso, coged Narración 56.",
    "icono_efecto": null,
    "tipo_efecto": "desencadenante"
  },
  {
    "id": 14,
    "nombre": "Herida grave",
    "cara_visible": true,
    "descripcion_trasera": "Pon esta carta boca arriba mostrando su contenido",
    "descripcion_frente": "Si Consecuencia 6 está en juego, el protagonista recibe una herida grave. Colocar junto al protagonista.\nSi no, durante el combate la herida de Bernardo se ha agravado demasiado. Colocar junto a Personaje 5: Bernardo.",
    "icono_efecto": "🩸",
    "tipo_efecto": "herida_grave"
  },
  {
    "id": 15,
    "nombre": "Secuelas",
    "cara_visible": true,
    "descripcion_trasera": "Pon esta carta boca arriba mostrando su contenido",
    "descripcion_frente": "El compañero herido no muere, pero la herida le acarreará grandes secuelas físicas durante el resto de su vida. Coloca esta carta sobre la carta de Consecuencia 14: Herida grave.",
    "icono_efecto": null,
    "tipo_efecto": "modificador_herida"
  }
]
;