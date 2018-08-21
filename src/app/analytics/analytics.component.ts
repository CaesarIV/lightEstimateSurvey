import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  JSONdata;
  participants:Participant [];
  showPhoneChart = false;
  showAgeChart = false;
  showARhwChart = false;
  showARexpChart = false;
  showAveragesChart = false;
  showCompChart = false;
  showMatChart = false;

  level0 = false;
  level1 = false;
  level2 = false;
  level3 = false;
  vary1 = false;
  vary2 = false;
  vary3 = false;

  //Vufora Nums
  vufL0avg = 0;
  vufL0num = [];

  vufL1avg = 0;
  vufL1num = [];

  vufL2avg = 0;
  vufL2num = [];

  vufL3avg = 0;
  vufL3num = [];

  vufV1avg = 0;
  vufV1num = [];

  vufV2avg = 0;
  vufV2num = [];

  vufV3avg = 0;
  vufV3num = [];

  //ARCore Nums
  arcL0avg = 0;
  arcL0num = [];

  arcL1avg = 0;
  arcL1num = [];

  arcL2avg = 0;
  arcL2num = [];

  arcL3avg = 0;
  arcL3num = [];

  arcV1avg = 0;
  arcV1num = [];

  arcV2avg = 0;
  arcV2num = [];

  arcV3avg = 0;
  arcV3num = [];

  //ARKit Nums
  arkL0avg = 0;
  arkL0num = [];

  arkL1avg = 0;
  arkL1num = [];

  arkL2avg = 0;
  arkL2num = [];

  arkL3avg = 0;
  arkL3num = [];

  arkV1avg = 0;
  arkV1num = [];

  arkV2avg = 0;
  arkV2num = [];

  arkV3avg = 0;
  arkV3num = [];

  //Comparative Score Arrays
  arkCOMP = 0;
  vufCOMP = 0;
  arcCOMP = 0;

  arkCOMP0 = 0;
  vufCOMP0 = 0;
  arcCOMP0 = 0;

  arkCOMP1 = 0;
  vufCOMP1 = 0;
  arcCOMP1 = 0;

  arkCOMP2 = 0;
  vufCOMP2 = 0;
  arcCOMP2 = 0;

  arkCOMP3 = 0;
  vufCOMP3 = 0;
  arcCOMP3 = 0;

  arkCOMPv1 = 0;
  vufCOMPv1 = 0;
  arcCOMPv1 = 0;

  arkCOMPv2 = 0;
  vufCOMPv2 = 0;
  arcCOMPv2 = 0;

  arkCOMPv3 = 0;
  vufCOMPv3 = 0;
  arcCOMPv3 = 0;


  possibleScore = 0;

  possibleScoreARK = 0;
  possibleScoreVUF = 0;
  possibleScoreARC = 0;

  possibleScore0ARK = 0;
  possibleScore0VUF = 0;
  possibleScore0ARC = 0;

  possibleScore1ARK = 0;
  possibleScore1VUF = 0;
  possibleScore1ARC = 0;

  possibleScore2ARK = 0;
  possibleScore2VUF = 0;
  possibleScore2ARC = 0;

  possibleScore3ARK = 0;
  possibleScore3VUF = 0;
  possibleScore3ARC = 0;

  possibleScorev1ARK = 0;
  possibleScorev1VUF = 0;
  possibleScorev1ARC = 0;

  possibleScorev2ARK = 0;
  possibleScorev2VUF = 0;
  possibleScorev2ARC = 0;
  
  possibleScorev3ARK = 0;
  possibleScorev3VUF = 0;
  possibleScorev3ARC = 0;
  

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
            let backgroundAnswersTemp = [];
            querySnapshot.forEach( (doc) => {
              backgroundAnswersTemp.push(doc.data()); 
              });
              this.data[index].push(backgroundAnswersTemp);
              
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
            //this.sortData();
        }

        //ENTA FALA7
        console.log("Analyzing in 3s...");
        setTimeout(() => 
        {
            this.sortData();
        },
        3000);
        //this.sortData();
        // console.log(this.data);
        // console.log(this.data[1][0]);
        // console.log(this.data[1][1]);
        // for (let index = 0; index < this.data.length; index++) {
        //   console.log(this.data[index][2]);
        //   if(this.data[index][1][0].phone[0] == "Android Operated"){
        //     console.log("Found Android!");
        //   }                    
        // }
    });
    

  }

    
  
  sortData(){
    console.log("Analysis Start!")
    // this.JSONdata = JSON.stringify(this.data);
    // console.log(this.data);
    // console.log(this.JSONdata);
    // console.log(this.data[0]);
    //console.log(this.data[0][2]);
    //console.log(this.data[0][2][0].url.substring(20));
    for (let index = 0; index < this.data.length; index++) {

      //COUNT PHONES
      //console.log(this.data[index]);
      if(this.data[index][1] && this.data[index][1][0]){
        if(this.data[index][1][0][0].phone){
          if(this.data[index][1][0][0].phone.indexOf("Android Operated") >= 0){
            this.phoneChartData[0]+=1;
          }        
          if(this.data[index][1][0][0].phone.indexOf("iPhone") >= 0){
            this.phoneChartData[1]+=1;
          }  
          if(this.data[index][1][0][0].phone.indexOf("Windows Phone") >= 0){
            this.phoneChartData[2]+=1;
          }  
          if(this.data[index][1][0][0].phone.indexOf("Other") >= 0){
            this.phoneChartData[3]+=1;
          }    
        }else{    
          this.phoneChartData[4]+=1;
        }  
      
      
        //COUNT AGE GROUPS
        if(this.data[index][1][0][0].ageGroup == 1){
          this.ageChartData[0]+=1;
        }  
        if(this.data[index][1][0][0].ageGroup == 2){
          this.ageChartData[1]+=1;
        } 
        if(this.data[index][1][0][0].ageGroup == 3){
          this.ageChartData[2]+=1;
        } 
        if(this.data[index][1][0][0].ageGroup == 4){
          this.ageChartData[3]+=1;
        } 
        if(this.data[index][1][0][0].ageGroup == 5){
          this.ageChartData[4]+=1;
        } 
        if(this.data[index][1][0][0].ageGroup == 6){
          this.ageChartData[5]+=1;
        } 

        //COUNT AR EXP
        if(this.data[index][1][0][0].expAr.indexOf("true") >= 0){
          this.ARexpChartData[0]+=1;
        }  
        if(this.data[index][1][0][0].expAr.indexOf("false") >= 0){
          this.ARexpChartData[1]+=1;
        }  

        //COUNT AR HW
        if(this.data[index][1][0][0].expArHw){
          if(this.data[index][1][0][0].expArHw.indexOf("Smartphone / Tablet") >= 0){
            this.ARhwChartData[0]+=1;
          }
          if(this.data[index][1][0][0].expArHw.indexOf("Smarphone / Tablet") >= 0){
            this.ARhwChartData[0]+=1;
          }   
          if(this.data[index][1][0][0].expArHw.indexOf("AR-Headset") >= 0){
            this.ARhwChartData[1]+=1;
          }   
          if(this.data[index][1][0][0].expArHw.indexOf("AR-Kiosk") >= 0){
            this.ARhwChartData[2]+=1;
          }   
          if(this.data[index][1][0][0].expArHw.indexOf("Other") >= 0){
            this.ARhwChartData[3]+=1;
          } 
        }

      } 
      
      for (let i = 0; i < this.data[index][2].length; i++) {
        //ARCORE SCORES
        if(this.data[index][2][i].url.indexOf("rc0s") >= 0){
          this.arcL0num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rc1s") >= 0){
          this.arcL1num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rc2s") >= 0){
          this.arcL2num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rc3s") >= 0){
          this.arcL3num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rc1V") >= 0){
          this.arcV1num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rc2V") >= 0){
          this.arcV2num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rc3V") >= 0){
          this.arcV3num.push(this.data[index][2][i].answer);
        }

        //ARKIT SCORES
        if(this.data[index][2][i].url.indexOf("rk0s") >= 0){
          this.arkL0num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rk1s") >= 0){
          this.arkL1num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rk2s") >= 0){
          this.arkL2num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rk3s") >= 0){
          this.arkL3num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rk1V") >= 0){
          this.arkV1num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rk2V") >= 0){
          this.arkV2num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("rk3V") >= 0){
          this.arkV3num.push(this.data[index][2][i].answer);
        }

        //VUFORIA SCORES
        if(this.data[index][2][i].url.indexOf("vf0s") >= 0){
          this.vufL0num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("vf1s") >= 0){
          this.vufL1num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("vf2s") >= 0){
          this.vufL2num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("vf3s") >= 0){
          this.vufL3num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("vf1V") >= 0){
          this.vufV1num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("vf2V") >= 0){
          this.vufV2num.push(this.data[index][2][i].answer);
        }
        if(this.data[index][2][i].url.indexOf("vf3V") >= 0){
          this.vufV3num.push(this.data[index][2][i].answer);
        }
      }

      //console.log(this.data[index][3]);
      //COMPARATIVE SCORES
      //{answer: 3, id: 0, type: "Image", url1: "../../assets/Images/rc1s.png", url2: "../../assets/Images/vf1s.png"}
      for (let i = 0; i < this.data[index][3].length; i++) {
        if(this.data[index][3][i]){

          //Calculating max possible score for each
          this.possibleScore++;
          if(this.data[index][3][i].url2.indexOf("vf") >= 0){
            this.possibleScoreVUF++;
            if(this.data[index][3][i].url2.indexOf("0s") >= 0){
              this.possibleScore0VUF++;
            }
            if(this.data[index][3][i].url2.indexOf("1s") >= 0){
              this.possibleScore1VUF++;
            }
            if(this.data[index][3][i].url2.indexOf("2s") >= 0){
              this.possibleScore2VUF++;
            }
            if(this.data[index][3][i].url2.indexOf("3s") >= 0){
              this.possibleScore3VUF++;
            }
            if(this.data[index][3][i].url2.indexOf("1V") >= 0){
              this.possibleScorev1VUF++;
            }
            if(this.data[index][3][i].url2.indexOf("2V") >= 0){
              this.possibleScorev2VUF++;
            }
            if(this.data[index][3][i].url2.indexOf("3V") >= 0){
              this.possibleScorev3VUF++;
            }
          }
          if(this.data[index][3][i].url2.indexOf("rc") >= 0){
            this.possibleScoreARC++;
            if(this.data[index][3][i].url2.indexOf("0s") >= 0){
              this.possibleScore0ARC++;
            }
            if(this.data[index][3][i].url2.indexOf("1s") >= 0){
              this.possibleScore1ARC++;
            }
            if(this.data[index][3][i].url2.indexOf("2s") >= 0){
              this.possibleScore2ARC++;
            }
            if(this.data[index][3][i].url2.indexOf("3s") >= 0){
              this.possibleScore3ARC++;
            }
            if(this.data[index][3][i].url2.indexOf("1V") >= 0){
              this.possibleScorev1ARC++;
            }
            if(this.data[index][3][i].url2.indexOf("2V") >= 0){
              this.possibleScorev2ARC++;
            }
            if(this.data[index][3][i].url2.indexOf("3V") >= 0){
              this.possibleScorev3ARC++;
            }
          }
          if(this.data[index][3][i].url2.indexOf("rk") >= 0){
            this.possibleScoreARK++;
            if(this.data[index][3][i].url2.indexOf("0s") >= 0){
              this.possibleScore0ARK++;
            }
            if(this.data[index][3][i].url2.indexOf("1s") >= 0){
              this.possibleScore1ARK++;
            }
            if(this.data[index][3][i].url2.indexOf("2s") >= 0){
              this.possibleScore2ARK++;
            }
            if(this.data[index][3][i].url2.indexOf("3s") >= 0){
              this.possibleScore3ARK++;
            }
            if(this.data[index][3][i].url2.indexOf("1V") >= 0){
              this.possibleScorev1ARK++;
            }
            if(this.data[index][3][i].url2.indexOf("2V") >= 0){
              this.possibleScorev2ARK++;
            }
            if(this.data[index][3][i].url2.indexOf("3V") >= 0){
              this.possibleScorev3ARK++;
            }
          }
          if(this.data[index][3][i].url1.indexOf("vf") >= 0){
            this.possibleScoreVUF++;
            if(this.data[index][3][i].url1.indexOf("0s") >= 0){
              this.possibleScore0VUF++;
            }
            if(this.data[index][3][i].url1.indexOf("1s") >= 0){
              this.possibleScore1VUF++;
            }
            if(this.data[index][3][i].url1.indexOf("2s") >= 0){
              this.possibleScore2VUF++;
            }
            if(this.data[index][3][i].url1.indexOf("3s") >= 0){
              this.possibleScore3VUF++;
            }
            if(this.data[index][3][i].url1.indexOf("1V") >= 0){
              this.possibleScorev1VUF++;
            }
            if(this.data[index][3][i].url1.indexOf("2V") >= 0){
              this.possibleScorev2VUF++;
            }
            if(this.data[index][3][i].url1.indexOf("3V") >= 0){
              this.possibleScorev3VUF++;
            }
          }
          if(this.data[index][3][i].url1.indexOf("rc") >= 0){
            this.possibleScoreARC++;
            if(this.data[index][3][i].url1.indexOf("0s") >= 0){
              this.possibleScore0ARC++;
            }
            if(this.data[index][3][i].url1.indexOf("1s") >= 0){
              this.possibleScore1ARC++;
            }
            if(this.data[index][3][i].url1.indexOf("2s") >= 0){
              this.possibleScore2ARC++;
            }
            if(this.data[index][3][i].url1.indexOf("3s") >= 0){
              this.possibleScore3ARC++;
            }
            if(this.data[index][3][i].url1.indexOf("1V") >= 0){
              this.possibleScorev1ARC++;
            }
            if(this.data[index][3][i].url1.indexOf("2V") >= 0){
              this.possibleScorev2ARC++;
            }
            if(this.data[index][3][i].url1.indexOf("3V") >= 0){
              this.possibleScorev3ARC++;
            }
          }
          if(this.data[index][3][i].url1.indexOf("rk") >= 0){
            this.possibleScoreARK++;
            if(this.data[index][3][i].url1.indexOf("0s") >= 0){
              this.possibleScore0ARK++;
            }
            if(this.data[index][3][i].url1.indexOf("1s") >= 0){
              this.possibleScore1ARK++;
            }
            if(this.data[index][3][i].url1.indexOf("2s") >= 0){
              this.possibleScore2ARK++;
            }
            if(this.data[index][3][i].url1.indexOf("3s") >= 0){
              this.possibleScore3ARK++;
            }
            if(this.data[index][3][i].url1.indexOf("1V") >= 0){
              this.possibleScorev1ARK++;
            }
            if(this.data[index][3][i].url1.indexOf("2V") >= 0){
              this.possibleScorev2ARK++;
            }
            if(this.data[index][3][i].url1.indexOf("3V") >= 0){
              this.possibleScorev3ARK++;
            }
          }


          //Calculating Points System
          if(this.data[index][3][i].answer == 3){
            if(this.data[index][3][i].url2.indexOf("vf") >= 0){

              this.vufCOMP++;

              if(this.data[index][3][i].url2.indexOf("0s") >= 0){
                this.vufCOMP0++;
              }
              if(this.data[index][3][i].url2.indexOf("1s") >= 0){
                this.vufCOMP1++;
              }
              if(this.data[index][3][i].url2.indexOf("2s") >= 0){
                this.vufCOMP2++;
              }
              if(this.data[index][3][i].url2.indexOf("3s") >= 0){
                this.vufCOMP3++;
              }
              if(this.data[index][3][i].url2.indexOf("1V") >= 0){
                this.vufCOMPv1++;
              }
              if(this.data[index][3][i].url2.indexOf("2V") >= 0){
                this.vufCOMPv2++;
              }
              if(this.data[index][3][i].url2.indexOf("3V") >= 0){
                this.vufCOMPv3++;
              }

            }
            if(this.data[index][3][i].url2.indexOf("rc") >= 0){

              this.arcCOMP++;

              if(this.data[index][3][i].url2.indexOf("0s") >= 0){
                this.arcCOMP0++;
              }
              if(this.data[index][3][i].url2.indexOf("1s") >= 0){
                this.arcCOMP1++;
              }
              if(this.data[index][3][i].url2.indexOf("2s") >= 0){
                this.arcCOMP2++;
              }
              if(this.data[index][3][i].url2.indexOf("3s") >= 0){
                this.arcCOMP3++;
              }
              if(this.data[index][3][i].url2.indexOf("1V") >= 0){
                this.arcCOMPv1++;
              }
              if(this.data[index][3][i].url2.indexOf("2V") >= 0){
                this.arcCOMPv2++;
              }
              if(this.data[index][3][i].url2.indexOf("3V") >= 0){
                this.arcCOMPv3++;
              }

            }
            if(this.data[index][3][i].url2.indexOf("rk") >= 0){
              this.arkCOMP++;

              if(this.data[index][3][i].url2.indexOf("0s") >= 0){
                this.arkCOMP0++;
              }
              if(this.data[index][3][i].url2.indexOf("1s") >= 0){
                this.arkCOMP1++;
              }
              if(this.data[index][3][i].url2.indexOf("2s") >= 0){
                this.arkCOMP2++;
              }
              if(this.data[index][3][i].url2.indexOf("3s") >= 0){
                this.arkCOMP3++;
              }
              if(this.data[index][3][i].url2.indexOf("1V") >= 0){
                this.arkCOMPv1++;
              }
              if(this.data[index][3][i].url2.indexOf("2V") >= 0){
                this.arkCOMPv2++;
              }
              if(this.data[index][3][i].url2.indexOf("3V") >= 0){
                this.arkCOMPv3++;
              }
            }
          }    
          if(this.data[index][3][i].answer == 1){
            if(this.data[index][3][i].url1.indexOf("vf") >= 0){
              
              this.vufCOMP++;

              if(this.data[index][3][i].url1.indexOf("0s") >= 0){
                this.vufCOMP0++;
              }
              if(this.data[index][3][i].url1.indexOf("1s") >= 0){
                this.vufCOMP1++;
              }
              if(this.data[index][3][i].url1.indexOf("2s") >= 0){
                this.vufCOMP2++;
              }
              if(this.data[index][3][i].url1.indexOf("3s") >= 0){
                this.vufCOMP3++;
              }
              if(this.data[index][3][i].url1.indexOf("1V") >= 0){
                this.vufCOMPv1++;
              }
              if(this.data[index][3][i].url1.indexOf("2V") >= 0){
                this.vufCOMPv2++;
              }
              if(this.data[index][3][i].url1.indexOf("3V") >= 0){
                this.vufCOMPv3++;
              }


            }
            if(this.data[index][3][i].url1.indexOf("rc") >= 0){
              this.arcCOMP++;

              if(this.data[index][3][i].url1.indexOf("0s") >= 0){
                this.arcCOMP0++;
              }
              if(this.data[index][3][i].url1.indexOf("1s") >= 0){
                this.arcCOMP1++;
              }
              if(this.data[index][3][i].url1.indexOf("2s") >= 0){
                this.arcCOMP2++;
              }
              if(this.data[index][3][i].url1.indexOf("3s") >= 0){
                this.arcCOMP3++;
              }
              if(this.data[index][3][i].url1.indexOf("1V") >= 0){
                this.arcCOMPv1++;
              }
              if(this.data[index][3][i].url1.indexOf("2V") >= 0){
                this.arcCOMPv2++;
              }
              if(this.data[index][3][i].url1.indexOf("3V") >= 0){
                this.arcCOMPv3++;
              }
            }
            if(this.data[index][3][i].url1.indexOf("rk") >= 0){
              this.arkCOMP++;

              if(this.data[index][3][i].url1.indexOf("0s") >= 0){
                this.arkCOMP0++;
              }
              if(this.data[index][3][i].url1.indexOf("1s") >= 0){
                this.arkCOMP1++;
              }
              if(this.data[index][3][i].url1.indexOf("2s") >= 0){
                this.arkCOMP2++;
              }
              if(this.data[index][3][i].url1.indexOf("3s") >= 0){
                this.arkCOMP3++;
              }
              if(this.data[index][3][i].url1.indexOf("1V") >= 0){
                this.arkCOMPv1++;
              }
              if(this.data[index][3][i].url1.indexOf("2V") >= 0){
                this.arkCOMPv2++;
              }
              if(this.data[index][3][i].url1.indexOf("3V") >= 0){
                this.arkCOMPv3++;
              }
            }
          }    
          if(this.data[index][3][i].answer == 2){
            if(this.data[index][3][i].url2.indexOf("vf") >= 0){
              this.vufCOMP+=0.5;
              if(this.data[index][3][i].url2.indexOf("0s") >= 0){
                this.vufCOMP0+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("1s") >= 0){
                this.vufCOMP1+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("2s") >= 0){
                this.vufCOMP2+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("3s") >= 0){
                this.vufCOMP3+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("1V") >= 0){
                this.vufCOMPv1+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("2V") >= 0){
                this.vufCOMPv2+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("3V") >= 0){
                this.vufCOMPv3+=0.5;
              }
            }
            if(this.data[index][3][i].url2.indexOf("rc") >= 0){
              this.arcCOMP+=0.5;
              if(this.data[index][3][i].url2.indexOf("0s") >= 0){
                this.arcCOMP0+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("1s") >= 0){
                this.arcCOMP1+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("2s") >= 0){
                this.arcCOMP2+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("3s") >= 0){
                this.arcCOMP3+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("1V") >= 0){
                this.arcCOMPv1+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("2V") >= 0){
                this.arcCOMPv2+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("3V") >= 0){
                this.arcCOMPv3+=0.5;
              }
            }
            if(this.data[index][3][i].url2.indexOf("rk") >= 0){
              this.arkCOMP+=0.5;
              if(this.data[index][3][i].url2.indexOf("0s") >= 0){
                this.arkCOMP0+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("1s") >= 0){
                this.arkCOMP1+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("2s") >= 0){
                this.arkCOMP2+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("3s") >= 0){
                this.arkCOMP3+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("1V") >= 0){
                this.arkCOMPv1+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("2V") >= 0){
                this.arkCOMPv2+=0.5;
              }
              if(this.data[index][3][i].url2.indexOf("3V") >= 0){
                this.arkCOMPv3+=0.5;
              }
            }
            if(this.data[index][3][i].url1.indexOf("vf") >= 0){
              this.vufCOMP+=0.5;
              if(this.data[index][3][i].url1.indexOf("0s") >= 0){
                this.vufCOMP0+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("1s") >= 0){
                this.vufCOMP1+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("2s") >= 0){
                this.vufCOMP2+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("3s") >= 0){
                this.vufCOMP3+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("1V") >= 0){
                this.vufCOMPv1+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("2V") >= 0){
                this.vufCOMPv2+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("3V") >= 0){
                this.vufCOMPv3+=0.5;
              }
            }
            if(this.data[index][3][i].url1.indexOf("rc") >= 0){
              this.arcCOMP+=0.5;
              if(this.data[index][3][i].url1.indexOf("0s") >= 0){
                this.arcCOMP0+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("1s") >= 0){
                this.arcCOMP1+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("2s") >= 0){
                this.arcCOMP2+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("3s") >= 0){
                this.arcCOMP3+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("1V") >= 0){
                this.arcCOMPv1+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("2V") >= 0){
                this.arcCOMPv2+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("3V") >= 0){
                this.arcCOMPv3+=0.5;
              }
            }
            if(this.data[index][3][i].url1.indexOf("rk") >= 0){
              this.arkCOMP+=0.5;
              if(this.data[index][3][i].url1.indexOf("0s") >= 0){
                this.arkCOMP0+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("1s") >= 0){
                this.arkCOMP1+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("2s") >= 0){
                this.arkCOMP2+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("3s") >= 0){
                this.arkCOMP3+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("1V") >= 0){
                this.arkCOMPv1+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("2V") >= 0){
                this.arkCOMPv2+=0.5;
              }
              if(this.data[index][3][i].url1.indexOf("3V") >= 0){
                this.arkCOMPv3+=0.5;
              }
            }
          }   
        }           
      }

      //console.log(this.data[index][4]);
      for (let i = 0; i < this.data[index][4].length; i++) {
        
        if(this.data[index][4][i].url.indexOf("vf") >= 0){
          if(this.data[index][4][i].answer == 'stainless_steel'){
            this.matChartData[0].data[0]++;
          }
          if(this.data[index][4][i].answer == 'wood'){
            this.matChartData[0].data[1]++;
          }
          if(this.data[index][4][i].answer == 'dirt'){
            this.matChartData[0].data[2]++;
          }
          if(this.data[index][4][i].answer == 'rock'){
            this.matChartData[0].data[3]++;
          }
          if(this.data[index][4][i].answer == 'plastic'){
            this.matChartData[0].data[4]++;
          }
          if(this.data[index][4][i].answer == 'cloth'){
            this.matChartData[0].data[5]++;
          }
          if(this.data[index][4][i].answer == 'same'){
            this.matChartData[0].data[6]++;
          }
        }
        if(this.data[index][4][i].url.indexOf("rc") >= 0){
          if(this.data[index][4][i].answer == 'stainless_steel'){
            this.matChartData[1].data[0]++;
          }
          if(this.data[index][4][i].answer == 'wood'){
            this.matChartData[1].data[1]++;
          }
          if(this.data[index][4][i].answer == 'dirt'){
            this.matChartData[1].data[2]++;
          }
          if(this.data[index][4][i].answer == 'rock'){
            this.matChartData[1].data[3]++;
          }
          if(this.data[index][4][i].answer == 'plastic'){
            this.matChartData[1].data[4]++;
          }
          if(this.data[index][4][i].answer == 'cloth'){
            this.matChartData[1].data[5]++;
          }
          if(this.data[index][4][i].answer == 'same'){
            this.matChartData[1].data[6]++;
          }
        }
        if(this.data[index][4][i].url.indexOf("rk") >= 0){
          if(this.data[index][4][i].answer == 'stainless_steel'){
            this.matChartData[2].data[0]++;
          }
          if(this.data[index][4][i].answer == 'wood'){
            this.matChartData[2].data[1]++;
          }
          if(this.data[index][4][i].answer == 'dirt'){
            this.matChartData[2].data[2]++;
          }
          if(this.data[index][4][i].answer == 'rock'){
            this.matChartData[2].data[3]++;
          }
          if(this.data[index][4][i].answer == 'plastic'){
            this.matChartData[2].data[4]++;
          }
          if(this.data[index][4][i].answer == 'cloth'){
            this.matChartData[2].data[5]++;
          }
          if(this.data[index][4][i].answer == 'same'){
            this.matChartData[2].data[6]++;
          }
        }


        
      }

      for (let i = 0; i < this.data[index][5].length; i++) {
        if(this.data[index][5][i]){

          //Calculating max possible score for each
          this.possibleScore++;
          if(this.data[index][5][i].url2.indexOf("vf") >= 0){
            this.possibleScoreVUF++;
            if(this.data[index][5][i].url2.indexOf("0s") >= 0){
              this.possibleScore0VUF++;
            }
            if(this.data[index][5][i].url2.indexOf("1s") >= 0){
              this.possibleScore1VUF++;
            }
            if(this.data[index][5][i].url2.indexOf("2s") >= 0){
              this.possibleScore2VUF++;
            }
            if(this.data[index][5][i].url2.indexOf("3s") >= 0){
              this.possibleScore3VUF++;
            }
            if(this.data[index][5][i].url2.indexOf("1V") >= 0){
              this.possibleScorev1VUF++;
            }
            if(this.data[index][5][i].url2.indexOf("2V") >= 0){
              this.possibleScorev2VUF++;
            }
            if(this.data[index][5][i].url2.indexOf("3V") >= 0){
              this.possibleScorev3VUF++;
            }
          }
          if(this.data[index][5][i].url2.indexOf("rc") >= 0){
            this.possibleScoreARC++;
            if(this.data[index][5][i].url2.indexOf("0s") >= 0){
              this.possibleScore0ARC++;
            }
            if(this.data[index][5][i].url2.indexOf("1s") >= 0){
              this.possibleScore1ARC++;
            }
            if(this.data[index][5][i].url2.indexOf("2s") >= 0){
              this.possibleScore2ARC++;
            }
            if(this.data[index][5][i].url2.indexOf("3s") >= 0){
              this.possibleScore3ARC++;
            }
            if(this.data[index][5][i].url2.indexOf("1V") >= 0){
              this.possibleScorev1ARC++;
            }
            if(this.data[index][5][i].url2.indexOf("2V") >= 0){
              this.possibleScorev2ARC++;
            }
            if(this.data[index][5][i].url2.indexOf("3V") >= 0){
              this.possibleScorev3ARC++;
            }
          }
          if(this.data[index][5][i].url2.indexOf("rk") >= 0){
            this.possibleScoreARK++;
            if(this.data[index][5][i].url2.indexOf("0s") >= 0){
              this.possibleScore0ARK++;
            }
            if(this.data[index][5][i].url2.indexOf("1s") >= 0){
              this.possibleScore1ARK++;
            }
            if(this.data[index][5][i].url2.indexOf("2s") >= 0){
              this.possibleScore2ARK++;
            }
            if(this.data[index][5][i].url2.indexOf("3s") >= 0){
              this.possibleScore3ARK++;
            }
            if(this.data[index][5][i].url2.indexOf("1V") >= 0){
              this.possibleScorev1ARK++;
            }
            if(this.data[index][5][i].url2.indexOf("2V") >= 0){
              this.possibleScorev2ARK++;
            }
            if(this.data[index][5][i].url2.indexOf("3V") >= 0){
              this.possibleScorev3ARK++;
            }
          }
          if(this.data[index][5][i].url1.indexOf("vf") >= 0){
            this.possibleScoreVUF++;
            if(this.data[index][5][i].url1.indexOf("0s") >= 0){
              this.possibleScore0VUF++;
            }
            if(this.data[index][5][i].url1.indexOf("1s") >= 0){
              this.possibleScore1VUF++;
            }
            if(this.data[index][5][i].url1.indexOf("2s") >= 0){
              this.possibleScore2VUF++;
            }
            if(this.data[index][5][i].url1.indexOf("3s") >= 0){
              this.possibleScore3VUF++;
            }
            if(this.data[index][5][i].url1.indexOf("1V") >= 0){
              this.possibleScorev1VUF++;
            }
            if(this.data[index][5][i].url1.indexOf("2V") >= 0){
              this.possibleScorev2VUF++;
            }
            if(this.data[index][5][i].url1.indexOf("3V") >= 0){
              this.possibleScorev3VUF++;
            }
          }
          if(this.data[index][5][i].url1.indexOf("rc") >= 0){
            this.possibleScoreARC++;
            if(this.data[index][5][i].url1.indexOf("0s") >= 0){
              this.possibleScore0ARC++;
            }
            if(this.data[index][5][i].url1.indexOf("1s") >= 0){
              this.possibleScore1ARC++;
            }
            if(this.data[index][5][i].url1.indexOf("2s") >= 0){
              this.possibleScore2ARC++;
            }
            if(this.data[index][5][i].url1.indexOf("3s") >= 0){
              this.possibleScore3ARC++;
            }
            if(this.data[index][5][i].url1.indexOf("1V") >= 0){
              this.possibleScorev1ARC++;
            }
            if(this.data[index][5][i].url1.indexOf("2V") >= 0){
              this.possibleScorev2ARC++;
            }
            if(this.data[index][5][i].url1.indexOf("3V") >= 0){
              this.possibleScorev3ARC++;
            }
          }
          if(this.data[index][5][i].url1.indexOf("rk") >= 0){
            this.possibleScoreARK++;
            if(this.data[index][5][i].url1.indexOf("0s") >= 0){
              this.possibleScore0ARK++;
            }
            if(this.data[index][5][i].url1.indexOf("1s") >= 0){
              this.possibleScore1ARK++;
            }
            if(this.data[index][5][i].url1.indexOf("2s") >= 0){
              this.possibleScore2ARK++;
            }
            if(this.data[index][5][i].url1.indexOf("3s") >= 0){
              this.possibleScore3ARK++;
            }
            if(this.data[index][5][i].url1.indexOf("1V") >= 0){
              this.possibleScorev1ARK++;
            }
            if(this.data[index][5][i].url1.indexOf("2V") >= 0){
              this.possibleScorev2ARK++;
            }
            if(this.data[index][5][i].url1.indexOf("3V") >= 0){
              this.possibleScorev3ARK++;
            }
          }


          //Calculating Points System
          if(this.data[index][5][i].answer == 3){
            if(this.data[index][5][i].url2.indexOf("vf") >= 0){

              this.vufCOMP++;

              if(this.data[index][5][i].url2.indexOf("0s") >= 0){
                this.vufCOMP0++;
              }
              if(this.data[index][5][i].url2.indexOf("1s") >= 0){
                this.vufCOMP1++;
              }
              if(this.data[index][5][i].url2.indexOf("2s") >= 0){
                this.vufCOMP2++;
              }
              if(this.data[index][5][i].url2.indexOf("3s") >= 0){
                this.vufCOMP3++;
              }
              if(this.data[index][5][i].url2.indexOf("1V") >= 0){
                this.vufCOMPv1++;
              }
              if(this.data[index][5][i].url2.indexOf("2V") >= 0){
                this.vufCOMPv2++;
              }
              if(this.data[index][5][i].url2.indexOf("3V") >= 0){
                this.vufCOMPv3++;
              }

            }
            if(this.data[index][5][i].url2.indexOf("rc") >= 0){

              this.arcCOMP++;

              if(this.data[index][5][i].url2.indexOf("0s") >= 0){
                this.arcCOMP0++;
              }
              if(this.data[index][5][i].url2.indexOf("1s") >= 0){
                this.arcCOMP1++;
              }
              if(this.data[index][5][i].url2.indexOf("2s") >= 0){
                this.arcCOMP2++;
              }
              if(this.data[index][5][i].url2.indexOf("3s") >= 0){
                this.arcCOMP3++;
              }
              if(this.data[index][5][i].url2.indexOf("1V") >= 0){
                this.arcCOMPv1++;
              }
              if(this.data[index][5][i].url2.indexOf("2V") >= 0){
                this.arcCOMPv2++;
              }
              if(this.data[index][5][i].url2.indexOf("3V") >= 0){
                this.arcCOMPv3++;
              }

            }
            if(this.data[index][5][i].url2.indexOf("rk") >= 0){
              this.arkCOMP++;

              if(this.data[index][5][i].url2.indexOf("0s") >= 0){
                this.arkCOMP0++;
              }
              if(this.data[index][5][i].url2.indexOf("1s") >= 0){
                this.arkCOMP1++;
              }
              if(this.data[index][5][i].url2.indexOf("2s") >= 0){
                this.arkCOMP2++;
              }
              if(this.data[index][5][i].url2.indexOf("3s") >= 0){
                this.arkCOMP3++;
              }
              if(this.data[index][5][i].url2.indexOf("1V") >= 0){
                this.arkCOMPv1++;
              }
              if(this.data[index][5][i].url2.indexOf("2V") >= 0){
                this.arkCOMPv2++;
              }
              if(this.data[index][5][i].url2.indexOf("3V") >= 0){
                this.arkCOMPv3++;
              }
            }
          }    
          if(this.data[index][5][i].answer == 1){
            if(this.data[index][5][i].url1.indexOf("vf") >= 0){
              
              this.vufCOMP++;

              if(this.data[index][5][i].url1.indexOf("0s") >= 0){
                this.vufCOMP0++;
              }
              if(this.data[index][5][i].url1.indexOf("1s") >= 0){
                this.vufCOMP1++;
              }
              if(this.data[index][5][i].url1.indexOf("2s") >= 0){
                this.vufCOMP2++;
              }
              if(this.data[index][5][i].url1.indexOf("3s") >= 0){
                this.vufCOMP3++;
              }
              if(this.data[index][5][i].url1.indexOf("1V") >= 0){
                this.vufCOMPv1++;
              }
              if(this.data[index][5][i].url1.indexOf("2V") >= 0){
                this.vufCOMPv2++;
              }
              if(this.data[index][5][i].url1.indexOf("3V") >= 0){
                this.vufCOMPv3++;
              }


            }
            if(this.data[index][5][i].url1.indexOf("rc") >= 0){
              this.arcCOMP++;

              if(this.data[index][5][i].url1.indexOf("0s") >= 0){
                this.arcCOMP0++;
              }
              if(this.data[index][5][i].url1.indexOf("1s") >= 0){
                this.arcCOMP1++;
              }
              if(this.data[index][5][i].url1.indexOf("2s") >= 0){
                this.arcCOMP2++;
              }
              if(this.data[index][5][i].url1.indexOf("3s") >= 0){
                this.arcCOMP3++;
              }
              if(this.data[index][5][i].url1.indexOf("1V") >= 0){
                this.arcCOMPv1++;
              }
              if(this.data[index][5][i].url1.indexOf("2V") >= 0){
                this.arcCOMPv2++;
              }
              if(this.data[index][5][i].url1.indexOf("3V") >= 0){
                this.arcCOMPv3++;
              }
            }
            if(this.data[index][5][i].url1.indexOf("rk") >= 0){
              this.arkCOMP++;

              if(this.data[index][5][i].url1.indexOf("0s") >= 0){
                this.arkCOMP0++;
              }
              if(this.data[index][5][i].url1.indexOf("1s") >= 0){
                this.arkCOMP1++;
              }
              if(this.data[index][5][i].url1.indexOf("2s") >= 0){
                this.arkCOMP2++;
              }
              if(this.data[index][5][i].url1.indexOf("3s") >= 0){
                this.arkCOMP3++;
              }
              if(this.data[index][5][i].url1.indexOf("1V") >= 0){
                this.arkCOMPv1++;
              }
              if(this.data[index][5][i].url1.indexOf("2V") >= 0){
                this.arkCOMPv2++;
              }
              if(this.data[index][5][i].url1.indexOf("3V") >= 0){
                this.arkCOMPv3++;
              }
            }
          }    
          if(this.data[index][5][i].answer == 2){
            if(this.data[index][5][i].url2.indexOf("vf") >= 0){
              this.vufCOMP+=0.5;
              if(this.data[index][5][i].url2.indexOf("0s") >= 0){
                this.vufCOMP0+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("1s") >= 0){
                this.vufCOMP1+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("2s") >= 0){
                this.vufCOMP2+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("3s") >= 0){
                this.vufCOMP3+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("1V") >= 0){
                this.vufCOMPv1+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("2V") >= 0){
                this.vufCOMPv2+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("3V") >= 0){
                this.vufCOMPv3+=0.5;
              }
            }
            if(this.data[index][5][i].url2.indexOf("rc") >= 0){
              this.arcCOMP+=0.5;
              if(this.data[index][5][i].url2.indexOf("0s") >= 0){
                this.arcCOMP0+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("1s") >= 0){
                this.arcCOMP1+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("2s") >= 0){
                this.arcCOMP2+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("3s") >= 0){
                this.arcCOMP3+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("1V") >= 0){
                this.arcCOMPv1+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("2V") >= 0){
                this.arcCOMPv2+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("3V") >= 0){
                this.arcCOMPv3+=0.5;
              }
            }
            if(this.data[index][5][i].url2.indexOf("rk") >= 0){
              this.arkCOMP+=0.5;
              if(this.data[index][5][i].url2.indexOf("0s") >= 0){
                this.arkCOMP0+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("1s") >= 0){
                this.arkCOMP1+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("2s") >= 0){
                this.arkCOMP2+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("3s") >= 0){
                this.arkCOMP3+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("1V") >= 0){
                this.arkCOMPv1+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("2V") >= 0){
                this.arkCOMPv2+=0.5;
              }
              if(this.data[index][5][i].url2.indexOf("3V") >= 0){
                this.arkCOMPv3+=0.5;
              }
            }
            if(this.data[index][5][i].url1.indexOf("vf") >= 0){
              this.vufCOMP+=0.5;
              if(this.data[index][5][i].url1.indexOf("0s") >= 0){
                this.vufCOMP0+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("1s") >= 0){
                this.vufCOMP1+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("2s") >= 0){
                this.vufCOMP2+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("3s") >= 0){
                this.vufCOMP3+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("1V") >= 0){
                this.vufCOMPv1+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("2V") >= 0){
                this.vufCOMPv2+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("3V") >= 0){
                this.vufCOMPv3+=0.5;
              }
            }
            if(this.data[index][5][i].url1.indexOf("rc") >= 0){
              this.arcCOMP+=0.5;
              if(this.data[index][5][i].url1.indexOf("0s") >= 0){
                this.arcCOMP0+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("1s") >= 0){
                this.arcCOMP1+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("2s") >= 0){
                this.arcCOMP2+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("3s") >= 0){
                this.arcCOMP3+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("1V") >= 0){
                this.arcCOMPv1+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("2V") >= 0){
                this.arcCOMPv2+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("3V") >= 0){
                this.arcCOMPv3+=0.5;
              }
            }
            if(this.data[index][5][i].url1.indexOf("rk") >= 0){
              this.arkCOMP+=0.5;
              if(this.data[index][5][i].url1.indexOf("0s") >= 0){
                this.arkCOMP0+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("1s") >= 0){
                this.arkCOMP1+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("2s") >= 0){
                this.arkCOMP2+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("3s") >= 0){
                this.arkCOMP3+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("1V") >= 0){
                this.arkCOMPv1+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("2V") >= 0){
                this.arkCOMPv2+=0.5;
              }
              if(this.data[index][5][i].url1.indexOf("3V") >= 0){
                this.arkCOMPv3+=0.5;
              }
            }
          }   
        }           
      }

    }

    this.compAreaChartData[0] = this.vufCOMP*100/this.possibleScoreVUF;
    this.compAreaChartData[1] = this.arcCOMP*100/this.possibleScoreARC;
    this.compAreaChartData[2] = this.arkCOMP*100/this.possibleScoreARK;

    this.comp0AreaChartData[0] = this.vufCOMP0*100/this.possibleScore0VUF;
    this.comp0AreaChartData[1] = this.arcCOMP0*100/this.possibleScore0ARC;
    this.comp0AreaChartData[2] = this.arkCOMP0*100/this.possibleScore0ARK;

    this.comp1AreaChartData[0] = this.vufCOMP1*100/this.possibleScore1VUF;
    this.comp1AreaChartData[1] = this.arcCOMP1*100/this.possibleScore1ARC;
    this.comp1AreaChartData[2] = this.arkCOMP1*100/this.possibleScore1ARK;

    this.comp2AreaChartData[0] = this.vufCOMP2*100/this.possibleScore2VUF;
    this.comp2AreaChartData[1] = this.arcCOMP2*100/this.possibleScore2ARC;
    this.comp2AreaChartData[2] = this.arkCOMP2*100/this.possibleScore2ARK;

    this.comp3AreaChartData[0] = this.vufCOMP3*100/this.possibleScore3VUF;
    this.comp3AreaChartData[1] = this.arcCOMP3*100/this.possibleScore3ARC;
    this.comp3AreaChartData[2] = this.arkCOMP3*100/this.possibleScore3ARK;

    this.compv1AreaChartData[0] = this.vufCOMPv1*100/this.possibleScorev1VUF;
    this.compv1AreaChartData[1] = this.arcCOMPv1*100/this.possibleScorev1ARC;
    this.compv1AreaChartData[2] = this.arkCOMPv1*100/this.possibleScorev1ARK;

    this.compv2AreaChartData[0] = this.vufCOMPv2*100/this.possibleScorev2VUF;
    this.compv2AreaChartData[1] = this.arcCOMPv2*100/this.possibleScorev2ARC;
    this.compv2AreaChartData[2] = this.arkCOMPv2*100/this.possibleScorev2ARK;

    this.compv3AreaChartData[0] = this.vufCOMPv3*100/this.possibleScorev3VUF;
    this.compv3AreaChartData[1] = this.arcCOMPv3*100/this.possibleScorev3ARC;
    this.compv3AreaChartData[2] = this.arkCOMPv3*100/this.possibleScorev3ARK;

    this.showCompChart = true;
    this.showPhoneChart = true;
    this.showARexpChart = true;
    this.showARhwChart = true;
    this.showAgeChart = true;
    this.showMatChart = true;

    //Calculating Averages
    //Ar Core
    for (let avgI = 0; avgI < this.arcL0num.length; avgI++) {
      this.arcL0avg += this.arcL0num[avgI];        
    }
    this.arcL0avg = this.arcL0avg / this.arcL0num.length;

    for (let avgI = 0; avgI < this.arcL1num.length; avgI++) {
      this.arcL1avg += this.arcL1num[avgI];        
    }
    this.arcL1avg = this.arcL1avg / this.arcL1num.length;

    for (let avgI = 0; avgI < this.arcL2num.length; avgI++) {
      this.arcL2avg += this.arcL2num[avgI];        
    }
    this.arcL2avg = this.arcL2avg / this.arcL2num.length;

    for (let avgI = 0; avgI < this.arcL3num.length; avgI++) {
      this.arcL3avg += this.arcL3num[avgI];        
    }
    this.arcL3avg = this.arcL3avg / this.arcL3num.length;

    for (let avgI = 0; avgI < this.arcV1num.length; avgI++) {
      this.arcV1avg += this.arcV1num[avgI];        
    }
    this.arcV1avg = this.arcV1avg / this.arcV1num.length;

    for (let avgI = 0; avgI < this.arcV2num.length; avgI++) {
      this.arcV2avg += this.arcV2num[avgI];        
    }
    this.arcV2avg = this.arcV2avg / this.arcV2num.length;

    for (let avgI = 0; avgI < this.arcV3num.length; avgI++) {
      this.arcV3avg += this.arcV3num[avgI];        
    }
    this.arcV3avg = this.arcV3avg / this.arcV3num.length;

    //Ar Kit
    for (let avgI = 0; avgI < this.arkL0num.length; avgI++) {
      this.arkL0avg += this.arkL0num[avgI];        
    }
    this.arkL0avg = this.arkL0avg / this.arkL0num.length;

    for (let avgI = 0; avgI < this.arkL1num.length; avgI++) {
      this.arkL1avg += this.arkL1num[avgI];        
    }
    this.arkL1avg = this.arkL1avg / this.arkL1num.length;

    for (let avgI = 0; avgI < this.arkL2num.length; avgI++) {
      this.arkL2avg += this.arkL2num[avgI];        
    }
    this.arkL2avg = this.arkL2avg / this.arkL2num.length;

    for (let avgI = 0; avgI < this.arkL3num.length; avgI++) {
      this.arkL3avg += this.arkL3num[avgI];        
    }
    this.arkL3avg = this.arkL3avg / this.arkL3num.length;

    for (let avgI = 0; avgI < this.arkV1num.length; avgI++) {
      this.arkV1avg += this.arkV1num[avgI];        
    }
    this.arkV1avg = this.arkV1avg / this.arkV1num.length;

    for (let avgI = 0; avgI < this.arkV2num.length; avgI++) {
      this.arkV2avg += this.arkV2num[avgI];        
    }
    this.arkV2avg = this.arkV2avg / this.arkV2num.length;

    for (let avgI = 0; avgI < this.arkV3num.length; avgI++) {
      this.arkV3avg += this.arkV3num[avgI];        
    }
    this.arkV3avg = this.arkV3avg / this.arkV3num.length;

    //Ar Kit
    for (let avgI = 0; avgI < this.vufL0num.length; avgI++) {
      this.vufL0avg += this.vufL0num[avgI];        
    }
    this.vufL0avg = this.vufL0avg / this.vufL0num.length;

    for (let avgI = 0; avgI < this.vufL1num.length; avgI++) {
      this.vufL1avg += this.vufL1num[avgI];        
    }
    this.vufL1avg = this.vufL1avg / this.vufL1num.length;

    for (let avgI = 0; avgI < this.vufL2num.length; avgI++) {
      this.vufL2avg += this.vufL2num[avgI];        
    }
    this.vufL2avg = this.vufL2avg / this.vufL2num.length;

    for (let avgI = 0; avgI < this.vufL3num.length; avgI++) {
      this.vufL3avg += this.vufL3num[avgI];        
    }
    this.vufL3avg = this.vufL3avg / this.vufL3num.length;

    for (let avgI = 0; avgI < this.vufV1num.length; avgI++) {
      this.vufV1avg += this.vufV1num[avgI];        
    }
    this.vufV1avg = this.vufV1avg / this.vufV1num.length;

    for (let avgI = 0; avgI < this.vufV2num.length; avgI++) {
      this.vufV2avg += this.vufV2num[avgI];        
    }
    this.vufV2avg = this.vufV2avg / this.vufV2num.length;

    for (let avgI = 0; avgI < this.vufV3num.length; avgI++) {
      this.vufV3avg += this.vufV3num[avgI];        
    }
    this.vufV3avg = this.vufV3avg / this.vufV3num.length;

    this.averagesChartData[0].data[0] = this.vufL0avg;
    this.averagesChartData[0].data[1] = this.vufL1avg; 
    this.averagesChartData[0].data[2] = this.vufL2avg; 
    this.averagesChartData[0].data[3] = this.vufL3avg; 
    this.averagesChartData[0].data[4] = this.vufV1avg; 
    this.averagesChartData[0].data[5] = this.vufV2avg; 
    this.averagesChartData[0].data[6] = this.vufV3avg; 

    this.averagesChartData[1].data[0] = this.arcL0avg;
    this.averagesChartData[1].data[1] = this.arcL1avg; 
    this.averagesChartData[1].data[2] = this.arcL2avg; 
    this.averagesChartData[1].data[3] = this.arcL3avg; 
    this.averagesChartData[1].data[4] = this.arcV1avg; 
    this.averagesChartData[1].data[5] = this.arcV2avg; 
    this.averagesChartData[1].data[6] = this.arcV3avg;

    this.averagesChartData[2].data[0] = this.arkL0avg;
    this.averagesChartData[2].data[1] = this.arkL1avg; 
    this.averagesChartData[2].data[2] = this.arkL2avg; 
    this.averagesChartData[2].data[3] = this.arkL3avg; 
    this.averagesChartData[2].data[4] = this.arkV1avg; 
    this.averagesChartData[2].data[5] = this.arkV2avg; 
    this.averagesChartData[2].data[6] = this.arkV3avg;

    
    this.level0ChartData[0].data = this.histogram(this.vufL0num,this.vufL0num.length);
    this.level0ChartData[1].data = this.histogram(this.arcL0num,this.arcL0num.length);
    this.level0ChartData[2].data = this.histogram(this.arkL0num,this.arkL0num.length);

    for (let index = 0; index < this.histogram(this.vufL0num,this.vufL0num.length).length; index++) {
      this.level0ChartLabels.push('');
    }
    
    this.level0 = true;

    // this.level1ChartData[0].data = this.histogram(this.vufL1num,this.vufL1num.length);
    // this.level1ChartData[1].data = this.histogram(this.arcL1num,this.arcL1num.length);
    // this.level1ChartData[2].data = this.histogram(this.arkL1num,this.arkL1num.length);
    // for (let index = 0; index < this.histogram(this.vufL1num,this.vufL1num.length).length; index++) {
    //   this.level1ChartLabels.push('');
    // }
    this.level1ChartData[0].data = this.vufL1num;
    this.level1ChartData[1].data = this.arcL1num;
    this.level1ChartData[2].data = this.arkL1num;

    for (let index = 0; index < Math.max(this.vufL1num.length,this.arcL1num.length,this.arkL1num.length); index++) {
      this.level1ChartLabels.push('');
    }
    
    this.level1 = true;

    this.level2ChartData[0].data = this.vufL2num;
    this.level2ChartData[1].data = this.arcL2num;
    this.level2ChartData[2].data = this.arkL2num;

    for (let index = 0; index < Math.max(this.vufL2num.length,this.arcL2num.length,this.arkL2num.length); index++) {
      this.level2ChartLabels.push('');
    }
    
    this.level2 = true;

    this.level3ChartData[0].data = this.vufL3num;
    this.level3ChartData[1].data = this.arcL3num;
    this.level3ChartData[2].data = this.arkL3num;

    for (let index = 0; index < Math.max(this.vufL3num.length,this.arcL3num.length,this.arkL3num.length); index++) {
      this.level3ChartLabels.push('');
    }
    
    this.level3 = true;

    this.vary1ChartData[0].data = this.vufV1num;
    this.vary1ChartData[1].data = this.arcV1num;
    this.vary1ChartData[2].data = this.arkV1num;

    for (let index = 0; index < Math.max(this.vufV1num.length,this.arcV1num.length,this.arkV1num.length); index++) {
      this.vary1ChartLabels.push('');
    }
    
    this.vary1 = true;

    this.vary2ChartData[0].data = this.vufV2num;
    this.vary2ChartData[1].data = this.arcV2num;
    this.vary2ChartData[2].data = this.arkV2num;

    for (let index = 0; index < Math.max(this.vufV2num.length,this.arcV2num.length,this.arkV2num.length); index++) {
      this.vary2ChartLabels.push('');
    }
    
    this.vary2 = true;

    this.vary3ChartData[0].data = this.vufV3num;
    this.vary3ChartData[1].data = this.arcV3num;
    this.vary3ChartData[2].data = this.arkV3num;

    for (let index = 0; index < Math.max(this.vufV3num.length,this.arcV3num.length,this.arkV3num.length); index++) {
      this.vary3ChartLabels.push('');
    }
    
    this.vary3 = true;

    this.showAveragesChart = true;
    //console.log(this.averagesChartData[0].data[0]);
    //console.log( this.phoneChartData)
  }

  histogram(data, size) {
    var length = data.length;

    var min = data[0];
    var max = data[1];

    for (var i = 0; i < length; i++) {
        var item = data[i];
        if (item < min) min = item;
        else if (item > max) max = item;
    }

    var bins = Math.ceil((max - min + 1) / size);

    var histogram = new Array(bins);

    for (var i = 0; i < bins; i++) histogram[i] = 0;

    for (var i = 0; i < length; i++)
        histogram[Math.floor((data[i] - min) / size)]++;

    return histogram;
  }

  public phoneChartLabels:string[] = ['Android', 'iPhone', 'Windows Phone', 'Other', 'NA'];
  public phoneChartData:number[] = [ 0, 0, 0, 0, 0 ];
  public phoneChartType:string = 'doughnut';

  public ageChartLabels:string[] = ['12-17', '18-24', '25-34', '35-49', '50-64', '65+'];
  public ageChartData:number[] = [0, 0, 0, 0, 0, 0];
  public ageChartType:string = 'pie';

  public ARexpChartLabels:string[] = ['True', 'False'];
  public ARexpChartData:number[] = [0, 0];
  public ARexpChartType:string = 'pie';

  public ARhwChartLabels:string[] = ['Smartphone / Tablet', 'AR-Headset', 'AR-Kiosk', 'Other'];
  public ARhwChartData:number[] = [0, 0, 0, 0];
  public ARhwChartType:string = 'doughnut';

  public averagesChartLabels:string[] = ['Light Level 0', 'Light Level 1', 'Light Level 2', 'Light Level 3', 'Varying 1', 'Varying 2', 'Varying 3'];
  public averagesChartData:any = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public averagesChartType:string = 'radar';

  public level0ChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public level0ChartLabels:Array<any> = [];
  public level0ChartType:string = 'line';
  public level0ChartLegend:boolean = true;

  public level1ChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public level1ChartLabels:Array<any> = [];
  public level1ChartType:string = 'line';
  public level1ChartLegend:boolean = true;

  public level2ChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public level2ChartLabels:Array<any> = [];
  public level2ChartType:string = 'line';
  public level2ChartLegend:boolean = true;

  public level3ChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public level3ChartLabels:Array<any> = [];
  public level3ChartType:string = 'line';
  public level3ChartLegend:boolean = true;

  public vary1ChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public vary1ChartLabels:Array<any> = [];
  public vary1ChartType:string = 'line';
  public vary1ChartLegend:boolean = true;

  public vary2ChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public vary2ChartLabels:Array<any> = [];
  public vary2ChartType:string = 'line';
  public vary2ChartLegend:boolean = true;

  public vary3ChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];
  public vary3ChartLabels:Array<any> = [];
  public vary3ChartType:string = 'line';
  public vary3ChartLegend:boolean = true;

  public compAreaChartLabels:string[] = ['Vufora', 'AR Core', 'AR Kit'];
  public compAreaChartData:number[] = [0, 0, 0];
  public comp0AreaChartData:number[] = [0, 0, 0];
  public comp1AreaChartData:number[] = [0, 0, 0];
  public comp2AreaChartData:number[] = [0, 0, 0];
  public comp3AreaChartData:number[] = [0, 0, 0];
  public compv1AreaChartData:number[] = [0, 0, 0];
  public compv2AreaChartData:number[] = [0, 0, 0];
  public compv3AreaChartData:number[] = [0, 0, 0];
  public compAreaLegend:boolean = true;
 
  public compAreaChartType:string = 'polarArea';

  public matChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public matChartLabels:string[] = ['Stainless Steel', 'Wood', 'Dirt', 'Rock', 'Plastic', 'Cloth', 'Same'];
  public matChartType:string = 'bar';
  public matChartLegend:boolean = true;
  public matChartData:any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Vuforia'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Core'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'AR Kit'}
  ];

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
