export const getPlatosChilenos = async () => {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/filter.php?a=Chile'
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw { status: 404, message: 'Recurso no encontrado' }
      } else if (response.status === 500) {
        throw { status: 500, message: 'Error interno del servidor' }
      } else {
        throw { status: response.status, message: 'Error de comunicación con la API' }
      }
    }

    const data = await response.json()

    if (!data.meals) {
      return []
    }

    return data.meals.map((plato) => ({
      idMeal: plato.idMeal,
      strMeal: plato.strMeal,
      strMealThumb: plato.strMealThumb,
      precio: 0,
      disponible: true
    }))

  } catch (error) {
    if (error instanceof TypeError) {
      throw { status: 0, message: 'Fallo de red: Verifique su conexión a internet' }
    }
    throw error
  }
}