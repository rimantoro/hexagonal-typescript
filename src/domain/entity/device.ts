import { v4 as uuidv4 } from 'uuid';
export default class Device {
    public deviceId?: string
    public name: string
    public firmwareVersion: string
    public firmwareRevision: string

    public deviceValidator?(): void {
        if (!this.name) {
            throw new Error('name is missing.');
        }
        return;
    };
}