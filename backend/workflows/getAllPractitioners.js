
/**
 * A Practitioner is a Object of the shape:

 {
    "phoneNumber": "123456789",
    "website": "https://ryanjung.dev",
    "languages": "French",
    "modality": "Software",
    "businessLocation": "Boston, MA",
    "businessName": "Code4Community",
    "minAgeServed": 18,
    "email": "myemail@gmail.com",
    "fullName": "Ryan Jung"
  }

 */


/**
 * @param scanAllPractitioners {() => Practitioner[]} An effectful function that queries a database and produces all saved practitioners
 * @returns Practitioner[] | 'error'
 */
async function getAllPractitioners(scanAllPractitioners) {
  try {
    return scanAllPractitioners()
  } catch (e) {
    console.error(e)
    return 'error'
  }
}


export default getAllPractitioners
