import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public formatDateIntl(date: string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return String(date);
    }

    return d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');
  }
}
