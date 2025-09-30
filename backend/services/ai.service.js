const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const gemini_api_key = process.env.GEMINI_API_KEY;

if (!gemini_api_key) {
  throw new Error(
    'La API key de Gemini no ha sido configurada en el .env. Genera una API key desde https://aistudio.google.com/app/apikey'
  );
}

const googleAI = new GoogleGenerativeAI(gemini_api_key);

const model = googleAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

/**
 * Genera una descripción de propiedad con IA
 * @param {string} title - Título de la propiedad
 * @param {string} propertyType - Tipo de propiedad (ej: Piso, Chalet, Apartamento)
 * @param {string} transactionType - Tipo de transacción (ej: Venta, Alquiler)
 * @param {number} bedrooms - Número de habitaciones
 * @param {string} city - Ciudad
 * @returns {Promise<string>}
 */
const generateAIDescription = async (title, propertyType, transactionType, bedrooms, city) => {
  try {
    const prompt = `-IMPORTANTE- Eres una IA cuyo objetivo es generar la descripción de una propiedad inmobiliaria. Genera una descripción atractiva y comercial usando ESPAÑOL, Y SIN MARKDOWN NI SALTOS DE LINEA.
    
    Detalles:
    - Título: ${title}
    - Tipo de propiedad: ${propertyType}
    - Tipo de transacción: ${transactionType}
    - Número de habitaciones: ${bedrooms}
    - Ciudad: ${city}
    
    Usa un tono profesional pero cercano.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 512,
      }
    });

    return result.response.text();
  } catch (error) {
    console.error("Error en AI Service:", error);
    throw new Error("Error al generar la descripción con IA");
  }
};

module.exports = { generateAIDescription };
    