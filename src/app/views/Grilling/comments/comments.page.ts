import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { log } from 'console';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class CommentsPage implements OnInit {
place:any;
user:any;
placeOrigin:any;
dataDict: any = {};
comments:any;
user_id:any;
is_liked:any;
commentslike:any;
commentForm! : FormGroup;
  constructor(private http:HttpServiceService , private auth:AuthService,private cdr: ChangeDetectorRef, private formBuilder: FormBuilder) { 
    this.place = JSON.parse(localStorage.getItem('place_selected')!)
      console.log('place', this.place)
    this.user_id  = JSON.parse(localStorage.getItem('user_id')!)

    this.commentForm = this.formBuilder.group({
      body:['',Validators.required]
    })

    // this.getPlaceInfo();
    // this.getUserInfo();
   
    
  }


  ionViewWillEnter(){
    this.getcomments();
    
  }


  getcomments(){
    this.http.getCommentByIdPlace(this.place.id).pipe(
      switchMap((commentaires: any) => {
        const commentairesWithLikes$ = commentaires.map((commentaire: any) =>
          this.http.getCommentLike(commentaire.id).pipe(
            switchMap(numLikes => {
              
              
              const is_liked$ = this.http.commentlikebyUserId(this.user_id, commentaire.id);
              return is_liked$.pipe(
                map((is_liked:any) => {
                  const liked = is_liked.length;
                  
                  
                  return{
                    id: commentaire.id,
                  createdAt: commentaire.created_at,
                  place: commentaire.place,
                  body: commentaire.body,
                  parent: commentaire.parent,
                  num_likes: numLikes,
                  user: commentaire.user,
                  is_liked: liked
                  }
                  
                })
              );
            })
          )
        );
    
        return forkJoin(commentairesWithLikes$);
      }),
      map((commentaireList:any) => {
        return commentaireList.map((comment: any) => {
          const createdAt = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

          return { ...comment, createdAt };
        });
      })
    ).subscribe((commentsWithLikes: any[]) => {
      this.comments = commentsWithLikes;
      console.log('comments',this.comments);
      
    });
    
  }

  makeComment(){
    this.dataDict.body = this.commentForm?.get('body')?.value;

  //   if (this.dataDict.user && this.dataDict.place){
  //     console.log('comment', this.dataDict);
  //     this.http.comment(this.dataDict).subscribe((res: any) => {
  //       console.log('comment response ', res);
        
  //       this.ionViewWillEnter();
  //   })
    
  // }

  this.dataDict.user = this.user_id;
  this.dataDict.place = this.place.id;
       console.log('comment', this.dataDict);
      this.http.comment(this.dataDict).subscribe((res: any) => {
        console.log('comment response ', res);
        
        this.ionViewWillEnter();
    })

}


  likecomment(comment:any){
    
    const isLiked = comment.is_liked;

    if (isLiked == 1){
      this.http.likeComment(comment.id,this.user_id).subscribe((res:any) =>{
        // console.log('dislike',res);
        
        comment.num_likes.likes = res.likes;
        console.log('update like', comment.num_likes);
        
        comment.is_liked = 0;
        this.cdr.detectChanges();
      });
  } else{
    this.http.likeComment(comment.id,this.user_id).subscribe((res:any) =>{
      // console.log('like',res);
      
      comment.num_likes.likes = res.likes;
      comment.is_liked = 1;
      console.log('update like', comment.num_likes);
      this.cdr.detectChanges();
    });
  }
}



getUserInfo(){
  this.auth.getUserInfos(this.user_id).subscribe((res:any) =>{
    // this.user = res ;
    this.dataDict.user = res;
    console.log('user',res);
    
  } 
  )}



getPlaceInfo(){
  this.http.getPlace(this.place.id).subscribe((res:any) =>{
    // this.placeOrigin = res ;
    this.dataDict.place = res;
    console.log('place',res);
    
    
})
}

  ngOnInit() {
  }
  onClick(){
    
  }

}
