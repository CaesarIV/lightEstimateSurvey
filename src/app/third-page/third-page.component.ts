import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {

  value = 50;

  constructor(private _formBuilder: FormBuilder) { }
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  answeredSolo = [false,false,false,false,false,false,false,false]
  stepSolo = 0;


  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 45 && value <= 55) {
      return '✓';
    }

    return value+'%';
  }

  saveAnswerSolo(question:number){
    console.log(question);
    this.answeredSolo[question] = true;
    this.nextStepSolo();
  }

  setStepSolo(index: number) {
    this.stepSolo = index;
  }

  nextStepSolo() {
    this.stepSolo++;
  }

  prevStepSolo() {
    this.stepSolo--;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
