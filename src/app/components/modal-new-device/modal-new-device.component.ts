import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Command, CommandDescription, Parameter } from '../../types/device';
import { DeviceService } from '../../services/device.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-new-device',
  templateUrl: './modal-new-device.component.html'
})
export class ModalNewDeviceComponent {
  @Input() identifier!: string;
  active = 1;

  form = new FormGroup({
    identifier: new FormControl(''),
    description: new FormControl('', Validators.required),
    manufacturer: new FormControl(''),
    url: new FormControl(''),
    commands: new FormControl<CommandDescription[]>([])
  });

  commandForm = new FormGroup({
    operation: new FormControl(''),
    description: new FormControl('', Validators.required),
    result: new FormControl(''),
    format: new FormControl(''),
    command: new FormControl<Command | null>(null)
  });

  parametersForm = new FormGroup({
    parameters: new FormControl<Parameter[]>([]),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    command: new FormControl('', Validators.required)
  });

  constructor(
    public activeModal: NgbActiveModal,
    private deviceService: DeviceService
  ) {

  }

  ngOnInit() {
    const device = this.deviceService.getById(this.identifier);
    if (device) {
      this.form.patchValue(device);
      this.parametersForm.patchValue(device);
    }
  }

  getParametersFromData(data: (Parameter[] | null | undefined)[] | undefined) {
    if (!data) return [];

    return data;
  }

  save() {
    if (this.form.valid) {
      this.commandForm.controls.command.patchValue(this.parametersForm.getRawValue());
      this.deviceService.save(this.form.getRawValue());
      this.activeModal.close();

      Swal.fire({
        title: "Sucesso",
        text: "Dispositivo foi cadastrado!",
        icon: "success"
      });

    } else {
      this.validateFields(this.form);
      Swal.fire({
        title: "Dados incompletos",
        text: "Preencha os campos em vermelho para salvar!",
        icon: "info"
      });
    }
  }

  addCommand() {

    if (this.commandForm.valid) {
      this.form.value.commands?.push(this.commandForm.getRawValue());
    } else {
      this.validateFields(this.commandForm);
      Swal.fire({
        title: "Dados incompletos",
        text: "Preencha os campos em vermelho para adicionar!",
        icon: "info"
      });
    }

  }

  removeCommand(index: number) {
    this.getCommands?.splice(index, 1);
  }


  addParameter() {
    const { description, name } = this.parametersForm.controls;
    if (description.valid && name.valid) {
      this.parametersForm.value.parameters?.push(this.parametersForm.getRawValue());
    } else {
      Swal.fire({
        title: "Dados incompletos",
        text: "Preencha o campo de nome e descrição para adicionar!",
        icon: "info"
      });
    }

  }

  removeParameter(index: number) {
    this.getParameters?.splice(index, 1);
  }

  get getCommands() {
    return this.form.value.commands;
  }

  get getParameters() {
    return this.parametersForm.value.parameters;
  }

  validateFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFields(control);
      }
    });
  }

}
