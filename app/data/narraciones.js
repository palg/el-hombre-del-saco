window.DATA_NARRACIONES = {
    "value":  [
                  {
                      "id":  1,
                      "titulo":  "Inicio",
                      "imagina":  null,
                      "narracion_inicial":  "\"Aquella mañana habíamos salido de excursión todos juntos. Hacía un día excelente. ¡Quién iba a pensar que terminaría de aquella manera…\". En fin, como iba diciendo, queríamos ir a explorar la cueva del barranco, … \u003cseguir\u003e\"",
                      "preguntas_protagonista":  [
                                                     "¿Cómo comenzó el día?",
                                                     "¿A dónde íbais?",
                                                     "¿Puedes contar la leyenda de la cueva? ¿Quién te la enseñó?"
                                                 ],
                      "imagina_texto":  "Inventa una leyenda sobre la cueva del barranco del Jalvo.",
                      "pregunta_interaccion":  "¿Tú qué pensabas de esa leyenda que ha contado tu compañero?",
                      "desafio":  null,
                      "resoluciones":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Poned en juego Localización 1 y viajad a Localización 1.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "poner_localizacion",
                                                       "id":  1
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  1
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  2,
                      "titulo":  "La cueva",
                      "imagina_texto":  "Dentro de la cueva algo extraño llama tu atención entre las sombras ¿Unos huesos dispersos? ¿El reflejo fugaz de un rostro? ¿Una pequeña caja con marcas inquietantes? ¿O tal vez otra cosa?",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era la cueva por dentro?",
                                                     "¿Habías estado antes allí?",
                                                     "¿Qué es aquello tan extraño que os sucedió al entrar?",
                                                     "¿Cómo reaccionaste?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  "¿Tú qué pensabas de aquello tan extraño que visteis?",
                      "pregunta_decision":  "¿Qué hacéis a continuación?",
                      "decisiones":  [
                                         {
                                             "opcion":  "Seguir adelante",
                                             "carta":  3
                                         },
                                         {
                                             "opcion":  "Abandonar la cueva",
                                             "carta":  4
                                         }
                                     ],
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  null
                  },
                  {
                      "id":  3,
                      "titulo":  "No era nada",
                      "imagina_texto":  "Al acercaros, descubrís que en realidad no es nada extraño. Imagina una explicación racional y vanal para lo que habíais descubierto.",
                      "preguntas_protagonista":  [
                                                     "¿Que era en realidad aquello qué visteis en la cueva?"
                                                 ],
                      "pregunta_interaccion":  "¿Cómo reaccionaste al descubrirlo?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [
                                                  1
                                              ],
                      "fin":  {
                                  "texto":  "Obtenéis Consecuencia 1. Coged Narración 4.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "obtener_consecuencia",
                                                       "id":  1
                                                   },
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  4
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  4,
                      "titulo":  "Bernardo ríe",
                      "narracion_inicial":  "\"Al darnos la vuelta para salir de la cueva vimos a Bernardo sonriente a nuestras espaldas riéndose a carcajadas. Tras acusarnos de ser unos miedosos se ajustó su gorra y nos retó a una carrera hasta la carretera. Ninguno de nosotros dudó un solo instante y salimos a la carrera entre carcajadas\"",
                      "preguntas_protagonista":  [
                                                     "Dejáis atrás la cueva y salís corriendo de vuelta ¿Qué recuerdas de aquella carrera?",
                                                     "¿Quién hizo trampas y cómo?",
                                                     "¿Por dónde cruzaste tú para atajar?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Qué recuerdas de aquella carrera?",
                                                   "¿Cuál fue tu estrategia?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "accion_especial":  {
                                              "tipo":  "abandonar_localizacion",
                                              "id":  1
                                          },
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 5.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  5
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  5,
                      "titulo":  "El lechero",
                      "imagina_texto":  "Al llegar a la carretera, ves acercarse un carro: es el lechero haciendo el reparto y estás a punto de chocar contra él.",
                      "preguntas_protagonista":  [
                                                     "¿Qué ocurrió al llegar a la carretera?",
                                                     "¿Cómo era el entorno de la carretera?",
                                                     "¿Puedes describir al lechero y el carro?",
                                                     "¿De qué conocías de antes al lechero?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "¿Llegaste a chocar contra el lechero?",
                                      "desfavorable":  {
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  2
                                                       }
                                  },
                      "pregunta_interaccion":  [
                                                   "¿Qué ocurrió con el lechero?",
                                                   "¿Huiste para evitar las represalias o te quedaste a arreglar el jaleo?"
                                               ],
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 6.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  6
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  6,
                      "titulo":  "Bernardo ha desaparecido",
                      "imagina_texto":  "Cuando todo se tranquiliza, descubrís que Bernardo no está.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo te diste cuenta de que faltaba Bernardo?",
                                                     "¿Dónde estábais cuando os disteis cuenta?",
                                                     "¿Os había pasado antes algo parecido?",
                                                     "¿Cómo reaccionaste al descubrirlo?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  "¿Cómo reaccionaste al descubrirlo?",
                      "pistas":  [
                                     1
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Poned en juego Localización 2. Poned en juego Localización 3. Viajad a la Localización que queráis investigar en busca de Bernardo.",
                                  "acciones":  [
                                                   {
                                                       "id":  2,
                                                       "tipo":  "poner_localizacion"
                                                   },
                                                   {
                                                       "id":  3,
                                                       "tipo":  "poner_localizacion"
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  2,
                                                       "texto":  "🗺️ Viajar a la Casa de Bernardo (Localización 2)"
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  3,
                                                       "texto":  "🗺️ Viajar a la Iglesia de Rioja (Localización 3)"
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  7,
                      "titulo":  "La casa de Bernardo",
                      "preguntas_protagonista":  [
                                                     "¿Por qué decidís ir a la casa de Bernardo?",
                                                     "¿Cómo fue el camino hasta su casa?",
                                                     "¿Cómo era la casa?"
                                                 ],
                      "pregunta_interaccion_especial":  {
                                                            "hermano":  "¿Cómo era la vida en tu casa?",
                                                            "resto":  "¿Habías estado alguna vez antes allí?"
                                                        },
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  8,
                                                       "texto":  "▶ Registrar la casa de Bernardo (Narración 8)"
                                                   }
                                               ],
                                  "texto":  "Continuad con el registro de la casa de Bernardo."
                              }
                  },
                  {
                      "id":  8,
                      "titulo":  "No hay rastro de Bernardo en su casa",
                      "imagina_texto":  "No hay ni rastro de Bernardo en su casa. Esto provoca una discusión grave con su padre, especialmente con el hermano.",
                      "preguntas_protagonista":  [
                                                     "¿Encontrásteis a Bernardo en su casa?",
                                                     "¿Qué sentiste?",
                                                     "¿Qué ocurrió con su padre?"
                                                 ],
                      "pregunta_interaccion_especial":  {
                                                            "hermano":  "¿Era la primera vez que ocurría algo con tu hermano?",
                                                            "resto":  "¿Cómo reaccionaste ante la situación?"
                                                        },
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_condicional":  {
                                                        "condicion":  "Si tenéis la Consecuencia 1: Valentía, se devuelve. Si no, obtenéis Consecuencia 3.",
                                                        "si_consecuencia_1":  {
                                                                                  "tipo":  "devolver_consecuencia",
                                                                                  "id":  1
                                                                              },
                                                        "sino":  {
                                                                     "tipo":  "obtener_consecuencia",
                                                                     "id":  3
                                                                 }
                                                    },
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "id":  2,
                                                       "tipo":  "abandonar_localizacion"
                                                   }
                                               ],
                                  "texto":  "Abandonáis la casa de Bernardo con las manos vacías y viajáis a otra localización."
                              }
                  },
                  {
                      "id":  9,
                      "titulo":  "La iglesia",
                      "imagina_texto":  "La iglesia está en silencio pero adornada para las fiestas. No hay ni rastro de Bernardo. Encontráis una llave dorada.",
                      "preguntas_protagonista":  [
                                                     "¿Por qué decidís ir la iglesia?",
                                                     "¿Cómo fue el camino hasta la iglesia?",
                                                     "¿Qué te sentiste en la iglesia ante tanto silencio y decoración?",
                                                     "¿Encontrásteis a Bernardo en la iglesia?",
                                                     "¿Cómo te sentiste?",
                                                     "¿Dónde estaba la llave?",
                                                     "¿Por qué cogísteis la llave?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cómo reaccionaste?",
                                                   "¿Qué pensaste de la llave?"
                                               ],
                      "desafio":  null,
                      "pistas":  [
                                     5
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "id":  3,
                                                       "tipo":  "abandonar_localizacion"
                                                   }
                                               ],
                                  "texto":  "Guardáis la llave dorada (Pista 5) y abandonáis la iglesia para seguir buscando a Bernardo."
                              }
                  },
                  {
                      "id":  10,
                      "titulo":  "Pistas en la cueva",
                      "imagina_texto":  "En las inmediaciones de la cueva encontráis algunas pistas.",
                      "preguntas_protagonista":  [
                                                     "¿Qué encontrasteis allí?",
                                                     "¿Qué te hizo pensar todo aquello?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion_especial":  {
                                                            "hermano":  "¿Cómo te sentiste al encontrar todo aquello? ¿Qué puedes contar de la etiqueta?",
                                                            "resto":  "¿Cómo te sentiste con el descubrimiento?"
                                                        },
                      "pistas":  [
                                     2,
                                     3,
                                     4
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "decision":  {
                                       "texto":  "Si queréis examinar a fondo el tarro, coged Narración 11. En otro caso, viajad a otra localización.",
                                       "si":  {
                                                  "tipo":  "ir_narracion",
                                                  "id":  11
                                              }
                                   },
                      "fin":  null
                  },
                  {
                      "id":  11,
                      "titulo":  "El tarro",
                      "imagina_texto":  "Dentro del tarro hay un líquido semi transparente y amarillento que hace que te marees al olerlo más de cerca.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era el tarro?",
                                                     "¿Por qué decidiste olerlo?",
                                                     "¿Qué contenía?",
                                                     "¿Qué te ocurrió al olerlo?"
                                                 ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "El jugador afectado obtiene Consecuencia 4.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "obtener_consecuencia",
                                                       "id":  4
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  12,
                      "titulo":  "La cocina de Bernardo",
                      "cambio_protagonista":  "Hermano",
                      "imagina_texto":  "En la cocina encuentras la receta de una fórmula magistral.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era la cocina?",
                                                     "¿Tienes algún recuerdo especial?",
                                                     "¿Qué encuentras allí?",
                                                     "¿Qué conclusiones sacas?"
                                                 ],
                      "pregunta_interaccion":  "¿Qué crees que significa el tarro que encontrasteis?",
                      "desafio":  null,
                      "pistas":  [
                                     6
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Abandonáis esta localización. Descarta todas las localizaciones. Apila las pistas 2, 3, 4 y 6 a un lado para su posterior consulta. Poned en juego Localización 4. Coged Narración 13.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "descartar_todas_localizaciones"
                                                   },
                                                   {
                                                       "tipo":  "poner_localizacion",
                                                       "id":  4
                                                   },
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  13
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  13,
                      "titulo":  "Interludio",
                      "narracion_inicial":  "\"Todo apuntaba a que a Bernardo le había ocurrido algo y nuestra única pista sólida era una etiqueta de la botica de Gádor. Así que decidimos volver a salir del pueblo y dirigirnos a Gádor antes de que fuese más tarde\"",
                      "preguntas_protagonista":  [
                                                     "¿Teníais algún plan?",
                                                     "¿Por qué debíais encontrar a Bernardo vosotros solos?",
                                                     "¿Cómo os preparasteis para el viaje?",
                                                     "¿Te arrepientes a día de hoy de no haber pedido ayuda a los adultos?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Qué pasaba por tu cabeza ante lo que se avecinaba?",
                                                   "¿Hiciste algo antes de salir hacia Gádor?",
                                                   "¿Qué miedo o esperanza asaltaba tu mente?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 14.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  14
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  14,
                      "titulo":  "El viaje",
                      "narracion_inicial":  "\"Todo ocurrió muy deprisa. Cuando estábamos ya preparados para salir en busca de Bernardo, nos dimos cuenta que ya era medio día. Teníamos que darnos prisa o la noche se nos echaría encima\"",
                      "preguntas_protagonista":  [
                                                     "¿Donde descansastéis a mitad de camino?",
                                                     "¿Con quién os encontrásteis poco después?",
                                                     "¿Cómo fue el encuentro con Julio?",
                                                     "¿Qué comportamiento extraño tuvo frente a vosotros?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  "¿Que historia habías escuchado sobre Julio?",
                      "pistas":  [

                                 ],
                      "personajes_secundarios":  [
                                                     6
                                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 15.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  15
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  15,
                      "titulo":  "Llegada a Gádor",
                      "narracion_inicial":  "\"Después de un rato deambulando por los caminos, llegamos por fin a Gádor\"",
                      "preguntas_protagonista":  [
                                                     "¿Habías estado antes en Gádor?",
                                                     "¿Cómo era el ambiente ese día en Gádor?",
                                                     "¿Cómo averiguasteis la localización de la botica?"
                                                 ],
                      "pregunta_interaccion":  "¿Habías estado antes en Gádor?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Viajad a Localización 4.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  4
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  16,
                      "titulo":  "La botica cerrada",
                      "imagina_texto":  "La botica de Antonio Leona está cerrada. Un cartel indica que está en la barbería de más abajo y que volverá en breve.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo es por fuera la botica?",
                                                     "¿Estaba abierta en ese momento?",
                                                     "¿Dónde estaba el boticario?"
                                                 ],
                      "pregunta_interaccion":  "¿Cómo te sentiste al ver la botica cerrada?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "personajes_secundarios":  [

                                                 ],
                      "localizaciones_nuevas":  [
                                                    5
                                                ],
                      "decision":  {
                                       "texto":  "¿Qué hacéis a continuación?",
                                       "opciones":  [
                                                        {
                                                            "opcion":  "Esperáis",
                                                            "carta":  17
                                                        },
                                                        {
                                                            "opcion":  "Intentáis entrar solos",
                                                            "carta":  18
                                                        },
                                                        {
                                                            "opcion":  "Os asomáis a la barbería",
                                                            "accion":  {
                                                                           "tipo":  "viajar",
                                                                           "id":  5
                                                                       }
                                                        }
                                                    ]
                                   },
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  null
                  },
                  {
                      "id":  17,
                      "titulo":  "La espera",
                      "imagina_texto":  "Mientras esperáis se cruza con vosotros un conocido que no quieres que se entere de vuestro problema por algo de tu pasado. El boticario no aparece hasta pasados 30 minutos discutiendo con el barbero a lo lejos.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo fue la espera?",
                                                     "¿Quién pasó por allí mientras?",
                                                     "¿Qué ocurrió con esa persona?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  "¿Cómo fue la espera?",
                      "pistas":  [

                                 ],
                      "personajes_secundarios":  [
                                                     7,
                                                     8
                                                 ],
                      "preguntas_tras_personajes":  [
                                                        "¿Comó eran el boticario y el barbero?"
                                                    ],
                      "consecuencias_fijas":  [
                                                  6
                                              ],
                      "fin":  {
                                  "texto":  "Obtenéis Consecuencia 6. Coged Narración 22.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "obtener_consecuencia",
                                                       "id":  6
                                                   },
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  22
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  18,
                      "titulo":  "Entrando a la botica",
                      "imagina_texto":  "Pensad de qué forma os coláis dentro de la botica.",
                      "preguntas_protagonista":  [
                                                     "¿Por qué decidisteis entrar sin permiso?",
                                                     "¿Habíais hecho antes algo así?",
                                                     "¿Cómo hicisteis para colaros?",
                                                     "¿Qué obstáculo surgió en mitad del plan inesperadamente?",
                                                     "¿Cómo amenazaba ese obstáculo vuestra integridad física?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙👻",
                                      "texto":  "¿Salió bien finalmente el plan?",
                                      "favorable":  {
                                                        "tipo":  "obtener_consecuencia",
                                                        "id":  1,
                                                        "texto":  "Obtenéis Consecuencia 1"
                                                    },
                                      "desfavorable":  {
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  9,
                                                           "texto":  "Obtenéis Consecuencia 9"
                                                       }
                                  },
                      "pregunta_interaccion":  [
                                                   "¿Estuviste de acuerdo con entrar de esa forma?",
                                                   "¿Cómo te sentiste?",
                                                   "¿Qué pensaste ante el obstáculo?"
                                               ],
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 24.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  24
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  19,
                      "titulo":  "La barbería por fuera",
                      "imagina_texto":  "La barbería es parte de una pequeña casa algo cochambrosa. Frente a su fachada sientes una extraña sensación que no sabes muy bien si es por el miedo de no saber dónde está Bernardo, el mal olor de la calle o por el recuerdo de algo que te ocurrió cuando eras más pequeño (inventa este recuerdo).",
                      "preguntas_protagonista":  [
                                                     "¿Dónde estaba la barbería?",
                                                     "¿Cómo era por fuera la barbería?",
                                                     "¿Cómo te sentiste al llegar a la puerta?",
                                                     "¿Qué es eso que te ocurrió cuando eras más pequeño y que te vino a la mente en ese momento?"
                                                 ],
                      "pregunta_interaccion":  "¿Conocías esa historia de vuestro compañero?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  20,
                                                       "texto":  "▶ Asomarse al interior de la barbería (Narración 20)"
                                                   }
                                               ],
                                  "texto":  "Decidís actuar frente a la barbería."
                              }
                  },
                  {
                      "id":  20,
                      "titulo":  "Dentro de la barbería",
                      "imagina_texto":  "Dentro de la barbería encontráis al barbero afeitando al boticario mientras discuten de forma seria. En una percha veis la chaqueta del boticario y de su bolsillo cuelga una llave grande.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era por dentro la barbería y quién había?",
                                                     "¿Cómo eran el boticario y el barbero?",
                                                     "¿Qué música sonaba y a qué olía?",
                                                     "¿Qué sensación te daba?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  "¿Cómo te sentiste dentro de la barbería?",
                      "pistas":  [

                                 ],
                      "personajes_secundarios":  [
                                                     7,
                                                     8
                                                 ],
                      "consecuencias_condicional_arrow":  {
                                                              "id":  2,
                                                              "descripcion":  "Si Consecuencia 2 está en juego, ponedla boca arriba."
                                                          },
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 21.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  21
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  21,
                      "titulo":  "El plan en la barbería",
                      "preguntas_protagonista":  [
                                                     "¿Cómo procedisteis para conseguir algo que os permitiese entrar solos a la botica o provocar que el boticario saliese antes y os atendiera?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Confiabas en el plan ideado?",
                                                   "¿Participaste en el plan?"
                                               ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "¿Conseguisteis vuestro propósito?",
                                      "favorable_a":  {
                                                          "descripcion":  "Si habéis conseguido que el boticario os atienda, obtenéis Consecuencia 7.",
                                                          "tipo":  "obtener_consecuencia",
                                                          "id":  7
                                                      },
                                      "favorable_b":  {
                                                          "descripcion":  "Si habéis conseguido algo que os da acceso a la botica sin el boticario, obtenéis Consecuencia 8.",
                                                          "tipo":  "obtener_consecuencia",
                                                          "id":  8
                                                      },
                                      "desfavorable":  {
                                                           "descripcion":  "Os echan fuera de la barbería. Coged Narración 17.",
                                                           "tipo":  "ir_narracion",
                                                           "id":  17
                                                       }
                                  },
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Viajad a Localización 4.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  4
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  22,
                      "titulo":  "Con el boticario en la botica",
                      "imagina_texto":  "Entráis en la botica junto con el boticario. Cientos de botes de cristal rodean la estancia en amplias estanterías de madera. El olor de la botica te hace recordar una trágica historia familiar. El boticario os comenta que el líquido del tarro es peligroso y que no debéis olerlo.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era la botica?",
                                                     "¿Qué recuerdo te vino a la mente?",
                                                     "¿Qué os dijo sobre el líquido del tarro?",
                                                     "¿Te parecía de fiar el boticario?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cómo te sentiste dentro de la botica?",
                                                   "¿Conocías la historia de tu compañero?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 23.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  23
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  23,
                      "titulo":  "La etiqueta de Agustina",
                      "imagina_texto":  "El boticario os dice que el número de la etiqueta que lleváis es de Agustina \"La curandera\". Os mira extrañado y os pregunta por qué tenéis vosotros eso. Inventa un secreto de familia relacionado con Agustina.",
                      "preguntas_protagonista":  [
                                                     "¿Qué os dijo sobre la etiqueta del tarro?",
                                                     "¿Cómo explicasteis tener ese tarro?",
                                                     "¿Cómo convencisteis al boticario para que os hablase de Agustina?",
                                                     "¿Qué sabías de Agustina?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "¿Levantasteis sospechas?",
                                      "desfavorable":  {
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  10
                                                       }
                                  },
                      "pregunta_interaccion":  "¿Habías oído hablar alguna vez de Agustina?",
                      "pistas":  [

                                 ],
                      "personajes_secundarios":  [
                                                     9
                                                 ],
                      "localizaciones_nuevas":  [
                                                    6
                                                ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "id":  6,
                                                       "tipo":  "poner_localizacion"
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  6,
                                                       "texto":  "🗺️ Viajar al Cortijo de la Luna (Localización 6)"
                                                   }
                                               ],
                                  "texto":  "El boticario os señala dónde vive Agustina: el Cortijo de la Luna a las afueras de Gádor."
                              }
                  },
                  {
                      "id":  24,
                      "titulo":  "Solos en la botica",
                      "imagina_texto":  "Entráis en la botica en medio del silencio. Cientos de botes de cristal rodean la estancia en amplias estanterías de madera. El olor de la botica te hace recordar una trágica historia familiar. Buscáis en los cajones el inventario de ventas de la botica mientras rezais porque no vuelva el boticario.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era la botica?",
                                                     "¿Qué recuerdo te vino a la mente?",
                                                     "¿Cómo encontrasteis la información sobre el frasco?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cómo te sentiste dentro de la botica?",
                                                   "¿Conocías la historia de tu compañero?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 25.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  25
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  25,
                      "titulo":  "El pedido de Agustina",
                      "imagina_texto":  "Encontráis el pedido relacionado con el tarro a nombre de Agustina \"La curandera\". Inventa un secreto de tu familia relacionado con Agustina. Al poco, escucháis al boticario abriendo la puerta mientras discute con el barbero a lo lejos.",
                      "preguntas_protagonista":  [
                                                     "¿Qué sabías de Agustina?",
                                                     "¿Quién llegó de pronto?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "¿Conseguís salir sin ser vistos?",
                                      "desfavorable":  {
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  10
                                                       }
                                  },
                      "pregunta_interaccion":  "¿Conocías la historia de tu compañero?",
                      "pistas":  [

                                 ],
                      "personajes_secundarios":  [
                                                     7,
                                                     8
                                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 26.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  26
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  26,
                      "titulo":  "Buscando a alguien en Gádor",
                      "imagina_texto":  "No conocéis mucho más de esa tal Agustina ni dónde vive. Imagina un personaje al que conoces en Gádor y está relacionado con un trauma tuyo.",
                      "preguntas_protagonista":  [
                                                     "¿A quién acudís en Gádor para conocer más información sobre Agustina?",
                                                     "¿Dónde lo encontráis?",
                                                     "¿Cómo es el encuentro?"
                                                 ],
                      "pregunta_interaccion":  "¿Cómo fue el encuentro con esa persona?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "personajes_secundarios":  [
                                                     9
                                                 ],
                      "localizaciones_nuevas":  [
                                                    6
                                                ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "id":  6,
                                                       "tipo":  "poner_localizacion"
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  6,
                                                       "texto":  "🗺️ Viajar al Cortijo de la Luna (Localización 6)"
                                                   }
                                               ],
                                  "texto":  "Averiguáis la ubicación del consultorio de Agustina en el Cortijo de la Luna."
                              }
                  },
                  {
                      "id":  27,
                      "titulo":  "El cortijo de la Luna",
                      "imagina_texto":  "La tarde comienza a avanzar. El cortijo es una pequeña casa de una planta rodeado de un vallado, dentro del cual merodea un perro. En la parte trasera hay una ventana medio rota pero a bastante altura.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era el cortijo de la Luna?",
                                                     "¿Cómo hicisteis para entrar?",
                                                     "¿Qué problema os encontrásteis?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "¿Entrasteis sin problemas?",
                                      "desfavorable_a":  {
                                                             "descripcion":  "Si os enfrentasteis al perro, obtenéis Consecuencia 4.",
                                                             "tipo":  "obtener_consecuencia",
                                                             "id":  4
                                                         },
                                      "desfavorable_b":  {
                                                             "descripcion":  "En otro caso, obtenéis Consecuencia 10.",
                                                             "tipo":  "obtener_consecuencia",
                                                             "id":  10
                                                         }
                                  },
                      "consecuencia_arrow":  {
                                                 "id":  9
                                             },
                      "pregunta_interaccion":  [
                                                   "¿Estuviste de acuerdo con entrar de esa forma? ¿Cómo te sentiste?"
                                               ],
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 28.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  28
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  28,
                      "titulo":  "Dentro del cortijo",
                      "imagina_texto":  "Dentro, un ambiente de pobreza domina la decoración. Una foto de Agustina decora la chimenea. Botellas medio vacías pueblan las mesas. Junto a una, hay una nota.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era la estancia principal?",
                                                     "¿Puedes describir a Agustina?",
                                                     "¿Qué nota encontrásteis?",
                                                     "¿Qué creías que significaba?",
                                                     "¿Quién encontró la nota?",
                                                     "¿Sabías algo de \"El moruno\"?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Sentías algo dentro del cortijo?",
                                                   "¿Alguna otra cosa llamó tu atención?",
                                                   "¿Qué creías que significaba la nota?",
                                                   "¿Sabías algo de \"El moruno\"?"
                                               ],
                      "desafio":  null,
                      "pistas":  [
                                     7
                                 ],
                      "personajes_secundarios":  [
                                                     10
                                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 29.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  29
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  29,
                      "titulo":  "El dormitorio",
                      "imagina_texto":  "La única estancia adicional es un oscuro dormitorio. En una pequeña mesita de noche hay otra nota.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era el dormitorio?",
                                                     "¿Qué nota encontrásteis?",
                                                     "¿Qué creías que significaba?",
                                                     "¿Quién encontró la nota?",
                                                     "¿Qué conclusión sacasteis de todo esto?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Alguna otra cosa llamó tu atención?",
                                                   "¿Qué creías que significaba la nota?",
                                                   "¿Qué opinabas de lo que pasaba?"
                                               ],
                      "desafio":  null,
                      "pistas":  [
                                     8
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 30.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  30
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  30,
                      "titulo":  "Llaman a la puerta",
                      "imagina_texto":  "Cuando habéis terminado de registrar las habitaciones escucháis que llaman a la puerta. Inventa un recuerdo tuyo que te viene a la cabeza en ese momento.",
                      "preguntas_protagonista":  [
                                                     "¿Qué sentiste cuando llamaron a la puerta?",
                                                     "¿Cómo te sentiste?",
                                                     "¿Qué recuerdo acudió a ti?",
                                                     "¿Quién pensabas que serías?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  [
                                                   "¿Quién pensabas que sería?",
                                                   "¿Cómo te sentiste?"
                                               ],
                      "decision":  {
                                       "texto":  "¿Qué decidís hacer?",
                                       "opciones":  [
                                                        {
                                                            "opcion":  "Esperar",
                                                            "carta":  31
                                                        },
                                                        {
                                                            "opcion":  "Huir",
                                                            "carta":  32
                                                        }
                                                    ]
                                   },
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  null
                  },
                  {
                      "id":  31,
                      "titulo":  "Esperando",
                      "imagina_texto":  "Tras un rato difícil de determinar, podéis estar seguros de que ya no hay nadie esperando fuera.",
                      "preguntas_protagonista":  [
                                                     "¿Qué hicísteis mientras esperabais?",
                                                     "¿Se hizo larga la espera?"
                                                 ],
                      "pregunta_interaccion":  "¿Qué pensamiento te pasó por la cabeza mientras esperabais?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [
                                                  3,
                                                  6
                                              ],
                      "fin":  {
                                  "texto":  "Obtenéis Consecuencia 3. Obtenéis Consecuencia 6. Viajad a otra localización.",
                                  "acciones":  [
                                                   {
                                                       "id":  3,
                                                       "tipo":  "obtener_consecuencia"
                                                   },
                                                   {
                                                       "id":  6,
                                                       "tipo":  "obtener_consecuencia"
                                                   },
                                                   {
                                                       "tipo":  "abandonar_localizacion",
                                                       "texto":  "🗺️ Abandonar sitio y elegir nuevo destino"
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  32,
                      "titulo":  "La huida",
                      "imagina_texto":  "Planead la huida, ya sea mediante confrontación con los visitantes o sigilosamente por la ventana.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo planeasteis la huida?",
                                                     "¿Cómo te sentiste?"
                                                 ],
                      "pregunta_interaccion":  "¿Estabas de acuerdo con el plan?",
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "¿Salió bien finalmente el plan?",
                                      "favorable":  {
                                                        "descripcion":  "Si hubo confrontación, obtenéis Consecuencia 1.",
                                                        "tipo":  "obtener_consecuencia",
                                                        "id":  1
                                                    },
                                      "desfavorable":  {
                                                           "descripcion":  "Si salisteis por la ventana, obtenéis Consecuencia 9.",
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  9
                                                       }
                                  },
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Viajad a otra localización.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "abandonar_localizacion",
                                                       "texto":  "🗺️ Abandonar sitio y elegir nuevo destino"
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  33,
                      "titulo":  "La barbería cerrada",
                      "imagina_texto":  "Media tarde, el cielo comienza a nublarse. Extrañamente, la barbería ha cerrado antes de tiempo. La puerta de acceso no está bloqueada. Desde fuera, no parece que dentro haya nadie.",
                      "consecuencia_arrow":  {
                                                 "id":  10
                                             },
                      "preguntas_protagonista":  [
                                                     "¿Cómo estaba la barbería?",
                                                     "¿Os preocupaba encontraros algo o alguien dentro?",
                                                     "¿Por qué decidisteis entrar sin permiso?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Estabas de acuerdo con entrar?",
                                                   "¿Qué te preocupaba?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 34.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  34
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  34,
                      "titulo":  "La barbería abandonada",
                      "imagina_texto":  "La barbería está sin recoger, como si el barbero hubiese dejado repentinamente sus labores. Ves algo que no te encaja. Una puerta lleva al interior de la vivienda del barbero.",
                      "preguntas_protagonista":  [
                                                     "¿Puedes describir el estado en el que encontrásteis la barbería?",
                                                     "¿Qué es eso que viste que no te encajaba en la escena?",
                                                     "¿Qué te hizo sentir?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cómo viste reaccionar a tu compañero?",
                                                   "¿Cómo interpretaste tú ese hecho?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 35.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  35
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  35,
                      "titulo":  "El dormitorio del barbero",
                      "imagina_texto":  "La puerta os lleva a un austero dormitorio. En una pequeña repisa hay una foto del barbero, Francisco Leona. Hay dos puertas más, una abierta que comunica con cocina y otra cerrada, como antigua y deteriorada, pero con un grabado.",
                      "preguntas_protagonista":  [
                                                     "¿Puedes describir el dormitorio?",
                                                     "¿Puedes describir a Francisco Leona?",
                                                     "¿Dónde habías visto antes una puerta como la antigua y por qué te pareció tan inquietante?"
                                                 ],
                      "pregunta_interaccion":  "¿Te suponía algún problema estar allí dentro?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 36.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  36
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  36,
                      "titulo":  "La cocina",
                      "imagina_texto":  "La puerta abierta os lleva a una pequeña cocina con enseres escasos, sucios y desordenados, donde un ligero olor a putrefacción os recibe. Una pequeña grieta en la pared deja pasar una intensa luz rojiza.",
                      "preguntas_protagonista":  [
                                                     "¿Puedes describir la cocina?",
                                                     "¿Cómo reaccionaste al ambiente?",
                                                     "¿Qué imaginaste que era esa luz rojiza y cuál podía ser su origen?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Entraste en la cocina o preferiste esperar fuera?",
                                                   "¿Qué pensaste al ver la luz rojiza?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 37.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  37
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  37,
                      "titulo":  "La puerta misteriosa",
                      "imagina_texto":  "La puerta antigua con el grabado está cerrada con un maltrecho cerrojo a punto de ceder.",
                      "preguntas_protagonista":  [
                                                     "¿Qué imaginabas que había detrás de aquella puerta?",
                                                     "¿Cómo os la ingeniastaeis para abrirla?",
                                                     "¿Os preocupaba hacer demasiado ruido?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙👻🔒",
                                      "texto":  "¿Os hicísteis daño al abrir la puerta?",
                                      "desfavorable":  {
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  9
                                                       }
                                  },
                      "pregunta_interaccion":  [
                                                   "¿Qué imaginabas que había detrás de aquella puerta?",
                                                   "¿En algún momento pensaste que estábais yendo demasiado lejos?"
                                               ],
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 38.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  38
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  38,
                      "titulo":  "El trance",
                      "imagina_texto":  "Descubrís una pequeña habitación sin ventanas, iluminada solo por velas que titilan una pobre luz rojiza sobre las paredes. Repentinamente, os quedáis paralizados y por vuestras bocas surgen voces que no son vuestras. Una de las voces (1️⃣) la identificais como la del barbero Francisco Leona.",
                      "preguntas_protagonista":  [
                                                     "¿Qué os pasó en esa habitación?",
                                                     "¿Qué decían esas voces?"
                                                 ],
                      "instruccion_especial":  "Cuando narreis la conversación descrita en Pista 9, id leyendo una frase cada uno en turnos e intentad imitar una voz ajena.",
                      "desafio":  null,
                      "pistas":  [
                                     9
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 39.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  39
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  39,
                      "titulo":  "La mesa de objetos",
                      "imagina_texto":  "Tras el trance, ante vosotros descubrís una mesa llena de objetos en medio de la habitación.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo os sentisteis durante el trance? ¿Y después?",
                                                     "¿Qué encontrasteis en la mesa?",
                                                     "¿Qué conclusión sacasteis a partir de lo que habíais descubierto?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  [
                                                   "¿Qué puedes contar del trance?",
                                                   "¿Qué pasaba por tu cabeza?"
                                               ],
                      "pistas":  [
                                     10,
                                     11,
                                     12
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Descarta todas las localizaciones. Apila todas las pistas menos la 1 a un lado. Poned en juego la Localización 7A. Coged Narración 40.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "descartar_todas_localizaciones"
                                                   },
                                                   {
                                                       "tipo":  "poner_localizacion",
                                                       "id":  "7A"
                                                   },
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  40
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  40,
                      "titulo":  "El rescate",
                      "narracion_inicial":  "\"El sol empezaba a esconderse y el tiempo se nos estaba acabando. Ni siquiera sabíamos con seguridad si Bernardo seguía vivo. Teníamos que llegar a aquel cortijo antes de que la noche se nos echase encima\"",
                      "preguntas_protagonista":  [
                                                     "¿Hicisteis algo antes de salir de Gádor?",
                                                     "¿Cómo fue el camino hasta el cortijo?",
                                                     "¿Qué creías que estaba pasando?",
                                                     "¿Discutisteis algún plan?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Tenías alguna esperanza todavía de encontrar a Bernardo a salvo?",
                                                   "¿Qué pasaba por tu cabeza ante lo que se avecinaba?",
                                                   "¿Qué creías que estaba pasando?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Viajad a Localización 7A.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  "7A"
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  41,
                      "titulo":  "El exterior del cortijo",
                      "imagina_texto":  "Es de noche, con el cielo cerrado. Un estrecho sendero os lleva hasta el cortijo. Al lado del edificio principal hay un corral y en el otro extremo una pequeña cueva. En el exterior un pequeño banco os permite descansar junto a un pozo, en el cual, para vuestro consuelo, no hay nada.",
                      "preguntas_protagonista":  [
                                                     "¿Cuándo llegasteis al cortijo?",
                                                     "¿Cómo era el exterior del cortijo?",
                                                     "¿Encontrasteis algo en el exterior del cortijo?",
                                                     "¿Qué hicísteis en el exterior del cortijo?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cual fue tu impresión al llegar al cortijo?",
                                                   "¿Qué pensaste que debíais hacer en el cortijo?"
                                               ],
                      "desafio":  null,
                      "pistas":  [
                                     13,
                                     14
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "tipo":  "explorar_zona",
                                                       "id":  42,
                                                       "texto":  "▶ Explorar Cueva exterior (Narración 42)"
                                                   },
                                                   {
                                                       "tipo":  "explorar_zona",
                                                       "id":  44,
                                                       "texto":  "▶ Explorar Gallinero (Narración 44)"
                                                   },
                                                   {
                                                       "tipo":  "explorar_zona",
                                                       "id":  45,
                                                       "texto":  "▶ Entrar al interior del cortijo (Narración 45)"
                                                   }
                                               ],
                                  "texto":  "Llegáis al cortijo de San Patricio y examináis el terreno exterior."
                              }
                  },
                  {
                      "id":  42,
                      "titulo":  "La cueva del loco",
                      "imagina_texto":  "En el interior de una pequeña cueva abandonada hay un camastro sobre el que duerme Julio \"el loco\". Apoyada, junto a la cama, está su escopeta.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era la cueva?",
                                                     "¿Qué pensamiento tuviste al encontrar a Julio \"el loco\" en su interior?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  "¿Qué pasó por tu cabeza?",
                      "decision":  {
                                       "texto":  "¿Qué decidís hacer?",
                                       "opciones":  [
                                                        {
                                                            "opcion":  "Aprovechar la situación",
                                                            "carta":  43
                                                        },
                                                        {
                                                            "opcion":  "Salir de la cueva",
                                                            "accion":  null,
                                                            "descripcion":  "Continuad explorando otra zona."
                                                        }
                                                    ]
                                   },
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  null
                  },
                  {
                      "id":  43,
                      "titulo":  "La escopeta",
                      "imagina_texto":  "Ante vosotros la oportunidad de alcanzar la escopeta o incluso de neutralizar a Julio \"el loco\".",
                      "preguntas_protagonista":  [
                                                     "¿Qué decidísteis hacer?",
                                                     "¿Qué objetivo perseguíais?",
                                                     "¿Qué podía salir mal?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Estabas de acuerdo con el plan?",
                                                   "¿Cual era tu papel?",
                                                   "¿Te preocupaba algo?"
                                               ],
                      "desafio":  {
                                      "icono":  "🪙👻",
                                      "texto":  "¿Salió bien el plan?",
                                      "favorable":  {
                                                        "descripcion":  "Si buscabais la escopeta, obtenéis Consecuencia 11.",
                                                        "tipo":  "obtener_consecuencia",
                                                        "id":  11
                                                    },
                                      "desfavorable":  {
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  9
                                                       }
                                  },
                      "pregunta_final":  "¿Crees que hicísteis lo correcto?",
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "tipo":  "explorar_zona",
                                                       "id":  44,
                                                       "texto":  "▶ Explorar Gallinero (Narración 44)"
                                                   },
                                                   {
                                                       "tipo":  "explorar_zona",
                                                       "id":  45,
                                                       "texto":  "▶ Entrar al interior del cortijo (Narración 45)"
                                                   }
                                               ],
                                  "texto":  "Salís de la cueva antes de que Julio despierte."
                              }
                  },
                  {
                      "id":  44,
                      "titulo":  "El gallinero",
                      "imagina_texto":  "En el interior de un pequeño y cerrado gallinero solo hay oscuridad. En la oscuridad, tu mente trae de vuelta un secreto recuerdo en el peor de los momentos (inventa ese secreto).",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era el gallinero?",
                                                     "¿A qué olía?",
                                                     "¿Qué recuerdo te vino a la mente?",
                                                     "¿Cómo reaccionaste?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Entraste al gallinero o decidiste esperar fuera?",
                                                   "¿Qué le pasó a tu compañero?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [
                                                  3
                                              ],
                      "fin":  {
                                  "texto":  "Obtenéis Consecuencia 3.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "obtener_consecuencia",
                                                       "id":  3
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  45,
                      "titulo":  "El interior del cortijo",
                      "accion_especial":  "Reemplazad la Localización 7A por la Localización 7B.",
                      "imagina_texto":  "El interior del cortijo, pese a estar abandonado, tiene señales de uso reciente. En una chimenea aún encendida hay un caldero con restos de comida. Otra puerta exterior, frente a vosotros, está abierta dejando entrar la lluvia que comienza a caer. En una mesa central, grandes manchas de sangre.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo era el cortijo por dentro?",
                                                     "¿Qué encontrasteis dentro?",
                                                     "¿Qué pensaste cuando lo viste?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  "¿Qué sentiste al entrar al cortijo?",
                      "pistas":  [
                                     15
                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "origen":  "7A",
                                                       "destino":  "7B",
                                                       "tipo":  "reemplazar_localizacion"
                                                   },
                                                   {
                                                       "tipo":  "explorar_zona",
                                                       "id":  46,
                                                       "texto":  "▶ Entrar al dormitorio contiguo (Narración 46)"
                                                   },
                                                   {
                                                       "tipo":  "explorar_zona",
                                                       "id":  47,
                                                       "texto":  "▶ Ir a la puerta trasera hacia la tormenta (Narración 47)"
                                                   }
                                               ],
                                  "texto":  "El cortijo cobra vida. Reemplazad Localización 7A por 7B. Se abren nuevas estancias."
                              }
                  },
                  {
                      "id":  46,
                      "titulo":  "El moruno",
                      "cambio_protagonista":  "Amigo",
                      "imagina_texto":  "En la habitación de al lado hay un dormitorio con varias camas. Allí duerme Francisco \"El moruno\", con el cuerpo algo ensangrentado. En ese momento, descubres que lo has visto antes. Inventa una relación con tu familia y en qué os ayudó.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo es el dormitorio?",
                                                     "¿Puedes describir al \"moruno\"?",
                                                     "¿De qué lo conocías?",
                                                     "¿En qué ayudó a tu familia?",
                                                     "¿Cómo convenciste a tus compañeros de dejarlo en paz?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Qué sentiste al ver al \"moruno\"?",
                                                   "¿Cómo reaccionaste ante la petición de dejarle allí tranquilo?"
                                               ],
                      "pregunta_final":  "¿Crees que hicísteis lo correcto?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  47,
                                                       "texto":  "▶ Ir a la puerta trasera hacia la tormenta (Narración 47)"
                                                   }
                                               ],
                                  "texto":  "Dejáis tranquilo al moruno en su camastro y continuáis buscando a Bernardo."
                              }
                  },
                  {
                      "id":  47,
                      "titulo":  "La tormenta",
                      "imagina_texto":  "En la puerta trasera, que comunica con el bosque véis que ha empezado una intensa tormenta. El tiempo corre en vuestra contra.",
                      "preguntas_protagonista":  [
                                                     "¿Qué ocurrió al asomarte a la puerta trasera?",
                                                     "¿Qué pensaste al ver la sangre?",
                                                     "¿Estabais listos para abandonar el cortijo?",
                                                     "¿Tenías aún esperanzas de encontrar a Bernardo vivo?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cómo te sentiste en ese momento?",
                                                   "¿Tenías aún esperanzas de encontrar a Bernardo vivo?"
                                               ],
                      "desafio":  null,
                      "pistas":  [
                                     16,
                                     17,
                                     18
                                 ],
                      "localizaciones_nuevas":  [
                                                    8,
                                                    9
                                                ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "id":  9,
                                                       "tipo":  "poner_localizacion"
                                                   },
                                                   {
                                                       "id":  8,
                                                       "tipo":  "poner_localizacion"
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  9,
                                                       "texto":  "⛰️ Subir al Risco tras los quejidos (Localización 9)"
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  8,
                                                       "texto":  "🌲 Perseguir la luz en el Bosque (Localización 8)"
                                                   }
                                               ],
                                  "texto":  "La tormenta arrecia. A lo lejos veis una luz en el bosque (Pista 17) y escucháis quejidos en el risco (Pista 18)."
                              }
                  },
                  {
                      "id":  48,
                      "titulo":  "Agustina en el risco",
                      "imagina_texto":  "Al llegar al risco encontráis a Agustina \"La curandera\" llorando entre quejidos y de espaldas a vosotros a punto de saltar al vacío. Sin miraros, os pide perdón.",
                      "preguntas_protagonista":  [
                                                     "¿Por qué decidisteis ir al risco?",
                                                     "¿Quién pensabais que estaría allí?",
                                                     "¿Cómo fue el camino hasta el risco?",
                                                     "¿Cómo era la zona del risco?",
                                                     "¿A quién encontrasteis allí?",
                                                     "¿Perdonasteis a Agustina?",
                                                     "¿Tardasteis mucho en reaccionar y correr hacia el bosque tras la luz?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cómo te sentiste?",
                                                   "¿Entendiste la disculpa de Agustina?"
                                               ],
                      "desafio":  null,
                      "pistas":  [
                                     19
                                 ],
                      "consecuencias_fijas":  [
                                                  6
                                              ],
                      "consecuencias_decision":  {
                                                     "descripcion":  "¿Perdonasteis a Agustina?",
                                                     "si":  {
                                                                "tipo":  "obtener_consecuencia",
                                                                "id":  12
                                                            },
                                                     "no":  {
                                                                "tipo":  "obtener_consecuencia",
                                                                "id":  13
                                                            }
                                                 },
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "id":  8,
                                                       "tipo":  "poner_localizacion"
                                                   },
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  8,
                                                       "texto":  "🌲 Correr hacia el Bosque tras la luz (Localización 8)"
                                                   }
                                               ],
                                  "texto":  "Tras el encuentro con Agustina, veis a lo lejos la luz adentrándose en el bosque."
                              }
                  },
                  {
                      "id":  49,
                      "titulo":  "Por el bosque",
                      "imagina_texto":  "Tras un buen rato persiguiendo la luz en la lejanía a través del bosque y bajo la tormenta llegáis al sitio donde todo comenzó.",
                      "preguntas_protagonista":  [
                                                     "¿Puedes describir cómo fue la persecución por el bosque?",
                                                     "¿Te sorprendió llegar de nuevo al barranco del Jalvo?",
                                                     "¿Qué pensabas que os ibais a encontrar dentro de la cueva?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Te sorprendió llegar de nuevo al barranco del Jalvo?",
                                                   "¿Qué pensabas que os ibais a encontrar dentro de la cueva?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_condicionales":  [
                                                          {
                                                              "condicion":  "Si tenéis Consecuencia 9",
                                                              "accion":  {
                                                                             "tipo":  "obtener_consecuencia",
                                                                             "id":  6,
                                                                             "descripcion":  "obtenéis Consecuencia 6 por avance lento"
                                                                         }
                                                          },
                                                          {
                                                              "condicion":  "Si coraje es 1 o 2",
                                                              "accion":  {
                                                                             "tipo":  "obtener_consecuencia",
                                                                             "id":  3
                                                                         }
                                                          }
                                                      ],
                      "localizaciones_nuevas":  [
                                                    10
                                                ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Viajad a Localización 10.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "viajar",
                                                       "id":  10
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  50,
                      "titulo":  "Francisco Leona en la cueva",
                      "imagina_texto":  "Dentro de la cueva encontráis a Francisco Leona con una antorcha en un brazo y un cuchillo en el otro. A su lado, veis a Bernardo atado en el suelo. Francisco se lanza contra vosotros cuchillo en mano.",
                      "consecuencia_arrow":  {
                                                 "id":  6
                                             },
                      "preguntas_protagonista":  [
                                                     "¿Podéis describir la escena?",
                                                     "¿Qué pensaste en aquel momento?",
                                                     "¿Qué os dijo Francisco al veros?",
                                                     "¿Cómo os preparasteis para el enfrentamiento?"
                                                 ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "Realizad una prueba de Coraje."
                                  },
                      "pregunta_interaccion":  [
                                                   "¿Cuál fue tu reacción al entrar?",
                                                   "¿Pensaste en huir en algún momento?"
                                               ],
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 51.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  51
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  51,
                      "titulo":  "El enfrentamiento",
                      "imagina_texto":  "Se produce un enfrentamiento entre Antonio Leona y vosotros.",
                      "consecuencias_arrow":  [
                                                  11,
                                                  3
                                              ],
                      "desafio":  {
                                      "icono":  "🪙",
                                      "texto":  "¿Como fue el enfrentamiento?",
                                      "desfavorable":  {
                                                           "tipo":  "obtener_consecuencia",
                                                           "id":  14
                                                       }
                                  },
                      "preguntas_protagonista":  [
                                                     "¿Cómo os librasteis de Antonio Leona? ¿Consiguió huir?",
                                                     "¿Cómo te sentiste al terminar?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Cómo fue tu intervención en el combate?",
                                                   "¿Cómo te sentiste al terminar?"
                                               ],
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "descripcion":  "Si no tenéis ningún Efecto 🩸 en juego, coged Narración 57. Si tenéis algún Efecto 🩸 en juego, coged Narración 52.",
                                  "condicional":  {
                                                      "si_sin_sangre":  {
                                                                            "tipo":  "ir_narracion",
                                                                            "id":  57
                                                                        },
                                                      "si_con_sangre":  {
                                                                            "tipo":  "ir_narracion",
                                                                            "id":  52
                                                                        }
                                                  }
                              }
                  },
                  {
                      "id":  52,
                      "titulo":  "Heridos",
                      "imagina_texto":  "Tras el enfrentamiento, veis que Bernardo está herido de muerte. Si además tenéis un segundo efecto 🩸, uno de vosotros también está herido de muerte.",
                      "preguntas_protagonista":  [
                                                     "¿Terminasteis ilesos?",
                                                     "¿Cómo estaba Bernardo?",
                                                     "¿Cómo te sentiste?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Estabas herido?",
                                                   "¿Cómo te sentiste?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_arrow":  [
                                                  12,
                                                  13
                                              ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "acciones":  [
                                                   {
                                                       "tipo":  "resolver_desenlace_agustina"
                                                   }
                                               ],
                                  "texto":  "Bernardo se debate entre la vida y la muerte. Se comprueba el desenlace según vuestras acciones con Agustina."
                              }
                  },
                  {
                      "id":  53,
                      "titulo":  "Agustina cura a Bernardo",
                      "imagina_texto":  "Agustina \"La curandera\" se acerca en silencio y se arrodilla ante Bernardo. Le toca con la mano y una luz cegadora llena la cueva. Tras esto, ella ha desaparecido y Bernardo ya no está herido.",
                      "preguntas_protagonista":  [
                                                     "¿Qué pensabas que iba a hacer Agustina?",
                                                     "¿Intentaste pararla?",
                                                     "¿Qué pensabas que era la luz?",
                                                     "¿Cómo reaccionaste al ver curado a Bernardo?",
                                                     "¿Qué crees que fue de Agustina?",
                                                     "¿Tienes alguna explicación para lo que ocurrió?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Qué pensabas que estaba pasando?",
                                                   "¿Cómo reaccionaste?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 58.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  58
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  54,
                      "titulo":  "La elección de Agustina",
                      "imagina_texto":  "Agustina \"La curandera\" pregunta quién queréis que se salve: Bernardo o el jugador herido. Si tenéis Consecuencia 1: Valentía, la decisión es obligatoriamente salvar a Bernardo.",
                      "preguntas_protagonista":  [
                                                     "¿Qué pensabas que iba a hacer Agustina?",
                                                     "¿Por qué tomasteis esa decisión?",
                                                     "¿Hubo consenso?",
                                                     "¿Cambiarías si pudiese aquella decisión a día de hoy?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Qué pensabas que estaba pasando?",
                                                   "¿Estuviste de acuerdo con la decisión tomada?"
                                               ],
                      "desafio":  null,
                      "decision":  {
                                       "texto":  "¿A quién salvais?",
                                       "opciones":  [
                                                        {
                                                            "opcion":  "Salvais a Bernardo",
                                                            "acciones":  [
                                                                             {
                                                                                 "tipo":  "obtener_consecuencia",
                                                                                 "id":  15
                                                                             },
                                                                             {
                                                                                 "tipo":  "ir_narracion",
                                                                                 "id":  53
                                                                             }
                                                                         ]
                                                        },
                                                        {
                                                            "opcion":  "Salvais al jugador herido",
                                                            "acciones":  [
                                                                             {
                                                                                 "tipo":  "ir_narracion",
                                                                                 "id":  55
                                                                             }
                                                                         ]
                                                        }
                                                    ]
                                   },
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  null
                  },
                  {
                      "id":  55,
                      "titulo":  "Agustina te cura a ti",
                      "cambio_protagonista":  "jugador herido",
                      "imagina_texto":  "Agustina \"La curandera\" se te acerca en silencio y se arrodilla ante ti. Te toca con la mano y una luz cegadora llena la cueva. Tras esto, ella ha desaparecido y tú ya no estás herido.",
                      "preguntas_protagonista":  [
                                                     "¿Qué pensabas que iba a hacer Agustina?",
                                                     "¿Intentaste pararla?",
                                                     "¿Qué pensabas que era la luz?",
                                                     "¿Cómo reaccionaste al verte curado?",
                                                     "¿Qué crees que fue de Agustina?",
                                                     "¿Tienes alguna explicación para lo que ocurrió?"
                                                 ],
                      "pregunta_interaccion":  "¿Cómo reaccionaste?",
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 56.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  56
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  56,
                      "titulo":  "La muerte de Bernardo",
                      "imagina_texto":  "Ante vosotros, veis como Bernardo se desangra. Musita unas últimas palabras y muere.",
                      "preguntas_protagonista":  [
                                                     "¿Qué sentiste al escuchar el eco?",
                                                     "¿Qué dijo Bernardo?",
                                                     "¿Le dijisteis algo?",
                                                     "¿Trataste de evitar su muerte?",
                                                     "¿Cómo os sentisteis al verlo morir?",
                                                     "¿Te hubieses cambiado por él?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Le dijiste algo a Bernardo?",
                                                   "¿Cómo te sentiste al verlo morir?",
                                                   "¿Te hubieses cambiado por él?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 59.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  59
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  57,
                      "titulo":  "Bernardo a salvo",
                      "imagina_texto":  "Bernardo está frente a vosotros con tan solo algunas heridas leves. Sonríe aliviado cuando todo acaba.",
                      "preguntas_protagonista":  [
                                                     "¿Cómo fue aquel reencuentro?",
                                                     "¿Qué os dijo Bernardo?",
                                                     "¿Qué le dijisteis vosotros?",
                                                     "¿Cómo te sentiste?"
                                                 ],
                      "pregunta_interaccion":  [
                                                   "¿Qué le dijiste a Bernardo?",
                                                   "¿Cómo te sentiste?"
                                               ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Coged Narración 58.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "ir_narracion",
                                                       "id":  58
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  58,
                      "titulo":  "Epílogo",
                      "tipo":  "epilogo",
                      "texto":  "Volvemos al presente. Aunque Bernardo sobrevivió, murió hace justo un año por una enfermedad. Aun así, vivió felizmente el resto de su vida en vuestra compañía.\n\nEn turnos, cada jugador hace un breve epílogo respondiendo a:",
                      "preguntas_epilogo":  [
                                                "¿Cómo fue el resto de tu infancia?",
                                                "¿Cómo ha sido tu vida?",
                                                "¿Echas de menos a Bernardo?",
                                                "¿Te arrepientes de algo de lo que hicisteis?",
                                                "¿Hubieses cambiado algo?"
                                            ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Fin de partida.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "fin_partida"
                                                   }
                                               ]
                              }
                  },
                  {
                      "id":  59,
                      "titulo":  "Epílogo (Bernardo muere)",
                      "tipo":  "epilogo",
                      "texto":  "Volvemos al presente. Seguramente la muerte de Bernardo ha pesado sobre vuestras espaldas todos estos años. Aun así, vuestras vidas continuaron de una u otra forma.\n\nEn turnos, cada jugador hace un breve epílogo respondiendo a:",
                      "preguntas_epilogo":  [
                                                "¿Cómo fue el resto de tu infancia?",
                                                "¿Echas de menos a Bernardo?",
                                                "¿Cómo ha sido tu vida?",
                                                "¿Te arrepientes de algo de lo que hicisteis?",
                                                "¿Hubieses cambiado algo?"
                                            ],
                      "desafio":  null,
                      "pistas":  [

                                 ],
                      "consecuencias_fijas":  [

                                              ],
                      "fin":  {
                                  "texto":  "Fin de partida.",
                                  "acciones":  [
                                                   {
                                                       "tipo":  "fin_partida"
                                                   }
                                               ]
                              }
                  }
              ],
    "Count":  59
};