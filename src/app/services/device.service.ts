import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Device } from '../types/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private devicesSubject: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([]);
  private devices$: Observable<Device[]> = this.devicesSubject.asObservable();


  getAllDevices() {
    return this.devices$;
  }

  getById(id: string) {
    const currentDevices = this.devicesSubject.getValue();
    return currentDevices.find(x => x.identifier === id);
  }

  save(data: Device) {
    const currentDevices = this.devicesSubject.getValue();
    if (!data.identifier) {
      data.identifier = Math.floor(Date.now() * Math.random()).toString(36);
      currentDevices.push(data);
    } else {

    }

    this.devicesSubject.next(currentDevices);
  }

  delete(id: string) {
    const currentDevices = this.devicesSubject.getValue();
    const updatedDevices = currentDevices.filter(device => device.identifier !== id);
    this.devicesSubject.next(updatedDevices);
  }

}
