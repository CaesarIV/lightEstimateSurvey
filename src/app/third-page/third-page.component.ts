import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {

  cards = [
    { title: 'Video 1', cols: 3, rows: 2 },
    { title: 'Image 1', cols: 1, rows: 1 },
    { title: 'Image 2', cols: 1, rows: 1 },
    { title: 'Image 3', cols: 1, rows: 1 },
    { title: 'Video 2', cols: 3, rows: 2 },
    { title: 'Image 4', cols: 1, rows: 1 },
  ];

  value = 50;

  constructor(private _formBuilder: FormBuilder) { }
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
