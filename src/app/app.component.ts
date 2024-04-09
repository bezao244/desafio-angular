import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalNewDeviceComponent } from './components/modal-new-device/modal-new-device.component';
import { DeviceService } from './services/device.service';
import { Device } from './types/device';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'desafio-vaga-angular';
  devices: Device[] = [];
  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceService
  ) { }


  ngOnInit() {
    this.deviceService.getAllDevices().subscribe(data => this.devices = data);
  }

  edit(id: string) {
    const modal = this.modalService.open(ModalNewDeviceComponent, { size: 'lg', backdrop: false });
    modal.componentInstance.identifier = id;
  }

  delete(id: string) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      icon: 'info',
    }).then((result) => {
      if (result.value) {
        this.deviceService.delete(id);

        Swal.fire({
          title: "Sucesso",
          text: "Dispositivo foi deletado!",
          icon: "success"
        });

      }
    });


  }

}
