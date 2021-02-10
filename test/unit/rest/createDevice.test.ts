import createDeviceFactory from '../../../src/adapters/rest/controllers/device/createDevice';
import CreateDeviceUseCase from '../../../src/domain/useCase/createDevice';
import DeviceRepository from '../../../src/adapters/database/mongo/deviceRepository';
import httpMocks from 'node-mocks-http';
import allDevices from '../../mock-data/all-devices.json'
import newDevice from '../../mock-data/new-device.json'


jest.mock("../../../src/adapters/database/mongo/deviceRepository");

const deviceRepository = new DeviceRepository();
const useCase = new CreateDeviceUseCase(deviceRepository);
const createDeviceController = createDeviceFactory(useCase);

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    req.body = newDevice;
})

describe("createDevice Controller", () => {
    it("should be a function", () => {
        expect(typeof createDeviceController).toBe("function");
    });

    it("should call deviceRepository.createDevice", async () => {
        await createDeviceController(req, res, next);
        expect(deviceRepository.createDevice).toBeCalledWith(req.body);
    })

    it("should return 201 response code and json response", async () => {
        deviceRepository.createDevice.mockReturnValue(allDevices[0]);
        await createDeviceController(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled).toBeTruthy();
        let jsonRes = res._getJSONData();
        expect(jsonRes.data).toStrictEqual({ deviceId: allDevices[0].deviceId });
    })

    it("should handle errors", async () => {
        const errorMessage = "server could not process request";
        const error = new Error("could not connect to database");
        const rejectedPromise = Promise.reject(error);
        deviceRepository.createDevice.mockReturnValue(rejectedPromise);
        await createDeviceController(req, res, next);
        let jsonRes = res._getJSONData();
        expect(jsonRes.status).toStrictEqual("error");
        expect(jsonRes.message).toStrictEqual(errorMessage);
    })

    it("should return 400 response code for missing name param", async () => {
        delete req.body.name;
        const errorMessage = "name is missing.";
        await createDeviceController(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled).toBeTruthy();
        let jsonRes = res._getJSONData();
        expect(jsonRes.status).toStrictEqual("error");
        expect(jsonRes.message).toStrictEqual(errorMessage);
    })

})