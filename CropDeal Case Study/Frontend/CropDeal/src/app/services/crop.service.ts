import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  private _publishCrop = "http://localhost:5000/publishCrop";
  private _getPublishedCrops = "http://localhost:5000/publishedCrops/inStock/";
  private _updatePublishedCrop = "http://localhost:5000/publishCrop/";
  private _deletePublishedCrop = "http://localhost:5000/publishedCrop/";
  private _getSoldCrops = "http://localhost:5000/soldCrops/";
  private _getReceipt = "http://localhost:5000/receipt/";
  private _getAllPublishedCrops = "http://localhost:5000/publishedCrop/";
  private _getAllPurchasedCrops = "http://localhost:5000/purchasedCrops/";
  private _getAllSubscribedCrops = "http://localhost:5000/publishedCrops/subscribed/";
  private _getAllPublishedCropsByAllFarmers = "http://localhost:5000/allPublishedCrop/";
  private _getAllPurchasedCropsByAllDealers = "http://localhost:5000/purchasedCrops";
  private _purchaseCrop = "http://localhost:5000/purchaseCrop/";

  constructor(private http : HttpClient, private _router: Router) { }

  publishCrop(crop)
  {
    return this.http.post<any>(this._publishCrop,crop);
  }

  getPublishedCrops(farmerEmailId)
  {
    return this.http.get<any>(this._getPublishedCrops+farmerEmailId);
  }

  updatePublishedCrop(publishedId,updatedCrop)
  {
    return this.http.put<any>(this._updatePublishedCrop + publishedId ,updatedCrop);
  }

  deletePublishedCrop(publishedId)
  {
    return this.http.delete<any>(this._deletePublishedCrop + publishedId);
  }

  getSoldCrops(farmerId)
  {
    return this.http.get<any>(this._getSoldCrops + farmerId);
  }

  getReceipt(transactionId)
  {
    return this.http.get<any>(this._getReceipt + transactionId);
  }

  getAllPublishedCrops()
  {
    return this.http.get<any>(this._getAllPublishedCrops);
  }

  getAllPurchasedCrops(dealerId)
  {
    return this.http.get<any>(this._getAllPurchasedCrops + dealerId);
  }

  getAllSubscribedCrops(dealerId)
  {
    return this.http.get<any>(this._getAllSubscribedCrops + dealerId);
  }

  getAllPublishedCropsByAllFarmers()
  {
    return this.http.get<any>(this._getAllPublishedCropsByAllFarmers);
  }

  getAllPurchasedCropsByAllDealers()
  {
    return this.http.get<any>(this._getAllPurchasedCropsByAllDealers);
  }

  purchaseCrop(publishedCropId, purchaseObj)
  {
    return this.http.post<any>(this._purchaseCrop + publishedCropId, purchaseObj);
  }
}
