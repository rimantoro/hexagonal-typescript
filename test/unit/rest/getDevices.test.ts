import getDevicesFactory from '../../../src/adapters/rest/controllers/device/getDevices';
import GetDevicesUseCase from '../../../src/domain/useCase/getDevices';
import DeviceRepository from '../../../src/adapters/database/mongo/deviceRepository';
import httpMocks from 'node-mocks-http';
import allDevices from '../../mock-data/all-devices.json'


jest.mock("../../../src/adapters/database/mongo/deviceRepository");

const deviceRepository = new DeviceRepository();
const useCase = new GetDevicesUseCase(deviceRepository);
const getDevicesController = getDevicesFactory(useCase);

let req, res, next;

beforeEach(() => {

    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("getDevices Controller", () => {
    it("should be a function", () => {
        expect(typeof getDevicesController).toBe("function");
    });

    it("should call deviceRepository.getDevices", async () => {
        await getDevicesController(req, res, next);
        expect(deviceRepository.getDevices).toBeCalledWith();
    })

    it("should return 200 response code", async () => {
        await getDevicesController(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })

    it("should return json response", async () => {
        deviceRepository.getDevices.mockReturnValue(allDevices);
        await getDevicesController(req, res, next);
        let jsonRes = res._getJSONData();
        expect(jsonRes.data).toStrictEqual(allDevices);
    })
    it("should handle errors", async () => {
        const errorMessage = "server could not process request";
        const error = new Error("could not connect to database");
        const rejectedPromise = Promise.reject(error);
        deviceRepository.getDevices.mockReturnValue(rejectedPromise);
        await getDevicesController(req, res, next);
        let jsonRes = res._getJSONData();
        expect(jsonRes.status).toStrictEqual("error");
        expect(jsonRes.message).toStrictEqual(errorMessage);
    })
});