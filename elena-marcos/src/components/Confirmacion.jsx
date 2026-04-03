import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, User, Users, Mail, Calendar, AlertCircle } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const FORMSPREE_URL = 'https://formspree.io/f/xyknznvz'

function Confirmacion() {
  const [formData, setFormData] = useState({
    nombre:       '',
    email:        '',
    asistencia:   'si',
    acompanantes: '',
    transporte: 'coche',
    hora_ida:     '',
    hora_vuelta:  '',
    alergenos:    '',
    mensaje:      '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('sending');

  // Preparamos los datos EXACTOS que espera Make.com
  const dataToSend = {
    tipo:          "Confirmación de asistencia",
    nombre:        formData.nombre,
    email:         formData.email,
    asistencia:    formData.asistencia,
    transporte:    formData.transporte || "-",          // si no hay transporte, envía "-"
    busIda:        formData.transporte === "bus" ? (formData.busIda || "Sin seleccionar") : "No usa bus",
    busVuelta:     formData.transporte === "bus" ? (formData.busVuelta || "Sin seleccionar") : "No usa bus",
    acompanantes:  formData.acompanantes || "0",
    alergenos:     formData.alergenos || "-",
    mensaje:       formData.mensaje || "-"
  };

  try {
    const response = await fetch(
      "https://hook.eu1.make.com/w2bt7pghkh5gr4j7b425g6yjbrztcvas", // <--- TU URL DE MAKE
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      }
    );

    if (response.ok) {
      setStatus('success');
      // Limpiamos el formulario
      setFormData({
        nombre:       '',
        email:        '',
        asistencia:   'si',
        transporte:   '',
        busIda:       '',
        busVuelta:    '',
        acompanantes: '',
        alergenos:    '',
        mensaje:      '',
      });
    } else {
      setStatus('error');
    }
  } catch (error) {
    console.error("Error:", error);
    setStatus('error');
  }
};

  return (
    <section id="confirmacion" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Confirmación
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Confirmad vuestra asistencia
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Nos haría muchísima ilusión saber si podéis acompañarnos.
            Por favor, rellenad el formulario antes del 1 de Junio.
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div {...fadeUp(0.1)}>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm
                          border border-black/5">

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <CheckCircle size={56} className="text-sage" />
                  <h3 className="font-serif text-3xl text-verde-oscuro">
                    ¡Gracias por confirmar!
                  </h3>
                  <p className="font-sans font-light text-marron leading-relaxed">
                    Os esperamos el 14 de Junio. Si tenéis cualquier duda
                    o necesitáis algo, no dudéis en contactarnos.
                  </p>
                  <p className="font-sans text-sm text-gray-400">
                    💌 Nos vemos en Sevilla
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >

                  {/* Nombre y Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs text-gray-400
                                        tracking-wide uppercase flex items-center gap-2">
                        <User size={12} />
                        Tu nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Nombre y apellidos"
                        className="font-sans text-sm text-slateGray bg-crema
                                   border border-gray-200 rounded-xl px-4 py-3
                                   focus:outline-none focus:border-sage
                                   transition-colors duration-200 placeholder:text-gray-300"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs text-gray-400
                                        tracking-wide uppercase flex items-center gap-2">
                        <Mail size={12} />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                        className="font-sans text-sm text-slateGray bg-crema
                                   border border-gray-200 rounded-xl px-4 py-3
                                   focus:outline-none focus:border-sage
                                   transition-colors duration-200 placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Asistencia */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs text-gray-400
                                      tracking-wide uppercase flex items-center gap-2">
                      <Users size={12} />
                      Asistencia *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="asistencia"
                          value="si"
                          checked={formData.asistencia === 'si'}
                          onChange={handleChange}
                          className="accent-sage"
                        />
                        <span className="font-sans text-sm text-slateGray">
                          Sí, asistiré
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="asistencia"
                          value="no"
                          checked={formData.asistencia === 'no'}
                          onChange={handleChange}
                          className="accent-sage"
                        />
                        <span className="font-sans text-sm text-slateGray">
                          No puedo asistir
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Acompañantes y Transporte */}
                    {formData.asistencia === 'si' && (
                    <div className="space-y-6">
                        {/* Acompañantes */}
                        <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs text-gray-400
                        tracking-wide uppercase flex items-center gap-2">
                            <Users size={12} />
                            Número de acompañantes
                        </label>
                        <input
                            type="number"
                            name="acompanantes"
                            value={formData.acompanantes}
                            onChange={handleChange}
                            min="0"
                            placeholder="0"
                            className="font-sans text-sm text-slateGray bg-crema
                                border border-gray-200 rounded-xl px-4 py-3
                                focus:outline-none focus:border-sage
                                transition-colors duration-200 placeholder:text-gray-300"
                        />
                        </div>

                        {/* Transporte */}
                        <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex flex-col gap-2"
                        >
                        <label className="font-sans text-xs text-gray-400
                        tracking-wide uppercase flex items-center gap-2">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 9c1.5 0 2.5.334 3.657 1.343M17.657 18.657L9 9m0 0l9-9m-9 9v12m0 0h12m-12 0l9-9" />
                            </svg>
                            ¿Cómo irás a la celebración?
                        </label>
      
                        <div className="space-y-4">
                        {/* Opción Coche */}
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-crema/50
                          rounded-xl hover:bg-crema/70 transition-colors">
                        <input
                            type="radio"
                            name="transporte"
                            value="coche"
                            checked={formData.transporte === 'coche'}
                            onChange={handleChange}
                            className="accent-sage w-5 h-5"
                        />
                        <div>
                        <div className="font-sans font-medium text-sm text-slateGray">
                            En coche propio
                        </div>
                        <div className="font-sans text-xs text-gray-400">
                            Aparcamiento disponible
                        </div>
                        </div>
                    </label>

                        {/* Opción Bus */}
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-crema/50
                          rounded-xl hover:bg-crema/70 transition-colors">
                        <input
                            type="radio"
                            name="transporte"
                            value="bus"
                            checked={formData.transporte === 'bus'}
                            onChange={handleChange}
                            className="accent-sage w-5 h-5"
                        />
                        <div>
                            <div className="font-sans font-medium text-sm text-slateGray">
                            Servicio de bus gratuito
                            </div>
                            <div className="font-sans text-xs text-gray-400">
                            📍 Plaza de España, Sevilla
                            </div>
                        </div>
                        </label>
                    </div>

                    {/* Detalles del bus (solo si se selecciona bus) */}
                    {formData.transporte === 'bus' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-4 mt-2 pl-2 border-l-2 border-sage/30"
                      >
                        <p className="font-sans text-xs text-marron flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                          Salida desde Plaza de España, Sevilla
                        </p>

                        {/* Ida */}
                        <div className="flex flex-col gap-2">
                          <label className="font-sans text-xs text-gray-500 tracking-wide uppercase">
                            Horario Ida
                          </label>
                          <select
                            name="busIda"
                            value={formData.busIda}
                            onChange={handleChange}
                            className="font-sans text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-slateGray focus:outline-none focus:border-sage"
                          >
                            <option value="">Selecciona una hora</option>
                            <option value="11:00h">11:00h</option>
                            <option value="11:30h">11:30h</option>
                          </select>
                        </div>

                        {/* Vuelta */}
                        <div className="flex flex-col gap-2">
                          <label className="font-sans text-xs text-gray-500 tracking-wide uppercase">
                            Horario Vuelta
                          </label>
                          <select
                            name="busVuelta"
                            value={formData.busVuelta}
                            onChange={handleChange}
                            className="font-sans text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-slateGray focus:outline-none focus:border-sage"
                          >
                            <option value="">Selecciona una hora</option>
                            <option value="00:00h">00:00h</option>
                            <option value="02:00h">02:00h</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                    </motion.div>
                </div>
                )}
                  {/* Alérgenos */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs text-gray-400
                                      tracking-wide uppercase flex items-center gap-2">
                      <AlertCircle size={12} />
                      Alérgenos o restricciones alimentarias
                    </label>
                    <input
                      type="text"
                      name="alergenos"
                      value={formData.alergenos}
                      onChange={handleChange}
                      placeholder="Vegetariano, sin gluten, alérgico a frutos secos..."
                      className="font-sans text-sm text-slateGray bg-crema
                                 border border-gray-200 rounded-xl px-4 py-3
                                 focus:outline-none focus:border-sage
                                 transition-colors duration-200 placeholder:text-gray-300"
                    />
                  </div>

                  {/* Mensaje */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs text-gray-400
                                      tracking-wide uppercase">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={3}
                      placeholder="¿Alguna duda o mensaje para nosotros?"
                      className="font-sans text-sm text-slateGray bg-crema
                                 border border-gray-200 rounded-xl px-4 py-3
                                 focus:outline-none focus:border-sage
                                 transition-colors duration-200 placeholder:text-gray-300
                                 resize-none"
                    />
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-natural mt-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30
                                        border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Confirmar asistencia
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="font-sans text-sm text-red-400 text-center mt-2">
                      ❌ Algo ha fallado. Inténtalo de nuevo.
                    </p>
                  )}

                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Confirmacion