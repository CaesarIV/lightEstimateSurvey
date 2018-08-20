import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';


export interface Participant { id: string; name: string; }


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})



export class AnalyticsComponent implements OnInit {

  participantsCollection: AngularFirestoreCollection;
  docIDs = [];
  data = [];
  participants:Participant [];
  constructor(
    private afs: AngularFirestore,
    private dataService: DataService
  ) { }

  ngOnInit() {
    
    this.participantsCollection = this.afs.collection('participants');
    this.participantsCollection.ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.docIDs.push(doc.id);
          this.data.push([doc.id]);
        });
        for (let index = 0; index < this.docIDs.length; index++) {

          this.participantsCollection.doc(this.docIDs[index]).collection('backgroundAnswers').ref.get().then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {

                this.data[index].push(doc.data());
              });
            });

          this.participantsCollection.doc(this.docIDs[index]).collection('soloAnswers').ref.get().then( (querySnapshot) => {
            let soloAnswersTemp = [];
            querySnapshot.forEach( (doc) => {
              soloAnswersTemp.push(doc.data());
              });
            this.data[index].push(soloAnswersTemp);
            });

          this.participantsCollection.doc(this.docIDs[index]).collection('compAnswers').ref.get().then( (querySnapshot) => {
            let compAnswersTemp = [];
            querySnapshot.forEach( (doc) => {
              compAnswersTemp.push(doc.data());
              });
            this.data[index].push(compAnswersTemp);
            });

          this.participantsCollection.doc(this.docIDs[index]).collection('matAnswers').ref.get().then( (querySnapshot) => {
            let matAnswersTemp = [];
            querySnapshot.forEach( (doc) => {
              matAnswersTemp.push(doc.data());
              });
            this.data[index].push(matAnswersTemp);
            });

          this.participantsCollection.doc(this.docIDs[index]).collection('lghtAnswers').ref.get().then( (querySnapshot) => {
            let lghtAnswersTemp = [];
            querySnapshot.forEach( (doc) => {
              lghtAnswersTemp.push(doc.data());
              });
            this.data[index].push(lghtAnswersTemp);
            });
          
        }
        console.log(this.data);
    });


    

    


  }

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType:string = 'radar';
 

    // lineChart
    public lineChartData:Array<any> = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType:string = 'line';
    // PolarArea
    public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend:boolean = true;
   
    public polarAreaChartType:string = 'polarArea';

    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';

    public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
   
    public barChartData:any[] = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    public randomizeType():void {
      this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
      this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  
}
