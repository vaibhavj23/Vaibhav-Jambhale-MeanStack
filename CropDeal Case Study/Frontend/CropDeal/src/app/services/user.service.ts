import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _getFarmerName = "http://localhost:4000/farmerNameAndContact";
  private _getUserProfile = "http://localhost:4000/user/";
  private _updateUserProfile = "http://localhost:4000/user/";
  private _getSubscribedCrops = "http://localhost:4000/dealer/subscribedCrops/";
  private _addSubscribedCrop = "http://localhost:4000/dealer/subscribeCrops/";
  private _deleteSubscribedCrop = "http://localhost:4000/dealer/subscribedCrops/";
  private _getFarmersList = "http://localhost:4000/farmers";
  private _deleteUser = "http://localhost:4000/user/";
  private _getFarmerRatings = "http://localhost:4000/farmerRating";
  private _getDealerRatings = "http://localhost:4000/dealerRating";
  private _getDealersList = "http://localhost:4000/dealers";
  private _postRating = "http://localhost:4000/rating";


  constructor(private http : HttpClient, private _router: Router) { }

  getFarmerName()
  {
    return this.http.get<any>(this._getFarmerName);
  }

  getUserProfile(emailId)
  {
    return this.http.get<any>(this._getUserProfile + emailId);
  }

  updateUserProfile(userObj,emailId)
  {
    return this.http.put<any>(this._updateUserProfile + emailId,userObj);
  }

  getSubscribedCrops(emailId)
  {
    return this.http.get<any>(this._getSubscribedCrops + emailId);
  }

  addSubscribedCrop(emailId, cropObj)
  {
    return this.http.put<any>(this._addSubscribedCrop + emailId, cropObj);
  }

  deleteSubscribedCrop(subscribedCropId)
  {
    return this.http.delete<any>(this._deleteSubscribedCrop + subscribedCropId);
  }

  getFarmersList()
  {
    return this.http.get<any>(this._getFarmersList );
  }

  deleteUser(userEmail,userObj)
  {
    return this.http.post<any>(this._deleteUser +userEmail ,userObj);
  }

  getFarmerRatings()
  {
    return this.http.get<any>(this._getFarmerRatings);
  }

  getDealerRatings()
  {
    return this.http.get<any>(this._getDealerRatings);
  }

  getDealersList()
  {
    return this.http.get<any>(this._getDealersList );
  }

  addRating(ratingObj)
  {
    return this.http.post<any>(this._postRating, ratingObj );
  }

}
