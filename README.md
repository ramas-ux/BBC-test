Set up instructions:
1.Clone the Repository
-----------------------
git clone https://github.com/your-username/bbc-api-tests.git
cd rugby-api-tests

2.Install Dependencies
-----------------------
npm install

3.Run Tests
-----------
npm test

4.Tech Stack
-------------
TypeScript
Jest
Axios
ts-jest

5.API Endpoint Under Test
---------------------------
BBC Rugby Standings (Six Nations)
https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sportstandings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations

6.Notes
-----------
Tests are written in TypeScript for better type safety and maintainability.
Custom headers like x-test-harness=true are sent in requests to isolate test traffic.
You can modify the tournament URN to test different competitions (e.g. premiership, champions-cup, etc.).
