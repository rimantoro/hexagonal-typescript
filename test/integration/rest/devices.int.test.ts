import request from 'supertest'
import ExpressServer from '../../../src/adapters/rest/express/expressServer';
import mongoose from 'mongoose'
import allDevices from '../../mock-data/all-devices.json'
import newDevice from '../../mock-data/new-device.json'
const endpointUrl = "/devices/";


const expressServer = new ExpressServer()
expressServer.initControllers()


describe(endpointUrl, () => {

  it("GET " + endpointUrl, async () => {
    const response = await request(expressServer.app)
      .get(endpointUrl)
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBeTruthy();
    expect(response.body.status).toStrictEqual('success');
    expect(response.body.data).toBeDefined();
  })

  it("GET " + endpointUrl + ":deviceId", async () => {
    const response = await request(expressServer.app)
      .get(endpointUrl + allDevices[0].deviceId)
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toStrictEqual(allDevices[0].name);
  })

  it("GET " + endpointUrl + ":deviceId that does not exist", async () => {
    const response = await request(expressServer.app)
      .get(endpointUrl + 'e7e69f70-a0c8-4d81-9ef7-6c95f512061b');
    expect(response.status).toBe(404);
    expect(response.body.status).toStrictEqual("error");
  })

  it("POST " + endpointUrl, async () => {
    const response = await request(expressServer.app)
      .post(endpointUrl).set('Accept', 'application/json').set('Content-Type', 'application/json')
      .send(newDevice)
     
    expect(response.status).toBe(201);
    expect(response.body.status).toStrictEqual("success");
    expect(response.body.data.deviceId).toBeDefined();
  })

  it(`POST ${endpointUrl} with missing name param`, async () => {
    delete newDevice.name;
    const response = await request(expressServer.app)
      .post(endpointUrl)
      .send(newDevice).type('json').set('Accept', 'application/json').set('Content-Type', 'application/json')
     
    expect(response.status).toBe(400);
    expect(response.body.status).toStrictEqual("error");
  })


})

afterAll(() => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
})