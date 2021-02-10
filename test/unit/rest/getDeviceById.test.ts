import getDeviceByIdFactory from '../../../src/adapters/rest/controllers/device/getDeviceById';
import GetDeviceByIdUseCase from '../../../src/domain/useCase/getDeviceById';
import DeviceRepository from '../../../src/adapters/database/mongo/deviceRepository';
import httpMocks from 'node-mocks-http';
import allDevices from '../../mock-data/all-devices.json'


jest.mock("../../../src/adapters/database/mongo/deviceRepository");

const deviceRepository = new DeviceRepository();
const useCase = new GetDeviceByIdUseCase(deviceRepository);
const getDeviceByIdController = getDeviceByIdFactory(useCase);

let req, res, next;
const deviceId = "e7e69f70-a0c8-4d81-9ef7-6c95f512061b"
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    req.params.deviceId = deviceId
})

describe("getDeviceById Controller", () => {
    it("should be a function", () => {
        expect(typeof getDeviceByIdController).toBe("function");
    });

    it("should call deviceRepository.getDeviceById", async () => {
        await getDeviceByIdController(req, res, next);
        expect(deviceRepository.getDeviceById).toBeCalledWith(deviceId);
    })

    it("should return 200 response code and json response", async () => {
        deviceRepository.getDeviceById.mockReturnValue(allDevices[0]);
        await getDeviceByIdController(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        let jsonRes = res._getJSONData();
        expect(jsonRes.data).toStrictEqual(allDevices[0]);
    })

    it("should return 400 response code for invalid UUID", async () => {
        req.params.deviceId = '123'
        const errorMessage = "deviceId is not a valid uuid";
        await getDeviceByIdController(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled).toBeTruthy();
        let jsonRes = res._getJSONData();
        expect(jsonRes.status).toStrictEqual("error");
        expect(jsonRes.message).toStrictEqual(errorMessage);
    })

    it("should handle errors", async () => {
        req.params.deviceId = 'e7e69f70-a0c8-4d81-9ef7-6c95f512061b'
        const errorMessage = "server could not process request";
        const error = new Error("could not connect to database");
        const rejectedPromise = Promise.reject(error);
        deviceRepository.getDeviceById.mockReturnValue(rejectedPromise);
        await getDeviceByIdController(req, res, next);
        let jsonRes = res._getJSONData();
        expect(jsonRes.status).toStrictEqual("error");
        expect(jsonRes.message).toStrictEqual(errorMessage);
    })
});