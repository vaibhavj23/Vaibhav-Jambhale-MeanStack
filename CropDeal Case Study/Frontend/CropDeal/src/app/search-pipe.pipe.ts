import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items: any[], searchText: String): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return (it.farmerName.toLowerCase().includes(searchText)||it.farmerEmail.toLowerCase().includes(searchText));
    });
  }

}
