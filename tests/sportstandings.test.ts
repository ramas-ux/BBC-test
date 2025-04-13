import axios, { AxiosResponse } from 'axios';
import { performance } from 'perf_hooks';

const baseUrl = 'https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sportstandings';
const sixNationsURN = 'urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations';

describe('Sports Standings API', () => {
  const fullUrl = `${baseUrl}?${sixNationsURN}`;

  // Scenario 1
  test('Scenario 1: GET request returns status 200 and responds in under 1000ms', async () => {
    const start = performance.now();
    const response = await axios.get(fullUrl);
    
  //here taking the timestamps difference of before hitting the url and after hitting the url
    const duration = performance.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(1000);
  });

  // Scenario 2
  //here id field not to be null or empty either in direct response or in participants array? assumption is participants array as follows
  test('Scenario 2: Each participant should have a non-null, non-empty id and exactly 6 participants', async () => {
    const response = await axios.get(fullUrl);
    const participants = response.data?.standings?.participants;

    expect(participants).toBeDefined();
    expect(Array.isArray(participants)).toBe(true);
    expect(participants.length).toBe(6);
  //verifying for each participant id is not null or empty
    for (const participant of participants) {
      expect(participant.id).toBeDefined();
      expect(participant.id).not.toBe('');
    }
  });

  // Scenario 3
  test('Scenario 3: Changing the competition name returns a different competition’s data', async () => {
    const otherCompetition = 'premiership'; // example: English Premiership
    const response = await axios.get(`${baseUrl}?urn=urn:bbc:sportsdata:rugby-union:tournament:${otherCompetition}`);

    expect(response.status).toBe(200);
    expect(response.data?.standings?.competition?.name?.toLowerCase()).toContain(otherCompetition);
  });

  // Scenario 4
  test('Scenario 4: Invalid competition name returns 404 with an error message', async () => {
    try {
      await axios.get(`${baseUrl}?urn=urn:bbc:sportsdata:rugby-union:tournament:invalid-tournament`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBeDefined();
    }
  });

  // Scenario 5
  test('Scenario 5: Response does not echo back custom request headers (x-test-harness)', async () => {
    const response: AxiosResponse = await axios.get(fullUrl, {
      headers: {
        'x-test-harness': 'true'
      }
    });

    // Prove header was sent
    expect(response.config.headers['x-test-harness']).toBe('true');

    // Prove header is NOT echoed in the response
    const responseHeaders = response.headers;
    expect(responseHeaders).not.toHaveProperty('x-test-harness');
  });
});
