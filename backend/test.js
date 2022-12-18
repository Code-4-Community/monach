import test from 'ava';
import getAllPractitionersWorkflow from './workflows/getAllPractitioners.js'

const EXAMPLE_PRACTITIONER =  {
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

test('getAllPractitioners Workflow simply produces whatever the scan yields', async t => {
  const fakeData = [EXAMPLE_PRACTITIONER]
  const fakeScan = async () => fakeData
  const result = await getAllPractitionersWorkflow(fakeScan)
  t.is(result, fakeData);
});
