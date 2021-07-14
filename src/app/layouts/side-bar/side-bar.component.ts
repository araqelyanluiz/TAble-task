import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApartmentsService } from 'src/app/services/apartments.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() closeMenu = new EventEmitter();

  uploadImages: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private service: ApartmentsService
  ) {
    this.addDetail();
  }

  get detailsInfo() {
    return this.dataForm.get('properties') as FormArray;
  }

  dataForm: FormGroup = this.fb.group({
    roomsCount: ['', [Validators.required, Validators.min(0)]],
    area: ['', [Validators.required, Validators.min(0)]],
    address: ['', Validators.required],
    properties: this.fb.array([]),
    pictures: [this.uploadImages],
  });

  ngOnInit(): void {}

  close() {
    this.closeMenu.emit(true);
  }

  addDetail() {
    if (this.detailsInfo.length < 5) {
      this.detailsInfo.push(this.fb.group({ detailInfo: [] }));
    }
  }

  checkInput(event: any, name: any) {
    if (event.target.value < 0) {
      this.dataForm.controls[name].patchValue(0);
    }
  }

  uploadImage(event: any) {
    if (event.target.files.length <= 10) {
      for (var i = 0; i < event.target.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = () => {
          let imageUrl: any = reader.result;
          this.uploadImages.push({ imageUrl: imageUrl });
        };
        this.cd.markForCheck();
      }
    } else {
      alert('Максимальное количество картинок 10!');
    }
  }

  removeImage(event: any) {
    this.uploadImages.splice(event, 1);
  }

  add() {
    if (this.dataForm.invalid) {
      return;
    }
    this.service.setData(this.dataForm.value);
    this.dataForm.reset();
    this.dataForm.controls.properties = this.fb.array([]);
    this.uploadImages = []
    this.addDetail()
    this.close();
  }
}
