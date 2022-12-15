import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-like-svg',
  templateUrl: './like-svg.component.html',
  styleUrls: ['./like-svg.component.css']
})
export class LikeSvgComponent {
  @Input() isLiked: number
  @Input() postId: number

  counter: number = 0

  constructor(private dbContext: DALService, private auth: AuthService) {
  }

  setLike (): Promise<any> {
    let newLike: any = this.isLiked === 1 ? null : 1
    let wasLiked = this.isLiked != null

    let obj: any = null;
    return new Promise((resolve, reject) => {

      this.dbContext.setLike(newLike, this.postId, this.auth.user.userId, wasLiked).then((favorites) => {
        this.isLiked = newLike
      }).catch((err) => {

        obj = {
          code: 404,
          status: false,
          message: err
        };
        reject(obj);
      });
    });

  }
}
