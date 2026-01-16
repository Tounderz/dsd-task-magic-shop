import {computed, Injectable, signal} from '@angular/core';
import {ToastConfig} from '../types/toast.types';

@Injectable({
  providedIn: 'root',
})
export class ToasterState {
  private _toastState = signal<ToastConfig | null>(null);
  public toastState = computed(() => this._toastState());

  public showToast(config: ToastConfig): void {
    const duration = config.duration ?? 3000;
    this._toastState.set(config);

    setTimeout(() => {
      this.hideToast();
    }, duration);
  }

  public hideToast(): void {
    this._toastState.set(null);
  }
}
